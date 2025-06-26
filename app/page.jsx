
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import ModelStatsSection from "../sections/ModelStatsSection";
import FeaturedWork from "@/sections/FeaturedWork";
import VideoReelSection from "../sections/VideoReelSection";
import ExperienceSection from "../sections/ExperienceSection";
import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ModelStatsSection />
      <FeaturedWork />
      <VideoReelSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
