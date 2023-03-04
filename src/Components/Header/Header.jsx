import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-text">
        <span> Menjare of the week</span>
      </div>
      <div className="header-buttons">
        <button>but1</button>
        <button>but2</button>
        <button>but3</button>
      </div>
    </header>
  );
}

export default Header;
