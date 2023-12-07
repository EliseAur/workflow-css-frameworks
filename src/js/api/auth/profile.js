import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// Retrieve the username from local storage
const storedUsername = localStorage.getItem("userName");
const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

// Check if the username is available and handles the case where it is not
if (!trimmedUsername) {
    console.error("Username not found in local storage.");
}
const action = `/profiles/${trimmedUsername}`;
const method = "get";

export async function getProfile() {
    const baseURL = API_SOCIAL_URL;
    const getProfileURL = new URL(`${baseURL}${action}`);
    getProfileURL.searchParams.set("_followers", true);
    getProfileURL.searchParams.set("_following", true);

    // console.log("Profile URL:", getProfileURL);

    try {
        const response = await authFetch(getProfileURL.toString());
        const profile = await response.json();

        // console.log("Profile Details:", profile);
        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}
