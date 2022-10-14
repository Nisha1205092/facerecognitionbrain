import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import MyParticles from './components/particle/MyParticles';
import './App.css';
import React, { Component } from 'react';
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({apiKey: "ab6dc8175b254e0ca2e552b451ed9cd5"  });
const USER_ID = 'nisha-1205092';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'c2a459add0d445a085463d2bac09df1a';
const APP_ID = 'my-general-image-recognition';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'general-image-recognition';
const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  
  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
    console.log('input: ' + this.state.input); //still empty
    // this.setState({imageUrl: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
    console.log('imageUrl: ' + this.state.imageUrl); //still empty
    // console.log('click') 
    
   const raw = JSON.stringify({
     user_app_id : {
       user_id: USER_ID,
       app_id: APP_ID
     },
     inputs: [
       {
         data: {
           image: {
             url: this.state.input //Andrei said to use 'input' instead of imageUrl. It gives an error
           },
         },
       },
     ],
   });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
 }

  render() {
    return (
      <div className="App">
        <MyParticles /> 
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  
}

export default App;
