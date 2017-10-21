class IndecisionApp extends React.Component {
  
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
      options: props.options
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
      {props.options.length === 0 && <p>Please add an option to get started.</p>}
      {
        /*
        PROBLEM: We want to break JSX into multiple lines, but retain cleanliness
        offered by arrow function implicit return.

        SOLUTION: Use multi-line expressions allow the JSX element to still be 
        implicitly returned.
        */
        props.options.map(option => (
          <Option 
            key={option} 
            optionText={option} 
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button 
        /*
        PROBLEM: When "Delete" button is clicked, we wnant to pass data to the handler
        function. But using "onClick={props.handleDeleteOption()}" would call the function
        at runtime. How do we pass data into the fucntion without running it?
        
        SOLUTION: We define a new function to wrap the function we want to call. Within
        this function we are free to add arguments, as this function will not be called at
        runtime.
        
        PERSPECTIVE: Ensure that you do not think of the data being passed up the chain. 
        This is not what is happening. What is actually happening is that the function 
        reference is being passed down to the child element. Also, think of this function
        wrapping approach as the opposite of an IIFE.

        ADD'L INFO: When a button element is clicked, the first element passed to a
        function called in "onClick" is the event object.
        */
        onClick={(e) => {
          props.handleDeleteOption(props.optionText)
        }}
      >Delete</button>
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

    this.setState(() => ({error}));
    
    if (!error) {
      e.target.elements.option.value = '';
    }
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

