# ================================================================
# 🚀 Premium Astro Portfolio Generator (BOM-free)
# Anshuman's Portfolio — Altivon Holdings
# Creates all files & folders automatically.
# Run this from the folder where you want the project.
# ================================================================

$projectRoot = Get-Location
$projectName = "anshuman-premium-portfolio"

# ----- Create root folder -----
$rootPath = Join-Path $projectRoot $projectName
New-Item -Path $rootPath -ItemType Directory -Force | Out-Null
Set-Location $rootPath

# ----- Create folder structure -----
$folders = @(
    "src/layouts",
    "src/components",
    "src/pages",
    "public"
)
foreach ($folder in $folders) {
    New-Item -Path $folder -ItemType Directory -Force | Out-Null
}

# ----- Helper function to write files (BOM-free UTF-8) -----
function Write-File {
    param(
        [string]$relativePath,
        [string]$content
    )
    $fullPath = Join-Path (Get-Location) $relativePath
    # Use .NET method to write UTF-8 without BOM
    [System.IO.File]::WriteAllText($fullPath, $content, (New-Object System.Text.UTF8Encoding $false))
    Write-Host "✅ Created: $relativePath"
}

# ================================================================
# 1. package.json
# ================================================================
Write-File "package.json" @'
{
  "name": "anshuman-portfolio",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.16.0"
  }
}
'@

# ================================================================
# 2. astro.config.mjs
# ================================================================
Write-File "astro.config.mjs" @'
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anshumanhq.github.io',
  output: 'static',
});
'@

# ================================================================
# 3. src/layouts/Layout.astro
# ================================================================
Write-File "src/layouts/Layout.astro" @'
---
const { title = "Anshuman | Altivon Holdings", description = "Self-taught developer & founder of Altivon Holdings — building web apps, tools & AI systems." } = Astro.props;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  :root {
    --bg: #05060a;
    --bg-soft: #0b0d14;
    --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --text: #eef0f5;
    --text-dim: #9aa0ae;
    --accent: #7c5cff;
    --accent-2: #22d3ee;
    --accent-3: #ff5cb1;
    --gradient: linear-gradient(135deg, var(--accent), var(--accent-2));
    --radius: 18px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
  }

  h1, h2, h3, h4, .heading-font {
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.02em;
  }

  a { color: inherit; text-decoration: none; }

  .section {
    max-width: 1180px;
    margin: 0 auto;
    padding: 120px 24px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-2);
    margin-bottom: 16px;
  }

  .eyebrow::before {
    content: '';
    width: 24px;
    height: 2px;
    background: var(--gradient);
    display: inline-block;
  }

  .gradient-text {
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1px solid transparent;
  }

  .btn-primary {
    background: var(--gradient);
    color: #06070c;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px -8px rgba(124,92,255,0.6);
  }

  .btn-ghost {
    background: var(--surface);
    color: var(--text);
    border-color: var(--border);
    backdrop-filter: blur(10px);
  }
  .btn-ghost:hover {
    border-color: var(--accent-2);
    transform: translateY(-2px);
  }

  ::selection { background: var(--accent); color: white; }

  @media (max-width: 768px) {
    .section { padding: 80px 20px; }
  }
</style>
'@

# ================================================================
# 4. src/components/Header.astro
# ================================================================
Write-File "src/components/Header.astro" @'
---
const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
---
<header class="nav">
  <div class="nav-inner">
    <a href="#" class="logo heading-font">Alti<span class="gradient-text">von</span></a>
    <nav class="links">
      {links.map(l => <a href={l.href}>{l.label}</a>)}
    </nav>
    <a href="#contact" class="btn btn-primary nav-cta">Let's Talk</a>
    <button class="burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    {links.map(l => <a href={l.href}>{l.label}</a>)}
    <a href="#contact" class="btn btn-primary">Let's Talk</a>
  </div>
</header>

<style>
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(5,6,10,0.7);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo { font-size: 1.4rem; font-weight: 700; }
  .links { display: flex; gap: 32px; }
  .links a { color: var(--text-dim); font-weight: 500; font-size: 0.95rem; transition: color 0.2s; }
  .links a:hover { color: var(--text); }
  .nav-cta { padding: 10px 22px; font-size: 0.85rem; }
  .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
  .burger span { width: 22px; height: 2px; background: var(--text); }
  .mobile-menu {
    display: none;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    background: var(--bg-soft);
    border-top: 1px solid var(--border);
  }
  .mobile-menu.open { display: flex; }

  @media (max-width: 860px) {
    .links, .nav-cta { display: none; }
    .burger { display: flex; }
  }
</style>

<script>
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  burger?.addEventListener('click', () => menu?.classList.toggle('open'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
</script>
'@

# ================================================================
# 5. src/components/Hero.astro
# ================================================================
Write-File "src/components/Hero.astro" @'
<section class="hero">
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="hero-content">
    <div class="eyebrow">Building since 2023 · India</div>
    <h1 class="heading-font hero-title">
      We craft <span class="gradient-text">digital products</span><br />
      that actually ship.
    </h1>
    <p class="hero-sub">
      Altivon Holdings — a web development studio led by Anshuman, self-taught developer
      with 60+ shipped projects. From client websites to AI systems, we build fast and build right.
    </p>
    <div class="hero-actions">
      <a href="#projects" class="btn btn-primary">View Projects →</a>
      <a href="#contact" class="btn btn-ghost">Get a Quote</a>
    </div>
    <div class="hero-stats">
      <div><strong>60+</strong><span>Projects Shipped</span></div>
      <div><strong>2</strong><span>PyPI Libraries</span></div>
      <div><strong>2023</strong><span>Started Coding</span></div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 140px 24px 80px;
    overflow: hidden;
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
    z-index: 0;
  }
  .orb1 { width: 420px; height: 420px; background: var(--accent); top: -100px; right: -80px; }
  .orb2 { width: 340px; height: 340px; background: var(--accent-2); bottom: -60px; left: -60px; }

  .hero-content { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }
  .hero-title { font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 700; line-height: 1.1; margin-bottom: 24px; }
  .hero-sub { font-size: 1.1rem; color: var(--text-dim); max-width: 600px; margin: 0 auto 36px; }
  .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px; }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }
  .hero-stats div { display: flex; flex-direction: column; gap: 4px; }
  .hero-stats strong { font-size: 1.8rem; font-family: 'Space Grotesk', sans-serif; }
  .hero-stats span { font-size: 0.85rem; color: var(--text-dim); }
</style>
'@

# ================================================================
# 6. src/components/About.astro
# ================================================================
Write-File "src/components/About.astro" @'
<section class="section" id="about">
  <div class="about-grid">
    <div>
      <div class="eyebrow">About</div>
      <h2 class="heading-font about-title">Self-taught. <span class="gradient-text">Self-driven.</span></h2>
      <p class="about-text">
        I'm Anshuman, a developer based in Uttar Pradesh, India. I started coding in 2023 and since then
        have shipped 60+ projects — from client websites to full AI orchestration platforms. I develop
        primarily on Termux and deploy across Render, GitHub Pages, and PythonAnywhere.
      </p>
      <p class="about-text">
        My long-term goal is to study Computer Science at an NIT, while continuing to grow
        Altivon Holdings as a serious development studio.
      </p>
      <div class="tags">
        <span>Python</span><span>Astro</span><span>Flask</span><span>Kotlin</span><span>AI Systems</span><span>Android</span>
      </div>
    </div>
    <div class="about-cards">
      <div class="mini-card">
        <h4>PyFusion</h4>
        <p>Published PyPI library — pyfusion-v1</p>
      </div>
      <div class="mini-card">
        <h4>SecureKit</h4>
        <p>Published PyPI security-focused library</p>
      </div>
      <div class="mini-card">
        <h4>Dev Environment</h4>
        <p>Builds entirely on Termux (Android)</p>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: start; }
  .about-title { font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 20px; }
  .about-text { color: var(--text-dim); margin-bottom: 16px; font-size: 1.02rem; }
  .tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .tags span {
    padding: 8px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 0.82rem;
    color: var(--text-dim);
  }
  .about-cards { display: flex; flex-direction: column; gap: 16px; }
  .mini-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px;
    backdrop-filter: blur(10px);
  }
  .mini-card h4 { font-family: 'Space Grotesk', sans-serif; margin-bottom: 6px; }
  .mini-card p { color: var(--text-dim); font-size: 0.9rem; }

  @media (max-width: 860px) {
    .about-grid { grid-template-columns: 1fr; }
  }
</style>
'@

# ================================================================
# 7. src/components/Services.astro
# ================================================================
Write-File "src/components/Services.astro" @'
---
const services = [
  { icon: "🌐", title: "Web Development", desc: "Custom websites & web apps built with modern frameworks, deployed fast." },
  { icon: "🧩", title: "Client Portals", desc: "Invoicing, admin dashboards, and messaging systems for businesses." },
  { icon: "🤖", title: "AI Integrations", desc: "AI-powered tools, chat systems, and multi-agent orchestration." },
  { icon: "📱", title: "Android Apps", desc: "Kotlin/Compose apps with education, business & productivity modules." },
];
---
<section class="section" id="services">
  <div class="eyebrow">What We Do</div>
  <h2 class="heading-font services-title">Services built for <span class="gradient-text">real results</span></h2>
  <div class="services-grid">
    {services.map(s => (
      <div class="service-card">
        <div class="service-icon">{s.icon}</div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    ))}
  </div>
</section>

<style>
  .services-title { font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 48px; max-width: 600px; }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .service-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px 26px;
    transition: transform 0.3s, border-color 0.3s;
  }
  .service-card:hover { transform: translateY(-6px); border-color: var(--accent); }
  .service-icon { font-size: 2rem; margin-bottom: 16px; }
  .service-card h3 { font-family: 'Space Grotesk', sans-serif; margin-bottom: 10px; font-size: 1.15rem; }
  .service-card p { color: var(--text-dim); font-size: 0.92rem; }
</style>
'@

# ================================================================
# 8. src/components/Projects.astro
# ================================================================
Write-File "src/components/Projects.astro" @'
---
const projects = [
  { name: "NEXUS AI", tag: "Multi-Agent Platform", desc: "AI orchestration platform with multi-tier memory system." },
  { name: "Face Vault", tag: "Security", desc: "Face-recognition app with anti-spoofing, deployed on Render." },
  { name: "QuantumAtlas", tag: "EdTech", desc: "Physics education site with interactive simulations." },
  { name: "ResearchHub", tag: "Research Tool", desc: "Aggregates arXiv, PubMed & Semantic Scholar in one place." },
  { name: "CBT Portal", tag: "EdTech", desc: "Computer-based test system — Flask server + Android exam client." },
  { name: "NexCore", tag: "Android", desc: "All-in-one Android app: education, business, tools & AI chat." },
];
---
<section class="section" id="projects">
  <div class="eyebrow">Selected Work</div>
  <h2 class="heading-font projects-title">Projects that <span class="gradient-text">ship & scale</span></h2>
  <div class="projects-grid">
    {projects.map(p => (
      <div class="project-card">
        <div class="project-top">
          <span class="project-tag">{p.tag}</span>
        </div>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
      </div>
    ))}
  </div>
  <p class="more-note">+ 50 more projects on <a href="https://github.com/anshuman365" target="_blank" class="gradient-text">GitHub →</a></p>
</section>

<style>
  .projects-title { font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 48px; max-width: 600px; }
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  .project-card::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--gradient);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  .project-card:hover { transform: translateY(-4px); border-color: transparent; }
  .project-card:hover::before { opacity: 0.08; }
  .project-tag {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-2);
    font-weight: 600;
  }
  .project-card h3 { font-family: 'Space Grotesk', sans-serif; margin: 12px 0 8px; font-size: 1.25rem; }
  .project-card p { color: var(--text-dim); font-size: 0.92rem; }
  .more-note { text-align: center; margin-top: 40px; color: var(--text-dim); }
</style>
'@

# ================================================================
# 9. src/components/Contact.astro
# ================================================================
Write-File "src/components/Contact.astro" @'
<section class="section" id="contact">
  <div class="contact-box">
    <div class="eyebrow" style="justify-content:center;">Get In Touch</div>
    <h2 class="heading-font contact-title">Let's build something <span class="gradient-text">great together</span></h2>
    <p class="contact-sub">Have a project in mind? Reach out and let's talk.</p>
    <div class="contact-links">
      <a href="https://github.com/anshuman365" target="_blank" class="btn btn-ghost">GitHub</a>
      <a href="https://twitter.com/SarvarSing35025" target="_blank" class="btn btn-ghost">Twitter</a>
      <a href="https://instagram.com/anshumansingh.dev" target="_blank" class="btn btn-ghost">Instagram</a>
      <a href="mailto:hello@altivon.com" class="btn btn-primary">Email Us →</a>
    </div>
  </div>
</section>

<style>
  .contact-box {
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 80px 32px;
    position: relative;
    overflow: hidden;
  }
  .contact-box::before {
    content: '';
    position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
    width: 600px; height: 600px;
    background: var(--gradient);
    opacity: 0.12;
    filter: blur(100px);
    border-radius: 50%;
  }
  .contact-title { position: relative; font-size: clamp(1.8rem, 5vw, 2.8rem); margin: 16px 0; }
  .contact-sub { position: relative; color: var(--text-dim); margin-bottom: 32px; }
  .contact-links { position: relative; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
</style>
'@

# ================================================================
# 10. src/components/Footer.astro
# ================================================================
Write-File "src/components/Footer.astro" @'
<footer class="footer">
  <p>© {new Date().getFullYear()} Altivon Holdings. Built with Astro.</p>
</footer>

<style>
  .footer {
    text-align: center;
    padding: 32px;
    color: var(--text-dim);
    font-size: 0.85rem;
    border-top: 1px solid var(--border);
  }
</style>
'@

# ================================================================
# 11. src/pages/index.astro
# ================================================================
Write-File "src/pages/index.astro" @'
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Services from '../components/Services.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Header />
  <Hero />
  <About />
  <Services />
  <Projects />
  <Contact />
  <Footer />
</Layout>
'@

# ================================================================
# 🎉 Done!
# ================================================================
Write-Host ""
Write-Host "✅ Premium portfolio created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Project path: $rootPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Next steps:" -ForegroundColor Yellow
Write-Host "  1. cd $projectName"
Write-Host "  2. npm install"
Write-Host "  3. npm run dev"
Write-Host ""
Write-Host "🔥 Then open: http://localhost:4321" -ForegroundColor Green