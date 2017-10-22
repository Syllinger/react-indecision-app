import React from 'react';

const Option = (props) => (
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
      className="button button--link"
      onClick={(e) => {
        props.handleDeleteOption(props.optionText)
      }}
    >Delete</button>
  </div>
);

export default Option;