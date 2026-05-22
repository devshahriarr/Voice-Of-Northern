export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'CAMPAIGN' | 'PROTEST' | 'SEMINAR' | 'COMMUNITY';
  description: string;
  uploadedAt: string;
}

export const mockGalleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    title: 'CSE Students General Assembly',
    category: 'COMMUNITY',
    description: 'Students gathering to discuss the academic policy amendments and student representation councils.',
    uploadedAt: '2026-05-18T10:00:00.000Z'
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    title: 'Campaign for Modern Laboratory Gear',
    category: 'CAMPAIGN',
    description: 'VON members distributing brochures highlighting critical hardware shortages in the Pharmacy labs.',
    uploadedAt: '2026-05-15T14:30:00.000Z'
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    title: 'Human Rights Day Student Seminar',
    category: 'SEMINAR',
    description: 'Legal awareness workshop featuring invited guest speaker lawyers and university faculty panel.',
    uploadedAt: '2026-05-10T09:00:00.000Z'
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    title: 'Peaceful Rally Demanding Security on Campus roads',
    category: 'PROTEST',
    description: 'A large student march from the front gate to the administration block demanding modern street lighting.',
    uploadedAt: '2026-05-08T11:15:00.000Z'
  }
];
