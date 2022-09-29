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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    console.log(this.state.imageUrl);
    // app.models.predict("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", "https://samples.clarifai.com/face-det.jpg").then(
    //   function(response) {
    //     console.log(response);
    //   }, function(err) {

    //   });
    // app.models.predict("6dc7e46bc9124c5c8824be4822abe105", "https://samples.clarifai.com/face-det.jpg").then(
    //   function(response) {
    //     console.log(response);
    //   }, function(err) {
        
    //   });
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
