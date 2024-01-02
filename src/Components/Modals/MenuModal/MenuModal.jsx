import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';
import Button from '../../Button';
import Input from '../../Input';
import { MainContext } from '../../../Contexts/MainContext';
import { parseMenuData } from './helpers';
import Icon from '../../Icon';
import {
  BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING, MENU_STRING,
} from '../../../constants';
import { initData } from '../../helpers';
import { DAYS } from '../../constants';

const getDishDayIndex = (dishType) => {
  switch (dishType) {
    case BREAKFAST_STRING:
      return 0;
    case LUNCH_STRING:
      return 1;
    case DINNER_STRING:
      return 2;

    default:
      return 0;
  }
};
const orderMenuDishes = (dishes) => {
  const days = [];
  dishes.forEach((dish) => {
    const dishIndex = getDishDayIndex(dish.useAs);
    if (dish.days) {
      dish.days.forEach((day) => {
        if (days[day]) {
          days[day][dishIndex] = dish;
        } else {
          days[day] = [{}, {}, {}];
          days[day][dishIndex] = dish;
        }
      });
    }
  });
  return days;
};

function MenuModal({ modalData, closeModal }) {
  const {
    handleSave,
  } = useContext(MainContext);
  const [menuData, setMenuData] = useState(initData(modalData, MENU_STRING));
  const saveMenu = async () => {
    const parsedData = parseMenuData(menuData);
    await handleSave(parsedData, MENU_STRING, closeModal);
  };
  const favouriteButtonClass = `m icon${menuData.favourite ? '' : ' bgc-gr'}`;
  const dishesList = orderMenuDishes(modalData.dishes);

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
      <ul className="days-list col overflow-y gap-10">
        {dishesList.map((day, index) => (
          <div key={DAYS[index][1]} className="col gap-5">
            <div className="day-label row label border-b">{DAYS[index][1]}</div>
            {day.map((dish) => (
              <li key={dish.id} className="row a-c gap-5">
                <Icon iconName={dish.useAs} />
                <span>{dish?.name || '---'}</span>
              </li>
            ))}
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
