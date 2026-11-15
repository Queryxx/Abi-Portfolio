import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <div className="header-sticky-wrap">
      <header className="site-header">
        <a href="#home" className="brand-mark" aria-label="Abigail Ola home">
          <Logo />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#certificates">Certificates</a>
        </nav>
        <a className="header-contact" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </header>
    </div>
  );
}
