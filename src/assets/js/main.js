import { mouse } from "./mouse.js"
import { nav } from "./nav.js"
import { picture } from "./picture.js"
import { smooth } from "./smooth.js"

window.addEventListener("load", function () {
    mouse();
    nav();
    picture();
    smooth();
})