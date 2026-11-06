const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll(".profile-image").forEach((image) => {
  const frame = image.closest(".portrait-frame");
  if (!frame) return;

  const showPlaceholder = () => frame.classList.add("has-placeholder");
  image.addEventListener("error", showPlaceholder);
  if (image.complete && image.naturalWidth === 0) showPlaceholder();
});

const portfolioImage = document.querySelector(".project-art-portfolio .project-image");
const portfolioArt = document.querySelector(".project-art-portfolio");

if (portfolioImage && portfolioArt) {
  const showProjectFallback = () => portfolioArt.classList.add("has-placeholder");
  portfolioImage.addEventListener("error", showProjectFallback);
  if (portfolioImage.complete && portfolioImage.naturalWidth === 0) showProjectFallback();
}

const journey = document.querySelector("[data-journey]");

if (journey) {
  const stage = journey.querySelector(".journey-stage");
  const track = journey.querySelector("[data-journey-track]");
  const sky = journey.querySelector(".journey-sky");
  const avatar = journey.querySelector("[data-avatar]");
  const progressBar = journey.querySelector("[data-progress-bar]");
  const progressLabel = journey.querySelector("[data-progress-label]");
  const header = document.querySelector(".site-header");
  let travelDistance = 0;
  let scrollStart = 0;
  let animationFrame = 0;
  let walkingTimer;
  let previousScrollY = window.scrollY;

  const updateJourneySize = () => {
    if (!stage || !track) return;

    travelDistance = Math.max(0, track.scrollWidth - stage.clientWidth);
    const stageHeight = stage.clientHeight;
    journey.style.height = `${stageHeight + travelDistance}px`;
    scrollStart = journey.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 0);
    updateJourneyProgress();
  };

  const updateJourneyProgress = () => {
    animationFrame = 0;
    const progress = travelDistance === 0
      ? 0
      : Math.min(1, Math.max(0, (window.scrollY - scrollStart) / travelDistance));

    if (track) track.style.transform = `translate3d(${-travelDistance * progress}px, 0, 0)`;
    if (sky) sky.style.setProperty("--sky-drift", `${-travelDistance * progress * 0.18}px`);
    if (progressBar) progressBar.style.width = `${progress * 100}%`;
    if (progressLabel) {
      const milestone = Math.min(5, Math.floor(progress * 4) + 1);
      progressLabel.textContent = `${String(milestone).padStart(2, "0")} / 05`;
    }
  };

  const requestJourneyUpdate = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(updateJourneyProgress);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (avatar && Math.abs(currentScrollY - previousScrollY) > 1) {
      const inJourney = currentScrollY >= scrollStart && currentScrollY <= scrollStart + travelDistance;
      if (inJourney) {
        avatar.classList.add("is-walking");
        window.clearTimeout(walkingTimer);
        walkingTimer = window.setTimeout(() => avatar.classList.remove("is-walking"), 140);
      } else {
        avatar.classList.remove("is-walking");
      }
    }
    previousScrollY = currentScrollY;
    requestJourneyUpdate();
  };

  journey.classList.add("is-ready");
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", updateJourneySize);
  window.addEventListener("load", updateJourneySize, { once: true });
  updateJourneySize();
}