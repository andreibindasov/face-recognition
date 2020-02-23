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
  // apiKey: '6ba5f8003f6c49f19815c5eb33c82c10'
  apiKey:'0738174cda9f4394a3a585cc94e838d8'
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

const initState = {
  input: '',
  imageUrl: '',
  box: {}, 
  route: 'signin',
  isSignedIn: false,
  
  user: {
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined:''
  }
}

export default class App extends React.Component {
  
  state = initState;

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined:data.joined
    }})
  }

// --> HOOK
  // componentDidMount() {
  //   fetch('http://localhost:3030')
  //     .then(res => res.json())
  //     .then(console.log)
  // }



  calculateFaceLocation=(_data_)=>{
    const clarifaiFace = _data_.outputs[0].data.regions[0].region_info.bounding_box;
    // const celeb = _data_.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
    const getImage = document.getElementById('imageDetected');
    const width = Number(getImage.width);
    const height = Number(getImage.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      // name: celeb  

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
      .then(response => {
        if (response) {
          fetch('http://localhost:3030/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count=> {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err)); 
  }

  onRouteChange = (route) =>{
    if (route==='signout'){
      this.setState(initState)
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
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              { this.state.imageUrl &&  <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> }
            </div>
          : (
              this.state.route==='signin' ?
              <Signin 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} /> 
              :
              <Register 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} /> 
            )
          
        }
      </div>
    );
  }
}

