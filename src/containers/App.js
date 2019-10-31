import React, {Component} from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
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
    imageUrl:'',
    box:{},
    route: 'signin'
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

  calcFaceLocation = (data) =>{
    console.log(data);
    const boxData = data[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return ({
      leftCol: boxData.left_col * width,
      topRow: boxData.top_row * height,
      rightCol: width - (boxData.right_col * width),
      bottomRow: height - (boxData.bottom_row * height)
    });
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onSubmit = (event) =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input ).then(
      (response) => {
        const box = this.calcFaceLocation(response.outputs[0].data.regions)
        return box;
      }).then((box)=>{
        this.displayFaceBox(box);
      })
      .catch(err =>{ 
        alert('Invalid image!');
        this.setState({input: '', imageUrl: '', box: {}});
        console.log(err);
      });
    
  }

  onRouteChange = (route) =>{
    this.setState({route: route});
  }
  render(){
    return (
    <div className="App">
      <Particles params={this.particlesOptions} className='particles'/>
      <Navigation onRouteChange={this.onRouteChange}/>
      {
        this.state.route ==='signin'?
          <SignIn onRouteChange={this.onRouteChange}/>
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
      }
    </div>
    );
  }
}

export default App;
