import React from 'react'
import './searchBar.css'
import {Form, FormControl} from 'react-bootstrap'

class Searchbar extends React.Component{

 constructor(props){
  super(props)
  this.state={
   searchField: '' 
  }
 }

 onUserNameChange = (event) =>{
  this.setState({searchField: event.target.value})
 }

  render(){
    return(
      <div className='search-bar-component center-elem'>
       <div className='search-section'>
        <Form inline className='searchbar-form'>
         <FormControl 
          type="text" 
          placeholder="Search users" 
          className="mr-sm-2 search-field" 
          // onChange={(e) => this.onUserNameChange(e)}
          onChange={this.props.searchUser}
         />
         
        </Form>
       </div>   
      </div>   
    ) 
  }  
}

export default Searchbar;
