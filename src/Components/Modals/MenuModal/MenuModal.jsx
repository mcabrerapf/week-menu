import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import { MainContext } from '../../../Contexts/MainContext';
import {
  MENU_STRING,
} from '../../../constants/STRINGS';
import { initData } from '../../helpers';
import { DAYS, DAY_DISH_TYPES } from '../../../constants/MENU';
import Icon from '../../Icon';
import Button from '../../Button';
import Input from '../../Input';
import { parseMenuData } from './helpers';

function MenuModal({ modalData, closeModal }) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [menuData, setMenuData] = useState(initData(modalData, MENU_STRING));
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const { weeks } = menuData;
  const { days } = weeks[selectedWeekIndex];

  const saveMenu = async () => {
    const parsedData = parseMenuData(menuData);
    await handleSave(parsedData, MENU_STRING, closeModal);
  };

  const { name, favourite } = menuData;

  return (
    <div className="menu-modal-content col gap-10 pad-10">
      <div className="row centered gap-10">
        <Input
          name="name"
          id="name"
          value={name}
          onChange={({ target: { value: eVal } }) => setMenuData({ ...menuData, name: eVal })}
          type="text"
        />
        <Button
          modifier="m icon"
          fakeDisabled={!favourite}
          onClick={() => setMenuData({ ...menuData, favourite: !favourite })}
        >
          <Icon iconName="star" />
        </Button>
      </div>
      <div className="row centered gap-20">
        <Button
          modifier="icon m"
          disabled={selectedWeekIndex === 0}
          onClick={() => setSelectedWeekIndex(selectedWeekIndex - 1)}
        >
          <Icon iconName="arrow-l" />
        </Button>
        <Button
          modifier="icon m circle bgc-bg"
        >
          {selectedWeekIndex + 1}
        </Button>
        <Button
          modifier="icon m"
          disabled={selectedWeekIndex >= weeks.length - 1}
          onClick={() => setSelectedWeekIndex(selectedWeekIndex + 1)}
        >
          <Icon iconName="arrow-r" />
        </Button>
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
      <div className="col">
        <Button modifier="icon" onClick={saveMenu} disabled={!name} disableMultipleClicks>
          <Icon iconName="save" />
        </Button>
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape().isRequired,
};

export default MenuModal;
