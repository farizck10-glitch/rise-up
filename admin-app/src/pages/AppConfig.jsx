import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Settings as SettingsIcon, Save, Eye, EyeOff, Link as LinkIcon, Type, Image as ImageIcon } from 'lucide-react';

const DEFAULTS = {
    home: {
        title: 'Ward 18 Panayi',
        welcomeMessage: 'Welcome to our digital ward.',
        bannerUrl: '',
        mainButton: { label: 'Explore Services', url: '/services', isVisible: true },
        newsVisible: true,
    },
    about: {
        title: 'About Ward 18',
        description: 'Information about the member and ward activities.',
        memberImage: '',
        contactButton: { label: 'Contact Us', url: '/contact', isVisible: true },
    },
    services: {
        title: 'E-Services',
        description: 'Access all online services easily.',
        applyButton: { label: 'Apply Now', url: '/schemes', isVisible: true },
    }
};

const AppConfig = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [configData, setConfigData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'app_config', 'pages'), (docSnap) => {
            if (docSnap.exists()) {
                setConfigData(docSnap.data());
            } else {
                setConfigData(DEFAULTS);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (page, field, value, nestedField = null) => {
        setConfigData(prev => {
            const newConfig = { ...prev };
            if (!newConfig[page]) newConfig[page] = { ...DEFAULTS[page] };

            if (nestedField) {
                newConfig[page][field] = { ...newConfig[page][field], [nestedField]: value };
            } else {
                newConfig[page][field] = value;
            }
            return newConfig;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'app_config', 'pages'), configData, { merge: true });
            toast.success("Page Configurations Saved Successfully! / സേവ് ചെയ്തു.");
        } catch (error) {
            console.error("Config save error:", error);
            toast.error("Failed to save configuration.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-slate-500">Loading Configuration...</div>;

    const currentData = configData[activeTab] || DEFAULTS[activeTab];

    const renderToggle = (label, value, onChange) => (
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-3">
                {value ? <Eye className="w-5 h-5 text-blue-600" /> : <EyeOff className="w-5 h-5 text-slate-400" />}
                <span className="font-medium text-slateDark">{label}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={value} onChange={(e) => onChange(e.target.checked)} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );

    const renderInput = (label, value, onChange, icon, isTextarea = false) => (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-slateDark">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pt-3 pointer-events-none text-slate-400 h-full items-start">
                    {icon}
                </div>
                {isTextarea ? (
                    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slateDark resize-none"></textarea>
                ) : (
                    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slateDark" />
                )}
            </div>
        </div>
    );

    const renderButtonConfig = (label, buttonData, onChangeLabel, onChangeUrl, onToggleVisibility) => (
        <div className="space-y-4 bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="font-bold text-slateDark border-b pb-2 mb-2">Button Config: {label}</h4>
            {renderToggle("Show Button / ബട്ടൺ കാണിക്കുക", buttonData.isVisible, onToggleVisibility)}
            {renderInput("Button Label / ബട്ടണിന്റെ പേര്", buttonData.label, onChangeLabel, <Type className="w-4 h-4" />)}
            {renderInput("Action Link / ലിങ്ക് (URL)", buttonData.url, onChangeUrl, <LinkIcon className="w-4 h-4" />)}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <SettingsIcon className="w-6 h-6 mr-2" /> Global CMS / വെബ്സൈറ്റ് മാനേജർ
                    </h1>
                    <p className="text-blue-100 text-sm mt-1">Control Main App Pages, Buttons & Content / ആപ്പിലെ വിവരങ്ങൾ മാറ്റാൻ</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-white text-blue-700 px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-md flex items-center shrink-0 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50/50 overflow-x-auto">
                    {['home', 'about', 'services'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab} Page
                        </button>
                    ))}
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {activeTab === 'home' && (
                        <>
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-slateDark">Text & Media</h3>
                                {renderInput("Hero Title / പ്രധാന തലക്കെട്ട്", currentData.title || '', (val) => handleChange('home', 'title', val), <Type className="w-4 h-4" />)}
                                {renderInput("Welcome Message / സന്ദേശം", currentData.welcomeMessage || '', (val) => handleChange('home', 'welcomeMessage', val), <Type className="w-4 h-4" />, true)}
                                {renderInput("Main Banner Image URL / ബാനർ ചിത്രം", currentData.bannerUrl || '', (val) => handleChange('home', 'bannerUrl', val), <ImageIcon className="w-4 h-4" />)}
                            </div>
                            <div className="space-y-5 pt-4 border-t border-slate-100">
                                <h3 className="text-lg font-bold text-slateDark flex items-center justify-between">
                                    Feature Visibility / സെക്ഷനുകൾ കാണിക്കുകയോ മറക്കുകയോ ചെയ്യാം
                                </h3>
                                {renderToggle("Show Breaking News Section", currentData.newsVisible, (val) => handleChange('home', 'newsVisible', val))}
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                {renderButtonConfig("Main Hero Button", currentData.mainButton || DEFAULTS.home.mainButton,
                                    (val) => handleChange('home', 'mainButton', val, 'label'),
                                    (val) => handleChange('home', 'mainButton', val, 'url'),
                                    (val) => handleChange('home', 'mainButton', val, 'isVisible')
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'about' && (
                        <>
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-slateDark">Text & Media</h3>
                                {renderInput("About Title / തലക്കെട്ട്", currentData.title || '', (val) => handleChange('about', 'title', val), <Type className="w-4 h-4" />)}
                                {renderInput("Description / വിവരണം", currentData.description || '', (val) => handleChange('about', 'description', val), <Type className="w-4 h-4" />, true)}
                                {renderInput("Member Profile Image URL", currentData.memberImage || '', (val) => handleChange('about', 'memberImage', val), <ImageIcon className="w-4 h-4" />)}
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                {renderButtonConfig("Contact Action Button", currentData.contactButton || DEFAULTS.about.contactButton,
                                    (val) => handleChange('about', 'contactButton', val, 'label'),
                                    (val) => handleChange('about', 'contactButton', val, 'url'),
                                    (val) => handleChange('about', 'contactButton', val, 'isVisible')
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'services' && (
                        <>
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-slateDark">Text Content</h3>
                                {renderInput("Services Page Title / തലക്കെട്ട്", currentData.title || '', (val) => handleChange('services', 'title', val), <Type className="w-4 h-4" />)}
                                {renderInput("Helper Description / വിവരണം", currentData.description || '', (val) => handleChange('services', 'description', val), <Type className="w-4 h-4" />, true)}
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                {renderButtonConfig("Primary Apply Button", currentData.applyButton || DEFAULTS.services.applyButton,
                                    (val) => handleChange('services', 'applyButton', val, 'label'),
                                    (val) => handleChange('services', 'applyButton', val, 'url'),
                                    (val) => handleChange('services', 'applyButton', val, 'isVisible')
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppConfig;
