import React, { Component } from 'react';
import Radium, {StyleRoot} from 'radium';
import './App.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {

  state = {
    persons: [
      {key: 'qwer', name: "Virat Kohli", age:32},
      {key: 'asdf', name: "Steve Smith", age:31}
    ],
    showPersons: false,
    userInput: ''
  }   

  toggleHandler = (newName) => {
    console.log("Was clicked!!");
    this.setState({
      persons: [
        {name : newName, age:32},
        {name : "Steve Smith", age:31}
      ]
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons:!doesShow
    });
  }

  deleteHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index,1);
    this.setState({persons:persons});
  }

  onChangeHandler = (event,id) => {
    
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({
      persons: persons
    });
  }

  inputOnChangeHandler = (event) => {
    this.setState({userInput:event.target.value});
  }

  deleteOnChangeHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index,1);
    const updatedText = text.join('');
    this.setState({userInput:updatedText});
  }

  render() {

    const style = {
      backgroundColor:'grey',
      color:'white',
      font:'inherit',
      border:'5 px solid blue',
      padding:'20 px',
      cursor:'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if(this.state.showPersons === true){
      persons = (
        <div>
          {this.state.persons.map((person,index)=>{
          return <Person 
          name={person.name}  
          age={person.age}
          key={person.key}
          click={() => this.deleteHandler(index)} 
          changed={(event)=>this.onChangeHandler(event,person.id)} />
        })}
        </div>
      );

      style.backgroundColor='green';
      style[':hover'] = {
        backgroundColor: 'red',
        color: 'white'
      }

    }

    let classes = ['red','bold'].join(' ');

    let classesList = [];

    if(this.state.persons.length == 1){
      classesList.push['red'];
    } else {
      classesList.push['bold'];
    }



    const charList = this.state.userInput.split('').map((ch,index) => {
      return <Char 
        character={ch} 
        key={index} 
        clicked={() => {this.deleteOnChangeHandler(index)}} />;
    });

    return (
      <StyleRoot>
      <div className="App">        
        <h1 className="App-title">Welcome to React !!!</h1>
        <p className={classes}>This seems to be working</p>
        <p className={classesList.join(' ')}>This is the conditional paragraph</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toogggleee</button>
        {persons}
        <hr />
        <input type="text" onChange={this.inputOnChangeHandler} value={this.state.userInput} /> 
        <p>{this.state.userInput}</p>     
        <Validation inputLength={this.state.userInput.length} />  
        {charList}
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
