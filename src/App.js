import React, { Component } from 'react';
import './App.css';
import  Account from './components/Account/Account';
import  AppLogo from './components/AppLogo/AppLogo';
import  ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particleprops = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
              className="particles"
              params={particleprops}
            />
        <Account />
        <AppLogo />
        <Rank />
        <ImageForm />
        {/*<FaceBrain />*/}
      </div>
    );
  }
}

export default App;
