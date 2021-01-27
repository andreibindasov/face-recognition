import React from 'react';

import Particles from 'react-particles-js';

import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';




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
  boxes: [], 
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



  calculateFaceLocations=(_data_)=>{
    return _data_.outputs[0].data.regions.map(face=>{
      const clarifaiFace = face.region_info.bounding_box
      const getImage = document.getElementById('imageDetected');
      const width = Number(getImage.width);
      const height = Number(getImage.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
    // const celeb = _data_.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
   
      // name: celeb  

    // }
  }

 displayFaceBoxes = (boxes) => {
   this.setState({boxes: boxes})
 }

  onInputChange=(e)=>{
    this.setState({ input: e.target.value});
    // this.setState({imageUrl: this.state.input});
  }

  onSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3030/imageurl', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            input: this.state.input
     
        })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3030/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
                input: this.state.input,
                imageUrl: this.state.imageUrl,
                box: this.state.box
            })
        })
          .then(response => response.json())
          .then(count=> {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
      }
        console.log(response)
        this.displayFaceBoxes(this.calculateFaceLocations(response))
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
              { this.state.imageUrl &&  <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} /> }
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

