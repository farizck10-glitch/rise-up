import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("App Error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col h-screen w-full bg-[#f8fafc] items-center justify-center p-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2rem] p-8 shadow-floating border border-red-100 max-w-sm flex flex-col items-center"
                    >
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 font-malayalam mb-2">ക്ഷമിക്കണം, ഒരു തകരാർ സംഭവിച്ചു</h2>
                        <p className="text-sm font-bold text-slate-400 font-sans uppercase tracking-widest mb-6">Please try again</p>
                        <p className="text-slate-600 font-malayalam text-sm mb-8 leading-relaxed">
                            നെറ്റ്‌വർക്ക് പ്രശ്നമോ സാങ്കേതിക തകരാറോ ആകാം കാരണം. ദയവായി പേജ് റീലോഡ് ചെയ്യുക.
                        </p>
                        <button
                            onClick={this.handleReload}
                            className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-8 py-3 rounded-xl font-bold font-malayalam flex items-center gap-2 transition-colors w-full justify-center"
                        >
                            <RefreshCw className="w-4 h-4" /> റീലോഡ് ചെയ്യുക (Reload)
                        </button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
