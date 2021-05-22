import React from 'react'
import {Button} from 'react-bootstrap'
import './fileUpload.css'
import firebase from '../../firebase.js'

//file upload component(for image input):
class FileUpload extends React.Component {
 constructor(props){
  //inheritance data from Register class component: 
  super(props);
  this.state={
   file: '',
   //default picture in case that user dont coose any profile picture:
   uploadedFileName: '',
   uploadedFilePath:'',
   isSubmited: false,
   correctInput: false   
  }   
 } 


 handleFile = (event) =>{
  this.setState({file: event.target.files[0]});
 }

 //handle image upload
 handleUpload = () =>{ 
  let file = this.state.file;
  let bucketName = 'images';
  let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
  let uploadTask = storageRef.put(file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,() =>{
   //let downloadURL = uploadTask.snapshot.downloadURL 
  })

  console.log('name of the file:\n',file.name)
 }


 validateUserData = () =>{
  //check if the one or many fields are empty: 
  const {userName, email, password, city} = this.props.userData;
  if(!userName || !email || !password || !city){
   return false;
  }else{
   this.setState({correctInput: true}) 
   return true 
  }  
 }


 uploadUserData = () =>{
  const {userName, email, password, city} = this.props.userData; 
  fetch('https://fierce-shore-66137.herokuapp.com/register',{
   method: 'POST',
   headers: {'Content-type':'application/json'},
   body: JSON.stringify({
    userName: userName,
    email: email,
    password: password,
    city: city,
    imageprofile: this.state.file.name
   }) 
  })
  .then((data) => data.json())
  .catch(() => console.log('an error has occured!'))
  
  this.setState({isSubmited: true})
 }


 render(){
  return(  
   <div>
    <div className='file-upload-container center-elem'>
     <div className='input-and-label center-elem'>
      <p className='picture-profile-label'>
       Choose profile picture(required to create account)
      </p> 
      <input 
       type='file' 
       className='file-input'
       onChange = {async event => {
        await this.handleFile(event);
        this.handleUpload();
       }}
      />
     </div>
    </div>


    
 

   <div className='btn-container'>
     <Button 
      variant="primary" 
      // type="submit"
      className='btn-style'
      //this function below will sent the entire data to the server(main user data and his bobbies list(form different states-))
      onClick={() => {
       if(this.validateUserData() && this.props.userData.isPasswordComplex){
        this.uploadUserData()
        this.props.onChangeReg('login');
       }else{
        console.log('please complete all fields or check your password complexity')
       }
      }}
     >
      Register
    </Button>  
   </div>

   {
     !this.state.correctInput ? 
      (<p style={
        {
         textAlign: 'center',
         color:'#FE6B8B',
         marginTop:'8px'
        }
       }
      >
       Please complete all fields before submit!
      </p>): //otherwise
     this.props.userData.isPasswordComplex ?  
     (<div> 
       <p></p>
     </div>) : //otherwise
     (<div> 
       <p style={
        {
         textAlign: 'center',
         color:'#FF8E53'
        }
       }>
        Please check your credentials!
       </p>
      </div>)  
   }
   </div>   
  )
 }   
}

export default FileUpload;