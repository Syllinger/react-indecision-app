import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class OldSyntax {
  constructor() {
    this.name = 'Mike';
    this.getGreeting = this.getGreeting.bind(this);
  }

  getGreeting() {
    return `Hi. My name is ${this.name}`;
  }
}

const oldSyntax = new OldSyntax();

console.log(oldSyntax);
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());

class NewSyntax {
  name = 'Suzie';
  getGreeting = () => {
    return `Hi. My name is ${this.name}`;
  }
}

const newSyntax = new NewSyntax();

console.log(newSyntax);
const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());