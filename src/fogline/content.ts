/** Copy y datos de la landing de Fogline. Mismo texto que el diseño de Figma. */

export const nav = {
    links: ["Product", "Docs", "Pricing", "Log in"],
    cta: "Start free",
};

export const hero = {
    /** Sin punto final; el salto evita una palabra sola en la segunda línea. */
    titleLines: ["Clear the fog", "from every pull request"],
    lead: "Fogline is an AI code reviewer. It reads every pull request like your sharpest teammate and flags bugs, risky changes and missing context before merge. You still make the call.",
};

/** Un paso por pantalla del hero (2 a 5). El 1 es la llegada y el 6 la salida. */
export const heroSteps = [
    {
        icon: "eye",
        title: "Fogline reads the whole change",
        body: "Before it writes a single comment, Fogline gathers the context a reviewer would go looking for.",
        chips: ["Related files and call sites", "History of the code it touches", "Tests and the linked ticket"],
    },
    {
        icon: "search",
        title: "Findings, ranked by severity",
        body: "Fogline comments only where it matters, right on the line that needs attention.",
        chips: ["High, medium and low severity", "Explained in plain words", "Nitpicks stay quiet"],
    },
    {
        icon: "wand",
        title: "Fix it without leaving the PR",
        body: "Every finding comes with a suggested patch you can review and apply.",
        chips: ["Apply in one click", "Preview the diff first", "You still make the call"],
    },
    {
        icon: "merge",
        title: "Ready to merge",
        body: "Reviewed, fixed and explained. Your team decides when to ship.",
        chips: ["Status check passes", "Summary posted to the PR", "Works with GitHub and GitLab"],
    },
] as const;

export const clients = {
    lead: "Trusted by 2,000 engineering teams",
    rest: "who review faster, merge with confidence and ship every day.",
    /** Dos filas que se mueven en sentidos opuestos. `url`: la web de cada cliente (placeholder). */
    rows: [
        ["codecraft", "layers", "warpspeed", "hourglass", "capsule"],
        ["quotient", "lightbox", "boltshift", "featherdev"],
    ],
    url: (company: string) => `#${company}`,
};

export const features = {
    lead: "Built for the whole team,",
    rest: "not just the reviewer.",
    /** Mismo orden y fragmentos que la sección de Figma (405:17214). */
    cards: [
        { lead: "Learns your conventions.", rest: "Teach your rules once. Fogline checks them on every PR.", art: "rules", size: "lg" },
        { lead: "PR summaries.", rest: "The what and the why before anyone reads a line.", art: "summary", size: "lg" },
        { lead: "Severity-ranked findings.", rest: "High-risk issues first. Nitpicks stay quiet.", art: "severity", size: "sm" },
        { lead: "Built for every role.", rest: "Authors ship faster, leads review architecture.", art: "roles", size: "sm" },
        { lead: "Private by default.", rest: "Read-only access. Your code never trains models.", art: "privacy", size: "sm" },
    ],
} as const;

/** Contenido de los fragmentos de UI de las cards chicas. */
export const featureArt = {
    severity: [
        { title: "Retry loop has no upper bound", level: "high" },
        { title: "Idempotency key missing", level: "medium" },
        { title: "Unused import in invoice.ts", level: "low" },
    ],
    roles: [
        { name: "sam", role: "Author", status: "Ready for review", photo: "/fogline/people/1.jpg" },
        { name: "maya", role: "Tech lead", status: "Approved", photo: "/fogline/people/3.jpg" },
        { name: "Fogline", role: "Reviewer", status: "2 findings fixed", photo: null },
    ],
    privacy: [
        { label: "Read-only access", on: true },
        { label: "Never trains on your code", on: true },
        { label: "Self-hosted runner", on: false },
    ],
} as const;

export const metrics = {
    lead: "Less waiting.",
    rest: "More merging.",
    intro: "Early numbers from teams in the private beta.",
    rows: [
        { title: "Time to first review", body: "From hours to minutes after a PR opens.", value: "−40", unit: "%" },
        { title: "Issues caught before a human review", body: "Bugs flagged while the author still has context.", value: "3", unit: "×" },
        { title: "From install to the first review", body: "Connect GitHub, open a PR, done.", value: "2", unit: "min" },
    ],
};

export const testimonials = {
    lead: "Teams that ship with Fogline.",
    rest: "In their words.",
    items: [
        { quote: "“Fogline is the reviewer who actually reads the linked ticket.”", name: "Maya Torres", role: "Staff Engineer, Warpspeed", company: "warpspeed", photo: "/fogline/people/1.jpg" },
        { quote: "“It flagged a race condition two senior reviewers missed.”", name: "Daniel Okafor", role: "Engineering Manager, Layers", company: "layers", photo: "/fogline/people/2.jpg" },
        { quote: "“Summaries mean I review intent, not just diffs.”", name: "Priya Nair", role: "Tech Lead, Capsule", company: "capsule", photo: "/fogline/people/3.jpg" },
        { quote: "“Setup took two minutes. The first review landed before lunch.”", name: "Lucas Ferreira", role: "Platform Engineer, Hourglass", company: "hourglass", photo: "/fogline/people/4.jpg" },
    ],
};

export const footer = {
    tagline: "AI code review for teams that ship.",
    columns: [
        { title: "Product", links: ["How it works", "Pricing", "Changelog", "Integrations"] },
        { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
        { title: "Resources", links: ["Docs", "Security", "Status", "API"] },
    ],
    legal: "© 2026 Fogline, Inc. · Made in San Francisco",
    social: ["Privacy", "Terms", "GitHub", "X", "LinkedIn"],
};
