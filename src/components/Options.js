import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button 
        className="button button--link"
        onClick={props.handleDeleteOptions}>
        Remove All
      </button>
    </div>
    {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
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