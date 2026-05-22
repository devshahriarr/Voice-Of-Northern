import { BlogPost } from './types';

export const mockPosts: BlogPost[] = [
    {
        id: 'post-101',
        title: 'Demanding Transparency in University Tuition and Resource Allocation',
        slug: 'demanding-transparency-university-tuition-allocation',
        content: `As students, we pay thousands of BDT each semester in fees designated for labs, libraries, and student facilities. However, a walk through our campus tells a different story. Defective air conditioners, outdated lab software, and underfunded club programs have become the norm. 

We believe it is time for the university administration to publish a detailed audit of where our tuition money actually goes. A transparent resource allocation system ensures that students get the facilities they are paying for, and it builds trust between the student body and administration.

Voice of Northern stands committed to advocating for financial transparency. Join us in signing our petition for annual budget disclosures.`,
        type: 'BLOG',
        status: 'APPROVED',
        category: 'STUDENT_RIGHTS',
        coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        author: {
            name: 'Nayeem Chowdhury',
            role: 'CONTENT_WRITER'
        },
        tags: ['transparency', 'student_rights', 'tuition_fees'],
        createdAt: '2026-05-20T10:00:00.000Z',
        updatedAt: '2026-05-20T10:00:00.000Z'
    },
    {
        id: 'post-102',
        title: 'Voice of Northern Campus Magazine - Issue Spring 2026',
        slug: 'von-campus-magazine-issue-spring-2026',
        content: `Welcome to the Spring 2026 edition of the Voice of Northern Magazine. This issue compiles investigative reports on the recent grading overhaul, profiles of student activists, poetry, short stories, and a detailed retrospective of our successful advocacy campaigns over the past semester.

Inside, you will find:
- The Grading System Debate: An in-depth analysis of university-wide curves and GPA calculations.
- Under the Hood: Investigating facilities maintenance budgets.
- Creative Corner: Poems and artwork by local student creators.

Download the complete PDF version below for offline reading and access to interactive pages.`,
        type: 'MAGAZINE',
        status: 'APPROVED',
        category: 'CAMPUS_MAGAZINE',
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
        pdfUrl: '/docs/von_magazine_spring_2026.pdf',
        author: {
            name: 'Editorial Board',
            role: 'SUPER_ADMIN'
        },
        tags: ['magazine', 'newsletter', 'spring_2026'],
        createdAt: '2026-05-22T09:00:00.000Z',
        updatedAt: '2026-05-22T09:00:00.000Z'
    },
    {
        id: 'post-103',
        title: 'Mental Health Support: The Missing Piece of Campus Infrastructure',
        slug: 'mental-health-support-missing-piece-campus-infrastructure',
        content: `Academic pressure, career anxieties, and personal challenges can take a heavy toll on student well-being. Despite this, our campus lacks a dedicated mental health counseling center. Students are often left to cope alone or seek expensive private support.

We are calling on the administration to establish a free, confidential counseling service staffed by qualified professionals. Mental health is not a luxury; it is a fundamental component of student success and campus safety.`,
        type: 'BLOG',
        status: 'APPROVED',
        category: 'HEALTH_AND_WELLNESS',
        coverImage: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800',
        author: {
            name: 'Farhana Yeasmin',
            role: 'CONTENT_WRITER'
        },
        tags: ['mental_health', 'student_welfare', 'campus_life'],
        createdAt: '2026-05-18T14:30:00.000Z',
        updatedAt: '2026-05-18T14:30:00.000Z'
    }
];
