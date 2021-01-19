import React from 'react'
import Home from '../../Home.js'
import {Button} from 'react-bootstrap'
import './editProfile.css';
import Login from '../Login/Login.js'
import Register from '../Register/Register.js'
import {Form} from 'react-bootstrap'
import firebase from '../../firebase.js'
import userDefaultPic from './user-default-pic.png'


class EditProfile extends React.Component{
  constructor(props){
   super(props)
   this.state={
    currentPath: 'edit-profile',
    currentUserHobbies: {
      userArrHobby:[] //this array is empty before componentDidMount() method call
    },
    newUserName: this.props.passUserData.username,
    newCity: this.props.passUserData.city,
    imageSource: userDefaultPic //default user picture
   }
  } 

  componentDidMount(){
   fetch('https://fierce-shore-66137.herokuapp.com/getUsersData')
   .then(res => res.json())
   .then(data =>{
     this.getCurrentUserHobbies(data.usersHobbies)
    }
   )
   this.setProfilePicture();
  }

  setProfilePicture = () =>{
   let storageRef = firebase.storage().ref()
   let spaceRef = storageRef.child('images/' + this.props.passUserData.imageprofile)
   storageRef
    .child('images/' + this.props.passUserData.imageprofile)
    .getDownloadURL()
    .then(url =>{
     console.log('image url:\n',url)
     this.setState({imageSource: url}) 
    }) 
  }

  routeChange = (path) =>{
   this.setState({currentPath: path})   
  }
 
  //implement in this component a method that extract hobbies array for the current user:
  getCurrentUserHobbies = (array) =>{
    for(let i=0;i<array.length;i++){    
     if(array[i].user_id === this.props.userId){
      this.setState({currentUserHobbies: array[i]});
      break;
     }else{
      this.setState({currentUserHobbies:[]}) 
     } 
    }
  }


  //method that delete an user by his id and email:
  deleteUserData = () =>{
   fetch('https://fierce-shore-66137.herokuapp.com/delete-user',{
    method:'delete',
    headers:{'Content-type':'application/json'},
    //additional data for delete request:
    body: JSON.stringify({
     givenUserId: this.props.userId,
     givenUserEmail: this.props.passUserData.email 
    })
   })
   .then(res => res.json())
   .then(data => console.log(data)) 
  }

  
  //grab data from textfield:
  onChangeNewName = (event) =>{
   this.setState({newUserName: event.target.value});
  }

  onChangeNewCity = (event) =>{
   this.setState({newCity: event.target.value});
  }


  //method that change username:(must change from POST to PUT methods types later on-> tomorrow)
  changeUserName = () =>{
   //send to the server user id and new username
   fetch('https://fierce-shore-66137.herokuapp.com/change-user-name',{
    method:'put',//change to PUT type
    headers:{'Content-type':'application/json'},
    body: JSON.stringify({
     userId: this.props.userId, 
     newName: this.state.newUserName
    }) 
   })
   .then(res => res.json())
   .then(data => console.log(data))
  }

  //method that change city:
  changeUserCity = () =>{
   //send to the server user id and new city
   fetch('https://fierce-shore-66137.herokuapp.com/change-user-city',{
    method:'put',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify({
     userId: this.props.userId,
     newCity: this.state.newCity 
    }) 
   })
   .then(res => res.json())
   .then(data => console.log(data))
  }

  render(){
   return(
    this.state.currentPath === 'edit-profile' ?
    //edit profile page structure:
    (<div>
      {/* title of page: */}
      <div className='edit-profile-title-section'>
       <p className='edit-profile-title'>
        Your account
       </p> 
      </div>

      {/* user card: contain profile picture, details and below setting section that modify details of their account: */}
      <div className='user-data-card-container'>
       <div className='main-user-data-container'>
        <h4 className='user-data-card-title'>
          Personal information 
        </h4> 
        <div className='user-data-card'>
         <div className='imgprf-container center-elem'>
          <img
           className='user-profile-image' 
           src={this.state.imageSource}
           alt='user-profile'
          />
         </div> 
         <div className='usr-data-section center-elem'>
          {/* define a list here of main details: username,city,etc. */}
          <ul className='main-user-data-list '>
           <li>
            {/* name here: */}
            <p className='user-data-label'>
             Username:
            </p>
            <p className='usr-data-text'>
             {this.props.passUserData.username}
            </p> 
           </li>

           <li>
            <p className='user-data-label'>
             Email:
            </p> 
            <p className='usr-data-text'>
             {this.props.passUserData.email}
            </p>  
           </li>

           <li>
            <p className='user-data-label'>
             City: 
            </p>
            <p className='usr-data-text'>
             {this.props.passUserData.city}
            </p> 
           </li>

          </ul>
         </div> 
        </div>
      
        {/* user hobbies list: */}
        <div className='user-hobbies-details'>
         <p className='user-hobbies-label'>
          Your selected hobbies:
         </p> 
         <div className='user-hobbies-list-items'>
          { 
           this.state.currentUserHobbies.userArrHobby !== undefined ?
           (
            this.state.currentUserHobbies.userArrHobby.map((item,index) =>{
              return <p key={index}
                       className='user-hobby-list-item'
                     >
                      {item}
                     </p> 
              })
           ) : //otherwise if there's not hobbies
           (<p style={
            {
             fontSize:'15px',
             textAlign:'center'
            }
           }>
             You don't have any hobby yet
            </p>)
          }
         </div> 
        </div>

       </div>
      </div>

      {/* user account settings section: */}
      <div className='account-settings-container main-user-data-container'>
       {/* change username,city, delete hobbies */}
       <h4 className='user-data-card-title'>
        Account settings 
       </h4>
       <Form >
        <div className='settings-container'>

         <Form.Group className='change-data'>
          <Form.Label className='setting-label'>
           Change your username:
          </Form.Label>
          <div className='center-comp'>
           <Form.Control
            className='change-name-field'
            type='text'
            onChange={(event) => this.onChangeNewName(event)}
           />
          </div>
         </Form.Group>

         <Form.Group className='change-data'>
          <Form.Label className='setting-label'>
           Change your city:
          </Form.Label>
          <div className='center-comp'>
            <Form.Control
             className='change-name-field'
             type='text'
             onChange={(event) => this.onChangeNewCity(event)}
            />
          </div>
         </Form.Group>
           
         <div className='changes-msg-container'>
          <p className='changes-msg'>
           After your changes reconnect to your account to see the result
          </p>
         </div>

         {/* button for save setting: */}
         <div className='center-comp'>
          <Button
           className='save-account-setting btn-style'
           //onclick -> call changeUserName and changeUserCity methods  
           onClick={()=>{
             this.changeUserName();
             this.changeUserCity();
            }
           }
          >
           Save changes   
          </Button>
         </div>
          
         {/* delete account section: */}
         <div className='delete-account'>
          <label className='delete-account-label'>
           Delete account 
          </label>
          <div className='delete-section'>
           <p className='warning-message'>
            Are you sure you want to delete your account?
           </p>
           <p className='warning-message'>
            All data will be lost.
           </p>
           <Button 
            className='delete-account-btn'
            onClick={() => {
             this.routeChange('login');
             //call here a method that create an request that delete data from database:
             this.deleteUserData();

            }}
           >
            Delete 
           </Button>
          </div>
         </div>

        </div>
       </Form>
      </div>

      <Button
       className='btn-style back-btn-home'
       onClick={() => this.routeChange('home')}
      >
       Back to home
      </Button> 
    </div>) : //otherwise render that
    this.state.currentPath === 'home' ?
    (<Home
      routeChange={this.routeChange}
      userdata={this.props.passUserData}
     />) : //otherwise render that
    this.state.currentPath === 'login' ? 
    (<Login
      routeChange={this.routeChange}
      passUser={this.props.passUser}
     />) : 
    <Register
      routeChange={this.routeChange}
      passUser={this.props.passUser}
    />
   )  
  }

}

export default EditProfile;