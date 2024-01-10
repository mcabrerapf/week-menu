/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import Button from '../../../Button';
import InstructionField from './InstructionField';
import Icon from '../../../Icon';

const initInstructions = (ins) => {
  if (!ins) return [''];
  return [...ins.split('---'), ''];
};

function InstructionsFields({
  instructions,
  updateInstructions,
  handleSubmit,
  canSave,
}) {
  const [currentInstructions, setCurrentInstructions] = useState(initInstructions(instructions));

  const handleInstructionChange = (index, newInstruction) => {
    const shouldAddNew = newInstruction && currentInstructions[index + 1] === undefined;
    const updatedInstructions = [...currentInstructions];
    updatedInstructions[index] = newInstruction;
    if (shouldAddNew)updatedInstructions.push('');
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions.join('---'));
  };

  const moveInstruction = (index1, index2) => {
    const updatedInstructions = currentInstructions.map((inst, index) => {
      if (index === index1) return currentInstructions[index2];
      if (index === index2) return currentInstructions[index1];
      return inst;
    });
    if (updatedInstructions[updatedInstructions.length - 1]) updatedInstructions.push('');
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions.join('---'));
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...currentInstructions];
    const filteredInstructions = updatedInstructions.filter((_, i) => i !== index);
    if (filteredInstructions[filteredInstructions.length - 1]) filteredInstructions.push('');
    setCurrentInstructions(filteredInstructions);
    updateInstructions(filteredInstructions.join('---'));
  };

  return (
    <>
      <div className="instructions-content col overflow-y gap-10">
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

      </div>
      <div className="col gap-5">
        <Button modifier="icon" onClick={handleSubmit} disabled={!canSave}>
          <Icon iconName="save" />
        </Button>
      </div>
    </>
  );
}

InstructionsFields.propTypes = {
  updateInstructions: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  instructions: PropTypes.string,

};

InstructionsFields.defaultProps = {
  instructions: '',
};

export default InstructionsFields;
