import React from 'react';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  onManage: (event: Event) => void;
}

export function EventCard({ event, onManage }: EventCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400 mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Users className="w-5 h-5 mr-2" />
            <span>{event.soldTickets}/{event.capacity} tickets sold</span>
          </div>
          <div className="flex items-center text-gray-300">
            <DollarSign className="w-5 h-5 mr-2" />
            <span>${event.price.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={() => onManage(event)}
          className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Manage Event
        </button>
      </div>
    </div>
  );
}