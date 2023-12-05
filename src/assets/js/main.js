import { mouse } from "./mouse.js"
import { menu } from "./menu.js"
import { picture } from "./picture.js"
import { smooth } from "./smooth.js"
import { menubar } from "./menubar.js"

window.addEventListener("load", function () {
    mouse();
    menu();
    picture();
    smooth();
    menubar();
})