import { createCommentOnPost } from "../api/posts/comment.js";
import * as postMethods from "../api/posts/index.js";

/**
 * Sets up event listeners for comment forms to handle comment creation.
 * @function
 * @returns {void}
 */
export function setCreateCommentFormListener() {
    const commentForms = document.querySelectorAll(".addCommentForm");

    commentForms.forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const commentData = Object.fromEntries(formData.entries());

            // Extract postId from the form's ID
            const postId = extractPostIdFromFormId(form.id);

            // Set postId in the comment object
            commentData.postId = postId;

            try {
                commentData.body = form.querySelector("input[name='comment']").value;
                const createdComment = await createCommentOnPost(postId, commentData);
                updateCommentsArray(postId, createdComment);
                alert("Your comment was successfully added.");
                form.querySelector("input[name='comment']").value = "";
                location.reload();
            } catch (error) {
                console.error("Error response from server:", error);
                alert(`An error occurred while adding the comment: ${error.message}`);
            }
        });
    });
}

/**
 * Helper function to extract postId from the form's ID.
 * @function
 * @param {string} formId - The ID of the comment form.
 * @returns {?string} The extracted postId or null if extraction fails.
 */
function extractPostIdFromFormId(formId) {
    const postIdPattern = /addCommentForm-(\d+)/;
    const match = formId.match(postIdPattern);

    if (match) {
        return match[1];
    } else {
        console.error("Failed to extract Post ID from form ID:", formId);
        return null;
    }
}

/**
 * Function to update the comments array for a specific post.
 * @async
 * @function
 * @param {string} postId - The ID of the post to update.
 * @param {Object} newComment - The new comment object to add to the post's comments array.
 * @returns {Promise<void>}
 */
async function updateCommentsArray(postId, newComment) {
    const posts = await postMethods.getPosts();

    const postToUpdate = posts.find((post) => post.id === postId);

    if (postToUpdate) {
        postToUpdate.comments.push(newComment);
    } else {
        console.error("Post not found for updating comments array:", postId);
    }
}
