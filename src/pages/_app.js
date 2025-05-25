import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { CartProvider } from '../context/CartContext.jsx'
import '../styles/globals.scss'
import '../styles/themes.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
// анимация перехода между страницами
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default MyApp 