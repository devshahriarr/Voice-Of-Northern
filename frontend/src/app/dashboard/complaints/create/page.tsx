'use client';
import React, { useState } from 'react';

export default function CreateComplaintPage() {
    const [formData, setFormData] = useState({
        title: '',
        category: 'ACADEMIC',
        description: '',
        isAnonymous: false,
    });
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Multipart payload structure will be integrated with Prisma DB API later
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Submit a Grievance / Complaint</h1>
                <p className="text-xs text-slate-400 mt-1">Raise your voice against inequalities or official disruptions.</p>
            </div>

            <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl max-w-3xl">
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Anonymity Toggle Box */}
                    <div className="p-4 bg-orange-950/20 border border-orange-500/20 rounded-xl flex items-center justify-between">
                        <div className="space-y-0.5 max-w-[80%]">
                            <label className="text-xs font-bold text-orange-400 flex items-center gap-2">
                                🔒 Enable Anonymous Mode
                            </label>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Your personal credentials will be fully encrypted in the database. Public users and students will see it as posted by &ldquo;Anonymous Student&rdquo;.
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-orange-500 cursor-pointer"
                            checked={formData.isAnonymous}
                            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Complaint Header / Title</label>
                            <input
                                type="text" required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="Briefly describe the core issue..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Issue Category</label>
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="ACADEMIC">Academic Issues</option>
                                <option value="ADMINISTRATION">Administration</option>
                                <option value="FACILITIES">Campus Facilities</option>
                                <option value="HARASSMENT">Harassment/Safety</option>
                                <option value="OTHERS">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Elaborate Statement (Provide detailed dates, scenarios, names)</label>
                        <textarea
                            rows={6} required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed"
                            placeholder="State your problem comprehensively..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Evidence Upload Module */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300">Attach Supporting Evidences (Images, PDF, Video) </label>
                        <div className="border border-dashed border-slate-800 hover:border-cyan-500/40 rounded-xl p-6 bg-slate-950/60 text-center cursor-pointer transition-colors relative">
                            <input
                                type="file" multiple
                                accept="image/*,video/*,.pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <span className="text-xs text-slate-400 block font-medium">Click or Drag folders/files to include attachment logs</span>
                        </div>
                        {files.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                                {files.map((file, idx) => (
                                    <span key={idx} className="bg-slate-900 border border-slate-800 text-[11px] px-3 py-1 rounded-md text-slate-300">
                                        📎 {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-md">
                        File Secure Complaint
                    </button>
                </form>
            </div>
        </div>
    );
}