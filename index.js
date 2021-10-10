import { CommonJsCreateEl, CommonJsAddClass, CommonJsRemoveClass } from "./components/shared/common.js";

const app = document.getElementById("app");
const hello = CommonJsCreateEl("h1")
hello.innerHTML = "Hello World";
CommonJsAddClass(hello, "red", "blue");
CommonJsRemoveClass(hello, "red");

const a = 1
const txt='acb'
const setScreen = ($container) => {
    app.appendChild($container);
}

setScreen(hello);
export { setScreen };