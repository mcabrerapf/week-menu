import React, { useContext } from 'react';
import './Main.css';
import View from '../View';
import WeekView from '../WeekView';
import { DISH_STRING, INGREDIENT_STRING, MENU_STRING } from '../../constants';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';

function Main() {
  const {
    offlineMode,
  } = useContext(MainContext);

  const mainClassName = `main${offlineMode === 1 ? ' offline-mode' : ''}`;

  return (
    <ModalContextWrapper>
      <div
        className={mainClassName}

      >
        <WeekView />
        <View name={MENU_STRING} />
        <View name={DISH_STRING} />
        <View name={INGREDIENT_STRING} />
      </div>
    </ModalContextWrapper>

  );
}

export default Main;
