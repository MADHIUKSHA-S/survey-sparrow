import React, { useState } from 'react';
import dayjs from 'dayjs';
import MiniCalendar from './components/MiniCalendar';
import WeekView from './components/WeekView';
import EventModal from './components/EventModal';
import './components/calender.css';
import initialEvents from './data/events.json';
const App = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState(initialEvents);

  const [showModal, setShowModal] = useState(false);
  const today = dayjs().format('YYYY-MM-DD');
const todaysEvents = events.filter((e) => e.date === today);
const [editingEvent, setEditingEvent] = useState(null);
  const addEvent = (event) => {
    setEvents([...events, event]);
  };
const editEvent = (updatedEvent) => {
  setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
};

const deleteEvent = (eventId) => {
  setEvents(events.filter(e => e.id !== eventId));
};

  return (
    <div className="calendar-container">
      <aside className="sidebar">
        <MiniCalendar
       selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  onOpenModal={() => setShowModal(true)}
  todaysEvents={todaysEvents}
        />
      </aside>
      <main className="main-view">
       <WeekView
  selectedDate={selectedDate}
  events={events}
  onEdit={(event) => setEditingEvent(event)}
  onDelete={(id) => setEvents(events.filter((e) => e.id !== id))}
/>
      </main>

     {(showModal || editingEvent) && (
  <EventModal
    onClose={() => {
      setShowModal(false);
      setEditingEvent(null);
    }}
    onSave={(eventData) => {
      if (editingEvent) {
        // Update existing event
        setEvents(events.map((e) => (e.id === editingEvent.id ? { ...eventData, id: e.id } : e)));
        setEditingEvent(null);
      } else {
        // Add new event
        setEvents([...events, eventData]);
      }
      setShowModal(false);
    }}
    initialData={editingEvent}
  />
)}

    </div>
  );
};

export default App;
