// Simulated WebSocket connection
const socket = {
    on: (event, callback) => {
        if (event === 'message') {
            setInterval(() => {
                const randomUser = conversations[Math.floor(Math.random() * conversations.length)];
                const newMessage = {
                    id: messages.length + 1,
                    senderId: randomUser.id,
                    text: `This is a new message from ${randomUser.name}!`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                callback(newMessage);
            }, 15000); // Simulate a new message every 15 seconds
        }
    },
    emit: (event, data) => {
        console.log(`Emitted ${event}:`, data);
    }
};

// DOM elements
const conversationList = document.querySelector('.conversation-list');
const messagesContainer = document.querySelector('.messages');
const messageInput = document.querySelector('.rich-text-input');
const sendButton = document.querySelector('.send-btn');
const filterButtons = document.querySelectorAll('.filters button');
const searchInput = document.querySelector('.search-bar input');
const userNameElement = document.getElementById('user-name');
const userStatusElement = document.getElementById('user-status');
const userAvatar = document.querySelector('.user-avatar');
const newChatBtn = document.querySelector('.new-chat-btn');
const newChatModal = document.getElementById('newChatModal');
const newChatSearch = document.getElementById('newChatSearch');
const newChatUserList = document.getElementById('newChatUserList');
const startNewChatBtn = document.getElementById('startNewChat');
const closeModalBtn = document.getElementById('closeModal');

// Mock data for conversations
let conversations = [
    { id: 1, name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hi there!', timestamp: '10:30 AM', unread: 2, online: true },
    { id: 2, name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'How are you?', timestamp: 'Yesterday', unread: 0, online: false },
    { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'See you soon!', timestamp: 'Mon', unread: 1, online: true }
];

// Mock data for messages
let messages = [
    { id: 1, senderId: 1, text: 'Hey, how are you?', timestamp: '10:30 AM' },
    { id: 2, senderId: 2, text: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: 3, senderId: 1, text: 'Doing well, thanks for asking!', timestamp: '10:33 AM' }
];

// Mock data for users
const users = [
    { id: 4, name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=4', online: true },
    { id: 5, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5', online: false },
    { id: 6, name: 'Frank Miller', avatar: 'https://i.pravatar.cc/150?img=6', online: true }
];

// Current active conversation
let activeConversation = null;

// Populate conversation list
function populateConversationList(conversationsToShow = conversations) {
    conversationList.innerHTML = '';
    conversationsToShow.forEach((conversation) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${conversation.avatar}" alt="${conversation.name}">
            <div>
                <h4>${conversation.name}</h4>
                <p>${conversation.lastMessage}</p>
            </div>
            <span>${conversation.timestamp}</span>
            ${conversation.unread ? `<span class="unread-count">${conversation.unread}</span>` : ''}
            <span class="user-status ${conversation.online ? 'online' : 'offline'}"></span>
        `;
        li.addEventListener('click', () => loadMessages(conversation.id));
        conversationList.appendChild(li);
    });
}

// Load messages for a conversation
function loadMessages(conversationId) {
    messagesContainer.innerHTML = '';
    activeConversation = conversations.find(c => c.id === conversationId);
    
    if (activeConversation) {
        userNameElement.textContent = activeConversation.name;
        userStatusElement.innerHTML = activeConversation.online ? 
            '<i class="fas fa-circle"></i> Online' : 
            '<i class="fas fa-circle offline"></i> Offline';
        userAvatar.src = activeConversation.avatar;
        document.querySelector('.thread-avatar').src = activeConversation.avatar;
        document.querySelector('.thread-info h2').textContent = activeConversation.name;

        // Reset unread count
        activeConversation.unread = 0;
        populateConversationList();
    }

    messages.forEach((message) => {
        addMessageToUI(message);
    });
}

// Send a new message
function sendMessage() {
    const text = messageInput.textContent.trim();
    if (text && activeConversation) {
        const newMessage = {
            id: messages.length + 1,
            senderId: 2, // Assuming current user's ID is 2
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        messages.push(newMessage);
        addMessageToUI(newMessage);
        messageInput.textContent = '';

        // Update last message in conversation list
        activeConversation.lastMessage = text;
        activeConversation.timestamp = newMessage.timestamp;
        populateConversationList();

        // Emit message to WebSocket
        socket.emit('message', newMessage);
    }
}

// Add a single message to the UI
function addMessageToUI(message) {
    const div = document.createElement('div');
    div.classList.add('message', message.senderId === 2 ? 'sent' : 'received');
    div.innerHTML = `
        <p>${message.text}</p>
        <span class="timestamp">${message.timestamp}</span>
    `;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle keypress events in the message input
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Filter conversations
function filterConversations(filter) {
    let filteredConversations;
    switch(filter) {
        case 'Unread':
            filteredConversations = conversations.filter(c => c.unread > 0);
            break;
        case 'Important':
            // Implement your own logic for important conversations
            filteredConversations = conversations.filter(c => c.id % 2 === 0); // Example: even IDs are important
            break;
        case 'Archived':
            // Implement your own logic for archived conversations
            filteredConversations = [];
            break;
        default:
            filteredConversations = conversations;
    }
    populateConversationList(filteredConversations);
}

// Search conversations
function searchConversations(query) {
    const filteredConversations = conversations.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
    populateConversationList(filteredConversations);
}

// Open new chat modal
function openNewChatModal() {
    newChatModal.style.display = 'block';
    populateNewChatUserList();
}

// Close new chat modal
function closeNewChatModal() {
    newChatModal.style.display = 'none';
    newChatSearch.value = '';
    newChatUserList.innerHTML = '';
}

// Populate new chat user list
function populateNewChatUserList(usersToShow = users) {
    newChatUserList.innerHTML = '';
    usersToShow.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
            ${user.name}
            <span class="user-status ${user.online ? 'online' : 'offline'}"></span>
        `;
        li.addEventListener('click', () => startNewChat(user));
        newChatUserList.appendChild(li);
    });
}

// Start a new chat
function startNewChat(user) {
    const newConversation = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        lastMessage: '',
        timestamp: 'Now',
        unread: 0,
        online: user.online
    };
    conversations.unshift(newConversation);
    populateConversationList();
    loadMessages(user.id);
    closeNewChatModal();
}

// Search users in new chat modal
function searchUsers(query) {
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    populateNewChatUserList(filteredUsers);
}

// Initialize the page
function init() {
    populateConversationList();
    loadMessages(conversations[0].id);

    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', handleKeyPress);
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterConversations(button.textContent);
        });
    });
    searchInput.addEventListener('input', (e) => searchConversations(e.target.value));
    newChatBtn.addEventListener('click', openNewChatModal);
    closeModalBtn.addEventListener('click', closeNewChatModal);
    newChatSearch.addEventListener('input', (e) => searchUsers(e.target.value));

    // Listen for new messages
    socket.on('message', (newMessage) => {
        if (newMessage.senderId === activeConversation.id) {
            addMessageToUI(newMessage);
        } else {
            const conversation = conversations.find(c => c.id === newMessage.senderId);
            if (conversation) {
                conversation.lastMessage = newMessage.text;
                conversation.timestamp = newMessage.timestamp;
                conversation.unread += 1;
                populateConversationList();
            }
        }
    });
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Existing event listeners and functions...

// Add typing indicator
let typingTimeout;
messageInput.addEventListener('input', () => {
    clearTimeout(typingTimeout);
    socket.emit('typing', { conversationId: activeConversation.id, isTyping: true });

    typingTimeout = setTimeout(() => {
        socket.emit('typing', { conversationId: activeConversation.id, isTyping: false });
    }, 2000);
});

// Listen for typing events
socket.on('typing', (data) => {
    if (data.conversationId === activeConversation.id) {
        const typingIndicator = document.querySelector('.typing-indicator') || document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        if (data.isTyping) {
            typingIndicator.textContent = `${activeConversation.name} is typing...`;
            messagesContainer.appendChild(typingIndicator);
        } else {
            typingIndicator.remove();
        }
    }
});