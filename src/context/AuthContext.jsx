import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userMode, setUserMode] = useState(null); // 'guest' | 'user'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [authMessage, setAuthMessage] = useState(null);

    const requireAuth = (callback, customMessage = null) => {
        if (isAuthenticated) {
            callback();
        } else {
            setPendingAction(() => callback);
            setAuthMessage(customMessage);
            setIsModalOpen(true);
        }
    };

    const login = () => {
        setIsAuthenticated(true);
        setUserMode('user');
        setIsModalOpen(false);
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
    };

    const continueAsGuest = () => {
        setIsAuthenticated(false);
        setUserMode('guest');
        setIsModalOpen(false);
        setPendingAction(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPendingAction(null);
        setAuthMessage(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userMode, requireAuth, login, continueAsGuest, isModalOpen, closeModal, authMessage }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
