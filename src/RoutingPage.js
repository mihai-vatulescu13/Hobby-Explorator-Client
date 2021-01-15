import React from 'react'
import Login from './components/Login/Login.js'
import Home from './Home.js'
import Register from './components/Register/Register.js'


class RoutingPage extends React.Component{
  constructor(){
   super() 
   this.state={
    path: 'login',
    userData:{
     user_id: '',
     username: '',
     email: '',
     city: '',
     joined: '',
     imageprofile: '' 
    }
   }
  }
  
  //routeChange method is common for Login and Home component
  routeChange = (route) =>{
   this.setState({path: route})
  }
 

  passUser = (data) =>{
    this.setState({
     userData:{
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      city: data.city,
      joined: data.joined,
      imageprofile: data.imageprofile
     } 
    })
  }


  render = () =>{
   return (
    <div>
      {/* render a component by the current state path: */}
      {
        this.state.path === 'home' ?
        <Home 
         routeChange={this.routeChange}
         userdata={this.state.userData}
         passUser={this.passUser}
        /> : 
        (
         this.state.path === 'login' ?
         (<Login 
          routeChange={this.routeChange}
          passUser={this.passUser}
         />) :
         (<Register
          routeChange={this.routeChange} 
          passUser={this.passUser}
         />)
        )          
      }
    </div>   
   )   
  }
}

export default RoutingPage;