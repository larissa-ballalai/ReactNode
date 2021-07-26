import { getUserSession } from "../scripts/isLoggedIn"

export const actionMenu = (div) => {
    var menu = document.getElementById(div);
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

export const menuAccessControl = () => {
    return getUserSession("userAdmin").profile    
}