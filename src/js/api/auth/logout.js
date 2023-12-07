import * as storage from "../../storage/index.js";

/**
 * Logs out the user by clearing their data from local storage.
 * Displays an alert notifying the user that they are logged out and redirects them to the index page.
 *
 * @example
 * // Call the logout function when the user clicks a "Logout" button.
 * try {
 *   logout();
 *   console.log("User logged out successfully!");
 * } catch (error) {
 *   console.error("Logout failed:", error.message);
 * }
 */
export function logout() {
    storage.remove("token");
    storage.remove("profile");
    storage.remove("userName");

    alert("You are now logged out");
    window.location.href = "/index.html";
}
