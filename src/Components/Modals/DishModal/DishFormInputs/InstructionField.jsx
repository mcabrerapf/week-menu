import React from 'react';
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
}) {
  const handleChange = (e) => {
    handleInstructionChange(index, e.target.value);
  };

  const handleBlur = (e) => {
    handleInstructionChange(index, e.target.value, true);
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
    <div className="row gap-5 centered">
      <div className="col gap-5">
        <Button
          modifier="m"
          type="button"
          onClick={() => handleMoveUp()}
          disabled={index === 0 || !instruction}
        >
          <Icon iconName="arrow-u" />
        </Button>
        <Button
          modifier="m"
          type="button"
          onClick={() => handleMoveDown}
          disabled={isLast || !instruction}
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
          disabled={isLast}
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
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  instruction: PropTypes.string,
};

InstructionField.defaultProps = {
  instruction: '',
};

export default InstructionField;
