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
  return ins.split('---');
};

function InstructionsFields({
  instructions,
  updateInstructions,
  handleSubmit,
  canSave,
}) {
  const [currentInstructions, setCurrentInstructions] = useState(initInstructions(instructions));

  const handleInstructionChange = (index, newInstruction, isBlur) => {
    const shouldAddNew = newInstruction && currentInstructions[index + 1] === undefined;
    let updatedInstructions = [...currentInstructions];
    updatedInstructions[index] = newInstruction;
    if (!newInstruction && isBlur) updatedInstructions = updatedInstructions.filter(Boolean);
    if (shouldAddNew)updatedInstructions.push('');
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions.join('---'));
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...currentInstructions];
    const filteredInstructions = updatedInstructions.filter((_, i) => i !== index);
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

  const showDeleteButton = currentInstructions.length > 1;

  return (
    <>
      <div className="instructions-content col overflow-y gap-10">
        {currentInstructions.map((instruction, i) => (
          <InstructionField
            key={`${i}-instruction`}
            id={`${i}-instruction`}
            index={i}
            showDeleteButton={showDeleteButton}
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
