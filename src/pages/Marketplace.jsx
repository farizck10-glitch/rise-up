import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowLeft,
    ShoppingBag,
    Plus,
    PhoneCall,
    Search,
    Filter,
    Camera
} from 'lucide-react';

export default function Marketplace() {
    const navigate = useNavigate();
    const { requireAuth } = useAuth();
    const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
    const [activeCategory, setActiveCategory] = useState('All');

    // Dummy Products Data
    const products = [
        { id: 1, name: 'ജൈവ പച്ചക്കറികൾ', engName: 'Organic Vegetables', price: '₹60/kg', category: 'പച്ചക്കറികൾ (Vegetables)', image: 'https://images.unsplash.com/photo-1595856728080-05CC81D5E9DE?w=400&h=300&fit=crop', sellerPhone: '+919876543210', sellerName: 'Raju K' },
        { id: 2, name: 'നാടൻ മുട്ട', engName: 'Country Eggs', price: '₹8/piece', category: 'വളർത്തുമൃഗങ്ങൾ (Livestock/Pets)', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop', sellerPhone: '+919876543211', sellerName: 'Mini' },
        { id: 3, name: 'മുളകൊണ്ടുള്ള കുട്ട', engName: 'Bamboo Basket', price: '₹250/pc', category: 'വീട്ടിലുണ്ടാക്കിയവ (Homemade)', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=300&fit=crop', sellerPhone: '+919876543212', sellerName: 'Joseph' },
        { id: 4, name: 'ചക്ക വറുത്തത്', engName: 'Jackfruit Chips', price: '₹120/pkt', category: 'വീട്ടിലുണ്ടാക്കിയവ (Homemade)', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop', sellerPhone: '+919876543213', sellerName: 'Amina' },
        { id: 5, name: 'നാടൻ പശുവിൻ പാൽ', engName: 'Fresh Cow Milk', price: '₹55/L', category: 'വളർത്തുമൃഗങ്ങൾ (Livestock/Pets)', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop', sellerPhone: '+919876543214', sellerName: 'Gopi' },
    ];

    const categories = ['All', 'പച്ചക്കറികൾ (Vegetables)', 'വീട്ടിലുണ്ടാക്കിയവ (Homemade)', 'വളർത്തുമൃഗങ്ങൾ (Livestock/Pets)'];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    const handleCallSeller = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handleSellClick = () => {
        requireAuth(() => {
            setActiveTab('sell');
        }, {
            title: "വിൽക്കാൻ ലോഗിൻ ചെയ്യുക",
            subtitle: "Please login to post items for sale."
        });
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#f8fafc] relative overflow-y-auto no-scrollbar lg:items-center pb-24">

            {/* Header */}
            <div className="bg-green-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-floating sticky top-0 z-20 w-full lg:max-w-3xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <ArrowLeft className="text-white w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-white text-xl font-bold font-malayalam tracking-tight">നാട്ടുചന്ത</h2>
                        <p className="text-green-100 text-[11px] font-bold uppercase tracking-widest font-sans mt-0.5">Local Marketplace</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-16 relative z-30 space-y-6 w-full lg:max-w-3xl">

                {/* Buy / Sell Toggle Details Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-2 shadow-floating border border-slate-100 flex items-center relative overflow-hidden">
                    <button
                        onClick={() => setActiveTab('buy')}
                        className={`flex-1 py-3 text-center rounded-[1.5rem] font-bold transition-all ${activeTab === 'buy' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <span className="font-malayalam">വാങ്ങാൻ</span> <span className="text-[10px] font-sans uppercase tracking-widest block mt-0.5 opacity-70">Buy</span>
                    </button>
                    <button
                        onClick={handleSellClick}
                        className={`flex-1 py-3 text-center rounded-[1.5rem] font-bold transition-all ${activeTab === 'sell' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <span className="font-malayalam">വിൽക്കാൻ</span> <span className="text-[10px] font-sans uppercase tracking-widest block mt-0.5 opacity-70">Sell</span>
                    </button>
                </motion.div>

                {/* --- BUY TAB --- */}
                {activeTab === 'buy' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                        {/* Search & Filter */}
                        <div className="flex gap-3">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="തിരയുക (Search items...)"
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-sm font-malayalam transition-all"
                                />
                            </div>
                            <button className="w-14 h-[54px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:text-green-600 hover:bg-green-50 transition-colors shadow-sm shrink-0">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Categories Scroll */}
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${activeCategory === cat ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                                >
                                    {cat.split(' ')[0]} <span className="font-sans text-[10px] uppercase font-bold opacity-70 block -mt-1">{cat.split('(')[1]?.replace(')', '') || ''}</span>
                                </button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col group overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-32 bg-slate-100 relative overflow-hidden">
                                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg z-10 shadow-sm border border-slate-100">
                                            <p className="font-bold text-slate-800 text-xs">{item.price}</p>
                                        </div>
                                        <img src={item.image} alt={item.engName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h4 className="font-bold text-slate-800 text-sm font-malayalam leading-tight line-clamp-1">{item.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 font-sans uppercase tracking-widest mt-0.5 line-clamp-1">{item.engName}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> {item.sellerName}
                                        </p>

                                        <button
                                            onClick={() => handleCallSeller(item.sellerPhone)}
                                            className="mt-3 w-full bg-green-50 hover:bg-green-600 text-green-700 hover:text-white border border-green-200 hover:border-green-600 transition-colors py-2 rounded-xl flex items-center justify-center gap-1.5 font-bold font-malayalam text-[11px] group/btn"
                                        >
                                            <PhoneCall className="w-3.5 h-3.5" /> വിളിക്കാൻ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* --- SELL TAB --- */}
                {activeTab === 'sell' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] p-6 shadow-floating border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Plus className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 font-malayalam">പുതിയ ഉൽപ്പന്നം ചേർക്കുക</h3>
                                <p className="text-[10px] text-slate-400 font-bold font-sans uppercase tracking-wider">Add New Product</p>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Product Listed Successfully! (Demo)'); setActiveTab('buy'); }}>

                            {/* Photo Upload Area */}
                            <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                                <Camera className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                                <span className="font-malayalam font-bold text-sm group-hover:text-blue-600">ഫോട്ടോ ചേർക്കുക</span>
                                <span className="font-sans text-[10px] uppercase font-bold mt-1">Upload Photo</span>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">ഉൽപ്പന്നത്തിന്റെ പേര് (Product Name)</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-malayalam" placeholder="ഉദാഹരണത്തിന്: നാടൻ പാൽ" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">വില (Price)</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="₹50" required />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">അളവ് (Unit)</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-malayalam" required>
                                        <option value="kg">1 കിലോ (1 Kg)</option>
                                        <option value="pc">1 എണ്ണം (1 Piece)</option>
                                        <option value="L">1 ലിറ്റർ (1 Liter)</option>
                                        <option value="pkt">1 പാക്കറ്റ് (1 Pkt)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">വിഭാഗം (Category)</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-malayalam" required>
                                    <option value="">തിരഞ്ഞെടുക്കുക</option>
                                    <option value="veg">പച്ചക്കറികൾ (Vegetables)</option>
                                    <option value="home">വീട്ടിലുണ്ടാക്കിയവ (Homemade)</option>
                                    <option value="pets">വളർത്തുമൃഗങ്ങൾ (Livestock)</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors font-malayalam z-10 relative">
                                വില്പനയ്ക്ക് വെക്കുക (List Item)
                            </button>
                        </form>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
