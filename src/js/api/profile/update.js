import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// Retrieve the username from local storage
const storedUsername = localStorage.getItem("userName");
const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;

// Check if the username is available
if (!trimmedUsername) {
    console.error("Username not found in local storage.");
}
const action = `/profiles/${trimmedUsername}/media`;
const method = "PUT";

export async function updateProfile(profileData) {
    if (!profileData) {
        throw new Error("Profile data not found");
    }
    const updateProfileURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(updateProfileURL, {
        method,
        body: JSON.stringify(profileData),
    });

    // if (!response.ok) {
    //     console.error("Error updating profile. Status:", response.status);
    //     throw new Error("Failed to update profile");
    // }

    // return await response.json();

    const jsonResponse = await response.json();
    console.log("Response:", jsonResponse);

    return jsonResponse;
}

// // Retrieve the username from local storage
// const storedUsername = localStorage.getItem("userName");
// const trimmedUsername = storedUsername ? storedUsername.trim().replace(/^"(.*)"$/, "$1") : null;
// console.log(trimmedUsername);

// // Check if the username is available
// if (!trimmedUsername) {
//     console.error("Username not found in local storage.");
//     // Handle the case where the username is not available
// }

// const action = `/profiles/${trimmedUsername}/media`;
// const method = "put";

// console.log("hello");

// export async function updateProfile(profileData) {
//     if (!profileData) {
//         throw new Error("Profile data not found");
//     }

//     const updateProfileURL = `${API_SOCIAL_URL}${action}`;

//     try {
//         const response = await authFetch(updateProfileURL, {
//             method,
//             body: JSON.stringify(profileData),
//         });

//         if (!response.ok) {
//             console.error("Error updating profile. Status:", response.status);
//             throw new Error("Failed to update profile");
//         }

//         const jsonResponse = await response.json();
//         console.log("Response:", jsonResponse);

//         return jsonResponse;
//     } catch (error) {
//         console.error("An error occurred while updating profile:", error);
//         throw error;
//     }
// }
