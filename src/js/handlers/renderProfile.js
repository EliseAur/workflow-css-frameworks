import * as templates from "../templates/index.js";
import { getProfile } from "../api/auth/profile.js";

export async function renderProfileDetails() {
    const profile = await getProfile();

    if (profile) {
        const container = document.querySelector("#profileDetailsContainer");
        templates.renderProfileTemplate(profile, container);
    } else {
        console.error("Profile data not found");
    }
}
