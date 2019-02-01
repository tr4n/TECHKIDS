import React, { Component } from 'react'; 
import {Form, FormGroup, Input, Button} from 'reactstrap';

export default class NewGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            player1: '',
            player2: '',
            player3: '',
            player4: ''
        
          };
    
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }
    

      handleSubmit(event){
          event.preventDefault();
          console.log(this.state);

      }
      handleInputChange(event){
       // console.log(event.target.name);
      //  console.log(event.target.value);
        this.setState({[event.target.name] : event.target.value})
      }

    render(){
        return (
            <Form onSubmit = {this.handleSubmit}>
                <FormGroup>
                    <Input
                        name="player1"
                        placeholder="First Player's name"
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="player2"
                        placeholder="Second Player's name"
                        onChange={this.handleInputChange}

                    />
                </FormGroup>
                <FormGroup>
                   <Input
                        name="player3"
                        placeholder="Third Player's name"
                        onChange={this.handleInputChange}

                    />
                </FormGroup>
                <FormGroup>
                   <Input
                        name="player4"
                        placeholder="Forth Player's name"
                        onChange={this.handleInputChange}

                    />
                </FormGroup>
                <Button> Create new game</Button>
            </Form>
        );
    }
}