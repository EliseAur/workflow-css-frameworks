import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "get";

export async function getPosts() {
    const baseURL = API_SOCIAL_URL;
    const getPostURL = new URL(`${baseURL}${action}`);
    getPostURL.searchParams.set("_author", true);
    getPostURL.searchParams.set("_comments", true);
    getPostURL.searchParams.set("_reactions", true);

    const response = await authFetch(getPostURL.toString());

    return await response.json();
}

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
