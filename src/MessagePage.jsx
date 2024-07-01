import React, { useState, useEffect } from 'react';
import { Search, Send, Paperclip, Mic } from 'lucide-react';

const MessagingPage = () => {
  if (window.location.pathname !== '/messaging') {
    return null;
  }
  
  useEffect(() => {
    // Simulating fetching messages
    setMessages([
      { id: 1, sender: 'Alice Smith', text: 'Hey, how are you?', time: '10:30 AM' },
      { id: 2, sender: 'You', text: "I'm good, thanks! How about you?", time: '10:32 AM' },
      { id: 3, sender: 'Alice Smith', text: 'Doing well, thanks for asking!', time: '10:33 AM' },
      { id: 4, sender: 'Alice Smith', text: 'This is a new message from Alice Smith!', time: '10:40 am' },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputMessage('');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">CraftConnect</h1>
        <nav className="mt-2">
          <a href="#" className="mr-4">Home</a>
          <a href="#" className="mr-4">Features</a>
          <a href="#" className="mr-4">Products</a>
          <a href="#" className="mr-4">Community</a>
          <a href="#" className="mr-4">Profile</a>
        </nav>
      </header>

      <div className="flex-grow flex overflow-hidden">
        <aside className="w-1/4 bg-white p-4 overflow-y-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {['All', 'Unread', 'Important', 'Archived'].map((filter) => (
              <button key={filter} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
                {filter}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {['Alice Smith', 'Bob Johnson'].map((contact) => (
              <div key={contact} className="flex items-center p-2 hover:bg-gray-100 rounded">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <span>{contact}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-grow flex flex-col bg-gray-50">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Alice Smith</h2>
            <span className="text-green-500">Online</span>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <p>{message.text}</p>
                  <span className="text-xs opacity-75">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Send size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Paperclip size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Mic size={20} />
              </button>
            </div>
          </div>
        </main>

        <aside className="w-1/4 bg-white p-4 border-l">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <h3 className="font-semibold">Alice Smith</h3>
            <span className="text-green-500">Online</span>
          </div>
          <div className="space-y-2">
            <button className="block w-full p-2 bg-gray-100 rounded hover:bg-gray-200">View Profile</button>
            <button className="block w-full p-2 bg-gray-100 rounded hover:bg-gray-200">Block User</button>
            <button className="block w-full p-2 bg-gray-100 rounded hover:bg-gray-200">Mute Notifications</button>
            <button className="block w-full p-2 bg-gray-100 rounded hover:bg-gray-200">Delete Conversation</button>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Shared Media</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-200 h-16 rounded"></div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="bg-gray-800 text-white p-4 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold mb-2">About CraftConnect</h5>
            <p>CraftConnect is your go-to platform for connecting with artisans and discovering unique handmade products.</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold mb-2">Quick Links</h5>
            <ul>
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h5 className="font-bold mb-2">Contact Us</h5>
            <p>Email: info@craftconnect.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Craft Lane, Artisan City, CA 90210</p>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="font-bold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-pink-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2024 CraftConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MessagingPage;