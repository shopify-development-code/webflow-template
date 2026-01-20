document.addEventListener("DOMContentLoaded", () => {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true
  });
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
