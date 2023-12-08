import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// // Retrieve the username from local storage
// const storedUsername = localStorage.getItem("userName");
// const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

// // Check if the username is available
// if (!trimmedUsername) {
//     console.error("Username not found in local storage.");
// }
// const action = `/profiles/${trimmedUsername}/media`;
// const method = "PUT";

// export async function updateProfile(profileData) {
//     if (!profileData) {
//         throw new Error("Profile data not found");
//     }
//     const updateProfileURL = `${API_SOCIAL_URL}${action}`;

//     const response = await authFetch(updateProfileURL, {
//         method,
//         body: JSON.stringify(profileData),
//     });

//     const jsonResponse = await response.json();
//     return jsonResponse;
// }

/**
 * Updates the profile data for the current user.
 *
 * @param {Object} profileData - The updated profile data.
 * @param {string} profileData.avatar - The URL of the new avatar image.
 * @param {string} profileData.bio - The updated biography of the user.
 * @param {string} profileData.location - The updated location of the user.
 * @throws {Error} - Throws an error if profile data is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile object.
 */
export async function updateProfile(profileData) {
    if (!profileData) {
        throw new Error("Profile data not found");
    } else {
        console.log(profileData);
    }

    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem("userName");
    const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

    // Check if the username is available
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
