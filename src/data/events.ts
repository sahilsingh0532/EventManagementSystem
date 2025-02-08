export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  soldTickets: number;
  image: string;
  organizer: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
    date: '2024-05-15',
    time: '09:00',
    location: 'Digital Convention Center',
    price: 299.99,
    capacity: 500,
    soldTickets: 350,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Tech Events Inc.'
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'A three-day music extravaganza featuring top artists from around the world.',
    date: '2024-07-20',
    time: '14:00',
    location: 'Riverside Park',
    price: 150.00,
    capacity: 2000,
    soldTickets: 1500,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Festival Productions'
  },
  {
    id: '3',
    title: 'Business Leadership Summit',
    description: 'Connect with industry leaders and learn about the future of business.',
    date: '2024-06-10',
    time: '10:00',
    location: 'Grand Hotel',
    price: 499.99,
    capacity: 300,
    soldTickets: 200,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Business Network International'
  }
];