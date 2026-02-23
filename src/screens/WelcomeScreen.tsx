import React from 'react';
import type { ScreenId } from '../types';

interface Props {
    onNavigate: (s: ScreenId) => void;
}

const WelcomeScreen: React.FC<Props> = ({ onNavigate }) => {
    return (
        <section className="screen active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#FFFFFF', padding: 0, margin: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <img src="/assets/welcome_poster.jpg" alt="Welcome Poster" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom', zIndex: 10 }} />
                <div style={{ position: 'absolute', top: '65%', zIndex: 20, width: '100%', textAlign: 'center' }}>
                    <button className="btn-primary" onClick={() => onNavigate('intro-1')} style={{ boxShadow: '0 4px 12px rgba(10,88,202,0.4)', fontSize: '1.1rem', padding: '14px 28px', borderRadius: '30px', letterSpacing: '0.5px', position: 'relative', zIndex: 21 }}>
                        തുടങ്ങാം (Get Started)
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WelcomeScreen;
