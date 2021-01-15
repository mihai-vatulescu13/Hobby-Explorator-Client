import React from 'react';
import './login.css'
import userLogo from '../images/user-logo.png'
// import Form and Button COMPONENTS from react Bootstrap:
import {Form, Button} from 'react-bootstrap'
// import STYLESHEET file from react Bootstrap:
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer.js'


class Login extends React.Component{

  constructor(props){
   super(props);
   this.state={
    email: '',
    password: '',
    correctCredentials: true
   }
  } 
  
  //delete later on
  changeEmail = (event) =>{
   this.setState({email: event.target.value}) 
  }

  handleEmail = (event) =>{
   this.setState({email: event.target.value});
  }

  handlePassword = (event) =>{
   this.setState({password: event.target.value});
  }


  submitLogin = () =>{
   fetch('https://fierce-shore-66137.herokuapp.com/login',{
    method: 'post',
    headers:{'Content-type':'application/json'},
     body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
     }) 
    })
    .then(resp => resp.json())//return the response as json
    .then(data =>{
     if(data.user_id){
      this.props.passUser(data)
      this.props.routeChange('home')
     }else{
      this.setState({correctCredentials: false}); 
     }
      
    })//then use given data
    .catch(err => console.log(err)) 
  }


  render(){
   return( 
    //main container:   
    <div className='main-container'>
     <div className='login-container'>
     {/*Title + logo section:  */}
     <div className='title-container'>
      {/*Top container includes logo + title section: */}
      <div className='top-container'>
       <div className='logo-container'>
        <img 
          className='user-logo'
          src={userLogo}
          alt="user logo"
        />
       </div>
       <div className='title-page'>
        {/*Divide the title in two different colors:*/}
        <p className='page-title'>
         <span className='first-half-title'>
          Sign
         </span>
         <span className='second-half-title'>
          In
         </span>
        </p>   
       </div>   
      </div>
     </div> 

      {/* message section */}
      <div className='follow-message-section'>
       <p className='follow-message'>
        Insert your credentials into follow fields:
       </p>   
      </div>
     
      {/* for signin form section(labels+input fields) use REact bootstrap or materialUi */}
      {/*Credentials section container:  */}
      <div className='credentials-section-container'>  
       <Form className ='form-container'>
        <Form.Group controlId="formBasicEmail">
         <Form.Label>
          Email address
         </Form.Label>
         {/* email input textfield: */}
         <Form.Control 
          type="email"
          placeholder="Enter email"
          onChange={this.handleEmail} 
          />
         <Form.Text className="text-muted">
          We'll never share your email with anyone else.
         </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
         <Form.Label>
          Password
         </Form.Label>
         {/*password input textfield: */} 
         <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange={this.handlePassword}
         />
        </Form.Group>
     
        <div className='btn-container'>
          {/* if the problem remain use a classic button <button/> */}
         <Button 
          //variant="primary" 
          //type="submit"
          className='btn-style'
          onClick={() => {
           this.submitLogin()
           }
          }
         >
         Login
         </Button>  
        </div>
       </Form>
   
      </div>
      {
         this.state.correctCredentials ? 
         <p></p> :
         <p style={
          {
           textAlign:'center',
           color:'#FE6B8B'
          }
         }>
          Incorrect password or email!
         </p>
      }

      {/*This section is for case when the user dosen't have an account yet, the register button will sent them to register page. */}
      <div className='register-nav-section'>
       <div className='register-nav'>
        <div className='no-account-message'>
         <p>
          You don't have an account yet? Create one now!   
         </p>
        </div>
        <div className='register-btn'>
          <Button 
            variant="primary" 
            type="submit"
            className='btn-style'
            onClick={() => this.props.routeChange('register')}
          >
           Register
          </Button>
        </div>
        
       </div>
      </div>

     </div>
     {/* additional message section: */}
     {/* <div className='other-msg'>
         
     </div> */}
     <Footer/>
    </div>
   )  
  }
}

export default Login;
