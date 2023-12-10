import { createPost } from "../api/posts/index.js";

/**
 * Sets up a form submit listener for the create post form.
 * When the form is submitted, it prevents the default form submission,
 * extracts the form data, creates a post, and redirects to the created post.
 *
 * @function
 * @returns {void}
 */
export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            try {
                const createdPost = await createPost(post);
                const createdPostId = createdPost.id;
                alert("Your post was successfully created.");
                location.href = `/post/index.html?id=${createdPostId}`;
            } catch (error) {
                alert(`An error occurred while creating the post: ${error.message}`);
            }
        });
    }
}
