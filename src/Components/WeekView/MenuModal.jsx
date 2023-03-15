import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import { buildMenu } from '../helpers';

function MenuModal({
  modalData, handleBuildMenu, toggleModal, dishes,
}) {
  const currentBreakfasts = dishes.filter(({ type }) => type === 'BREAKFAST');
  const currentLunches = dishes.filter(({ type }) => type === 'LUNCH');
  const currentDinners = dishes.filter(({ type }) => type === 'DINNER');
  const [currentData, setCurrentData] = useState(modalData);
  const {
    days, maxBreakfasts, maxLunches, maxDinners,
  } = currentData;

  const handleButtonClick = () => {
    const newMenu = buildMenu(dishes, currentData);
    handleBuildMenu(newMenu, currentData);
  };

  const handleChange = (key, value) => {
    setCurrentData({ ...currentData, [key]: value });
  };

  const handleMaxChange = (key, quantity, limit) => {
    if (quantity === '0') return setCurrentData({ ...currentData, [key]: limit });
    if (Number(quantity) > limit) return setCurrentData({ ...currentData, [key]: limit });
    return setCurrentData({ ...currentData, [key]: quantity });
  };

  return (
    <Modal
      hideHeader
      hideModal={() => toggleModal(true)}
    >
      <div className="menu-modal-content">
        <div className="menu-modal-inputs">
          {days.map((day, index) => {
            const {
              checked, hasBreakfast, hasLunch, hasDinner, name,
            } = day;

            return (
              <div key={name} className="menu-modal-day-container">
                <Input
                  type="checkbox"
                  name={`${index}-is-checked`}
                  id={`${index}-is-checked`}
                  modifier="day-is-checked"
                  value={checked}
                  label={name}
                  onChange={() => {
                    const updatedData = { ...currentData };
                    updatedData.days[index].checked = !checked;
                    setCurrentData(updatedData);
                  }}
                />
                <div className="menu-modal-day-meals">
                  <Input
                    type="checkbox"
                    name={`${index}-has-breakfast`}
                    id={`${index}-has-breakfast`}
                    modifier="has-meal"
                    value={hasBreakfast}
                    label="Breakfast"
                    onChange={() => {
                      const updatedData = { ...currentData };
                      updatedData.days[index].hasBreakfast = !hasBreakfast;
                      setCurrentData(updatedData);
                    }}
                  />
                  <Input
                    type="checkbox"
                    name={`${index}-has-lunch`}
                    id={`${index}-has-lunch`}
                    modifier="has-meal"
                    value={hasLunch}
                    label="Lunch"
                    onChange={() => {
                      const updatedData = { ...currentData };
                      updatedData.days[index].hasLunch = !hasLunch;
                      setCurrentData(updatedData);
                    }}
                  />
                  <Input
                    type="checkbox"
                    name={`${index}-has-dinner`}
                    id={`${index}-has-dinner`}
                    modifier="has-meal"
                    value={hasDinner}
                    label="Dinner"
                    onChange={() => {
                      const updatedData = { ...currentData };
                      updatedData.days[index].hasDinner = !hasDinner;
                      setCurrentData(updatedData);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div className="menu-modal-max-inputs">
            <Input
              type="number"
              id="max-breakfasts"
              name="max-breakfasts"
              label="Breakfasts"
              modifier="meal-max-input"
              value={maxBreakfasts}
              onFocus={() => handleMaxChange('maxBreakfasts', '')}
              onBlur={() => handleMaxChange('maxBreakfasts', maxBreakfasts, currentBreakfasts.length)}
              onChange={({ target: { value } }) => handleChange('maxBreakfasts', value)}
            />
            <Input
              type="number"
              id="max-lunches"
              name="max-lunches"
              label="Lunches"
              modifier="meal-max-input"
              value={maxLunches}
              onFocus={() => handleMaxChange('maxLunches', '')}
              onBlur={() => handleMaxChange('maxLunches', maxLunches, currentLunches.length)}
              onChange={({ target: { value } }) => handleChange('maxLunches', value)}
            />
            <Input
              type="number"
              id="max-dinners"
              name="max-dinners"
              label="Dinners"
              modifier="meal-max-input"
              value={maxDinners}
              onFocus={() => handleMaxChange('maxDinners', '')}
              onBlur={() => handleMaxChange('maxDinners', maxDinners, currentDinners.length)}
              onChange={({ target: { value } }) => handleChange('maxDinners', value)}
            />
          </div>

        </div>
        <Button buttonText="GO!" onClick={handleButtonClick} />
      </div>
    </Modal>
  );
}

MenuModal.propTypes = {
  handleBuildMenu: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.shape()),
  modalData: PropTypes.shape(),
};

MenuModal.defaultProps = {
  dishes: [],
  modalData: {},
};

export default MenuModal;
