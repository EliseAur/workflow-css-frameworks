import * as templates from "../templates/index.js";
import * as postMethods from "../api/posts/index.js";
import * as handlers from "./index.js";

export async function renderProfileDetails() {
    const storedProfile = localStorage.getItem("profile");
    console.log(storedProfile);

    if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        console.log(profile);
        const container = document.querySelector("#profileDetailsContainer");
        templates.renderProfileTemplate(profile, container);
    } else {
        console.error("Profile data not found in local storage");
    }
}
