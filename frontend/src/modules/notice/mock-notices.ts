import { Notice } from './types';

export const mockNotices: Notice[] = [
  {
    id: 'not-1',
    title: 'Urgent Protest: Demand for Fair Grading System Overhaul',
    content: 'Voice of Northern calls all students to gather at the main administrative building tomorrow at 10:00 AM to protest against the recent discriminatory grading practices.',
    category: 'EMERGENCY',
    priority: 'URGENT',
    isHighlighted: true,
    publishedAt: '2026-05-22T08:00:00.000Z',
    updatedAt: '2026-05-22T08:00:00.000Z',
  },
  {
    id: 'not-2',
    title: 'Mid-Term Examination Schedule & Guidelines Change',
    content: 'Important updates regarding the upcoming mid-term examinations have been released by the university central controller office.',
    category: 'ACADEMIC',
    priority: 'HIGH',
    isHighlighted: false,
    publishedAt: '2026-05-20T12:00:00.000Z',
    updatedAt: '2026-05-20T12:00:00.000Z',
  }
];
