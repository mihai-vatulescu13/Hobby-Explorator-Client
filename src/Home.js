import React from 'react';
import pageLogo from './components/images/logo.png'
import GameImage from './components/images/game-image.jpg'
import HobbyImg from './components/images/hobby-img.png'
import './Home.css';
import Footer from './components/Footer/Footer.js'
import {Carousel} from 'react-bootstrap'
import photoHobby from './components/images/photo-hobby.jpg'
import tennishobby from './components/images/tennis-hobby.jpg'
import guitarHobby from './components/images/guitar-hobby.jpg'
import MatchesList from './components/Matches list/MatchesList.js'
import {Nav, Navbar} from 'react-bootstrap'
import Navigation from './components/Navbar/Navigation.js'
import HobbiesList from './components/Hobbies List/HobbiesList.js'
import EditProfile from './components/Edit Profile/EditProfile.js'
import { Button } from 'bootstrap';


class App extends React.Component {
  
  constructor(props){
   super(props)
   this.state={
    currentPage: 'home',
    userId: '',
    username:''
   }
  }

  changeRoute = (path) =>{
   this.setState({currentPage: path}) 
  }
  
  //lifecycle React method (is called when the component is "called"):
  componentDidMount(){
   this.setState({userId: this.props.userdata.user_id}) 
  }

  render(){ 
      return (
        // Render the home page:
        <div className="App main-container">
        { 
         this.state.currentPage === 'home' ?
         (
         <div>  
          {/* Page Logo + Title */}
          <div className='logo-container'>
           <div className='logo'>
            <img className='page-logo'
                 src={pageLogo}
                 alt='page logo'
            />
           </div>
           <div className='title'>
            <p className='title-text'>
             <span className='first-half'>
             Hobby
             </span>
             <span className='second-half'>
              Explorator
             </span>
            </p> 
           </div>
          </div>
     
          <div className='title-page-container'>
            {/*username message must be dynamic using a template string, and the name comes from the server(do this later)  */}
            <h1 className='title-page'> 
             Welcome 
             <span className='title-page-username'>
              {`${this.props.userdata.username}`}
             </span>!
            </h1> 
          </div>
          

          {/* navigation container: */}
          <div className='navbar-container'>
           <Navbar variant="dark">
            <Nav className="mr-auto">

              <Nav.Link 
               className='nav-link'
               onClick={() => this.changeRoute('hobbies-list')}
              >
                <p className='nav-link-text'>
                 Add hobbies
                </p>
              </Nav.Link>

              <Nav.Link 
               className='nav-link'
               onClick={() => this.changeRoute('edit-profile')}
              >
                <p className='nav-link-text'>
                 Account
                </p>
              </Nav.Link>

              <Nav.Link 
               className='nav-link'
               onClick={() => this.changeRoute('matches-list')}
              >
               <p className='nav-link-text'>
                 Matches list
               </p>
              </Nav.Link>

              <Button
               className='nav-link'
               href="login"
               type="submit"
               onClick={() => this.props.routeChange('login')}
              >
               <p className='nav-link-text'>
                 Sign out
               </p>
              </Button>

            </Nav>
           </Navbar>
          </div>


          {/* picture section */}
          {/* replace this section with a slide images section:*/}

          <div className='picture'>
            <Carousel className='carousel-container'>
              <Carousel.Item className='carousel-item'>
                <img
                  className="d-block  slide-img-prop"
                  src={GameImage}
                  alt="First slide"
                />
                <Carousel.Caption className='carousel-caption'>
                  <h3>Play video games</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className='carousel-item'>
                <img
                  className="d-block  slide-img-prop"
                  src={photoHobby}
                  alt="Second slide"
                />
                <Carousel.Caption className='carousel-caption'>
                  <h3>Take photos</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className='carousel-item'>
                <img
                  className="d-block  slide-img-prop"
                  src={tennishobby}
                  alt="Third slide"
                />
                <Carousel.Caption className='carousel-caption'>
                  <h3>Play tennis/sports</h3>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className='carousel-item'>
                <img
                  className="d-block  slide-img-prop"
                  src={guitarHobby}
                  alt="Fourth slide"
                />
                <Carousel.Caption className='carousel-caption'>
                  <h3>Play music</h3>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </div>
          

          {/* first description section: */}
          <div className='page-desc center-elem'>
            <div className='desc-container'>
              <div className='desctext'>
               <p className='page-desc-text'>
                Discover more people with same hobby and interact with them! 
               </p> 
              </div>

              <div className='image-and-text'>
                <div className='descimg '>
                 <img className='hobby-img'
                  src={HobbyImg}
                  alt='hobby img'
                 /> 
                </div>
                <div className='page-description'>
                 <p className='description-text'>
                   Do you have a hobby to play or do something you like and you can't do that because you're get bored by doing on your own? 
                 </p>
                 <p className='description-text'>
                  This platform is for you! In this platform you can find other people with the same hobby/passion like you have and you can interact with them in real life to do what are passionate you.
                 </p>
                </div>
              </div>  
            </div>  
          </div>
          
         </div>) : //"otherwise return this below:"
         
          this.state.currentPage === 'matches-list' ?
          (<MatchesList 
            changeRoute = {this.changeRoute}
            userId = {this.state.userId}
           />) : //otherwise:
          this.state.currentPage === 'edit-profile' ?
          (<EditProfile
            changeRoute={this.changeRoute}
            passUserData={this.props.userdata}
            userId = {this.state.userId}
            passUser={this.props.passUser}
           />) : //otherwise:
          (<HobbiesList 
            changeRoute={this.changeRoute}
            userId = {this.state.userId}
           />)
        
        } 

        {/* footer will be a react component and will be rendered for home page: */
         this.state.currentPage === 'home' ?
         <Footer/> : <div></div>
        }
        
        </div>
      );  
  }
}

export default App;
