'use client';
import React, { useState, useRef } from 'react';

interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  onUploadSuccess: (url: string, name: string) => void;
  onUploadStart?: () => void;
  label?: string;
  currentFileUrl?: string;
}

export default function FileUpload({
  accept = 'image/*,application/pdf',
  maxSizeMB = 5,
  onUploadSuccess,
  onUploadStart,
  label = 'Upload File',
  currentFileUrl
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentFileUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndUpload = (file: File) => {
    setError(null);

    // Validate type
    const acceptedTypes = accept.split(',');
    const matchesType = acceptedTypes.some(type => {
      const trimmed = type.trim();
      if (trimmed === 'image/*') return file.type.startsWith('image/');
      if (trimmed === 'application/pdf') return file.type === 'application/pdf';
      return file.type === trimmed || file.name.endsWith(trimmed);
    });

    if (!matchesType) {
      setError(`Invalid file type. Allowed formats: ${accept}`);
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSizeMB}MB.`);
      return;
    }

    // Start simulation
    if (onUploadStart) onUploadStart();
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const simulatedUrl = URL.createObjectURL(file);
            setPreviewUrl(simulatedUrl);
            onUploadSuccess(simulatedUrl, file.name);
            setUploadProgress(null);
          }, 200);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndUpload(file);
  };

  return (
    <div className="space-y-2 text-xs">
      <label className="font-bold text-slate-350">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border border-dashed rounded-xl p-4 transition-all text-center cursor-pointer flex flex-col items-center justify-center min-h-[110px] ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/10'
            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        {uploadProgress !== null ? (
          <div className="w-full max-w-[180px] space-y-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-100"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : previewUrl ? (
          <div className="flex items-center gap-3 w-full">
            {previewUrl.startsWith('data:image/') || previewUrl.startsWith('blob:') || previewUrl.includes('images.unsplash.com') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-12 h-12 rounded-lg object-cover border border-slate-800"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-lg">
                📄
              </div>
            )}
            <div className="text-left min-w-0 flex-1">
              <p className="text-slate-300 font-bold truncate">File Bound Successfully</p>
              <p className="text-[10px] text-slate-500 hover:underline">Click or drop to replace</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1 text-slate-500">
            <span className="text-xl">📥</span>
            <p className="font-semibold text-[10px] text-slate-400">Drag & drop files or click to browse</p>
            <p className="text-[9px] text-slate-600">Supports JPG, PNG, PDF up to {maxSizeMB}MB</p>
          </div>
        )}
      </div>

      {error && <p className="text-[10px] text-red-400 font-bold mt-1">⚠️ {error}</p>}
    </div>
  );
}
