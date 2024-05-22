import React, { useState, useRef, useEffect } from 'react';
import './chat.css';
import { PiDotsThreeVertical } from "react-icons/pi";
import { PiPaperPlaneRightFill } from "react-icons/pi";

import logo2 from './img/infraaa.png'


const Chat = ({ handleOut, userName, userEmail,}) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    sendMessages();
}, []);

const sendMessages = () => {
    const welcomeMessage = `Welcome, ${userName}, I am INEO service desk assitant.`;
    const additionalMessage = `Do you need information, want to log a service request, or report an incident?`;
    
    const botReplies = [
        { type: 'bot', text: welcomeMessage },
        { type: 'bot', text: additionalMessage }
    ];

    setMessages(prevMessages => [...prevMessages, ...botReplies]);
};

  const handleSendMessage = async () => {
    const currentMessage = inputRef.current.value.trim();

    const userMessage = { type: 'user', text: currentMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    try {
      const requestBody = { user: currentMessage };
      const botReplyLoading = { type: 'bot', text: 'Generating reply...', loading: true };
      setMessages(prevMessages => [...prevMessages, botReplyLoading]);
    
      const headers = { 'Content-Type': 'application/json', 'userEmail': userEmail, 'userName': userName };
      console.log(headers);
      // const response = await fetch('http://localhost:8000/bot', {
      const response = await fetch('https://nnpchelpdeskbe.azurewebsites.net/bot', {
      method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      
    
      const data = await response.json();
      const processedResponse = data.response.replace('Uchenna Nnamani', userName);
      const botReply = { type: 'bot', text: processBotReply(processedResponse) };
      // const zemp = data.response.replace('Uchenna Nnamani', userName)
      // const botReply = { type: 'bot', text: zemp};
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botReply]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      let errorMessage = 'Please check your internet connection';
      if (!navigator.onLine) {
        errorMessage = 'Please check your internet connection';
      }
      const botReplyError = { type: 'bot', text: errorMessage };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botReplyError]);
    }
    

    inputRef.current.value = '';
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const processBotReply = (response) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Replace all URLs with clickable buttons
    const processedResponse = response.replace(urlRegex, '<button class="link-button" data-url="$1">Click Here</button>');
    return processedResponse;
  };
  useEffect(() => {
    // Add event listeners to handle button clicks
    const handleButtonClick = (event) => {
      const url = event.target.dataset.url;
      if (url) {
        window.location.href = url;
      }
    };
  
    // Attach event listeners to all link buttons
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
  
    // Cleanup function to remove event listeners when component unmounts
    return () => {
      linkButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, [messages]);


  return (
    <section style={{background: '#f2f2f2',}}>
      <div className='nav-header-contents'>
         <div>
        <img className='navs-nnpc-logo' src={logo2} alt="" srcset="" />
          
        </div> 
        <div>
        <p className='nav-p'>
            SERVICE DESK
          </p>
        
        
        </div>
        <div className='nazz'> 
        <p className='welcome'>Hi, {`${userEmail}`}</p>
        {/* <button className='chat-navs-btn' onClick={handleOut}>
            Logout
          </button> */}
          

           <div className='dropdown'>
        <button className='nazz-dots' onClick={toggleDropdown}>
        <PiDotsThreeVertical />
           </button>
          {dropdownVisible && (
            <div>
              <button className='dropdown-content' onClick={handleOut}>Logout</button>
            </div>
          )}
        </div> 
        </div>

        
        
      </div>

      <div className='chat-container' ref={chatContainerRef}>
      <div>
        <img className='log-chat' src={logo2} alt="" srcset="" />
      </div>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
          {message.type === 'bot' && message.loading ? (
            <span className="bot-loading-message">{message.text}</span>
          ) : (
            <span className='formatted-message' dangerouslySetInnerHTML={{__html: message.text}}></span>
          )}
        </div>
          // <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
          //   {message.type === 'bot' && message.loading ? (
          //     <span className="bot-loading-message">{message.text}</span>
          //   ) : (
          //     <span className='formatted-message'>{message.text}</span>
          //   )}
          // </div>
        ))}
      </div>

      

      <div className='chat-inputs'>
        <div className='chat-inputs-2'>
          <input
            className='chat-inputs-placeholder'
            type="text"
            placeholder='How may I help you?'
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            className='chat-inputs-btn'
            onClick={() => {
              handleSendMessage(inputRef.current.value);
              inputRef.current.value = '';
            }}
          >
              <PiPaperPlaneRightFill style={{fontSize: "30px", color: "#003370"}} /> 
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
