import { setScreen } from "./components/shared/common.js";
import { Home } from "./components/home.js";
import { Login } from "./components/login.js";

firebase.auth().onAuthStateChanged((user) =>{
    if(user != null) {
        const homeScreen = new Home();
        setScreen(homeScreen.$container)
    }else {
        const loginScreen = new Login();
        setScreen(loginScreen.$container);
    }
});