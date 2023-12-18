import { three } from "./threeEffect.js"
import { mouse } from "./mouse.js"
import { menu } from "./menu.js"
import { weird } from "./gsapEffect.js"
import { split } from "./gsapEffect.js"
import { smooth } from "./smooth.js"
import { menubar } from "./menubar.js"
import { appear } from "./appear.js"

window.addEventListener("load", function () {
    three();
    appear();
    mouse();
    menu();
    weird();
    split();
    smooth();
    menubar();
})