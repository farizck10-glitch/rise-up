import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Image, Smartphone, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Settings = () => {
    const [settings, setSettings] = useState({
        tickerText: '',
        tickerActive: false,
        homeBannerUrl: '',
        maintenanceMode: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Use a singleton document id 'global' for app settings
    const settingsDocRef = doc(db, 'appSettings', 'global');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docSnap = await getDoc(settingsDocRef);
                if (docSnap.exists()) {
                    setSettings(docSnap.data());
                } else {
                    // Initialize if it doesn't exist
                    await setDoc(settingsDocRef, {
                        tickerText: 'Welcome to the Rise Up App.',
                        tickerActive: true,
                        homeBannerUrl: 'https://images.unsplash.com/photo-1596422846543-74c6fc081596?q=80',
                        maintenanceMode: false
                    });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateDoc(settingsDocRef, settings);
            toast.success("Global settings mapped and updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slateDark animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <SettingsIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slateDark">Global App Settings</h2>
                            <p className="text-sm text-slate-500">Control remote data mapped directly to the User App.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center space-x-2 shrink-0"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-10">

                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                            <Smartphone className="w-5 h-5 text-slate-400" />
                            <span>News Ticker Configuration</span>
                        </h3>
                        <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-medium">Enable Ticker on Main App</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="tickerActive" checked={settings.tickerActive} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Scrolling Text Message</label>
                                <textarea
                                    name="tickerText"
                                    value={settings.tickerText}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all outline-none resize-none"
                                    placeholder="e.g. Breaking News: Next Panchayat meeting schedule..."
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                            <Image className="w-5 h-5 text-slate-400" />
                            <span>Hero Banner</span>
                        </h3>
                        <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Primary Banner Image URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="url"
                                        name="homeBannerUrl"
                                        value={settings.homeBannerUrl}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all outline-none"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                {settings.homeBannerUrl && (
                                    <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden h-40 bg-slate-100">
                                        <img src={settings.homeBannerUrl} alt="Banner Preview" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400?text=Invalid+Image+URL" }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-red-600">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span>Danger Zone</span>
                        </h3>
                        <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-red-800">Maintenance Mode</h4>
                                <p className="text-sm text-red-600/80 mt-1 max-w-sm">When enabled, the public app will show a 'down for maintenance' screen to all users.</p>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Settings;
