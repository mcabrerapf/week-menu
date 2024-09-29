/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import InstructionField from './InstructionField';
import Icon from '../../../Icon';

const initInstructions = (ins) => {
  if (!ins || !ins.length) return [''];
  return ins;
};

function InstructionsFields({
  instructions,
  updateInstructions,
  handleSubmit,
  canSave,
}) {
  const [currentInstructions, setCurrentInstructions] = useState(initInstructions(instructions));

  const handleInstructionChange = (val, index) => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions[index] = val;
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions);
  };

  const handleAddInstruction = () => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions.push('');
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions);
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...currentInstructions];
    const filteredInstructions = updatedInstructions.filter((_, i) => i !== index);
    setCurrentInstructions(filteredInstructions);
    updateInstructions(filteredInstructions);
  };

  return (
    <>
      <div className="col h-f j-bet">
        <div className="instructions-content col overflow-y gap-10 pad-5">
          {currentInstructions.map((instruction, i) => (
            <InstructionField
              key={`${i}-instruction`}
              id={i}
              index={i}
              instruction={instruction}
              handleInstructionChange={handleInstructionChange}
              handleDeleteInstruction={handleDeleteInstruction}
              disableDelete={currentInstructions.length < 2}
            />
          ))}

        </div>
        <div className="row gap-5 centered">
          <Button
            modifier="circle icon"
            onClick={() => handleAddInstruction()}
          >
            <Icon iconName="plus" />
          </Button>
        </div>
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
  instructions: PropTypes.arrayOf(PropTypes.string),

};

InstructionsFields.defaultProps = {
  instructions: [],
};

export default InstructionsFields;
