import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  
  constructor(props) {
    /*
    BOILERPLATE: We call super(props) to ensure that we don't lose internal 
    "props" references created by React when the class is instantiated.
    */
    super(props);

    /*
    PROBLEM: Methods are bound to class instances. When the function reference is passed
    down via props, its lexical scope changes, and it runs in the context of the component 
    that called it in its "onClick" handler. As a result, the "this" value runs in a different 
    context than originally intended. In the handleDeleteOptions method, we reference try to
    log "this.props.options" but "this" is not bound in this context, and we receive an error 
    indicating that we cannot access the property "props" of undefined.

    SOLUTION: Chain the "bind" method onto the function call in the "onClick" handler. The 
    .bind() method, when it executes at runtime, allows "this" to be manually bound. Because 
    "this" is bound correctly in the "render" method, we can bind the correct "this" by passing 
    it as the argument to .bind().

    ADD'L INFO: When we add .bind() onto the function call in the "onClick" handler, it may 
    become expensive, as "this" will be rebound every time the component re-renders. To avoid 
    this otherwise expensive process, we call it only once on the highest component possible in 
    the hierarchy. Future function calls will simply access the bound function already in memory.
    */
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: []
    }
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

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }
  
  handleDeleteOptions() {
    /*
    PROBLEM: We want to take advantage of implicit return when using arrow functions, 
    but the parser treats the first set of braces as the function body. How do we
    implicitly return an object?
    
    SOLUTION: We wrap the object in parentheses causing the interpreter to treat it as 
    an expression, the result of which is the ojbect, and can be implicitly returned.
    */
    this.setState(() => ({options: []}));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  };
  
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exist';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
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