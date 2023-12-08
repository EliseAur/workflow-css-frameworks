import * as postMethods from "../api/posts/index.js";
import * as templates from "../templates/index.js";

/**
 * Checks if the current user is the author of the given post.
 * If the current user is the author, it displays and sets up event listeners
 * for the remove and update post buttons.
 * If the current user is not the author, it invokes the notMyPost function.
 *
 * @param {Object} post - The post object to check.
 * @param {string} post.id - The ID of the post.
 * @param {Object} post.author - The author information.
 * @param {string} post.author.name - The name of the author.
 *
 * @returns {void}
 *
 * @example
 * // Assuming 'post' is a valid post object:
 * beAbleToRemovePost(post);
 */
export function beAbleToRemovePost(post) {
    const userName = localStorage.getItem("userName");
    const currentUserName = userName ? userName.trim().replace(/^"(.*)"$/, "$1") : null;

    if (currentUserName === post.author.name) {
        const removePostButton = document.querySelector("#removePostButton");
        const updatePostButton = document.querySelector("#updatePostButton");

        if (removePostButton && updatePostButton) {
            removePostButton.style.display = "block";
            updatePostButton.style.display = "block";
            removePostButton.addEventListener("click", async (event) => {
                event.preventDefault();
                try {
                    await postMethods.removePost(post.id);
                    alert("Post has been deleted.");
                    const postContainer = document.querySelector("#postContainer");
                    if (postContainer) {
                        templates.afterDeleteTemplate();
                    }
                } catch (error) {
                    console.error("Error deleting post:", error);
                    alert(`An error occurred while deleting the post: ${error.message}`);
                }
            });
        }
    } else {
        notMyPost();
    }
}

/**
 * Hides the remove and update post buttons to indicate that the current user
 * is not the author of the displayed post.
 *
 * @returns {void}
 *
 * @example
 * // Call the 'notMyPost' function when needed:
 * notMyPost();
 */
function notMyPost() {
    const removePostButton = document.querySelector("#removePostButton");
    const updatePostButton = document.querySelector("#updatePostButton");

    if (removePostButton && updatePostButton) {
        removePostButton.style.display = "none";
        updatePostButton.style.display = "none";
    }
}
