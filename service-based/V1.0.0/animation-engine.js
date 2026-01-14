document.fonts.ready.then(() => {
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,
  effects: true
});
const revealTextSection = document.querySelector('[text-reveal-on-scroll]');
if(revealTextSection){
  const revealTextValue = revealTextSection.getAttribute("text-reveal-on-scroll");
  const revealContentAll = revealTextSection.querySelectorAll('[reveal-content]');
  revealContentAll.forEach(el => {
    const split = new SplitText(el, {
      type: "lines",
      linesClass: "line"
    });
    const lines = split.lines;
    let activeIndex = -1;
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      onUpdate(self) {
        const progress = self.progress;
        const index = Math.min(
          lines.length - 1,
          Math.floor(progress * lines.length)
        );
        if (index !== activeIndex) {
          activeIndex = index;
          lines.forEach((line, i) => {
            line.classList.toggle("is-active", i === index);
          });
        }
      }
    });
   });
}
});
