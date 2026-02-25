import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DigitalIDModal from '../components/DigitalIDModal';
import {
    ArrowLeft,
    Phone,
    MessageCircle,
    CheckCircle2,
    Image as ImageIcon,
    Send,
    MapPin,
    History,
    Navigation,
    Circle,
    CheckCircle,
    ThumbsUp,
    Camera,
    QrCode,
    ChevronRight
} from 'lucide-react';

export default function OurWard() {
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const [isIDModalOpen, setIsIDModalOpen] = useState(false);

    // Idea Box State
    const [ideaText, setIdeaText] = useState("");
    const [ideaImage, setIdeaImage] = useState(null);
    const [ideas, setIdeas] = useState([
        { id: 1, text: "മെയിൻ ജംഗ്ഷനിൽ കൂടുതൽ വേസ്റ്റ് ബിന്നുകൾ സ്ഥാപിക്കണം (Need more waste bins at main junction).", likes: 24, hasVoted: false },
        { id: 2, text: "മഴക്കാലത്തിന് മുമ്പ് കളിസ്ഥലം വൃത്തിയാക്കണം (Clean playground before monsoon).", likes: 15, hasVoted: false }
    ]);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setIdeaImage(e.target.files[0]);
        }
    };

    const handleUpvoteIdea = (id) => {
        requireAuth(() => {
            setIdeas(ideas.map(idea => {
                if (idea.id === id) {
                    return idea.hasVoted
                        ? { ...idea, likes: idea.likes - 1, hasVoted: false }
                        : { ...idea, likes: idea.likes + 1, hasVoted: true };
                }
                return idea;
            }).sort((a, b) => b.likes - a.likes));
        }, {
            title: "പിന്തുണയ്ക്കാൻ ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to upvote this idea."
        });
    };

    // Setup for Auth triggers
    const handleIdeaSubmit = (e) => {
        e.preventDefault();
        requireAuth(() => {
            const newIdea = { id: Date.now(), text: ideaText, likes: 0, hasVoted: false };
            setIdeas([newIdea, ...ideas]);
            alert("Idea Submitted successfully! (ആശയം സമർപ്പിച്ചിരിക്കുന്നു!)");
            setIdeaText("");
            setIdeaImage(null);
        }, {
            title: "ആശയങ്ങൾ സമർപ്പിക്കാൻ ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to submit your development ideas."
        });
    };

    const [votedPoll, setVotedPoll] = useState(null);
    const pollResults = {
        'Public Library': 45,
        'Playground': 30,
        'Waste Bins': 25
    };

    const handleVote = (pollName) => {
        requireAuth(() => {
            setVotedPoll(pollName);
            alert(`Voted for: ${pollName}`);
        }, {
            title: "വോട്ട് രേഖപ്പെടുത്താൻ ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to cast your vote."
        });
    };

    const handleCallMember = () => {
        window.location.href = "tel:+919876543210";
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent("നമസ്കാരം മെമ്പർ, എനിക്കൊരു സംശയമുണ്ടായിരുന്നു... (Hello Member, I have a query...)");
        window.location.href = `https://wa.me/919876543210?text=${message}`;
    };

    const handleNavigateMap = () => {
        alert("Opening Map Navigation...");
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#f8fafc] relative overflow-y-auto no-scrollbar lg:items-center pb-24">
            {/* Header Area */}
            <div className="bg-blue-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam tracking-tight">നമ്മുടെ വാർഡ്</h2>
                        <p className="text-blue-100 text-[11px] font-bold uppercase tracking-widest font-sans mt-0.5">Our Ward</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-16 relative z-30 space-y-6 w-full lg:max-w-3xl">

                {/* 1. Member Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100 flex flex-col items-center relative overflow-hidden"
                >
                    <div className="absolute top-0 w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-[2rem]"></div>
                    <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden mb-4 relative z-10 mt-6">
                        {/* Placeholder for Member Photo */}
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-3xl">
                            B
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 font-malayalam tracking-tight text-center relative z-10">ബീന കെ</h3>
                    <p className="text-sm font-bold text-slate-500 font-malayalam mt-1 relative z-10">വാർഡ് മെമ്പർ | <span className="font-sans font-medium text-xs uppercase tracking-wider">Ward Member</span></p>

                    <div className="flex gap-3 mt-6 w-full relative z-10">
                        <button onClick={handleCallMember} className="flex-1 flex flex-col items-center justify-center py-3 bg-slate-50 text-slate-700 rounded-2xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors border border-slate-100 shadow-sm group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-malayalam font-bold text-sm">വിളിക്കാൻ</span>
                            <span className="text-[9px] font-bold font-sans uppercase tracking-wider mt-0.5 text-slate-400">Direct Dial</span>
                        </button>
                        <button onClick={handleWhatsApp} className="flex-1 flex flex-col items-center justify-center py-3 bg-slate-50 text-slate-700 rounded-2xl hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors border border-slate-100 shadow-sm group">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-malayalam font-bold text-sm">വാട്സ്ആപ്പ്</span>
                            <span className="text-[9px] font-bold font-sans uppercase tracking-wider mt-0.5 text-slate-400">Chat Now</span>
                        </button>
                    </div>
                </motion.div>

                {/* 1.5 Generate ID Card Banner */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-6 shadow-floating flex justify-between items-center cursor-pointer group hover:shadow-xl transition-all border border-blue-500/30" onClick={() => setIsIDModalOpen(true)}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <QrCode className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg font-malayalam leading-tight">ഡിജിറ്റൽ വാർഡ് ഐഡി</h3>
                            <p className="text-blue-100 text-[11px] font-sans font-medium uppercase tracking-widest mt-0.5">Generate Digital ID</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                        <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                </motion.div>

                <DigitalIDModal isOpen={isIDModalOpen} onClose={() => setIsIDModalOpen(false)} />

                {/* 2. Interactive Development Hub */}

                {/* Dynamic Project Tracker */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg font-malayalam mb-1">വികസന പദ്ധതികൾ</h3>
                    <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-6">Live Project Tracker</p>

                    <div className="space-y-5">
                        {/* Project 1 */}
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm font-malayalam">റോഡ് നവീകരണം - സൗത്ത് സ്ട്രീറ്റ്</h4>
                                    <p className="text-[10px] text-slate-500 font-sans uppercase tracking-wider font-bold mt-0.5">Road Construction</p>
                                </div>
                                <span className="text-xl font-bold text-blue-600 font-sans">70%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative" style={{ width: '70%' }}></div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase text-right">Target: March 2026</p>
                        </div>

                        {/* Project 2 */}
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm font-malayalam">സോളാർ ലൈറ്റ് സ്ഥാപിക്കൽ</h4>
                                    <p className="text-[10px] text-slate-500 font-sans uppercase tracking-wider font-bold mt-0.5">Solar Light Installation</p>
                                </div>
                                <span className="text-xl font-bold text-orange-500 font-sans">45%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full relative" style={{ width: '45%' }}></div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase text-right">Target: April 2026</p>
                        </div>
                    </div>
                </motion.div>

                {/* Interactive Idea Box */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg font-malayalam mb-1">ആശയങ്ങൾ പങ്കുവെക്കുക</h3>
                    <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-4">Submit Development Idea</p>

                    <form onSubmit={handleIdeaSubmit} className="space-y-3 mb-6">
                        <textarea
                            value={ideaText}
                            onChange={(e) => setIdeaText(e.target.value)}
                            placeholder="വാർഡിന്റെ വികസനത്തിനായുള്ള നിങ്ങളുടെ ആശയങ്ങൾ എഴുതുക... (Write your ideas...)"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-700 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-none"
                            required
                        ></textarea>
                        {ideaImage && (
                            <div className="text-xs text-blue-600 font-medium bg-blue-50 p-2 rounded-lg flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                {ideaImage.name}
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                            <button type="submit" className="flex-1 bg-slate-800 text-white font-bold font-malayalam rounded-xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors text-sm">
                                <Send className="w-4 h-4 ml-1" /> സമർപ്പിക്കുക (Submit)
                            </button>
                        </div>
                    </form>

                    {/* Community Ideas List */}
                    <div className="space-y-3 border-t border-slate-100 pt-5">
                        <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-3">Community Suggestions</p>
                        {ideas.map((idea) => (
                            <div key={idea.id} className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl flex items-start gap-4">
                                <button
                                    onClick={() => handleUpvoteIdea(idea.id)}
                                    className={`flex flex-col items-center justify-center min-w-[3rem] p-2 rounded-xl transition-colors ${idea.hasVoted ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                                >
                                    <ThumbsUp className={`w-4 h-4 mb-1 ${idea.hasVoted ? 'fill-blue-600' : ''}`} />
                                    <span className="text-xs font-bold">{idea.likes}</span>
                                </button>
                                <p className="text-sm text-slate-700 font-malayalam leading-relaxed flex-1 mt-1">{idea.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Voting Polls */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] p-6 shadow-floating border border-indigo-100">
                    <h3 className="font-bold text-indigo-900 text-lg font-malayalam mb-1">വോട്ടിംഗ് പോളുകൾ</h3>
                    <p className="text-xs font-bold font-sans text-indigo-400 uppercase tracking-widest mb-4">Active Priorities</p>

                    <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-700 font-malayalam mb-1">അടുത്തതായി നടപ്പിലാക്കേണ്ട പ്രധാന പദ്ധതി ഏതാണ്?</p>
                        <p className="text-xs text-slate-500 mb-4">What should be the priority for the next fund allocation?</p>

                        <div className="space-y-2">
                            {[
                                { id: 'Public Library', title: 'പൊതു ഗ്രന്ഥശാല നവീകരണം (Public Library)' },
                                { id: 'Playground', title: 'പുതിയ കളിസ്ഥലം (Playground)' },
                                { id: 'Waste Bins', title: 'മാലിന്യ സംസ്കരണ ഡബ്ബകൾ (Waste Bins)' },
                            ].map((poll) => (
                                <div key={poll.id} className="relative w-full">
                                    {votedPoll && (
                                        <div
                                            className="absolute top-0 left-0 h-full bg-indigo-100/50 rounded-xl transition-all duration-1000"
                                            style={{ width: `${pollResults[poll.id]}%` }}
                                        />
                                    )}
                                    <button
                                        onClick={() => handleVote(poll.id)}
                                        disabled={!!votedPoll}
                                        className={`w-full text-left px-4 py-3 rounded-xl border ${votedPoll === poll.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-transparent'} hover:bg-indigo-50 hover:border-indigo-200 transition-all font-malayalam font-bold text-sm text-slate-700 flex justify-between items-center relative z-10 group disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-slate-700`}
                                    >
                                        <span>{poll.title}</span>
                                        {!votedPoll ? (
                                            <span className="opacity-0 group-hover:opacity-100 text-[10px] font-sans text-indigo-600 uppercase tracking-widest transition-opacity">Vote</span>
                                        ) : (
                                            <span className="text-xs font-sans font-bold text-indigo-600">{pollResults[poll.id]}%</span>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 3. Ward Information */}

                {/* Gallery of Achievements */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100 overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg font-malayalam mb-1">നേട്ടങ്ങളുടെ ഗാലറി</h3>
                            <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest">Achievements Gallery</p>
                        </div>
                        <Camera className="w-6 h-6 text-blue-200" />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-6 px-6">
                        {/* Image 1 */}
                        <div className="shrink-0 w-64 h-40 bg-slate-100 rounded-2xl overflow-hidden snap-center relative shadow-sm border border-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1541888035172-e14fc7cfce6d?w=400&h=300&fit=crop" alt="Road Renovation" loading="lazy" className="w-full h-full object-cover" />
                            <div className="absolute font-malayalam bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                <p className="text-white text-sm font-bold">പുതിയ റോഡ് (North)</p>
                            </div>
                        </div>
                        {/* Image 2 */}
                        <div className="shrink-0 w-64 h-40 bg-slate-100 rounded-2xl overflow-hidden snap-center relative shadow-sm border border-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1582214690899-76077c5aa2ba?w=400&h=300&fit=crop" alt="Water Supply" loading="lazy" className="w-full h-full object-cover" />
                            <div className="absolute font-malayalam bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                <p className="text-white text-sm font-bold">കുടിവെള്ള പദ്ധതി</p>
                            </div>
                        </div>
                        {/* Image 3 */}
                        <div className="shrink-0 w-64 h-40 bg-slate-100 rounded-2xl overflow-hidden snap-center relative shadow-sm border border-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1518241353330-0f797840d289?w=400&h=300&fit=crop" alt="Library" loading="lazy" className="w-full h-full object-cover" />
                            <div className="absolute font-malayalam bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                <p className="text-white text-sm font-bold">ഗ്രന്ഥശാല നവീകരണം</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Ward Map */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100 overflow-hidden">
                    <h3 className="font-bold text-slate-800 text-lg font-malayalam mb-1">വാർഡ് മാപ്പ്</h3>
                    <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-4">Location Context</p>

                    <div className="w-full h-56 bg-slate-100 rounded-2xl relative overflow-hidden group border border-slate-200">
                        <iframe
                            src="https://maps.google.com/maps?q=Panayi+Panchayat+Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                            title="Ward Map"
                        ></iframe>

                        <button onClick={handleNavigateMap} className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors z-10">
                            <MapPin className="w-4 h-4 text-blue-500" /> Navigate
                        </button>
                    </div>
                </motion.div>

                {/* Project History */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg font-malayalam mb-1">പൂർത്തിയാക്കിയ പദ്ധതികൾ</h3>
                    <p className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest mb-6">Completed Projects History</p>

                    <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">

                        {/* History Item 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 text-slate-500 group-[.is-active]:bg-green-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-32px] md:left-auto z-10">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative -ml-4 md:ml-0 z-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-slate-700 text-sm font-malayalam">പുതിയ കുടിവെള്ള പൈപ്പ്ലൈൻ</h4>
                                    <time className="font-sans text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md">2023</time>
                                </div>
                                <p className="text-xs text-slate-500 font-sans">Water Supply Pipeline</p>
                            </div>
                        </div>

                        {/* History Item 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 text-slate-500 group-[.is-active]:bg-green-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-32px] md:left-auto z-10">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative -ml-4 md:ml-0 z-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-slate-700 text-sm font-malayalam">റോഡ് നവീകരണം (വടക്ക്)</h4>
                                    <time className="font-sans text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md">2022</time>
                                </div>
                                <p className="text-xs text-slate-500 font-sans">North Road Renovation</p>
                            </div>
                        </div>

                        {/* History Item 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 text-slate-500 group-[.is-active]:bg-green-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative left-[-32px] md:left-auto z-10">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative -ml-4 md:ml-0 z-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-slate-700 text-sm font-malayalam">തെരുവ് വിളക്കുകൾ</h4>
                                    <time className="font-sans text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md">2022</time>
                                </div>
                                <p className="text-xs text-slate-500 font-sans">Street Lights Installation</p>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </div>
    );
}
