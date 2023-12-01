import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// Retrieve the username from local storage
const storedUsername = localStorage.getItem("userName");
const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

// Check if the username is available
if (!trimmedUsername) {
    console.error("Username not found in local storage.");
    // Handle the case where the username is not available
}
const action = `/profiles/${trimmedUsername}`;
const method = "get"; //do not have to write this

export async function getProfile() {
    const getProfileURL = `${API_SOCIAL_URL}${action}?_followers=true&_following=true`;
    console.log("Profile URL:", getProfileURL);

    try {
        const response = await authFetch(getProfileURL);
        const profile = await response.json();

        console.log("Profile Details:", profile);
        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error; // Re-throw the error for the calling code to handle
    }
}
