import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export function mouse() {
    // more 섹션 이미지
    gsap.timeline()
        .set(".more__cont", { autoAlpha: 1 })
        .set(".more__cont", { pointerEvents: "all" });

    gsap.defaults({
        duration: 0.75,
        ease: "expo.out",
    });

    const moreItems = document.querySelectorAll(".more__item");

    moreItems.forEach((item) => {
        const imageWrapper = item.querySelector(".more__img__wrap");
        let itemBounds = item.getBoundingClientRect();

        const onMouseEnter = () => {
            gsap.set(imageWrapper, { scale: 0.8, yPercent: 50, rotation: -15 });
            gsap.to(imageWrapper, { opacity: 1, scale: 1, yPercent: 0, rotation: 0 });
        };
        const onMouseLeave = () => {
            gsap.to(imageWrapper, { opacity: 0, yPercent: -50, scale: 0.8, rotation: -15 });
        };
        const onMouseMove = ({ x, y }) => {
            const imageWrapperBounds = imageWrapper.getBoundingClientRect();
            let yOffset = itemBounds.top / imageWrapperBounds.height;
            yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset);

            const adjustedY = Math.abs(y - itemBounds.top) - imageWrapperBounds.height / 2 - yOffset;
            const maxY = item.clientHeight - imageWrapperBounds.height;
            const finalY = Math.min(adjustedY, maxY);

            gsap.to(imageWrapper, {
                duration: 1.25,
                x: Math.abs(x - itemBounds.left) - imageWrapperBounds.width / 1.55,
                y: finalY < 0 ? 0 : finalY,
            });
        };

        item.addEventListener("mouseenter", onMouseEnter);
        item.addEventListener("mouseleave", onMouseLeave);
        item.addEventListener("mousemove", onMouseMove);

        window.addEventListener("resize", () => {
            itemBounds = item.getBoundingClientRect();
        });
    });

    // contact 섹션

    const light = document.querySelector(".light");
    const container = document.querySelector(".contact__cont");

    container.addEventListener("mousemove", e => {
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const diffX = mouseX - containerCenterX;
        const diffY = mouseY - containerCenterY;

        light.style.left = `${containerCenterX - light.offsetWidth / 2 + diffX / 10}px`;
        light.style.top = `${containerCenterY - light.offsetHeight / 2 + diffY / 10}px`;
    });
}