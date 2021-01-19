import React from 'react'
import './userCard.css'
import firebase from '../../firebase.js'
//use later on as default picture if the user was not choose a profile picture
import userPicture from '../images/user-picture1.png'

class UserCard extends React.Component{
 constructor(props){
  super(props);
  this.state = {
   imageSource: userPicture //default user picture 
  }
 } 

 componentDidMount(){
  let storageRef = firebase.storage().ref()
  let spaceRef = storageRef.child('images/'+this.props.imageprofile)
  storageRef
   .child('images/'+this.props.imageprofile)
   .getDownloadURL()
   .then(url =>{
    console.log('image url:\n',url)
    this.setState({imageSource: url}) 
   })

 }

 render(){
  const {username,hobby1,hobby2,hobby3,city,imageprofile,email} = this.props;  
  return(
   <div className='user-card-container'>
    {/* profile picture section for the user card */}
    <div className='user-picture-section center-elem'>
     <img
      //use require to import image/file automatically from a local folder 
      src={this.state.imageSource} 
      alt='user-profile-img'
      className='profile-picture'
     />
    </div>
    
    {/* user data section:->contain username(fname,lname),hobbies,city and chat button (maybe) */}
    <div className='user-data-section center-elem'>
     <div className='fname-lname'>
      <h4 className='username'>{username}</h4>
      {/* <h4 className='lname'>Mitica</h4>  */}
     </div>

     <div className='hobbies-city'>
      <div className='hobbies-description'>
        {/* this part will show for each user first 3 hobbies(from his hobbies array->hobby:0,1,2->index) */}
        <p className='user-hobby-text'>
         email: {email}
        </p>
        <p className='user-hobby-text'>
         {hobby2}
        </p>
        <p className='user-hobby-text'>
         {hobby3}
        </p>
      </div>
      <div className='city-container'>
       <h5 className='city-text'>
        city: {city}
       </h5>
       <p className='user-rating'>
        {/* automatically counter(passed from the server) later on show user popularity*/}
        {/* people compatibility: 25  */}
       </p>
      </div>
     </div>

    </div>

   </div>   
  )
 }   
}

export default UserCard;