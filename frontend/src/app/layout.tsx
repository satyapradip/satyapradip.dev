import type { Metadata } from "next";
import { montserrat, workSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATYAPRADIP | Portfolio",
  description:
    "Portfolio of Satyapradip Das, Full-Stack Developer & AI-ML Engineer specializing in MERN stack, AWS, scalable web applications, and Machine Learning integrations.",
  keywords: [
    "Satyapradip Das",
    "Full-Stack Developer",
    "AI-ML Engineer",
    "MERN Stack",
    "React",
    "Node.js",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Satyapradip Das" }],
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
      <body className="min-h-full flex flex-col font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
