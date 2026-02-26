import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    Settings,
    Heart,
    Briefcase,
    Leaf,
    Bell,
    Search,
    User,
    Activity,
    QrCode,
    ChevronRight,
    ShoppingBag,
    PhoneCall,
    AlertTriangle,
    Calendar
} from 'lucide-react';
import DigitalIDModal from '../components/DigitalIDModal';
import { EmergencyPopup, ServiceToast, GramasabhaAlert, NotificationCenter } from '../components/Notifications';
import PensionWidget from '../components/PensionWidget';

const pillars = [
    { id: 1, title: 'നമ്മുടെ വാർഡ്', subtitle: 'Our Ward', descMalayalam: 'വികസന പദ്ധതികൾ', descEnglish: 'Development Projects', icon: Home, color: 'bg-blue-500', path: '/our-ward' },
    { id: 2, title: 'സ്മാർട്ട് വാർഡ്', subtitle: 'Smart Ward', descMalayalam: 'ഇ-സേവനങ്ങളും പരാതികളും', descEnglish: 'E-Services & Complaints', icon: Settings, color: 'bg-purple-500', path: '/smart-ward' },
    { id: 3, title: 'കൈത്താങ്ങ്', subtitle: 'Support', descMalayalam: 'ആരോഗ്യവും അത്യാഹിത സേവനങ്ങളും', descEnglish: 'Health & Emergency', icon: Heart, color: 'bg-rose-500', path: '/support' },
    { id: 4, title: 'തൊഴിലിടം', subtitle: 'Workplace', descMalayalam: 'പ്രാദേശിക തൊഴിൽ അവസരങ്ങൾ', descEnglish: 'Local Job Opportunities', icon: Briefcase, color: 'bg-amber-500', path: '/workplace' },
    { id: 5, title: 'നാട്ടുനന്മ', subtitle: 'Green & Culture', descMalayalam: 'കൃഷി, മാലിന്യ സംസ്കരണം', descEnglish: 'Agriculture & Waste Management', icon: Leaf, color: 'bg-emerald-500', path: '/green' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [isIDModalOpen, setIsIDModalOpen] = useState(false);
    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const UNREAD_COUNT = 3;

    useEffect(() => {
        // Trigger generic luxury service toast after a short delay
        const toastTimer = setTimeout(() => {
            setIsToastOpen(true);
        }, 2000);

        // Trigger emergency popup demo ONLY once per session
        const hasSeenEmergency = sessionStorage.getItem('hasSeenEmergency18');
        if (!hasSeenEmergency) {
            const emergencyTimer = setTimeout(() => {
                setIsEmergencyOpen(true);
                sessionStorage.setItem('hasSeenEmergency18', 'true');
            }, 6000);
            return () => clearTimeout(emergencyTimer);
        }

        return () => clearTimeout(toastTimer);
    }, []);

    useEffect(() => {
        const hasSeenInvite = sessionStorage.getItem('hasSeenIDInvite');
        if (!hasSeenInvite) {
            const timer = setTimeout(() => {
                setIsIDModalOpen(true);
                sessionStorage.setItem('hasSeenIDInvite', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handlePillarClick = (pillar) => {
        navigate(pillar.path);
    };

    const scrollRef = useRef(null);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        let scrollAmount = 0;
        let scrollMax = slider.scrollWidth - slider.clientWidth;

        const scrollInterval = setInterval(() => {
            if (scrollAmount >= scrollMax) {
                // Reset to start
                slider.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            } else {
                slider.scrollBy({ left: slider.clientWidth / 1.2, behavior: 'smooth' });
                scrollAmount += slider.clientWidth / 1.2;
            }
        }, 5000); // Scroll every 5 seconds

        return () => clearInterval(scrollInterval);
    }, []);

    const bulletinItems = [
        {
            id: 1,
            type: 'alert',
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-100',
            title: 'Emergency Alert',
            malayalamTitle: 'അടിയന്തര അറിയിപ്പ്',
            desc: 'Heavy rain predicted. Please stay indoors and contact the SOS center for emergencies.',
        },
        {
            id: 2,
            type: 'project',
            icon: Activity,
            color: 'text-orange-500',
            bgColor: 'bg-orange-100',
            title: 'Ongoing Project',
            malayalamTitle: 'പുതിയ കുടിവെള്ള പദ്ധതി',
            desc: 'The new drinking water project in South Zone is nearing completion. Expected finish next week.',
            progress: 80
        },
        {
            id: 3,
            type: 'notice',
            icon: Calendar,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100',
            title: 'Gramasabha Notice',
            malayalamTitle: 'ഗ്രാമസഭ',
            desc: 'Date: 15th Aug 2026. Venue: Ward Community Hall, 10:00 AM. All are requested to participate.',
        }
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-[#f8fafc] overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="bg-primary px-6 md:px-10 lg:px-14 pt-12 md:pt-16 pb-6 md:pb-8 rounded-b-[2.5rem] md:rounded-b-[3.5rem] shadow-floating sticky top-0 z-20">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner">
                            <User className="text-white w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <p className="text-indigo-100 text-sm md:text-base font-medium font-malayalam tracking-wide">നമസ്കാരം! സ്മാർട്ട് വാർഡിലേക്ക് സ്വാഗതം</p>
                            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold font-sans tracking-tight">Welcome to the Smart Ward</h2>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsNotifOpen(true)}
                        className="relative w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/20 transition-all hover:bg-white/30 border border-white/10 shadow-inner"
                    >
                        <Bell className="text-white w-6 h-6 md:w-8 md:h-8" />
                        {UNREAD_COUNT > 0 && (
                            <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-3 h-3 md:w-4 md:h-4 bg-red-400 rounded-full border-2 border-primary flex items-center justify-center">
                                <span className="text-[7px] font-black text-white hidden md:block">{UNREAD_COUNT}</span>
                            </span>
                        )}
                    </button>
                </div>

                {/* Search */}
                <div className="relative group max-w-2xl mx-auto lg:mx-0 lg:w-full lg:max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 md:w-6 md:h-6 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search services, updates..."
                        className="w-full min-h-[44px] bg-white rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-4 text-base md:text-lg text-slate-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-sm font-sans placeholder:text-slate-400 transition-shadow"
                    />
                </div>
            </div>

            <div className="p-6 md:p-10 lg:p-14 pb-24 space-y-8 md:space-y-12">

                {/* Digital ID Invite Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsIDModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-6 shadow-lg shadow-blue-500/20 cursor-pointer relative overflow-hidden group border border-blue-400/30"
                >
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                            <QrCode className="text-white w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg leading-tight mb-1 font-sans">Digital Resident ID</h3>
                            <p className="text-blue-100 text-xs font-medium">Generate your official smart ward ID card in seconds.</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                            <ChevronRight className="text-white w-5 h-5" />
                        </div>
                    </div>
                </motion.div>

                <DigitalIDModal isOpen={isIDModalOpen} onClose={() => setIsIDModalOpen(false)} />
                <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

                {/* Gramasabha Special Alert Section (Ward 18 Exclusive) */}
                <GramasabhaAlert />

                {/* Pension Updates Widget */}
                <PensionWidget />

                {/* Ward Bulletin Slider Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-end mb-4 md:mb-6 px-1">
                        <div>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 font-malayalam tracking-tight mt-1">വാർഡ് അറിയിപ്പുകൾ</h3>
                            <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mt-0.5">Ward Bulletin</p>
                        </div>
                        <button onClick={() => navigate('/updates')} className="text-sm md:text-base font-bold text-primary hover:text-indigo-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">View All</button>
                    </div>

                    <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14">
                        {bulletinItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} onClick={() => navigate('/updates')} className="shrink-0 w-72 md:w-80 bg-white rounded-[2rem] p-5 shadow-floating border border-slate-100/50 flex flex-col cursor-pointer hover:shadow-xl transition-shadow group relative overflow-hidden snap-center">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-${item.bgColor.split('-')[1]}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="flex gap-4 items-start relative z-10 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner bg-slate-50 ${item.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider ${item.bgColor} ${item.color} mb-1.5 inline-block`}>{item.title}</span>
                                            <h4 className="font-bold text-slate-800 text-[15px] leading-tight font-malayalam">{item.malayalamTitle}</h4>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1 relative z-10">{item.desc}</p>

                                    {item.type === 'project' && (
                                        <div className="mt-4 relative z-10">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                                <span>Progress</span>
                                                <span className="text-orange-500">{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                            </div>
                                        </div>
                                    )}
                                    {item.type === 'alert' && (
                                        <div className="mt-4 relative z-10">
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 rounded inline-block">High Priority</p>
                                        </div>
                                    )}
                                    {item.type === 'notice' && (
                                        <div className="mt-4 relative z-10">
                                            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded inline-block">Upcoming Event</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Marketplace Link Card */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mt-8 md:mt-12"
                >
                    <div onClick={() => navigate('/marketplace')} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2rem] p-6 shadow-lg shadow-green-500/20 cursor-pointer relative overflow-hidden group border border-green-400/30 w-full hover:shadow-xl transition-all">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="flex items-center gap-5 relative z-10 w-full">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                                <ShoppingBag className="text-white w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-xl leading-tight mb-1 font-malayalam flex items-center gap-2 tracking-tight">
                                    നാട്ടുചന്ത <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-widest">New</span>
                                </h3>
                                <p className="text-green-100 text-xs font-bold font-sans uppercase tracking-widest">Local Marketplace</p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                                <ChevronRight className="text-white w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 5 Pillars Grid */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 font-sans mb-4 md:mb-6 px-1 tracking-tight">Services Map</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.button
                                    key={pillar.id}
                                    onClick={() => handlePillarClick(pillar)}
                                    whileHover={{ scale: 0.98, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-white/70 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-floating border border-white/60 flex flex-col items-start gap-4 text-left transition-all hover:shadow-xl relative overflow-hidden group ${index === 0 ? 'col-span-2 md:col-span-1 xl:col-span-2 md:flex-col xl:flex-row xl:items-center' : ''}`}
                                >
                                    <div className={`absolute -right-6 -bottom-6 w-24 h-24 md:w-32 md:h-32 ${pillar.color} opacity-[0.05] rounded-full group-hover:scale-150 transition-transform duration-500`} />

                                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-[1.25rem] md:rounded-3xl ${pillar.color} flex items-center justify-center shrink-0 shadow-md ${index === 0 && 'w-14 h-14 xl:w-16 xl:h-16'}`}>
                                        <Icon className="text-white w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 font-malayalam text-[17px] md:text-lg lg:text-xl leading-tight group-hover:text-primary transition-colors">
                                            {pillar.title} <span className="font-sans text-sm md:text-base text-slate-500">({pillar.subtitle})</span>
                                        </h4>
                                        <p className="text-[12px] md:text-xs text-slate-600 font-malayalam mt-1.5 font-semibold">{pillar.descMalayalam}</p>
                                        <p className="text-[10px] md:text-[11px] text-slate-400 mt-0.5 font-bold tracking-widest uppercase">{pillar.descEnglish}</p>
                                    </div>
                                    {index === 0 && (
                                        <div className="ml-auto mt-4 xl:mt-0 xl:ml-auto w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary/10 transition-colors">
                                            <span className="text-slate-400 group-hover:text-primary">→</span>
                                        </div>
                                    )}
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.section>
            </div>
            {/* Notification Overlays */}
            <EmergencyPopup
                isOpen={isEmergencyOpen}
                onClose={() => setIsEmergencyOpen(false)}
                alert={{
                    type: 'rain',
                    title: 'Heavy Rain Warning',
                    message: 'Heavy rainfall expected in Ward 18 (Panayi) over the next 24 hours. Stay indoors and contact emergency services if needed.',
                    severity: 'red',
                }}
            />
            <ServiceToast
                isOpen={isToastOpen}
                onClose={() => setIsToastOpen(false)}
                title="Pension Mustering"
                message="Verification camp today at Panchayat Office, 10 AM – 1 PM."
                icon={Bell}
                type="warning"
            />
        </div>
    );
}
