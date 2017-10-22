import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  /*
  PROBLEM: Due to lexical scope changing when passing down functions in props to 
  child components, we "bind" "this" in constructor to manually define "this" 
  reference on execution, i.e. for example, when "onClick" fires handler fucntion 
  passed down via props. However, continually binding this to event handlers that 
  are to be passed down to props was beocming quite verbose, and tedious.
  
  SOLUTION: We installed and configured babel-plugin-transform-class-properties 
  plugin for babel, and can now use instance variables, and arrow functions in 
  class definitions. Arrow functions do not bind this, so no manual override is 
  required. Furthermore, rather than define state in the constructor we can instead 
  define it as an instance property, avoiding the need for a constructor function 
  entirely.

  ADD'L INFO: See comments in IndecisionApp class constructor in the 
  pre-cls-prop-IndecisionApp.js file in React-Playground folder.
  */

  state = { options: [] };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }
  
  handleDeleteOptions = () => {
    /*
    PROBLEM: We want to take advantage of implicit return when using arrow functions, 
    but the parser treats the first set of braces as the function body. How do we
    implicitly return an object?
    
    SOLUTION: We wrap the object in parentheses causing the interpreter to treat it as 
    an expression, the result of which is the ojbect, and can be implicitly returned.
    */
    this.setState(() => ({options: []}));
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  };
  
  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exist';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({options}));
      }
    } catch(e) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('Saving data.');
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount.');
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';
    
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}