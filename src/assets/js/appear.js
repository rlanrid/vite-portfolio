import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ScrollTrigger 플러그인을 등록하고 함수 정의
gsap.registerPlugin(ScrollTrigger);

const hide = (item) => {
    gsap.set(item, { autoAlpha: 0 });
}

const animate = (item) => {
    let delay = item.dataset.delay || 0; // delay 값이 없으면 0으로 설정

    gsap.fromTo(
        item,
        { autoAlpha: 0, x: 0, y: 50 },
        { autoAlpha: 1, x: 0, y: 0, delay: delay, duration: 1.25, overwrite: "auto", ease: "expo" }
    )
}

const animate2 = (item) => {
    gsap.fromTo(item,
        { autoAlpha: 0, width: 0 },
        { autoAlpha: 1, width: 100 + "%" }
    )
}

export function title() {
    const secTitle = document.querySelectorAll(".secT");

    secTitle.forEach(item => {
        const imgElement = item.querySelectorAll("img");
        const h2Element = item.querySelectorAll("h2");
        const lineElement = item.querySelectorAll(".title__line");

        imgElement.forEach((el) => {
            el.classList.add("reveal");
        });

        h2Element.forEach((el) => {
            el.classList.add("reveal");
        });

        lineElement.forEach((el) => {
            el.classList.add("reveal__line");
        })
    })

    gsap.utils.toArray(".reveal").forEach(item => {
        hide(item);

        ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            once: true,
            onEnter: () => { animate(item) }
        })
    })

    gsap.utils.toArray(".reveal__line").forEach(item => {
        hide(item);

        ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            once: true,
            onEnter: () => { animate2(item) }
        })
    })
}