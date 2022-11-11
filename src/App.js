import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import MyParticles from './components/particle/MyParticles';
import './App.css';
import React, { Component } from 'react';
// ---------------clafifai related code
// const USER_ID = 'nisha-1205092';
// // Your PAT (Personal Access Token) can be found in the portal under Authentification
// const PAT = 'c2a459add0d445a085463d2bac09df1a';
// const APP_ID = 'my-general-image-recognition';
// // Change these to whatever model and image URL you want to use
// const MODEL_ID = 'general-image-recognition';
// const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
// const IMAGE_URL = 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg';
// ---------------clafifai related code
const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id, 
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined          
    }})  
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height), 
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log('input: ' + this.state.input); //still empty
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
    console.log('imageUrl: ' + this.state.imageUrl); //still empty
    // console.log('click') 
    fetch('http://localhost:3002/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3002/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}));
            })
            .catch(err => console.log('error putting image ', err));
            
          this.displayFaceBox(this.calculateFaceLocation(result));
          } //end if
        } //end then 2
        //console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
      ) //end then 2
      .catch(error => console.log('error', error));
    // this.displayFaceBox(this.calculateFaceLocation(result));
  } //end of onButtonSubmit     

  render() {
    //destructuring, to remove this.state
    const {isSignedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">
        <MyParticles /> 
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange = {this.onInputChange} 
                onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>  
            </div> 
          : ( route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )  
        }
        
      </div>
    );
  }
  
}

export default App;
