import React, { useState } from 'react';
import { Search, Zap, Droplet, Car, Brush, Phone, ArrowLeft } from 'lucide-react';
import AppHeader from '../components/AppHeader';

interface Props {
    onGoBack: () => void;
}

const jobCategories = [
    { id: 'electrician', title: "Electricians (ഇലക്ട്രീഷ്യൻ)", icon: <Zap className="w-5 h-5" />, color: "bg-[#E8F0FE] text-[#0A58CA]" },
    { id: 'plumber', title: "Plumbers (പ്ലംബർ)", icon: <Droplet className="w-5 h-5" />, color: "bg-[#E6F4EA] text-[#137333]" },
    { id: 'driver', title: "Drivers (ഡ്രൈവർ)", icon: <Car className="w-5 h-5" />, color: "bg-[#FEF7E0] text-[#E37400]" },
    { id: 'painter', title: "Painters (പെയ്ൻ്റർ)", icon: <Brush className="w-5 h-5" />, color: "bg-[#FCE8E6] text-[#DC3545]" }
];

const jobWorkers = [
    { name: "Suresh P", category: "electrician", exp: "5 Yrs Exp", location: "Temple Road", phone: "9876543210" },
    { name: "Akhil M", category: "electrician", exp: "2 Yrs Exp", location: "Panayi Center", phone: "9876543210" },
    { name: "Manish V", category: "plumber", exp: "8 Yrs Exp", location: "Temple Road", phone: "9876543210" },
    { name: "Rahul K", category: "driver", exp: "Taxi / Auto", location: "River Side", phone: "9876543210" },
    { name: "Gopi S", category: "painter", exp: "House Painting", location: "School Junction", phone: "9876543210" }
];

export const JobsScreen: React.FC<Props> = ({ onGoBack }) => {
    const [selectedCat, setSelectedCat] = useState<string | null>(null);

    const activeCat = jobCategories.find(c => c.id === selectedCat);
    const workers = jobWorkers.filter(w => w.category === selectedCat);

    return (
        <section className="screen bg-gray active">
            <AppHeader title="തൊഴിൽ ഡയറക്ടറി" showBack onBackClick={onGoBack} />

            <main className="padding-main">
                <div className="search-bar mb-4">
                    <Search className="text-muted" style={{ width: 20, height: 20 }} />
                    <input type="text" placeholder="Search (e.g., Electrician)" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent' }} />
                </div>

                {!selectedCat ? (
                    <div className="market-grid fade-in">
                        {jobCategories.map(cat => (
                            <div
                                key={cat.id}
                                className="card"
                                style={{ textAlign: 'center', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}
                                onClick={() => setSelectedCat(cat.id)}
                            >
                                <div className={`icon-wrapper ${cat.color.includes('blue') ? 'blue' : cat.color.includes('green') ? 'green' : cat.color.includes('orange') ? 'orange' : 'red'}`} style={{ width: 56, height: 56, borderRadius: 16 }}>
                                    {cat.icon}
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>{cat.title}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="fade-in">
                        <div
                            style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}
                            onClick={() => setSelectedCat(null)}
                        >
                            <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Categories
                        </div>

                        <h3 className="section-title" style={{ marginTop: 0, color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={`badge ${activeCat?.color.includes('blue') ? 'blue' : activeCat?.color.includes('green') ? 'green' : activeCat?.color.includes('orange') ? 'orange' : 'red'}`} style={{ padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {activeCat?.icon}
                            </span>
                            {activeCat?.title}
                        </h3>

                        <div id="workers-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {workers.length === 0 ? (
                                <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed #CBD5E1' }}>
                                    No workers registered in this category yet.
                                </div>
                            ) : (
                                workers.map((w, idx) => (
                                    <div key={idx} className="card donor-card" style={{ border: '1px solid #E2E8F0', marginBottom: 0 }}>
                                        <div className="donor-info">
                                            <div className={`icon-wrapper ${activeCat?.color.includes('blue') ? 'blue' : activeCat?.color.includes('green') ? 'green' : activeCat?.color.includes('orange') ? 'orange' : 'red'}`} style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }}>
                                                {activeCat?.icon}
                                            </div>
                                            <div>
                                                <h4>{w.name}</h4>
                                                <span>{w.exp} • {w.location}</span>
                                            </div>
                                        </div>
                                        <button className="icon-btn call-btn" onClick={() => window.open(`tel:+91${w.phone}`)}>
                                            <Phone style={{ width: 20, height: 20 }} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </section>
    );
};
