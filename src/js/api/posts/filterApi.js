function isPostTitleGood(post) {
    return post.title.length > 3;
}

function isPostCreatedByCurrentUser(post) {
    const user = localStorage.getItem("userName");
    console.log(user);
    // Trim it so it does not have the quotation marks on it
    const profileUserName = user ? user.trim().replace(/^"(.*)"$/, "$1") : null;
    // console.log("currentUserName:", profileUserName);

    const authorName = post.author.name.trim();
    // console.log("authorName:", authorName);

    //check if the current username from local storage matches the post author name in api
    if (profileUserName === post.author.name) {
        return post.author.name;
    }
}

function doesPostMeetCriterias(post) {
    // return isPostTitleGood(post) && doesPostHaveMedia(post);
    return isPostTitleGood(post);
}

function doesPostMeetProfileCriterias(post) {
    // return isPostTitleGood(post) && doesPostHaveMedia(post);
    return isPostTitleGood(post) && isPostCreatedByCurrentUser(post);
}

export function filterBadPostData(posts) {
    return posts.filter(doesPostMeetCriterias);
}

export function filterPostDataForProfile(posts) {
    return posts.filter(doesPostMeetProfileCriterias);
}

// function doesPostHaveMedia(post) {
//     return Boolean(post.media && post.media.length);
// }

// function doesPostHaveBody(post) {
//     return post.body;
// }

// function doesPostMeetProfileCriteria(post) {
//     return isPostCreatedByCurrentUser(post);
// }

// export function filterPostDataForProfile(posts) {
//     return posts.filter(doesPostMeetProfileCriteria);
// }
