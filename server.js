const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 8080;
const APP_PASSWORD = process.env.APP_PASSWORD || 'changeme';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Password authentication endpoint
app.post('/auth', (req, res) => {
  const { password } = req.body;
  
  if (password === APP_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server for WebRTC signaling
const wss = new WebSocket.Server({ server });

// Store connected clients for signaling
const clients = new Map();
let roomState = {
  currentVideo: null,
  isPlaying: false,
  currentTime: 0,
  lastUpdate: Date.now()
};

wss.on('connection', (ws) => {
  const clientId = Math.random().toString(36).substr(2, 9);
  clients.set(clientId, ws);
  
  console.log(`Client ${clientId} connected`);
  
  // Send current room state to new client
  ws.send(JSON.stringify({
    type: 'room-state',
    data: roomState
  }));
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'signal':
          // Relay WebRTC signaling to other clients
          broadcast({
            type: 'signal',
            from: clientId,
            data: data.data
          }, clientId);
          break;
          
        case 'video-update':
          // Update room state for video sync
          roomState = {
            ...roomState,
            ...data.data,
            lastUpdate: Date.now()
          };
          
          // Broadcast to all other clients
          broadcast({
            type: 'video-update',
            from: clientId,
            data: data.data
          }, clientId);
          break;
          
        case 'chat':
          // Relay chat messages
          broadcast({
            type: 'chat',
            from: clientId,
            data: data.data
          }, clientId);
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientId);
    
    // Notify other clients
    broadcast({
      type: 'peer-disconnected',
      clientId: clientId
    }, clientId);
  });
  
  ws.on('error', (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error);
  });
});

function broadcast(message, excludeClientId = null) {
  const messageStr = JSON.stringify(message);
  
  clients.forEach((ws, clientId) => {
    if (clientId !== excludeClientId && ws.readyState === WebSocket.OPEN) {
      ws.send(messageStr);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Password: ${APP_PASSWORD}`);
});