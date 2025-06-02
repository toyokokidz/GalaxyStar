import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import HandCrafted from '../components/HandCrafted/HandCrafted'
import HandCraftDisplay from '../components/HandCraftDisplay/HandCraftDisplay'
import AboutSection from '../components/AboutSection/AboutSection'
import Footer from '../components/Footer/Footer'
import SEOHead from '../components/SEO/SEOHead'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GalaxyStar",
    "description": "Premium gaming peripherals manufacturer specializing in mechanical keyboards, gaming mice, and accessories",
    "url": "https://galaxystar.com",
    "logo": "https://galaxystar.com/images/logo.png",
    "sameAs": [
      "https://twitter.com/galaxystar",
      "https://instagram.com/galaxystar"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service"
    }
  }

  return (
    <>
      <SEOHead 
        title="GalaxyStar - Premium Gaming Peripherals & Mechanical Keyboards"
        description="Discover handcrafted gaming keyboards, precision gaming mice, and premium accessories. Experience the perfect fusion of art and technology for competitive gaming."
        keywords="mechanical keyboard, gaming mouse, gaming peripherals, esports gear, premium gaming, handcrafted keyboards"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <main>
        <Hero />
        <Categories />
        <HandCrafted />
        <HandCraftDisplay />
        <AboutSection />
      </main>
    </>
  )
}