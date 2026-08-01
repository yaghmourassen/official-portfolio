import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type, url, image }) {
  const defaultDescription = "Software Engineer with experience in full-stack web, mobile development, network administration, and systems architectural engineering.";

  const finalTitle = title ? `${title} | Software Engineer` : 'Yaghmourassen Maoui | Software Engineer Portfolio';
  const finalDescription = description || defaultDescription;
  
  // الرابط الرسمي للموقع
  const siteUrl = url || 'https://official-portfolio-three-vert.vercel.app';
  const ogImage = image || `${siteUrl}/og-image.png`;

  // البيانات المهيكلة لـ Google
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name || "Yaghmourassen Maoui",
    "url": siteUrl,
    "jobTitle": "Full-Stack Software Engineer",
    "knowsAbout": [
      "React", "Next.js", "Laravel", "Spring Boot", 
      "TypeScript", "Network Administration", "Cybersecurity"
    ],
    "sameAs": [
      "https://github.com/yaghmourassen"
    ]
  };

  return (
    <Helmet>
      {/* الوسوم الأساسية */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={siteUrl} />

      {/* Twitter */}
      <meta name="twitter:creator" content={name || 'Yaghmourassen Maoui'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}