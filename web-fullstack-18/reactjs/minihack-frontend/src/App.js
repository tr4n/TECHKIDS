import React, { Component } from 'react';
import Header from './Components/Header';
import NewGame  from './Components/NewGame';
import {Container} from 'reactstrap';
import './App.css';

class App extends Component {
 

  componentDidMount(){
  
  }

  
  render() {
    return (
      <Container className="App" >
       <Header />
       <NewGame />
       {
         
       }
      </Container>
     
     
     
    );
  }
}

export default App;
