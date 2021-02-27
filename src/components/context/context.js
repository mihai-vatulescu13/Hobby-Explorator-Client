import React from 'react'
import hobbiesArray from '../Hobbies Array/hobbies.js'
//create an data flow between components using React Context-Provider-Consumer:
//Context contain Provider(source) and Consumer(the final destination)
const DataContext = React.createContext(); 

//create provider source component(this will be a class):
class DataProvider extends React.Component{

  constructor(props){
   super(props);
   this.state = {
    hobbiesList : hobbiesArray, 
    selectedHobbies: [],
    userNumCompatibilities: 0,
    //user attributes(used for message box section):
    userId: null,
    userPicturePath: '',
    userName: ''

   } 
  }


  getItem = (id) =>{
   const hobby = this.state.hobbiesList.find(item =>{
    return item.id === id; 
   })
   return hobby;
  }  


  //a method that add every eslected hobby into an array of hobbies:
  //every hobby will be added by a specific and unique id:
  addHobby = (id) =>{
   const selectedItem = this.getItem(id);
   //update item status:
   selectedItem.selected = true;
   let tempArr = this.state.selectedHobbies;
   tempArr.push(selectedItem);
   //update the state:
   this.setState(() => {return {selectedHobbies: tempArr}})
  }
  
   
  //implement remove item function using .splice() method:
  removeHobby = (id) =>{
   let temp = this.state.selectedHobbies;

   temp = temp.filter(selectedItem =>{
    return selectedItem.id !== id;
   }) 

   const selectedItem = this.getItem(id);
   //update item status:
   selectedItem.selected = false;
   this.setState({selectedHobbies: temp})
   
  }

  
  handleUserMessage = (username,userid,imgsource) =>{
   //then using passed data update the state:
   this.setState({userName: username})
   this.setState({userId: userid})
   this.setState({userPicturePath: imgsource})

  }


  render = () =>{

   return(
    <DataContext.Provider
     //must be default keyword("value"): 
     value = {{
      selectBtn: this.selectBtn,
      getItem: this.getItem,
      addHobby: this.addHobby,
      selectedHobbies: this.state.selectedHobbies,
      updateStatus: this.updateStatus,
      removeHobby: this.removeHobby,
      handleUserMessage: this.handleUserMessage,
      //send user details to message page:
      userName: this.state.userName,
      userId: this.state.userId,
      userPicturePath: this.state.userPicturePath
      
     }}
    >
     {/*pass data to children components: */}
     {this.props.children}   
    </DataContext.Provider>   
   )   
  }  
}

//define the consumer component for child/s:
const DataConsumer = DataContext.Consumer;

//export them:
export {DataProvider, DataConsumer };
