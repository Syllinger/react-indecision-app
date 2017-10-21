class IndecisionApp extends React.Component {
  
  constructor(props) {
    //BOILERPLATE: need to call super(props) to ensure that references to React don't break due to method overloading.
    super(props);

    /*as opposed to binding in button onClick, this approach ensures that bind is only called once, when the
    component is first initialized. It does not need to be re-bound every time the component renders, as 
    future references will reference the new binding already in memory. This is far less expensive/more efficient. */
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: props.options
    }
  }
  
  handleDeleteOptions() {
    /*Shorthand syntax for setState using arrow functions. Can implicity return values, but when returning an object 
    the parser treats anything in the braces as the function body. To work around this, we wrap the object in parentheses
    causing the interpreter to treat it as if it were an expression, the result of which can implicitly return the object*/
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
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => {
  return (
    <div>
      <button 
        disabled={!props.hasOptions} 
        onClick={props.handlePick}
      >
        What should I do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {
        props.options.map(option => <Option key={option} optionText={option} />)
      }
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
    </div>
  );
};

class AddOption extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {error: undefined};
  }
  
  handleAddOption(e) {
    e.preventDefault();
    
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    e.target.elements.option.value = '';

    this.setState(() => ({error}));
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

