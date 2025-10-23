# 🌍 Smart Travel Guide Chatbot

An interactive Single Page Application (SPA) that helps users explore destinations with ease. Get real-time travel suggestions, local attractions, hotel & restaurant recommendations, and essential travel tips through a friendly conversational interface.

![Travel Chatbot](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?logo=google&logoColor=white)

## ✨ Key Features

- 🏙️ **Destination Suggestions** - Get recommendations for popular places to visit
- 🏨 **Hotel Recommendations** - Find the perfect accommodation for your budget
- 🍽️ **Restaurant Suggestions** - Discover local cuisine and dining options
- ✈️ **Travel Tips** - Essential advice, best times to visit, and local customs
- 💬 **Conversational Interface** - Natural chat experience powered by Google Gemini AI
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Real-time Responses** - Instant AI-powered travel guidance

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key (already configured in the project)
- Internet connection for API calls

### Installation

1. **Download or Clone the Project**
   ```bash
   # If using git
   git clone <repository-url>
   
   # Or simply download the ZIP file and extract it
   ```

2. **Open the Application**
   - Navigate to the project folder
   - Open `index.html` in your web browser
   - That's it! No build process or dependencies required

### Alternative: Using a Local Server

For the best experience, you can run a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
Smart-Travel-Guide-Chatbot/
│
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # JavaScript logic and API integration
└── README.md          # Project documentation
```

## 🔧 Configuration

The API key is already configured in `script.js`. If you need to change it:

1. Open `script.js`
2. Find the `CONFIG` object at the top:
   ```javascript
   const CONFIG = {
       API_KEY: 'YOUR_NEW_API_KEY_HERE',
       API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
       // ...
   };
   ```
3. Replace the API key with your own

## 💡 Usage

1. **Start a Conversation**
   - Type your travel question in the input box
   - Or click one of the quick suggestion buttons

2. **Ask About:**
   - "What are the best places to visit in Paris?"
   - "Recommend hotels in Tokyo"
   - "Best restaurants in New York"
   - "Travel tips for Bali"
   - "Plan a 3-day itinerary for Rome"

3. **Get Personalized Recommendations**
   - The AI will provide detailed suggestions
   - Ask follow-up questions for more information
   - Chat history is maintained for context

## 🎨 Features Breakdown

### User Interface
- **Modern Gradient Design** - Eye-catching purple-blue gradient background
- **Smooth Animations** - Fade-in messages and interactive button effects
- **Responsive Layout** - Adapts to all screen sizes
- **Intuitive Chat Interface** - Familiar messaging app experience

### Functionality
- **Context-Aware Conversations** - Remembers previous messages
- **Quick Suggestions** - Pre-defined queries for common travel questions
- **Auto-Resizing Input** - Text area grows with your message
- **Loading Indicators** - Visual feedback while AI processes requests
- **Error Handling** - Graceful error messages for better UX

### AI Integration
- **Google Gemini 2.0 Flash** - Latest AI model for fast, accurate responses
- **Specialized Travel Prompt** - Optimized for travel-related queries
- **Markdown Support** - Formatted responses with lists and emphasis
- **Conversation Memory** - Maintains context throughout the chat

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📱 Mobile Support

The application is fully responsive and works great on:
- 📱 Smartphones (iOS & Android)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🔒 Security Note

The API key is currently embedded in the client-side code for simplicity. For production use, consider:
- Using environment variables
- Implementing a backend proxy
- Setting up API key restrictions in Google Cloud Console

## 🐛 Troubleshooting

**Issue: API Key Error**
- Ensure your API key is valid
- Check if the API key has the necessary permissions
- Verify your internet connection

**Issue: No Response from AI**
- Check browser console for errors
- Verify the API endpoint is accessible
- Ensure you haven't exceeded API quota

**Issue: Styling Issues**
- Clear browser cache
- Ensure all files are in the same directory
- Check if Font Awesome CDN is accessible

## 🚀 Future Enhancements

- [ ] Add voice input/output
- [ ] Implement user authentication
- [ ] Save chat history locally
- [ ] Add image support for destinations
- [ ] Multi-language support
- [ ] Export chat as PDF
- [ ] Integration with booking APIs

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Created with ❤️ for travelers worldwide

## 🙏 Acknowledgments

- Google Gemini AI for powering the chatbot
- Font Awesome for beautiful icons
- The open-source community

---

**Happy Traveling! 🌍✈️🗺️**

For questions or support, please open an issue in the repository.
