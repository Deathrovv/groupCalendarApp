import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import NewEventModal from "./NewEventModal";
import DeleteEventModal from "./DeleteEventModal";
import useDate from "./Hooks/useDate";

const App = () => {
  const [nav, setNav] = useState(0);

  const [clicked, setClicked] = useState(null);
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );

  const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>

        <div id="calendar">
          {days.map((day, index) => (
            <Day
              key={index}
              day={day}
              onClick={() => {
                if (day.value !== "padding") {
                  setClicked(day.date);
                }
              }}
            />
          ))}
        </div>
      </div>
      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      )}
      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
  );
};

export default App;
