import { query } from "./db";
import {
    AboutSection,
    Certificate,
    ContactMessage,
    Experience,
    HeroSection,
    PortfolioData,
    Project,
    Skill,
} from "@/types/portfolio";

export const defaultPortfolioData: PortfolioData = {
    hero: {
        id: 1,
        imageUrl: "/assets/portfolio-portrait.png",
        imageAlt: "Abigail, a computer science student, smiling beside her laptop",
    },
    about: {
        id: 1,
        firstDescription:
            "I'm an Information Technology student fascinated by what happens when thoughtful design meets good engineering. I enjoy making the web feel less complicated and a little more welcoming.",
        secondDescription:
            "Between classes, you'll find me exploring frontend development, learning something new just because, or collaborating on ideas that make a difference.",
        imageUrl: "/assets/portfolio-portrait.png",
        imageAlt: "About photo of Abigail coding and designing",
    },
    skills: [
        { id: 1, name: "HTML5", iconKey: "siHtml5", displayOrder: 1, isActive: true },
        { id: 2, name: "CSS3", iconKey: "siCss", displayOrder: 2, isActive: true },
        { id: 3, name: "JavaScript", iconKey: "siJavascript", displayOrder: 3, isActive: true },
        { id: 4, name: "TypeScript", iconKey: "siTypescript", displayOrder: 4, isActive: true },
        { id: 5, name: "React", iconKey: "siReact", displayOrder: 5, isActive: true },
        { id: 6, name: "Node.js", iconKey: "siNodedotjs", displayOrder: 6, isActive: true },
        { id: 7, name: "Python", iconKey: "siPython", displayOrder: 7, isActive: true },
        { id: 8, name: "Git & GitHub", iconKey: "siGit", displayOrder: 8, isActive: true },
    ],
    projects: [
        {
            id: 1,
            name: "Bloom & Balance",
            description:
                "A calm, accessible habit tracker designed to make everyday wellbeing feel a little more possible.",
            imageUrl: "",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            name: "Campus Connect",
            description:
                "A welcoming home for student clubs, campus events, and the connections that make a university feel smaller.",
            imageUrl: "",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            name: "Greenhouse Notes",
            description:
                "A little plant-care dashboard that turns watering schedules into an easy, joyful routine.",
            imageUrl: "",
            displayOrder: 3,
            isActive: true,
        },
    ],
    certificates: [
        {
            id: 1,
            title: "Introduction to Front-End Development",
            aboutCertificate:
                "Mastered responsive page layouts, DOM manipulation, Git version control, and core web accessibility principles.",
            year: "2025",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Award",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            title: "Responsive Web Design",
            aboutCertificate:
                "Comprehensive 300-hour certification covering modern CSS Grid, Flexbox, media queries, and semantic HTML5 structuring.",
            year: "2025",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Braces",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            title: "Foundations of User Experience (UX) Design",
            aboutCertificate:
                "Covered design thinking, empathy mapping, user personas, low-to-high fidelity wireframing, and usability testing.",
            year: "2024",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Gem",
            displayOrder: 3,
            isActive: true,
        },
    ],
    experiences: [
        {
            id: 1,
            title: "Computer Science Student",
            organization: "University studies · Bengaluru, India",
            period: "2024 — PRESENT",
            description:
                "Building strong foundations in programming, data structures, web development, and collaborative problem-solving.",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            title: "Independent Project Builder",
            organization: "Personal & collaborative projects",
            period: "2025 — PRESENT",
            description:
                "Taking ideas from sketch to screen, learning new tools along the way, and sharing the things I make with others.",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            title: "Curious Learner",
            organization: "Online courses · Open-source community",
            period: "ALWAYS",
            description:
                "Following curiosity into new frameworks, thoughtful design, and a more accessible, inclusive web.",
            displayOrder: 3,
            isActive: true,
        },
    ],
};

export async function getHeroSection(): Promise<HeroSection> {
    try {
        const res = await query<{
            id: number;
            image_url: string;
            image_alt: string;
            updated_at: string;
        }>("SELECT id, image_url, image_alt, updated_at FROM hero_section WHERE id = 1 LIMIT 1");

        if (res && res.rows.length > 0) {
            const row = res.rows[0]!;
            return {
                id: row.id,
                imageUrl: row.image_url,
                imageAlt: row.image_alt,
                updatedAt: row.updated_at,
            };
        }
    } catch (error) {
        console.error("Error loading hero_section from database, using fallback:", error);
    }
    return defaultPortfolioData.hero;
}

export async function updateHeroImage(imageUrl: string, imageAlt?: string): Promise<boolean> {
    const res = await query(
        `INSERT INTO hero_section (id, image_url, image_alt, updated_at)
     VALUES (1, $1, $2, NOW())
     ON CONFLICT (id) DO UPDATE SET
       image_url = EXCLUDED.image_url,
       image_alt = COALESCE(EXCLUDED.image_alt, hero_section.image_alt),
       updated_at = NOW()`,
        [imageUrl, imageAlt || "Hero portrait image"],
    );
    return !!res;
}

export async function getAboutSection(): Promise<AboutSection> {
    try {
        const res = await query<{
            id: number;
            first_description: string;
            second_description: string;
            image_url: string;
            image_alt: string;
            updated_at: string;
        }>(
            "SELECT id, first_description, second_description, image_url, image_alt, updated_at FROM about_section WHERE id = 1 LIMIT 1",
        );

        if (res && res.rows.length > 0) {
            const row = res.rows[0]!;
            return {
                id: row.id,
                firstDescription: row.first_description,
                secondDescription: row.second_description,
                imageUrl: row.image_url,
                imageAlt: row.image_alt,
                updatedAt: row.updated_at,
            };
        }
    } catch (error) {
        console.error("Error loading about_section from database, using fallback:", error);
    }
    return defaultPortfolioData.about;
}

export async function updateAboutSection(
    firstDesc: string,
    secondDesc: string,
    imageUrl: string,
    imageAlt?: string,
): Promise<boolean> {
    const res = await query(
        `INSERT INTO about_section (id, first_description, second_description, image_url, image_alt, updated_at)
     VALUES (1, $1, $2, $3, $4, NOW())
     ON CONFLICT (id) DO UPDATE SET
       first_description = EXCLUDED.first_description,
       second_description = EXCLUDED.second_description,
       image_url = EXCLUDED.image_url,
       image_alt = COALESCE(EXCLUDED.image_alt, about_section.image_alt),
       updated_at = NOW()`,
        [firstDesc, secondDesc, imageUrl, imageAlt || "About photo"],
    );
    return !!res;
}

export async function getSkills(): Promise<Skill[]> {
    try {
        const res = await query<{
            id: number;
            name: string;
            icon_key: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, name, icon_key, display_order, is_active FROM skills WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                name: row.name,
                iconKey: row.icon_key,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading skills from database, using fallback:", error);
    }
    return defaultPortfolioData.skills;
}

export async function getProjects(): Promise<Project[]> {
    try {
        const res = await query<{
            id: number;
            name: string;
            description: string;
            image_url: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, name, description, image_url, display_order, is_active FROM projects WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                name: row.name,
                description: row.description,
                imageUrl: row.image_url,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading projects from database, using fallback:", error);
    }
    return defaultPortfolioData.projects;
}

export async function getCertificates(): Promise<Certificate[]> {
    try {
        const res = await query<{
            id: number;
            title: string;
            about_certificate: string;
            year: string;
            image_url: string;
            icon_name: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, title, about_certificate, year, image_url, icon_name, display_order, is_active FROM certificates WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                title: row.title,
                aboutCertificate: row.about_certificate,
                year: row.year,
                imageUrl: row.image_url,
                iconName: row.icon_name,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading certificates from database, using fallback:", error);
    }
    return defaultPortfolioData.certificates;
}

export async function getExperiences(): Promise<Experience[]> {
    try {
        const res = await query<{
            id: number;
            title: string;
            organization: string;
            period: string;
            description: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, title, organization, period, description, display_order, is_active FROM experiences WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                title: row.title,
                organization: row.organization,
                period: row.period,
                description: row.description,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading experiences from database, using fallback:", error);
    }
    return defaultPortfolioData.experiences;
}

export async function createContactMessage(
    name: string,
    email: string,
    message: string,
): Promise<boolean> {
    const res = await query(
        "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
        [name, email, message],
    );
    if (!res) {
        // Fallback in-memory
        inMemoryMessages.unshift({
            id: `local-${Date.now()}`,
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
        });
        return true;
    }
    return !!res;
}

const inMemoryMessages: ContactMessage[] = [];

export async function getContactMessages(): Promise<ContactMessage[]> {
    try {
        const res = await query<{
            id: string;
            name: string;
            email: string;
            message: string;
            created_at: string;
        }>("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC");

        if (res && res.rows.length > 0) {
            return res.rows.map((r) => ({
                id: r.id,
                name: r.name,
                email: r.email,
                message: r.message,
                createdAt: r.created_at,
            }));
        }
    } catch {
        // Fallback
    }
    return inMemoryMessages;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
    try {
        await query("DELETE FROM contact_messages WHERE id = $1", [id]);
    } catch {
        // Ignore DB error
    }
    const idx = inMemoryMessages.findIndex((m) => m.id === id);
    if (idx !== -1) inMemoryMessages.splice(idx, 1);
    return true;
}

// ==========================================
// SKILLS CRUD
// ==========================================
export async function createSkill(data: { name: string; iconKey: string; displayOrder?: number }): Promise<Skill> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.skills.length + 1);
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO skills (name, icon_key, display_order, is_active) VALUES ($1, $2, $3, TRUE) RETURNING id",
            [data.name, data.iconKey, displayOrder],
        );
        if (res && res.rows[0]) {
            const newSkill: Skill = { id: res.rows[0].id, name: data.name, iconKey: data.iconKey, displayOrder, isActive: true };
            defaultPortfolioData.skills.push(newSkill);
            return newSkill;
        }
    } catch (err) {
        console.error("DB createSkill error:", err);
    }
    const newSkill: Skill = {
        id: Date.now(),
        name: data.name,
        iconKey: data.iconKey,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.skills.push(newSkill);
    return newSkill;
}

export async function updateSkill(id: number, data: { name?: string; iconKey?: string; displayOrder?: number; isActive?: boolean }): Promise<boolean> {
    try {
        await query(
            `UPDATE skills SET
                name = COALESCE($1, name),
                icon_key = COALESCE($2, icon_key),
                display_order = COALESCE($3, display_order),
                is_active = COALESCE($4, is_active)
             WHERE id = $5`,
            [data.name ?? null, data.iconKey ?? null, data.displayOrder ?? null, data.isActive ?? null, id],
        );
    } catch (err) {
        console.error("DB updateSkill error:", err);
    }
    const s = defaultPortfolioData.skills.find((item) => item.id === id);
    if (s) {
        if (data.name !== undefined) s.name = data.name;
        if (data.iconKey !== undefined) s.iconKey = data.iconKey;
        if (data.displayOrder !== undefined) s.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) s.isActive = data.isActive;
    }
    return true;
}

export async function deleteSkill(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM skills WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteSkill error:", err);
    }
    const idx = defaultPortfolioData.skills.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.skills.splice(idx, 1);
    return true;
}

// ==========================================
// PROJECTS CRUD
// ==========================================
export async function createProject(data: { name: string; description: string; imageUrl?: string; displayOrder?: number }): Promise<Project> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.projects.length + 1);
    const imageUrl = data.imageUrl || "";
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO projects (name, description, image_url, display_order, is_active) VALUES ($1, $2, $3, $4, TRUE) RETURNING id",
            [data.name, data.description, imageUrl, displayOrder],
        );
        if (res && res.rows[0]) {
            const newProj: Project = { id: res.rows[0].id, name: data.name, description: data.description, imageUrl, displayOrder, isActive: true };
            defaultPortfolioData.projects.push(newProj);
            return newProj;
        }
    } catch (err) {
        console.error("DB createProject error:", err);
    }
    const newProj: Project = {
        id: Date.now(),
        name: data.name,
        description: data.description,
        imageUrl,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.projects.push(newProj);
    return newProj;
}

export async function updateProject(id: number, data: { name?: string; description?: string; imageUrl?: string; displayOrder?: number; isActive?: boolean }): Promise<boolean> {
    try {
        await query(
            `UPDATE projects SET
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                image_url = COALESCE($3, image_url),
                display_order = COALESCE($4, display_order),
                is_active = COALESCE($5, is_active)
             WHERE id = $6`,
            [data.name ?? null, data.description ?? null, data.imageUrl ?? null, data.displayOrder ?? null, data.isActive ?? null, id],
        );
    } catch (err) {
        console.error("DB updateProject error:", err);
    }
    const p = defaultPortfolioData.projects.find((item) => item.id === id);
    if (p) {
        if (data.name !== undefined) p.name = data.name;
        if (data.description !== undefined) p.description = data.description;
        if (data.imageUrl !== undefined) p.imageUrl = data.imageUrl;
        if (data.displayOrder !== undefined) p.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) p.isActive = data.isActive;
    }
    return true;
}

export async function deleteProject(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM projects WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteProject error:", err);
    }
    const idx = defaultPortfolioData.projects.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.projects.splice(idx, 1);
    return true;
}

// ==========================================
// CERTIFICATES CRUD
// ==========================================
export async function createCertificate(data: { title: string; aboutCertificate?: string; year?: string; imageUrl?: string; iconName?: string; displayOrder?: number }): Promise<Certificate> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.certificates.length + 1);
    const year = data.year || "2025";
    const imageUrl = data.imageUrl || "";
    const iconName = data.iconName || "Award";
    const aboutCert = data.aboutCertificate || "";
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO certificates (title, about_certificate, year, image_url, icon_name, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, TRUE) RETURNING id",
            [data.title, aboutCert, year, imageUrl, iconName, displayOrder],
        );
        if (res && res.rows[0]) {
            const newCert: Certificate = { id: res.rows[0].id, title: data.title, aboutCertificate: aboutCert, year, imageUrl, iconName, displayOrder, isActive: true };
            defaultPortfolioData.certificates.push(newCert);
            return newCert;
        }
    } catch (err) {
        console.error("DB createCertificate error:", err);
    }
    const newCert: Certificate = {
        id: Date.now(),
        title: data.title,
        aboutCertificate: aboutCert,
        year,
        imageUrl,
        iconName,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.certificates.push(newCert);
    return newCert;
}

export async function updateCertificate(id: number, data: { title?: string; aboutCertificate?: string; year?: string; imageUrl?: string; iconName?: string; displayOrder?: number; isActive?: boolean }): Promise<boolean> {
    try {
        await query(
            `UPDATE certificates SET
                title = COALESCE($1, title),
                about_certificate = COALESCE($2, about_certificate),
                year = COALESCE($3, year),
                image_url = COALESCE($4, image_url),
                icon_name = COALESCE($5, icon_name),
                display_order = COALESCE($6, display_order),
                is_active = COALESCE($7, is_active)
             WHERE id = $8`,
            [data.title ?? null, data.aboutCertificate ?? null, data.year ?? null, data.imageUrl ?? null, data.iconName ?? null, data.displayOrder ?? null, data.isActive ?? null, id],
        );
    } catch (err) {
        console.error("DB updateCertificate error:", err);
    }
    const c = defaultPortfolioData.certificates.find((item) => item.id === id);
    if (c) {
        if (data.title !== undefined) c.title = data.title;
        if (data.aboutCertificate !== undefined) c.aboutCertificate = data.aboutCertificate;
        if (data.year !== undefined) c.year = data.year;
        if (data.imageUrl !== undefined) c.imageUrl = data.imageUrl;
        if (data.iconName !== undefined) c.iconName = data.iconName;
        if (data.displayOrder !== undefined) c.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) c.isActive = data.isActive;
    }
    return true;
}

export async function deleteCertificate(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM certificates WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteCertificate error:", err);
    }
    const idx = defaultPortfolioData.certificates.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.certificates.splice(idx, 1);
    return true;
}

// ==========================================
// EXPERIENCES CRUD
// ==========================================
export async function createExperience(data: { title: string; organization: string; period: string; description: string; displayOrder?: number }): Promise<Experience> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.experiences.length + 1);
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO experiences (title, organization, period, description, display_order, is_active) VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id",
            [data.title, data.organization, data.period, data.description, displayOrder],
        );
        if (res && res.rows[0]) {
            const newExp: Experience = { id: res.rows[0].id, title: data.title, organization: data.organization, period: data.period, description: data.description, displayOrder, isActive: true };
            defaultPortfolioData.experiences.push(newExp);
            return newExp;
        }
    } catch (err) {
        console.error("DB createExperience error:", err);
    }
    const newExp: Experience = {
        id: Date.now(),
        title: data.title,
        organization: data.organization,
        period: data.period,
        description: data.description,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.experiences.push(newExp);
    return newExp;
}

export async function updateExperience(id: number, data: { title?: string; organization?: string; period?: string; description?: string; displayOrder?: number; isActive?: boolean }): Promise<boolean> {
    try {
        await query(
            `UPDATE experiences SET
                title = COALESCE($1, title),
                organization = COALESCE($2, organization),
                period = COALESCE($3, period),
                description = COALESCE($4, description),
                display_order = COALESCE($5, display_order),
                is_active = COALESCE($6, is_active)
             WHERE id = $7`,
            [data.title ?? null, data.organization ?? null, data.period ?? null, data.description ?? null, data.displayOrder ?? null, data.isActive ?? null, id],
        );
    } catch (err) {
        console.error("DB updateExperience error:", err);
    }
    const e = defaultPortfolioData.experiences.find((item) => item.id === id);
    if (e) {
        if (data.title !== undefined) e.title = data.title;
        if (data.organization !== undefined) e.organization = data.organization;
        if (data.period !== undefined) e.period = data.period;
        if (data.description !== undefined) e.description = data.description;
        if (data.displayOrder !== undefined) e.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) e.isActive = data.isActive;
    }
    return true;
}

export async function deleteExperience(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM experiences WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteExperience error:", err);
    }
    const idx = defaultPortfolioData.experiences.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.experiences.splice(idx, 1);
    return true;
}

export async function getPortfolioData(): Promise<PortfolioData> {
    const [hero, about, skills, projects, certificates, experiences] = await Promise.all([
        getHeroSection(),
        getAboutSection(),
        getSkills(),
        getProjects(),
        getCertificates(),
        getExperiences(),
    ]);

    return {
        hero,
        about,
        skills,
        projects,
        certificates,
        experiences,
    };
}

