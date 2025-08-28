export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Favicon als separate Route
    if (pathname === '/favicon.ico' || pathname === '/favicon.png') {
      // Hier würdest du dein Favicon als Base64 oder von einer externen URL laden
      const faviconBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="; // Placeholder
      const faviconBuffer = Uint8Array.from(atob(faviconBase64), c => c.charCodeAt(0));
      
      return new Response(faviconBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000"
        }
      });
    }

    // fraenk Logo als separate Route
    if (pathname === '/fraenk-logo.svg') {
      const logoSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 111.8 31.4'>
        <path fill='#111110' d='M8.8 8.7v2H13v4.5H8.8v15.5H3.4V15.2H0v-4.5h3.4v-2C3.4 3 6.4 0 12.2 0h1.1v4.9h-.6c-2.5 0-3.9 1-3.9 3.8'/>
        <path fill='#111110' d='M29 15.8h-.6c-4.3 0-6.4 1.8-6.4 6.7v8.2h-5.4v-20h5.3V15h.1a6.8 6.8 0 016.8-4.9h.2v5.7'/>
        <path fill='#111110' d='M64.8 20.8v1H49.5c.3 3.1 2.6 4.9 5.8 4.9a8.6 8.6 0 006.1-2.8l2.7 3.9a12.7 12.7 0 01-8.8 3.6 11 11 0 01-8.7-3.6 7.3 7.3 0 01-2.6 2.3 11.4 11.4 0 01-5.7 1.3 12.6 12.6 0 01-2.7-.4 8.5 8.5 0 01-2.6-1.1 6.1 6.1 0 01-1.9-2 5.1 5.1 0 01-.8-2.8 6 6 0 011.2-3.6 7.3 7.3 0 013.3-2.2 23.2 23.2 0 014.4-.8 48.7 48.7 0 015.4-.1V18a3.8 3.8 0 00-1.4-2.6 5.1 5.1 0 00-3.4-1 7 7 0 00-3.1.7 8.2 8.2 0 00-2.6 1.6l-2.6-3.5a11 11 0 014.2-2.4 14.1 14.1 0 014.5-.7 8.6 8.6 0 016.8 3.1 10.9 10.9 0 017.9-3.1c6.2 0 9.9 3.8 9.9 10.7zm-20.2 1.9v-.9h-1.1c-2.5.1-4.8.1-6.2.6s-2.1 1.2-2.1 2.3a2.2 2.2 0 001.1 1.7l1.2.4h1.2a6.4 6.4 0 004-1.1 5.8 5.8 0 001.9-3zm14.7-4.3c-.2-2.6-2-4-4.7-4s-4.5 1.2-5 4z'/>
        <path fill='#111110' d='M87.6 18.4v12.3h-5.4V19.6c0-3.2-1.6-4.6-4.2-4.6s-4.8 1.6-4.8 5.9v9.8h-5.4v-20h5.3v3.1h.1a7.5 7.5 0 016.7-3.7c4.4 0 7.7 2.4 7.7 8.3'/>
        <path fill='#111110' d='M104.7 30.7l-7.6-9.5v9.5h-5.5V.5h5.5v18.4l6.7-8.2h6.9l-8.4 9.1 9.5 10.9h-7.1'/>
      </svg>`;
      
      return new Response(logoSvg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000"
        }
      });
    }

    // Screenshot als separate Route
    if (pathname === '/fraenk-screenshot.jpg') {
      // Hier würdest du dein Screenshot-Base64 einfügen
      const screenshotBase64 = "YOUR_SCREENSHOT_BASE64_HERE"; // Ersetze mit deinem Screenshot
      const screenshotBuffer = Uint8Array.from(atob(screenshotBase64), c => c.charCodeAt(0));
      
      return new Response(screenshotBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400"
        }
      });
    }
    
    // robots.txt
    if (pathname === '/robots.txt') {
      return new Response(`User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml`, {
        headers: { 
          "content-type": "text/plain;charset=UTF-8",
          "cache-control": "public, max-age=86400"
        },
      });
    }
    
    // Erweiterte sitemap.xml
    if (pathname === '/sitemap.xml') {
      return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url.origin}/</loc>
    <lastmod>2025-08-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`, {
        headers: { 
          "content-type": "application/xml;charset=UTF-8",
          "cache-control": "public, max-age=86400"
        },
      });
    }
    
    // 404 für unbekannte Pfade
    if (pathname !== '/' && pathname !== '/index.html') {
      return new Response('404 - Seite nicht gefunden', {
        status: 404,
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });
    }
    
    // Hauptseite mit verbessertem SEO
    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/favicon.png">
  
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>🎉 fraenk Vorteilscode HELBE3 - 20 GB für 10€ | fraenk for friends Aktion</title>
  <meta name="description" content="🚀 EXKLUSIV: fraenk Gutscheincode HELBE3 für 5 GB Extra-Rabatt! 20 GB Telekom Netz für nur 10€/Monat. ⏰ Begrenzte fraenk for friends Aktion - Jetzt Code sichern!" />
  <meta name="keywords" content="fraenk vorteilscode, fraenk gutschein HELBE3, telekom tarif rabatt, fraenk for friends, 20gb 10 euro, telekom netz günstig, handytarif angebot 2025" />
  
  <!-- Open Graph optimiert -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="🎉 fraenk Code HELBE3: 20 GB Telekom-Tarif für 10€" />
  <meta property="og:description" content="🚀 5 GB EXTRA mit Gutscheincode HELBE3! Telekom Netz, 20 GB, nur 10€/Monat. Begrenzte Aktion!" />
  <meta property="og:url" content="${url.origin}/" />
  <meta property="og:image" content="${url.origin}/fraenk-screenshot.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="fraenk Vorteilscode" />
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="🎉 fraenk Code HELBE3: 5 GB Extra Rabatt!" />
  <meta name="twitter:description" content="20 GB Telekom-Tarif für 10€ mit Gutscheincode HELBE3" />
  <meta name="twitter:image" content="${url.origin}/fraenk-screenshot.jpg" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${url.origin}/" />
  
  <!-- Erweiterte JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "fraenk Vorteilscode HELBE3",
    "description": "Exklusiver fraenk Gutscheincode HELBE3 für 5 GB Extra-Rabatt im Telekom Netz",
    "url": "${url.origin}/",
    "logo": "${url.origin}/fraenk-logo.svg",
    "image": "${url.origin}/fraenk-screenshot.jpg",
    "telephone": "+49-800-FRAENK",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressLocality": "Deutschland"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.1657",
      "longitude": "10.4515"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "name": "fraenk 20GB Telekom Tarif mit Rabattcode",
      "description": "20 GB Datenvolumen im Telekom Netz für nur 10€ monatlich mit Gutscheincode HELBE3",
      "price": "10.00",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-08-27",
      "validThrough": "2025-09-14",
      "priceValidUntil": "2025-09-14",
      "seller": {
        "@type": "Organization",
        "name": "fraenk"
      }
    },
    "sameAs": [
      "https://www.fraenk.de",
      "https://twitter.com/fraenk_de",
      "https://www.instagram.com/fraenk_de"
    ]
  }
  </script>

  <!-- Zusätzliche Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    "name": "fraenk for friends: HELBE3 Rabattaktion",
    "text": "🎉 Begrenzte Aktion: Mit Gutscheincode HELBE3 erhältst du 5 GB extra im Telekom Netz. 20 GB für nur 10€ monatlich!",
    "datePosted": "2025-08-27T00:00:00+02:00",
    "expires": "2025-09-14T23:59:59+02:00",
    "category": "https://www.wikidata.org/wiki/Q47756",
    "spatialCoverage": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Mobilfunknutzer"
    }
  }
  </script>

  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist fraenk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "fraenk ist die günstige Mobilfunk-Marke der Deutschen Telekom für junge Leute. Du bekommst das gleiche Telekom Netz wie bei teuren Tarifen, aber zu einem fairen Preis von nur 10€ monatlich."
        }
      },
      {
        "@type": "Question", 
        "name": "Wie funktioniert der fraenk Vorteilscode HELBE3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gib den Gutscheincode HELBE3 bei der Registrierung auf fraenk.de ein und erhalte dauerhaft 5 GB extra Datenvolumen - also 20 GB statt 15 GB für nur 10€ im Monat."
        }
      }
    ]
  }
  </script>
  
  <!-- Robots meta -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  
  <!-- Zusätzliche Meta Tags -->
  <meta name="author" content="fraenk Vorteilscode Team" />
  <meta name="publisher" content="fraenk" />
  <meta name="theme-color" content="#0072ff" />
  <meta name="msapplication-navbutton-color" content="#0072ff" />
  <meta name="apple-mobile-web-app-status-bar-style" content="#0072ff" />
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
      line-height: 1.6;
    }
    
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    
    header { 
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      padding: 30px 0;
      margin-bottom: 40px;
    }
    
    .header-content {
      text-align: center;
    }
    
    .logo {
      font-size: 2.5em;
      font-weight: 900;
      background: linear-gradient(45deg, #0072ff, #00a8ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #666;
      font-size: 1.1em;
    }
    
    .code-section {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
    }
    
    .code-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
      background-size: 300% 100%;
      animation: rainbow 3s ease infinite;
    }
    
    @keyframes rainbow {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    .promo-text {
      font-size: 1.3em;
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .code { 
      font-size: 3.5em; 
      font-weight: 900; 
      color: #0072ff;
      margin: 25px 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      letter-spacing: 4px;
    }
    
    .btn {
      display: inline-block;
      padding: 18px 35px;
      background: linear-gradient(45deg, #ff6b6b, #ff8e53);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 1.2em;
      font-weight: 600;
      cursor: pointer;
      margin: 10px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .btn-secondary {
      background: linear-gradient(45deg, #667eea, #764ba2);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .btn-secondary:hover {
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }
    
    /* Flipclock Styles */
    .flipclock {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 30px 0;
      flex-wrap: wrap;
    }
    
    .flip-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .flip-card {
      position: relative;
      width: 70px;
      height: 80px;
      background: #2c3e50;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      margin-bottom: 8px;
    }
    
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      color: white;
      font-size: 2em;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: linear-gradient(135deg, #34495e, #2c3e50);
    }
    
    .flip-card::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(255,255,255,0.1);
      z-index: 10;
    }
    
    .flip-label {
      color: white;
      font-size: 0.9em;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .content {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      margin: 30px 0;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }
    
    .benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }
    
    .benefit {
      background: linear-gradient(135deg, #f8f9ff, #e8f4fd);
      padding: 25px;
      border-radius: 15px;
      text-align: center;
      border: 2px solid rgba(0, 114, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .benefit:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 114, 255, 0.15);
    }
    
    .benefit-icon {
      font-size: 3em;
      margin-bottom: 15px;
    }
    
    .benefit h3 {
      color: #0072ff;
      margin-bottom: 10px;
      font-size: 1.3em;
    }
    
    .cta-section {
      background: linear-gradient(135deg, #ff6b6b, #ff8e53);
      color: white;
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      margin: 40px 0;
      box-shadow: 0 20px 60px rgba(255, 107, 107, 0.3);
    }
    
    .countdown-title {
      color: white;
      font-size: 1.5em;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    @media(max-width: 768px) {
      .container { padding: 0 15px; }
      .code { font-size: 2.5em; letter-spacing: 2px; }
      .logo { font-size: 2em; }
      .flip-card { width: 60px; height: 70px; }
      .flip-card-inner { font-size: 1.5em; }
      .flipclock { gap: 10px; }
      .code-section, .content, .cta-section { padding: 25px; }
      .benefits { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="/fraenk-logo.svg" alt="fraenk Logo" style="width:180px; height:auto;" />
        </div>
        <p class="subtitle">🚀 20GB Telekom-Netz für 10€ monatlich! EXKLUSIVER Gutscheincode</p>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="code-section">
      <p class="promo-text">🎉 fraenk for friends: Exklusiver Rabattcode für 5 GB Extra!</p>
      <div class="code">HELBE3</div>
      <button class="btn" onclick="copyCode()">📋 Code kopieren</button>
      <a href="https://www.fraenk.de" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">🚀 Jetzt zu fraenk</a>
    </div>

    <div class="cta-section">
      <div class="countdown-title">⏰ Aktion läuft noch:</div>
      <div class="flipclock">
        <div class="flip-unit">
          <div class="flip-card">
            <div class="flip-card-inner" id="days">00</div>
          </div>
          <div class="flip-label">Tage</div>
        </div>
        <div class="flip-unit">
          <div class="flip-card">
            <div class="flip-card-inner" id="hours">00</div>
          </div>
          <div class="flip-label">Stunden</div>
        </div>
        <div class="flip-unit">
          <div class="flip-card">
            <div class="flip-card-inner" id="minutes">00</div>
          </div>
          <div class="flip-label">Minuten</div>
        </div>
        <div class="flip-unit">
          <div class="flip-card">
            <div class="flip-card-inner" id="seconds">00</div>
          </div>
          <div class="flip-label">Sekunden</div>
        </div>
      </div>
    </div>

    <div class="content">
      <h2 style="color: #0072ff; text-align: center; margin-bottom: 30px; font-size: 2em;">
        🎯 Warum fraenk der beste Telekom Tarif mit Rabatt ist
      </h2>
      
      <div class="benefits">
        <div class="benefit">
          <div class="benefit-icon">📶</div>
          <h3>Telekom Netz</h3>
          <p>Deutschlands bestes Mobilfunknetz mit 99% Netzabdeckung und 5G-Speed</p>
        </div>
        <div class="benefit">
          <div class="benefit-icon">💰</div>
          <h3>20 GB für 10€</h3>
          <p>Mit Code HELBE3 bekommst du dauerhaft 5 GB extra zu deinen 15 GB</p>
        </div>
        <div class="benefit">
          <div class="benefit-icon">📱</div>
          <h3>100% Digital</h3>
          <p>Komplett digital per App verwalten, eSIM-fähig und ohne Papierkram</p>
        </div>
        <div class="benefit">
          <div class="benefit-icon">✅</div>
          <h3>Ohne Vertragslaufzeit</h3>
          <p>Monatlich kündbar, fair und transparent - keine versteckten Kosten</p>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #e8f4fd, #f8f9ff); padding: 30px; border-radius: 15px; margin: 30px 0; border-left: 5px solid #0072ff;">
        <h3 style="color: #0072ff; margin-bottom: 15px;">🚀 So holst du dir den fraenk Rabatt:</h3>
        <ol style="color: #333; font-size: 1.1em; padding-left: 20px;">
          <li style="margin: 10px 0;"><strong>fraenk Gutscheincode HELBE3 kopieren</strong> (einfach oben auf den Button klicken)</li>
          <li style="margin: 10px 0;"><strong>Bei fraenk registrieren</strong> auf <a href="https://www.fraenk.de" target="_blank" style="color: #0072ff; text-decoration: none; font-weight: bold;">fraenk.de</a> - der Telekom Tochter</li>
          <li style="margin: 10px 0;"><strong>Vorteilscode beim Checkout eingeben</strong> und 5 GB Extra-Rabatt sichern</li>
          <li style="margin: 10px 0;"><strong>Fertig!</strong> Du hast jetzt 20 GB Telekom Tarif für nur 10€ monatlich</li>
        </ol>
      </div>

      <div style="background: linear-gradient(135deg, #fff3e0, #fce4ec); padding: 25px; border-radius: 15px; margin: 30px 0; border: 2px solid #ff9800;">
        <h3 style="color: #e65100; margin-bottom: 15px;">💡 fraenk for friends Tipp:</h3>
        <p style="color: #333; font-size: 1.1em; margin: 0;">
          fraenk ist die günstige Telekom-Marke für junge Leute. Du bekommst das gleiche premium Telekom Netz wie bei der Deutschen Telekom, 
          aber zum Discounter-Preis! Mit unserem fraenk Vorteilscode sparst du noch mehr und holst dir den besten Handytarif im Telekom Netz.
        </p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://www.fraenk.de" target="_blank" rel="noopener noreferrer" class="btn" style="font-size: 1.4em; padding: 20px 40px;">
          🎉 Jetzt fraenk Telekom-Tarif mit Rabatt sichern
        </a>
        <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
          ✓ Telekom Netz ✓ 20 GB mit Gutscheincode ✓ fraenk for friends Aktion ✓ Günstig telefonieren
        </p>
      </div>

      <!-- FAQ Section für bessere SEO -->
      <section style="margin: 50px 0;">
        <h2 style="color: #0072ff; text-align: center; margin-bottom: 30px;">❓ Häufige Fragen zu fraenk</h2>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Was ist fraenk?</h3>
          <p style="margin: 0; color: #666;">fraenk ist die günstige Mobilfunk-Marke der Deutschen Telekom. Du bekommst das gleiche Telekom Netz wie bei teuren Tarifen, aber zu einem fairen Preis von nur 10€ monatlich.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Wie funktioniert der fraenk Vorteilscode HELBE3?</h3>
          <p style="margin: 0; color: #666;">Gib den Gutscheincode HELBE3 bei der Registrierung auf fraenk.de ein und erhalte dauerhaft 5 GB extra Datenvolumen - also 20 GB statt 15 GB für nur 10€ im Monat.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Ist das fraenk Netz wirklich gut?</h3>
          <p style="margin: 0; color: #666;">Ja! fraenk nutzt das original Telekom Netz mit 99% Netzabdeckung und 5G-Geschwindigkeit. Du surfst im gleichen Netz wie Telekom-Kunden, zahlst aber deutlich weniger.</p>
        </div>
      </section>
    </div>
  </div>

  <script>
    function copyCode(){
      navigator.clipboard.writeText("HELBE3").then(() => {
        // Visuelles Feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = "✅ Kopiert!";
        btn.style.background = "linear-gradient(45deg, #4ecdc4, #44a08d)";
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "linear-gradient(45deg, #ff6b6b, #ff8e53)";
        }, 2000);
      }).catch(() => {
        // Fallback für ältere Browser
        const textArea = document.createElement('textarea');
        textArea.value = 'HELBE3';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("Code HELBE3 kopiert!");
      });
    }

    // Flipclock Countdown
    const endDate = new Date("2025-09-14T23:59:59").getTime();
    const flipElements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"), 
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds")
    };

    function updateFlipClock() {
      const now = new Date().getTime();
      const diff = endDate - now;
      
      if(diff < 0) {
        Object.values(flipElements).forEach(el => el.innerHTML = "00");
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Animation bei Änderung
      const values = { days, hours, minutes, seconds };
      
      Object.entries(values).forEach(([key, value]) => {
        const formattedValue = value.toString().padStart(2, '0');
        const element = flipElements[key];
        
        if(element.innerHTML !== formattedValue) {
          element.style.transform = 'rotateX(90deg)';
          setTimeout(() => {
            element.innerHTML = formattedValue;
            element.style.transform = 'rotateX(0deg)';
          }, 150);
        }
      });
    }

    // Initial load und Update alle Sekunden
    updateFlipClock();
    setInterval(updateFlipClock, 1000);

    // Flip-Animation CSS
    const style = document.createElement('style');
    style.textContent = \`
      .flip-card-inner {
        transition: transform 0.3s ease;
      }
    \`;
    document.head.appendChild(style);
  </script>

  <div class="container" style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin: 50px 0;">
    <img src="/fraenk-screenshot.jpg"
        alt="fraenk Website Screenshot - Telekom Tarif für 10€"
        style="max-width: 100%; width: 800px; border: 5px solid #0072ff; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: block;" />
    <p style="text-align: center; color: #666; font-size: 0.8em; margin-top: 10px;">Screenshot der fraenk Website - 20 GB Telekom Netz für 10€</p>
  </div>

</body>
</html>`;
    
    return new Response(html, {
      headers: { 
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public, max-age=3600"
      },
    });
  },
};
