import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import splitType from "split-type";

export function menubar() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(splitType);
    gsap.to("progress", {
        value: 100,
        ease: "none",
        scrollTrigger: { scrub: 0.3 }
    })
}