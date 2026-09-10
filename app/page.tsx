 "use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Download,
  Mail,
  Menu,
  X,
  Database,
  FileSpreadsheet,
  LineChart,
  Code2,
} from "lucide-react";
import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Netflix Data Analysis",
    type: "SQL • Data Analysis",
    description:
      "Explored Netflix titles with SQL to answer business questions around content, genres, release patterns and catalogue composition.",
    tags: ["MySQL", "SQL", "EDA"],
    href: "https://github.com/Ashish-Chaudhari3/Netflix-Movies-TV-Shows-SQL-Data-Analysis",
  },
  {
    number: "02",
    title: "Zomato Data Analysis",
    type: "Python • Exploratory Analysis",
    description:
      "Cleaned and explored restaurant data with Python to uncover patterns across ratings, cuisines, locations and customer preferences.",
    tags: ["Python", "Pandas", "Seaborn"],
    href: "https://github.com/Ashish-Chaudhari3/Zomato-Data-Analysis/tree/main",
  },
  {
    number: "03",
    title: "Spotify Dashboard",
    type: "Power BI • Visualization",
    description:
      "Built an interactive dashboard to turn Spotify data into clear views of artists, tracks, popularity and listening patterns.",
    tags: ["Power BI", "DAX", "Dashboard"],
    href: "#contact",
  },
  {
    number: "04",
    title: "Adidas Sales Performance",
    type: "Excel • Business Analysis",
    description:
      "Created an Excel dashboard for sales performance, product categories, regions and business trends.",
    tags: ["Excel", "Pivot Tables", "Dashboard"],
    href: "https://github.com/Ashish-Chaudhari3/Adidas-Sales-Performance-Dashboard",
  },
  {
    number: "05",
    title: "Blinkit Sales Analysis",
    type: "Excel • Data Analysis",
    description:
      "Analyzed retail sales data in Excel and organized key performance views to support quick business interpretation.",
    tags: ["Excel", "Power Query", "KPIs"],
    href: "https://github.com/Ashish-Chaudhari3/Blinkit-Sales-Analysis-Excel",
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const close = () => setOpen(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div className="cursor-glow" animate={{ x: cursor.x, y: cursor.y }} transition={{ type: "spring", stiffness: 450, damping: 35 }} />
      <motion.div className="progress" style={{ scaleX }} />

      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="#top" onClick={close}>
            <span className="brand-name">Ashish<span>.</span></span>
          </a>

          <div className={`nav-links ${open ? "open" : ""}`}>
            <a href="#about" onClick={close}>About</a>
            <a href="#skills" onClick={close}>Skills</a>
            <a href="#work" onClick={close}>Work</a>
            <a href="#contact" onClick={close}>Contact</a>
            <a className="nav-resume" href="/Ashish-Chaudhari-Resume.pdf" target="_blank" rel="noreferrer" onClick={close}>
              <Download size={15} /> Resume
            </a>
          </div>

          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" />
          <motion.div className="orb orb-one" animate={{ x: [0, 35, -15, 0], y: [0, -25, 20, 0], scale: [1, 1.08, .96, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="orb orb-two" animate={{ x: [0, -20, 25, 0], y: [0, 20, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-inner">
            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span className="pulse" animate={{ scale: [1, 1.25, 1], opacity: [1, .65, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /> Open to opportunities
            </motion.div>

            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              DATA ANALYST · SQL · PYTHON · POWER BI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              I turn raw data
              <br />
              into <em>clear decisions.</em>
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
              <motion.a className="button primary" href="#work" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: .98 }}>
                Explore my work <ArrowUpRight size={17} />
              </motion.a>
              <motion.a className="button secondary" href="#contact" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: .98 }}>
                Let&apos;s talk <ArrowDownRight size={17} />
              </motion.a>
            </motion.div>

            <div className="hero-meta">
              <span>Based in India</span>
              <span className="meta-line" />
              <span>Available for entry-level roles</span>
            </div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about">
            <span>SCROLL</span>
            <ArrowDownRight size={17} />
          </a>
        </section>

        <section className="section about" id="about">
          <Reveal>
            <div className="section-kicker">01 — ABOUT</div>
            <div className="about-layout">
              <h2>Curious about data.<br /><span>Serious about solving.</span></h2>
              <div className="about-text">
                <p>
                  I enjoy taking messy data, asking the right questions, and turning the
                  answers into something a business can actually use.
                </p>
                <p>
                  My work combines technical analysis with clear visual storytelling. I&apos;m
                  currently looking for an opportunity where I can contribute, learn from a
                  strong team, and grow as a data professional.
                </p>
                <div className="mini-stats">
                  <div><strong>05+</strong><span>Analytics projects</span></div>
                  <div><strong>04</strong><span>Core tools</span></div>
                  <div><strong>01</strong><span>Clear goal</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section skills" id="skills">
          <Reveal>
            <div className="section-kicker">02 — TOOLKIT</div>
            <div className="section-heading">
              <h2>Tools I use to<br /><span>find the signal.</span></h2>
              <p>From querying raw tables to building dashboards that make the answer obvious.</p>
            </div>
            <motion.div className="skills-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    className="skill-card"
                    key={skill.name}
                    whileHover={{ y: -7 }}
                    initial={{ opacity: 0, y: 25 }}
                    variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  >
                    <div className="skill-icon"><Icon size={21} /></div>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.detail}</p>
                    </div>
                    <span className="skill-number">0{i + 1}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </section>

        <section className="section work" id="work">
          <Reveal>
            <div className="section-kicker">03 — SELECTED WORK</div>
            <div className="work-top">
              <h2>Projects built<br /><span>with purpose.</span></h2>
              <p>Real practice across SQL, Python, BI and spreadsheet-based analysis.</p>
            </div>

            <motion.div className="projects" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
              {projects.map((project, i) => (
                <motion.a
                  className="project"
                  href={project.href}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                  key={project.title}
                  whileHover={{ y: -9, scale: 1.012 }}
                  initial={{ opacity: 0, y: 30 }}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <div className="project-top">
                    <span>{project.number}</span>
                    <ArrowUpRight size={21} />
                  </div>
                  <div className="project-body">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </Reveal>
        </section>

        <section className="process-section">
          <Reveal>
            <div className="process-inner">
              <div className="section-kicker">04 — MY APPROACH</div>
              <h2>From question<br /><span>to insight.</span></h2>
              <motion.div className="process-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
                {[
                  ["01", "Understand", "Start with the business question, not the chart."],
                  ["02", "Clean", "Validate, transform and prepare the data."],
                  ["03", "Analyze", "Use SQL, Python and analytical thinking to find patterns."],
                  ["04", "Communicate", "Turn findings into simple, decision-ready visuals."],
                ].map(([n, title, copy]) => (
                  <motion.div className="process-item" key={n} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} transition={{ duration: .55 }}>
                    <span>{n}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </section>

        <section className="contact" id="contact">
          <div className="contact-grid" />
          <Reveal>
            <div className="contact-inner">
              <div className="section-kicker">05 — CONTACT</div>
              <h2>Have a data problem?<br /><em>Let&apos;s talk.</em></h2>
              <p>
                I&apos;m currently open to entry-level Data Analyst and related opportunities.
                If you think there&apos;s a fit, I&apos;d be happy to connect.
              </p>

              <div className="contact-actions">
                <a className="button primary large" href="mailto:aa8903100@gmail.com">
                  <Mail size={18} /> Email me
                </a>
                <a className="button secondary large" href="https://www.linkedin.com/in/ashishchaudhari03/" target="_blank" rel="noreferrer">
                  <span className="social-mark">in</span> LinkedIn
                </a>
                <a className="button secondary large" href="https://github.com/Ashish-Chaudhari3" target="_blank" rel="noreferrer">
                  <span className="social-mark">GH</span> GitHub
                </a>
              </div>

              <div className="contact-note">
                <Check size={16} /> Usually responds within a day
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <span>© 2026 Ashish Chaudhari</span>
        <span>Built with Next.js · Designed for clarity.</span>
      </footer>
    </>
  );
}
