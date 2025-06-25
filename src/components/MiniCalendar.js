import React, { useState } from 'react';
import dayjs from 'dayjs';
import './EventModal';
const MiniCalendar = ({ selectedDate, onDateSelect, onOpenModal, todaysEvents}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf('month').startOf('week');
  const endOfMonth = currentMonth.endOf('month').endOf('week');

  const generateDays = () => {
    const days = [];
    let current = startOfMonth;

    while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
      days.push(current);
      current = current.add(1, 'day');
    }
    return days;
  };

  const isSameDay = (d1, d2) => d1.isSame(d2, 'day');

  return (
    <div>
      <div className="calendar-branding">
  <span className="calendar-icon">📅</span>
  <span className="calendar-title">Event Calendar</span>
</div>

<div className="calendar-button-wrapper">
  <button className="create-event-button" onClick={onOpenModal}>
    <span className="plus-icon">+</span> Add Event
  </button>
</div>


      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>❮</button>
        <span>{currentMonth.format('MMMM YYYY')}</span>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>❯</button>
      </div>

      <div className="calendar-grid day-labels">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {generateDays().map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${isSameDay(day, dayjs()) ? 'today' : ''} ${
              isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            onClick={() => onDateSelect(day)}
          >
            {day.date()}
          </div>
        ))}
      </div>
      <div className="today-events">
  <h3>Today's Events</h3>
  {todaysEvents.length === 0 ? (
    <p>No events today</p>
  ) : (
    <ul>
      {todaysEvents.map((event) => (
        <li key={event.id} className="today-event-item">
          <span className="dot" style={{ backgroundColor: event.color || '#0077cc' }}></span>
          <strong>{event.title}</strong>
          <div className="time">{event.time}</div>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default MiniCalendar;
