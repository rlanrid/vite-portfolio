document.querySelector(".pic__container img").addEventListener("mousemove", e => {
    if (window.innerWidth >= 680) {
        // 마우스 좌표 값
        let mousePageX = e.pageX;
        let mousePageY = e.pageY;

        // 이미지 중심 좌표
        let imgCenterX = window.innerWidth / 2;
        let imgCenterY = window.innerHeight / 2;

        // 마우스 좌표값과 이미지 중심 좌표 사이의 차이
        let offsetX = mousePageX - imgCenterX;
        let offsetY = mousePageY - imgCenterY;

        // 이미지 같은 방향으로 움직이기
        const imgMove = document.querySelector(".pic__container img");

        imgMove.style.transform = "translate(" + offsetX / 20 + "px, " + offsetY / 100 + "px)";
    }
});

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