import { getPost, updatePost } from "../api/posts/index.js";

/**
 * Sets up the form listener for updating a post. Retrieves the post details,
 * populates the form fields, and handles the form submission to update the post.
 *
 * @returns {void}
 *
 * @example
 * setUpdatePostFormListener();
 */
export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPost");
    const container = document.querySelector("#editPostContainer");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        //disable the form with the button before it is uploaded
        const button = form.querySelector("button");
        button.disabled = true;

        //loading the form
        const postEdit = await getPost(id);
        form.title.value = postEdit.title;
        form.body.value = postEdit.body;
        form.tags.value = postEdit.tags;
        form.media.value = postEdit.media;

        //Once we have loaded the form
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            //provide the form data to this constructor
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            post.id = id;
            // console.log("This is the updated post", post);

            updatePost(post);

            container.appendChild(form);

            alert("You're post was successfully updated.");
            location.href = `/post/index.html?id=${id}`;
        });
    }
}
