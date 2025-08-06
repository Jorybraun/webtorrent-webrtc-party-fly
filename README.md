# 🎬 WebTorrent Party

[![Deploy on Fly.io](https://fly.io/button.svg)](https://fly.io/launch?template=https://github.com/Jorybraun/webtorrent-webrtc-party-fly)

A private webtorrent streaming application that allows you to watch videos together with friends in real-time. Features password authentication, WebRTC-based peer synchronization, and seamless video streaming using torrents.

## ✨ Features

- **🔐 Password Protected**: Secure room access with configurable password
- **🎥 WebTorrent Streaming**: Stream videos directly from magnet links
- **🔄 Real-time Sync**: Watch videos in perfect sync with friends using WebRTC
- **💬 Live Chat**: Chat with other viewers while watching
- **📱 Responsive Design**: Works on desktop and mobile devices
- **☁️ One-Click Deploy**: Easy deployment to Fly.io

## 🚀 Quick Deploy

Deploy instantly to Fly.io by clicking the button above, or follow the manual deployment steps below.

## 🛠️ Manual Deployment

### Prerequisites

- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) installed
- A Fly.io account

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jorybraun/webtorrent-webrtc-party-fly.git
   cd webtorrent-webrtc-party-fly
   ```

2. **Deploy to Fly.io:**
   ```bash
   fly deploy
   ```

3. **Set your password:**
   ```bash
   fly secrets set APP_PASSWORD=your-secure-password
   ```

4. **Access your app:**
   Your app will be available at `https://your-app-name.fly.dev`

## 🔧 Configuration

### Environment Variables

- `APP_PASSWORD`: The password required to access the streaming room (default: "changeme")
- `PORT`: Server port (default: 8080, automatically set by Fly.io)

### Setting Environment Variables

You can set environment variables using the Fly.io CLI:

```bash
fly secrets set APP_PASSWORD=your-secure-password
```

Or through the Fly.io dashboard.

## 📖 How to Use

1. **Access the App**: Navigate to your deployed app URL
2. **Enter Password**: Use the password you configured to enter the room
3. **Load a Video**: Paste a magnet link to load a video
4. **Invite Friends**: Share the URL and password with friends
5. **Watch Together**: Videos automatically sync across all connected viewers
6. **Chat**: Use the built-in chat to communicate while watching

## 🏗️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   ```bash
   export APP_PASSWORD=your-password
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080`

## 🤝 How It Works

- **WebTorrent**: Streams video files directly from torrent networks
- **WebRTC**: Enables real-time peer-to-peer communication for sync
- **WebSockets**: Handles signaling and chat messages
- **Express**: Serves the web interface and handles authentication

## 🔒 Security Notes

- Always use a strong password for production deployments
- The app is designed for private use among trusted friends
- Consider using HTTPS in production (automatically handled by Fly.io)

## 🐛 Troubleshooting

- **Video won't load**: Make sure the magnet link is valid and contains video files
- **Sync issues**: Click the "Sync with Others" button to manually resynchronize
- **Connection problems**: Check your internet connection and firewall settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WebTorrent](https://webtorrent.io/) for P2P video streaming
- [simple-peer](https://github.com/feross/simple-peer) for WebRTC connectivity
- [Fly.io](https://fly.io/) for easy deployment