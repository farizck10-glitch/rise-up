import React, { useState } from 'react';
import type { ScreenId, User } from '../types';

interface Props {
    onLogin: (u: User) => void;
    onNavigate: (s: ScreenId) => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin, onNavigate }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && phone && area) {
            onLogin({ name, phone });
        } else {
            alert('Please fill in all details');
        }
    };

    return (
        <section className="screen flex-center active">
            <div className="login-container fade-in">
                <h2 className="text-blue">Join Your Community</h2>
                <p className="subtitle">Enter details to stay connected</p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Name (പേര്)</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone Number (ഫോൺ നമ്പർ)</label>
                        <input
                            type="tel"
                            placeholder="10-digit number"
                            required
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Area / Locality (സ്ഥലം)</label>
                        <select
                            required
                            value={area} onChange={e => setArea(e.target.value)}
                        >
                            <option value="">Select Area</option>
                            <option value="area1">Panayi Center</option>
                            <option value="area2">Temple Road</option>
                            <option value="area3">School Junction</option>
                            <option value="area4">River Side</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary w-full mt-4">
                        Login
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button
                    type="button"
                    className="btn-outline w-full"
                    onClick={() => onNavigate('home')}
                >
                    Skip for now
                </button>
                <button
                    type="button"
                    className="btn-ghost w-full mt-2"
                    onClick={() => onNavigate('admin')}
                >
                    Admin Login Mockup
                </button>
            </div>
        </section>
    );
};

export default LoginScreen;
