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
           const heroSlide = sectionEle.querySelector('.hero-banner');
           const heroSlideInner = sectionEle.querySelector('.hero-banner-inner');
           const heroBannerBrandName = sectionEle.querySelector('.banner-brand-name');
           const heroBannerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEle,
                start: 'top top',
                end:'150%',
                scrub:true,
                marker:true,
              },            
            });
      			heroBannerTimeline.to(heroSlide,{
            	opacity:0,
              scale:0.5,
              transformPerspective: 1200,
              willChange: "transform",
            })
            .to(heroSlideInner,{
              y: -36.2942,
              rotateX: -13.3715,
              opacity: 1,
              transformPerspective: 1200,
              willChange: "transform",
              ease: "none"
            },"<")
            .to(heroBannerBrandName,{
            	y: -300,
              opacity: 1,
            },"<")
         break;
				 default:
         console.log('no animated section found');
      }
  });
});
