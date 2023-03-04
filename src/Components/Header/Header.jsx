import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-text">
        <span> Menjare of the week</span>
      </div>
      <div className="header-buttons">
        <button type="button">Week</button>
        <button type="button"> Dishes</button>
        <button type="button">Ingredients</button>
      </div>
    </header>
  );
}

export default Header;
