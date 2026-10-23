const preloader = document.getElementById("preloader");
document.body.classList.add("loading");
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
    document.body.classList.remove("loading");
  }, 1550);
});
setTimeout(() => {
  if (preloader) {
    preloader.classList.add("hide");
    document.body.classList.remove("loading");
  }
}, 4500);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);

// Muted looping previews are lightweight and respect reduced-motion preferences.
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
document.querySelectorAll(".film-frame video").forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("click", () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  if (reduceMotion) video.pause();
});

// Subtle parallax on larger screens only; disabled on mobile and reduced-motion devices.
const parallaxItems = document.querySelectorAll(
  ".hero-image img, .quote-image img, .craft-photo img, .keepsake-visual img",
);
let ticking = false;
function updateParallax() {
  ticking = false;
  if (reduceMotion || window.innerWidth < 681) return;
  const vh = window.innerHeight;
  parallaxItems.forEach((img, i) => {
    const rect = img.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
    img.style.transform = `translateY(${progress * (i % 2 ? -10 : 10)}px) scale(1.025)`;
  });
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateParallax);

document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp number was not provided in the Instagram screenshots, so replace this placeholder before launch.
const whatsappNumber = "918141371482";
const message = encodeURIComponent(
  "Hi Celestial Fusions! I'd love to enquire about a customised nameplate / handcrafted gift. Could you share the options?",
);
document.getElementById("whatsappCta").href =
  `https://wa.me/${whatsappNumber}?text=${message}`;
