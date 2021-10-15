import { Login } from "./components/login.js";
import { CommonJsCreateEl, CommonJsAddClass, CommonJsRemoveClass } from "./components/shared/common.js";

const app = document.getElementById(`app`);


const setScreen = ($container) => {
    app.innerHTML = "";
    app.appendChild($container);
}

const loginScreen = new Login();
setScreen(loginScreen.$container);

export {setScreen};