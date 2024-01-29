import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "post";

/**
 * Creates a new post by sending a POST request to the server.
 *
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The content/body of the post.
 * @param {string} [postData.media] - Optional media URL for the post (e.g., image or video).
 * @throws {Error} - Throws an error if the post creation fails.
 *
 * @example
 * // Example usage: Creating a new post.
 * const newPostData = {
 *   title: "Exciting Title",
 *   body: "This is the content of the post. It can be quite long.",
 *   media: "https://example.com/image.jpg" // Optional
 * };
 *
 * try {
 *   const createdPost = await createPost(newPostData);
 *   console.log("Post created successfully:", createdPost);
 * } catch (error) {
 *   console.error("Post creation failed:", error.message);
 * }
 *
 * @returns {Promise<Object>} - A promise that resolves to the created post data.
 */
export async function createPost(postData) {
    const createPostURL = API_SOCIAL_URL + action;

    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData),
    });

    return await response.json();
}
