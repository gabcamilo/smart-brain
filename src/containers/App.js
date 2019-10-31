import React, {Component} from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//aefe9fbcfa8a40dbb6da47a65ccd0071
const app = new Clarifai.App({
  apiKey: 'aefe9fbcfa8a40dbb6da47a65ccd0071'
 });

class App extends Component {
constructor(){
  super();
  this.state = {
    input:'',
    imageUrl:''
  }
}

  particlesOptions ={
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 300
        }
      }
    }
  }
  //Clarifai.FACE_DETECT_MODEL
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onSubmit = (event) =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input ).then(
      function(response) {
        console.log(`Quantidade de rostos encontrados: ${response.outputs[0].data.regions.length}`);
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        alert('invalid image!!');
        this.setState({input: '', imageUrl: ''});
        console.log('erroooo!!');
      }
    );
  }
  render(){
    return(
    <div className="App">
      <Particles params={this.particlesOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
    );
  }
}

export default App;
