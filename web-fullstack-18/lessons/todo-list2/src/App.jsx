import React, { Component } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import CreateTodoForm from './components/CreateTodoForm';

class App extends Component {
  state = {
    todoItems: [{
      id: 0,
      content: "clean house",
      finish: true,
      createAt: new Date()
    }, {
      id: 1,
      content: "clean house 1",
      finish: false,
      createAt: new Date()
    }, {
      id: 2,
      content: "clean house 2",
      finish: true,
      createAt: new Date()
    }, {
      id: 3,
      content: "clean house 3",
      finish: true,
      createAt: new Date()
    }, {
      id: 4,
      content: "clean house 4",
      finish: false,
      createAt: new Date()
    }]
  };

  addItem = (input) => {
    //console.log(input);
    const itemId = this.state.todoItems.length > 0 ? this.state.todoItems[this.state.todoItems.length-1].id + 1 : 0; 
    this.setState({ todoItems: [...this.state.todoItems, { id:itemId, content: input.newItem, finish: false, createAt: new Date() }] });
  };
  updateItem = (itemId) => {
    //  console.log(itemId);
    this.setState({
      todoItems: this.state.todoItems.map(
        item => (item.id === itemId ? { ...item, finish: true } : item)
      )
    })
  }
  deleteItem = (itemId) => {
    // console.log(itemId);
    this.setState({
      todoItems: this.state.todoItems.filter(item => (item.id !== itemId))
    })
  }
  render() {
    return (
      <div className="App">
        <TodoList
          todoItems={this.state.todoItems}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem} />
        <CreateTodoForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
