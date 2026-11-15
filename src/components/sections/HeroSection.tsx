import Image from "next/image";
import { ArrowDown, ArrowUpRight, Gem } from "lucide-react";
import portrait from "@/assets/portfolio-portrait.png";
import { HeroSection as HeroSectionType } from "@/types/portfolio";

interface HeroSectionProps {
    hero: HeroSectionType;
}

export function HeroSection({ hero }: HeroSectionProps) {
    return (
        <section className="hero-section section-wrap" id="home">
            <div className="hero-copy">
                <h1>
                    Curious mind.
                    <br />
                    <span>Thoughtful code.</span>
                </h1>
                <p className="hero-description">
                    Hi, I&apos;m <strong>Abigail</strong> — a computer science student who
                    loves turning big ideas into simple, human-centered digital
                    experiences.
                </p>
                <div className="hero-actions">
                    <a className="button-primary" href="#projects">
                        Explore my work <ArrowUpRight size={17} />
                    </a>
                    <a className="text-link" href="#about">
                        A little about me <ArrowDown size={15} />
                    </a>
                </div>
            </div>
            <div
                className="hero-visual"
                aria-label="Portrait of a computer science student"
            >
                <div className="portrait-frame">
                    <Image
                        src={hero?.imageUrl || portrait}
                        alt={hero?.imageAlt || "Abigail, a computer science student, smiling beside her laptop"}
                        width={1024}
                        height={1280}
                        priority
                    />
                </div>
                <div className="portrait-stamp">
                    <Gem size={16} />
                    <span>
                        BUILDING WITH
                        <br />
                        CURIOSITY
                    </span>
                </div>
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <div className="hero-image-note">
                    A little bit of logic,
                    <br />a lot of heart.
                </div>
            </div>
            <div className="hero-index">
                <span>01</span>
                <span className="index-rule" />
                <span>SCROLL TO EXPLORE</span>
            </div>
        </section>
    );
}

