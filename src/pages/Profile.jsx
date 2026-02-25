import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, User, LogOut, Settings,
    Bell, Globe, Shield, ChevronRight,
    MessageSquare, Lightbulb, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const navigate = useNavigate();
    const { continueAsGuest } = useAuth();

    const handleLogout = () => {
        continueAsGuest();
        navigate('/auth');
    };

    return (
        <div className="flex flex-col h-screen w-full bg-slate-50 relative overflow-y-auto no-scrollbar pb-24 lg:items-center">
            {/* Header */}
            <div className="bg-blue-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-white/30">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam tracking-tight">പ്രൊഫൈൽ</h2>
                        <p className="text-blue-100 text-[11px] font-bold uppercase tracking-widest font-sans mt-0.5">Profile & Settings</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-16 relative z-30 space-y-6 w-full lg:max-w-3xl">
                {/* User Info Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md overflow-hidden mb-4 relative -top-12 -mb-8 flex items-center justify-center text-blue-600">
                        <User className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight text-center">Rahul Kumar</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1">Resident - South Zone</p>

                    {/* Stats Row */}
                    <div className="flex grid-cols-3 w-full gap-3 mt-6 border-t border-slate-100 pt-6">
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-slate-800">2</span>
                            <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-slate-500 mt-1 text-center">Complaints</span>
                        </div>
                        <div className="w-px bg-slate-100"></div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-slate-800">5</span>
                            <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-slate-500 mt-1 text-center">Ideas Supported</span>
                        </div>
                        <div className="w-px bg-slate-100"></div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-slate-800">1</span>
                            <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-slate-500 mt-1 text-center">Resolved</span>
                        </div>
                    </div>
                </motion.div>

                {/* Settings Menu */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-4 shadow-floating border border-slate-100">
                    <div className="flex flex-col">
                        <button className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam">അക്കൗണ്ട് (Account)</h4>
                                <p className="text-xs text-slate-500">Manage personal details</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </button>

                        <button className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam">അറിയിപ്പുകൾ (Notifications)</h4>
                                <p className="text-xs text-slate-500">Alerts & messages</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </button>

                        <button className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam">ഭാഷ (Language)</h4>
                                <p className="text-xs text-slate-500">Malayalam / English</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </button>

                        <button className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-slate-800 text-sm font-malayalam">സ്വകാര്യത (Privacy)</h4>
                                <p className="text-xs text-slate-500">Terms & Policies</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </button>
                    </div>
                </motion.div>

                {/* Logout Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-50 text-red-600 py-4 rounded-[2rem] text-sm font-bold font-malayalam hover:bg-red-100 transition-all focus:outline-none flex items-center justify-center gap-2 border border-red-100 shadow-sm"
                    >
                        <LogOut className="w-5 h-5" /> ലോഗ് ഔട്ട് ചെയ്യുക (Logout)
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
