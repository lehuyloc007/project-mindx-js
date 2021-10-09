const CommonJsCreateEl = (name) => {
    return document.createElement(name);
}
const CommonJsAddClass = (element, ...className) => {
    return element.classList.add(...className);
}
const CommonJsRemoveClass = (element, ...className) => {
    return element.classList.remove(...className);
}

export { CommonJsCreateEl, CommonJsAddClass, CommonJsRemoveClass}