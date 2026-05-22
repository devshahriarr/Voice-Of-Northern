export type EventType = 'FREE' | 'OPEN_CONTRIBUTION' | 'PAID';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  price?: number;
  bannerImage: string;
  category: string;
  eventDate: string;
  location: string;
  registrationDeadline: string;
}
