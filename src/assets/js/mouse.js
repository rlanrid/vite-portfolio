export function mouse() {
    // more 섹션 이미지
    const moreItems = document.querySelectorAll(".more__item");
    const moreImgs = document.querySelectorAll(".more__img");

    moreItems.forEach((moreItem, index) => {
        const moreImg = moreImgs[index];

        moreItem.addEventListener("mousemove", (e) => {
            const moreItemRect = moreItem.getBoundingClientRect(); // moreItem의 위치 정보 가져오기

            const mouseX = e.clientX - moreItemRect.left; // moreItem 내부에서의 X 좌표
            const mouseY = e.clientY - moreItemRect.top; // moreItem 내부에서의 Y 좌표

            moreImg.style.left = mouseX - 173 + "px";
            moreImg.style.top = mouseY - 50 + "px";
        });

        moreItem.addEventListener("mouseleave", () => {
            moreImg.style.opacity = 0;
        });

        moreItem.addEventListener("mouseenter", () => {
            moreImg.style.opacity = 1;
        });
    });

    // contact 섹션 이미지
    const light = document.querySelector(".contact__cont .light");
    const container = document.querySelector(".contact__cont");

    container.addEventListener("mousemove", e => {
        if (window.innerWidth >= 680) {
            const containerRect = container.getBoundingClientRect();

            // container의 중심 좌표
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            // 마우스 좌표값과 container의 중심 좌표 사이의 차이
            const offsetX = e.clientX - containerCenterX;
            const offsetY = e.clientY - containerCenterY;

            // light의 크기
            const lightWidth = light.offsetWidth;
            const lightHeight = light.offsetHeight;

            // light의 새로운 위치 설정
            light.style.left = `${containerCenterX - lightWidth / 4 + offsetX / 4}px`;
            light.style.top = `${containerCenterY - lightHeight / 4 + offsetY / 4}px`;
        }
    });

    container.addEventListener("mouseleave", () => {
        if (window.innerWidth >= 680) {
            // 마우스가 container를 벗어났을 때 light를 초기 위치로 되돌림
            light.style.transition = `left 0.3s, top 0.3s`;
            light.style.left = `50%`;
            light.style.top = `50%`;

            setTimeout(() => {
                light.style.transition = 'none';
            }, 300); // transition이 끝난 후에 transition 속성 제거
        }
    })
}