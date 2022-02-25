import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/signin/Signin';
// import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import Profile from './components/Profile/Profile';
import Loading from './components/LoadingAnimation/Loading';


const particlesOptions ={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}
const initialState = {
  input: '',
  imageUrl:'',
  box: [],
  route: 'signin',
  urlRes: true, //to display "detecting face..."
  isSignin: false,
  profile: false,
  user:{
    id: "",
    name:"",
    email:"",
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super()
    this.state= initialState
  }
  
  getProfileAndLoadUser = (userId, token) =>{
    fetch(`https://intense-sea-48271.herokuapp.com/profile/${userId}`, {
      method: 'get',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
     .then(resp=> resp.json())
     .then(user=>{
       this.loaduser(user);
       this.onRouteChange('home');
     }).catch(err => console.log('error getting user info'))
  }

  componentDidMount(){
    const token = window.sessionStorage.getItem('token');
    if(token){
      this.setState({route: 'loadingScreen'});
      fetch(`https://intense-sea-48271.herokuapp.com/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
       .then(resp=> resp.json())
       .then(data=>{
         if( data && data.id){
           this.getProfileAndLoadUser(data.id, token)
         }
       })
       .catch(err => console.log('error signin', err))
    }
  }

  saveAuthTokenToSession = (token) => {
      window.sessionStorage.setItem('token', token)
  }
   
  removeAuthTokenFromSession = (token) =>{
      fetch(`https://intense-sea-48271.herokuapp.com/signout`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
       .then(res=>res.json)
       .catch(console.log)
     window.sessionStorage.removeItem('token');
  }


  loaduser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFaceLocations = (data) =>{
    if(data && data.outputs){
      // console.log(data);
      //  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  
       const image = document.getElementById('inputImage');
       const width = Number(image.width);
       const height = Number(image.height);
       return data.outputs[0].data.regions.map(region=>{
        const clarifaiFace = region.region_info.bounding_box;
        return {
          bottomRow: height-(clarifaiFace.bottom_row*height),
          leftCol: clarifaiFace.left_col*width,
          rightCol:width-(clarifaiFace.right_col*width),
          topRow:clarifaiFace.top_row*height
        }
     }) //for multiple faces
    }
    return;
  }

  displayFaceBox = (box)=> {
    //  console.log(box)
     if(box){
       this.setState({box: box});
      }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    // console.log('click');
    this.setState({imageUrl: initialState.imageUrl})
    this.setState({imageUrl: this.state.input})
    if(this.state.input === ''){
      return this.setState({urlRes: true})
    }
    this.setState({urlRes: false})
    fetch(`https://intense-sea-48271.herokuapp.com/imageurl`, { 
      method: 'post',
      headers:{
        'Content-Type':'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=> response.json())
    .then(response => {
      if(response){
          this.setState({urlRes: true})
          fetch(`https://intense-sea-48271.herokuapp.com/image`,{ // put request for user entries update
          method:'put',
          headers:{
            'Content-Type':'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body:JSON.stringify({id: this.state.user.id})
        }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocations(response))})
    .catch(error =>  console.log(error))
  }

  onRouteChange = (route) => {
    if(route==='signin'||route==='register'){
      if(window.sessionStorage.length){
        let token = window.sessionStorage.getItem('token');
        this.removeAuthTokenFromSession(token);
      }
      this.setState(initialState) // initialstate is used to clear the state after signout
    }
    else if(route==='home'){
      this.setState({isSignin: true})
      this.setState({profile: false})
    }else if(route==='profile'){
      this.setState({profile: true})
    }
    this.setState({route: route})
  }


  render(){ 
    if(this.state.route === 'loadingScreen'){
      return (
        <div>
          <Loading/>
        </div>
      );
    }
    return (
      <div className="App">
         <Particles className='particles'
           params ={particlesOptions} />
          <Navigation
            profile = {this.state.profile}
            isSignin={this.state.isSignin}
            onRouteChange={this.onRouteChange}/>
          {this.state.route==='home'?
            <div> 
              {/* <Logo/> */}
              <Rank name = {this.state.user.name} entries={this.state.user.entries} urlRes={this.state.urlRes}/>
              <ImageLinkForm 
                onInputChange = {this.onInputChange}
                onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          :(this.state.route==='profile'?
             <Profile onRouteChange = {this.onRouteChange} user={this.state.user} loaduser={this.loaduser}/>
          :(this.state.route==='signin'?
             <Signin 
               loaduser={this.loaduser} 
               onRouteChange={this.onRouteChange}
               saveAuthTokenToSession={this.saveAuthTokenToSession}
               getProfileAndLoadUser={this.getProfileAndLoadUser}/>
             : <Register 
                 loaduser={this.loaduser} 
                 onRouteChange={this.onRouteChange} 
                 saveAuthTokenToSession ={this.saveAuthTokenToSession}
                 getProfileAndLoadUser={this.getProfileAndLoadUser}/>      
            )    
          )        
        }  
      </div>
    );
  }
}

export default App;