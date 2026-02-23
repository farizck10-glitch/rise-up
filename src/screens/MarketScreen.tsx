import React, { useState } from 'react';
import { Search, Store, Clock, Plus, Edit2, Trash2, MessageCircle } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import type { ScreenId, User } from '../types';

interface Props {
    onNavigate: (s: ScreenId) => void;
    onGoBack: () => void;
    currentUser: User | null;
}

const defaultProducts = [
    { id: 101, name: "കറിപ്പൊടികൾ", price: "₹150 / പാക്കറ്റ്", shop: "Kudumbashree Unit 1", phone: "9876543210", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop" },
    { id: 102, name: "വെളിച്ചെണ്ണ", price: "₹250 / ലിറ്റർ", shop: "Kudumbashree Unit 1", phone: "9876543210", img: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&h=300&fit=crop" },
    { id: 103, name: "കൈത്തറി മുണ്ട്", price: "₹450 / എണ്ണം", shop: "Panayi Weavers", phone: "9988776655", img: "https://images.unsplash.com/photo-1605000523097-f55a1e20436d?w=400&h=300&fit=crop" }
];

const MarketScreen: React.FC<Props> = ({ onNavigate, onGoBack, currentUser }) => {
    const [activeTab, setActiveTab] = useState<'shop' | 'vendor'>('shop');
    const [vendorStatus, setVendorStatus] = useState<'unregistered' | 'pending' | 'approved'>('unregistered');
    const [myShopName, setMyShopName] = useState('');
    const [products, setProducts] = useState(defaultProducts);

    const handleTabSwitch = (tab: 'shop' | 'vendor') => {
        if (tab === 'vendor' && !currentUser) {
            alert('Please login first to access the Vendor Dashboard.');
            onNavigate('login');
            return;
        }
        setActiveTab(tab);
    };

    const registerVendor = () => {
        const shop = window.prompt("Enter your Shop/Unit Name:");
        if (shop) {
            setMyShopName(shop);
            setVendorStatus('pending');
            alert("Registration submitted! Waiting for admin approval.");
        }
    };

    // Group products by shop
    const shopGroups = products.reduce((acc, p) => {
        if (!acc[p.shop]) acc[p.shop] = [];
        acc[p.shop].push(p);
        return acc;
    }, {} as Record<string, typeof products>);

    const myProducts = products.filter(p => p.shop === myShopName);

    return (
        <section className="screen bg-gray active">
            <AppHeader title="നാട്ടുചന്ത (Marketplace)" showBack onBackClick={onGoBack} />

            <div className="tabs-container">
                <div
                    className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('shop')}
                >
                    Shop Products<br />
                    <small>സാധനങ്ങൾ വാങ്ങാൻ</small>
                </div>
                <div
                    className={`tab ${activeTab === 'vendor' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('vendor')}
                >
                    Vendor Dashboard<br />
                    <small>വിൽപനക്കാർക്ക്</small>
                </div>
            </div>

            <main className="padding-main">
                {activeTab === 'shop' && (
                    <div id="tab-shop" className="fade-in">
                        <div className="search-bar mb-4">
                            <Search className="text-muted" style={{ width: 20, height: 20 }} />
                            <input type="text" placeholder="Search products or shops..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent' }} />
                        </div>

                        {Object.entries(shopGroups).map(([shopName, shopProducts]) => (
                            <div key={shopName} className="mb-8">
                                <h3 className="section-title" style={{ marginTop: 0, color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Store style={{ width: 20, height: 20 }} /> {shopName}
                                </h3>
                                <div className="market-grid mb-4">
                                    {shopProducts.map(p => (
                                        <div key={p.id} className="card" style={{ padding: '12px' }}>
                                            <div className="product-img" style={{ backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{p.name}</h4>
                                            <p style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px' }}>{p.price}</p>
                                            <button
                                                className="btn-whatsapp w-full"
                                                style={{ padding: '8px', fontSize: '0.9rem', borderRadius: '8px' }}
                                                onClick={() => window.open(`https://wa.me/91${p.phone}?text=Hi, I want to buy ${p.name}`, '_blank')}
                                            >
                                                <MessageCircle style={{ width: 16, height: 16 }} /> Message
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'vendor' && (
                    <div id="tab-vendor" className="fade-in">
                        {vendorStatus === 'unregistered' && (
                            <div id="vendor-unregistered" className="card" style={{ textAlign: 'center', padding: '32px 20px', border: '1px solid #E2E8F0' }}>
                                <Store style={{ width: 64, height: 64, margin: '0 auto 16px', color: 'var(--primary-blue)' }} />
                                <h3 style={{ marginBottom: '8px' }}>Become a Vendor</h3>
                                <p className="text-muted mb-4">Register your local shop or Kudumbashree unit to sell directly to Ward 18 residents.</p>
                                <button className="btn-primary w-full mb-4" onClick={registerVendor}>Register Now</button>
                                <small className="text-blue" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setVendorStatus('approved'); setMyShopName('Kudumbashree Unit 1'); }}>
                                    (Mock Admin Approve)
                                </small>
                            </div>
                        )}

                        {vendorStatus === 'pending' && (
                            <div id="vendor-pending" className="card" style={{ textAlign: 'center', padding: '32px 20px', background: '#FEF7E0', border: '1px solid rgba(227,116,0,0.2)', color: '#E37400' }}>
                                <Clock style={{ width: 64, height: 64, margin: '0 auto 16px' }} />
                                <h3 style={{ marginBottom: '8px' }}>Registration Pending</h3>
                                <p style={{ opacity: 0.9, marginBottom: '16px' }}>Your vendor registration is currently under review by the Admin.</p>
                                <small style={{ cursor: 'pointer', textDecoration: 'underline', color: '#E37400' }} onClick={() => setVendorStatus('approved')}>
                                    (Mock Admin Approve)
                                </small>
                            </div>
                        )}

                        {vendorStatus === 'approved' && (
                            <div id="vendor-approved">
                                <div className="card mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                                    <div>
                                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>My Shop:</span>
                                        <h3 style={{ color: 'var(--primary-blue)' }}>{myShopName}</h3>
                                    </div>
                                    <button
                                        className="btn-outline-sm"
                                        style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                        onClick={() => alert("Mock: Opening Add Product Modal")}
                                    >
                                        <Plus style={{ width: 16, height: 16 }} /> Add Product
                                    </button>
                                </div>

                                <div className="market-grid">
                                    {myProducts.length === 0 ? (
                                        <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed #CBD5E1', gridColumn: '1 / -1' }}>
                                            You haven't added any products yet.
                                        </div>
                                    ) : (
                                        myProducts.map(p => (
                                            <div key={p.id} className="card" style={{ padding: '12px', border: '1px solid #E2E8F0' }}>
                                                <div className="product-img" style={{ backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{p.name}</h4>
                                                <p style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px' }}>{p.price}</p>
                                                <div className="flex-between" style={{ gap: '8px' }}>
                                                    <button className="btn-outline-sm" style={{ flex: 1, borderColor: '#CBD5E1', color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', borderRadius: '6px' }}>
                                                        <Edit2 style={{ width: 14, height: 14 }} /> Edit
                                                    </button>
                                                    <button
                                                        className="icon-btn"
                                                        style={{ background: '#FCE8E6', color: 'var(--primary-red)', borderRadius: '6px', padding: '6px 10px' }}
                                                        onClick={() => { if (window.confirm('Delete product?')) setProducts(prev => prev.filter(x => x.id !== p.id)) }}
                                                    >
                                                        <Trash2 style={{ width: 16, height: 16 }} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </section>
    );
};

export default MarketScreen;
