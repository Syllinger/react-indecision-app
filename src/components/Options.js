import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <button 
      className="button button--link"
      onClick={props.handleDeleteOptions}>
      Remove All
    </button>
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

export default Options;