import React, { useContext } from 'react';
import './Main.css';
import View from '../View';
import {
  DISH_STRING, INGREDIENT_STRING, MENU_STRING, MENU_BUILDER_STRING,
} from '../../constants';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContextWrapper } from '../../Contexts/ModalContext';

function Main() {
  const {
    offlineMode,
  } = useContext(MainContext);

  // Enable to stop browser auto navigation
  // useEffect(() => {
  //   const onBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   };

  //   window.addEventListener('beforeunload', onBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeUnload);
  //   };
  // });

  const mainClassName = offlineMode === 1 ? 'offline-mode' : 'main';

  return (
    <ModalContextWrapper>
      <div
        className={mainClassName}
      >
        <View name={MENU_BUILDER_STRING} />
        <View name={MENU_STRING} />
        <View name={DISH_STRING} />
        <View name={INGREDIENT_STRING} />
      </div>
    </ModalContextWrapper>

  );
}

export default Main;
