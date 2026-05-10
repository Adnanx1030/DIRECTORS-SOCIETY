const toast = document.getElementById("toast");
const nav = document.getElementById("nav");
const volumeBtn = document.getElementById("volumeBtn");
const heroVideo = document.querySelector(".hero-bg");

/* HERO VOLUME */
if (heroVideo && volumeBtn) {
  volumeBtn.textContent = heroVideo.muted ? "🔇" : "🔊";

  volumeBtn.addEventListener("click", () => {
    heroVideo.muted = !heroVideo.muted;
    volumeBtn.textContent = heroVideo.muted ? "🔇" : "🔊";
    volumeBtn.title = heroVideo.muted ? "Unmute" : "Mute";
  });
}

let wishlist = new Set();
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* NAV ACTIVE STATE */
document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(link => link.classList.remove("active"));
    item.classList.add("active");
  });
});

/* NAV SCROLL EFFECT */
window.addEventListener(
  "scroll",
  () => {
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
      document.querySelector(".brand-logo").classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
      document.querySelector(".brand-logo").classList.remove("scrolled");
    }
  },
  { passive: true }
);
/* WISHLIST */
document.querySelectorAll(".wishlist-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    const card = btn.closest(".card");
    const title = card.querySelector(".card-title").textContent.trim();

    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
      btn.textContent = "♥";
      wishlist.add(title);
      showToast(`Added "${title}"`);
    } else {
      btn.textContent = "♡";
      wishlist.delete(title);
      showToast(`Removed "${title}"`);
    }
  });
});
/* ROW SCROLL BUTTONS */
document.querySelectorAll(".row-arrow").forEach(btn => {
  btn.addEventListener("click", () => {
    const row = document.getElementById(`row-${btn.dataset.row}`);
    if (!row) return;
    const amount = row.clientWidth * 0.75;
    row.scrollBy({
      left: btn.classList.contains("left") ? -amount : amount,
      behavior: "smooth"
    });
  });
});
