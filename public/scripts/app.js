'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

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
    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));
    /*
    BOILERPLATE: We call super(props) to ensure that we don't lose internal 
    "props" references created by React when the class is instantiated.
    */


    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);

    _this.state = {
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (e) {}
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
        console.log('Saving data.');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('Component will unmount.');
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      /*
      PROBLEM: We want to take advantage of implicit return when using arrow functions, 
      but the parser treats the first set of braces as the function body. How do we
      implicitly return an object?
      
      SOLUTION: We wrap the object in parentheses causing the interpreter to treat it as 
      an expression, the result of which is the ojbect, and can be implicitly returned.
      */
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      var option = this.state.options[randomNum];
      alert(option);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      if (!option) {
        return 'Enter valid value to add item.';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exist';
      }

      this.setState(function (prevState) {
        return {
          options: prevState.options.concat(option)
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'Put your life in the hands of a computer.';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, {
          handleAddOption: this.handleAddOption
        })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        disabled: !props.hasOptions,
        onClick: props.handlePick
      },
      'What should I do?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'Remove All'
    ),
    props.options.length === 0 && React.createElement(
      'p',
      null,
      'Please add an option to get started.'
    ),

    /*
    PROBLEM: We want to break JSX into multiple lines, but retain cleanliness
    offered by arrow function implicit return.
      SOLUTION: Use multi-line expressions allow the JSX element to still be 
    implicitly returned.
    */
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteOption: props.handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    props.optionText,
    React.createElement(
      'button',
      {
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
        onClick: function onClick(e) {
          props.handleDeleteOption(props.optionText);
        }
      },
      'Delete'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);

    _this2.state = { error: undefined };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();

      var option = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(option);

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
