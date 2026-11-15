import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
    projects: Project[];
}

const PROJECT_BG_CLASSES = ["project-sage", "project-lime", "project-mint"];
const PROJECT_GLYPHS = ["✦", "◈", "✺"];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section className="section-wrap content-section projects-section" id="projects">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">SELECTED PROJECTS</p>
                    <h2>
                        Made with curiosity<span>.</span>
                    </h2>
                </div>
                <span className="section-aside">A few things from the workbench.</span>
            </div>
            <div className="projects-list">
                {projects.map((project, idx) => {
                    const hasCustomImage =
                        Boolean(project.imageUrl) &&
                        !project.imageUrl!.includes("portfolio-portrait") &&
                        !project.imageUrl!.includes("abigail-portrait");
                    const bgClass = PROJECT_BG_CLASSES[idx % PROJECT_BG_CLASSES.length];
                    const glyph = PROJECT_GLYPHS[idx % PROJECT_GLYPHS.length];

                    return (
                        <article className="project-row" key={project.name}>
                            <div className={`project-art ${bgClass}`}>
                                {hasCustomImage ? (
                                    <Image
                                        src={project.imageUrl as string}
                                        alt={project.name}
                                        width={260}
                                        height={180}
                                        className="project-art-img w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <span className="project-art-glyph">{glyph}</span>
                                        <span className="project-art-caption">{project.name.split(" ")[0]}</span>
                                        <span className="project-art-index">0{idx + 1}</span>
                                    </>
                                )}
                            </div>
                            <div className="project-info">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                            <a
                                href="#contact"
                                className="project-arrow"
                                aria-label={`Ask about ${project.name}`}
                            >
                                <ArrowUpRight size={21} />
                            </a>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
