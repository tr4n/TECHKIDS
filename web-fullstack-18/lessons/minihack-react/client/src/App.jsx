import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    keyword: "",
    items: []
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({ keyword: event.target.value });
  //  console.log(this.state.keyword);

  }

  
  render() {
    return (
      <div className="App container h1" onScroll={() => console.log(window.scrollY)}>
        
        </div>


      </div>
    );
  }
}

export default App;
