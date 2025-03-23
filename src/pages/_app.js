import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />

    </>
  )
}

export default MyApp 