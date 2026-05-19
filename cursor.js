const canUseCustomCursor = window.innerWidth > 768;

if (canUseCustomCursor) {
  const cursor = document.createElement("div");
  const blob = document.createElement("div");
  const savedPosition = sessionStorage.getItem("cursor-position");

  cursor.className = "cursor-dot";
  blob.className = "cursor-blob";
  cursor.append(blob);
  document.body.append(cursor);

  if (savedPosition) {
    const { x, y } = JSON.parse(savedPosition);
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    document.body.classList.add("cursor-ready");
  }

  const updateCursor = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    sessionStorage.setItem("cursor-position", JSON.stringify({ x, y }));
    document.body.classList.add("cursor-ready");
  };

  window.addEventListener("mousemove", updateCursor, { passive: true });
  window.addEventListener("pointerdown", updateCursor, { passive: true });

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready");
  });

  window.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-ready");
  });
}

const replacePage = async (url, shouldPushState = true) => {
  const response = await fetch(url);
  const html = await response.text();
  const nextDocument = new DOMParser().parseFromString(html, "text/html");
  const nextMain = nextDocument.querySelector("main");

  if (!nextMain) {
    window.location.href = url;
    return;
  }

  document.title = nextDocument.title;
  document.querySelectorAll("[data-page-style]").forEach((style) => {
    style.remove();
  });
  nextDocument.querySelectorAll("[data-page-style]").forEach((style) => {
    document.head.append(style.cloneNode(true));
  });
  document.querySelector("main").replaceWith(nextMain);
  window.scrollTo(0, 0);

  if (shouldPushState) {
    window.history.pushState({}, "", url);
  }
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (
    !link ||
    link.target ||
    link.hasAttribute("download") ||
    link.origin !== window.location.origin ||
    link.pathname === window.location.pathname
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
