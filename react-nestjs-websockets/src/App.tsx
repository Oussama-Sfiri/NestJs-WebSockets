import React from 'react';
import './App.css';
import { WebsocketProvider, socket } from './contexts/WebsocketContext';
import Chat from './components/Chat';

function App() {
  return (
    <WebsocketProvider value={socket}>
      <Chat/>
    </WebsocketProvider>
  );
}

export default App;
