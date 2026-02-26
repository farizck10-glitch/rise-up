import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Mic, ChevronRight, MapPin, FileText, Phone, HelpCircle } from 'lucide-react';

/* ─────────────────────────────────────────
   KNOWLEDGE BASE — keyword → response
───────────────────────────────────────── */
const KB = [
    // Documents
    {
        keys: ['caste certificate', 'cast certificate', 'ജാതി സർട്ടിഫിക്കറ്റ്', 'caste'],
        response: `📄 **ജാതി സർട്ടിഫിക്കറ്റ് (Caste Certificate)**\n\nതഹസിൽദാർ / Village Office-ൽ നിന്ന് ലഭിക്കും.\n\n**ആവശ്യമായ രേഖകൾ:**\n• Ration card / Aadhar card copy\n• School leaving certificate\n• Father's caste proof (previous certificate)\n• Self-declaration form\n• Panchayat residence proof\n\n*Apply online:* **edistrict.kerala.gov.in**\n*Processing time:* 7–14 working days`,
    },
    {
        keys: ['income certificate', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'income proof'],
        response: `📄 **വരുമാന സർട്ടിഫിക്കറ്റ് (Income Certificate)**\n\n**ആവശ്യമായ രേഖകൾ:**\n• Aadhar card\n• Ration card\n• Salary slip (if employed)\n• Self declaration of income\n• Panchayat residence proof\n\n*Apply:* edistrict.kerala.gov.in → Revenue → Income Certificate\n*Fee:* ₹15\n*Time:* 7 days`,
    },
    {
        keys: ['birth certificate', 'ജനന സർട്ടിഫിക്കറ്റ്', 'birth proof'],
        response: `📄 **ജനന സർട്ടിഫിക്കറ്റ് (Birth Certificate)**\n\nAnakkayam Panchayat Office-ൽ നേരിട്ട് അപേക്ഷ ആകാം.\n\n**ആവശ്യമായ രേഖകൾ:**\n• Hospital discharge summary\n• Parents' Aadhar cards\n• Ration card\n• Marriage certificate (parents)\n\n*Online:* crs.lsgkerala.gov.in\n*Time:* 3–5 working days\n*Fee:* ₹10 (within 1 yr free)`,
    },
    {
        keys: ['death certificate', 'മരണ സർട്ടിഫിക്കറ്റ്', 'death proof'],
        response: `📄 **മരണ സർട്ടിഫിക്കറ്റ് (Death Certificate)**\n\n**ആവശ്യമായ രേഖകൾ:**\n• Hospital death summary / Doctor certificate\n• Deceased's Aadhar card\n• ration card\n• Applicant ID proof\n\n*Office:* Anakkayam Panchayat → Civil Registration\n*Online:* crs.lsgkerala.gov.in\n*Time:* 3–5 days`,
    },
    {
        keys: ['ration card', 'റേഷൻ കാർഡ്', 'ration', 'new ration'],
        response: `🗂️ **റേഷൻ കാർഡ് (Ration Card)**\n\n**പുതിയ കാർഡ് / New Card:**\n• Aadhar card (all members)\n• Proof of address (electricity bill / panchayat certificate)\n• Passport photo of head of family\n• Previous ration card surrender letter (if any)\n\n*Apply:* Civil Supplies Kerala → ecitizen portal\n*Office:* Taluk Supply Office, Tirur\n\n**BPL / APL / AAY** — type is based on annual income verification.`,
    },
    {
        keys: ['pension', 'പെൻഷൻ', 'old age pension', 'welfare pension', 'വൃദ്ധ പെൻഷൻ'],
        response: `👴 **കേരള ക്ഷേമ പെൻഷൻ (Welfare Pension)**\n\n**Types:** Old Age · Widow · Disability · Unmarried Women (40+)\n\n**Documents needed:**\n• Aadhar card\n• Ration card\n• Bank passbook (first page)\n• Age proof (birth cert / school cert)\n• Income certificate (below ₹1 lakh/yr)\n• Applicant photos (2)\n\n*Apply:* Ward Member → Panchayat Office\n*Amount:* ₹1,600/month\n*Our Ward Member:* visible on Rise Up → Our Ward page`,
    },
    {
        keys: ['ayushman', 'ആയുഷ്മാൻ', 'pmjay', 'karunya', 'health card', 'medical card'],
        response: `🏥 **Ayushman Bharat / PMJAY – Kerala**\n\n**Eligibility:** BPL families, SECC-listed\n\n**Documents:**\n• Ration card (BPL)\n• Aadhar card (all members)\n• Family photo\n• Bank account details\n\n*Register:* Nearest Akshaya Centre or CSC\n*Coverage:* ₹5 lakh/year per family\n*Tie-up hospitals:* Taluk Hospital Tirur, MCC, EMS Hospital`,
    },
    {
        keys: ['building permit', 'building plan', 'construction permit', 'നിർമ്മാണ അനുമതി'],
        response: `🏗️ **Building Permit — Anakkayam Panchayat**\n\n**Documents needed:**\n• Site plan + floor plan (by licensed engineer)\n• Land ownership proof (title deed)\n• Panchayat tax receipt\n• Aadhar card\n• Ownership affidavit\n• NOC from neighbour (if adjacent)\n\n*Apply:* Anakkayam Panchayat → Building Section\n*Online:* sanketham.lsgkerala.gov.in\n*Fee:* Based on sq. ft & type`,
    },
    // Government Circulars (simplified)
    {
        keys: ['circular', 'go', 'government order', 'government circular', 'ഗവൺമെന്റ് ഉത്തരവ്'],
        response: `📋 **Government Circular — Simple Explanation**\n\nSarkar-nte circular-ukaḷ sambandhichu chodichu nōkku. Koṭutho paṟayam!\n\n**Recent important circulars simplified:**\n\n🔹 **Smart Ration Card** → All ration cards being converted to ePos digital system. Bring Aadhar to fair price shop.\n\n🔹 **Road Accident Fund** → Any Kerala accident victim can claim ₹5 lakh from RSAC fund without insurance.\n\n🔹 **Kudumbashree Loan** → Women SHGs can get ₹1 lakh loan at 4% interest. Apply via Kudumbashree unit.\n\n*Specific circular? Paste the title and I'll explain it.*`,
    },
    // Ward services
    {
        keys: ['complaint', 'file complaint', 'road problem', 'street light', 'water', 'potholes', 'pipeline', 'drain', 'പരാതി'],
        response: `🚧 **Ward Complaint Register করুക**\n\nRise Up-ൽ complaint submit ചെയ്യാൻ:\n**Smart Ward → Complaint Box**\n\n**Contact directly:**\n• Ward Member: Go to *Our Ward* page → Contact button\n• Panchayat Office: 0483-271XXXX (Mon–Fri 10AM–5PM)\n• Water Authority Tirur: 0494-244XXXX\n\n*Common complaint types handled:*\n• Road potholes ✅\n• Street light issues ✅\n• Drain blockage ✅\n• Water supply issues ✅`,
    },
    {
        keys: ['mgnregs', 'job card', 'employment', 'nrega', 'തൊഴിലുറപ്പ്'],
        response: `💼 **MGNREGS / തൊഴിലുറപ്പ്**\n\n100 days guaranteed rural employment.\n\n**To register for Job Card:**\n• Aadhar card\n• Ration card\n• Bank account details\n• Passport photo\n• Apply at: Panchayat → MGNREGS section\n\n**Current Ward 18 Works:**\nCheck Rise Up → **Workplace → MGNREGS tab** for live updates on ongoing projects and labour count.`,
    },
    {
        keys: ['krishi', 'farm', 'agriculture', 'krishibhavan', 'seed', 'farming', 'കൃഷി', 'കൃഷി ഭവൻ'],
        response: `🌾 **Krishi Bhavan — Anakkayam**\n\n**Free services available:**\n• Soil testing\n• Free seed distribution schemes\n• Organic farming training\n• Crop insurance (PMFBY)\n• Banana & vegetable sucker kits\n\n*Contact: Krishibhavan Anakkayam*\n*Timings: Mon–Sat 10AM–5PM*\n\nSee **Green & Culture → Agriculture** tab in Rise Up for latest updates and deadlines!`,
    },
    {
        keys: ['waste', 'garbage', 'malainyam', 'haritha', 'hks', 'recycling', 'collection', 'മാലിന്യ'],
        response: `♻️ **Waste Collection — Ward 18**\n\n**Haritha Karma Sena (HKS) Schedule:**\n• 🟢 Biodegradable: Daily Mon–Sat (before 7 AM)\n• 🔴 Plastic/Non-bio: Weekly (Wednesdays)\n• 💻 E-Waste: Monthly (contact HKS)\n• 🌿 Garden Waste: Monthly pick-up\n\n**Contact HKS:**\nSee *Green & Culture → Waste Management* tab for dates and HKS contact numbers.\n\n*Always separate waste before putting out!*`,
    },
    {
        keys: ['ambulance', 'emergency', 'hospital', 'accident', 'ആശുപത്രി', 'അത്യാഹിതം'],
        response: `🚨 **Emergency Contacts — Panayi Ward 18**\n\n• **Ambulance:** 108 (Free, 24/7)\n• **Police:** 100 / Tirur Station: 0494-244XXX\n• **Fire:** 101\n• **Nearest Hospital:** Taluk Hospital Tirur (5 km)\n• **ASHA Worker:** Visit *Kaithang* page → Volunteer Network\n• **Doctor on Call:** Visit *Kaithang* → Doctor Directory\n\n*Save these numbers now! Open the **Kaithang** page for local doctor and volunteer contacts.*`,
    },
    {
        keys: ['marketplace', 'buy', 'sell', 'product', 'shop', 'market', 'ചന്ത', 'market'],
        response: `🛒 **Rise Up Marketplace (നാട്ടുചന്ത)**\n\n**To BUY:**\n• Go to Marketplace → Browse by category\n• Tap product → WhatsApp the seller directly\n• Must be logged in to place orders\n\n**To SELL:**\n• Login first\n• Marketplace → Sell tab → Fill form\n• Add product name, price, photo, WhatsApp number\n• Set availability (In Stock / Out of Stock)\n• Admin verifies within 24 hours\n\n*Categories: Organic Veg · Homemade Food · Groceries · Dairy · Snacks · Farm Products*`,
    },
    {
        keys: ['workplace', 'job', 'work', 'electrician', 'plumber', 'driver', 'skill', 'worker', 'hire', 'തൊഴിൽ'],
        response: `💼 **Workplace / തൊഴിലിടം**\n\n**Find a skilled worker:**\n• Go to Workplace → Choose category\n• View profile → Call Now or WhatsApp directly\n\n**Categories:** Electrical · Plumbing · Driving · Auto Service · Construction · Teaching · Tailoring · IT · Catering · Painting · Transport\n\n**Register as a worker:**\n• Workplace → Register button\n• Fill name, phone, skill, experience\n• Verified by Ward 18 team in 24 hrs\n• FREE listing for all local residents`,
    },
    {
        keys: ['auto', 'taxi', 'rickshaw', 'ഓട്ടോ', 'cab'],
        response: `🛺 **Auto / Taxi — Panayi Ward 18**\n\n**Book a local auto:**\n• Rise Up → **Workplace → Auto Service tab**\n• View drivers with auto numbers, ratings, and availability\n• Night trip drivers marked 🌙\n• Long distance available 🛣️\n• Call or WhatsApp directly from profile\n\n*5 verified auto drivers listed for Panayi & Anakkayam area.*`,
    },
    {
        keys: ['library', 'book', 'reading', 'ഗ്രന്ഥശാല', 'library'],
        response: `📚 **Panayi Public Library**\n\n• Open: Mon–Sat 9AM–6PM\n• Free membership for Ward 18 residents\n• 2000+ books · Children's section · Newspaper reading room\n• Free Wi-Fi available\n\n*Events & announcements:* Rise Up → **Green & Culture → Cultural Desk**`,
    },
    {
        keys: ['kudumbashree', 'kudumba', 'shree', 'self help group', 'women group'],
        response: `👩 **Kudumbashree — Ward 18**\n\n**Services:**\n• Micro-finance loans (₹10,000–₹1 lakh)\n• Skill training programs\n• Group farming/catering ventures\n• Nutrition programs\n\n**To join:**\n• Contact the local Kudumbashree NHG (Neighbourhood Group) in your area\n• Anakkayam Panchayat has 40+ NHGs\n\n*Contact: Kudumbashree CDS, Anakkayam Panchayat Office*`,
    },
    {
        keys: ['gramasabha', 'gram sabha', 'ഗ്രാമസഭ', 'ward meeting', 'panchayat meeting'],
        response: `🏛️ **Gramasabha — Ward 18**\n\n**What is it?**\nAnnual community meeting where residents can voice concerns, approve ward plans, and receive welfare benefits.\n\n**Your rights in Gramasabha:**\n• Question ward development projects\n• Recommend beneficiaries for schemes\n• Vote on local development plans\n\n**Next meeting:** Check Rise Up Dashboard for the Gramasabha countdown alert!\n*All residents of Ward 18 can attend.*`,
    },
    // Certificates & Documents
    {
        keys: ['caste', 'ജാതി സർട്ടിഫിക്കറ്റ്', 'certificate'],
        response: `📄 **ജാതി സർട്ടിഫിക്കറ്റ് (Caste Certificate)**\n\n**ആവശ്യമായ രേഖകൾ:**\n1. ആധാർ കാർഡ് (Aadhaar)\n2. റേഷൻ കാർഡ് (Ration Card)\n3. സ്കൂൾ സർട്ടിഫിക്കറ്റ് (SSLC/School record)\n4. പിതാവിന്റെയോ മാതാവിന്റെയോ ജാതി തെളിയിക്കുന്ന രേഖ.\n\n**അപേക്ഷിക്കേണ്ടവിധം:** അക്ഷയ കേന്ദ്രം വഴിയോ അല്ലെങ്കിൽ **e-District** പോർട്ടൽ വഴിയോ അപേക്ഷിക്കാം. **Smart Ward → Village Services** എന്നതിൽ ഇതിനുള്ള ലിങ്ക് ലഭ്യമാണ്.`,
    },
    {
        keys: ['income', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'salary'],
        response: `📄 **വരുമാന സർട്ടിഫിക്കറ്റ് (Income Certificate)**\n\n**ആവശ്യമായ രേഖകൾ:**\n1. ആധാർ കാർഡ്\n2. റേഷൻ കാർഡ്\n3. ഭൂനികുതി രസീത് (Land Tax receipt)\n4. ശമ്പള സർട്ടിഫിക്കറ്റ് (ഉദ്യോഗസ്ഥർക്ക്).\n\n**ഉപയോഗം:** സ്കോളർഷിപ്പുകൾക്കും സർക്കാർ ആനുകൂല്യങ്ങൾക്കും ഇത് ആവശ്യമാണ്. അക്ഷയ വഴിയോ **Smart Ward → Village Services** ലിങ്ക് വഴിയോ അപേക്ഷിക്കുക.`,
    },
    // Ward Services & News
    {
        keys: ['news', 'വാർത്ത', 'updates', 'latest', 'വിശേഷം'],
        response: `📰 **പാണായി വാർഡ് വാർത്തകൾ (Latest News)**\n\n🔹 **റോഡ് നവീകരണം:** മെയിൻ റോഡ് ടാറിംഗ് അടുത്ത തിങ്കളാഴ്ച ആരംഭിക്കും. ഗതാഗത നിയന്ത്രണം ശ്രദ്ധിക്കുക.\n\n🔹 **ലൈഫ് മിഷൻ:** പുതിയ അപേക്ഷകരുടെ ലിസ്റ്റ് പഞ്ചായത്ത് ഓഫീസിൽ പ്രസിദ്ധീകരിച്ചു.\n\n🔹 **വാർഡ് ശുചിത്വം:** ഈ വരുന്ന ഞായറാഴ്ച രാവിലെ 8 മണിക്ക് വാർഡ് ക്ലീനിംഗ് ഡ്രൈവ് ഉണ്ടായിരിക്കും.\n\n*കൂടുതൽ വിവരങ്ങൾക്ക് **Our Ward → News** പേജ് സന്ദർശിക്കൂ.*`,
    },
    {
        keys: ['member', 'വാർഡ് മെമ്പർ', 'councilor', 'മെമ്പർ'],
        response: `👤 **നമ്മുടെ വാർഡ് മെമ്പർ**\n\n**പേര്:** [Member Name Placeholder]\n**ഫോൺ:** +91 9447XXXXXX\n\nമെമ്പറെ നേരിട്ട് വിളിക്കാനോ വാട്സാപ്പ് ചെയ്യാനോ **Our Ward** പേജിലെ ബട്ടണുകൾ ഉപയോഗിക്കാം. പരാതികൾ സമർപ്പിക്കാൻ **Smart Ward → Complaint Box** ഉപയോഗിക്കുക.`,
    },
    {
        keys: ['thanks', 'thank you', 'നന്ദി', 'nandi', 'ok', 'great', 'super'],
        response: `😊 സന്തോഷം! (You're welcome!)\n\nമറ്റ് സഹായങ്ങൾ വേണമെങ്കിൽ ചോദിക്കൂ. Rise Up Ward 18-ൽ ഞാൻ എപ്പോഴും ഇവിടെ ഉണ്ട്! 🙏`,
    },
];

/* Quick action chips */
const QUICK_ACTIONS = [
    { label: '📄 Caste Certificate', query: 'caste certificate' },
    { label: '💰 Income Certificate', query: 'income certificate' },
    { label: '🏛️ Gramasabha', query: 'gramasabha' },
    { label: '♻️ Waste Schedule', query: 'waste collection' },
    { label: '👴 Pension', query: 'pension' },
    { label: '🛒 Marketplace Help', query: 'marketplace' },
    { label: '💼 Find Worker', query: 'workplace' },
    { label: '🚨 Emergency', query: 'emergency' },
    { label: '🌾 Krishi Bhavan', query: 'krishi' },
];

function getAIResponse(text) {
    const lower = text.toLowerCase();
    for (const entry of KB) {
        if (entry.keys.some(k => lower.includes(k.toLowerCase()))) {
            return entry.response;
        }
    }
    return `🤔 ക്ഷമിക്കണം, ആ വിഷയത്തെക്കുറിച്ച് എനിക്ക് കൂടുതൽ വിവരം ആവശ്യമാണ്.\n\n**Try asking about:**\n• Government certificates (caste, income, birth)\n• Pension & welfare schemes\n• Waste collection schedule\n• Ward services & complaints\n• Marketplace or Workplace help\n• Emergency contacts\n\nOr contact: **Ward Office** or **Panchayat: 0483-271XXXX**`;
}

/* Render markdown-light: **bold**, bullet points */
function RenderText({ text }) {
    const lines = text.split('\n');
    return (
        <div className="space-y-1">
            {lines.map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-black text-slate-800 text-[13px]">{line.replace(/\*\*/g, '')}</p>;
                }
                // inline bold
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                    <p key={i} className="text-[13px] leading-relaxed text-slate-700">
                        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-bold text-slate-800">{part}</strong> : part)}
                    </p>
                );
            })}
        </div>
    );
}

let nextId = 2;

export default function AIAssistant({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: 'greeting', sender: 'ai', isGreeting: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 400);
    }, [isOpen]);

    const handleSend = (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setMessages(prev => [...prev, { id: nextId++, text: trimmed, sender: 'user' }]);
        setInputText('');
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: nextId++, text: getAIResponse(trimmed), sender: 'ai' }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 600);
    };

    const handleVoice = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            handleSend('ജാതി സർട്ടിഫിക്കറ്റ്');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100]" />

                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                        className="fixed bottom-0 left-0 right-0 z-[110] max-w-lg mx-auto h-[85vh] bg-white flex flex-col overflow-hidden rounded-t-[2.5rem] shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 pt-6 pb-4 rounded-t-[2.5rem] shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <Sparkles className="text-white w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-[15px] leading-tight">റൈസ് അപ്പ് AI</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                            <p className="text-purple-100 text-[10px] font-bold uppercase tracking-widest">Panayi Ward 18 Guide</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Capabilities strip */}
                            <div className="flex gap-2 mt-4 flex-wrap">
                                {[['📄', 'Documents'], ['🏛️', 'Schemes'], ['🗺️', 'Navigation'], ['🚨', 'Emergency']].map(([emoji, label]) => (
                                    <span key={label} className="bg-white/15 border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                        {emoji} {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                            {/* Greeting */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start">
                                <div className="max-w-[88%] bg-white border border-purple-100 rounded-2xl rounded-bl-sm p-4 shadow-sm">
                                    <p className="font-malayalam text-[13px] font-bold text-slate-800 mb-2">നമസ്കാരം! 👋 ഞാൻ Rise Up AI — Ward 18 ഡിജിറ്റൽ സഹായി.</p>
                                    <div className="space-y-1">
                                        {['📄 Certificate guidance (Caste, Income, Birth)', '🏛️ Government scheme documents', '🌾 Krishi Bhavan & welfare info', '🛒 Marketplace & Workplace help', '🚨 Emergency contacts — Ward 18'].map(item => (
                                            <p key={item} className="text-[11px] text-slate-500">{item}</p>
                                        ))}
                                    </div>
                                    <p className="font-malayalam text-[12px] text-purple-600 font-bold mt-2">ചോദ്യം ചോദിക്കൂ! (Malayalam or English)</p>
                                </div>
                            </motion.div>

                            {messages.filter(m => !m.isGreeting).map(msg => (
                                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[88%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-br-sm'
                                        : 'bg-white border border-purple-100 rounded-bl-sm'}`}>
                                        {msg.sender === 'user'
                                            ? <p className="text-[13px] font-semibold leading-relaxed">{msg.text}</p>
                                            : <RenderText text={msg.text} />
                                        }
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1.5 items-center">
                                        {['-0.3s', '-0.15s', '0s'].map((d, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: d }} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick action chips */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0 bg-white border-t border-slate-100">
                            {QUICK_ACTIONS.map(qa => (
                                <button key={qa.label} onClick={() => handleSend(qa.query)}
                                    className="shrink-0 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[11px] font-bold rounded-full transition-colors whitespace-nowrap">
                                    {qa.label}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                                <input ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={e => setInputText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend(inputText)}
                                    placeholder="ചോദിക്കൂ… (Ask in Malayalam or English)"
                                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[13px] font-medium text-slate-700 placeholder:text-slate-300 min-w-0"
                                />
                                <AnimatePresence mode="wait">
                                    {inputText.trim() ? (
                                        <motion.button key="send"
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            onClick={() => handleSend(inputText)}
                                            className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all shrink-0">
                                            <Send className="w-4 h-4 ml-0.5" />
                                        </motion.button>
                                    ) : (
                                        <motion.button key="mic"
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            onClick={handleVoice}
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}>
                                            <Mic className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
