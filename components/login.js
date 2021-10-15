// function setFormMessage(formElement, type, message){
//     const messageElement=formElement.querySelector(".form--message");

import { CommonJsCreateEl } from "./shared/common";

//     messageElement.textContent=message;
//     messageElement.classList.remove("form__message--success", "form__message--error");
//     messageElement.classList.add('form__message--${type}')
// }

// function setInputError(inputElement, message){
//     inputElement.classList.add("form__input--error");
//     inputElement.parentElement.querySelector(".form__input-error-message").textContent=message;
// }
//  function clearInputError(inputElement)
//  inputElement.classList.remove("form__input--error");

// document.addEventListener("DOMContentLoaded",()=>{
//     const loginForm= document.querySelector("#login");
//     const createAccountForm=document.querySelector("#createAccount");

//     document.querySelector("#linkCreateAccount").addEventListener("click", e =>{
//         e.preventDefault();
//         loginForm.classList.add("form--hidden");
//         createAccountForm.classList.remove("form--hidden");
//     });

//     document.querySelector("#linkLogin").addEventListener("click",e =>{
//         e.preventDefault();
//         loginForm.classList.remove("form--hidden");
//         createAccountForm.classList.add("form--hidden");
//     })

//     loginForm.addEventListener("submit",e=>{
//         e.preventDefault();

//         setFormMessage(loginForm, "error", "Invalid username/password comination");
//     })

//     document.querySelectorAll(".form__input").forEach(inputElement=>{
//         inputElement.addEventListener("blur", e=>{
//             if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length<10){
//                 setInputError(inputElement,"Username must be at least 10 characters in length");
//             }
//         });
//         inputElement.addEventListener("input", e=>{
//             clearInputError(inputElement);
//         })
//     })
// })

class Login {
    $container= CommonJsCreateEl ("div");
    $txtTile= CommonJsCreateEl ("h3");
    $form= document= CommonJsCreateEl("form");
    $actions=CommonJsCreateEl("div");
    $btnLogin=CommonJsCreateEl("button");
    $btnGoToRegister=CommonJsCreateEl("button");

    constructor (){
        this.$txtTile.innerHTML= "Login";
        this.$btnLogin.innerHTML="Login";
        this.$btnGoToRegister.innerHTML="Go to Register";

        this.$container.appendChild(this.$form);

        this.$form.appendChild(this.$txtTile);
        this.$form.appendChild(this.$actions);

        this.$actions.appendChild(this.$btnLogin);
        this.$actions.appendChild(this.$btnGoToRegister);
    }
}
 
export {Login};