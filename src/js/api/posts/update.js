import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "put";

/**
 * Updates an existing post with the provided data.
 *
 * @param {Object} postData - The updated post data including the post ID.
 * @param {string} postData.id - The ID of the post to update.
 * @param {string} [postData.title] - The updated title of the post.
 * @param {string} [postData.body] - The updated body/content of the post.
 * @param {string} [postData.media] - The updated media URL of the post.
 * @throws {Error} - Throws an error if the post ID is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the updated post object.
 */
export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Update requires a postID");
    }
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        body: JSON.stringify(postData),
    });

    return await response.json();
}
