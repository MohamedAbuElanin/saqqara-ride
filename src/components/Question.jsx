import React from 'react';

function Question({ children }) {
  return (
    <div className="question-wrapper">
      {children}
    </div>
  );
}

export default Question;
