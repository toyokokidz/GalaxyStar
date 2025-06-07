import Head from 'next/head'

const SEOHead = ({ 
  title = "GalaxyStar - Premium Gaming Peripherals", 
  description = "Discover premium gaming keyboards, mice, and accessories. Handcrafted quality meets cutting-edge technology for the ultimate gaming experience.",
  keywords = "gaming keyboard, gaming mouse, mechanical keyboard, gaming peripherals, esports, premium gaming gear",
  ogImage = "/images/og-image.jpg",
  canonicalUrl,
  noindex = false,
  structuredData
}) => {
  const siteUrl = "https://galaxystar.com" // Замените на ваш реальный домен
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GalaxyStar" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Дополнительные мета-теги */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      
      {/* Структурированные данные JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Preconnect для производительности */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    </Head>
  )
}

export default SEOHead 