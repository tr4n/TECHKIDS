import React, { Component } from 'react';

import './App.css';
import Navbar from './Components/Navbar'

class App extends Component {
  state = {
    now: new Date().toTimeString(), 
    title : "Score Keeper"
  }

  updateTime  = () => {
    this.setState({now: new Date().toTimeString() })
  }

  componentDidMount(){
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  render() {
   // const title = "Score Keeper";
    return (
      <div className="App">
        <header className="App-header">
          <Navbar title={this.state.title} time = {this.state.now}/>
        </header>
      </div>
    );
  }
}

export default App;
