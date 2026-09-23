const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Cursor: an inverted dot that stretches with speed. Over a link it
   morphs into a rounded box around the link, inverting the text, and
   leans slightly towards the pointer. */
if (finePointer && !reducedMotion) {
  const cursor = document.createElement("div");
  const mouse = { x: -100, y: -100 };
  const box = { x: -100, y: -100, w: 10, h: 10, r: 5 };
  const DOT = 10;
  let hovered = null;
  let pressed = 0;
  let pressTarget = 0;
  let angle = 0;
  let stretch = 0;
  let started = false;
  let last = performance.now();

  cursor.className = "cursor";
  document.body.append(cursor);
  root.classList.add("has-cursor");

  try {
    const saved = JSON.parse(sessionStorage.getItem("cursor-position"));
    if (saved) {
      Object.assign(mouse, saved);
      box.x = saved.x;
      box.y = saved.y;
      started = true;
      document.body.classList.add("cursor-ready");
    }
  } catch {}

  const lerp = (from, to, k) => from + (to - from) * k;

  const render = (now) => {
    const dt = Math.min((now - last) / 16.7, 3);
    last = now;
    if (hovered && !hovered.isConnected) hovered = null;

    let goal;
    const rect = hovered?.getBoundingClientRect();
    if (rect) {
      // Bigger links, like a post with its excerpt, get a roomier box
      const large = rect.height > 40;
      const padX = large ? 18 : 8;
      const padY = large ? 14 : 5;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      goal = {
        x: cx + (mouse.x - cx) * (large ? 0.04 : 0.12),
        y: cy + (mouse.y - cy) * (large ? 0.08 : 0.2),
        w: rect.width + padX * 2,
        h: rect.height + padY * 2,
        r: large ? 12 : 8,
      };
    } else {
      goal = { x: mouse.x, y: mouse.y, w: DOT, h: DOT, r: DOT / 2 };
    }

    const kPos = 1 - Math.pow(1 - (hovered ? 0.32 : 0.55), dt);
    const kSize = 1 - Math.pow(1 - 0.3, dt);
    const vx = goal.x - box.x;
    const vy = goal.y - box.y;
    box.x = lerp(box.x, goal.x, kPos);
    box.y = lerp(box.y, goal.y, kPos);
    box.w = lerp(box.w, goal.w, kSize);
    box.h = lerp(box.h, goal.h, kSize);
    box.r = lerp(box.r, goal.r, kSize);
    pressed = lerp(pressed, pressTarget, 1 - Math.pow(0.7, dt));

    // Squash and stretch along the direction of travel, only as a dot
    const speed = Math.hypot(vx, vy);
    // Only stretch once the box has shrunk back to a dot, otherwise a
    // wide box gets skewed on its way off a link
    const dotness = Math.max(0, 1 - (Math.max(box.w, box.h) - DOT) / 12);
    stretch = lerp(stretch, hovered ? 0 : Math.min(speed / 40, 0.9) * dotness, 0.3);
    if (speed > 0.5 && !hovered) angle = Math.atan2(vy, vx);
    const sx = (1 + stretch) * (1 - pressed * 0.15);
    const sy = (1 / Math.sqrt(1 + stretch)) * (1 - pressed * 0.15);

    cursor.style.width = `${box.w}px`;
    cursor.style.height = `${box.h}px`;
    cursor.style.borderRadius = `${box.r}px`;
    // rotate, stretch, rotate back: stretches along the travel direction
    // without turning the shape, so fading the stretch out never spins it
    cursor.style.transform =
      `translate3d(${box.x - box.w / 2}px, ${box.y - box.h / 2}px, 0) ` +
      `rotate(${angle}rad) scale(${sx}, ${sy}) rotate(${-angle}rad)`;

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  const track = (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    if (!started) {
      box.x = mouse.x;
      box.y = mouse.y;
      started = true;
    }
    hovered = event.target.closest("a, button");
    document.body.classList.add("cursor-ready");
  };

  window.addEventListener("pointermove", track, { passive: true });
  window.addEventListener("pointerdown", (event) => {
    track(event);
    pressTarget = 1;
  });
  window.addEventListener("pointerup", () => {
    pressTarget = 0;
  });
  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready");
  });
  window.addEventListener("pagehide", () => {
    try {
      sessionStorage.setItem("cursor-position", JSON.stringify(mouse));
    } catch {}
  });
}

/* Scroll reveals */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -8% 0px" }
);

const observeReveals = () => {
  document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
    observer.observe(el);
  });
};
observeReveals();

/* Page transitions: fetch the next page and swap <main> in place,
   for a smooth fade between pages */
const pageCache = new Map();
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPage = (url) => {
  if (!pageCache.has(url)) {
    pageCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.text();
      })
    );
    pageCache.get(url).catch(() => pageCache.delete(url));
  }
  return pageCache.get(url);
};

const isInternal = (link) =>
  link &&
  !link.target &&
  !link.hasAttribute("download") &&
  link.origin === window.location.origin &&
  link.protocol.startsWith("http");

const replacePage = async (url, shouldPushState = true) => {
  const current = document.querySelector("main");
  const [html] = await Promise.all([
    fetchPage(url),
    reducedMotion ? null : (current.classList.add("is-leaving"), wait(200)),
  ]);
  const nextDocument = new DOMParser().parseFromString(html, "text/html");
  const nextMain = nextDocument.querySelector("main");

  if (!nextMain) {
    window.location.href = url;
    return;
  }

  document.title = nextDocument.title;
  current.replaceWith(nextMain);
  const anchor = new URL(url).hash && document.querySelector(new URL(url).hash);
  if (anchor) anchor.scrollIntoView({ behavior: "instant" });
  else window.scrollTo({ top: 0, behavior: "instant" });

  if (shouldPushState) {
    window.history.pushState({}, "", url);
  }

  observeReveals();
};

document.addEventListener("pointerover", (event) => {
  const link = event.target.closest("a");
  if (isInternal(link)) fetchPage(link.href);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (
    !isInternal(link) ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    (link.pathname === window.location.pathname && link.hash) ||
    link.href === window.location.href
  ) {
    return;
  }

  event.preventDefault();
  replacePage(link.href).catch(() => {
    window.location.href = link.href;
  });
});

window.addEventListener("popstate", () => {
  replacePage(window.location.href, false).catch(() => {
    window.location.reload();
  });
});
