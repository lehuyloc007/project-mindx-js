const commonJsCreateEl = (name) => {
    return document.createElement(name);
}
const commonJsAddClass = (element, ...className) => {
    return element.classList.add(...className);
}
const commonJsRemoveClass = (element, ...className) => {
    return element.classList.remove(...className);
}
const app = document.getElementById("app");
const setScreen = ($container) => {
    app.innerHTML = "";
    app.appendChild($container);
}

export { commonJsCreateEl, commonJsAddClass, commonJsRemoveClass, setScreen}