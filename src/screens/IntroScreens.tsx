import React from 'react';
import { BellRing, ShoppingBag, HeartPulse, ArrowRight } from 'lucide-react';
import type { ScreenId } from '../types';

interface Props {
    currentScreen: ScreenId;
    onNavigate: (s: ScreenId) => void;
}

const IntroScreens: React.FC<Props> = ({ currentScreen, onNavigate }) => {

    const getNextScreen = () => {
        if (currentScreen === 'intro-1') return 'intro-2';
        if (currentScreen === 'intro-2') return 'intro-3';
        return 'login';
    };

    const getDots = () => {
        return (
            <div className="dots">
                <span className={`dot ${currentScreen === 'intro-1' ? 'active' : ''}`}></span>
                <span className={`dot ${currentScreen === 'intro-2' ? 'active' : ''}`}></span>
                <span className={`dot ${currentScreen === 'intro-3' ? 'active' : ''}`}></span>
            </div>
        );
    };

    const contentData: Record<string, { icon: React.ReactNode, title: string, desc: string }> = {
        'intro-1': {
            icon: <BellRing className="mega-icon text-blue" />,
            title: "Real-time News & Alerts",
            desc: "വാർഡിലെ തത്സമയ വാർത്തകളും അറിയിപ്പുകളും വേഗത്തിൽ അറിയുക.",
        },
        'intro-2': {
            icon: <ShoppingBag className="mega-icon text-blue" />,
            title: "Community Market & Services",
            desc: "നാട്ടിലെ ഉൽപ്പന്നങ്ങൾ വാങ്ങാനും വിൽക്കാനും സേവനങ്ങൾ ലഭ്യമാക്കാനും.",
        },
        'intro-3': {
            icon: <HeartPulse className="mega-icon text-red" />,
            title: "Emergency & Blood Bank",
            desc: "അടിയന്തര ഘട്ടങ്ങളിൽ സഹായത്തിനും രക്തദാനത്തിനും ഒരൊറ്റ പ്ലാറ്റ്ഫോം.",
        }
    };
    const content = contentData[currentScreen] || { icon: <></>, title: "", desc: "" };

    return (
        <section className="screen flex-center bg-blue-light active">
            <div className="intro-container slide-in">
                <div className="intro-illustration">
                    {content.icon}
                </div>
                <h2>{content.title}</h2>
                <p>{content.desc}</p>

                <div className="intro-controls">
                    {getDots()}
                    <button
                        className="btn-next"
                        onClick={() => onNavigate(getNextScreen())}
                    >
                        {currentScreen === 'intro-3' ? "Get Started" : "Next"} <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default IntroScreens;
