import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    //we use !! to convert any non-boolean value to a real boolean
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>Okay</button>
  </Modal>
);

export default OptionModal;