import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        otp: '',
        houseName: '',
        area: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = () => {
        if (step === 1 && formData.name && formData.phone.length >= 10) {
            setStep(2); // Simulate OTP sent, moving to OTP step
        } else if (step === 2 && formData.otp.length >= 4) {
            setStep(3); // OTP verified, moving to House details
        } else if (step === 3 && formData.houseName && formData.area) {
            login();
            navigate('/dashboard'); // Final step
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white p-6 justify-between lg:items-center">
            <div className="pt-8 w-full lg:max-w-xl">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex space-x-2 mb-6">
                        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-slate-100'}`} />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 font-sans tracking-tight">
                        {step === 1 ? 'Create Account' : step === 2 ? 'Verify Phone' : 'Your Details'}
                    </h1>
                    <p className="text-slate-500 mt-2 font-sans lg:text-lg">
                        {step === 1 ? 'Enter your basic details to start' : step === 2 ? 'We sent a 4-digit code to your phone' : 'Help us locate your ward area'}
                    </p>
                </motion.div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                >
                    {step === 1 && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Rahul K"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 py-3.5 rounded-l-2xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 font-medium">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="98765 43210"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3.5 rounded-r-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-sans"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">OTP Code</label>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter 4-digit code"
                                maxLength={4}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-sans text-center tracking-widest text-lg font-bold"
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">House Name</label>
                                <input
                                    type="text"
                                    name="houseName"
                                    value={formData.houseName}
                                    onChange={handleChange}
                                    placeholder="Enter house/building name"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Ward & Locality</label>
                                <input
                                    type="text"
                                    value="Ward 18 - Panayi"
                                    readOnly
                                    className="w-full bg-slate-100 cursor-not-allowed border border-slate-200 text-slate-600 font-semibold px-4 py-3.5 rounded-2xl focus:outline-none transition-all font-sans"
                                />
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pb-8 w-full lg:max-w-xl"
            >
                <button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-2xl text-[16px] font-bold shadow-xl shadow-blue-100/50 hover:bg-opacity-90 transition-all active:scale-[0.98] flex items-center justify-center"
                >
                    {step === 1 ? 'Get OTP' : step === 2 ? 'Verify & Continue' : 'Complete Setup'}
                </button>
            </motion.div>
        </div>
    );
}
