import type { Metadata } from "next";
import { montserrat, workSans } from "@/lib/fonts";
import Providers from "@/components/providers/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://satyapradip.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Satyapradip Das | Full-Stack Developer & AI-ML Engineer",
    template: "%s | Satyapradip Das",
  },
  description:
    "Portfolio of Satyapradip Das — Full-Stack Developer & AI-ML Engineer specializing in Next.js, React, Node.js, Python, MERN stack, scalable web architectures, and Machine Learning integrations.",
  keywords: [
    "Satyapradip Das",
    "Satyapradip",
    "Full-Stack Developer",
    "AI-ML Engineer",
    "MERN Stack",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Python",
    "Machine Learning",
    "Software Engineer Portfolio",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Satyapradip Das", url: siteUrl }],
  creator: "Satyapradip Das",
  publisher: "Satyapradip Das",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Satyapradip Das | Full-Stack Developer & AI-ML Engineer",
    description:
      "Explore featured projects, technical stack, production architectures, and experience of Satyapradip Das.",
    siteName: "Satyapradip Das Portfolio",
    images: [
      {
        url: `${siteUrl}/uploads/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Satyapradip Das — Full-Stack & AI-ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyapradip Das | Full-Stack Developer & AI-ML Engineer",
    description:
      "Full-Stack Developer & AI-ML Engineer specializing in scalable web apps and Machine Learning integrations.",
    creator: "@satyapradip",
    images: [`${siteUrl}/uploads/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${workSans.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
