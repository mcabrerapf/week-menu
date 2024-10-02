import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MenuModal.scss';
import {
  MENU_STRING, SAVE_STRING, UPDATE_STRING,
} from '../../../constants/STRINGS';
import { deepCompare, deepCopy, initData } from '../../helpers';
import { DAYS, DAY_DISH_TYPES } from '../../../constants/MENU';
import Icon from '../../Icon';
import Button from '../../Button';
import Input from '../../Input';
// TODO move this
const pMenuD = (data, action) => {
  const uData = deepCopy(data);
  uData.weeks = uData.weeks.map((week) => {
    const uDays = week.days.map((day) => {
      const uDishes = day.dishes.map((dish) => {
        if (!dish) return null;
        return {
          id: dish.id,
          sideDishesToUse: dish.sideDishesToUse,
        };
      });
      return { dishes: uDishes };
    });

    return {
      days: uDays,
      people: week.people,
    };
  });
  if (action === SAVE_STRING) delete uData.id;
  return uData;
};
function MenuModal({ modalData, closeModal }) {
  const { itemData } = modalData;
  const [menuData, setMenuData] = useState(initData(itemData, MENU_STRING));
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const isNew = !menuData.id;

  const saveMenu = async (action) => {
    const noChange = deepCompare(menuData, itemData);

    if (noChange) return closeModal();
    const uD = pMenuD(menuData, action);
    return closeModal({ type: action, data: uD });
  };
  const { weeks, name, favourite } = menuData;
  const { days } = weeks[selectedWeekIndex];

  return (
    <div className="menu-modal col j-bet pad-10">
      <div className="menu-modal__content col gap-15 pad-b-10">
        <div className="menu-modal__content__name row centered gap-5">
          <Input
            name="name"
            id="name"
            value={name}
            onChange={({ target: { value: eVal } }) => setMenuData({ ...menuData, name: eVal })}
            type="text"
          />
          <Button
            modifier="icon"
            fakeDisabled={!favourite}
            onClick={() => setMenuData({ ...menuData, favourite: !favourite })}
          >
            <Icon iconName="star" />
          </Button>
        </div>
        <div className="menu-modal__content__weeks row a-c gap-10">
          <Icon modifier="icon" iconName="calendar" />
          <div className="menu-modal__content__weeks__buttons row gap-5">
            {weeks.map((_, i) => (
              <Button
            // eslint-disable-next-line react/no-array-index-key
                key={i}
                modifier="icon"
                fakeDisabled={i !== selectedWeekIndex}
                onClick={() => setSelectedWeekIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
        <ul className="menu-modal__content__days-list col gap-5 border-box overflow-y">
          {days.map(({ dishes }, index) => (
            <div key={DAYS[index][2]} className="row gap-5">
              <div className="day-label row label border-r">
                <span className="day-label font-m upright-text label">
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
                    <Icon iconName={DAY_DISH_TYPES[mealIndex]} modifier="icon" />
                    <span className="font-m">{dish?.name || '---'}</span>
                  </li>

                ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="menu-modal__footer row gap-5">
        <Button
          modifier="icon w-f"
          onClick={() => saveMenu(UPDATE_STRING)}
          disabled={!name}
          disableMultipleClicks
        >
          <Icon iconName="save" />
        </Button>
        {!isNew && (
        <Button
          modifier="icon w-f"
          onClick={() => saveMenu(SAVE_STRING)}
          disabled={!name}
          disableMultipleClicks
        >
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
