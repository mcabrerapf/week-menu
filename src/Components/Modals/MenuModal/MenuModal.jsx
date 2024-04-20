import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import {
  MENU_STRING, SAVE_STRING, UPDATE_STRING,
} from '../../../constants/STRINGS';
import { deepCompare, initData } from '../../helpers';
import { DAYS, DAY_DISH_TYPES } from '../../../constants/MENU';
import Icon from '../../Icon';
import Button from '../../Button';
import Input from '../../Input';

function MenuModal({ modalData, closeModal }) {
  const { itemData } = modalData;
  const [menuData, setMenuData] = useState(initData(itemData, MENU_STRING));
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const isNew = !menuData.id;

  const saveMenu = async (action) => {
    const noChange = deepCompare(menuData, itemData);
    if (noChange) return closeModal();

    return closeModal({ type: action, data: menuData });
  };
  const { weeks, name, favourite } = menuData;
  const { days } = weeks[selectedWeekIndex];

  return (
    <div className="menu-modal-content col gap-15 pad-10">
      <div className="row centered gap-5">
        <Input
          name="name"
          id="name"
          value={name}
          modifier="w-f h-2"
          onChange={({ target: { value: eVal } }) => setMenuData({ ...menuData, name: eVal })}
          type="text"
        />
        <Button
          modifier="h-3 w-3 icon"
          fakeDisabled={!favourite}
          onClick={() => setMenuData({ ...menuData, favourite: !favourite })}
        >
          <Icon iconName="star" />
        </Button>
      </div>
      <div className="row a-c gap-5">
        <Icon modifier="h-2 w-2" iconName="calendar" />
        {weeks.map((_, i) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            modifier="w-2 h-2 icon"
            fakeDisabled={i !== selectedWeekIndex}
            onClick={() => setSelectedWeekIndex(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <ul className="days-list col gap-5 overflow-y">
        {days.map(({ dishes }, index) => (
          <div key={DAYS[index][2]} className="row gap-5">
            <div className="day-label row label border-r">
              <span className="day-label upright-text label">
                {DAYS[index][2]}
              </span>
            </div>
            <div>
              {dishes.map((dish, mealIndex) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={mealIndex}
                  className="row a-c gap-5"
                >
                  <Icon iconName={DAY_DISH_TYPES[mealIndex]} />
                  <span>{dish?.name || '---'}</span>
                </li>

              ))}
            </div>
          </div>
        ))}
      </ul>
      <div className="row gap-5">
        <Button modifier="icon" onClick={() => saveMenu(SAVE_STRING)} disabled={!name} disableMultipleClicks>
          <Icon iconName="save" />
        </Button>
        {!isNew && (
        <Button modifier="icon" onClick={() => saveMenu(UPDATE_STRING)} disabled={!name} disableMultipleClicks>
          <Icon iconName="plus" />
          <Icon iconName="save" />
        </Button>
        )}
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MenuModal;
