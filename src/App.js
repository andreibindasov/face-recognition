import React from 'react';

import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';


const app = new Clarifai.App({
  apiKey: '6ba5f8003f6c49f19815c5eb33c82c10'
});

const particlesOptions = {
  particles: {
    number: {
      value: 240,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

export default class App extends React.Component {
  
  state = {
    input: '',
    imageUrl: '',
    box: {}, 
    route: 'signin',
    isSignedIn: false
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
      bottomRow: height - (clarifaiFace.bottom_row * height),
      

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
      "a403429f2ddf4b49b307e318f00e528b", 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err)); 
  }

  onRouteChange = (route) =>{
    if (route==='signout'){
      this.setState({isSignedIn:false})
    } else if (route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        
        <Particles className='particles' params={particlesOptions} />    
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route==='home' ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              { this.state.imageUrl &&  <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> }
            </div>
          : (
              this.state.route==='signin' ?
              <Signin onRouteChange={this.onRouteChange} /> 
              :
              <Register onRouteChange={this.onRouteChange} /> 
            )
          
        }
      </div>
    );
  }
}

