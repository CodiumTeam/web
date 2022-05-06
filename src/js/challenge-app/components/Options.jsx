import React from 'react';
import AnswerAlert from './AnswerAlert';

function Options({
  options,
  correctAnswerId,
  onSelect,
  answerMessage,
  userAnswer,
}) {
  const [selectedOption, setSelectedOption] = React.useState(
    userAnswer || null
  );

  let userStatus = false;

  if (userAnswer) {
    userStatus = userAnswer !== correctAnswerId;
  }

  const [showMessage, setShowMessage] = React.useState(userStatus);

  const handleSelect = (id) => {
    if (selectedOption !== null) return;

    setShowMessage(id !== correctAnswerId);

    setSelectedOption(id);
    onSelect(id);
  };

  return (
    <div className="options">
      {options.map(({ id, text }) => {
        return (
          <Option
            key={id}
            id={id}
            text={text}
            onSelect={handleSelect}
            correctAnswerId={correctAnswerId}
            selectedOption={selectedOption}
          />
        );
      })}

      {showMessage && <AnswerAlert message={answerMessage} />}
    </div>
  );
}

function Option({ id, text, onSelect, correctAnswerId, selectedOption }) {
  let classes =
    selectedOption === null
      ? []
      : id !== selectedOption
      ? []
      : [
          id === correctAnswerId
            ? 'options__option--correct'
            : 'options__option--wrong',
        ];
  return (
    <button
      className={`options__option ${classes.join(' ')}`}
      onClick={() => {
        onSelect(id);
      }}
    >
      <span className="options__number">{id}</span>
      <span>{text}</span>
    </button>
  );
}

export default Options;
