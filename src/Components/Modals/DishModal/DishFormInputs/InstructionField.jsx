import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../Input';
import Button from '../../../Button';
import Icon from '../../../Icon';

function InstructionField({
  instruction,
  handleInstructionChange,
  handleDeleteInstruction,
  moveInstruction,
  index,
  id,
  isLast,
  showDeleteButton,
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
    <div ref={ref} className="row gap-5 centered">
      <div className="col gap-5">
        <Button
          modifier="m"
          type="button"
          onClick={() => handleMoveUp()}
          disabled={index === 0}
        >
          <Icon iconName="arrow-u" />
        </Button>
        <Button
          modifier="m"
          type="button"
          onClick={() => handleMoveDown}
          disabled={isLast}
        >
          <Icon iconName="arrow-d" />
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
          modifier="m icon"
          type="button"
          disabled={!showDeleteButton}
          onClick={() => handleDeleteClick()}
        >
          <Icon iconName="close" />
        </Button>
      </div>
    </div>
  );
}

InstructionField.propTypes = {
  handleInstructionChange: PropTypes.func.isRequired,
  handleDeleteInstruction: PropTypes.func.isRequired,
  moveInstruction: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  instruction: PropTypes.string,
};

InstructionField.defaultProps = {
  instruction: '',
};

export default InstructionField;
