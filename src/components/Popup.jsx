import React from 'react';

function Popup({ message, type }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-message ${type}`}>
        {message}
      </div>
    </div>
  );
}

export default Popup;
