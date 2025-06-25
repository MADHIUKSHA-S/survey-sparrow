import React, { useState } from 'react';
import './modal.css';

const EventModal = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [description, setDescription] = useState(initialData?.description || '');
  
  const [color, setColor] = useState(initialData?.color || '#0077cc');

  const handleSubmit = () => {
    let [hr, min] = time.split(':').map(Number);


const finalTime = `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;


    onSave({
 id: initialData?.id || Date.now(),
  title,
  date,
  time: finalTime,
  duration,
  description,
  color,
});


    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Event</h2>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Time</label>
<div style={{ display: 'flex', gap: '8px' }}>
  <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    style={{ flex: 1 }}
  />
  
</div>

<label>Event Color</label>
<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />




        <label>Duration (in minutes)</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
