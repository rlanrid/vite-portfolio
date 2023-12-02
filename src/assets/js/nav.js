const toggleMenu = () => {
    const nav = document.querySelector(".nav");
    const navToggle = document.querySelector("#navToggle");

    nav.classList.toggle("show");

    const expanded = nav.classList.contains('show') ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
}
