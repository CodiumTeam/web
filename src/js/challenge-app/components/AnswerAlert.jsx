import React from 'react';

function AnswerAlert({ message }) {
  return (
    <div className="alert__content alert--error" id="show-answer">
      <i className="icon icon-warning"></i>
      <p>{message}</p>
    </div>
  );
}

export default AnswerAlert;
