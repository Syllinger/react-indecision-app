class IndecisionApp extends React.Component {
  constructor(props) {
    //BOILERPLATE: need to call super(props) to ensure that references to React don't break due to method overloading.
    super(props);

    /*as opposed to binding in button onClick, this approach ensures that bind is only called once, when the
    component is first initialized. It does not need to be re-bound every time the component renders, as 
    future references will reference the new binding already in memory. This is far less expensive/more efficient. */
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);

    this.state = {
      options: ['thing one', 'thing two', 'thing three']
    }
  }
  
  handleDeleteOptions() {
    this.setState(() => {
      return {options: []}
    });
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  };
  

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer.';
    
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  
  render() {
    return (
      <div>
        <button 
          disabled={!this.props.hasOptions} 
          onClick={this.props.handlePick}
        >
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {

  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {
          this.props.options.map(option => <Option key={option} optionText={option} />)
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        {this.props.optionText}
      </div>
    );
  }
}

class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();
    
    const option = e.target.elements.option.value.trim();
  
    if (option) {
      alert(option);
      e.target.elements.option.value = '';
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

