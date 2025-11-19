import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScrollWrapper from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Shehroz | Full Stack Developer & Automation Specialist",
  description:
    "Shehroz builds scalable web apps and automates workflows with AI, APIs, and no-code systems. Full stack developer & automation specialist for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Gradient lines — behind all content */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="gradient-line"></div>
          <div className="gradient-line"></div>
          <div className="gradient-line"></div>
        </div>

        {/* Actual UI */}
        <Header />
        <div className="relative z-10">
          <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        </div>
        <Footer />
      </body>
    </html>
  );
}
