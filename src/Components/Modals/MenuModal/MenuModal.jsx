import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { parseMenuData } from './helpers';
import Icon from '../../Icon';
import {
  MENU_STRING,
} from '../../../constants';
import { initData, getMenuWeekList } from '../../helpers';
import { DAYS } from '../../constants';

function MenuModal({ modalData, closeModal }) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [menuData, setMenuData] = useState(initData(modalData, MENU_STRING));
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const { weeks } = menuData;
  const favouriteButtonClass = `m icon${menuData.favourite ? '' : ' bgc-gr'}`;
  const dishesList = getMenuWeekList(weeks[selectedWeekIndex].dishes);

  const saveMenu = async () => {
    const parsedData = parseMenuData(menuData);
    await handleSave(parsedData, MENU_STRING, closeModal);
  };

  return (
    <div className="menu-modal-content col gap-10 pad-10">
      <div className="row centered gap-10">
        <Input
          name="name"
          id="name"
          value={menuData.name}
          onChange={({ target: { value: eVal } }) => setMenuData({ ...menuData, name: eVal })}
          type="text"
        />
        <Button
          modifier={favouriteButtonClass}
          onClick={({ target: { value: eVal } }) => setMenuData({ ...menuData, favourite: eVal })}
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
        {dishesList.map((day, index) => (
          <div key={DAYS[index][2]} className="row gap-5">
            <div className="day-label row label border-r">
              <span className="day-label upright-text label">
                {DAYS[index][2]}
              </span>
            </div>
            <div>
              {day.map((dish) => (
                <li
                  key={dish.id}
                  className="row a-c gap-5"
                >
                  <Icon iconName={dish.useAs} />
                  <span>{dish?.name || '---'}</span>
                </li>

              ))}
            </div>
          </div>
        ))}
      </ul>
      <div className="col">
        <Button modifier="icon" onClick={saveMenu} disabled={!menuData.name} disableMultipleClicks>
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
