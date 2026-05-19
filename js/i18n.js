(function (global) {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";

  var strings = {
    fr: {
      "meta.title": "Sohaib Temsamani | Ingénieur IA",
      "meta.description":
        "Portfolio de TEMSAMANI Sohaib — Ingénieur IA, Computer Vision. ENSA, expériences Marwa, OCP, Mentis.",
      "skip": "Aller au contenu",
      "aria.home": "Accueil",
      "aria.nav": "Principal",
      "aria.lang": "Langue",
      "aria.theme": "Thème",
      "theme.dark": "Mode sombre",
      "theme.light": "Mode clair",
      "aria.menu": "Menu",
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.parcours": "Parcours",
      "nav.skills": "Compétences",
      "nav.projects": "Projets",
      "nav.contact": "Contact",
      "hero.title": 'Bonjour, je suis <span class="accent">Sohaib Temsamani</span>',
      "hero.status.ai": "Ingénieur IA",
      "hero.status.agents": "Agents IA",
      "hero.lead":
        "Pipelines CV temps réel et agents IA chez <strong>Marwa</strong>. Diplômé ENSA en transformation digitale industrielle.",
      "hero.cv": "Télécharger le CV",
      "hero.projects": "Voir les projets",
      "hero.contact": "Me contacter",
      "hero.location": "Casablanca, Maroc",
      "hero.imgAlt": "Portrait de Sohaib Temsamani",
      "about.tag": "À propos",
      "about.role": "Ingénieur IA · Computer Vision",
      "about.lead":
        "Je suis <strong>TEMSAMANI Sohaib</strong>, ingénieur IA basé à <strong>Casablanca</strong>, diplômé ENSA en transformation digitale industrielle.",
      "about.p1":
        "Aujourd'hui chez <strong>Marwa</strong>, je développe des pipelines computer vision temps réel (YOLO, détection, tracking, Re-ID multi-caméras), des agents IA basés sur LLM (RAG, STT/TTS) et des architectures data en flux (Kafka, EMQX, MQTT).",
      "about.h.marwa.t": "Marwa · CDI",
      "about.h.marwa.p": "IA & computer vision — pipelines temps réel et agents LLM.",
      "about.h.ensa.t": "ENSA · TDI",
      "about.h.ensa.p": "Transformation digitale industrielle — ingénieur.",
      "parcours.tag": "Parcours",
      "parcours.h": "Expérience & formation",
      "parcours.sub": "Mon parcours professionnel, académique et certifications.",
      "parcours.exp": "Expérience professionnelle",
      "parcours.edu": "Formation",
      "parcours.certs": "Certifications",
      "parcours.e1.time": "Juil. 2025 — Aujourd'hui",
      "parcours.e1.title": "Ingénieur IA & Computer Vision · Marwa",
      "parcours.e1.meta": "CDI · Casablanca",
      "parcours.e1.desc":
        "Pipelines CV temps réel (YOLO, détection, tracking, Re-ID multi-caméras). Agents IA LLM (RAG, STT/TTS). Optimisation d'inférence. Data engineering (Kafka, EMQX, MQTT).",
      "parcours.e2.time": "Fév. 2025 · 6 mois",
      "parcours.e2.title": "Stage ingénieur Data Science · Luova",
      "parcours.e2.desc":
        "Analyse de données, chatbot / agent IA, développement et déploiement de modèles ML, digitalisation d'un système de management.",
      "parcours.e3.time": "Fév. 2024 · 6 mois",
      "parcours.e3.title": "Ingénieur IA full stack · Mentis",
      "parcours.e3.desc":
        "Système de détection de contenu textuel généré par LLM avec interface utilisateur — computer vision & full stack.",
      "parcours.e4.time": "Juil. 2023 · 2 mois",
      "parcours.e4.title": "Stage ingénieur · OCP",
      "parcours.e4.desc":
        "Agent SQL avec N8N et PostgreSQL (Odoo) sur serveur Oracle. Tableau de bord interactif pour capteurs IoT. Stack : Docker, OpenAI, N8N, Linux.",
      "parcours.e5.time": "Juil. 2022 · 2 mois",
      "parcours.e5.title": "Stage d'application · Cosumar",
      "parcours.e5.desc":
        "Application mobile Android pour digitaliser les processus d'inspection mécanique (Bureau Méthode).",
      "parcours.ed1.title": "ENSA · Ingénieur",
      "parcours.ed1.meta": "Transformation digitale industrielle (TDI)",
      "skills.tag": "Compétences",
      "skills.h": "Stack & domaines d'expertise",
      "skills.sub":
        "Regroupées par ce que je conçois au quotidien : modèles IA, logiciel et industrialisation data.",
      "skills.c1.t": "Intelligence artificielle",
      "skills.c1.d": "Modélisation, vision par ordinateur et applications LLM.",
      "skills.c1.s1": "ML & modèles",
      "skills.c1.s2": "Vision & langage",
      "skills.c2.t": "Développement & déploiement",
      "skills.c2.d": "Implémentation, APIs et mise en production.",
      "skills.c2.s1": "Langages",
      "skills.c2.s2": "Outils & stacks",
      "skills.c3.t": "Data, infra & méthodes",
      "skills.c3.d": "Flux temps réel, BI et travail en équipe agile.",
      "skills.c3.s1": "Pipelines & données",
      "skills.c3.s2": "BI & organisation",
      "skills.tag.db": "Bases de données",
      "skills.tag.pm": "Management de projet",
      "projects.tag": "Projets",
      "projects.h": "Ce que j'ai construit",
      "projects.sub": "Solutions IA, data et logiciel livrées en entreprise et en stage.",
      "projects.p1.t": "Pipelines temps réel multi-caméras",
      "projects.p1.d":
        "YOLO, détection, tracking et Re-ID pour la surveillance industrielle. Optimisation d'inférence et flux data (Kafka, MQTT).",
      "projects.p1.tag": "Temps réel",
      "projects.p2.t": "Détection de fraude administrative",
      "projects.p2.d":
        "Analyse automatique des dossiers pour repérer les anomalies et prioriser les investigations.",
      "projects.p2.co": "Projet IA",
      "projects.p3.t": "Agent SQL · Odoo & N8N",
      "projects.p3.d":
        "Agent conversationnel SQL sur PostgreSQL Odoo, orchestré avec N8N sur infrastructure Oracle.",
      "projects.p4.t": "Détection de texte généré par LLM",
      "projects.p4.d":
        "Système de classification de contenu produit par grand modèle de langage, avec interface utilisateur.",
      "projects.p5.t": "Tableau de bord capteurs",
      "projects.p5.d":
        "Visualisation interactive des données capteurs pour le suivi de l'état des machines.",
      "projects.p5.tag": "Industrie",
      "projects.p6.t": "App inspection mécanique",
      "projects.p6.d":
        "Application Android pour digitaliser les processus d'inspection au Bureau Méthode.",
      "projects.cta": "Plus de code et d'expérimentations sur GitHub.",
      "projects.github": "Voir mon GitHub",
      "contact.tag": "Contact",
      "contact.h": "Travaillons ensemble",
      "contact.sub": "Un projet IA, une opportunité professionnelle ou un simple échange.",
      "contact.status": "Ouvert aux collaborations",
      "contact.intro.t": "Parlons de votre prochain projet",
      "contact.intro.p":
        "Ingénieur IA basé à <strong>Casablanca</strong>. Contactez-moi par email ou LinkedIn pour discuter de computer vision, agents IA ou data science.",
      "contact.email": "Envoyer un email",
      "contact.cv": "Télécharger mon CV",
      "contact.loc.label": "Localisation",
      "contact.loc.value": "Casablanca, Casablanca-Settat · Maroc",
      "contact.phone": "Téléphone",
      "contact.cv.label": "Curriculum vitae",
      "contact.cv.value": "PDF · Téléchargement direct",
      "contact.mail.subject": "Contact portfolio — Sohaib Temsamani",
      "footer.copy": '© <span id="year"></span> Sohaib Temsamani · Casablanca, Maroc',
      "footer.top": "Haut de page ↑",
    },
    en: {
      "meta.title": "Sohaib Temsamani | AI Engineer",
      "meta.description":
        "Portfolio of TEMSAMANI Sohaib — AI Engineer, Computer Vision. ENSA, experience at Marwa, OCP, Mentis.",
      "skip": "Skip to content",
      "aria.home": "Home",
      "aria.nav": "Main",
      "aria.lang": "Language",
      "aria.theme": "Theme",
      "theme.dark": "Dark mode",
      "theme.light": "Light mode",
      "aria.menu": "Menu",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.parcours": "Experience",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "hero.title": 'Hello, I\'m <span class="accent">Sohaib Temsamani</span>',
      "hero.status.ai": "AI Engineer",
      "hero.status.agents": "AI Agents",
      "hero.lead":
        "Real-time CV pipelines and AI agents at <strong>Marwa</strong>. ENSA graduate in industrial digital transformation.",
      "hero.cv": "Download CV",
      "hero.projects": "View projects",
      "hero.contact": "Contact me",
      "hero.location": "Casablanca, Morocco",
      "hero.imgAlt": "Portrait of Sohaib Temsamani",
      "about.tag": "About",
      "about.role": "AI Engineer · Computer Vision",
      "about.lead":
        "I'm <strong>TEMSAMANI Sohaib</strong>, an AI engineer based in <strong>Casablanca</strong>, ENSA graduate in industrial digital transformation.",
      "about.p1":
        "At <strong>Marwa</strong>, I build real-time computer vision pipelines (YOLO, detection, tracking, multi-camera Re-ID), LLM-based AI agents (RAG, STT/TTS), and streaming data architectures (Kafka, EMQX, MQTT).",
      "about.h.marwa.t": "Marwa · Full-time",
      "about.h.marwa.p": "AI & computer vision — real-time pipelines and LLM agents.",
      "about.h.ensa.t": "ENSA · TDI",
      "about.h.ensa.p": "Industrial digital transformation — engineer.",
      "parcours.tag": "Experience",
      "parcours.h": "Experience & education",
      "parcours.sub": "Professional background, academics, and certifications.",
      "parcours.exp": "Professional experience",
      "parcours.edu": "Education",
      "parcours.certs": "Certifications",
      "parcours.e1.time": "Jul. 2025 — Present",
      "parcours.e1.title": "AI & Computer Vision Engineer · Marwa",
      "parcours.e1.meta": "Full-time · Casablanca",
      "parcours.e1.desc":
        "Real-time CV pipelines (YOLO, detection, tracking, multi-camera Re-ID). LLM AI agents (RAG, STT/TTS). Inference optimization. Data engineering (Kafka, EMQX, MQTT).",
      "parcours.e2.time": "Feb. 2025 · 6 months",
      "parcours.e2.title": "Data Science Engineering Intern · Luova",
      "parcours.e2.desc":
        "Data analysis, chatbot / AI agent, ML model development and deployment, management system digitalization.",
      "parcours.e3.time": "Feb. 2024 · 6 months",
      "parcours.e3.title": "Full-stack AI Engineer · Mentis",
      "parcours.e3.desc":
        "LLM-generated text detection system with user interface — computer vision & full stack.",
      "parcours.e4.time": "Jul. 2023 · 2 months",
      "parcours.e4.title": "Engineering Intern · OCP",
      "parcours.e4.desc":
        "SQL agent with N8N and PostgreSQL (Odoo) on Oracle server. Interactive IoT sensor dashboard. Stack: Docker, OpenAI, N8N, Linux.",
      "parcours.e5.time": "Jul. 2022 · 2 months",
      "parcours.e5.title": "Application Internship · Cosumar",
      "parcours.e5.desc":
        "Android mobile app to digitize mechanical inspection processes (Methods Office).",
      "parcours.ed1.title": "ENSA · Engineer",
      "parcours.ed1.meta": "Industrial digital transformation (TDI)",
      "skills.tag": "Skills",
      "skills.h": "Stack & areas of expertise",
      "skills.sub":
        "Grouped by what I build daily: AI models, software, and data industrialization.",
      "skills.c1.t": "Artificial intelligence",
      "skills.c1.d": "Modeling, computer vision, and LLM applications.",
      "skills.c1.s1": "ML & models",
      "skills.c1.s2": "Vision & language",
      "skills.c2.t": "Development & deployment",
      "skills.c2.d": "Implementation, APIs, and production rollout.",
      "skills.c2.s1": "Languages",
      "skills.c2.s2": "Tools & stacks",
      "skills.c3.t": "Data, infra & methods",
      "skills.c3.d": "Real-time streams, BI, and agile teamwork.",
      "skills.c3.s1": "Pipelines & data",
      "skills.c3.s2": "BI & organization",
      "skills.tag.db": "Databases",
      "skills.tag.pm": "Project management",
      "projects.tag": "Projects",
      "projects.h": "What I've built",
      "projects.sub": "AI, data, and software solutions delivered in industry and internships.",
      "projects.p1.t": "Real-time multi-camera pipelines",
      "projects.p1.d":
        "YOLO, detection, tracking, and Re-ID for industrial surveillance. Inference optimization and data flows (Kafka, MQTT).",
      "projects.p1.tag": "Real-time",
      "projects.p2.t": "Administrative fraud detection",
      "projects.p2.d":
        "Automated case analysis to spot anomalies and prioritize investigations.",
      "projects.p2.co": "AI project",
      "projects.p3.t": "SQL agent · Odoo & N8N",
      "projects.p3.d":
        "Conversational SQL agent on Odoo PostgreSQL, orchestrated with N8N on Oracle infrastructure.",
      "projects.p4.t": "LLM-generated text detection",
      "projects.p4.d":
        "Classification system for large language model output, with user interface.",
      "projects.p5.t": "Sensor dashboard",
      "projects.p5.d":
        "Interactive sensor data visualization for machine health monitoring.",
      "projects.p5.tag": "Industry",
      "projects.p6.t": "Mechanical inspection app",
      "projects.p6.d":
        "Android application to digitize inspection processes at the Methods Office.",
      "projects.cta": "More code and experiments on GitHub.",
      "projects.github": "View my GitHub",
      "contact.tag": "Contact",
      "contact.h": "Let's work together",
      "contact.sub": "An AI project, a job opportunity, or just a chat.",
      "contact.status": "Open to collaborations",
      "contact.intro.t": "Let's talk about your next project",
      "contact.intro.p":
        "AI engineer based in <strong>Casablanca</strong>. Reach out by email or LinkedIn to discuss computer vision, AI agents, or data science.",
      "contact.email": "Send an email",
      "contact.cv": "Download my CV",
      "contact.loc.label": "Location",
      "contact.loc.value": "Casablanca, Casablanca-Settat · Morocco",
      "contact.phone": "Phone",
      "contact.cv.label": "Curriculum vitae",
      "contact.cv.value": "PDF · Direct download",
      "contact.mail.subject": "Portfolio contact — Sohaib Temsamani",
      "footer.copy": '© <span id="year"></span> Sohaib Temsamani · Casablanca, Morocco',
      "footer.top": "Back to top ↑",
    },
  };

  function t(lang, key) {
    var pack = strings[lang] || strings.fr;
    return pack[key] != null ? pack[key] : strings.fr[key] || key;
  }

  function applyLang(lang) {
    if (!strings[lang]) lang = "fr";

    document.documentElement.lang = lang;

    var title = t(lang, "meta.title");
    document.title = title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t(lang, "meta.description"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(lang, el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(lang, el.getAttribute("data-i18n-html"));
    });

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(lang, el.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(lang, el.getAttribute("data-i18n-alt")));
    });

    var mailMain = document.querySelector("[data-i18n-mail]");
    if (mailMain) {
      var base = mailMain.getAttribute("href").split("?")[0];
      mailMain.setAttribute(
        "href",
        base + "?subject=" + encodeURIComponent(t(lang, "contact.mail.subject"))
      );
    }

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function getInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "fr") return saved;
    } catch (e) {
      /* ignore */
    }
    var browser = (navigator.language || "").toLowerCase();
    if (browser.indexOf("en") === 0) return "en";
    return "fr";
  }

  function init() {
    var lang = getInitialLang();
    applyLang(lang);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  }

  global.PortfolioI18n = { init: init, applyLang: applyLang, t: t };
})(window);
