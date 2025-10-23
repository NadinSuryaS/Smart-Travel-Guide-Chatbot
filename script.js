// Configuration
const CONFIG = {
    API_KEY: 'AIzaSyDhOyD_MLn-mfWR_Ng7OJcyuCrDJJnJEC8',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    SYSTEM_PROMPT: `You are a Smart Travel Guide assistant. Your role is to help users with:
- Suggesting popular places to visit in various destinations
- Recommending hotels with different budget ranges
- Suggesting restaurants and local cuisine
- Providing travel tips, best times to visit, and local customs
- Helping with itinerary planning

Be friendly, informative, and concise. Use emojis occasionally to make responses engaging. 
Provide specific recommendations with brief descriptions. If asked about a destination you're not familiar with, 
be honest but still try to provide general travel advice.`
};

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const quickSuggestions = document.getElementById('quickSuggestions');
const suggestionsSidebar = document.getElementById('suggestionsSidebar');
const toggleSidebar = document.getElementById('toggleSidebar');

// Chat History for Context
let chatHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    adjustTextareaHeight();
});

// Event Listeners
function setupEventListeners() {
    // Send button click
    sendBtn.addEventListener('click', handleSendMessage);

    // Enter key to send (Shift+Enter for new line)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Auto-resize textarea
    userInput.addEventListener('input', adjustTextareaHeight);

    // Quick suggestion buttons
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            userInput.value = query;
            handleSendMessage();
        });
    });

    // Sidebar suggestion buttons
    const sidebarSuggestions = document.querySelectorAll('.sidebar-suggestion');
    sidebarSuggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            userInput.value = query;
            handleSendMessage();
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                suggestionsSidebar.classList.remove('active');
            }
        });
    });

    // Toggle sidebar
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            suggestionsSidebar.classList.toggle('collapsed');
        });
    }

    // Mobile sidebar toggle (if needed)
    const mobileToggle = document.getElementById('sidebarToggleMobile');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            suggestionsSidebar.classList.toggle('active');
        });
    }
}

// Adjust textarea height based on content
function adjustTextareaHeight() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

// Handle sending message
async function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;

    // Disable input while processing
    setInputState(false);

    // Add user message to chat
    addMessage(message, 'user');

    // Clear input
    userInput.value = '';
    adjustTextareaHeight();

    // Hide quick suggestions after first message
    if (chatHistory.length === 0) {
        quickSuggestions.style.display = 'none';
    }

    // Show loading indicator
    showLoading(true);

    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Hide loading indicator
        showLoading(false);

        // Add bot response to chat
        addMessage(response, 'bot');

        // Add to chat history
        chatHistory.push({
            role: 'user',
            content: message
        });
        chatHistory.push({
            role: 'assistant',
            content: response
        });

    } catch (error) {
        showLoading(false);
        console.error('Error:', error);
        addErrorMessage('Sorry, I encountered an error. Please try again.');
    }

    // Re-enable input
    setInputState(true);
}

// Get AI response from Gemini API
async function getAIResponse(userMessage) {
    try {
        // Build the conversation context
        const contents = [
            {
                role: 'user',
                parts: [{ text: CONFIG.SYSTEM_PROMPT }]
            },
            {
                role: 'model',
                parts: [{ text: 'I understand. I am a Smart Travel Guide assistant ready to help users with travel recommendations, hotel and restaurant suggestions, and travel tips. I will be friendly, informative, and concise.' }]
            }
        ];

        // Add chat history
        chatHistory.forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            });
        });

        // Add current message
        contents.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        const requestBody = {
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            const text = data.candidates[0].content.parts[0].text;
            return text;
        } else {
            throw new Error('No response from AI');
        }

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'user' 
        ? '<i class="fas fa-user"></i>' 
        : '<i class="fas fa-robot"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    
    // Format the text (convert markdown-like syntax to HTML)
    textDiv.innerHTML = formatMessage(text);

    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Format message text (basic markdown support)
function formatMessage(text) {
    // Convert line breaks
    text = text.replace(/\n/g, '<br>');
    
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert numbered lists
    text = text.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
    if (text.includes('<li>')) {
        text = text.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    }
    
    // Convert bullet points
    text = text.replace(/^[-•]\s(.+)$/gm, '<li>$1</li>');
    if (text.includes('<li>') && !text.includes('<ol>')) {
        text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    return text;
}

// Add error message
function addErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    chatMessages.appendChild(errorDiv);
    scrollToBottom();
}

// Show/hide loading indicator
function showLoading(show) {
    if (show) {
        loadingIndicator.classList.add('active');
    } else {
        loadingIndicator.classList.remove('active');
    }
    scrollToBottom();
}

// Enable/disable input
function setInputState(enabled) {
    userInput.disabled = !enabled;
    sendBtn.disabled = !enabled;
    
    if (enabled) {
        userInput.focus();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Handle API key validation (optional - for production)
function validateApiKey() {
    if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
        addErrorMessage('⚠️ Please configure your Gemini API key in the script.js file.');
        setInputState(false);
        return false;
    }
    return true;
}

// Initialize validation
if (!validateApiKey()) {
    console.error('API key not configured');
}
