import React from 'react';
import { Home, Droplet, FileText, Download, ShoppingCart, Briefcase, Leaf, AlertTriangle, Phone, LogOut } from 'lucide-react';
import type { ScreenId, User } from '../types';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (screen: ScreenId) => void;
    currentUser: User | null;
    onLogout: () => void;
}

const NavigationDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, onNavigate, currentUser, onLogout }) => {
    const navigateTo = (screen: ScreenId) => {
        onNavigate(screen);
        onClose();
    };

    return (
        <div className={`drawer-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
            <nav className="drawer" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <h3 style={{ marginBottom: '4px' }}>{currentUser?.name || "Guest User"}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{currentUser?.phone ? "Ward 18 Resident" : "Not logged in"}</p>
                </div>
                <ul className="drawer-menu">
                    {menuItems.map((item, idx) => (
                        <li key={idx} onClick={() => navigateTo(item.screen as ScreenId)}>
                            {item.icon} {item.label}
                        </li>
                    ))}
                    <li className="logout" onClick={() => { onLogout(); onClose(); }}>
                        <LogOut style={{ width: 20, height: 20 }} /> Logout
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const menuItems = [
    { label: 'Home', screen: 'home', icon: <Home style={{ width: 20, height: 20 }} /> },
    { label: 'Blood Bank', screen: 'bloodbank', icon: <Droplet style={{ width: 20, height: 20 }} /> },
    { label: 'Panchayat Schemes', screen: 'schemes', icon: <FileText style={{ width: 20, height: 20 }} /> },
    { label: 'Digital Library', screen: 'library', icon: <Download style={{ width: 20, height: 20 }} /> },
    { label: 'Marketplace', screen: 'market', icon: <ShoppingCart style={{ width: 20, height: 20 }} /> },
    { label: 'Jobs', screen: 'jobs', icon: <Briefcase style={{ width: 20, height: 20 }} /> },
    { label: 'ഹരിതകർമ്മ സേന', screen: 'haritha', icon: <Leaf style={{ width: 20, height: 20 }} /> },
    { label: 'Grievances', screen: 'grievances', icon: <AlertTriangle style={{ width: 20, height: 20 }} /> },
    { label: 'Emergency', screen: 'emergency', icon: <Phone style={{ width: 20, height: 20 }} /> },
];

export default NavigationDrawer;
