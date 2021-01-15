import React from 'react';
import './navigation.css'
import {Navbar,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = ({routeChange}) =>{  
  return(
     <div className='navbar-container'>
      <Navbar variant="dark">
       <Nav className="mr-auto">
        <Nav.Link 
         //href="/login"
         href="#"  
         className='nav-link'>
         <p className='nav-link-text'>
          Edit profile
         </p>
        </Nav.Link>
        <Nav.Link 
         //href="matches-list" 
         className='nav-link'
        >
         <p className='nav-link-text'>
          Matches list
         </p>
        </Nav.Link>
        <Nav.Link 
         className='nav-link'
         href="login"
         onClick={() => routeChange('login')}
        >
         <p className='nav-link-text'>
          Sign out
         </p>
        </Nav.Link>
       </Nav>
      </Navbar>
    </div>   
  )
}

export default Navigation;