import { useState } from 'react';
import type { ScreenId, User } from './types';
import NavigationDrawer from './components/NavigationDrawer';
import WelcomeScreen from './screens/WelcomeScreen';
import IntroScreens from './screens/IntroScreens';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BloodBankScreen from './screens/BloodBankScreen';
import MarketScreen from './screens/MarketScreen';
import { JobsScreen } from './screens/JobsScreen';
import { SchemesScreen, LibraryScreen, GrievancesScreen, EmergencyScreen, HarithaScreen, AdminScreen } from './screens/OtherScreens';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [history, setHistory] = useState<ScreenId[]>(['welcome']);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = (screen: ScreenId, backward = false) => {
    if (!backward && currentScreen !== screen) {
      setHistory(prev => [...prev, screen]);
    }
    setCurrentScreen(screen);
    // Re-scroll to top when navigating
    const appEl = document.getElementById('app-container');
    if (appEl) appEl.scrollTop = 0;
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      setHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigate} />;
      case 'intro-1':
      case 'intro-2':
      case 'intro-3':
        return <IntroScreens currentScreen={currentScreen} onNavigate={navigate} />;
      case 'login':
        return <LoginScreen onLogin={(user: User | null) => { setCurrentUser(user); navigate('home'); }} onNavigate={navigate} />;
      case 'home':
        return <HomeScreen onNavigate={navigate} onToggleDrawer={toggleDrawer} />;
      case 'bloodbank':
        return <BloodBankScreen onNavigate={navigate} onGoBack={goBack} currentUser={currentUser} />;
      case 'market':
        return <MarketScreen onNavigate={navigate} onGoBack={goBack} currentUser={currentUser} />;
      case 'jobs':
        return <JobsScreen onGoBack={goBack} />;
      case 'schemes':
        return <SchemesScreen onGoBack={goBack} currentUser={currentUser} onNavigate={navigate} />;
      case 'library':
        return <LibraryScreen onGoBack={goBack} />;
      case 'grievances':
        return <GrievancesScreen onGoBack={goBack} currentUser={currentUser} onNavigate={navigate} />;
      case 'emergency':
        return <EmergencyScreen onGoBack={goBack} />;
      case 'haritha':
        return <HarithaScreen onGoBack={goBack} currentUser={currentUser} onNavigate={navigate} />;
      case 'admin':
        return <AdminScreen onNavigate={navigate} />;
      default:
        return <div className="p-4">Screen Not Implemented: {currentScreen} <button className="text-blue-600 underline" onClick={goBack}>Go Back</button></div>;
    }
  };

  return (
    <div id="app">
      {renderScreen()}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={navigate}
        currentUser={currentUser}
        onLogout={() => { setCurrentUser(null); navigate('welcome'); }}
      />
    </div>
  );
}

export default App;
