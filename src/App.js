import React from 'react';

import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';


const app = new Clarifai.App({
  apiKey: '6ba5f8003f6c49f19815c5eb33c82c10'
});

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

export default class App extends React.Component {
  
  state = {
    input: '',
    imageUrl: '',
    box: {}
  }

  calculateFaceLocation=(_data_)=>{
    const clarifaiFace = _data_.outputs[0].data.regions[0].region_info.bounding_box;
    const getImage = document.getElementById('imageDetected');
    const width = Number(getImage.width);
    const height = Number(getImage.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

 displayFaceBox = (box) => {
   this.setState({box: box})
 }

  onInputChange=(e)=>{
    this.setState({ input: e.target.value});
    // this.setState({imageUrl: this.state.input});
  }

  onSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err)); 
  }

  render(){
    return (
      <div className="App">
        
        <Particles className='particles' params={particlesOptions} />    
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

