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