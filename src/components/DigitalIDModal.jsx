import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Check, QrCode, Download, ChevronRight, Info, FileText, Landmark, Map, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

export default function DigitalIDModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1: Invite, 2: Form, 3: Camera, 4: Generated Card
    const [isLoading, setIsLoading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        houseName: '',
        houseNumber: '',
        address: '',
        dob: '',
        phone: '',
        wardNo: '18',
        bloodGroup: '',
        occupation: ''
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
    const [cameraError, setCameraError] = useState(null);

    // Validation helper — only text fields required in Step 2
    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.houseName.trim() &&
            formData.houseNumber.trim() &&
            formData.address.trim() &&
            formData.dob &&
            formData.phone.trim().length === 10 &&
            /^\d{10}$/.test(formData.phone.trim()) &&
            formData.bloodGroup &&
            formData.occupation
        );
    };

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
            setFormData({ name: '', houseName: '', houseNumber: '', address: '', dob: '', phone: '', wardNo: '18', bloodGroup: '', occupation: '' });
        }
    }, [isOpen]);

    // Handle Camera stream — auto-start on step 3
    useEffect(() => {
        if (step === 3 && !photoDataDataUrl) {
            setCameraError(null);
            startCamera();
        }
        if (step !== 3) {
            stopCamera();
        }
    }, [step, photoDataDataUrl]);

    const startCamera = async () => {
        setCameraError(null);
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setCameraError('Your browser does not support camera access.');
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 640 },
                },
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(() => { });
                };
                setIsCameraActive(true);
            } else {
                // Video ref not ready, stop tracks
                stream.getTracks().forEach(t => t.stop());
            }
        } catch (err) {
            console.error('Camera error:', err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setCameraError('Please allow camera access to take your ID photo.');
            } else if (err.name === 'NotFoundError') {
                setCameraError('No camera found on this device.');
            } else {
                setCameraError('Unable to start camera. Please check your device settings.');
            }
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        // Use a square crop from the center of the video
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        // Mirror horizontally (since front camera is mirrored in preview)
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(
            video,
            (video.videoWidth - size) / 2, (video.videoHeight - size) / 2, size, size,
            0, 0, size, size
        );
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        stopCamera();
        setPhotoDataDataUrl(dataUrl);
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

        setIsLoading(true);
        try {
            // Capture at 4× scale for crisp PDF quality
            const canvas = await html2canvas(element, {
                scale: 4,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                imageTimeout: 15000,
                onclone: (doc) => {
                    // Ensure the cloned element is fully visible
                    const el = doc.getElementById('digital-id-card');
                    if (el) el.style.overflow = 'visible';
                },
            });

            const imgData = canvas.toDataURL('image/png');

            // Size PDF exactly to the card aspect ratio in landscape
            const cardW = element.offsetWidth;
            const cardH = element.offsetHeight;
            const pdfW = 210; // A5 landscape width in mm (fits nicely)
            const pdfH = (cardH / cardW) * pdfW;

            const pdf = new jsPDF({
                orientation: cardW > cardH ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [pdfW, pdfH],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);

            const safeName = (formData.name || 'Resident').replace(/[^a-zA-Z0-9]/g, '_');
            pdf.save(`Resident_ID_${safeName}_Ward18.pdf`);

            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3500);
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Could not generate PDF. Please screenshot the card as an alternative.');
        } finally {
            setIsLoading(false);
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
                    className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm md:max-w-[500px] overflow-hidden relative"
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

                    {/* Step 2: Resident Details Form */}
                    {step === 2 && (
                        <div className="flex flex-col" style={{ maxHeight: '75vh' }}>
                            {/* Header */}
                            <div className="px-6 pt-6 pb-3 shrink-0 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">Resident Details</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Fill all fields to generate your Ward ID.</p>
                            </div>

                            {/* Scrollable body */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">


                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                        placeholder="e.g. Rahul K"
                                    />
                                </div>

                                {/* House Name + Number */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">House Name *</label>
                                        <input
                                            type="text"
                                            value={formData.houseName}
                                            onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                            placeholder="Rose Villa"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Panchayat No. *</label>
                                        <input
                                            type="text"
                                            value={formData.houseNumber}
                                            onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                            placeholder="e.g. 4B / 123"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Address *</label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={2}
                                        className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 resize-none"
                                        placeholder="Street, Locality, Pin Code"
                                    />
                                </div>

                                {/* DOB + Phone */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Date of Birth *</label>
                                        <input
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Phone No. *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                setFormData({ ...formData, phone: val });
                                            }}
                                            className={`w-full bg-white shadow-sm border rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${formData.phone && formData.phone.length !== 10
                                                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                                                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                                }`}
                                            placeholder="98765 43210"
                                        />
                                        {formData.phone && formData.phone.length !== 10 && (
                                            <p className="text-[10px] text-red-500 mt-1 font-medium">Enter 10-digit number</p>
                                        )}
                                    </div>
                                </div>

                                {/* Ward (locked) */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Ward</label>
                                    <div className="flex items-center gap-2 w-full bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                                        <span className="text-blue-700 font-bold text-sm">Ward 18 — Panayi</span>
                                        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-100 px-2 py-0.5 rounded-full">Locked</span>
                                    </div>
                                </div>

                                {/* Blood Group + Occupation */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Blood Group *</label>
                                        <select
                                            value={formData.bloodGroup}
                                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        >
                                            <option value="">Select</option>
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Occupation *</label>
                                        <select
                                            value={formData.occupation}
                                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                            className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        >
                                            <option value="">Select</option>
                                            {['Govt. Employee', 'Private Sector', 'Farmer', 'Daily Wage', 'NRK', 'Student', 'Homemaker', 'Self-Employed', 'Retired', 'Others'].map(o => (
                                                <option key={o} value={o}>{o}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Spacer for scroll comfort */}
                                <div className="h-2" />
                            </div>

                            {/* Sticky footer */}
                            <div className="px-6 pb-6 pt-3 shrink-0 border-t border-slate-100 bg-white">
                                <motion.button
                                    onClick={() => {
                                        if (!isFormValid()) return;
                                        setStep(3);
                                    }}
                                    disabled={!isFormValid()}
                                    whileTap={{ scale: !isFormValid() ? 1 : 0.97 }}
                                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700"
                                >
                                    <Camera className="w-5 h-5" />
                                    Take Live Photo
                                </motion.button>
                                {!isFormValid() && (
                                    <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">Fill all fields to continue</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Live Camera — Luxury Glassmorphism */}
                    {step === 3 && (
                        <div className="relative flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-b-[2rem] overflow-hidden" style={{ minHeight: '420px' }}>

                            {/* Decorative glow blobs */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                            {/* Back button */}
                            <button
                                onClick={() => { stopCamera(); setPhotoDataDataUrl(null); setStep(2); }}
                                className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs font-semibold tracking-wide"
                            >
                                <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back
                            </button>

                            {!photoDataDataUrl ? (
                                /* ── LIVE CAMERA VIEW ── */
                                <>
                                    <div className="pt-10 pb-4 text-center px-6 z-10">
                                        <h2 className="text-lg font-black text-white tracking-tight">Live Portrait</h2>
                                        <p className="text-[11px] text-blue-300 mt-0.5 font-medium">Look straight ahead · Good lighting</p>
                                    </div>

                                    {cameraError ? (
                                        /* ── CAMERA ERROR FALLBACK ── */
                                        <div className="z-10 mx-6 mb-8 flex flex-col items-center gap-5">
                                            <div className="w-52 h-52 rounded-full bg-blue-950/70 border-4 border-red-400/30 ring-4 ring-red-500/10 flex flex-col items-center justify-center gap-3 shadow-2xl">
                                                <Camera className="w-10 h-10 text-red-400/70" />
                                                <p className="text-[11px] text-red-300 font-semibold text-center px-4 leading-snug">{cameraError}</p>
                                            </div>
                                            <button
                                                onClick={() => { setCameraError(null); startCamera(); }}
                                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600/80 backdrop-blur-sm border border-blue-400/30 text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-lg"
                                            >
                                                <Camera className="w-4 h-4" /> Try Again
                                            </button>
                                            <button
                                                onClick={() => { setStep(2); }}
                                                className="text-white/50 text-xs font-semibold hover:text-white/80 transition-colors"
                                            >
                                                ← Go Back
                                            </button>
                                        </div>
                                    ) : (
                                        /* ── CAMERA LIVE FEED ── */
                                        <>
                                            {/* Camera frame — glassmorphism border */}
                                            <div className="relative z-10 mb-6">
                                                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-blue-900/60 ring-4 ring-blue-500/30 bg-blue-950">
                                                    <video
                                                        ref={videoRef}
                                                        autoPlay
                                                        playsInline
                                                        muted
                                                        className="w-full h-full object-cover"
                                                        style={{ transform: 'scaleX(-1) scale(1.1)' }}
                                                    />
                                                </div>
                                                {/* Corner accent rings */}
                                                <div className="absolute -inset-2 rounded-full border border-blue-400/20 pointer-events-none" />
                                                <div className="absolute -inset-4 rounded-full border border-blue-400/10 pointer-events-none" />
                                            </div>

                                            <canvas ref={canvasRef} className="hidden" />

                                            {/* Capture button */}
                                            <motion.button
                                                onClick={handleCapture}
                                                whileTap={{ scale: 0.93 }}
                                                className="z-10 relative flex items-center justify-center mb-8"
                                            >
                                                {/* Outer ring */}
                                                <div className="absolute w-20 h-20 rounded-full border-2 border-white/30" />
                                                {/* Shutter button */}
                                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl shadow-blue-900/60">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                        <Camera className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>
                                            </motion.button>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/70 mb-6 z-10">Tap to Capture</p>
                                        </>
                                    )}
                                </>
                            ) : (
                                /* ── PHOTO PREVIEW + RETAKE ── */
                                <>
                                    <div className="pt-10 pb-4 text-center px-6 z-10">
                                        <h2 className="text-lg font-black text-white tracking-tight">Photo Captured</h2>
                                        <p className="text-[11px] text-blue-300 mt-0.5 font-medium">Looking good? Generate your ID card below.</p>
                                    </div>

                                    {/* Preview circle */}
                                    <div className="relative z-10 mb-6">
                                        <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-green-400/50 shadow-2xl shadow-blue-900/60 ring-4 ring-green-500/20">
                                            <img src={photoDataDataUrl} alt="Captured" className="w-full h-full object-cover" />
                                        </div>
                                        {/* Green check badge */}
                                        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 border-2 border-white shadow-lg flex items-center justify-center">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="z-10 w-full px-6 space-y-3 mb-8">
                                        {/* Retake */}
                                        <button
                                            onClick={() => { setPhotoDataDataUrl(null); startCamera(); }}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm text-white/80 text-sm font-semibold hover:bg-white/15 transition-all"
                                        >
                                            <Camera className="w-4 h-4" /> Retake Photo
                                        </button>

                                        {/* Generate ID Card */}
                                        <motion.button
                                            onClick={() => {
                                                setIsLoading(true);
                                                setTimeout(() => {
                                                    setIsLoading(false);
                                                    generateCard();
                                                }, 1000);
                                            }}
                                            disabled={isLoading}
                                            whileTap={{ scale: isLoading ? 1 : 0.97 }}
                                            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-800/50 hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Generating...</span>
                                                    <motion.div
                                                        className="absolute inset-0 bg-white/10"
                                                        animate={{ x: ['-100%', '200%'] }}
                                                        transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity }}
                                                        style={{ skewX: '-20deg' }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <QrCode className="w-5 h-5" />
                                                    Generate Digital ID Card
                                                </>
                                            )}
                                        </motion.button>
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
                            <div id="digital-id-card" className="w-[340px] h-[215px] md:w-[420px] md:h-[265px] rounded-[1.5rem] relative overflow-hidden mb-6 shadow-2xl mx-auto bg-gradient-to-br from-blue-900 via-[#1e3a8a] to-slate-900 text-white flex flex-col p-5 md:p-6 border border-blue-400/20">

                                {/* Background Decorative Glows */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                                {/* Header — 3-Column: Kerala Emblem | Title | Panchayat Logo */}
                                <div className="flex items-center justify-between mb-2 relative z-10 w-full shrink-0 gap-2">

                                    {/* Left: Kerala State Emblem */}
                                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] shrink-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-md flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Emblem_of_Kerala.svg/120px-Emblem_of_Kerala.svg.png"
                                            alt="Kerala Emblem"
                                            className="w-[85%] h-[85%] object-contain"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:bold">KL</span>'; }}
                                        />
                                    </div>

                                    {/* Center: Title */}
                                    <div className="flex-1 text-center px-1">
                                        <h3 className="font-sans font-black text-[10px] md:text-[12px] leading-none text-white tracking-[0.12em] uppercase drop-shadow-md">
                                            Digital Resident ID
                                        </h3>
                                        <div className="mt-0.5 flex items-center justify-center gap-1">
                                            <div className="h-px flex-1 bg-blue-300/30 max-w-[24px]" />
                                            <p className="text-[7px] md:text-[8px] text-blue-200 tracking-widest font-semibold whitespace-nowrap">
                                                Ward 18 — Panayi
                                            </p>
                                            <div className="h-px flex-1 bg-blue-300/30 max-w-[24px]" />
                                        </div>
                                    </div>

                                    {/* Right: Panchayat / Ward Logo */}
                                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] shrink-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-md flex flex-col items-center justify-center overflow-hidden gap-0.5">
                                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-400/80 flex items-center justify-center">
                                            <span className="text-blue-900 font-black text-[7px] md:text-[8px] leading-none">18</span>
                                        </div>
                                        <span className="text-[5px] md:text-[6px] text-blue-200 font-bold tracking-wider leading-none uppercase">Ward</span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex gap-4 md:gap-5 flex-1 relative z-10 min-h-0 py-1">
                                    {/* Photo */}
                                    <div className="w-[75px] md:w-[85px] shrink-0 flex flex-col justify-center h-full">
                                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-md bg-blue-950/50 relative">
                                            {photoDataDataUrl && <img src={photoDataDataUrl} alt="Profile" className="w-full h-full object-cover" />}
                                        </div>
                                    </div>

                                    {/* Data */}
                                    <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-3 min-w-0">
                                        <div>
                                            <p className="text-[8px] md:text-[9px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">Name</p>
                                            <div className="font-bold text-[15px] md:text-[17px] leading-tight text-white drop-shadow-sm truncate">{formData.name}</div>
                                        </div>

                                        <div className="flex justify-between items-end gap-2 pr-1 border-b border-white/10 pb-2">
                                            <div>
                                                <p className="text-[7px] md:text-[8px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">Blood</p>
                                                <div className="font-bold text-white text-[11px] md:text-[13px] leading-none drop-shadow-sm">{formData.bloodGroup}</div>
                                            </div>
                                            <div>
                                                <p className="text-[7px] md:text-[8px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">Ward</p>
                                                <div className="font-bold text-white text-[11px] md:text-[13px] leading-none drop-shadow-sm">{formData.wardNo}</div>
                                            </div>
                                            <div>
                                                <p className="text-[7px] md:text-[8px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">DOB</p>
                                                <div className="font-bold text-white text-[8px] md:text-[10px] leading-none drop-shadow-sm">{formData.dob}</div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[7px] md:text-[8px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">ID No.</p>
                                                <div className="font-mono text-[8px] md:text-[9.5px] font-bold tracking-wider text-white drop-shadow-sm truncate pl-1">{generatedId}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[7px] md:text-[8px] text-blue-300 uppercase tracking-widest font-bold mb-0.5">Occupation</p>
                                            <div className="font-bold text-white text-[10px] md:text-[11px] leading-none drop-shadow-sm truncate">{formData.occupation}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Line */}
                                <div className="mt-auto flex justify-between items-end relative z-10 w-full shrink-0 pt-1">
                                    <div className="flex-1 pr-3 min-w-0 pb-0.5">
                                        <p className="text-[8px] md:text-[9px] text-blue-300 uppercase tracking-widest font-bold mb-1">House / Address</p>
                                        <div className="text-[11px] md:text-[12px] font-bold text-white/90 leading-tight drop-shadow-sm truncate">{formData.houseName} {formData.houseNumber ? `· ${formData.houseNumber}` : ''}</div>
                                    </div>
                                    <div className="w-[42px] h-[42px] md:w-[48px] md:h-[48px] bg-white rounded p-1.5 shrink-0 shadow-lg flex items-center justify-center">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${generatedId}`} alt="QR" className="w-[100%] h-[100%] rounded-[2px]" />
                                    </div>
                                </div>
                            </div>

                            {/* Success Toast */}
                            {downloadSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-2xl shadow-lg mb-3 w-full justify-center"
                                >
                                    <Check className="w-4 h-4" />
                                    PDF Downloaded Successfully!
                                </motion.div>
                            )}

                            <button
                                onClick={handleDownload}
                                disabled={isLoading}
                                className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
                                ) : (
                                    <><FileText className="w-5 h-5" /> Download as PDF</>
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
