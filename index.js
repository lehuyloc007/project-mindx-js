import { setScreen } from "./components/shared/common.js";
import { Home } from "./components/home.js";
import { Login } from "./components/login.js";

firebase.auth().onAuthStateChanged((user) =>{
    if(user != null) {
        const chatScreen = new Home();
        setScreen(chatScreen.$container)
    }else {
        const loginScreen = new Login();
        setScreen(loginScreen.$container);
    }
});