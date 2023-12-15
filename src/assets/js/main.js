import { mouse } from "./mouse.js"
import { menu } from "./menu.js"
import { weird } from "./gsapEffect.js"
import { split } from "./gsapEffect.js"
import { smooth } from "./smooth.js"
import { menubar } from "./menubar.js"
import { title } from "./appear.js"

window.addEventListener("load", function () {
    mouse();
    menu();
    weird();
    split();
    smooth();
    menubar();
    title();
})