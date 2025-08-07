"use client";

import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import AboutUs from "@/components/about-us";
import TimelineCinta from "@/components/timeline-cinta";
import MomentGaleri from "@/components/moment-galeri";
import PlaylistRomantis from "@/components/playlist-romantis";
import CountdownAnniversary from "@/components/countdown-anniversary";
import LetterToMyLove from "@/components/letter-to-my-love";
import QuotesGallery from "@/components/quotes-gallery";
import KuisMini from "@/components/kuis-mini";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function AnniversaryPage() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navigation />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="timeline">
        <TimelineCinta />
      </section>

      <section id="gallery">
        <MomentGaleri />
      </section>

      <section id="music">
        <PlaylistRomantis />
      </section>

      <section id="countdown">
        <CountdownAnniversary />
      </section>

      <section id="letter">
        <LetterToMyLove />
      </section>

      <section id="quotes">
        <QuotesGallery />
      </section>

      <section id="quiz">
        <KuisMini />
      </section>

      <Footer />
    </div>
  );
}
