import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // // Entrance: Nav
    // tl.to("#nav-logo, #nav-links, #nav-lang", {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1.5,
    //     stagger: 0.1,
    //     delay: 0.2
    // });

    // Entrance: Hero Title
    tl.to(".hero-title div span:not(.accent-word)", {
      y: 0,
      opacity: 1,
      duration: 1.8,
      stagger: 0.2,
      ease: "power4.out",
    });

    // Delayed and more pronounced entrance for "Smak"
    tl.to(
      ".hero-title div span.accent-word",
      {
        y: 0,
        opacity: 1,
        duration: 2.2,
        scale: 1.05,
        ease: "back.out(1.7)",
        onComplete: function () {
          gsap.to(".accent-word", { scale: 1, duration: 1 });
        },
      },
      "-=1.5",
    );

    // Entrance: Hero Description
    tl.to(
      ".hero-description",
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
      },
      "-=1",
    );

    tl.to(
      "#scroll-indicator",
      {
        opacity: 1,
        duration: 1,
      },
      "-=0.5",
    );

    gsap.to("#scroll-line", {
      scaleY: 0,
      transformOrigin: "bottom",
      repeat: -1,
      duration: 2,
      ease: "power2.inOut",
    });

    const historyTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#history",
        start: "top 25%", // The animation fires when the top of the section reaches 75% down the viewport
        once: true, // Play exactly once, then destroy the trigger
      },
    });

    historyTl
      .from("#history img", {
        y: 40, // Start 40px down
        opacity: 0, // Start invisible
        duration: 1,
        ease: "power3.out", // A smooth, decelerating ease (very "Apple" style)
      })

      // 2. Animate the Header (Overlapping the image animation)
      .from(
        "#history h1",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      ) // The magic: Start this 0.6 seconds BEFORE the image finishes

      // 3. Stagger the Paragraphs
      .from(
        "#history p",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2, // Wait 0.2 seconds between animating paragraph 1 and paragraph 2
        },
        "-=0.6",
      );
  });

  // Fallback for reduced motion
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(
      "#nav-logo, #nav-links, #nav-lang, .hero-title span span, .hero-description, #scroll-indicator",
      {
        opacity: 1,
        y: 0,
      },
    );
  });
});
