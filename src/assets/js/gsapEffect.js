import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// ScrollTrigger 플러그인을 등록하고 함수 정의
gsap.registerPlugin(ScrollTrigger);

export function weird() {
    // 02. 여러개 이질감 표현하기
    gsap.utils.toArray(".text__gif").forEach(item => {
        gsap.to(item, {
            ease: "none",
            duration: 0.5,
            scrollTrigger: {
                trigger: item,
                start: "center center",
                end: "bottom top",
                scrub: 0.5
            }
        })
    });
}

export function split() {
    // split요소 보이게 변경
    gsap.set(".split", { opacity: 1, visibility: "visible" });

    // 모든 텍스트 분리하기
    document.querySelectorAll(".split").forEach(text => {
        let splitWrap = text.innerText.split("").join("</span><span aria-hidden='true'>");
        text.innerHTML = "<span aria-hidden='true'>" + splitWrap + "</span>";
        text.setAttribute("aria-label", text.innerText);
    })

    gsap.utils.toArray(".split").forEach(text => {
        gsap.from(text.querySelectorAll("span"), {
            yPercent: -100,
            autoAlpha: 0,
            duration: 2,
            ease: "circ.out",
            stagger: {
                amount: 0.5,
                from: "start"
            },
            scrollTrigger: {
                trigger: text,
                start: "top bottom",
                end: "+400",
                markers: true
            }
        });
    })

    gsap.set("#picture .text__gif", { opacity: 1, visibility: "visible" });

    const ani1 = gsap.timeline();
    ani1.from("#picture .text__gif.g1", { xPercent: 20, autoAlpha: 0, duration: 0.5, delay: 1 })
        .from("#picture .text__gif.g2", { xPercent: -20, autoAlpha: 0, duration: 0.5 })
        .from("#picture .text__gif.g3", { yPercent: 20, autoAlpha: 0, duration: 0.5 })

}