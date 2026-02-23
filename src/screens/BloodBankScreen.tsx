import React, { useState } from 'react';
import { Filter, User as UserIcon, AlertCircle, CheckCircle, Clock, Phone } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import type { ScreenId, User } from '../types';

interface Props {
    onNavigate: (s: ScreenId) => void;
    onGoBack: () => void;
    currentUser: User | null;
}

const mockDonors = [
    { id: 1, name: "Rahul K", group: "O+", location: "Panayi Center", lastDonation: null, phone: "9876543210" },
    { id: 2, name: "Akhil M", group: "A-", location: "Temple Road", lastDonation: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(), phone: "9876543210" },
    { id: 3, name: "Sreejith P", group: "B+", location: "School Junction", lastDonation: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), phone: "9876543210" },
    { id: 4, name: "Vishnu T", group: "O+", location: "River Side", lastDonation: null, phone: "9876543210" },
    { id: 5, name: "Anand S", group: "AB+", location: "Panayi Center", lastDonation: null, phone: "9876543210" }
];

const isEligible = (lastDonationStr: string | null) => {
    if (!lastDonationStr) return true;
    const diffDays = Math.ceil((Date.now() - new Date(lastDonationStr).getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 90;
};

const BloodBankScreen: React.FC<Props> = ({ onNavigate, onGoBack, currentUser }) => {
    const [activeTab, setActiveTab] = useState<'find' | 'dashboard'>('find');
    const [filterGroup, setFilterGroup] = useState('All');

    // For the sake of mockup, just pick a mock user if logged in
    const myProfile = currentUser ? mockDonors[0] : null;

    const handleTabSwitch = (tab: 'find' | 'dashboard') => {
        if (tab === 'dashboard' && !currentUser) {
            alert('Please login first to access your Donor Dashboard.');
            onNavigate('login');
            return;
        }
        setActiveTab(tab);
    };

    const eligibleDonors = mockDonors.filter(d => {
        const matchesGroup = filterGroup === 'All' || d.group === filterGroup;
        return matchesGroup && isEligible(d.lastDonation);
    });

    return (
        <section className="screen bg-gray active">
            <AppHeader title="Blood Bank" showBack onBackClick={onGoBack} />

            <div className="tabs-container">
                <div
                    className={`tab ${activeTab === 'find' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('find')}
                >
                    Find Donor<br />
                    <small>രക്തം തിരയാൻ</small>
                </div>
                <div
                    className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('dashboard')}
                >
                    My Dashboard<br />
                    <small>ദാതാവിൻ്റെ പ്രൊഫൈൽ</small>
                </div>
            </div>

            <main className="padding-main">
                {activeTab === 'find' && (
                    <div id="tab-find" className="fade-in">
                        <div className="flex-between" style={{ gap: '12px', marginBottom: '20px' }}>
                            <button
                                className="btn-primary-red w-full"
                                style={{ flex: 1, padding: '12px' }}
                                onClick={() => handleTabSwitch('dashboard')}
                            >
                                <UserIcon style={{ width: 20, height: 20 }} /> Manage Profile
                            </button>
                            <button
                                className="btn-primary-red w-full"
                                style={{ flex: 1.5, boxShadow: '0 4px 12px rgba(220,53,69,0.4)' }}
                                onClick={() => {
                                    if (currentUser) onNavigate('blood-request');
                                    else {
                                        alert('Please login first to post a blood request.');
                                        onNavigate('login');
                                    }
                                }}
                            >
                                <AlertCircle style={{ width: 20, height: 20 }} /> SOS Request
                            </button>
                        </div>

                        <div className="search-bar mb-4">
                            <Filter className="text-muted" style={{ width: 20, height: 20 }} />
                            <select
                                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent' }}
                                value={filterGroup}
                                onChange={e => setFilterGroup(e.target.value)}
                            >
                                <option value="All">All Blood Groups (എല്ലാ)</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div id="donor-list">
                            {eligibleDonors.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No eligible donors found.</p>
                            ) : (
                                eligibleDonors.map(d => (
                                    <div key={d.id} className="card donor-card" style={{ borderLeft: '4px solid var(--primary-red)' }}>
                                        <div className="donor-info">
                                            <div className="blood-group">{d.group}</div>
                                            <div>
                                                <h4>{d.name}</h4>
                                                <span>{d.location}</span><br />
                                                <span className="badge blue" style={{ marginTop: '4px', display: 'inline-block' }}>Available Now</span>
                                            </div>
                                        </div>
                                        <button className="icon-btn call-btn">
                                            <Phone style={{ width: 20, height: 20 }} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' && myProfile && (
                    <div id="tab-dashboard" className="fade-in">
                        <div className="card" style={{ borderTop: '4px solid var(--primary-red)', padding: '24px 16px', textAlign: 'center' }}>
                            <div className="blood-group-large mb-2">{myProfile.group}</div>
                            <h3>{currentUser?.name || myProfile.name}</h3>
                            <p className="text-muted mb-4">{myProfile.location} • Ph: {currentUser?.phone || myProfile.phone}</p>

                            {isEligible(myProfile.lastDonation) ? (
                                <>
                                    <div className="status-box status-eligible mb-4">
                                        <CheckCircle style={{ width: 24, height: 24 }} />
                                        You are currently eligible to donate blood.
                                    </div>
                                    <button
                                        className="btn-primary-red w-full mb-4"
                                        onClick={() => alert("Mock: You marked as donated! You're now in 3-month cooldown.")}
                                    >
                                        <CheckCircle style={{ width: 20, height: 20 }} /> Mark Donated Today
                                    </button>
                                </>
                            ) : (
                                <div className="status-box status-cooldown mb-4">
                                    <Clock style={{ width: 24, height: 24 }} />
                                    You are in the 3-month cooldown period.
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.8 }}>
                                        Next eligibility: {new Date(new Date(myProfile.lastDonation!).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            <button className="btn-outline w-full">Edit Profile Details</button>
                        </div>
                    </div>
                )}
            </main>
        </section>
    );
};

export default BloodBankScreen;
