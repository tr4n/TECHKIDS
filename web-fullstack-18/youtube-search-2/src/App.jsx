import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/form';
import Video from './components/videos';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoItems: []
    }
    this.getVideoItems = this.getVideoItems.bind(this);
  }
  
  getVideoItems(items){
    this.setState({videoItems: items });
  }
  render() {
    return (
      <div className="App">
        <div className="container ">
          <div className="d-flex justify-content-center my-5">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc68hab8-SgO-jT8nhCjoDGT-Zlhw30HmqVdrQydXMo9havAP" alt="12"/>
            {/* <span><h2>Youtube search</h2></span> */}
          </div>
          <SearchForm getVideoItems={this.getVideoItems} />      
          <Video items =  {this.state.videoItems}/>

        </div>
      </div>
    );
  }
}

export default App;
