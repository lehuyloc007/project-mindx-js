import { setScreen } from "./components/shared/common.js";
import { Login } from "./components/login.js";
import { App } from "./components/app.js";

firebase.auth().onAuthStateChanged((user) =>{
    if(user != null) {
        const appScreen = new App();
        setScreen(appScreen.$container)
    }else {
        const loginScreen = new Login();
        setScreen(loginScreen.$container);
    }
});