import React from 'react';

class CreateTodoForm extends React.Component {
    state = {
        inputValue : ""
    }
    handleInputChange = (event) => {
        const newInputValue = event.target.value; 
     //   console.log(newInputValue);
        this.setState({ inputValue: newInputValue});
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.addItem({
            newItem: this.state.inputValue
        });
        this.setState({
            inputValue: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' value= {this.state.inputValue} onChange={this.handleInputChange}/>
                <input type='submit' value="Add Item" />
            </form>
        );
    }

}

export default CreateTodoForm; 