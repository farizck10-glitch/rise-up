import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Auth Guard
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Determine Page Title
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('/workers')) return 'Workers Management / തൊഴിലാളികൾ';
        if (path.includes('/schemes')) return 'Schemes Management / സ്കീമുകൾ';
        if (path.includes('/users')) return 'User Management / ഉപയോക്താക്കൾ';
        if (path.includes('/pension')) return 'Pension Tracking / പെൻഷൻ വിവരങ്ങൾ';
        if (path.includes('/lights')) return 'Street Light Faults / സ്ട്രീറ്റ് ലൈറ്റ് പരാതികൾ';
        if (path.includes('/emergency')) return 'Emergency Contacts / എമർജൻസി';
        if (path.includes('/notifications')) return 'Push Notifications / അറിയിപ്പുകൾ';
        if (path.includes('/cms')) return 'App CMS Control / ആപ്പ് കൺട്രോൾ';
        if (path.includes('/settings')) return 'Global Settings / സെറ്റിങ്‌സ്';
        return 'System Overview / വിവരങ്ങൾ';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex bg-background min-h-screen text-slateDark overflow-hidden font-sans">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative h-screen">
                <Header
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    title={getPageTitle()}
                />

                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
