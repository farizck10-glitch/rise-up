import React from 'react';
import { Edit2, ExternalLink, Calendar, Trash2 } from 'lucide-react';

const SchemeCard = ({ scheme, onEdit, onDelete }) => {
    return (
        <div className="bg-surface rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-l-2xl"></div>

            <div className="flex justify-between items-start mb-4 pl-3">
                <h3 className="font-bold text-lg text-slateDark leading-tight line-clamp-2 pr-4">
                    {scheme.title}
                </h3>
                <div className="flex space-x-2 shrink-0">
                    <button
                        onClick={() => onEdit(scheme)}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
                        title="Edit Scheme"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    {onDelete && (
                        <button
                            onClick={() => onDelete(scheme.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Scheme"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <p className="text-slate-500 text-sm mb-5 line-clamp-3 flex-grow pl-3">
                {scheme.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 pl-3">
                <div className="flex items-center text-xs font-medium text-slate-400 bg-slate-50 py-1 px-2.5 rounded-lg border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>{scheme.deadline || 'No deadline'}</span>
                </div>

                {scheme.link && (
                    <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                    >
                        <span>View Link</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default SchemeCard;
