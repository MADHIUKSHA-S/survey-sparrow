import React, { useState } from 'react';
import dayjs from 'dayjs';
import './eventblock.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const WeekView = ({ selectedDate, events,onEdit,
  onDelete }) => {
  const [tooltip, setTooltip] = useState(null);

  const startOfWeek = selectedDate.startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  const getEventStyle = (event) => {
    const timeParts = event.time.split(':');
    const top = parseInt(timeParts[0]) * 40 + (parseInt(timeParts[1]) / 60) * 40; // 40px per hour
    const height = (parseInt(event.duration) / 60) * 40;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="week-view-container">
      <div className="week-header">
        <div className="time-col-header" />
        {days.map((day, i) => (
          <div key={i} className="day-header">
            <div>{day.format('ddd')}</div>
            <div>{day.format('DD')}</div>
          </div>
        ))}
      </div>

      <div className="week-grid">
        <div className="time-column">
          {hours.map((hour) => (
            <div key={hour} className="hour-cell time-label">
              {hour}:00
            </div>
          ))}
        </div>

        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="day-column">
            {hours.map((hour) => (
              <div key={`${dayIndex}-${hour}`} className="hour-cell" />
            ))}

         {events
  .filter((e) => dayjs(e.date).isSame(day, 'day'))
  .map((event) => (
    <div
      key={event.id}
      className="event-block"
      style={{
        ...getEventStyle(event),
        backgroundColor: event.color || '#0077cc',
      }}
      onClick={(e) => {
        e.stopPropagation(); 
         console.log('Clicked event:', event);
  console.log('Set tooltip to:', tooltip?.id === event.id ? null : event);// prevent other clicks
        setTooltip(tooltip?.id === event.id ? null : event);
      }}
    >
      <div className="event-title">{event.title}</div>

      {tooltip?.id === event.id && (
        <div className="tooltip">
          <strong>{event.title}</strong>
          <p style={{ margin: '6px 0', fontSize: '0.75rem' }}>
            {event.description || 'No description'}
          </p>
          <div className="tooltip-actions">
            <button onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
              setTooltip(null);
            }}>
              Edit
            </button>
            <button onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
              setTooltip(null);
            }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
))}



     

          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
