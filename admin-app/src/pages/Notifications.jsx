import React, { useState } from 'react';
import { Send, Bell, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const Notifications = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.body) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // In a real Firebase setup, this would either:
        // 1. Write to a 'notifications_queue' collection that a Cloud Function listens to
        // 2. Or call an HTTP Callable Firebase Function

        try {
            // Simulating a network request for the UI
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Push Notification triggered successfully!");
            setFormData({ title: '', body: '' }); // Reset
        } catch (error) {
            console.error("Error sending notification:", error);
            toast.error("Failed to send notification.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slateDark">Push Notifications / നോട്ടിഫിക്കേഷനുകൾ</h2>
                            <p className="text-sm text-slate-500">Broadcast messages to all installed Main App users. / എല്ലാവർക്കും അറിയിപ്പുകൾ അയക്കുക.</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-8">

                    <div className="md:col-span-3 space-y-5">
                        <form onSubmit={handleSend} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slateDark mb-1">Notification Title / തലക്കെട്ട്</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength={50}
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark outline-none"
                                    placeholder="e.g. Ward 18 Meeting Setup"
                                />
                                <p className="text-xs text-slate-400 mt-1.5 text-right">{formData.title.length}/50</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slateDark mb-1">Message Body / മെസ്സേജ്</label>
                                <textarea
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    rows="4"
                                    maxLength={150}
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark resize-none outline-none"
                                    placeholder="e.g. Reminder: The monthly Gramasabha meeting starts today at 5 PM at the Library Hall."
                                />
                                <p className="text-xs text-slate-400 mt-1.5 text-right">{formData.body.length}/150</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !formData.title || !formData.body}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Send Broadcast / അയക്കുക</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center h-full text-center space-y-4">
                            <Smartphone className="w-12 h-12 text-slate-300 mb-2" />
                            <h4 className="font-bold text-slateDark">Preview / പ്രിവ്യൂ</h4>
                            <p className="text-sm text-slate-500 mb-4">This is how it will appear on User devices.</p>

                            <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-left relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center">
                                        <span className="text-[8px]">☀️</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rise Up App • Now</span>
                                </div>
                                <h5 className="font-bold text-sm text-slateDark truncate">{formData.title || 'Notification Title'}</h5>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                    {formData.body || 'The main message body text goes here. Keep it concise.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Notifications;
