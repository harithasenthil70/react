import React, { useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Waiting for realtime notifications...');

  // Function to connect to server
  const connectToServer = () => {
    const socket = io('http://localhost:5000'); // Change port when backend is ready
    
    socket.on('connect', () => {
      setIsConnected(true);
      setMessage('✅ Connected to Notification Server!');
    });

    socket.on('notification', (data) => {
      setMessage(`🔔 New Notification: ${data}`);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      setMessage('❌ Disconnected. Trying to reconnect...');
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2099/2099071.png"
          alt="Notification Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>Realtime Notification Service</h1>
        <p style={styles.subtitle}>
          🚀 Instant Updates | 🔔 Live Alerts | ⚡ Fast & Secure
        </p>
      </header>

      <main style={styles.main}>
        <button style={styles.button} onClick={connectToServer}>
          {isConnected ? 'Connected ✅' : 'Connect to Notification Server'}
        </button>
        <p style={styles.info}>{message}</p>
      </main>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    padding: '30px'
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  logo: {
    width: '100px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '28px',
    margin: '10px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#555'
  },
  main: {
    marginTop: '20px'
  },
  button: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '10px 20px',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  info: {
    fontSize: '14px',
    marginTop: '15px',
    color: '#333'
  }
};

export default App;