/**
 * Clears the post container and displays a success message indicating that the post was deleted.
 * Adds an element to the post container with a checkmark icon and success message.
 *
 * @returns {void}
 *
 * @example
 * afterDeleteTemplate();
 */
export function afterDeleteTemplate() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<div class="d-flex mt-5">
                                    <i class="bi bi-check-circle-fill h1 text-success me-2"></i>
                                    <h1>Your post was deleted!</h1>
                                </div>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}


/**
 * Clears the post container and displays an error message indicating that the post was not found.
 * Adds an element to the post container with an error message.
 *
 * @returns {void}
 *
 * @example
 * afterDeleteTemplateError();
 */
export function afterDeleteTemplateError() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<h1>Sorry, post not found</h1>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}
