import React from 'react'
import './matchesList.css'
import UserCard from '../User Card/UserCard.js'
import Searchbar from '../Searchbar/Searchbar.js'
// import match_list from '../fake users/users.js'
import Home from '../../Home.js'
import {Button} from 'react-bootstrap'
import {DataConsumer} from '../context/context.js'
import MessagePage from '../Message Page/MessagePage.js'


class MatchesList extends React.Component{
  constructor(props){
   super(props)
   this.state={
    //array of users matches: 
    matchList: [],
    currentPath: 'matches-list',
    //list of hobbies for current connected user
    currentUserHobbies:{
      userArrHobby:[] //this array is empty before componentDidMount() method call
    },
    searchField: ''
   }
   this.renderMessagePage = this.renderMessagePage.bind(this)
  }
  

  componentDidMount(){
    fetch('https://fierce-shore-66137.herokuapp.com/getUsersData')
    .then(response => response.json())
    .then(data => {
      //grab hobbies for the current user:
      this.getCurrentUserHobbies(data.usersHobbies)

      //array of users after exception of current logged user:
      let filtered = this.exceptCurrent(data.usersHobbies);
      this.renderUsers(filtered)
    }) 
  }

  
  findMatches = (filteredUsers) =>{
   //here we store all "compatible" users by hobbies:
   let final = []
   const {userArrHobby} = this.state.currentUserHobbies;
   
   if(userArrHobby !== undefined){
    //O(n^2) time complexity for now (improve performance later on)
    for(let i=0;i<filteredUsers.length;i++){
     for(let j=0;j<filteredUsers[i].userArrHobby.length;j++){
      if(userArrHobby.includes(filteredUsers[i].userArrHobby[j])){
       final.push(filteredUsers[i].user_id);
      }
     } 
    }
   }else{
    //in case that for connected user don't exist hobbies(his list is empty) return an empty hobbies list:
    return []; 
   }

   //return an array id ids(integers)
   return final;
  }


  //call later on:(will update the state:-> matchList with returned/given list)
  renderUsers = (filteredUsers) =>{
   let usersFiltered = this.findMatches(filteredUsers);
   //call a fetch form server to grab all users:
   fetch('https://fierce-shore-66137.herokuapp.com/getUsers')
   .then(response => response.json())
   .then(data =>{
    //keep all users except the currently connected: 
    let filteredCurrent = this.exceptCurrent(data)
    //in this list we store the final compatible users:
    let finalList = [];

    //filteredCurrent[i].user_id -> access user id field:
    for(let i=0;i<filteredCurrent.length;i++){
     if(usersFiltered.includes(filteredCurrent[i].user_id)){
      finalList.push(filteredCurrent[i]); 
     } 
    }
  
    //"final" point:
    this.setState({matchList: finalList})
   })
  }


  //this method extract hobbies for the current user:
  getCurrentUserHobbies = (array) =>{
   for(let i=0;i<array.length;i++){    
    if(array[i].user_id === this.props.userId){
     this.setState({currentUserHobbies: array[i]});
     break;
    }else{
     console.log('something wrong has occurred, the user does not have any hobby yet')
    } 
   }
  }


  //this method except the current logged user from the users list:
  exceptCurrent = (arr) =>{
    let filtered = [];
    for(let i=0;i<arr.length;i++){
      if(arr[i].user_id !== this.props.userId){
        filtered.push(arr[i]); 
      }
    }
    return filtered;
  }

 
  //a method that search an user by a criteria:
  searchUser = (event) =>{
   this.setState({searchField: event.target.value})
  }


  //a method that allow us to render/access message page:
  renderMessagePage = () =>{
   this.setState({currentPath: 'message-page'})

  }
  


  render = () =>{
   // filter here the array by users names:
   const filteredByName = this.state.matchList.filter(user =>{
    return user.username.toLowerCase().includes(this.state.searchField.toLowerCase()) 
   })  

   const matchArr = filteredByName.map(item =>{
    return <UserCard
            key={item.user_id}
            userid = {item.user_id}
            username = {item.username}
            email = {item.email}
            city = {item.city}
            imageprofile = {item.imageprofile}
            renderMessagePage = {this.renderMessagePage} 
           /> 
   })
 
   return(
    <div> 
      {
       this.state.currentPath === "matches-list" ? 
       (<div className='match-list-main-container'>
        <div className='matches-container'>
          <div className='matches-list-title center-elem'>
            <h2>
            See your hobby compatibilities below!
            </h2> 
          </div>

          <div className='search-users-section'>
           {/*add here a search component  */}
           <Searchbar 
            searchUser = {this.searchUser}
           />
          </div>

          <div>
           <p style={{fontSize:'20px', margin:'10px'}}>
            You have 
            <span style={{color:'#FE6B8B',marginInline:'5px'}}>
             {this.state.matchList.length}
            </span>
            compatibilities
           </p> 
          </div>

          {/* back to home button */}
          <div className='center-elem'>
           <Button
            className='back-home-btn btn-style'
            onClick={() => this.props.changeRoute('home')}
           >
            Back to home
           </Button> 
          </div>
                    
          <div className='matches-list-section center-elem'>
            {/* matches lsit properly: */}
            <div className='matches-list'>
            {
             matchArr
            }
            </div> 
          </div>

        </div>
       </div>) : 
       this.state.currentPath === 'message-page' ?
       <div className='center-elem'>
        <DataConsumer>
         {
          (value) =>{
           return <MessagePage 
                   userId={this.props.userId}
                   changeRoute = {this.props.changeRoute}
                   selectedUserId = {value.userId}
                  />  
          }
         }
        </DataConsumer> 
       </div>
        : //otherwise return home page
       (<Home/>)

      } 
    </div>   
   )   
  }

}

export default MatchesList;