import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { CartProvider } from '../context/CartContext.jsx'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  )
}

export default MyApp 