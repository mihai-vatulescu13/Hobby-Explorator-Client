import React,{useState} from "react";
import './messagePage.css'
import {DataConsumer} from '../context/context.js'
import {Button} from 'react-bootstrap'
import MatchesList from '../Matches list/MatchesList.js'
import Home from '../../Home.js'
// import {db} from './firebaseChatConfig'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import firebase from '../../firebase.js'


function MessagePage(props){
  //initialize database:
  const db = firebase.firestore()
  
  //state used for current page status:
  const [currentPath, setCurrentPath] = useState('message-page');
  // const [receivedUserId,setReceivedUserId] = useState(null)

  //create a reference to our database:
  const messagesRef = db.collection('messages');
  const [message, setMessage] = useState('');

  //data query and extract data from document:
  const query = messagesRef
              .where('room','==','General')

  const [messages] = useCollectionData(query,{
   idField: 'id'
  });

 
  //submit the message function
  const handleSubmit = async (e) =>{
   e.preventDefault()
   //add message data to our collection(collection model schema)   
   await messagesRef.add({
    userId: props.userId, //add current user id and receiver id automatically
    receiverId: props.selectedUserId,
    createdAt: new Date(),
    text: message, 
    room: 'General'
   })
   
   //reset message state:
   setMessage('')
  }


  //change route function:
  const changeRoute = path =>{
   setCurrentPath(path);
  }

  //print all the messages:
  // console.log('messages',messages)

  return(
    currentPath === 'message-page' ?
    (<div className='message-page-main-container'> 
     {/* user picture and name section(top section ): */}
     <div className='center-elem'>
      <DataConsumer>
       { //the "value" object is coming/exported from context.js file 
        (value) =>{
         return(
         <div className='picture-and-name'> 
          <img 
           src={value.userPicturePath} 
           alt='user message profile'
           className='user-message-picture'
          />

          <div className='name-and-close-btn'>
           <h4 className='messaging-user-name'>
            {value.userName}
           </h4> 
           <Button  
            className='btn-style message-btn-style'
            onClick={() => changeRoute('matches-list')}
           >
            Close 
           </Button> 
          </div>
         </div>  
         )
        }
       } 
      </DataConsumer> 
     </div>
     
     {/* section where the messages will be displayed: */}
    <div className='messages-main-container center-elem'>

     {/* render all messages: */}
     <div className='messages-container '>
      {/* check if the array of messages is undefined to print a message
       otherwise render all messages: */
       messages !== undefined ? 
        messages.sort((a,b) => {
         //sort user data by sent date:    
         return a.createdAt - b.createdAt
        })
        .filter(item => { 
         //filter user data by users id's:   
         return ((item.userId === props.userId && item.receiverId === props.selectedUserId) || 
           (item.userId === props.selectedUserId && item.receiverId === props.userId))  
        })
        .map((item,index) =>{
          return <Message 
                  key = {index}
                  text = {item.text}
                  userId = {item.userId}
                  receiverId = {item.receiverId}
                  currentUserId = {props.userId}
                 />
         }) : <h2>Loading</h2>
        }
     </div>
      


      <div className='center-elem'>
       <div className='message-box-and-send-btn center-elem'>
   
        {/* messages form here: */}
        <form 
         onSubmit = {handleSubmit}
         className='messages-form-style'
        >
          <textarea
           value = {message}
           onChange = {(e) => setMessage(e.target.value)}
           placeholder = 'Enter message'
           className='message-text-area'
          />

          <Button
           type = 'submit'//-> call onSubmit that call handleSubmit function
           className = 'btn-style message-btn-style'
           disabled = {!message}
          >
            Send
          </Button>
        </form>

       </div>
      </div>
    </div>

    </div>) : 
    currentPath === 'matches-list' ? 
    <MatchesList 
     userId={props.userId}
     changeRoute = {props.changeRoute}
     /> : 
    <Home/>
    
   )//close return statement   
}



//define message component body inside MessagePage file:
function Message({text, userId, receiverId, currentUserId}){
  let styleStatus = userId === currentUserId ? 'sender' : 'receiver';
  // console.log(receiverId)
  return(
   <div className={`message-body-container-${styleStatus}`}>
    <h4 className={`message-style-${styleStatus}`}>
      {text}
    </h4> 
   </div> 
  )
}

export default MessagePage;