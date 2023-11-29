import * as storage from "../../storage/index.js";

export function logout() {
    // Clear the users data from local storage
    storage.remove("token");
    storage.remove("profile");
    storage.remove("userName");
    // storage.remove("createdPostToken");

    alert("You are now logged out");
    window.location.href = "/index.html";
}
