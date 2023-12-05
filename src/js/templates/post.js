// // Post template for post in FEED postList

// Creating view more Button function for posts in feed
function createVieWMoreButton(postData, buttonDiv) {
    const viewMoreButton = document.createElement("a");
    viewMoreButton.href = `/post/index.html?id=${postData.id}`;
    viewMoreButton.className = "viewMoreButton btn btn-sm btn-secondary w-100";
    viewMoreButton.textContent = "View more";
    buttonDiv.appendChild(viewMoreButton);
}

// Create updateButton function for post details page
function createUpdateButton(postData, buttonDiv) {
    const updateButton = document.createElement("a");
    updateButton.id = "updatePostButton";
    updateButton.href = `/post/edit/?id=${postData.id}`;
    updateButton.className = "btn btn-sm btn-secondary";
    updateButton.innerHTML = '<i class="bi bi-pencil-square"></i> Update';
    buttonDiv.appendChild(updateButton);
}

function createRemoveButton(buttonDiv) {
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-primary ms-2";
    removeButton.id = "removePostButton";
    removeButton.innerHTML = '<i class="bi bi-trash-fill"></i> Remove';
    buttonDiv.appendChild(removeButton);
}

//Creating commentCount-function:
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

//Creating reactionCount-function:
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

// Creating timePostWasCreated function
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

//Creating elements for comments
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

// Creating comments max=2 for posts in feed and show all posts for post in post detail page
function createComments(comments, maxComments = 2) {
    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";

    const maxToShow = window.location.pathname.includes("/post/") ? comments.length : Math.min(maxComments, comments.length);

    for (let i = 0; i < maxToShow; i++) {
        const comment = comments[i];
        const commentDiv = createCommentDiv(comment);
        commentContainer.appendChild(commentDiv);
    }

    return commentContainer;
}

function createCommentArea(postData, cardBodyDiv) {
    const comments = postData.comments;
    console.log("Creating comment area for post:", comments);

    if (comments && comments.length > 0) {
        //If path is true, show all comments, If path is false - show at most 2 comments
        const commentContainer = window.location.pathname.includes("/post/") ? createComments(comments) : createComments(comments, 2);

        cardBodyDiv.appendChild(commentContainer);
    }
}

// creates template for post for feed, profile and post details page
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
    profileImage.src = postData.author.avatar;

    if (!postData.author.avatar) {
        // If an avatar link is provided
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

    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";

    if (window.location.pathname.includes("/posts/") || window.location.pathname.includes("/profile/")) {
        createVieWMoreButton(postData, buttonDiv);
    } else if (window.location.pathname.includes("/post/")) {
        createUpdateButton(postData, buttonDiv);
        createRemoveButton(buttonDiv);
    }

    createCommentCount(postData, buttonDiv);
    createReactionCount(postData, buttonDiv);
    timePostWasCreated(postData, buttonDiv);
    createCommentArea(postData, commentContainer);

    //Add comment input area
    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "addCommentDiv add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "commentButton btn btn-secondary";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "commentInput form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentContainer);
    cardBodyDiv.appendChild(addCommentDiv);

    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

export function renderPostTemplate(postData, parent) {
    if (!parent || !(parent instanceof Element)) {
        console.error("Invalid parent element provided for rendering post template.");
        return;
    }

    const postElement = postTemplate(postData);
    console.log("postElement:", postElement);

    // Put the post template inside the parent
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    const postElements = postDataList.map((postData) => {
        const postElement = postTemplate(postData);
        return postElement;
    });

    parent.append(...postElements);
}
