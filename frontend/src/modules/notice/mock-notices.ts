import { Notice } from './types';

export const mockNotices: Notice[] = [
  {
    id: 'not-1',
    title: 'Urgent Protest: Demand for Fair Grading System Overhaul',
    content: 'Voice of Northern calls all students to gather at the main administrative building tomorrow at 10:00 AM to protest against the recent discriminatory grading practices. This movement aims to unify student grades across all engineering and humanities branches.',
    category: 'EMERGENCY',
    priority: 'URGENT',
    isHighlighted: true,
    publishedAt: '2026-05-22T08:00:00.000Z',
    updatedAt: '2026-05-22T08:00:00.000Z',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'not-2',
    title: 'Mid-Term Examination Schedule & Guidelines Change',
    content: 'Important updates regarding the upcoming mid-term examinations have been released by the university central controller office. All departments must abide by the standardized scheduling rules defined in the attached guidelines portfolio.',
    category: 'ACADEMIC',
    priority: 'HIGH',
    isHighlighted: false,
    publishedAt: '2026-05-20T12:00:00.000Z',
    updatedAt: '2026-05-20T12:00:00.000Z',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];
