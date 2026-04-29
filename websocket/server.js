const WebSocket = require('ws');
const Redis = require('ioredis');
const http = require('http');

const PORT = process.env.PORT || 3006;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis client
const redis = new Redis(REDIS_URL);
const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

// HTTP server for health checks
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', connections: wss.clients.size }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// WebSocket server
const wss = new WebSocket.Server({ server });

// Store active streams
const activeStreams = new Map();

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const streamId = url.pathname.split('/')[2];
  const userId = url.searchParams.get('userId');
  const role = url.searchParams.get('role'); // 'broadcaster' or 'viewer'

  console.log(`New connection: ${userId} as ${role} on stream ${streamId}`);

  // Join stream room
  if (!activeStreams.has(streamId)) {
    activeStreams.set(streamId, new Set());
  }
  activeStreams.get(streamId).add(ws);

  // Update viewer count in Redis
  const viewerCount = activeStreams.get(streamId).size;
  redis.setex(`stream:${streamId}:viewers`, 3600, viewerCount);

  // Broadcast viewer count to all in stream
  broadcastToStream(streamId, {
    type: 'viewer-count',
    count: viewerCount
  });

  // Handle messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(streamId, ws, data, role);
    } catch (err) {
      console.error('Invalid message:', err);
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log(`Disconnected: ${userId}`);
    
    if (activeStreams.has(streamId)) {
      activeStreams.get(streamId).delete(ws);
      
      // Update viewer count
      const newCount = activeStreams.get(streamId).size;
      redis.setex(`stream:${streamId}:viewers`, 3600, newCount);
      
      broadcastToStream(streamId, {
        type: 'viewer-count',
        count: newCount
      });

      // Clean up empty streams
      if (newCount === 0) {
        activeStreams.delete(streamId);
      }
    }
  });

  // Send initial connection success
  ws.send(JSON.stringify({
    type: 'connected',
    streamId,
    viewerCount
  }));
});

function handleMessage(streamId, ws, data, role) {
  switch (data.type) {
    case 'offer':
      // Forward offer to broadcaster (if viewer) or viewers (if broadcaster)
      broadcastToStream(streamId, data, ws);
      break;
      
    case 'answer':
      // Forward answer
      broadcastToStream(streamId, data, ws);
      break;
      
    case 'ice-candidate':
      // Forward ICE candidate
      broadcastToStream(streamId, data, ws);
      break;
      
    case 'chat':
      // Broadcast chat to all in stream
      broadcastToStream(streamId, {
        type: 'chat',
        userId: data.userId,
        message: data.message,
        timestamp: Date.now()
      });
      break;
      
    case 'tip':
      // Broadcast tip notification
      broadcastToStream(streamId, {
        type: 'tip',
        userId: data.userId,
        amount: data.amount,
        message: data.message,
        timestamp: Date.now()
      });
      
      // Store in Redis for persistence
      pub.publish(`stream:${streamId}:tips`, JSON.stringify(data));
      break;
      
    case 'battle-score':
      // Battle mode score update
      broadcastToStream(streamId, {
        type: 'battle-score',
        creatorId: data.creatorId,
        score: data.score
      });
      break;
  }
}

function broadcastToStream(streamId, data, excludeWs = null) {
  if (!activeStreams.has(streamId)) return;
  
  const message = JSON.stringify(data);
  activeStreams.get(streamId).forEach((client) => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Subscribe to Redis for cross-server communication
sub.subscribe('broadcast');
sub.on('message', (channel, message) => {
  if (channel === 'broadcast') {
    const data = JSON.parse(message);
    broadcastToStream(data.streamId, data);
  }
});

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});
