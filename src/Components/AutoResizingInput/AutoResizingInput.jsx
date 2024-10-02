import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AutoResizingInput.scss';

function AutoResizingInput({ initialValue, onChange }) {
  const hiddenDivRef = useRef(null);
  const [inputValue, setInputValue] = useState(initialValue);
  const [textareaSize, setTextareaSize] = useState({ width: 1, height: 1 });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (hiddenDivRef.current) {
      const newHeight = hiddenDivRef.current.offsetHeight;
      setTextareaSize({ height: newHeight });
    }
  }, [inputValue]);

  return (
    <div
      className="auto-resizing-input"
    >
      <textarea
        className="auto-resizing-input__textarea"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => onChange(inputValue)}
        style={{
          height: `${textareaSize.height}px`,
        }}
      />
      <div
        ref={hiddenDivRef}
        className="auto-resizing-input__reference-div"
      >
        {inputValue}
      </div>
    </div>
  );
}

AutoResizingInput.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

AutoResizingInput.defaultProps = {
  initialValue: '',
  onChange: () => {},

};

export default AutoResizingInput;
