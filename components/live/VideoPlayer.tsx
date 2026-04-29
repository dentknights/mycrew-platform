'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, SwitchCamera } from 'lucide-react'
import { WebRTCManager, StreamConfig } from '@/lib/webrtc'

interface VideoPlayerProps {
  streamId: string
  userId: string
  role: 'broadcaster' | 'viewer'
  onEnd?: () => void
}

export function VideoPlayer({ streamId, userId, role, onEnd }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const webrtcRef = useRef<WebRTCManager | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [streamStats, setStreamStats] = useState({
    bitrate: 0,
    packetLoss: 0,
    latency: 0,
  })

  useEffect(() => {
    const config: StreamConfig = {
      streamId,
      userId,
      role,
    }

    const webrtc = new WebRTCManager(config)
    webrtcRef.current = webrtc

    // Listen for stream events
    const handleLocalStream = (e: any) => {
      if (videoRef.current && role === 'broadcaster') {
        videoRef.current.srcObject = e.detail.stream
      }
    }

    const handleRemoteStream = (e: any) => {
      if (videoRef.current && role === 'viewer') {
        videoRef.current.srcObject = e.detail.stream
      }
    }

    const handleViewerCount = (e: any) => {
      setViewerCount(e.detail.count)
    }

    const handleStreamEnded = () => {
      onEnd?.()
    }

    window.addEventListener('local-stream-ready', handleLocalStream)
    window.addEventListener('remote-stream-ready', handleRemoteStream)
    window.addEventListener('viewer-count-update', handleViewerCount)
    window.addEventListener('stream-ended', handleStreamEnded)

    // Initialize WebRTC
    webrtc.initialize()
      .then(() => setIsConnected(true))
      .catch(console.error)

    // Stats monitoring
    webrtc.onStats((stats) => {
      setStreamStats(stats)
    })

    return () => {
      window.removeEventListener('local-stream-ready', handleLocalStream)
      window.removeEventListener('remote-stream-ready', handleRemoteStream)
      window.removeEventListener('viewer-count-update', handleViewerCount)
      window.removeEventListener('stream-ended', handleStreamEnded)
      webrtc.cleanup()
    }
  }, [streamId, userId, role, onEnd])

  const toggleMute = () => {
    const enabled = webrtcRef.current?.toggleMute()
    setIsMuted(!enabled)
  }

  const toggleVideo = () => {
    const enabled = webrtcRef.current?.toggleVideo()
    setIsVideoOff(!enabled)
  }

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      await webrtcRef.current?.stopScreenShare()
      setIsScreenSharing(false)
    } else {
      await webrtcRef.current?.shareScreen()
      setIsScreenSharing(true)
    }
  }

  const switchCamera = () => {
    webrtcRef.current?.switchCamera()
  }

  const endStream = () => {
    webrtcRef.current?.endStream()
    onEnd?.()
  }

  return (
    <div className="relative w-full h-full bg-black">
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={role === 'broadcaster'}
        className="w-full h-full object-cover"
      />

      {/* Connection Status */}
      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Connecting...</p>
          </div>
        </div>
      )}

      {/* Stats Overlay (Broadcaster only) */}
      {role === 'broadcaster' && isConnected && (
        <div className="absolute top-4 left-4 bg-black/60 rounded-lg p-3 text-xs">
          <div className="text-white">
            <span className="text-gray-400">Bitrate:</span> {streamStats.bitrate.toFixed(0)} kbps
          </div>
          <div className="text-white">
            <span className="text-gray-400">Packet Loss:</span> {streamStats.packetLoss.toFixed(1)}%
          </div>
          <div className="text-white">
            <span className="text-gray-400">Viewers:</span> {viewerCount}
          </div>
        </div>
      )}

      {/* Controls (Broadcaster only) */}
      {role === 'broadcaster' && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing ? 'bg-green-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <MonitorUp size={24} />
            </button>

            <button
              onClick={switchCamera}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <SwitchCamera size={24} />
            </button>

            <button
              onClick={endStream}
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
