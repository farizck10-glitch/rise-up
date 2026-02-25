import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Image as ImageIcon, Mic } from 'lucide-react';

// Predefined mock responses for the assistant
const faqResponses = {
    "മാലിന്യ ശേഖരണം എപ്പോഴാണ്?": "മാലിന്യ ശേഖരണം എല്ലാ ബുധനാഴ്ചയും രാവിലെ 7:00 മണിക്ക് ആരംഭിക്കും. (Waste collection starts every Wednesday at 7:00 AM.)",
    "പുതിയ പദ്ധതികൾ എന്തൊക്കെയാണ്?": "നിലവിൽ 2 വലിയ പദ്ധതികൾ പുരോഗമിക്കുന്നു: റോഡ് പണി, സോളാർ ലൈറ്റ് സ്ഥാപിക്കൽ. കൂടുതൽ വിവരങ്ങൾക്ക് 'നമ്മുടെ വാർഡ്' പേജ് സന്ദർശിക്കുക. (Currently 2 major projects are ongoing. Visit 'Our Ward' for details.)",
    "പരാതികൾ എങ്ങനെ നൽകാം?": "'സ്മാർട്ട് വാർഡ്' മെനുവിൽ പോയി പുതിയ പരാതി നൽകാം. അല്ലെങ്കിൽ ഇവിടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യാം. (Go to 'Smart Ward' menu to submit a complaint, or upload a photo here.)"
};

const aiGreeting = "നമസ്കാരം! ഞാൻ റൈസ് അപ്പ് AI സഹായി. നിങ്ങൾക്ക് എങ്ങനെയാണ് ഞാൻ സഹായമാകേണ്ടത്?";

let nextId = 2;

export default function AIAssistant({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: aiGreeting, sender: 'ai' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        const newMsg = { id: nextId++, text: text, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInputText("");
        setIsTyping(true);

        // Mock AI thinking
        setTimeout(() => {
            let aiResponse = "ക്ഷമിക്കണം, എനിക്ക് അത് മനസ്സിലായില്ല. പ്രവർത്തനങ്ങൾ മെച്ചപ്പെടുത്താൻ ഞങ്ങൾ ശ്രമിക്കുന്നു. (Sorry, I didn't understand that.)";

            // FAQ Matching
            if (faqResponses[text]) {
                aiResponse = faqResponses[text];
            } else if (text.includes("broken") || text.includes("തകരാർ") || text.includes("light")) {
                aiResponse = "നിങ്ങളുടെ പരാതി സ്വീകരിച്ചു. വിഷയം: 'സ്ട്രീറ്റ് ലൈറ്റ് തകരാർ'. വാർഡ് മെമ്പർക്ക് കൈമാറിയിട്ടുണ്ട്. (Complaint accepted. Subject: 'Street Light Issue'. Forwarded to Ward Member.)";
            }

            const nextAiMsgId = nextId++;
            setMessages(prev => [...prev, { id: nextAiMsgId, text: aiResponse, sender: 'ai' }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleVoice = () => {
        setIsRecording(true);
        // Mock voice recording delay
        setTimeout(() => {
            setIsRecording(false);
            handleSend("മാലിന്യ ശേഖരണം എപ്പോഴാണ്?");
        }, 2000);
    };

    const handleImageUpload = () => {
        setIsTyping(true);
        // Add a mock user image message (we'll just use a placeholder text for now)
        const userImgMsgId = nextId++;
        setMessages(prev => [...prev, { id: userImgMsgId, text: "[Image Uploaded] - Broken Streetlight", sender: 'user', isImage: true }]);

        // Mock AI analysis
        setTimeout(() => {
            const aiImgMsgId = nextId++;
            setMessages(prev => [...prev, {
                id: aiImgMsgId,
                text: "AI Analysis: Broken Streetlight detected.\nCategory: Infrastructure 🚧.\nDo you want me to register this complaint? (ചിത്രം വിശകലനം ചെയ്തു... പരാതി രേഖപ്പെടുത്തട്ടെ?)",
                sender: 'ai'
            }]);
            setIsTyping(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[110] max-w-md mx-auto h-[80vh] bg-slate-50 flex flex-col overflow-hidden rounded-t-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)]"
                    >
                        {/* Header */}
                        <div className="bg-purple-600 p-6 rounded-t-[2.5rem] flex items-center justify-between sticky top-0 z-10 shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Sparkles className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold font-malayalam tracking-tight leading-tight">റൈസ് അപ്പ് AI സഹായി</h3>
                                    <p className="text-purple-100 text-[10px] font-sans uppercase tracking-widest font-bold mt-0.5">Rise Up AI Assistant</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto w-full flex flex-col p-6 gap-4">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white text-slate-700 border border-purple-100 rounded-bl-sm'
                                        }`}>
                                        <p className="text-sm md:text-base font-medium whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex w-full justify-start"
                                >
                                    <div className="bg-white border border-purple-100 rounded-2xl p-4 rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (FAQ) */}
                        <div className="px-6 py-2 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
                            {Object.keys(faqResponses).map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(q)}
                                    className="inline-block px-4 py-2 bg-purple-100/50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                                <button
                                    onClick={handleImageUpload}
                                    className="p-2 text-slate-400 hover:text-purple-600 transition-colors"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                </button>

                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
                                    placeholder="ചോദിക്കൂ... (Ask me...)"
                                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium text-slate-700"
                                />

                                <AnimatePresence mode="wait">
                                    {inputText.trim() ? (
                                        <motion.button
                                            key="send"
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            onClick={() => handleSend(inputText)}
                                            className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors active:scale-95"
                                        >
                                            <Send className="w-4 h-4 ml-1" />
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            key="mic"
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            onClick={handleVoice}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors active:scale-95 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                                                }`}
                                        >
                                            <Mic className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
