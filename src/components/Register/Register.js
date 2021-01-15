import React from 'react'
import {Form} from 'react-bootstrap'
import registerLogo from '../images/register-logo.png'
import './register.css'
import Footer from '../Footer/Footer.js'
import {DataConsumer} from '../context/context.js'
import FileUpload from '../file upload/FileUpload.js'
import Login from '../Login/Login.js'


class Register extends React.Component{
  constructor(props){
   super(props);
   this.state = {
    regPath:'register',
    userName: '',
    email: '',
    password: '',
    city: '',
    isPasswordComplex: false
   }   
  } 
 
 //this method handle the path change: 
 onChangeReg = (path) =>{
  this.setState({regPath: path});
 }
 
 //this method handle the user full name:
 handleName = (event) =>{
  this.setState({userName: event.target.value});
 }

 handleEmail = (event) =>{
  this.setState({email: event.target.value});
 }

 handlePassword = (event) =>{
  this.setState({password: event.target.value});
  if(event.target.value.length >= 8){
   this.setState({isPasswordComplex: true}); 
  }else{
   this.setState({isPasswordComplex:false}) 
  }
 }

 handleCity = (event) =>{
  this.setState({city: event.target.value});
 }


  render = () =>{
   if(this.state.regPath === 'register'){
    return(
     <div>
        <DataConsumer>
         {
           (value) =>{
            return(
             <div className='main-container'>
              <div className='login-container'>
              {/*Title + logo section:  */}
              <div className='title-container'>
               {/*Top container includes logo + title section: */}
               <div className='top-container'>
                <div className='logo-container'>
                 <img 
                   className='user-logo'
                   src={registerLogo}
                   alt="user-logo"
                 />
                </div>
                <div className='title-page'>
                 {/*Divide the title in two different colors:*/}
                 <p className='page-title'>
                  <span className='second-half-title'>
                   Register
                  </span>
                 </p>   
                </div>   
               </div>
              </div> 
         
               {/* message section */}
               <div className='follow-message-section'>
                <p className='follow-message'>
                 Create your user account
                </p>   
               </div>
              
               {/* for signin form section(labels+input fields) use REact bootstrap or materialUi */}
               {/*Credentials section container:  */}
               <div className='credentials-section-container'>  
                <Form className ='form-container'>
                 {/*username field */}
                 <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                   Full name
                  </Form.Label>
                  {/*password input textfield: */} 
                  <Form.Control 
                   type="text" 
                   placeholder="Username" 
                   onChange={this.handleName}
                  />
                 </Form.Group>
         
                 {/*email field */}
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
                 
                 {/*password field */}
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
                 
                 {
                   //render a message password here in case if it's not complex:
                   !this.state.isPasswordComplex ? 
                   (<p style={
                     {color: '#FE6B8B',
                      fontSize: '13px',
                      textAlign: 'center'
                     }
                    }>
                     Your password must have more than 8 characters!
                    </p>) :
                   (<p style={
                     {color: '#FE6B8B',
                      fontSize: '13px',
                      textAlign: 'center'
                     }}>
                     Your password is ok
                    </p>)
                 }
              
         
                 {/*city field */}
                 <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                   City
                  </Form.Label>
                  {/*password input textfield: */} 
                  <Form.Control 
                   type="text" 
                   placeholder="City" 
                   onChange={this.handleCity}
                  />
                 </Form.Group>
                 

                 {/*image upload component: */}
                 {/* pass register user data to FileUpload component
                 for send to the server */}
                 <FileUpload 
                  userData={this.state}
                  onChangeReg={this.onChangeReg} 
                 />
        

                </Form> 
               </div>
               {/* close login-container class */}
              </div>
              {/* footer component */}
              <Footer className='footer-component'/>
             {/* close main-container class */} 
             </div> 
            ) 
           }
         } 
        </DataConsumer>
     </div>  
    )
   }else if(this.state.regPath === 'login'){
    return <Login 
            passUser = {this.props.passUser}
            routeChange = {this.props.routeChange}
           />
   } 

  }
}

export default Register;