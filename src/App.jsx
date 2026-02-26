import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy, useState } from 'react'
import PageTransition from './components/PageTransition'

const Splash = lazy(() => import('./pages/Splash'))
const Welcome = lazy(() => import('./pages/Welcome'))
const AuthChoice = lazy(() => import('./pages/AuthChoice'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const OurWard = lazy(() => import('./pages/OurWard'))
const SmartWard = lazy(() => import('./pages/SmartWard'))
const Support = lazy(() => import('./pages/Support'))
const Workplace = lazy(() => import('./pages/Workplace'))
const GreenCulture = lazy(() => import('./pages/GreenCulture'))
const Profile = lazy(() => import('./pages/Profile'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Updates = lazy(() => import('./pages/Updates'))
const GramasabhaPortal = lazy(() => import('./pages/GramasabhaPortal'))
import AuthModal from './components/AuthModal'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import AIAssistant from './components/AIAssistant'
import ErrorBoundary from './components/ErrorBoundary'
import { Sparkles } from 'lucide-react'

// Simple loading spinner for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black/5 flex justify-center">
      {/* 
        Responsive Wrapper: Full width for proper dashboard scaling.
      */}
      <div className="w-full min-h-screen bg-[#f8fafc] relative overflow-hidden flex mx-auto">
        <AuthModal />

        {/* Desktop / Tablet Sidebar (hidden on mobile) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col relative h-screen overflow-y-auto no-scrollbar">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><Splash /></PageTransition>} />
                  <Route path="/welcome" element={<PageTransition><Welcome /></PageTransition>} />
                  <Route path="/auth" element={<PageTransition><AuthChoice /></PageTransition>} />
                  <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
                  <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                  <Route path="/our-ward" element={<PageTransition><OurWard /></PageTransition>} />
                  <Route path="/smart-ward" element={<PageTransition><SmartWard /></PageTransition>} />
                  <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
                  <Route path="/workplace" element={<PageTransition><Workplace /></PageTransition>} />
                  <Route path="/green" element={<PageTransition><GreenCulture /></PageTransition>} />
                  <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                  <Route path="/marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
                  <Route path="/updates" element={<PageTransition><Updates /></PageTransition>} />
                  <Route path="/gramasabha" element={<PageTransition><GramasabhaPortal /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </ErrorBoundary>

          {/* Mobile Bottom Navigation (hidden on desktop) */}
          <div className="lg:hidden">
            <BottomNav />
          </div>

          {/* Global AI Assistant FAB (Hidden on Onboarding) */}
          {!['/', '/welcome', '/auth', '/signup'].includes(location.pathname) && (
            <>
              <motion.button
                onClick={() => setIsAiOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[120] bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-full shadow-floating flex items-center gap-2 hover:from-purple-600 hover:to-indigo-700 transition-all border border-white/20"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Rise Up AI</span>
              </motion.button>

              <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
