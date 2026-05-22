import { Event } from './types';

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'National Student Rights Orientation & Seminar 2026',
    description: 'Join us to understand your institutional rights, legal frameworks, and how Voice of Northern advocates for you.',
    type: 'FREE',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: 'Seminar',
    eventDate: '2026-06-05T10:00:00.000Z',
    location: 'University Main Auditorium',
    registrationDeadline: '2026-06-02T23:59:59.000Z',
  },
  {
    id: 'evt-2',
    title: 'Voice of Northern Annual Inter-Department Quiz Competition',
    description: 'Test your general knowledge and university history. Total prize pool worth 25,000 BDT.',
    type: 'PAID',
    price: 150,
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    category: 'Competition',
    eventDate: '2026-06-15T14:00:00.000Z',
    location: 'Central TSC Seminar Hall',
    registrationDeadline: '2026-06-10T23:59:59.000Z',
  }
];
