import { CommonJsCreateEl, CommonJsAddClass, CommonJsRemoveClass } from "./components/shared/common.js";

const app = document.getElementById("app");
const hello = CommonJsCreateEl("h1")
hello.innerHTML = "Hello World";
CommonJsAddClass(hello, "red", "blue");
CommonJsRemoveClass(hello, "red");

const abc='bcz'
const setScreen = ($container) => {
    app.appendChild($container);
}

setScreen(hello);
export { setScreen };