/**
 * Creates a "View more" button element for a post in the feed.
 * The button links to the detailed view of the post.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} buttonDiv - The container to which the button is appended.
 *
 * @returns {void}
 *
 * @example
 * createVieWMoreButton(postData, buttonDiv);
 */
function createVieWMoreButton(postData, buttonDiv) {
    const viewMoreButton = document.createElement("a");
    viewMoreButton.href = `/post/index.html?id=${postData.id}`;
    viewMoreButton.className = "viewMoreButton btn btn-sm btn-secondary w-100";
    viewMoreButton.textContent = "View more";
    buttonDiv.appendChild(viewMoreButton);
}

/**
 * Creates an "Update" button element for a post on the post details page.
 * The button links to the post editing page.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} buttonDiv - The container to which the button is appended.
 *
 * @returns {void}
 *
 * @example
 * createUpdateButton(postData, buttonDiv);
 */
function createUpdateButton(postData, buttonDiv) {
    const updateButton = document.createElement("a");
    updateButton.id = "updatePostButton";
    updateButton.href = `/post/edit/?id=${postData.id}`;
    updateButton.className = "btn btn-sm btn-secondary";
    updateButton.innerHTML = '<i class="bi bi-pencil-square"></i> Update';
    buttonDiv.appendChild(updateButton);
}

/**
 * Creates a "Remove" button element for a post on the post details page.
 *
 * @param {HTMLElement} buttonDiv - The container to which the button is appended.
 *
 * @returns {void}
 *
 * @example
 * createRemoveButton(buttonDiv);
 */
function createRemoveButton(buttonDiv) {
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-primary ms-2";
    removeButton.id = "removePostButton";
    removeButton.innerHTML = '<i class="bi bi-trash-fill"></i> Remove';
    buttonDiv.appendChild(removeButton);
}

/**
 * Creates an element displaying the count of comments for a post.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} buttonDiv - The container to which the count element is appended.
 *
 * @returns {void}
 *
 * @example
 * createCommentCount(postData, buttonDiv);
 */
function createCommentCount(postData, buttonDiv) {
    const comments = postData.comments;
    const commentCount = document.createElement("div");
    commentCount.className = "commentCount ms-1 p-2 w-25 mb-0";

    if (comments && comments.length > 0) {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> ${comments.length}`;
    } else {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> <span class=fs-6> 0 </span>`;
    }

    buttonDiv.appendChild(commentCount);
}

/**
 * Creates an element displaying the count of reactions for a post.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} buttonDiv - The container to which the count element is appended.
 *
 * @returns {void}
 *
 * @example
 * createReactionCount(postData, buttonDiv);
 */
function createReactionCount(postData, buttonDiv) {
    const reactions = postData.reactions;
    const reactionCount = document.createElement("div");
    reactionCount.className = "reactionCount ms-1 p-2 w-25 mb-0";

    if (reactions && reactions.length > 0) {
        reactionCount.innerHTML = `<i class="bi bi-heart-fill fs-5"></i> ${reactions.length}`;
    } else {
        reactionCount.innerHTML = `<i class="bi bi-heart fs-5"></i> <span class=fs-6> 0 </span>`;
    }

    buttonDiv.appendChild(reactionCount);
}

/**
 * Creates an element displaying the time when the post was created.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} buttonDiv - The container to which the time element is appended.
 *
 * @returns {void}
 *
 * @example
 * timePostWasCreated(postData, buttonDiv);
 */
function timePostWasCreated(postData, buttonDiv) {
    const timeSmall = document.createElement("small");
    timeSmall.className = "timeSmall text-muted text-end ms-auto";
    const creationDate = postData.created.replaceAll("-", ".");
    const dateConverted = creationDate
        .slice(0, creationDate.length - 14)
        .split(".")
        .reverse()
        .join(".");
    timeSmall.textContent = dateConverted;
    buttonDiv.appendChild(timeSmall);
}

/**
 * Creates a div element containing the avatar image and body of a comment.
 *
 * @param {Object} comment - The data of the comment.
 *
 * @returns {HTMLDivElement} - The created comment div.
 *
 * @example
 * createCommentDiv(comment);
 */
function createCommentDiv(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "commentDiv d-flex mb-3";

    const commentImageDiv = document.createElement("div");
    commentImageDiv.className = "commentImageDiv";

    const commentImage = document.createElement("img");
    commentImage.className = "commentImage card shadow-sm profile-image";
    commentImage.src = comment.author.avatar || "/images/placeholder-profile-img.jpg";

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "commentParagraph comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = comment.body;

    commentDiv.appendChild(commentImageDiv);
    commentImageDiv.appendChild(commentImage);
    commentDiv.appendChild(commentParagraph);

    return commentDiv;
}

/**
 * Creates a container for displaying comments for a post.
 * By default, it displays a maximum of 2 comments for posts in the feed.
 * For the post detail page, it displays all comments.
 *
 * @param {Array<Object>} comments - The array of comments for the post.
 * @param {number} [maxComments=2] - The maximum number of comments to display (for posts in the feed).
 *
 * @returns {HTMLDivElement} - The created comment container.
 *
 * @example
 * // Display all comments for a post on the post detail page
 * const allCommentsContainer = createComments(comments);
 *
 * // Display at most 2 comments for a post in the feed
 * const limitedCommentsContainer = createComments(comments, 2);
 */
function createComments(comments, maxComments = 2) {
    const commentContainerForComments = document.createElement("div");
    commentContainerForComments.className = "commentContainerForComments";

    const maxToShow = window.location.pathname.includes("/post/") ? comments.length : Math.min(maxComments, comments.length);

    for (let i = 0; i < maxToShow; i++) {
        const comment = comments[i];
        const commentDiv = createCommentDiv(comment);
        commentContainerForComments.appendChild(commentDiv);
    }

    return commentContainerForComments;
}

/**
 * Creates and appends a comment area to the card body.
 * The comment area includes the container for displaying comments based on the post data.
 *
 * @param {Object} postData - The data of the post.
 * @param {HTMLElement} cardBodyDiv - The container to which the comment area is appended.
 *
 * @returns {void}
 *
 * @example
 * // Create and append comment area for a post
 * const postData = { id: 1, comments: [{ id: 123, body: "This is a comment" }]};
 * createCommentArea(postData, cardBodyDiv);
 */
function createCommentArea(postData, cardBodyDiv) {
    const comments = postData.comments;
    if (comments && comments.length > 0) {
        const commentContainerOuter = createComments(comments);
        cardBodyDiv.appendChild(commentContainerOuter);
    }

    const addCommentForm = document.createElement("form");
    addCommentForm.className = "addCommentForm add-comment input-group shadow-sm mb-1";
    addCommentForm.id = `addCommentForm-${postData.id}`;

    const commentButton = document.createElement("button");
    commentButton.id = "button-addon1";
    commentButton.className = "commentButton btn btn-secondary";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.name = "comment";
    commentInput.className = "commentInput form-control";
    commentInput.placeholder = "Give some positive feedback!";

    addCommentForm.appendChild(commentButton);
    addCommentForm.appendChild(commentInput);

    cardBodyDiv.appendChild(addCommentForm);
}

/**
 * Creates a template for displaying posts in the feed, profile, and post details page.
 *
 * @param {Object} postData - The data of the post.
 * @returns {HTMLDivElement} - The created post template as a HTMLDivElement.
 *
 * @example
 * // Example usage:
 * const post = postTemplate({
 *   author: {
 *     name: "John Doe",
 *     avatar: "path/to/avatar.jpg",
 *   },
 *   title: "Post Title",
 *   body: "Post content...",
 *   media: "path/to/media.jpg",
 *   comments: [...],
 *   reactions: [...],
 *   created: "2023-12-01T12:34:56.789Z",
 * });
 * document.body.appendChild(post);
 */
export function postTemplate(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "innerDiv col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "dFlexDiv d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "profileImageDiv mx-2 mb-2";

    const profileImage = document.createElement("img");

    if (postData.author.avatar) {
        profileImage.src = postData.author.avatar;
    } else {
        profileImage.src = "/images/placeholder-profile-img.jpg";
    }

    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "profileImage card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "nameHeading feed-heading feed-name mb-0 fs-4";
    nameHeading.textContent = postData.author.name;

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "titleParagraph feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "cardDiv card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media;
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "workoutImage bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "cardBodyDiv card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "cardTextParagraph card-text";
    cardTextParagraph.textContent = postData.body;

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-flex justify-content-between align-items-center mb-3";

    const commentContainerOuter = document.createElement("div");
    commentContainerOuter.className = "commentContainerOuter";

    if (window.location.pathname.includes("/posts/") || window.location.pathname.includes("/profile/")) {
        createVieWMoreButton(postData, buttonDiv);
    } else if (window.location.pathname.includes("/post/")) {
        createUpdateButton(postData, buttonDiv);
        createRemoveButton(buttonDiv);
    }

    createCommentCount(postData, buttonDiv);
    createReactionCount(postData, buttonDiv);
    timePostWasCreated(postData, buttonDiv);
    createCommentArea(postData, commentContainerOuter);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentContainerOuter);

    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

/**
 * Renders a single post template and appends it to the specified parent element.
 *
 * @param {Object} postData - The data of the post to render.
 * @param {Element} parent - The parent element to which the post template will be appended.
 *
 */
export function renderPostTemplate(postData, parent) {
    if (!parent || !(parent instanceof Element)) {
        console.error("Invalid parent element provided for rendering post template.");
        return;
    }

    parent.append(postTemplate(postData));
}

/**
 * Renders multiple post templates for a list of post data and appends them to the specified parent element.
 *
 * @param {Array<Object>} postDataList - The list of post data to render.
 * @param {Element} parent - The parent element to which the post templates will be appended.
 *
 */
export function renderPostTemplates(postDataList, parent) {
    const postElements = postDataList.map((postData) => {
        const postElement = postTemplate(postData);
        return postElement;
    });

    parent.append(...postElements);
}
