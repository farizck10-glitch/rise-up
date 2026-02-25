import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Check, QrCode, Download, ChevronRight, Info, FileText, Landmark, Map, Upload, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

export default function DigitalIDModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1: Invite, 2: Form, 3: Camera, 4: Generated Card

    // Form Data
    const [formData, setFormData] = useState({
        name: user?.name || '',
        houseInfo: '',
        wardNo: '',
        bloodGroup: ''
    });

    const [photoDataDataUrl, setPhotoDataDataUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState('');

    // Photo & Cropper States
    const [photoMethod, setPhotoMethod] = useState(null); // 'camera' or 'upload'
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const fileInputRef = useRef(null);

    // Camera Refs
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    // Reset when opened
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setPhotoDataDataUrl(null);
            setIsCameraActive(false);
            setGeneratedId('');
            setPhotoMethod(null);
            setImageToCrop(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
        }
    }, [isOpen]);

    // Handle Camera stream
    useEffect(() => {
        if (step === 3 && photoMethod === 'camera' && !imageToCrop && !isCameraActive) {
            startCamera();
        }
        return () => {
            if (isCameraActive) stopCamera();
        };
    }, [step, photoMethod, imageToCrop]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (err) {
            alert("Unable to access camera. Please allow camera permissions.");
            setStep(2); // Go back if denied
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setIsCameraActive(false);
        }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setImageToCrop(dataUrl);
            stopCamera();
        }
    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const confirmCrop = async () => {
        try {
            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
            setPhotoDataDataUrl(croppedImage);
            generateCard();
        } catch (e) {
            console.error(e);
            alert("Failed to crop image.");
        }
    };

    const generateCard = () => {
        const uniqueId = `WRD-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
        setGeneratedId(uniqueId);
        setStep(4);
    };

    const handleDownload = async () => {
        const element = document.getElementById('digital-id-card');
        if (!element) return;

        try {
            const canvas = await html2canvas(element, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            const cardWidth = pdfWidth - (margin * 2);
            const cardHeight = (canvas.height * cardWidth) / canvas.width;

            pdf.setFontSize(18);
            pdf.text('DIGITAL RESIDENT ID CARD', pdfWidth / 2, margin + 5, { align: 'center' });
            pdf.setFontSize(14);
            pdf.setTextColor(100, 100, 100);
            pdf.text('ആനക്കയം ഗ്രാമപഞ്ചായത്ത് - വാർഡ് 18', pdfWidth / 2, margin + 12, { align: 'center' });

            pdf.addImage(imgData, 'PNG', margin, margin + 20, cardWidth, cardHeight);

            pdf.save(`Ward_ID_${formData.name.replace(/\s+/g, '_')}.pdf`);
            onClose();
        } catch (error) {
            console.error('Error generating PDF', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => { stopCamera(); onClose(); }}
                        className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-slate-700 hover:bg-black/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Step 1: Invite Pop-up */}
                    {step === 1 && (
                        <div className="p-8 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-6 shadow-inner">
                                <QrCode className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight mb-2">Digital Ward ID</h2>
                            <p className="text-sm text-slate-500 font-medium mb-8">
                                Generate your official smart ward resident ID card. It’s quick, secure, and stored directly on your phone.
                            </p>
                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                Generate Now <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Data Collection */}
                    {step === 2 && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight mb-1">Resident Details</h2>
                            <p className="text-xs text-slate-500 mb-6">Please confirm your information.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">House Name / Number</label>
                                    <input
                                        type="text"
                                        value={formData.houseInfo}
                                        onChange={(e) => setFormData({ ...formData, houseInfo: e.target.value })}
                                        className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Rose Villa, 4B"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Ward No</label>
                                        <input
                                            type="number"
                                            value={formData.wardNo}
                                            onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                            placeholder="e.g. 10"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Blood Group</label>
                                        <select
                                            value={formData.bloodGroup}
                                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        >
                                            <option value="" className="text-slate-400">Select Blood Group</option>
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
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (formData.name && formData.houseInfo && formData.wardNo && formData.bloodGroup) {
                                        setStep(3);
                                        setPhotoMethod('camera');
                                    } else {
                                        alert("Please fill all fields.");
                                    }
                                }}
                                className="w-full mt-8 bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
                            >
                                Continue <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Step 3: Photo Selection & Capture */}
                    {step === 3 && (
                        <div className="p-6 flex flex-col items-center">


                            {photoMethod === 'camera' && !imageToCrop && (
                                <>
                                    <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight mb-2">Take a Photo</h2>
                                    <p className="text-xs text-slate-500 mb-6 text-center">Look straight into the camera and ensure good lighting.</p>

                                    <div className="w-56 h-56 rounded-[2rem] overflow-hidden bg-slate-100 border-4 border-slate-200 relative shadow-inner mb-8">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="w-full h-full object-cover scale-110"
                                        />
                                        <canvas ref={canvasRef} className="hidden" />
                                    </div>

                                    <button
                                        onClick={handleCapture}
                                        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 ring-4 ring-blue-100 active:scale-95"
                                    >
                                        <Camera className="w-7 h-7" />
                                    </button>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4">Capture</p>
                                </>
                            )}

                            {imageToCrop && (
                                <>
                                    <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight mb-2">Adjust Photo</h2>
                                    <p className="text-xs text-slate-500 mb-6 text-center">Pinch or scroll to zoom. Drag to reposition.</p>

                                    <div className="w-full h-64 relative bg-slate-900 rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                                        <Cropper
                                            image={imageToCrop}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1} // Square aspect ratio for ID card profile picture
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                            cropShape="round"
                                            showGrid={false}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Zoom Adjust</p>
                                        <input
                                            type="range"
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            onChange={(e) => setZoom(e.target.value)}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-6"
                                        />
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <button
                                            onClick={() => {
                                                setImageToCrop(null);
                                                startCamera();
                                            }}
                                            className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-colors text-sm"
                                        >
                                            Retake
                                        </button>
                                        <button
                                            onClick={confirmCrop}
                                            className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" /> Looks Good
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Step 4: Generated Card */}
                    {step === 4 && (
                        <div className="bg-slate-50 p-6 flex flex-col items-center relative">
                            {/* Confetti / Success Indicator */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-500/20 to-transparent"></div>

                            <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight mb-6 relative z-10 flex items-center gap-2">
                                <Check className="w-6 h-6 text-green-500" /> ID Generated!
                            </h2>

                            {/* The Actual ID Card Design */}
                            <div id="digital-id-card" className="w-full bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 rounded-[1.5rem] p-5 text-white shadow-2xl relative overflow-hidden mb-6 border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 z-0"></div>

                                <div className="flex justify-between items-center mb-5 relative z-10 border-b border-white/20 pb-3">
                                    {/* LSGD Logo */}
                                    <div className="flex items-center justify-center shrink-0">
                                        <img src="/lsgd_logo.png" alt="LSGD Logo" className="h-[60px] w-auto object-contain" />
                                    </div>

                                    {/* Header Details */}
                                    <div className="flex-1 text-center px-2">
                                        <h3 className="text-[14px] md:text-[16px] font-black font-sans tracking-wide uppercase mb-0.5 text-white leading-tight">Digital Resident ID Card</h3>
                                        <p className="text-[12px] md:text-[13px] font-bold font-malayalam tracking-wider text-indigo-100 leading-tight">ആനക്കയം ഗ്രാമപഞ്ചായത്ത് - വാർഡ് 18</p>
                                    </div>

                                    {/* Panchayat Logo */}
                                    <div className="flex items-center justify-center shrink-0">
                                        <img src="/panchayat_logo.png" alt="Panchayat Logo" className="h-[60px] w-auto object-contain" />
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center mb-4 relative z-10">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg shrink-0 bg-[#ffffff1a]">
                                        {photoDataDataUrl && <img src={photoDataDataUrl} alt="Profile" className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-bold mb-0.5">Name</p>
                                        <p className="font-bold text-base leading-tight mb-2 break-words">{formData.name}</p>

                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-[8px] text-indigo-200 uppercase tracking-widest font-bold mb-0.5">Blood</p>
                                                <p className="font-bold text-rose-300 text-sm break-words">{formData.bloodGroup}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] text-indigo-200 uppercase tracking-widest font-bold mb-0.5">Ward</p>
                                                <p className="font-bold text-white text-sm break-words">{formData.wardNo}</p>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[8px] text-indigo-200 uppercase tracking-widest font-bold mb-0.5">ID No.</p>
                                                <p className="font-mono text-xs font-bold tracking-wider break-words">{generatedId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/20 pt-3 mt-1 flex justify-between items-end relative z-10">
                                    <div className="flex-1 pr-2 min-w-0">
                                        <p className="text-[8px] text-indigo-200 uppercase tracking-widest font-bold mb-0.5">House / Address</p>
                                        <p className="text-xs font-medium text-white break-words">{formData.houseInfo}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white rounded-lg p-1 shrink-0">
                                        {/* Auto-generated QR via external API using the unique ID */}
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${generatedId}`} alt="QR Code" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-lg"
                            >
                                <FileText className="w-5 h-5" /> Download as PDF
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
