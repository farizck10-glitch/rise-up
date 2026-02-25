import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Recycle, Sprout } from 'lucide-react';

export default function GreenCulture() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-full bg-slate-50 relative overflow-y-auto pb-6 lg:items-center">
            <div className="bg-emerald-500 px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam">നാട്ടുനന്മ</h2>
                        <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Green & Culture</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6 w-full lg:max-w-3xl">
                {/* Waste Management */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                            <Recycle className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Waste Collection</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <h4 className="font-semibold text-sm text-slate-700">Plastic Waste</h4>
                                <p className="text-xs text-slate-500">Haritha Karma Sena</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Next: 15th Sep</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <h4 className="font-semibold text-sm text-slate-700">E-Waste</h4>
                                <p className="text-xs text-slate-500">Panchayat Collection</p>
                            </div>
                            <span className="text-xs font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">TBA</span>
                        </div>
                    </div>
                </motion.div>

                {/* Agriculture */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <Sprout className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Krishi Bhavan Updates</h3>
                    </div>

                    <div className="p-4 rounded-xl bg-green-50 border border-green-100 space-y-2">
                        <h4 className="font-bold text-green-800 text-sm">Seed Distribution Camp</h4>
                        <p className="text-xs text-green-700 leading-relaxed">Free vegetable seeds will be distributed at the ward center this Sunday (10:00 AM - 1:00 PM).</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
