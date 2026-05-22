export type NoticePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type NoticeCategory = 'ACADEMIC' | 'ADMINISTRATIVE' | 'EMERGENCY' | 'GENERAL';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  priority: NoticePriority;
  isHighlighted: boolean;
  publishedAt: string;
  updatedAt: string;
}
