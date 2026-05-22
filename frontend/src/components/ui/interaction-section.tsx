'use client';
import React, { useState } from 'react';
import ShareModal from './share-modal';

export interface CommentItem {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  replies?: CommentItem[];
}

interface InteractionSectionProps {
  itemId: string;
  initialLikes: number;
  initialHasLiked?: boolean;
  shareUrl: string;
  shareTitle: string;
  categoryLabel?: string;
}

export default function InteractionSection({
  itemId,
  initialLikes,
  initialHasLiked = false,
  shareUrl,
  shareTitle,
  categoryLabel = 'Post'
}: InteractionSectionProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareCount, setShareCount] = useState(4);

  // Mock comments initialized based on the itemId
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      author: 'Abrar Chowdhury',
      role: 'Student Representative',
      content: 'Absolutely agree with the stance here. We need transparency and active resolution timelines.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      replies: [
        {
          id: 'c-2',
          author: 'Sajid Al Hasan',
          role: 'Admin',
          content: 'The executive committee has noted these suggestions. We will present these at the upcoming administrative assembly.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        }
      ]
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const freshComment: CommentItem = {
      id: `comm-${Date.now()}`,
      author: 'Current Student',
      role: 'Member',
      content: newCommentText,
      timestamp: new Date().toISOString(),
      replies: []
    };

    setComments(prev => [...prev, freshComment]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const freshReply: CommentItem = {
      id: `rep-${Date.now()}`,
      author: 'Current Student',
      role: 'Member',
      content: replyText,
      timestamp: new Date().toISOString()
    };

    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return { ...c, replies: [...(c.replies || []), freshReply] };
        }
        return c;
      })
    );

    setReplyText('');
    setReplyingToId(null);
  };

  const countTotalComments = (items: CommentItem[]): number => {
    return items.reduce((acc, curr) => acc + 1 + (curr.replies ? countTotalComments(curr.replies) : 0), 0);
  };

  const totalComments = countTotalComments(comments);

  return (
    <div className="space-y-6 pt-6 border-t border-slate-900">
      
      {/* Action / Engagement Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-b border-slate-900 text-xs">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 font-bold transition-all ${
              hasLiked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            <span className="text-sm">{hasLiked ? '❤️' : '🤍'}</span>
            <span>{likes} Reactions</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-400 font-bold">
            <span>💬</span>
            <span>{totalComments} Comments</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-bold">
            <span>📈</span>
            <span>{shareCount} Shares</span>
          </div>
        </div>

        <button
          onClick={() => {
            setShareModalOpen(true);
            setShareCount(prev => prev + 1);
          }}
          className="flex items-center gap-1.5 font-bold text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
        >
          <span>🔗</span>
          <span>Social Share</span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-white uppercase tracking-widest">
          Engagement Discussion Feed
        </h3>

        {/* Comment composition */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            value={newCommentText}
            onChange={e => setNewCommentText(e.target.value)}
            placeholder={`Share your perspective on this ${categoryLabel.toLowerCase()}...`}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 min-h-[90px] leading-relaxed resize-none font-sans"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-[10px] uppercase transition-colors"
          >
            Submit Comment
          </button>
        </form>

        {/* Comments Thread list */}
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className="p-4 bg-slate-900/20 border border-slate-900 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{c.author}</span>
                  <span className="bg-slate-950 text-slate-500 px-1.5 py-0.2 rounded font-mono">
                    {c.role}
                  </span>
                </div>
                <span className="text-slate-650 font-mono">
                  {new Date(c.timestamp).toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-slate-350 leading-relaxed font-sans">{c.content}</p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-950/20">
                <button
                  onClick={() => setReplyingToId(c.id === replyingToId ? null : c.id)}
                  className="text-[10px] text-cyan-400 font-bold hover:underline"
                >
                  {replyingToId === c.id ? 'Cancel Reply' : 'Add Reply'}
                </button>
              </div>

              {/* Nested Reply form */}
              {replyingToId === c.id && (
                <div className="space-y-2 pl-4 border-l border-slate-850 pt-2 text-xs">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={() => handleAddReply(c.id)}
                    className="px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded text-[9px] uppercase"
                  >
                    Reply
                  </button>
                </div>
              )}

              {/* Replies list */}
              {c.replies && c.replies.length > 0 && (
                <div className="pl-4 border-l border-slate-850 space-y-3 pt-2">
                  {c.replies.map(reply => (
                    <div key={reply.id} className="p-3 bg-slate-950/30 border border-slate-900/80 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-[9px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{reply.author}</span>
                          <span className="text-slate-505 bg-slate-900 px-1 py-0.2 rounded font-mono">
                            {reply.role}
                          </span>
                        </div>
                        <span className="text-slate-600 font-mono">
                          {new Date(reply.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-350 leading-relaxed font-sans">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-[11px] text-slate-500 text-center py-6">Be the first to share your thoughts!</p>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={shareUrl}
        title={shareTitle}
      />
    </div>
  );
}
