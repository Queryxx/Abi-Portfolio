import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export function ContactFooter() {
    return (
        <footer className="contact-footer" id="contact">
            <div className="section-wrap footer-inner">
                <div className="contact-grid">
                    <div className="contact-copy">
                        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
                        <h2>
                            Good things start
                            <br />
                            <em>with a hello.</em>
                        </h2>
                        <p className="contact-subtext">
                            Whether you have an internship opportunity, a freelance project,
                            open-source idea, or just want to connect — feel free to drop a
                            message or reach out directly!
                        </p>
                        <a className="footer-email" href="mailto:hello@example.com">
                            hello@example.com <ArrowUpRight size={19} />
                        </a>
                    </div>

                    <ContactForm />
                </div>

                <div className="footer-bottom">
                    <span>© 2025 Abigail Ola · </span>
                    <div className="social-links">
                        <a href="https://github.com" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:hello@example.com" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>
                    <a href="#home" className="back-top">
                        BACK TO TOP ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}

