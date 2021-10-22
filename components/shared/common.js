const commonJsCreateEl = (name) => {
    return document.createElement(name);
}
const commonJsAddClass = (element, ...className) => {
    return element.classList.add(...className);
}
const commonJsRemoveClass = (element, ...className) => {
    return element.classList.remove(...className);
}

const hasWhiteSpace = (s) => {
    return /\s/g.test(s);
}

const checkEmailValid = (s) => {
    return /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(s);
}
const app = document.getElementById("app");
const setScreen = ($container) => {
    app.innerHTML = "";
    app.appendChild($container);
}


export { 
    commonJsCreateEl,
    commonJsAddClass, 
    commonJsRemoveClass, 
    setScreen, 
    hasWhiteSpace,
    checkEmailValid
}