/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import Icon from '../../../Icon';
import AutoResizingInput from '../../../AutoResizingInput/AutoResizingInput';

function InstructionField({
  instruction,
  disableDelete,
  handleInstructionChange,
  handleDeleteInstruction,
  index,
}) {
  const handleDeleteClick = () => {
    handleDeleteInstruction(index);
  };

  return (
    <div className="row w-f a-c gap-5">
      <div className="font-l">
        {index + 1}
        .
      </div>
      <AutoResizingInput
        initialValue={instruction}
        onChange={(val) => handleInstructionChange(val, index)}
      />
      <div className="instruction-buttons">
        <Button
          modifier="icon"
          type="button"
          disabled={disableDelete}
          onClick={() => handleDeleteClick()}
        >
          <Icon iconName="close" />
        </Button>
      </div>
    </div>
  );
}

InstructionField.propTypes = {
  // handleInstructionSelect: PropTypes.func.isRequired,
  handleDeleteInstruction: PropTypes.func.isRequired,
  disableDelete: PropTypes.bool.isRequired,
  handleInstructionChange: PropTypes.func.isRequired,
  // isSelected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  instruction: PropTypes.string,
};

InstructionField.defaultProps = {
  instruction: '',
};

export default InstructionField;
