import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { pageVariants } from '../lib/motion.js'

export default function PageTransition({ children }) {
    const { pathname } = useLocation()
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
