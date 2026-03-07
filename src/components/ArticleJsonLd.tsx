"use client";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  author?: string;
  url: string;
}

export default function ArticleJsonLd({
  title,
  description,
  datePublished,
  author = "David Turk",
  url,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "DT+C",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
