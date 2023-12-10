import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "post";

export async function createCommentOnPost(postId, commentData) {
    const commentOnPostURL = `${API_SOCIAL_URL}${action}/${postId}/comment`;

    try {
        const createdComment = await authFetch(commentOnPostURL, {
            method,
            body: JSON.stringify({
                body: commentData.body,
                replyToId: commentData.replyToId || null,
            }),
        });

        return await createdComment.json();
    } catch (error) {
        console.error("Error response from server:", error.response);
        throw new Error("Failed to create comment");
    }
}
