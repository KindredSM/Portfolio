const canUseCustomCursor = window.innerWidth > 768;

if (canUseCustomCursor) {
  const cursor = document.createElement("div");
  const cursorDot = document.createElement("div");

  cursor.className = "cursor-ring";
  cursorDot.className = "cursor-dot";
  document.body.append(cursor, cursorDot);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  const moveCursor = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    document.body.classList.add("cursor-ready");
  };

  const setHoverState = (isHovering) => {
    document.body.classList.toggle("cursor-hovering", isHovering);
  };

  window.addEventListener("mousemove", moveCursor, { passive: true });
  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready");
  });
  window.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-ready");
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => setHoverState(true));
    element.addEventListener("mouseleave", () => setHoverState(false));
  });
}
