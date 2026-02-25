import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    AlertTriangle,
    Activity,
    Calendar,
    PhoneCall,
    Share2,
    MapPin,
    Clock
} from 'lucide-react';

export default function Updates() {
    const navigate = useNavigate();

    const updates = [
        {
            id: 1,
            type: 'alert',
            icon: AlertTriangle,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
            borderColor: 'border-red-200',
            title: 'Emergency Alert',
            malayalamTitle: 'അടിയന്തര അറിയിപ്പ്: കനത്ത മഴ മുന്നറിയിപ്പ്',
            date: 'Today, 08:00 AM',
            desc: 'Heavy rain is predicted for the next 48 hours across the ward. Residents in low-lying areas are advised to stay alert and avoid unnecessary travel. For any emergencies, please contact the SOS control room immediately.',
            action: 'Call SOS Control Room',
            actionIcon: PhoneCall
        },
        {
            id: 2,
            type: 'project',
            icon: Activity,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            borderColor: 'border-orange-200',
            title: 'Ongoing Project',
            malayalamTitle: 'പുതിയ കുടിവെള്ള പദ്ധതി: പൈപ്പ് സ്ഥാപിക്കൽ',
            date: 'Yesterday, 04:30 PM',
            desc: 'The pipeline laying work for the new drinking water project in the South Zone has reached 80% completion. Connection works to individual houses will commence next week. Water supply disruptions may occur temporarily.',
            progress: 80,
            targetDate: 'March 2026'
        },
        {
            id: 3,
            type: 'notice',
            icon: Calendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
            title: 'Gramasabha Notice',
            malayalamTitle: 'വാർഡ് ഗ്രാമസഭ യോഗം',
            date: '10 Aug 2026',
            desc: 'The upcoming Gramasabha meeting will discuss the allocation of funds for the new financial year and review pending development projects. All ward residents are requested to participate and share their valuable suggestions.',
            venue: 'Ward Community Hall, near Public Library',
            time: '10:00 AM, 15th Aug 2026'
        }
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-[#f8fafc] overflow-y-auto no-scrollbar pb-24 lg:items-center">

            {/* Header */}
            <div className="bg-primary px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors shrink-0">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam tracking-tight">വാർഡ് അറിയിപ്പുകൾ</h2>
                        <p className="text-indigo-100 text-[11px] font-bold uppercase tracking-widest font-sans mt-0.5">Ward Bulletin Updates</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 w-full lg:max-w-3xl mt-2">

                {updates.map((item, index) => {
                    const Icon = item.icon;
                    const ActionIcon = item.actionIcon;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-floating border ${item.borderColor} flex flex-col relative overflow-hidden`}
                        >
                            {/* Decorative Background Element */}
                            <div className={`absolute -right-10 -top-10 w-40 h-40 ${item.bgColor} opacity-30 rounded-full blur-3xl pointer-events-none`}></div>

                            <div className="flex items-start gap-4 mb-5 relative z-10">
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner ${item.bgColor} ${item.color}`}>
                                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <div className="flex-1 mt-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider ${item.bgColor} ${item.color}`}>
                                            {item.title}
                                        </span>
                                        <span className="text-[11px] font-medium text-slate-400 font-sans tracking-wide flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {item.date}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-lg md:text-xl leading-tight font-malayalam pr-2">{item.malayalamTitle}</h3>
                                </div>
                            </div>

                            <p className="text-sm md:text-base text-slate-600 font-malayalam leading-relaxed relative z-10 mb-6 border-b border-slate-100 pb-6">
                                {item.desc}
                            </p>

                            {/* Conditional Meta Data Section */}
                            <div className="relative z-10">
                                {item.type === 'project' && (
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex justify-between text-xs font-bold text-slate-600 mb-2 font-sans tracking-wide">
                                            <span className="uppercase text-[10px] text-slate-400">Current Progress</span>
                                            <span className="text-orange-500">{item.progress}%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-3">
                                            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full relative" style={{ width: `${item.progress}%` }}>
                                                <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Target Check: <span className="text-slate-600">{item.targetDate}</span></p>
                                    </div>
                                )}

                                {item.type === 'notice' && (
                                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Venue</p>
                                                <p className="text-sm font-semibold text-slate-700">{item.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Time</p>
                                                <p className="text-sm font-semibold text-slate-700">{item.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Card Actions */}
                                <div className={`mt-5 flex gap-3 ${!item.action ? 'justify-end' : ''}`}>
                                    {item.action && (
                                        <button className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${item.color} ${item.bgColor} hover:brightness-95`}>
                                            <ActionIcon className="w-4 h-4" />
                                            <span className="font-sans uppercase tracking-wider text-[11px]">{item.action}</span>
                                        </button>
                                    )}
                                    <button className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 hover:border-indigo-200 transition-colors shrink-0">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

            </div>
        </div>
    );
}
