import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Input';
import Button from '../../../Button';
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from '../../../Icons';

function InstructionField({
  instruction, handleInstructionChange, handleDeleteInstruction, moveInstruction, index, id, isLast,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!instruction) {
      document.getElementById(`${index}-instruction`).focus();
    }
  }, [ref]);

  const handleChange = (e) => {
    handleInstructionChange(index, e.target.value);
  };

  const handleBlur = (e) => {
    handleInstructionChange(index, e.target.value);
  };

  const handleDeleteClick = () => {
    handleDeleteInstruction(index);
  };

  const handleMoveUp = () => {
    moveInstruction(index, index - 1);
  };

  const handleMoveDown = () => {
    moveInstruction(index, index + 1);
  };

  return (
    <div ref={ref} className="instruction-container">
      <div className="instruction-buttons">
        <Button
          modifier="square"
          type="button"
          onClick={handleMoveUp}
          disabled={index === 0}
        >
          <ArrowUpIcon />
        </Button>
        <Button
          modifier="square"
          type="button"
          onClick={handleMoveDown}
          disabled={isLast}
        >
          <ArrowDownIcon />
        </Button>
      </div>
      <Input
        id={id}
        name="instruction"
        value={instruction}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Hmm..."
        type="textarea"
      />
      <div className="instruction-buttons">
        <Button
          modifier="square"
          type="button"
          onClick={handleDeleteClick}
        >
          <CloseIcon />
        </Button>
      </div>

    </div>

  );
}

InstructionField.propTypes = {
  handleInstructionChange: PropTypes.func.isRequired,
  handleDeleteInstruction: PropTypes.func.isRequired,
  moveInstruction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  instruction: PropTypes.string,
};

InstructionField.defaultProps = {
  instruction: '',
};

export default InstructionField;
