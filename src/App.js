import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/signin/signin';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register'
import Particles from 'react-particles-js';


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
  box: {},
  route: 'signin',
  urlRes: true, //to display "detecting face..."
  isSignin: false,
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
  
  loaduser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //  console.log('face', clarifaiFace);
     const image = document.getElementById('inputImage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
       bottomRow: height-(clarifaiFace.bottom_row*height),
       leftCol: clarifaiFace.left_col*width,
       rightCol:width-(clarifaiFace.right_col*width),
       topRow:clarifaiFace.top_row*height
     }
  }

  displayFaceBox = (box)=> {
    //  console.log(box)
     this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    // console.log('click');
    this.setState({imageUrl: this.state.input})
    if(this.state.input === ''){
      return this.setState({urlRes: true})
    }
    this.setState({urlRes: false})
    fetch('https://sleepy-castle-93981.herokuapp.com/imageUrl', {
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=> response.json())
    .then(response => {
      if(response){
          this.setState({urlRes: true})
          fetch('https://sleepy-castle-93981.herokuapp.com/image',{ // put request for user entries update
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id: this.state.user.id})
        }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(error =>  console.log(error))
  }

  onRouteChange = (route) => {
    if(route==='signin'||route==='register'){
      this.setState(initialState) // initialstate is used to clear the state after signout
    }
    else{
      this.setState({isSignin: true})
    }
    this.setState({route: route})
  }
  render(){ 
    return (
      <div className="App">
         <Particles className='particles'
          params ={particlesOptions} />
          <Navigation 
          isSignin={this.state.isSignin}
          onRouteChange={this.onRouteChange}/>
          {this.state.route==='home'?
          <div>
            <Logo/>
            <Rank name = {this.state.user.name} entries={this.state.user.entries} urlRes={this.state.urlRes}/>
            <ImageLinkForm 
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :(this.state.route==='signin'?
             <Signin loaduser={this.loaduser} onRouteChange={this.onRouteChange}/>
             : <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange}/> 
            )            
        }  
      </div>
    );
  }
}

export default App;