import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar />
      <Main />
      </BrowserRouter>
    );
  }
}

export default App;
