import React from 'react'
import './userCard.css'
import firebase from '../../firebase.js'
//use later on as default picture if the user was not choose a profile picture
import userPicture from '../images/user-picture1.png'
import {DataConsumer} from '../context/context.js'
import {Button} from 'react-bootstrap'


class UserCard extends React.Component{
 constructor(props){
  super(props);
  this.state = {
   imageSource: userPicture, //default user picture
   userMatchHobbies: [] 
  }
 } 


 componentDidMount(){
  let storageRef = firebase.storage().ref()
  storageRef
   .child('images/'+this.props.imageprofile)
   .getDownloadURL()
   .then(url =>{
    this.setState({imageSource: url}) 
   })
  
  //call receiveHobbies to set the array of hobbies for each user form matches list: 
  this.receiveHobbies()

 }



 //method that receive hobbies from server for matched user:
 //then modify the state:
 receiveHobbies = () =>{
  fetch('https://fierce-shore-66137.herokuapp.com/getHobbies',{
   method:'post',
   headers:{'Content-type':'application/json'},
   body: JSON.stringify({
    user_id: this.props.userid 
   }) 
  })
  .then(res => res.json())
  .then(data =>{
    const hobbiesArr = data.map(item =>{
     return item.hobby 
    })
    this.setState({userMatchHobbies: hobbiesArr});
  })

 }



 render(){
  const {username,city,email,userid} = this.props;  
  
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
     </div>

     <div className='hobbies-city'>
      <div className='hobbies-description'>
        {/* this part will show for each user first 3 hobbies(from his hobbies array->hobby:0,1,2->index) */}
        <p className='user-hobby-text'>
         <span className='city-text'>{email}</span>
        </p>
        {/* this section represents matched user hobbies list: */}
        <div className='center-elem matched-user-hobbies'>
         <h5>Hobbies:</h5> 
         <ul>
          {
            this.state.userMatchHobbies.map((item,index) =>{
             return <li className='hobby-list-item' key={index}>{item}</li> 
            })
          }
         </ul> 
        </div> 
      </div>

      <div className='city-container center-elem'>
       <h5>
        City: <span className='city-text'>{city}</span>
       </h5> 
      </div>
     </div>

     {/*Message button section:*/}
     <DataConsumer>
      {
        (value) =>{
        
         return(
          //Pass to this button component user name, picture and id as props:  
          <Button
           className='btn-style'
           onClick={() =>{
            // value.renderMessagePage('message-page');
             value.handleUserMessage(username,userid,this.state.imageSource);
             this.props.renderMessagePage()
           }}
          >
           Message
          </Button> 
         ) 
        } 
      } 
     </DataConsumer>

    </div>

   </div>   
  )
 }   
}

export default UserCard;