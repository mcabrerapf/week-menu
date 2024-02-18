/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import Button from '../../../Button';
import InstructionField from './InstructionField';
import Icon from '../../../Icon';
import Input from '../../../Input';

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
  const [selectedIndex, setSelectedIndex] = useState(currentInstructions.length - 1);

  const handleInstructionChange = (e) => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions[selectedIndex] = e.target.value;
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions);
  };

  const handleAddInstruction = () => {
    const updatedInstructions = [...currentInstructions];
    updatedInstructions.push('');
    setCurrentInstructions(updatedInstructions);
    updateInstructions(updatedInstructions);
    setSelectedIndex(updatedInstructions.length - 1);
  };

  const handleInstructionSelect = (clickedIndex) => {
    setSelectedIndex(clickedIndex);
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...currentInstructions];
    const filteredInstructions = updatedInstructions.filter((_, i) => i !== index);
    setCurrentInstructions(filteredInstructions);
    updateInstructions(filteredInstructions);
    setSelectedIndex(filteredInstructions.length - 1);
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
              isSelected={selectedIndex === i}
              handleInstructionSelect={handleInstructionSelect}
              handleDeleteInstruction={handleDeleteInstruction}
              isLast={currentInstructions.length - 1 === i}
            />
          ))}

        </div>
        <div className="row gap-5 centered">
          <Input
            name="instruction"
            value={currentInstructions[selectedIndex]}
            onChange={handleInstructionChange}
            placeholder="Hmm..."
            type="textarea"
          />
          <Button
            modifier="l icon-l"
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
