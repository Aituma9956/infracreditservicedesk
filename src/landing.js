
import React, { useState, useEffect } from 'react';
import './landing.css';
import logo from '../src/img/infra.png'
import {Link} from "react-router-dom"
function Landing({ handleFun }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const texts = [
    "Need help with software installation on my work computer?",

    "Work computer running slow, can you diagnose and fix?",
    
    "Trouble accessing applications on work computer?",
    
    "Email not syncing on devices, can you troubleshoot?",
    
    "Suspect malware on my computer, can you scan and remove?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayedText.length < texts[currentIndex].length) {
        setDisplayedText(prevText => prevText + texts[currentIndex][prevText.length]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
          setDisplayedText('');
        }, 2000); 
      }
    }, 100); 

    return () => clearInterval(interval);
  }, [currentIndex, displayedText, texts]);

  return (
    <div className="column">
      <div className='first-column'>
        <div className='one'>
          <img className='fcmb-logo' src={logo} alt="" srcset="" />
          <p className='nav-text'>SERVICE DESK</p>

        </div>
        <div className="container">
          <div className='circle'></div>
          <p className='animated-text'>{displayedText}</p>
        </div>
      </div>
      <div className='second-column'>
      <div className='onee'>
          <img className='fcmb-logoo' src={logo} alt="" srcset="" />
          <p className='nav-text'>SERVICE DESK</p>

        </div>
        <div className='background-overlay'></div>
        <div className='two'>
          <p className='two-text'>SERVICE DESK</p>
          <div className='input'>
            <p className='input-text'>How may I assist you?</p>
            <button className='input-login' onClick={handleFun}>Login</button>
           {/* <Link to="./Chat"><button className='input-login' onClick={handleFun}>Login</button></Link>  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

