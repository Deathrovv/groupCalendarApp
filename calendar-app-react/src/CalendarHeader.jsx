import React from "react";

const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return (
    <div id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={onBack} id="backButton">
          Previous Month
        </button>
        <button onClick={onNext} id="nextButton">
          Next Month
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
