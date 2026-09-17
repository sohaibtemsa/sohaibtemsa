// Progressive enhancement only: the page is complete without this file.
(() => {
  const d = document;
  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  // Scroll-linked effects that move content only run when motion is welcome.
  const motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const barByCss = CSS.supports("animation-timeline: scroll()");
  const glass = motion && (CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)"));

  // Both pages list their sections in the same order.
  const sectionIds = { fr: ["projets", "parcours", "formation", "competences", "contact"], en: ["projects", "experience", "education", "skills", "contact"] };

  // Where the reader is: which section, how far into it, or at the very bottom (Contact never reaches the line).
  const here = () => {
    const own = sectionIds[d.documentElement.lang] || [];
    let i = -1;
    own.forEach((id, k) => { const s = d.getElementById(id); if (s && s.getBoundingClientRect().top <= innerHeight * 0.4) i = k; });
    const atBottom = innerHeight + scrollY >= d.documentElement.scrollHeight - 2;
    if (atBottom) i = own.length - 1;
    return { i, dy: i >= 0 ? -d.getElementById(own[i]).getBoundingClientRect().top : scrollY, atBottom };
  };
  const placeTop = (place, ids) => {
    if (place.atBottom) return d.documentElement.scrollHeight;
    const s = place.i >= 0 && d.getElementById(ids[place.i]);
    return s ? scrollY + s.getBoundingClientRect().top + place.dy : place.dy;
  };

  // Everything bound to the page content. Returns a teardown so the content can be swapped (language switch).
  const mount = (swapped) => {
    const off = [];
    const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); off.push(() => target.removeEventListener(type, fn, opts)); };

    const header = d.querySelector(".site-header");
    const bar = d.querySelector(".progress");
    const links = [...d.querySelectorAll(".nav a")];
    const sections = links.map((a) => d.getElementById(a.hash.slice(1)));
    const timeline = d.querySelector(".timeline");
    const jobs = timeline ? [...timeline.children] : [];
    const projects = [...d.querySelectorAll(".proj")];

    // Blur-away transitions: each [data-fade] element fades out as the content after it (the next block, or the
    // next section when it ends one) rises to the top of the screen.
    const follower = (el) => {
      for (let n = el; n && n !== d.body; n = n.parentElement) {
        let s = n.nextElementSibling;
        // Inside a section head the title, intro and button fade together, so they skip each other.
        while (s && n === el && el.parentElement.classList.contains("section-head") && s.hasAttribute("data-fade")) s = s.nextElementSibling;
        if (s) return s;
      }
    };
    const fades = motion ? [...d.querySelectorAll("[data-fade]")].map((el) => [el, follower(el)]).filter(([, next]) => next) : [];

    // Liquid-glass edge: a progressive blur at the bottom of the screen while the next section arrives.
    const edge = glass ? d.body.appendChild(Object.assign(d.createElement("div"), { className: "edge", innerHTML: "<i></i><i></i><i></i><i></i>" })) : null;
    if (edge) edge.setAttribute("aria-hidden", "true");
    const boundaries = [...d.querySelectorAll("main > section:not(:first-child)")];

    // One scroll pass: header state, progress bar fallback, active nav link, experience rail and active job,
    // active project, blur-away transitions, glass edge.
    let queued = false;
    const update = () => {
      queued = false;
      const vh = innerHeight;
      header.classList.toggle("is-scrolled", scrollY > 8);

      if (!barByCss) {
        const max = d.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      }

      const line = vh * 0.4;
      const current = sections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
      links.forEach((a) => a.classList.toggle("is-active", !!current && a.hash === "#" + current.id));

      if (timeline) {
        const mid = vh * 0.55;
        // The rail runs from the first dot to the centre of the last one (dots sit 1.75rem + 6px below each card top).
        // Layout offsets, not rects, so cards still sliding in (reveal transform) cannot skew it.
        const r = timeline.getBoundingClientRect();
        const dot = parseFloat(getComputedStyle(d.documentElement).fontSize) * 1.75;
        const endY = jobs[jobs.length - 1].offsetTop + dot + 6;
        timeline.style.setProperty("--rail-bottom", `${(timeline.offsetHeight - endY).toFixed(1)}px`);
        timeline.style.setProperty("--p", clamp01((mid - r.top - dot) / (endY - dot)).toFixed(3));
        let active = null;
        jobs.forEach((job) => {
          const passed = r.top + job.offsetTop + dot <= mid;
          job.classList.toggle("is-passed", passed);
          if (passed) active = job;
        });
        // The job being read: the last dot the fill line has reached; the first job as soon as the list comes up.
        if (!active && r.top < vh * 0.85) active = jobs[0];
        const show = !!active && r.bottom > 0 && r.top < vh;
        timeline.classList.toggle("has-active", show);
        jobs.forEach((job) => job.classList.toggle("is-active", show && job === active));
      }

      // The current project: the last one whose header has reached mid-screen while part of its card is still visible
      // below its pinned header. It stays current for the whole scroll of its card.
      const live = projects.filter((proj) => { const r = proj.getBoundingClientRect(); return r.top <= vh * 0.5 && r.bottom > proj.querySelector(".proj-head").getBoundingClientRect().bottom + 40; });
      projects.forEach((proj) => proj.classList.toggle("is-current", proj === live[live.length - 1]));

      // Inline styles only while fading, so reveal and hover styles apply the rest of the time.
      fades.forEach(([el, next]) => {
        // "late" fades (skill chapters) start lower on the screen, so a chapter the filter scrolls to stays sharp.
        const [start, span] = el.dataset.fade === "late" ? [0.22, 0.2] : [0.42, 0.3];
        const k = clamp01((vh * start - next.getBoundingClientRect().top) / (vh * span));
        const fading = k > 0.001;
        el.style.opacity = fading ? (1 - k).toFixed(3) : "";
        el.style.filter = fading ? `blur(${(k * 12).toFixed(2)}px)` : "";
        el.style.transform = fading ? `translateY(${(-k * 14).toFixed(1)}px)` : "";
      });

      // Glass is fully on while a section boundary sits in the lower third, fading in and out around it.
      if (edge) {
        let k = 0;
        for (const s of boundaries) {
          const y = s.getBoundingClientRect().top;
          k = Math.max(k, Math.min(clamp01((vh * 1.06 - y) / (vh * 0.1)), clamp01((y - vh * 0.45) / (vh * 0.2))));
        }
        edge.style.opacity = k.toFixed(3);
        edge.style.visibility = k > 0.01 ? "visible" : "hidden";
      }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    on(window, "scroll", onScroll, { passive: true });
    let edgeRebuild;
    on(window, "resize", () => {
      if (edge) {
        edge.style.display = "none";
        clearTimeout(edgeRebuild);
        edgeRebuild = setTimeout(() => { edge.style.display = ""; onScroll(); }, 200);
      }
      onScroll();
    });
    off.push(() => clearTimeout(edgeRebuild));

    // Local time in Casablanca.
    const clocks = d.querySelectorAll("[data-clock]");
    try {
      const fmt = new Intl.DateTimeFormat(d.documentElement.lang, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Africa/Casablanca" });
      const tick = () => clocks.forEach((c) => { c.textContent = fmt.format(new Date()); });
      tick();
      d.querySelectorAll("[data-clock-line]").forEach((el) => { el.hidden = false; });
      let every;
      const first = setTimeout(() => { tick(); every = setInterval(tick, 60000); }, 60000 - (Date.now() % 60000));
      off.push(() => { clearTimeout(first); clearInterval(every); });
    } catch {
      // Time zone data unavailable: the clock stays hidden.
    }

    if ("IntersectionObserver" in window && motion) {
      // Hidden-until-revealed states only exist under .js, so a failed script never hides content.
      d.documentElement.classList.add("js");
      d.querySelectorAll("[data-stagger]").forEach((group) =>
        [...group.children].forEach((child, i) => {
          child.setAttribute("data-reveal", "");
          child.style.setProperty("--d", Math.min(i, 5));
        })
      );
      const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        reveal.unobserve(e.target);
        // Once revealed, drop the hook so hover and other transitions behave normally.
        setTimeout(() => e.target.removeAttribute("data-reveal"), 2000);
      }), { rootMargin: "0px 0px -8% 0px" });
      d.querySelectorAll("[data-reveal]").forEach((el) => {
        // After a language swap, what is already on screen (or above it) is shown as it was, without replaying.
        if (swapped && el.getBoundingClientRect().top < innerHeight) {
          el.classList.add("is-in");
          el.removeAttribute("data-reveal");
        } else {
          reveal.observe(el);
        }
      });

      // Looping illustrations only animate while on screen.
      const live = new IntersectionObserver((entries) =>
        entries.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting)));
      d.querySelectorAll("[data-live]").forEach((el) => live.observe(el));
      off.push(() => { reveal.disconnect(); live.disconnect(); });
    }

    // Language switch: swap the page in place (no reload) and keep the reader's exact spot. Modified clicks (new tab)
    // and browsers without fetch/history fall back to the link, which carries the #section and a stored spot.
    d.querySelectorAll("a[hreflang]").forEach((a) => on(a, "click", (e) => {
      const other = sectionIds[a.hreflang];
      if (!other) return;
      const place = here();
      if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && window.fetch && history.pushState) {
        e.preventDefault();
        swap(a.href, place, true);
        return;
      }
      const url = new URL(a.href);
      url.hash = place.i >= 0 ? other[place.i] : "";
      a.href = url.href;
      try {
        sessionStorage.setItem("lang-place", JSON.stringify({ ...place, id: place.i >= 0 ? other[place.i] : null }));
      } catch {
        // Storage blocked: the hash still opens the right section.
      }
    }));

    // Skills filter: show which skills were used in a given context (a job, a project, a course, GitHub).
    const filter = d.querySelector(".sk-filter");
    if (filter) {
      const chips = [...filter.querySelectorAll(".sk-chip")];
      const tiles = [...d.querySelectorAll(".sk-tile")];
      const status = filter.querySelector("[aria-live]");
      const choose = (ctx) => {
        chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.ctx === ctx)));
        let n = 0;
        tiles.forEach((t) => {
          const hit = !ctx || t.dataset.ctx.split(" ").includes(ctx);
          t.classList.toggle("is-dim", !hit);
          t.classList.toggle("is-hit", !!ctx && hit);
          if (hit) n++;
        });
        d.querySelectorAll(".sk-chapter").forEach((ch) => {
          ch.classList.toggle("is-empty", !!ctx && !ch.querySelector(".sk-tile.is-hit"));
        });
        status.textContent = filter.dataset.status.replace("{n}", n);
        // Bring the first highlighted skill's chapter into view, just below the pinned filter bar.
        const first = ctx && d.querySelector(".sk-tile.is-hit");
        if (first) {
          const chapter = first.closest(".sk-chapter");
          const offset = filter.getBoundingClientRect().bottom + 16;
          const target = chapter.getBoundingClientRect().top;
          const tile = first.getBoundingClientRect();
          // Aim at the chapter head, unless that would leave the first match below the screen.
          const aim = tile.bottom - target < innerHeight - offset - 24 ? target : tile.top - 24;
          scrollTo({ top: scrollY + aim - offset, behavior: motion ? "smooth" : "instant" });
        }
      };
      chips.forEach((c) => on(c, "click", () => choose(c.getAttribute("aria-pressed") === "true" && c.dataset.ctx ? "" : c.dataset.ctx)));
      filter.hidden = false;
    }

    // Copy e-mail address.
    d.querySelectorAll("[data-copy]").forEach((btn) => {
      if (!navigator.clipboard) return;
      const label = btn.querySelector(".copy-label");
      const idle = label.textContent;
      let timer;
      btn.hidden = false;
      on(btn, "click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
        } catch {
          return;
        }
        label.textContent = btn.dataset.done;
        btn.classList.add("is-done");
        clearTimeout(timer);
        timer = setTimeout(() => { label.textContent = idle; btn.classList.remove("is-done"); }, 2000);
      });
    });

    update();
    return () => { off.forEach((f) => f()); edge?.remove(); };
  };

  let unmount = mount(false);

  // In-place language swap: fetch the other page, replace head metadata and body, keep the reading position.
  let busy = false;
  const swap = async (url, place, push) => {
    if (busy) return;
    busy = true;
    let doc;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      doc = new DOMParser().parseFromString(await res.text(), "text/html");
    } catch {
      location.href = url;
      return;
    }
    const lang = doc.documentElement.lang;
    const apply = () => {
      unmount();
      // Update the address first so relative URLs in the new content resolve against it.
      if (push) history.pushState({ lang }, "", url);
      d.documentElement.lang = lang;
      d.title = doc.title;
      // Metadata, plus the icon links: their relative paths differ between / and /en/.
      ['meta[name="description"]', 'link[rel="canonical"]', 'meta[property^="og:"]', 'script[type="application/ld+json"]', 'link[rel~="icon"]', 'link[rel="apple-touch-icon"]'].forEach((sel) => {
        const now = [...d.head.querySelectorAll(sel)], next = [...doc.head.querySelectorAll(sel)];
        now.forEach((el, k) => {
          if (!next[k]) return;
          const copy = d.importNode(next[k], true);
          // Resolve against the target page, so the address change cannot point a relative icon path at the wrong folder.
          if (copy.hasAttribute("href")) copy.setAttribute("href", new URL(copy.getAttribute("href"), url).href);
          el.replaceWith(copy);
        });
      });
      d.documentElement.classList.add("swapped");
      d.body.replaceWith(d.adoptNode(doc.body));
      scrollTo({ top: placeTop(place, sectionIds[lang] || []), behavior: "instant" });
      unmount = mount(true);
      // Mounting shows elements the fetched page keeps hidden (skills filter, clocks), which shifts the layout: place again.
      scrollTo({ top: placeTop(place, sectionIds[lang] || []), behavior: "instant" });
      d.querySelector(".lang a[aria-current]")?.focus({ preventScroll: true });
    };
    if (motion && d.startViewTransition) await d.startViewTransition(apply).finished.catch(() => {});
    else apply();
    busy = false;
  };

  // Back / forward between the two languages swaps in place too; plain #anchor steps are left to the browser.
  if ("scrollRestoration" in history) history.scrollRestoration = "auto";
  addEventListener("popstate", () => {
    const lang = /\/en\/?(index\.html)?$/.test(location.pathname) ? "en" : "fr";
    if (lang !== d.documentElement.lang) swap(location.href, here(), false);
  });

  // Arriving from a new-tab or fallback language switch: restore the stored spot. The browser's own jump to the
  // #section can land after this script, so apply it again when loading ends unless the reader has scrolled.
  let place = null;
  try {
    place = JSON.parse(sessionStorage.getItem("lang-place"));
    sessionStorage.removeItem("lang-place");
  } catch {
    place = null;
  }
  if (place && (!place.id || location.hash === "#" + place.id)) {
    const restore = () => scrollTo({ top: placeTop(place, sectionIds[d.documentElement.lang] || []), behavior: "instant" });
    restore();
    const landed = scrollY;
    addEventListener("load", () => { if (Math.abs(scrollY - landed) < 2 || location.hash) restore(); }, { once: true });
  }

  // Smooth scrolling for in-page links only after arrival, so any landing above is instant.
  addEventListener("load", () => requestAnimationFrame(() => requestAnimationFrame(() => d.documentElement.classList.add("smooth"))));
})();
