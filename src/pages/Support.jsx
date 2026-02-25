import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PhoneCall, Droplet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Support() {
    const navigate = useNavigate();
    const { requireAuth } = useAuth();

    const handleCallSOS = () => {
        requireAuth(() => {
            // Simulate calling the Police / Ambulance
            alert('Calling Emergency SOS...');
        }, {
            title: "ഈ സേവനം ഉപയോഗിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to continue."
        });
    };

    const handleCallDonor = (donorName) => {
        requireAuth(() => {
            // Logic that runs ONLY if logged in.
            // E.g., open tel link or perform app action
            alert(`Calling Blood Donor: ${donorName}`);
            window.location.href = 'tel:+919876543210';
        }, {
            title: "ഈ സേവനം ഉപയോഗിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to continue."
        });
    };

    return (
        <div className="flex flex-col h-screen w-full bg-slate-50 relative overflow-y-auto pb-6 text-slate-800 lg:items-center">
            <div className="bg-rose-500 px-6 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8 rounded-b-[2.5rem] md:rounded-b-[3.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-white/30">
                        <ArrowLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl md:text-2xl font-bold font-malayalam">കൈത്താങ്ങ്</h2>
                        <p className="text-rose-100 text-xs md:text-sm font-semibold uppercase tracking-wider">Support</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-10 space-y-6 md:space-y-8 w-full lg:max-w-3xl">
                {/* SOS Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-floating border border-slate-100 flex items-center justify-between transition-shadow hover:shadow-xl">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg md:text-xl">Emergency SOS</h3>
                        <p className="text-xs md:text-sm text-slate-500 mt-1">Ambulance & Police</p>
                    </div>
                    <button
                        onClick={handleCallSOS}
                        className="w-12 h-12 md:w-16 md:h-16 bg-rose-100/50 rounded-full flex items-center justify-center ring-4 ring-rose-50 hover:bg-rose-100 transition-all active:scale-95"
                    >
                        <PhoneCall className="text-rose-600 w-5 h-5 md:w-7 md:h-7 fill-rose-600" />
                    </button>
                </motion.div>

                {/* Blood Bank Directory */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2.5rem] shadow-floating border border-slate-100 overflow-hidden">
                    <div className="p-5 md:p-6 border-b border-slate-50 bg-rose-50/30 flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 text-rose-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner">
                            <Droplet className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 md:text-lg">Blood Bank</h3>
                            <p className="text-xs md:text-sm text-slate-500">Local emergency donors</p>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {/* Donor Item */}
                        <div className="p-5 md:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-white bg-rose-500 flex items-center justify-center shadow-md md:text-lg">
                                    O+
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm md:text-base">Rahul Kumar</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">North Zone • Last Donated: Jan</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCallDonor('Rahul Kumar')}
                                className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                            >
                                <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-current" />
                            </button>
                        </div>

                        {/* Donor Item */}
                        <div className="p-5 md:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-white bg-red-600 flex items-center justify-center shadow-md md:text-lg">
                                    B-
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm md:text-base">Arun P. V.</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">South Zone • Last Donated: Nov</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCallDonor('Arun P. V.')}
                                className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                            >
                                <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-current" />
                            </button>
                        </div>

                        {/* Donor Item */}
                        <div className="p-5 md:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-white bg-rose-400 flex items-center justify-center shadow-md md:text-lg">
                                    A+
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm md:text-base">Nikhil Das</h4>
                                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">East Zone • Available</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCallDonor('Nikhil Das')}
                                className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                            >
                                <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-current" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
