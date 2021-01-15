import React from 'react'
import {Card, Button} from 'react-bootstrap'
// import STYLESHEET file from react Bootstrap:
import 'bootstrap/dist/css/bootstrap.min.css';
import './hobbyCard.css'
import {DataConsumer} from '../context/context.js'


// hobby card structure/design:
class HobbyCard extends React.Component{

 render = () =>{
  const {hobbyName, iconName, itemId} = this.props;

  return( 
  <DataConsumer>
   {
     (data) =>{
      return(
       //main component container:  
       <div className='main-card-container center-elem'>
        {/*this section contain title and button of the card:*/}
        <div className='card-container'>
        {/*option logo section */}
        <div className='card-icon-container center-elem'>
          <img 
            src={iconName}
            alt='option-icon'
            className='card-icon'
          />
        </div>
        {/*in this section we keep title and button */}
        <div className='card-title-logo'>
          {/*add a logo here later on */}
          <div className='center-elem card-title'>
            <Card.Title 
            className='card-hobby-title'
            >
            {hobbyName} 
            </Card.Title>       
          </div>
          <div className='add-remove'>
            {/* selection button: */}
            <div className='center-elem card-btn'>
              <Button 
                variant="primary"
                className='select-hobby-btn'
                onClick={() =>{
                return data.addHobby(itemId);
                }}
              >
                {
                data.getItem(itemId).selected === true ? 'Selected' : 'Select' 
                }
              </Button>  
            </div>
            <div className='center-elem card-btn'>
              {
                data.getItem(itemId).selected ? 
                (
                  <Button 
                  variant="primary"
                  className='select-hobby-btn'
                  onClick={() =>{
                  return data.removeHobby(itemId);
                  }}
                 >
                  Remove 
                 </Button>  
                ) : 
                //render an empty component
                (<div> </div>) 
              } 
            </div>
          </div>
        </div>   
      </div>

      </div> 
     )
    }
   } 
  </DataConsumer>      
 );   
}
}

export default HobbyCard;