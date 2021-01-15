import React from 'react'
import HobbyCard from '../Hobby Card/HobbyCard.js'
import hobbiesArray from '../Hobbies Array/hobbies.js'
import './hobbiesList.css'
import { Button } from 'react-bootstrap'
import optionsIcons from '../Hobbies Array/hobbiesIconsArr.js'
import {DataConsumer} from '../context/context.js'
import Home from '../../Home.js'


class HobbiesList extends React.Component{
  constructor(props){
   super(props)
   this.state={
    hobbies: hobbiesArray,
    currentPage: 'hobbies-list',
    sentData: false,
    currentHobbies: [],
    rendundantHobbies: false
   }
  }


  componentDidMount(){
   fetch('https://fierce-shore-66137.herokuapp.com/getHobbies',{
    method:'post',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify({
     user_id: this.props.userId 
    }) 
   })
   .then(res => res.json())
   .then(data =>{
    //define an array of strings based on hobbies names: 
    let currentHobbiesLabel = data.map(item =>{
      return item.hobby;
    })
    this.setState({currentHobbies: currentHobbiesLabel})
   })
   .catch(err => console.log(err)) 
  }


  sendHobbiesData = (hobbiesArr) =>{
   //hobbiesArr -> array data structure
   fetch('https://fierce-shore-66137.herokuapp.com/addHobbies',{
    method:'post',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify({
     selectedHobbies: hobbiesArr,
     user_id: this.props.userId 
    }) 
   })
   .then(response => response.json())
   .then((data) => console.log(data))

  }

  
  //first solution-> using .includes() method inside a for loop => O(n) time complexity:
  checkRedundancy = (selectedHobbies) =>{
   for(let i=0;i<selectedHobbies.length;i++){
    if(this.state.currentHobbies.includes(selectedHobbies[i])){
     this.setState({rendundantHobbies: true}); 
     return true; //stop the function 
    } 
   }
   this.setState({rendundantHobbies: false});
   return false;
  }

  

  //this method return true if find an redundant hobby in user hobbies array:
  //(an hobby has choosen 2 or more times)
  //optimal solution -> O(n) time complexity:
  checkRedundancyHobbies(selectedHobbies){
   let currentHobbies = [...this.state.currentHobbies]; 
   //define an hashtable that represent current hobbies by the user:
   let map = {};
   for(let i=0;i<currentHobbies.length;i++){
    map[currentHobbies[i]] = currentHobbies[i]; 
   }
   
   //loop over selected hobbies:
   for(let i=0;i<selectedHobbies.length;i++){
    //check if already exist in hashmap:  
    if(selectedHobbies[i] in map){
     this.setState({rendundantHobbies: true}); 
     return true; //stop the function
    } 
   }
   this.setState({rendundantHobbies: false});
   return false;
  }



  //render -> component method
  render = () =>{
   console.log(this.state.rendundantHobbies)

   //"map" every hobby option button: 
   let hobbiesListArr = this.state.hobbies.map(item =>{
     return (
      <HobbyCard 
       key={item.id}
       hobbyName = {item.hobbyName}
       iconName = {optionsIcons[item.id-1]}
       selectedItem = {item.selected}
       itemId = {item.id}
      />

     ) 
   })
   

   return(
    this.state.currentPage === 'hobbies-list' ?
    (
     <div className='hobbies-list-container'>
      <div className='hobbies-section-title center-elem'>
       <p className='title-hobby-list'>
         What's your hobby/hobbies?  
       </p>
      </div>

      {/*this section will contain a list of cards:  */}
      <div className='hobbies-list '>
       {hobbiesListArr}
      </div> 
 
      <DataConsumer>
       { 
        (data) =>{
         //console.log('choosed items by the user:\n',data.selectedHobbies)  
         return( 
          <div className='back-link '>

           {/* render some messages to the user: */
            data.selectedHobbies.length === 0 ? 
             <p 
              className='choose-item-msg'
              style={{fontSize:'21px'}}>
              You must choose an item
             </p> :
             (this.state.rendundantHobbies ? 
              <p
               className='choose-item-msg'
               style={{fontSize:'19px'}}>
               Please choose distinct hobbies that you don't have yet
              </p> :
              <p></p>)
           }

   
           <Button
            className='save-user-data-btn'
            onClick={() => {
             
             //selected hobbies(array of strings) 
             let hobbyNames = data.selectedHobbies.map(item =>{
              return item.hobbyName;
             });
             
             console.log(hobbyNames)

             if(data.selectedHobbies.length === 0){
              console.log('no item choosed')
             }else{
              if(this.checkRedundancyHobbies(hobbyNames)){
               console.log('please choose distinct hobbies'); 
               this.setState({sentData: false});
              }else{
               //call this method to update the user message for hobbies redundancy 
               this.checkRedundancyHobbies(hobbyNames);
               this.setState({sentData: true})
               return this.sendHobbiesData(hobbyNames)
              }
             }
            }}
           >
            Save data
           </Button>
           
           {
            //render a message after sending hobbies to the server:
            this.state.sentData ? 
            <p 
             className='choose-item-msg'
             style={{marginTop:'25px',fontSize:'19px'}}>
              Data saved with success
            </p> : 
            <p></p>
           }

           <div className='back'>
            <Button 
             className='btn-style'
             style={
              {
               marginTop:'35px',
               cursor:'pointer'
              }
             }
             onClick={() => this.props.changeRoute('home')}
            >
             Back to home
            </Button> 
           </div>
          </div>
         )
        }
       }
      </DataConsumer> 
     </div> 
    ) : <Home />
   )   
  }
}

export default HobbiesList;
