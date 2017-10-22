class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    try {
      const count = localStorage.getItem('count');
      if (count && !isNaN(count)) {
        this.setState(() => ({count: parseInt(count, 10)}));
      }
    } catch(e) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }
  }

  handleAddOne() {
    this.setState(prevState => {
      /*
      PROBLEM: When comparing "prevState.count" and "this.state.count" in 
      componentDidUpdate lifecycle method, logging both variables 
      revealed the same value for both. As a result, the if condition 
      never evaluated to true, and the updated value of "count" was never 
      written to localStorage.
      
      SOLUTION: Previous implementation used "++" syntax causing unexpected 
      behaviour due to the fact that ++ and -- are ASSIGNMENT operators, i.e. 
      they MODIFY the value during evaluation, prior to assignment. As such, 
      the value of count on prevState was being directly changed before being 
      stored in the the count property of the object in the setState payload. 
      This resulted in "prevState.count" and "this.state.count" evaluating to 
      the same value whenever componentDidUpdate was triggered.
      */
      return {count: prevState.count + 1}
    });
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {count: prevState.count - 1}
    });
  }

  handleReset() {
    this.setState(prevState => {
      return {count: 0}
    });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>0</button>
        <button onClick={this.handleAddOne}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));