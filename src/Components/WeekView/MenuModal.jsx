import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import { buildMenu } from '../helpers';
import { initMenuOptions } from './helpers';

function MenuModal({
  modalData, handleBuildMenu, setShowModal, dishes,
}) {
  const currentBreakfasts = dishes.filter(({ type }) => type === 'BREAKFAST');
  const currentLunches = dishes.filter(({ type }) => type === 'LUNCH');
  const currentDinners = dishes.filter(({ type }) => type === 'DINNER');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const initedData = initMenuOptions(
      modalData,
      currentBreakfasts.length,
      currentLunches.length,
      currentDinners.length,
    );

    setCurrentData(initedData);
  }, []);

  const handleButtonClick = () => {
    const newMenu = buildMenu(dishes, currentData);
    handleBuildMenu(newMenu, currentData);
  };

  const handleChange = (key, value) => {
    setCurrentData({ ...currentData, [key]: value });
  };

  const handleMaxChange = (key, quantity, limit) => {
    const parsedQuantity = quantity ? Number(quantity) : 0;
    if (parsedQuantity === 0) return setCurrentData({ ...currentData, [key]: limit });
    if (parsedQuantity > limit) return setCurrentData({ ...currentData, [key]: limit });
    return setCurrentData({ ...currentData, [key]: parsedQuantity });
  };

  if (!currentData) return null;

  const {
    days, maxBreakfasts, maxLunches, maxDinners,
  } = currentData;
  return (
    <Modal
      hideHeader
      hideModal={() => setShowModal(false)}
    >
      <div className="menu-modal-content">
        <div className="menu-modal-inputs">
          <div className="menu-modal-day-inputs">
            {days.map((day, index) => {
              const {
                checked, hasBreakfast, hasLunch, hasDinner, name,
              } = day;
              const dayMealsClassname = `menu-modal-day-meals${checked ? '' : ' disabled'}`;
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
                  <div className={dayMealsClassname}>
                    <Input
                      disabled={!checked}
                      type="checkbox"
                      name={`${index}-has-breakfast`}
                      id={`${index}-has-breakfast`}
                      modifier="has-meal"
                      value={hasBreakfast}
                      label="B"
                      onChange={() => {
                        const updatedData = { ...currentData };
                        updatedData.days[index].hasBreakfast = !hasBreakfast;
                        setCurrentData(updatedData);
                      }}
                    />
                    <Input
                      disabled={!checked}
                      type="checkbox"
                      name={`${index}-has-lunch`}
                      id={`${index}-has-lunch`}
                      modifier="has-meal"
                      value={hasLunch}
                      label="L"
                      onChange={() => {
                        const updatedData = { ...currentData };
                        updatedData.days[index].hasLunch = !hasLunch;
                        setCurrentData(updatedData);
                      }}
                    />
                    <Input
                      disabled={!checked}
                      type="checkbox"
                      name={`${index}-has-dinner`}
                      id={`${index}-has-dinner`}
                      modifier="has-meal"
                      value={hasDinner}
                      label="D"
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
          </div>

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
  setShowModal: PropTypes.func.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.shape()),
  modalData: PropTypes.shape(),
};

MenuModal.defaultProps = {
  dishes: [],
  modalData: {},
};

export default MenuModal;
