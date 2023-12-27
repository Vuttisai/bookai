"use client";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import LandingSection from "@/components/LandingSection";

import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-black h-screen snap-y space-y-1.5 md:space-y-0 snap-mandatory overflow-auto">
      <div className="h-screen snap-start">
        <LandingNavbar />
        <LandingHero />
      </div>
      <section className="bg-black snap-start">
        <LandingSection />
      </section>
    </div>
  );
};

export default LandingPage;
