import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type, url, image }) {
  // الوصف المختصر والمثالي لمعايير محركات البحث (SEO)
  const defaultDescription = "Software Engineer with 2+ years of experience in full-stack web, mobile development, network administration, and hardware/software troubleshooting.";

  const finalTitle = title ? `${title} | Software Engineer` : 'Yaghmourassen Maoui | Software Engineer Portfolio';
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* الوسوم الأساسية */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* وسوم Open Graph لـ Facebook و LinkedIn */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* وسوم Twitter */}
      <meta name="twitter:creator" content={name || 'Yaghmourassen Maoui'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}