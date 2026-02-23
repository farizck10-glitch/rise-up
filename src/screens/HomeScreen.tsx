import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Landmark, FileDown, ShoppingBag, Briefcase, Leaf, AlertTriangle, Phone, Bus, BookOpen, Heart, Users, Wrench } from 'lucide-react';
import type { ScreenId } from '../types';

interface Props {
    onNavigate: (s: ScreenId) => void;
    onToggleDrawer: () => void;
}

const HomeScreen: React.FC<Props> = ({ onNavigate, onToggleDrawer }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { src: 'https://picsum.photos/800/400?random=1', caption: 'വാർഡ് 18 വികസന പദ്ധതികൾ' },
        { src: 'https://picsum.photos/800/400?random=2', caption: 'പുതിയ റോഡ് നിർമ്മാണം' },
        { src: 'https://picsum.photos/800/400?random=3', caption: 'നവീകരിച്ച പാർക്ക്' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="screen bg-gray active" id="app-container">
            <header className="app-header">
                <button className="icon-btn" onClick={onToggleDrawer}><i data-lucide="menu"></i></button>
                <img src="./assets/logo.jpg" alt="Rise Up Panayi Logo" className="header-logo" />
                <button className="icon-btn"><i data-lucide="bell"></i></button>
            </header>

            {/* News Ticker */}
            <div className="news-ticker">
                <div className="ticker-content slow">
                    <span>📢 അടിയന്തര അറിയിപ്പ്: നാളെ രാവിലെ 9 മണി മുതൽ 5 മണി വരെ വൈദ്യുതി മുടങ്ങുന്നതാണ്. </span>
                    <span>📢 വാർഡ് സഭ ഞായറാഴ്ച വൈകുന്നേരം 4 മണിക്ക് അംഗൻവാടിയിൽ നടക്കും. </span>
                </div>
            </div>

            <main className="home-main">
                {/* Image Slider */}
                <div className="slider-container card" id="home-slider">
                    <div className="slider-track" id="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, i) => (
                            <div key={i} className={`slide ${currentSlide === i ? 'active' : ''}`}>
                                <img src={slide.src} alt="Slide" onError={e => e.currentTarget.src = '/assets/logo.jpg'} />
                                <div className="slider-caption">{slide.caption}</div>
                            </div>
                        ))}
                    </div>

                    <button className="slider-nav prev" onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}>
                        <ChevronLeft style={{ width: 20, height: 20 }} />
                    </button>
                    <button className="slider-nav next" onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}>
                        <ChevronRight style={{ width: 20, height: 20 }} />
                    </button>

                    <div className="slider-dots" id="slider-dots">
                        {slides.map((_, i) => (
                            <div key={i} className={`slider-dot ${currentSlide === i ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></div>
                        ))}
                    </div>
                </div>

                {/* Blood Bank Featured Card */}
                <div className="featured-card blood-bank-card card" onClick={() => onNavigate('bloodbank')}>
                    <div className="card-content">
                        <h3><i data-lucide="droplet" className="icon-red"></i> Blood Bank</h3>
                        <p>അടിയന്തര രക്തദാന സഹായം</p>
                    </div>
                    <button className="btn-sos">SOS</button>
                </div>

                {/* Service Grid */}
                <h3 className="section-title">Services (സേവനങ്ങൾ)</h3>
                <div className="service-grid">
                    <div className="service-item card" onClick={() => onNavigate('schemes')}>
                        <div className="icon-wrapper blue"><Landmark /></div>
                        <span>പദ്ധതികൾ</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('library')}>
                        <div className="icon-wrapper green"><FileDown /></div>
                        <span>ഫോമുകൾ</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('market')}>
                        <div className="icon-wrapper orange"><ShoppingBag /></div>
                        <span>വിപണി</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('jobs')}>
                        <div className="icon-wrapper purple"><Briefcase /></div>
                        <span>തൊഴിൽ</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('haritha')}>
                        <div className="icon-wrapper green" style={{ background: '#E6F4EA', color: '#137333' }}>
                            <Leaf />
                        </div>
                        <span>ഹരിതകർമ്മ സേന</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('grievances')}>
                        <div className="icon-wrapper red"><AlertTriangle /></div>
                        <span>പരാതികൾ</span>
                    </div>
                    <div className="service-item card" onClick={() => onNavigate('emergency')}>
                        <div className="icon-wrapper blue"><Phone /></div>
                        <span>എമർജൻസി</span>
                    </div>
                    <div className="service-item card" onClick={() => alert('ഗതാഗതം പേജ് നിർമ്മാണത്തിലാണ്')}>
                        <div className="icon-wrapper green"><Bus /></div>
                        <span>ഗതാഗതം</span>
                    </div>
                    <div className="service-item card" onClick={() => alert('വിദ്യാഭ്യാസം പേജ് നിർമ്മാണത്തിലാണ്')}>
                        <div className="icon-wrapper orange"><BookOpen /></div>
                        <span>വിദ്യാഭ്യാസം</span>
                    </div>
                    <div className="service-item card" onClick={() => alert('ആരോഗ്യം പേജ് നിർമ്മാണത്തിലാണ്')}>
                        <div className="icon-wrapper purple"><Heart /></div>
                        <span>ആരോഗ്യം</span>
                    </div>
                    <div className="service-item card" onClick={() => alert('അയൽക്കൂട്ടം പേജ് നിർമ്മാണത്തിലാണ്')}>
                        <div className="icon-wrapper yellow"><Users /></div>
                        <span>അയൽക്കൂട്ടം</span>
                    </div>
                    <div className="service-item card" onClick={() => alert('സേവനങ്ങൾ പേജ് നിർമ്മാണത്തിലാണ്')}>
                        <div className="icon-wrapper blue"><Wrench /></div>
                        <span>മറ്റു സേവനങ്ങൾ</span>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default HomeScreen;
