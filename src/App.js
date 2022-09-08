import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import MyParticles from './components/particle/MyParticles';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }
  
  onButtonSubmit = () => {
    console.log('click');
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
          
        {/*{
        <FaceRecognition />
        }*/}
      </div>
    );
  }
  
}

export default App;
