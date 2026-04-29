// WebRTC Streaming Integration for MyCrew
// Supports both broadcaster (creator) and viewer (fan) roles

interface StreamConfig {
  streamId: string
  userId: string
  role: 'broadcaster' | 'viewer'
  iceServers?: RTCIceServer[]
}

interface StreamStats {
  bitrate: number
  packetLoss: number
  latency: number
  viewers: number
}

class WebRTCManager {
  private pc: RTCPeerConnection | null = null
  private localStream: MediaStream | null = null
  private remoteStream: MediaStream | null = null
  private ws: WebSocket | null = null
  private config: StreamConfig
  private onStatsUpdate: ((stats: StreamStats) => void) | null = null

  // Default STUN/TURN servers for NAT traversal
  private defaultIceServers: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    // TURN servers would be added here for production
    // {
    //   urls: 'turn:mycrew-turn.com:3478',
    //   username: 'user',
    //   credential: 'pass'
    // }
  ]

  constructor(config: StreamConfig) {
    this.config = config
  }

  // Initialize WebRTC connection
  async initialize(): Promise<void> {
    this.pc = new RTCPeerConnection({
      iceServers: this.config.iceServers || this.defaultIceServers,
    })

    // Set up event handlers
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignal({
          type: 'ice-candidate',
          candidate: event.candidate,
          streamId: this.config.streamId,
        })
      }
    }

    this.pc.ontrack = (event) => {
      this.remoteStream = event.streams[0]
      // Emit event for UI to consume
      window.dispatchEvent(new CustomEvent('remote-stream-ready', {
        detail: { stream: this.remoteStream }
      }))
    }

    this.pc.onconnectionstatechange = () => {
      console.log('Connection state:', this.pc?.connectionState)
      if (this.pc?.connectionState === 'failed') {
        this.handleConnectionFailure()
      }
    }

    // Connect to signaling server
    await this.connectSignaling()

    if (this.config.role === 'broadcaster') {
      await this.setupBroadcaster()
    } else {
      await this.setupViewer()
    }
  }

  // Connect to WebSocket signaling server
  private async connectSignaling(): Promise<void> {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://ws.mycrew.com'
    this.ws = new WebSocket(`${wsUrl}/stream/${this.config.streamId}`)

    this.ws.onopen = () => {
      console.log('Connected to signaling server')
      this.ws?.send(JSON.stringify({
        type: 'join',
        streamId: this.config.streamId,
        userId: this.config.userId,
        role: this.config.role,
      }))
    }

    this.ws.onmessage = async (event) => {
      const message = JSON.parse(event.data)
      await this.handleSignalingMessage(message)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    this.ws.onclose = () => {
      console.log('Disconnected from signaling server')
    }
  }

  // Handle incoming signaling messages
  private async handleSignalingMessage(message: any): Promise<void> {
    switch (message.type) {
      case 'offer':
        if (this.config.role === 'viewer') {
          await this.pc?.setRemoteDescription(new RTCSessionDescription(message.offer))
          const answer = await this.pc?.createAnswer()
          await this.pc?.setLocalDescription(answer)
          this.sendSignal({
            type: 'answer',
            answer,
            streamId: this.config.streamId,
          })
        }
        break

      case 'answer':
        if (this.config.role === 'broadcaster') {
          await this.pc?.setRemoteDescription(new RTCSessionDescription(message.answer))
        }
        break

      case 'ice-candidate':
        await this.pc?.addIceCandidate(new RTCIceCandidate(message.candidate))
        break

      case 'viewer-joined':
        if (this.config.role === 'broadcaster') {
          // New viewer joined - create offer
          await this.createOffer()
        }
        break

      case 'viewer-count':
        // Update viewer count in UI
        window.dispatchEvent(new CustomEvent('viewer-count-update', {
          detail: { count: message.count }
        }))
        break

      case 'stream-ended':
        this.cleanup()
        window.dispatchEvent(new CustomEvent('stream-ended'))
        break
    }
  }

  // Setup for broadcaster (creator)
  private async setupBroadcaster(): Promise<void> {
    try {
      // Get user media (camera + microphone)
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      // Add tracks to peer connection
      this.localStream.getTracks().forEach(track => {
        this.pc?.addTrack(track, this.localStream!)
      })

      // Emit local stream for preview
      window.dispatchEvent(new CustomEvent('local-stream-ready', {
        detail: { stream: this.localStream }
      }))

      // Start stats monitoring
      this.startStatsMonitoring()

    } catch (error) {
      console.error('Error accessing media devices:', error)
      throw new Error('Could not access camera/microphone')
    }
  }

  // Setup for viewer (fan)
  private async setupViewer(): Promise<void> {
    // Viewers don't need local media
    // They receive remote stream via ontrack handler
  }

  // Create and send offer (broadcaster only)
  private async createOffer(): Promise<void> {
    if (!this.pc) return

    const offer = await this.pc.createOffer()
    await this.pc.setLocalDescription(offer)

    this.sendSignal({
      type: 'offer',
      offer,
      streamId: this.config.streamId,
    })
  }

  // Send signal via WebSocket
  private sendSignal(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  // Start monitoring stream stats
  private startStatsMonitoring(): void {
    setInterval(async () => {
      if (!this.pc) return

      const stats = await this.pc.getStats()
      let bitrate = 0
      let packetLoss = 0

      stats.forEach(report => {
        if (report.type === 'outbound-rtp' && report.mediaType === 'video') {
          bitrate = report.bytesSent * 8 / 1000 // kbps
          packetLoss = report.packetsLost / report.packetsSent * 100
        }
      })

      const streamStats: StreamStats = {
        bitrate,
        packetLoss,
        latency: 0, // Would calculate from RTT
        viewers: 0, // Would get from server
      }

      this.onStatsUpdate?.(streamStats)
    }, 5000)
  }

  // Handle connection failure
  private handleConnectionFailure(): void {
    console.log('Connection failed, attempting reconnection...')
    // Implement reconnection logic
    setTimeout(() => {
      this.initialize()
    }, 3000)
  }

  // Switch camera (front/back for mobile)
  async switchCamera(): Promise<void> {
    if (!this.localStream) return

    const videoTrack = this.localStream.getVideoTracks()[0]
    const currentFacingMode = videoTrack.getSettings().facingMode

    // Stop current track
    videoTrack.stop()

    // Get new stream with opposite facing mode
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: currentFacingMode === 'user' ? 'environment' : 'user',
      },
      audio: true,
    })

    // Replace track in peer connection
    const newVideoTrack = newStream.getVideoTracks()[0]
    const sender = this.pc?.getSenders().find(s => 
      s.track?.kind === 'video'
    )
    await sender?.replaceTrack(newVideoTrack)

    // Update local stream
    this.localStream = newStream
    window.dispatchEvent(new CustomEvent('local-stream-ready', {
      detail: { stream: this.localStream }
    }))
  }

  // Toggle mute
  toggleMute(): boolean {
    if (!this.localStream) return false

    const audioTrack = this.localStream.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled
      return audioTrack.enabled
    }
    return false
  }

  // Toggle video
  toggleVideo(): boolean {
    if (!this.localStream) return false

    const videoTrack = this.localStream.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled
      return videoTrack.enabled
    }
    return false
  }

  // Share screen
  async shareScreen(): Promise<void> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      const screenTrack = screenStream.getVideoTracks()[0]
      const sender = this.pc?.getSenders().find(s => 
        s.track?.kind === 'video'
      )
      
      if (sender) {
        await sender.replaceTrack(screenTrack)
      }

      // Handle screen share end
      screenTrack.onended = () => {
        this.stopScreenShare()
      }

    } catch (error) {
      console.error('Error sharing screen:', error)
    }
  }

  // Stop screen share and return to camera
  async stopScreenShare(): Promise<void> {
    if (!this.localStream) return

    const videoTrack = this.localStream.getVideoTracks()[0]
    const sender = this.pc?.getSenders().find(s => 
      s.track?.kind === 'video'
    )
    await sender?.replaceTrack(videoTrack)
  }

  // End stream
  endStream(): void {
    this.sendSignal({
      type: 'end-stream',
      streamId: this.config.streamId,
    })
    this.cleanup()
  }

  // Cleanup resources
  cleanup(): void {
    this.localStream?.getTracks().forEach(track => track.stop())
    this.pc?.close()
    this.ws?.close()
    
    this.localStream = null
    this.remoteStream = null
    this.pc = null
    this.ws = null
  }

  // Set stats callback
  onStats(callback: (stats: StreamStats) => void): void {
    this.onStatsUpdate = callback
  }
}

// Hook for React components
export function useWebRTC(config: StreamConfig) {
  const [webrtc] = useState(() => new WebRTCManager(config))
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    webrtc.initialize()
      .then(() => setIsConnected(true))
      .catch(err => setError(err.message))

    return () => {
      webrtc.cleanup()
    }
  }, [])

  return { webrtc, isConnected, error }
}

export { WebRTCManager }
export type { StreamConfig, StreamStats }

// React hook import
import { useState, useEffect } from 'react'
