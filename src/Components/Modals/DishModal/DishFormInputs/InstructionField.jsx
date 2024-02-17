/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import Icon from '../../../Icon';

function InstructionField({
  instruction,
  isSelected,
  handleInstructionSelect,
  handleDeleteInstruction,
  index,
}) {
  const handleDeleteClick = () => {
    handleDeleteInstruction(index);
  };

  return (
    <div className="row w-f a-c gap-5">
      <div>
        {index + 1}
        .
      </div>
      <div
        className={`selected-instruction row w-f border-rad-5 pad-5 text-a-l ${isSelected ? ' shadow' : ''}`}
        onClick={() => handleInstructionSelect(index)}
      >
        <span>{instruction}</span>
      </div>
      <div className="instruction-buttons">
        <Button
          modifier="m icon"
          type="button"
          onClick={() => handleDeleteClick()}
        >
          <Icon iconName="close" />
        </Button>
      </div>
    </div>
  );
}

InstructionField.propTypes = {
  handleInstructionSelect: PropTypes.func.isRequired,
  handleDeleteInstruction: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  instruction: PropTypes.string,
};

InstructionField.defaultProps = {
  instruction: '',
};

export default InstructionField;
