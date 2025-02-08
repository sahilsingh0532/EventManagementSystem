import React, { useState } from 'react';
import { X, Ticket, Edit, BarChart3, Mail } from 'lucide-react';
import { Event } from '../data/events';

interface ManageEventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void;
}

export function ManageEventModal({ event, isOpen, onClose, onUpdate }: ManageEventModalProps) {
  const [activeTab, setActiveTab] = useState<'tickets' | 'edit' | 'analytics'>('tickets');
  const [editedEvent, setEditedEvent] = useState<Event>(event);
  const [ticketsSold, setTicketsSold] = useState(event.soldTickets);

  if (!isOpen) return null;

  const handleSellTickets = (amount: number) => {
    const newTotal = Math.min(ticketsSold + amount, event.capacity);
    setTicketsSold(newTotal);
    onUpdate({
      ...event,
      soldTickets: newTotal
    });
  };

  const handleRefundTickets = (amount: number) => {
    const newTotal = Math.max(ticketsSold - amount, 0);
    setTicketsSold(newTotal);
    onUpdate({
      ...event,
      soldTickets: newTotal
    });
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedEvent);
  };

  const sendPromotionalEmail = () => {
    // Simulated email sending
    alert('Promotional email sent to registered attendees!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Event: {event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'tickets'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Tickets
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'edit'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </button>
        </div>

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ticket Management</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-300 mb-2">Tickets Sold</p>
                  <p className="text-2xl font-bold">{ticketsSold}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Available Tickets</p>
                  <p className="text-2xl font-bold">{event.capacity - ticketsSold}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSellTickets(1)}
                  disabled={ticketsSold >= event.capacity}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sell Ticket
                </button>
                <button
                  onClick={() => handleRefundTickets(1)}
                  disabled={ticketsSold <= 0}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Refund Ticket
                </button>
              </div>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Promotion</h3>
              <button
                onClick={sendPromotionalEmail}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Promotional Email
              </button>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <form onSubmit={handleUpdateEvent} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Event Title</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                value={editedEvent.title}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                rows={4}
                value={editedEvent.description}
                onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                  value={editedEvent.date}
                  onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                  value={editedEvent.time}
                  onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Location</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                value={editedEvent.location}
                onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Price ($)</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                  value={editedEvent.price}
                  onChange={(e) => setEditedEvent({ ...editedEvent, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                  value={editedEvent.capacity}
                  onChange={(e) => setEditedEvent({ ...editedEvent, capacity: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                value={editedEvent.image}
                onChange={(e) => setEditedEvent({ ...editedEvent, image: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
            >
              Update Event
            </button>
          </form>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Event Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-2">Ticket Sales Progress</p>
                  <div className="w-full bg-gray-600 rounded-full h-4">
                    <div
                      className="bg-purple-600 h-4 rounded-full"
                      style={{ width: `${(ticketsSold / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {((ticketsSold / event.capacity) * 100).toFixed(1)}% of capacity
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Revenue</p>
                  <p className="text-2xl font-bold">${(ticketsSold * event.price).toFixed(2)}</p>
                  <p className="text-sm text-gray-400">From {ticketsSold} tickets</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="flex space-x-4">
                <button
                  onClick={sendPromotionalEmail}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Promote Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}