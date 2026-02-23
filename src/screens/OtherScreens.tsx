import React from 'react';
import AppHeader from '../components/AppHeader';
import type { ScreenId, User } from '../types';
import { FileText, Download, Calendar, Shield, Truck, Activity, Phone, AlertTriangle, LogOut, Store } from 'lucide-react';

interface Props {
    onGoBack: () => void;
    currentUser?: User | null;
    onNavigate?: (s: ScreenId) => void;
}

export const SchemesScreen: React.FC<Props> = ({ onGoBack, currentUser, onNavigate }) => (
    <section className="screen bg-gray active">
        <AppHeader title="പദ്ധതി ജാലകം" showBack onBackClick={onGoBack} />
        <main className="padding-main">
            <h3 className="section-title" style={{ marginTop: 0 }}>Available Panchayat Schemes</h3>

            <SchemeCard title="ലൈഫ് മിഷൻ ഭവന പദ്ധതി" desc="ഭവനരഹിതർക്കുള്ള ധനസഹായം. അവസാന തീയതി: 30 Nov 2024" currentUser={currentUser} onNavigate={onNavigate} />
            <SchemeCard title="കൃഷിഭവൻ സബ്സിഡി" desc="പച്ചക്കറി കൃഷിക്കുള്ള വിത്തുകളും വളവും." currentUser={currentUser} onNavigate={onNavigate} />
        </main>
    </section>
);

const SchemeCard = ({ title, desc, currentUser, onNavigate }: any) => (
    <div className="card mb-4" style={{ padding: '20px', borderLeft: '4px solid var(--primary-blue)' }}>
        <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.1rem', marginBottom: '8px' }}>{title}</h4>
        <p className="text-muted" style={{ marginBottom: '16px', lineHeight: 1.5 }}>{desc}</p>
        <button
            className="btn-outline-sm"
            onClick={() => {
                if (!currentUser && onNavigate) { alert("Please login to express interest in schemes."); onNavigate('login'); return; }
                alert('താൽപ്പര്യമുണ്ട് രേഖപ്പെടുത്തി! (Interested)');
            }}
        >
            താൽപ്പര്യമുണ്ട് (Interested)
        </button>
    </div>
);

export const LibraryScreen: React.FC<Props> = ({ onGoBack }) => (
    <section className="screen bg-gray active">
        <AppHeader title="Digital Library" showBack onBackClick={onGoBack} />
        <main className="padding-main">
            <h3 className="section-title" style={{ marginTop: 0 }}>Download Forms</h3>

            <div className="card mb-2 flex-between" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 500 }}>
                    <FileText style={{ color: 'var(--primary-blue)' }} /> വരുമാന സർട്ടിഫിക്കറ്റ് ഫോം
                </div>
                <button className="icon-btn text-blue w-auto"><Download /></button>
            </div>

            <div className="card mb-2 flex-between" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 500 }}>
                    <FileText style={{ color: 'var(--primary-blue)' }} /> റേഷൻ കാർഡ് അപേക്ഷ
                </div>
                <button className="icon-btn text-blue w-auto"><Download /></button>
            </div>
        </main>
    </section>
);

export const GrievancesScreen: React.FC<Props> = ({ onGoBack, currentUser, onNavigate }) => (
    <section className="screen bg-gray active">
        <AppHeader title="പരാതികൾ (Grievances)" showBack onBackClick={onGoBack} />
        <main className="padding-main">
            <h3 className="section-title" style={{ marginTop: 0 }}>Submit a Grievance</h3>
            <div className="card" style={{ padding: '24px' }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!currentUser && onNavigate) { alert("Please login to submit a grievance."); onNavigate('login'); return; }
                    alert('പരാതി അയച്ചു! (Grievance Submitted)');
                    if (onNavigate) onNavigate('home');
                }}>
                    <div className="input-group">
                        <label>Subject (വിഷയം)</label>
                        <input type="text" placeholder="e.g., Waste Management, Street Light" required />
                    </div>
                    <div className="input-group">
                        <label>Description (വിവരണം)</label>
                        <textarea rows={4} placeholder="Describe your issue..." required style={{ width: '100%', padding: '14px', border: '1px solid #CBD5E1', borderRadius: '12px', fontFamily: 'inherit', resize: 'none' }}></textarea>
                    </div>
                    <div className="input-group">
                        <label>Add Photo (Optional)</label>
                        <input type="file" accept="image/*" style={{ padding: '10px', fontSize: '0.9rem' }} />
                    </div>
                    <button type="submit" className="btn-primary-red w-full">
                        Submit to Admin
                    </button>
                </form>
            </div>
        </main>
    </section>
);

export const EmergencyScreen: React.FC<Props> = ({ onGoBack }) => (
    <section className="screen bg-gray active">
        <AppHeader title="എമർജൻസി" showBack onBackClick={onGoBack} />
        <main className="padding-main">
            <h3 className="section-title" style={{ marginTop: 0 }}>Important Contacts</h3>

            <EmergencyContact title="Police Station" sub="Local Police" icon={<Shield className="text-red" />} bg="bg-red-light" phone="100" />
            <EmergencyContact title="Fire Force" sub="Fire & Rescue" icon={<Truck className="text-white" />} bg="bg-red" phone="101" />
            <EmergencyContact title="Ambulance" sub="24x7 Service" icon={<Activity className="text-red" />} bg="bg-red-light" phone="102" />
        </main>
    </section>
);

const EmergencyContact = ({ title, sub, icon, bg, phone }: any) => (
    <div className="card donor-card mb-2" style={{ borderLeft: bg === 'bg-red' ? 'none' : '4px solid var(--primary-red)' }}>
        <div className="donor-info">
            <div className={`icon-wrapper ${bg}`} style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }}>
                {icon}
            </div>
            <div>
                <h4>{title}</h4>
                <span className="text-muted">{sub}</span>
            </div>
        </div>
        <button className="icon-btn call-btn text-green" style={{ background: '#E6F4EA' }} onClick={() => window.open(`tel:${phone}`)}>
            <Phone />
        </button>
    </div>
);

export const HarithaScreen: React.FC<Props> = ({ onGoBack, currentUser, onNavigate }) => (
    <section className="screen bg-gray active">
        <AppHeader title="ഹരിതകർമ്മ സേന" showBack onBackClick={onGoBack} />
        <main className="padding-main">
            <div className="card mb-4" style={{ background: '#E6F4EA', borderLeft: '4px solid #137333', padding: '20px' }}>
                <h3 style={{ color: '#137333', fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar style={{ width: 20, height: 20 }} /> അടുത്ത ശേഖരണം
                </h3>
                <p style={{ marginBottom: '4px' }}><strong>തീയതി:</strong> 25 November 2024</p>
                <p style={{ marginBottom: '12px' }}><strong>ഇനം:</strong> പ്ലാസ്റ്റിക് മാലിന്യങ്ങൾ (Plastic Waste)</p>
                <p style={{ color: '#137333', fontSize: '0.85rem', fontWeight: 500, background: 'rgba(255,255,255,0.5)', padding: '8px', borderRadius: '8px' }}>
                    ദയവായി മാലിന്യങ്ങൾ കഴുകി ഉണക്കി സൂക്ഷിക്കുക.
                </p>
            </div>

            <h3 className="section-title">പ്രത്യേക കളക്ഷൻ ബുക്ക് ചെയ്യുക</h3>
            <div className="card" style={{ padding: '24px' }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!currentUser && onNavigate) { alert("Please login to book special collections."); onNavigate('login'); return; }
                    alert('Request sent! (അപേക്ഷ സമർപ്പിച്ചു)');
                    if (onNavigate) onNavigate('home');
                }}>
                    <div className="input-group">
                        <label>മാലിന്യത്തിന്റെ സ്വഭാവം (Waste Type)</label>
                        <select required style={{ width: '100%', padding: '14px', border: '1px solid #CBD5E1', borderRadius: '12px', fontFamily: 'inherit' }}>
                            <option value="">Select Type</option>
                            <option value="e-waste">ഇ-മാലിന്യങ്ങൾ (E-Waste)</option>
                            <option value="glass">കുപ്പി / ഗ്ലാസ് (Glass)</option>
                            <option value="bulk">കൂടുതൽ അളവിലുള്ള പ്ലാസ്റ്റിക്</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>വിലാസം (Address/Details)</label>
                        <input type="text" placeholder="House name/number" required />
                    </div>
                    <button type="submit" className="w-full" style={{ background: '#137333', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: 700 }}>
                        Request Special Collection
                    </button>
                </form>
            </div>
        </main>
    </section>
);

export const AdminScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => (
    <section className="screen bg-gray active">
        <header className="app-header" style={{ background: '#1E293B', color: 'white' }}>
            <button className="icon-btn" onClick={() => onNavigate('welcome')} style={{ color: 'white' }}>
                <LogOut />
            </button>
            <h2 className="header-title" style={{ flex: 1, marginLeft: '12px' }}>Admin Dashboard</h2>
            <div style={{ width: 44 }}></div>
        </header>

        <main className="padding-main">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>Total Users</p>
                    <h3 style={{ fontSize: '1.5rem' }}>1,245</h3>
                </div>
                <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>Pending Vendors</p>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-red)' }}>1</h3>
                </div>
                <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>Total Grievances</p>
                    <h3 style={{ fontSize: '1.5rem', color: '#E37400' }}>12</h3>
                </div>
                <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>Scheme Interests</p>
                    <h3 style={{ fontSize: '1.5rem' }}>48</h3>
                </div>
            </div>

            <h3 className="section-title">Quick Actions</h3>

            <div className="card flex-between mb-2" style={{ padding: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="icon-wrapper orange" style={{ borderRadius: '12px' }}>
                        <Store />
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>Approve Vendors</h4>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Review pending shop registrations</span>
                    </div>
                </div>
            </div>

            <div className="card flex-between" style={{ padding: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="icon-wrapper blue" style={{ borderRadius: '12px' }}>
                        <AlertTriangle className="text-red" />
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>View Complaints</h4>
                    </div>
                </div>
            </div>

            <div className="card mt-8" style={{ padding: '20px' }}>
                <h3 className="section-title" style={{ marginTop: 0 }}>Recent Scheme Interests</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li className="flex-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                        <span style={{ fontWeight: 500 }}>Rahul K - Life Mission</span>
                        <span className="badge blue">Collected</span>
                    </li>
                    <li className="flex-between">
                        <span style={{ fontWeight: 500 }}>Akhil M - Krishi Subsidy</span>
                        <span className="badge" style={{ background: '#FEF7E0', color: '#E37400' }}>Pending</span>
                    </li>
                </ul>
            </div>
        </main>
    </section>
);
