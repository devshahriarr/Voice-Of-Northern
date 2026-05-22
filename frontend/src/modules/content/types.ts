export interface PostAuthor {
    name: string;
    role: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    type: 'BLOG' | 'MAGAZINE';
    status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'DRAFT';
    category: string;
    coverImage?: string;
    pdfUrl?: string;
    author: PostAuthor;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}
