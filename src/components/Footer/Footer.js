import React from 'react';
// import logos for footer contact section:
import insta_logo from '../images/insta-logo.png'
import github_logo from '../images/mark-github-512.png'
import linkedin_logo from '../images/linkedin_logo.png'
import './footer.css'

const Footer = () =>{
 return(
  <div className='footer-container'> 
   {/*author details section: */}
   <div className='author-details'>
    <div className='auth-data'>
      <p className='name'>
      {/*left side:white color,right side:radiant gradient colors */}
        Author:<span className='color-text'> Mihai Vatulescu</span>
      </p>
      <p className='date-created'>
        Date:<span className='color-text'> 14.01.2021</span>   
      </p>
      <p className='contact-me'>
        Contact me: vatulescu.mihai@gmail.com or
      </p>
    </div> 
   </div>
   {/* contact details section: */}
   <div className='contact-details'>
    <ul>

     <li className='contact-item'>
      <img 
        className='contact-logo'
        src={linkedin_logo}
        alt="facebook logo"
      />
      <a href='https://www.linkedin.com/in/mihai-vatulescu-2659291b2/' 
         className='contact-platform-name'>
       linkedin
      </a>
     </li>

     <li className='contact-item'>
      <img 
        className='contact-logo'
        src={insta_logo}
        alt="instagram logo"
      /> 
      <a href='https://www.instagram.com/mihai_vatulescu/' 
         className='contact-platform-name'>
       Instagram
      </a>
     </li>

     <li className='contact-item'>
      <img 
        className='contact-logo'
        src={github_logo}
        alt="linkedin logo"
      /> 
      <a href='https://github.com/mihai-vatulescu13' 
         className='contact-platform-name'>
       github
      </a>
     </li>
      
    </ul>
   </div>
  </div>   
 )   
}

export default Footer;