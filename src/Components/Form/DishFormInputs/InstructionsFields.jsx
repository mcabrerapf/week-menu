/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import Button from '../../Button';
import InstructionField from './InstructionField';

const initInstructions = (ins) => {
  if (!ins) return [''];
  return ins.split('---');
};

function InstructionsFields({
  instructions,
  updateInstructions,
}) {
  const [currentInstructions, setCurrentInstructions] = useState(initInstructions(instructions));

  const addInstruction = () => {
    if (currentInstructions[currentInstructions.length - 1] === '') return;
    const updatedInstructions = [...currentInstructions, ''];

    setCurrentInstructions(updatedInstructions);
  };

  const handleInstructionChange = (index, newInstruction) => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions[index] = newInstruction;
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions.join('---'));
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions[index] = '';
    const filteredInstructions = updatedInstructions.filter(Boolean);
    setCurrentInstructions(filteredInstructions);
    updateInstructions(filteredInstructions.join('---'));
  };

  const moveInstruction = (index1, index2) => {
    const updatedInstructions = currentInstructions.map((inst, index) => {
      if (index === index1) return currentInstructions[index2];
      if (index === index2) return currentInstructions[index1];
      return inst;
    });

    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions.join('---'));
  };

  return (
    <div className="instructions-container">
      {currentInstructions.map((instruction, i) => (
        <InstructionField
          key={`${i}-instruction`}
          id={`${i}-instruction`}
          index={i}
          instruction={instruction}
          handleInstructionChange={handleInstructionChange}
          handleDeleteInstruction={handleDeleteInstruction}
          moveInstruction={moveInstruction}
          isLast={currentInstructions.length - 1 === i}

        />
      ))}
      <Button
        modifier="add-button"
        type="button"
        onClick={addInstruction}
      >
        <i className="fa fa-plus" aria-hidden="true" />
      </Button>
    </div>
  );
}

InstructionsFields.propTypes = {
  updateInstructions: PropTypes.func.isRequired,
  instructions: PropTypes.string,

};

InstructionsFields.defaultProps = {
  instructions: '',
};

export default InstructionsFields;
