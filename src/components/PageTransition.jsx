import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
