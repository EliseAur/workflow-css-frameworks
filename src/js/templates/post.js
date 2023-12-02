// Post template for post in FEED postList
export function postTemplateForFeed(postData) {
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

    //Button "view more" in posts in feed-----------------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-flex justify-content-between align-items-center mb-3";
    const viewMoreButton = document.createElement("a");
    viewMoreButton.href = `/post/index.html?id=${postData.id}`;
    viewMoreButton.className = "viewMoreButton btn btn-sm btn-secondary w-50";
    viewMoreButton.textContent = "View more";
    //---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "timeSmall text-muted text-end";
    const creationDate = postData.created.replaceAll("-", ".");
    const dateConverted = creationDate
        .slice(0, creationDate.length - 14)
        .split(".")
        .reverse()
        .join(".");
    timeSmall.textContent = dateConverted;
    // timeSmall.textContent = postData.created;

    // This is where the commentArea begin-------------------------------------------------------
    const comments = postData.comments;

    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";

    const commentCount = document.createElement("div");
    commentCount.className = "commentCount ms-1 p-2 w-100 mb-0";

    if (comments && comments.length > 0) {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> ${comments.length}`;

        for (let i = 0; i < 2 && i < comments.length; i++) {
            const comment = comments[i];

            const commentDiv = document.createElement("div");
            commentDiv.className = "commentDiv d-flex mb-3";

            const commentImageDiv = document.createElement("div");
            commentImageDiv.className = "commentImageDiv";

            const commentImage = document.createElement("img");
            commentImage.className = "commentImage card shadow-sm profile-image";

            if (comment.author.avatar) {
                commentImage.src = comment.author.avatar;
            } else {
                commentImage.src = "/images/placeholder-profile-img.jpg";
            }

            const commentParagraph = document.createElement("p");
            commentParagraph.className = "commentParagraph comment ms-1 p-2 w-100 mb-0";
            commentParagraph.textContent = comment.body;

            commentDiv.appendChild(commentImageDiv);
            commentImageDiv.appendChild(commentImage);
            commentDiv.appendChild(commentParagraph);
            commentContainer.appendChild(commentDiv);
        }
    } else {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> <span class=fs-6> 0 </span>`;
    }

    buttonDiv.appendChild(viewMoreButton);
    buttonDiv.appendChild(commentCount);
    buttonDiv.appendChild(timeSmall);
    //------------------------------------------------------------------------------------------
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

// Post template for post details
export function postTemplateDetails(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = postData.author.avatar;

    if (!postData.author.avatar) {
        // If an avatar link is provided
        profileImage.src = "/images/placeholder-profile-img.jpg";
        // profileImage.src = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
    }

    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-4";
    nameHeading.textContent = postData.author.name;

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media;
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    cardTextParagraph.textContent = postData.body;

    //Buttongroup for the post details page: ----------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-grid align-items-center mb-3";

    const updateButton = document.createElement("a");
    updateButton.id = "updatePostButton";
    updateButton.href = `/post/edit/?id=${postData.id}`;
    updateButton.className = "btn btn-sm btn-secondary";
    updateButton.innerHTML = '<i class="bi bi-pencil-square"></i> Update';

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-primary ms-2";
    removeButton.id = "removePostButton";
    removeButton.innerHTML = '<i class="bi bi-trash-fill"></i> Remove';

    buttonDiv.appendChild(updateButton);
    buttonDiv.appendChild(removeButton);

    innerDiv.appendChild(buttonDiv);
    //Buttongroup finished---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "timeSmall text-muted text-end";
    const creationDate = postData.created.replaceAll("-", ".");
    const dateConverted = creationDate
        .slice(0, creationDate.length - 14)
        .split(".")
        .reverse()
        .join(".");
    timeSmall.textContent = dateConverted;

    // This is where the commentArea begin-------------------------------------------------------
    const comments = postData.comments;

    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";

    const commentCount = document.createElement("div");
    commentCount.className = " commentCount ms-1 p-2 w-100 mb-0";

    if (comments && comments.length > 0) {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> ${comments.length}`;
        comments.forEach((comment) => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "commentDiv d-flex mb-3";

            const commentImageDiv = document.createElement("div");
            commentImageDiv.className = "commentImageDiv";

            const commentImage = document.createElement("img");
            commentImage.className = "commentImage card shadow-sm profile-image";

            if (comment.author.avatar) {
                commentImage.src = comment.author.avatar;
            } else {
                commentImage.src = "/images/placeholder-profile-img.jpg";
                // commentImage.src = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
            }

            const commentParagraph = document.createElement("p");
            commentParagraph.className = "commentParagraph comment ms-1 p-2 w-100 mb-0";
            commentParagraph.textContent = comment.body;

            commentDiv.appendChild(commentImageDiv);
            commentImageDiv.appendChild(commentImage);
            commentDiv.appendChild(commentParagraph);
            commentContainer.appendChild(commentDiv);
        });
    } else {
        commentCount.innerHTML = `<i class="bi bi-chat-dots-fill fs-5"></i> <span class=fs-6> 0 </span>`;
    }

    buttonDiv.appendChild(commentCount);
    buttonDiv.appendChild(timeSmall);
    //------------------------------------------------------------------------------------------
    // Input area for adding comments inside cardBodyDiv
    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
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

    const postElement = postTemplateDetails(postData);
    console.log("postElement:", postElement);

    // Put the post template inside the parent
    parent.append(postTemplateDetails(postData));
}

export function renderPostTemplates(postDataList, parent) {
    const postElements = postDataList.map((postData) => {
        const postElement = postTemplateForFeed(postData);
        // console.log("postElement:", postElement);
        return postElement;
    });

    parent.append(...postElements);
}

// Some notes
// export function renderPostTemplates(postDataList, parent) {
//     parent.append(...postDataList.map(postTemplateForFeed));

//     //mapped an array of postData items. And for each postData item we provided a html template, and the we are passing that into the parent. So we go back to our test script in the main index.js file.

//     //The above is the same as:
//     // postDataList.forEach(function(post) {
//     //     postTemplate(post)
//     // })
// }
