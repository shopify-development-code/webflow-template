document.addEventListener("DOMContentLoaded", () => {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true
  });
  initCustomCursor();
  const animatedSection = document.querySelectorAll('[data-sda="true"]');
  animatedSection.forEach(sectionEle => {
      const animationMethod = sectionEle.dataset.sdaMethod;
      switch(animationMethod) {
         case "hero-banner":
			const sectionHeight = sectionEle.offsetHeight;
		    const heroSlide = sectionEle.querySelector('.hero-banner');
		    const heroSlideInner = sectionEle.querySelector('.hero-banner-inner');
		    const heroBannerBrandName = sectionEle.querySelector('.banner-brand-name');
			console.log(`section-Height ${sectionHeight}`);
			gsap.set([heroSlide, heroSlideInner], {
			  transformStyle: "preserve-3d",
			  backfaceVisibility: "hidden"
			});
			const slideFadeScale = {
			  scale: 0.5,
			  opacity: 0
			};
			const innerMotion = {
			  y: -sectionHeight * 0.06,
			  rotateX: -15,
			  perspective: sectionHeight * 1.2
			};
			const brandMotion = {
			  y: -sectionHeight * 0.5
			};
			const heroBannerTimeline = gsap.timeline({
			  scrollTrigger: {
				trigger: sectionEle,
				start: "top top",
				end: () => `+=${sectionHeight}`,
				scrub: true,
				markers: true
			  }
			});
			heroBannerTimeline
			  .to(heroSlide, {
				opacity: slideFadeScale.opacity,
				scale: slideFadeScale.scale,
				transformPerspective: innerMotion.perspective,
				willChange: "transform"
			  })
			  .to(heroSlideInner, {
				y: innerMotion.y,
				rotateX: innerMotion.rotateX,
				opacity: 1,
				transformPerspective: innerMotion.perspective,
				ease: "none",
				willChange: "transform"
			  }, "<")
			  .to(heroBannerBrandName, {
				y: brandMotion.y,
				opacity: 1,
				ease: "none"
			  }, "<");
         break;
				 default:
         console.log('no animated section found');
      }
  });
});
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  const body = document.body;

  // =========================
  // Mouse follow
  // =========================
  function cursorMove(e) {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  }

  window.addEventListener('mousemove', cursorMove);

  // =========================
  // Link hover (center snap)
  // =========================
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      window.removeEventListener('mousemove', cursorMove);

      const rect = link.getBoundingClientRect();
      cursor.style.left = rect.left + rect.width / 2 + 'px';
      cursor.style.top = rect.top + rect.height / 2 + 'px';

      cursor.classList.add('cursor-hover');
    });

    link.addEventListener('mouseleave', () => {
      window.addEventListener('mousemove', cursorMove);
      cursor.classList.remove('cursor-hover');
    });
  });

  // =========================
  // Helper for hover classes
  // =========================
  function bindHover(selector, className) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add(className));
      el.addEventListener('mouseleave', () => cursor.classList.remove(className));
    });
  }

  bindHover('.logo', 'logo-hover');
  bindHover('.video', 'video-hover');
  bindHover('.nav_link', 'link-hover');

  // =========================
  // Mouse press
  // =========================
  body.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-pressed');
  });

  body.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-pressed');
  });
}

