"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Database,
  Download,
  FileSpreadsheet,
  LineChart,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { HangingIdCard } from "@/components/lightswind/HangingIdCard";

/* ------------------------------------------------------------------ */
/* Content — preserved verbatim from the existing portfolio.           */
/* ------------------------------------------------------------------ */

const projects = [
  {
    number: "01",
    title: "Netflix Data Analysis",
    type: "SQL • Data Analysis",
    description:
      "Explored Netflix titles with SQL to answer business questions around content, genres, release patterns and catalogue composition.",
    tags: ["MySQL", "SQL", "EDA"],
    href: "https://github.com/Ashish-Chaudhari3/Netflix-Movies-TV-Shows-SQL-Data-Analysis",
    icon: Database,
    art: "linear-gradient(135deg, #ffd84d 0%, #f59e0b 55%, #b45309 100%)",
    span: "span-7",
  },
  {
    number: "02",
    title: "Zomato Data Analysis",
    type: "Python • Exploratory Analysis",
    description:
      "Cleaned and explored restaurant data with Python to uncover patterns across ratings, cuisines, locations and customer preferences.",
    tags: ["Python", "Pandas", "Seaborn"],
    href: "https://github.com/Ashish-Chaudhari3/Zomato-Data-Analysis/tree/main",
    icon: Code2,
    art: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 55%, #082f49 100%)",
    span: "span-5",
  },
  {
    number: "03",
    title: "Spotify Dashboard",
    type: "Power BI • Visualization",
    description:
      "Built an interactive dashboard to turn Spotify data into clear views of artists, tracks, popularity and listening patterns.",
    tags: ["Power BI", "DAX", "Dashboard"],
    href: "#contact",
    icon: BarChart3,
    art: "linear-gradient(135deg, #059669 0%, #047857 55%, #022c22 100%)",
    span: "span-5",
  },
  {
    number: "04",
    title: "Adidas Sales Performance",
    type: "Excel • Business Analysis",
    description:
      "Created an Excel dashboard for sales performance, product categories, regions and business trends.",
    tags: ["Excel", "Pivot Tables", "Dashboard"],
    href: "https://github.com/Ashish-Chaudhari3/Adidas-Sales-Performance-Dashboard",
    icon: FileSpreadsheet,
    art: "linear-gradient(135deg, #d97706 0%, #b45309 55%, #451a03 100%)",
    span: "span-7",
  },
  {
    number: "05",
    title: "Blinkit Sales Analysis",
    type: "Excel • Data Analysis",
    description:
      "Analyzed retail sales data in Excel and organized key performance views to support quick business interpretation.",
    tags: ["Excel", "Power Query", "KPIs"],
    href: "https://github.com/Ashish-Chaudhari3/Blinkit-Sales-Analysis-Excel",
    icon: LineChart,
    art: "linear-gradient(135deg, #db2777 0%, #9d174d 55%, #500724 100%)",
    span: "span-12",
  },
];

const skills = [
  { icon: Database, name: "SQL", detail: "MySQL • PostgreSQL • SQL Server" },
  { icon: Code2, name: "Python", detail: "Pandas • NumPy • Matplotlib • Seaborn" },
  { icon: BarChart3, name: "Power BI", detail: "DAX • Data Modeling • Dashboards" },
  { icon: FileSpreadsheet, name: "Excel", detail: "Power Query • Pivot Tables • KPIs" },
  { icon: LineChart, name: "Tableau", detail: "Interactive Data Visualization" },
  { icon: BriefcaseBusiness, name: "Analytics", detail: "EDA • Data Cleaning • Insights" },
];

const marqueeTools = [
  "SQL",
  "Python",
  "Power BI",
  "Excel",
  "Tableau",
  "MySQL",
  "PostgreSQL",
  "Pandas",
  "NumPy",
  "Seaborn",
  "DAX",
  "Power Query",
  "Data Modeling",
  "EDA",
  "Dashboards",
];

const approach = [
  ["01", "Understand", "Start with the business question, not the chart."],
  ["02", "Clean", "Validate, transform and prepare the data."],
  ["03", "Analyze", "Use SQL, Python and analytical thinking to find patterns."],
  ["04", "Communicate", "Turn findings into simple, decision-ready visuals."],
];

const navLinks = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Contact", "#contact"],
] as const;

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const pad = value.startsWith("0");
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * numeric));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric]);

  const text = pad ? String(display).padStart(2, "0") : String(display);
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: draggable 3D-tilt ID card                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("top");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const close = () => setOpen(false);

  /* theme (localStorage-backed, matches layout init script) */
  useEffect(() => {
    setDark(localStorage.getItem("theme") === "dark");
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.dataset.theme = next ? "dark" : "";
      return next;
    });
  };

  /* cursor glow */
  useEffect(() => {
    const move = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Lenis smooth scroll + scroll-spy nav */
  useEffect(() => {
    const ids = ["top", "about", "skills", "work", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  /* Lenis instance shared with anchor navigation */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  /* anchor clicks through Lenis */
  const goTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const lenisInstance = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { offset: id === "top" ? 0 : -90 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    close();
  };

  return (
    <>
      <motion.div
        className="cursor-glow"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: "spring", stiffness: 450, damping: 35 }}
      />
      <motion.div className="progress" style={{ scaleX }} />

      {/* ---------------- Navbar ---------------- */}
      <header className="nav-wrap">
        <nav className="nav glass-panel">
          <a className="brand" href="#top" onClick={goTo("#top")}>
            <span className="brand-text">
              <span className="brand-name">Ashish Chaudhari</span>
              <span className="brand-sub">Portfolio</span>
            </span>
          </a>

          <div className={`nav-links ${open ? "open" : ""}`}>
            {navLinks.map(([label, hash]) => (
              <a
                key={hash}
                className={`nav-link ${active === hash.slice(1) ? "active" : ""}`}
                href={hash}
                onClick={goTo(hash)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-resume"
              href="/Ashish-Chaudhari-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={close}
            >
              <Download /> Resume
            </a>
          </div>

          <span className="nav-divider" />

          <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
            {dark ? <Sun /> : <Moon />}
          </button>

          <button className="menu-btn icon-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="hero" id="hero">
          <div className="hero-blob" />

          <div className="hero-inner container">
            <div className="hero-copy-col">
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="pulse" /> Open to opportunities
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                I turn raw data
                <br />
                into <span className="grad">clear decisions.</span>
              </motion.h1>

              <motion.p
                className="hero-copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                I&apos;m Ashish Chaudhari, a B.Tech Computer Science graduate building practical
                analytics projects with SQL, Python, Power BI and Excel.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <motion.a
                  className="button primary"
                  href="#work"
                  onClick={goTo("#work")}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore my work <ArrowUpRight size={16} />
                </motion.a>
                <motion.a
                  className="button secondary"
                  href="/Ashish-Chaudhari-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Resume <Download size={15} />
                </motion.a>
              </motion.div>

              <motion.div
                className="hero-socials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <a
                  className="icon-btn"
                  href="https://github.com/Ashish-Chaudhari3"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
                <a
                  className="icon-btn"
                  href="https://www.linkedin.com/in/ashishchaudhari03/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                  </svg>
                </a>
                <a className="icon-btn" href="mailto:aa8903100@gmail.com" aria-label="Email">
                  <Mail size={17} />
                </a>
              </motion.div>

              <motion.div
                className="hero-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span>Based in India</span>
                <span className="meta-line" />
                <span>Available for entry-level roles</span>
              </motion.div>
            </div>

            <motion.div
              className="id-card-zone"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <HangingIdCard
                name="Ashish Chaudhari"
                role="Data Analyst"
                badgeId="AC-2026-DA"
                accentColor="#ffd84d"
                avatarSrc="/ashish-photo.png"
                ropeLength={80}
                ropeColor="#18181b"
                footerBrand="PORTFOLIO"
                facts={[
                  { label: "Specialty", value: "Data Analytics & BI" },
                  { label: "Location", value: "India" },
                  { label: "Education", value: "B.Tech CS" },
                  {
                    label: "Status",
                    value: (
                      <span className="hid-fact-status">
                        <span className="dot" /> Open to work
                      </span>
                    ),
                  },
                ]}
              />
            </motion.div>
          </div>

          {/* tech marquee (real toolkit only) */}
          <div className="marquee-section">
            <div className="marquee">
              {[...marqueeTools, ...marqueeTools].map((tool, i) => (
                <span className="marquee-chip" key={`${tool}-${i}`}>
                  {tool} <ArrowUpRight size={13} />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section className="section about container" id="about">
          <Reveal>
            <div className="section-kicker">01 — About</div>
            <div className="about-layout">
              <h2 className="section-title">
                Curious about data.
                <br />
                <span className="grad">Serious about solving.</span>
              </h2>
              <div className="about-text">
                <p>
                  I enjoy taking messy data, asking the right questions, and turning the answers
                  into something a business can actually use.
                </p>
                <p>
                  My work combines technical analysis with clear visual storytelling. I&apos;m
                  currently looking for an opportunity where I can contribute, learn from a strong
                  team, and grow as a data professional.
                </p>
                <div className="mini-stats">
                  <div className="mini-stat">
                    <strong>
                      <AnimatedCounter value="05" suffix="+" />
                    </strong>
                    <span>Analytics projects</span>
                  </div>
                  <div className="mini-stat">
                    <strong>
                      <AnimatedCounter value="04" />
                    </strong>
                    <span>Core tools</span>
                  </div>
                  <div className="mini-stat">
                    <strong>
                      <AnimatedCounter value="01" />
                    </strong>
                    <span>Clear goal</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section className="section skills container" id="skills">
          <Reveal>
            <div className="section-head">
              <div className="section-kicker">02 — Toolkit</div>
              <h2 className="section-title">
                Tools I use to
                <br />
                <span className="grad">find the signal.</span>
              </h2>
              <p className="section-lead">
                From querying raw tables to building dashboards that make the answer obvious.
              </p>
            </div>
            <motion.div
              className="skills-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    className="skill-card"
                    key={skill.name}
                    whileHover={{ y: -6 }}
                    initial={{ opacity: 0, y: 25 }}
                    variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  >
                    <span className="skill-index">0{i + 1}</span>
                    <div className="skill-icon">
                      <Icon size={20} />
                    </div>
                    <h3>{skill.name}</h3>
                    <p>{skill.detail}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </section>

        {/* ---------------- Projects (bento) ---------------- */}
        <section className="section work container" id="work">
          <Reveal>
            <div className="section-head">
              <div className="section-kicker">03 — Selected Work</div>
              <h2 className="section-title">
                Projects built
                <br />
                <span className="grad">with purpose.</span>
              </h2>
              <p className="section-lead">
                Real practice across SQL, Python, BI and spreadsheet-based analysis.
              </p>
            </div>

            <motion.div
              className="projects-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {projects.map((project) => {
                const Icon = project.icon;
                const external = project.href.startsWith("http");
                return (
                  <motion.a
                    className={`project-card ${project.span}`}
                    href={project.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <div className="project-art" style={{ background: project.art }}>
                      <div className="art-bg" style={{ background: project.art }} />
                      <div className="art-grid" />
                      <div className="art-icon">
                        <Icon />
                      </div>
                      <span className="art-index">{project.number}</span>
                    </div>
                    <div className="project-body">
                      <p className="project-type">{project.type}</p>
                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        <ArrowUpRight size={19} />
                      </div>
                      <p className="project-desc">{project.description}</p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </Reveal>
        </section>

        {/* ---------------- Approach ---------------- */}
        <section className="approach-section">
          <div className="container section">
            <Reveal>
              <div className="section-kicker">04 — My Approach</div>
              <h2 className="section-title">
                From question
                <br />
                <span className="grad">to insight.</span>
              </h2>
              <motion.div
                className="approach-grid"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              >
                {approach.map(([n, title, copy]) => (
                  <motion.div
                    className="approach-card"
                    key={n}
                    variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.55 }}
                  >
                    <span className="approach-num">{n}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </motion.div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section className="contact-section" id="contact">
          <div className="contact-blob" />
          <Reveal>
            <div className="contact-inner container">
              <div className="section-kicker">05 — Contact</div>
              <h2 className="section-title">
                Have a data problem?
                <br />
                <span className="grad">Let&apos;s talk.</span>
              </h2>
              <p className="section-lead">
                I&apos;m currently open to entry-level Data Analyst and related opportunities. If
                you think there&apos;s a fit, I&apos;d be happy to connect.
              </p>

              <div className="contact-actions">
                <motion.a
                  className="button primary large"
                  href="mailto:aa8903100@gmail.com"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={17} /> Email me
                </motion.a>
                <motion.a
                  className="button secondary large"
                  href="https://www.linkedin.com/in/ashishchaudhari03/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  LinkedIn <ArrowUpRight size={16} />
                </motion.a>
                <motion.a
                  className="button secondary large"
                  href="https://github.com/Ashish-Chaudhari3"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GitHub <ArrowUpRight size={16} />
                </motion.a>
              </div>

              <div className="contact-note">
                <Check size={15} /> Usually responds within a day
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-id">
            <div>
              <div className="footer-name">Ashish Chaudhari</div>
              <div className="footer-role">Data Analyst</div>
            </div>
          </div>

          <a className="back-to-top" href="#top" onClick={goTo("#top")}>
            Back to top <ArrowUpRight size={14} />
          </a>

          <FooterRotate />

          <div className="footer-links">
            {navLinks.map(([label, hash]) => (
              <a key={hash} href={hash} onClick={goTo(hash)}>
                {label}
              </a>
            ))}
          </div>

          <div className="footer-socials">
            <a
              className="icon-btn"
              href="https://github.com/Ashish-Chaudhari3"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
            <a
              className="icon-btn"
              href="https://www.linkedin.com/in/ashishchaudhari03/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
              </svg>
            </a>
            <a className="icon-btn" href="mailto:aa8903100@gmail.com" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div className="footer-copy">
          © 2026 Ashish Chaudhari · Designed for clarity · Built with Next.js
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer rotating-role widget (reference behavior)                    */
/* ------------------------------------------------------------------ */

const ROTATE_WORDS = ["Data Analyst", "SQL • Python • Power BI", "Open to Work"];

function FooterRotate() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATE_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="footer-rotate glass-panel">
      <span className="rotate-badge">Analyze &amp; Visualize</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="rotate-word"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATE_WORDS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
