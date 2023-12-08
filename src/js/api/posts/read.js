import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get";

/**
 * Retrieves a list of posts with additional information about the author, comments, and reactions.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of post objects.
 */
export async function getPosts() {
    const baseURL = API_SOCIAL_URL;
    const getPostURL = new URL(`${baseURL}${action}`);
    getPostURL.searchParams.set("_author", true);
    getPostURL.searchParams.set("_comments", true);
    getPostURL.searchParams.set("_reactions", true);

    const response = await authFetch(getPostURL.toString());

    return await response.json();
}

/**
 * Retrieves a specific post by its ID with additional information about the author, comments, and reactions.
 *
 * @param {string} id - The ID of the post to retrieve.
 * @throws {Error} - Throws an error if the post ID is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the requested post object.
 */
export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }

    const baseURL = API_SOCIAL_URL;
    const getPostURL = new URL(`${baseURL}${action}/${id}`);
    getPostURL.searchParams.set("_author", true);
    getPostURL.searchParams.set("_comments", true);
    getPostURL.searchParams.set("_reactions", true);

    const response = await authFetch(getPostURL.toString());

    return await response.json();
}
