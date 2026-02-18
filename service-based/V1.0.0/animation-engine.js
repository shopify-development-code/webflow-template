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
				scrub: true
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
        case "blog-services":
        const blogContentCardHolder = sectionEle.querySelectorAll('[blog-content-holder]');
        const blogContentCard = sectionEle.querySelectorAll('[blog-content-card]');
        const blogContentTrigger = sectionEle.querySelector('[sda-pin-target]');
          blogContentCardHolder.forEach((wrapper, i) => {
            const card = blogContentCard[i];
            let scale = 1,
                rotation = 0;
            if (i !== blogContentCard.length - 1) {
              scale = 0.9 + 0.025 * i;
              rotation = -10;
            }
            gsap.to(card, {
              scale: scale,
              rotationX: rotation,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top " + (60 + 10 * i),
                end: "bottom 550",
                endTrigger: blogContentTrigger,
                scrub: true,
                pin: wrapper,
                pinSpacing: false,
                id: i + 1
              }
            });
          });
        break;
        case "portfolio-section":
         const portfolioCards = sectionEle.querySelectorAll('[portfolio-card]');
         const portfolioTarget = sectionEle.querySelector('[sda-pin-target]');
         const portfolioBackground = sectionEle.querySelectorAll('.portfolio-background');
         const cards = Array.from(portfolioCards);
          cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
          });
          gsap.set(cards[0], { yPercent: 0,scale:1,z: 0,rotateX: 0 });
          gsap.set(cards.slice(1), { yPercent: 100,scale:0.9,z: -200,rotateX: -15 });
          //gsap.set(cards.slice(1), { yPercent: 100 });         
          const portfolioTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEle,
              start: "top top",
              end: () => "+=" + (cards.length * 100) + "%",
              //end: "+=200%",
              scrub: true,
              pin: true
              //pin: portfolioTarget,
            }
          });
          cards.forEach((card, index) => {
              if (index === 0) return;
              const prevBg = portfolioBackground[index - 1];
              const currentBg = portfolioBackground[index];
              const prevCard = cards[index - 1];
              portfolioTimeline.to(prevCard, {
                yPercent: -100,
                ease: "none",
                scale:0.9,
                z: -300,
                rotateX: 15,
              })
              .to(card, {
                yPercent: 0,
                scale:0.92,
                z: 0,
                rotateX: 0,       
                ease: "none",
                onUpdate: function () {
                  const progress = this.progress();
                  if (progress >= 0.5 && !currentBg.classList.contains("active")) {
                    prevBg.classList.remove("active");
                    currentBg.classList.add("active");
                  }
                  if (progress < 0.5 && !prevBg.classList.contains("active")) {
                    currentBg.classList.remove("active");
                    prevBg.classList.add("active");
                  }
                }
              }, "<")
          });
        break;
        case "project-counter":
         const counterContentMain = sectionEle.querySelector('.center-numeric-counter');
         const counterWrapper = sectionEle.querySelector('.countdown-wrapper');
         const projectsItemImages = sectionEle.querySelectorAll('[project-center-item-image]');
         const projectItemCenterContent = sectionEle.querySelectorAll('[project-center-item-content]');
         const projectItemLeftContent = sectionEle.querySelectorAll('[project-left-content]');
         const projectItemRightContentMain = sectionEle.querySelectorAll('[project-right-content]'); 
         
         const projectItemCenterContentMain = sectionEle.querySelector('.center-content-numeric');
         const projectItemLeftContentMain = sectionEle.querySelector('.content-header-inner'); 
         gsap.set(counterWrapper,{y:150});
         gsap.set(counterContentMain,{paddingBottom:150});
         gsap.set(counterContentMain,{y:150});
         gsap.set(projectItemCenterContentMain,{yPercent:70})
         projectsItemImages[0].classList.add('active');
         gsap.set(projectItemLeftContent,{yPercent:100});
         gsap.set(projectItemLeftContent[0],{yPercent:0});
         gsap.set(projectItemRightContentMain,{yPercent:100});
         gsap.set(projectItemRightContentMain[0],{yPercent:0});
         const totalItems = projectsItemImages.length;
         let currentIndex = 0;
         let yPercentValue = -70;
         const projectCounterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: counterWrapper,
              start: "top " + 240,
              //end: "bottom 570",
              end: "bottom 680",
              endTrigger: sectionEle,
              scrub: true,
              pin: counterWrapper,
              pinSpacing: false,
              onUpdate: self => {
                const progress = self.progress;
                const newIndex = Math.min(
                  totalItems - 1,
                  Math.floor(progress * totalItems)
                );
                if (newIndex !== currentIndex) {
                  projectsItemImages[currentIndex].classList.remove("active");
                  projectsItemImages[newIndex].classList.add("active");
                  const yPercentCenterMove = 70+(yPercentValue*newIndex);
                  const yPercentLeftMove = 100*newIndex;
                  gsap.to(projectItemCenterContentMain,{yPercent:yPercentCenterMove})
                  gsap.set(projectItemLeftContent[currentIndex],{yPercent:-100});
                  gsap.set(projectItemRightContentMain[currentIndex],{yPercent:-100});
                  gsap.set(projectItemLeftContent[newIndex],{yPercent:0});
                  gsap.set(projectItemRightContentMain[newIndex],{yPercent:0});
                  if(projectItemLeftContent[newIndex+1]){
                     	gsap.set(projectItemLeftContent[newIndex+1],{yPercent:100});
                  }
                  if(projectItemRightContentMain[newIndex+1]){
                  	gsap.set(projectItemRightContentMain[newIndex+1],{yPercent:100});
                  }
                  currentIndex = newIndex;
                }
              }
            }
          });
          
        break;
				default:
        console.log('no animated section found');
      }
  });
});
