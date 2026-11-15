import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroBand } from "@/components/sections/IntroBand";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { getPortfolioData } from "@/lib/portfolio-service";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="portfolio-page">
      <Header />
      <HeroSection hero={data.hero} />
      <IntroBand />
      <AboutSection about={data.about} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection experiences={data.experiences} />
      <CertificatesSection certificates={data.certificates} />
      <ContactFooter />
    </main>
  );
}
