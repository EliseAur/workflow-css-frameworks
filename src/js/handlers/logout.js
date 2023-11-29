import { logout } from "../api/auth/logout.js";

export function setLogoutFormListener() {
    const signOutButton = document.querySelector("#signOutButton");

    if (signOutButton) {
        signOutButton.addEventListener("click", (event) => {
            event.preventDefault();
            logout();
        });
    }
}
