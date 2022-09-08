import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import MyParticles from './components/particle/MyParticles';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyParticles />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      
      {/*{
      <FaceRecognition />
      }*/}
    </div>
  );
}

export default App;
