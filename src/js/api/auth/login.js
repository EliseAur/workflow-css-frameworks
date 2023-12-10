import { API_SOCIAL_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post";

/**
 * Logs in with email and password by sending a request to the login endpoint.
 * The username, token and the profile is stored in local storage seperatly.
 * After login the user gets an alert saying that login was a success and gets sent to the posts-page.
 *
 * @param {Object} profile - The user profile information.
 * @param {string} profile.email - The email of the user.
 * @param {string} profile.password - The password of the user.
 * @throws {Error} - Throws an error if the login fails.
 *
 * * @example
 * const userProfile = {
 *   email: "testuser123@noroff.no",
 *   password: "examplePassword"
 * };
 *
 * try {
 *   await login(userProfile);
 *   console.log("User logged in successfully!");
 * } catch (error) {
 *   console.error("Login failed:", error.message);
 * }
 */
export async function login(profile) {
    const loginURL = API_SOCIAL_URL + action;

    console.log("This is the login URL:", loginURL);

    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    storage.save("userName", user.name);

    alert("You are now logged in");
    window.location.href = "/posts/index.html";
}
