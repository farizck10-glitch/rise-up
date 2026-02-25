import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, Zap, Paintbrush, PhoneCall } from 'lucide-react';

export default function Workplace() {
    const navigate = useNavigate();

    const workers = [
        { id: 1, name: 'Suresh P', skill: 'Plumber', exp: '10+ yrs', icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 2, name: 'Biju K', skill: 'Electrician', exp: '8 yrs', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100' },
        { id: 3, name: 'Rajan T', skill: 'Painter', exp: '15 yrs', icon: Paintbrush, color: 'text-pink-500', bg: 'bg-pink-100' },
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-slate-50 relative overflow-y-auto pb-6 lg:items-center">
            <div className="bg-amber-500 px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam">തൊഴിലിടം</h2>
                        <p className="text-amber-100 text-xs font-semibold uppercase tracking-wider">Workplace</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6 w-full lg:max-w-3xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Local Service Directory</h3>

                    <div className="space-y-4">
                        {workers.map((worker) => {
                            const Icon = worker.icon;
                            return (
                                <div key={worker.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${worker.bg}`}>
                                        <Icon className={`w-6 h-6 ${worker.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{worker.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium mt-0.5">{worker.skill} • {worker.exp}</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors text-slate-400">
                                        <PhoneCall className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
