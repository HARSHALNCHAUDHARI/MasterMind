import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const useItemMoveTopEffect = () => {
  useEffect(() => {
    const root = document.querySelector(".item-move-top-items") as HTMLElement | null;
    if (!root) return;

    // Helper to clean all STs safely (no truthiness on void)
    const killAllTriggers = () => {
      const all = ScrollTrigger.getAll();
      all.forEach((t) => t.kill(true)); // kill() returns void; no boolean checks
    };

    const setupDesktop = () => {
      const panels = gsap.utils.toArray<HTMLElement>(".item-move-top-item");
      if (!panels.length) return;

      const spacerEl = root.querySelector(".item-move-top-spacer") as HTMLElement | null;
      const pinOffsetTop = 140;
      const extraOffsetPerPanel = 120; // matches prior pbmitheight addition
      const spacerBetween = 0;

      const triggers: ScrollTrigger[] = [];

      panels.forEach((panel, i) => {
        // float/scale as originally
        gsap.to(panel, {
          scrollTrigger: {
            trigger: panel,
            start: "top bottom-=100",
            end: "top top+=0",
            scrub: true,
            invalidateOnRefresh: true,
          },
          ease: "none",
          scale: () => 1 - (panels.length - i) * 0.0,
        });

        const st = ScrollTrigger.create({
          trigger: panel,
          start: `top ${pinOffsetTop}px`,
          endTrigger: ".item-move-top-items",
          end: () => {
            const h = panel.offsetHeight + extraOffsetPerPanel;
            return `bottom top+=${h + panels.length * spacerBetween}`;
          },
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        triggers.push(st);
      });

      // Size spacer from the last trigger’s actual computed distance
      const last = triggers[triggers.length - 1];
      const setSpacerFromLast = () => {
        if (!spacerEl) return;
        const distance = Math.max(0, (last.end || 0) - (last.start || 0));
        spacerEl.style.height = `${distance}px`;
      };

      // Apply now and on refresh
      setSpacerFromLast();
      ScrollTrigger.addEventListener("refresh", setSpacerFromLast);

      // Ensure measurements are correct after load/resize
      const onLoadOrResize = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoadOrResize);
      window.addEventListener("resize", onLoadOrResize);

      // Cleanup function
      return () => {
        window.removeEventListener("load", onLoadOrResize);
        window.removeEventListener("resize", onLoadOrResize);
        ScrollTrigger.removeEventListener("refresh", setSpacerFromLast);
        killAllTriggers();
        if (spacerEl) spacerEl.style.height = "0px";
      };
    };

    // MatchMedia without void-truthiness
    const mm = ScrollTrigger.matchMedia({
      "(min-width: 992px)": setupDesktop,
      "(max-width: 1025px)": () => {
        killAllTriggers();
        const spacerEl = root.querySelector(".item-move-top-spacer") as HTMLElement | null;
        if (spacerEl) spacerEl.style.height = "0px";
      },
    });

    // Unmount cleanup
    return () => {
      killAllTriggers();
    };
  }, []);
};

export default useItemMoveTopEffect;
