'use client';
import React, { useState } from 'react';
import Modal from './modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}

export default function ShareModal({ isOpen, onClose, shareUrl, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      icon: '🔵'
    },
    {
      name: 'X / Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-slate-950 border border-slate-800 hover:bg-slate-900 text-white',
      icon: '🐦'
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      icon: '🟢'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-650 text-white',
      icon: '💼'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Circular / Post">
      <div className="space-y-4 text-xs">
        <p className="text-slate-400">Share this circular or bulletin directly with classmates on social channels:</p>

        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 p-2.5 rounded-xl font-bold transition-colors ${link.color}`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 space-y-2">
          <label className="font-bold text-slate-350">Or Copy Static Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-400 font-mono text-[10px] select-all focus:outline-none"
              value={shareUrl}
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl uppercase text-[10px]"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
