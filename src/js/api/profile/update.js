import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Updates the avatar and banner for the current user's profile.
 *
 * @param {Object} profileData - The updated profile data.
 * @param {string} profileData.avatar - The URL of the new avatar image.
 * @param {string} profileData.banner - The URL of the new banner image.
 * @throws {Error} - Throws an error if profile data is not provided or invalid.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile object.
 */
export async function updateProfile(profileData) {
    if (!profileData) {
        throw new Error("Profile data not found");
    }

    const storedUsername = localStorage.getItem("userName");
    const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

    if (!trimmedUsername) {
        console.error("Username not found in local storage.");
    }

    const action = `/profiles/${trimmedUsername}/media`;
    const method = "PUT";

    const updateProfileURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(updateProfileURL, {
        method,
        body: JSON.stringify(profileData),
    });

    const jsonResponse = await response.json();
    return jsonResponse;
}
