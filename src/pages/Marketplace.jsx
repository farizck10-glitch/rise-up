import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, ShoppingBag, Search, Filter, X, Plus, Camera,
    MessageCircle, PhoneCall, Star, Tag, CheckCircle2, AlertCircle,
    ShieldCheck, Leaf, UtensilsCrossed, ShoppingCart, Milk, Package,
    Cookie, ChevronRight, User, LogIn, ToggleLeft, ToggleRight, Store
} from 'lucide-react';

/* ── CATEGORIES ── */
const CATEGORIES = [
    { id: 'all', label: 'All', malayalam: 'എല്ലാം', emoji: '🛒', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200', active: 'bg-slate-800 text-white border-slate-800' },
    { id: 'vegetables', label: 'Organic Veg', malayalam: 'ജൈവ പച്ചക്കറി', emoji: '🥬', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', active: 'bg-emerald-600 text-white border-emerald-600' },
    { id: 'homemade', label: 'Homemade Foods', malayalam: 'വീട്ടുഭക്ഷണം', emoji: '🍛', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', active: 'bg-orange-500 text-white border-orange-500' },
    { id: 'groceries', label: 'Groceries', malayalam: 'പലചരക്ക്', emoji: '🛍️', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', active: 'bg-blue-600 text-white border-blue-600' },
    { id: 'dairy', label: 'Dairy & Eggs', malayalam: 'പാലുൽപ്പന്നം', emoji: '🥛', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200', active: 'bg-sky-600 text-white border-sky-600' },
    { id: 'snacks', label: 'Snacks & Sweets', malayalam: 'പലഹാരം', emoji: '🍪', color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-200', active: 'bg-pink-500 text-white border-pink-500' },
    { id: 'farm', label: 'Farm Products', malayalam: 'കൃഷി ഉൽപ്പന്നം', emoji: '🌾', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', active: 'bg-amber-600 text-white border-amber-600' },
];

/* ── PRODUCTS ── */
const INITIAL_PRODUCTS = [
    { id: 1, name: 'ജൈവ തക്കാളി', eng: 'Organic Tomatoes', price: 50, unit: 'kg', category: 'vegetables', seller: 'Raju K', sellerPhone: '+919847001122', rating: 4.7, inStock: true, emoji: '🍅', desc: 'Freshly harvested from Panayi farm. No pesticides.' },
    { id: 2, name: 'ചേന', eng: 'Yam (Chena)', price: 70, unit: 'kg', category: 'vegetables', seller: 'Geetha B', sellerPhone: '+919744223300', rating: 4.5, inStock: true, emoji: '🪨', desc: 'Organic yam from home garden. Limited stock.' },
    { id: 3, name: 'ചക്ക വറുത്തത്', eng: 'Jackfruit Chips', price: 120, unit: 'pkt', category: 'snacks', seller: 'Amina', sellerPhone: '+919656443311', rating: 4.9, inStock: true, emoji: '🍟', desc: 'Home-made with coconut oil. 200g pack.' },
    { id: 4, name: 'നാടൻ അച്ചാർ', eng: 'Homemade Pickle', price: 80, unit: 'bottle', category: 'homemade', seller: 'Sujatha R', sellerPhone: '+919447556677', rating: 4.8, inStock: true, emoji: '🫙', desc: 'Traditional Kerala mango pickle. 250ml.' },
    { id: 5, name: 'നാടൻ പശുവിൻ പാൽ', eng: 'Fresh Cow Milk', price: 55, unit: 'litre', category: 'dairy', seller: 'Gopi T', sellerPhone: '+919845331122', rating: 4.6, inStock: true, emoji: '🥛', desc: 'Pure A2 milk delivered fresh by 6 AM.' },
    { id: 6, name: 'നാടൻ മുട്ട', eng: 'Country Eggs', price: 10, unit: 'piece', category: 'dairy', seller: 'Mini K', sellerPhone: '+919847665511', rating: 4.7, inStock: false, emoji: '🥚', desc: 'Free-range nattu kozhi mutta. Sold in dozens.' },
    { id: 7, name: 'അരി (ജൈവം)', eng: 'Organic Rice', price: 90, unit: 'kg', category: 'groceries', seller: 'Suresh P', sellerPhone: '+919447122233', rating: 4.5, inStock: true, emoji: '🍚', desc: 'Matta rice, organically grown in Panayi.' },
    { id: 8, name: 'നാളികേരം', eng: 'Fresh Coconut', price: 25, unit: 'piece', category: 'farm', seller: 'Rajan T', sellerPhone: '+919447223399', rating: 4.6, inStock: true, emoji: '🥥', desc: 'Freshly plucked from Ward 18 farms.' },
    { id: 9, name: 'ഇഞ്ചി', eng: 'Fresh Ginger', price: 140, unit: 'kg', category: 'groceries', seller: 'Rajesh K', sellerPhone: '+919447991100', rating: 4.4, inStock: true, emoji: '🫚', desc: 'Kerala ginger, dried naturally.' },
    { id: 10, name: 'കൂൾ ഹൽവ', eng: 'Homemade Halwa', price: 200, unit: 'kg', category: 'snacks', seller: 'Fathima N', sellerPhone: '+919745100200', rating: 4.9, inStock: false, emoji: '🟫', desc: 'Panayi special wheat halwa, made to order.' },
    { id: 11, name: 'ഉഴുന്ന് വട', eng: 'Uzhunnu Vada', price: 10, unit: 'piece', category: 'homemade', seller: 'Geeta A', sellerPhone: '+919895220033', rating: 4.8, inStock: true, emoji: '🫓', desc: 'Fresh vadas every morning, min 10 pieces.' },
    { id: 12, name: 'കുരുമുളക്', eng: 'Black Pepper', price: 800, unit: 'kg', category: 'farm', seller: 'Joseph C', sellerPhone: '+919847112233', rating: 4.7, inStock: true, emoji: '⚫', desc: 'Premium Wayanad pepper, dried grade-A.' },
];

const CARD = 'bg-white/85 backdrop-blur-xl rounded-[2rem] border border-sky-100 shadow-md shadow-sky-100/40';

/* ── LOGIN WALL ── */
function LoginWall({ onClose, onLogin }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-black text-xl">Login Required</h3>
                    <p className="font-malayalam text-emerald-100 text-[13px] mt-1">ഓർഡർ ചെയ്യാൻ ലോഗിൻ ചെയ്യുക</p>
                </div>
                <div className="p-6 space-y-3">
                    <p className="text-slate-500 text-[13px] text-center leading-relaxed">
                        Only registered Ward 18 residents can place orders. This ensures buyer accountability and seller safety.
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <p className="text-[12px] text-emerald-700 font-medium">Your phone number will be shared with the seller via WhatsApp for order confirmation.</p>
                    </div>
                    <button onClick={onLogin}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[14px] flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4" /> Login / Sign Up
                    </button>
                    <button onClick={onClose} className="w-full py-3 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[13px]">
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── PRODUCT DETAIL DRAWER ── */
function ProductDrawer({ product, cat, isLoggedIn, onBuy, onClose }) {
    const handleWhatsApp = () => {
        if (!isLoggedIn) { onBuy(product); return; }
        const msg = encodeURIComponent(
            `നമസ്കാരം, Rise Up Panayi ആപ്പിൽ നിങ്ങളുടെ ഈ ഉൽപ്പന്നം കണ്ടു:\n\n*ഐറ്റം:* ${product.name}\n*വില:* ₹${product.price}/${product.unit}\n\nഇത് എനിക്ക് വേണം. ദയവായി ഇത് ലഭ്യമാണോ എന്ന് അറിയിക്കുമല്ലോ? 🙏`
        );
        window.open(`https://wa.me/${product.sellerPhone.replace(/\D/g, '')}?text=${msg}`, '_blank');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-end justify-center"
            onClick={onClose}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 px-6 pt-8 pb-10 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="text-6xl mb-3">{product.emoji}</div>
                    <h3 className="font-malayalam text-white font-black text-xl leading-tight">{product.name}</h3>
                    <p className="text-emerald-100 text-[13px] font-semibold mt-0.5">{product.eng}</p>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-white font-black text-2xl">₹{product.price}</span>
                        <span className="text-emerald-100 font-semibold text-[13px]">/ {product.unit}</span>
                        {product.inStock
                            ? <span className="ml-auto bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> In Stock</span>
                            : <span className="ml-auto bg-red-400/40 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Out of Stock</span>
                        }
                    </div>
                </div>

                <div className="-mt-5 mx-4 bg-white rounded-2xl border border-slate-100 shadow-md p-4 mb-4">
                    <p className="text-[12px] text-slate-600 leading-relaxed">{product.desc}</p>
                </div>

                <div className="px-4 pb-6 space-y-3">
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[12px] font-black text-slate-800">{product.seller}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-[11px] text-slate-500 font-bold">{product.rating} · Ward 18 Seller</span>
                            </div>
                        </div>
                    </div>

                    {product.inStock ? (
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button whileTap={{ scale: 0.97 }} onClick={handleWhatsApp}
                                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-[13px] shadow-sm shadow-emerald-200">
                                <MessageCircle className="w-4 h-4" /> WhatsApp Order
                            </motion.button>
                            <motion.a href={`tel:${product.sellerPhone}`} whileTap={{ scale: 0.97 }}
                                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-[13px] shadow-sm shadow-sky-200">
                                <PhoneCall className="w-4 h-4" /> Call Seller
                            </motion.a>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <div>
                                <p className="font-bold text-red-700 text-[13px]">Currently Out of Stock</p>
                                <p className="font-malayalam text-[12px] text-red-500 mt-0.5">ഇപ്പോൾ ലഭ്യമല്ല — നാളെ വീണ്ടും ശ്രമിക്കുക</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── SELLER REGISTER FORM ── */
function SellerForm({ onClose, isLoggedIn, onLoginWall }) {
    const [form, setForm] = useState({ name: '', phone: '', product: '', price: '', unit: 'kg', category: 'vegetables', desc: '' });
    const [inStock, setInStock] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const isPhoneValid = form.phone.replace(/\D/g, '').replace(/^(91|0)/, '').length === 10;

    const ch = e => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const d = value.replace(/\D/g, '').replace(/^(91|0)/, '');
            setPhoneError(d.length > 0 && d.length < 10 ? 'Must be 10 digits' : d.length > 10 ? 'Too many digits' : '');
        }
        setForm(f => ({ ...f, [name]: value }));
    };

    if (!isLoggedIn) return (
        <div className={`${CARD} p-8 text-center`}>
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-7 h-7 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-800 text-[15px] mb-2">Seller Dashboard</h4>
            <p className="font-malayalam text-slate-500 text-[13px] mb-5">ഉൽപ്പന്നങ്ങൾ ലിസ്റ്റ് ചെയ്യാൻ ലോഗിൻ ചെയ്യണം</p>
            <button onClick={onLoginWall} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[13px] flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" /> Login to Sell
            </button>
        </div>
    );

    if (submitted) return (
        <div className={`${CARD} p-8 text-center`}>
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            </div>
            <h4 className="font-black text-slate-800 text-lg mb-2">Product Listed!</h4>
            <p className="font-malayalam text-slate-500 text-[13px] mb-2 leading-relaxed">നിങ്ങളുടെ ഉൽപ്പന്നം 24 മണിക്കൂറിനുള്ളിൽ ലൈവ് ആകും</p>
            <p className="text-slate-400 text-[11px] mb-6">Ward 18 admin will review and approve within 24 hrs.</p>
            <button onClick={onClose} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[13px]">Done</button>
        </div>
    );

    return (
        <div className={`${CARD} overflow-hidden`}>
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/25 rounded-2xl flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-black text-[15px]">Add Your Product</h3>
                        <p className="font-malayalam text-orange-100 text-[11px]">ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക</p>
                    </div>
                </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="p-5 space-y-4">
                {/* Photo upload mock */}
                <div className="w-full h-28 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-all group">
                    <Camera className="w-7 h-7 mb-1 group-hover:text-amber-500 transition-colors" />
                    <span className="font-malayalam text-[12px] font-bold group-hover:text-amber-600">ഫോട്ടോ ചേർക്കുക</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload Product Photo</span>
                </div>

                {/* Product, Name, Phone fields */}
                <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Product Name (ഉൽപ്പന്നം) *</label>
                    <input name="product" value={form.product} onChange={ch} required
                        placeholder="e.g. ജൈവ തക്കാളി"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all" />
                </div>
                <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Your Name *</label>
                    <input name="name" value={form.name} onChange={ch} required
                        placeholder="Seller name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all" />
                </div>
                <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">WhatsApp Number *</label>
                    <input name="phone" value={form.phone} onChange={ch} required type="tel" maxLength={14}
                        placeholder="+91 94471 XXXXX"
                        className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all ${phoneError ? 'border-red-300 focus:ring-red-300/40 focus:border-red-400' : 'border-slate-200 focus:ring-amber-400/40 focus:border-amber-300'}`} />
                    {phoneError && <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">⚠ {phoneError}</p>}
                    {isPhoneValid && form.phone && <p className="text-emerald-500 text-[11px] font-bold mt-1.5 ml-1">✓ Valid number</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Price (₹) *</label>
                        <input name="price" value={form.price} onChange={ch} required type="number" min="1"
                            placeholder="e.g. 60"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all" />
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Unit</label>
                        <select name="unit" value={form.unit} onChange={ch}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all">
                            {['kg', 'piece', 'litre', 'pkt', 'bottle', 'dozen'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Category</label>
                    <select name="category" value={form.category} onChange={ch}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all">
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label} ({c.malayalam})</option>)}
                    </select>
                </div>

                <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Description (optional)</label>
                    <textarea name="desc" value={form.desc} onChange={ch} rows={2}
                        placeholder="About your product, freshness, packaging…"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all resize-none" />
                </div>

                {/* Availability toggle */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                    <div>
                        <p className="font-bold text-slate-700 text-[13px]">Availability</p>
                        <p className="font-malayalam text-[11px] text-slate-400">{inStock ? 'ലഭ്യമാണ് (In Stock)' : 'ലഭ്യമല്ല (Out of Stock)'}</p>
                    </div>
                    <button type="button" onClick={() => setInStock(s => !s)}>
                        {inStock
                            ? <ToggleRight className="w-9 h-9 text-emerald-500" />
                            : <ToggleLeft className="w-9 h-9 text-slate-300" />}
                    </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 leading-snug">Your product goes live after Ward 18 admin review (within 24 hrs). Keeps the marketplace trustworthy.</p>
                </div>

                <button type="submit"
                    disabled={!form.product || !form.name || !isPhoneValid || !form.price}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[14px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-amber-200">
                    <CheckCircle2 className="w-4 h-4" /> List My Product
                </button>
            </form>
        </div>
    );
}

/* ── MAIN PAGE ── */
export default function Marketplace() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('buy');
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showLoginWall, setShowLoginWall] = useState(false);
    const [loginPending, setLoginPending] = useState(null); // callback after login
    // Simulate logged-in state (toggle for demo)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleBuy = (product) => {
        if (!isLoggedIn) {
            setLoginPending(() => () => {
                setIsLoggedIn(true);
                setShowLoginWall(false);
                setSelectedProduct(product);
            });
            setShowLoginWall(true);
        }
    };

    const handleSellTab = () => {
        if (!isLoggedIn) {
            setLoginPending(() => () => { setIsLoggedIn(true); setShowLoginWall(false); setTab('sell'); });
            setShowLoginWall(true);
        } else { setTab('sell'); }
    };

    const filtered = INITIAL_PRODUCTS.filter(p =>
        (category === 'all' || p.category === category) &&
        (search === '' || p.name.includes(search) || p.eng.toLowerCase().includes(search.toLowerCase()))
    );

    const activeCat = CATEGORIES.find(c => c.id === category);

    return (
        <>
            <div className="flex flex-col min-h-screen w-full overflow-y-auto no-scrollbar"
                style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 40%, #ffffff 70%, #fefce8 100%)' }}>

                {/* HEADER */}
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-lg shadow-emerald-200/50 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center hover:bg-white/35 transition-colors">
                            <ArrowLeft className="text-white w-5 h-5" />
                        </button>
                        <div className="flex-1">
                            <h2 className="text-white text-xl font-black font-malayalam leading-tight">നാട്ടുചന്ത</h2>
                            <p className="text-emerald-100 text-[11px] font-bold uppercase tracking-widest">Local Marketplace · Ward 18</p>
                        </div>
                        {/* Login indicator */}
                        <button onClick={() => setIsLoggedIn(l => !l)}
                            className={`flex items-center gap-2 text-[11px] font-bold px-3 py-2 rounded-2xl transition-all ${isLoggedIn ? 'bg-white text-emerald-700' : 'bg-white/20 text-white border border-white/30'}`}>
                            <User className="w-3.5 h-3.5" />
                            {isLoggedIn ? 'Logged In' : 'Guest'}
                        </button>
                    </div>

                    {/* Buy / Sell toggle */}
                    <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-2xl p-1 flex">
                        <button onClick={() => setTab('buy')}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all ${tab === 'buy' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white/80 hover:text-white'}`}>
                            🛒 <span className="font-malayalam">വാങ്ങുക</span> <span className="text-[10px] opacity-70">· Buy</span>
                        </button>
                        <button onClick={handleSellTab}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all ${tab === 'sell' ? 'bg-white text-amber-600 shadow-sm' : 'text-white/80 hover:text-white'}`}>
                            🏪 <span className="font-malayalam">വിൽക്കുക</span> <span className="text-[10px] opacity-70">· Sell</span>
                        </button>
                    </div>
                </div>

                <div className="p-5 md:p-8 pb-28 space-y-5">
                    <AnimatePresence mode="wait">

                        {/* ── BUY TAB ── */}
                        {tab === 'buy' && (
                            <motion.div key="buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input value={search} onChange={e => setSearch(e.target.value)}
                                        placeholder="Search products… (ഉൽപ്പന്നം തിരയുക)"
                                        className="w-full bg-white/90 border border-sky-100 rounded-2xl pl-11 pr-4 py-3.5 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-300 shadow-sm transition-all" />
                                    {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-slate-400" /></button>}
                                </div>

                                {/* Category chips */}
                                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                    {CATEGORIES.map(cat => (
                                        <button key={cat.id} onClick={() => setCategory(cat.id)}
                                            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border font-bold text-[12px] transition-all ${category === cat.id ? cat.active : `${cat.bg} ${cat.color} ${cat.border}`}`}>
                                            <span>{cat.emoji}</span>
                                            <span className="font-malayalam">{cat.malayalam}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between px-1">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{filtered.length} products</p>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                                        <span className="text-[11px] text-slate-500 font-semibold">{filtered.filter(p => p.inStock).length} in stock</span>
                                    </div>
                                </div>

                                {/* Product Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {filtered.map((product, i) => (
                                        <motion.button key={product.id}
                                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            onClick={() => setSelectedProduct(product)}
                                            whileTap={{ scale: 0.97 }}
                                            className="bg-white/90 rounded-[1.8rem] border border-sky-100 shadow-sm shadow-sky-100/40 overflow-hidden text-left flex flex-col hover:shadow-md transition-all group">

                                            {/* Product emoji area */}
                                            <div className={`h-28 flex items-center justify-center text-5xl relative ${!product.inStock ? 'bg-slate-50' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
                                                <span className={!product.inStock ? 'grayscale opacity-50' : ''}>{product.emoji}</span>
                                                {/* Price badge */}
                                                <div className="absolute top-2 right-2 bg-white/95 border border-sky-100 rounded-xl px-2 py-1 shadow-sm">
                                                    <span className="text-[12px] font-black text-slate-800">₹{product.price}</span>
                                                    <span className="text-[9px] text-slate-400 font-bold">/{product.unit}</span>
                                                </div>
                                                {/* Out of stock overlay */}
                                                {!product.inStock && (
                                                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                                                        <span className="bg-red-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Out of Stock</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-3 flex-1 flex flex-col">
                                                <h4 className="font-malayalam font-bold text-slate-800 text-[13px] leading-tight line-clamp-1">{product.name}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5 line-clamp-1">{product.eng}</p>

                                                <div className="flex items-center gap-1 mt-1.5">
                                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                    <span className="text-[10px] text-slate-500 font-bold">{product.rating}</span>
                                                    <span className="text-[10px] text-slate-300 mx-0.5">·</span>
                                                    <span className="text-[10px] text-slate-500 truncate">{product.seller}</span>
                                                </div>

                                                <button className={`mt-2.5 w-full py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all ${product.inStock
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-200 group-hover:shadow-md'
                                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                                    {product.inStock ? <><MessageCircle className="w-3 h-3" /> Buy Now</> : 'Unavailable'}
                                                </button>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {filtered.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-5xl mb-3">🔍</div>
                                        <p className="font-bold text-slate-500 text-[14px]">No products found</p>
                                        <p className="font-malayalam text-slate-400 text-[12px] mt-1">ഉൽപ്പന്നം കണ്ടെത്തിയില്ല</p>
                                    </div>
                                )}

                                {/* Info banner */}
                                <div className={`${CARD} p-4 flex items-start gap-3`}>
                                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-slate-700 text-[13px]">Verified Local Sellers Only</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">All products listed here are from verified residents of Panayi Ward 18. Orders go directly to the seller via WhatsApp.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── SELL TAB ── */}
                        {tab === 'sell' && (
                            <motion.div key="sell" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                                <SellerForm
                                    isLoggedIn={isLoggedIn}
                                    onClose={() => setTab('buy')}
                                    onLoginWall={() => {
                                        setLoginPending(() => () => { setIsLoggedIn(true); setShowLoginWall(false); });
                                        setShowLoginWall(true);
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDrawer
                        key="drawer"
                        product={selectedProduct}
                        cat={activeCat}
                        isLoggedIn={isLoggedIn}
                        onBuy={handleBuy}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
                {showLoginWall && (
                    <LoginWall
                        key="loginwall"
                        onClose={() => setShowLoginWall(false)}
                        onLogin={() => loginPending && loginPending()}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
