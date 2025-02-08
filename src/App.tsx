import { useState } from 'react';
import { Plus } from 'lucide-react';
import { events as initialEvents, Event } from './data/events';
import { EventCard } from './components/EventCard';
import { CreateEventModal } from './components/CreateEventModal';
import { ManageEventModal } from './components/ManageEventModal';

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleCreateEvent = (eventData: any) => {
    const newEvent: Event = {
      id: (events.length + 1).toString(),
      ...eventData,
      soldTickets: 0,
      organizer: 'Current User',
      price: parseFloat(eventData.price),
      capacity: parseInt(eventData.capacity)
    };
    setEvents([...events, newEvent]);
  };

  const handleManageEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsManageModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg animate-fadeIn">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Event Manager</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onManage={handleManageEvent}
            />
          ))}
        </div>
      </main>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      {selectedEvent && (
        <ManageEventModal
          event={selectedEvent}
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          onUpdate={handleUpdateEvent}
        />
      )}
    </div>
  );
}

export default App;