import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (user && text) {
      try {
        await axios.post('/api/messages', { user, text });
        setUser('');
        setText('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <p>{message.user}: {message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatLayout;
