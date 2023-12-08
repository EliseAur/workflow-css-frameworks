/**
 * Checks if the title of a post is considered good based on a minimum length criterion.
 *
 * @param {Object} post - The post object to be checked.
 * @param {string} post.title - The title of the post.
 * @returns {boolean} - Returns true if the post title meets the criteria, otherwise false.
 */
function isPostTitleGood(post) {
    return post.title.length > 3;
}

/**
 * Checks if the provided post is created by the current user.
 *
 * @param {Object} post - The post object to be checked.
 * @param {string} post.author.name - The name of the post author.
 * @returns {string|null} - Returns the post author's name if it matches the current user, otherwise null.
 */
function isPostCreatedByCurrentUser(post) {
    const user = localStorage.getItem("userName");

    const profileUserName = user ? user.trim().replace(/^"(.*)"$/, "$1") : null;
    const authorName = post.author.name.trim();

    if (profileUserName === authorName) {
        return post.author.name;
    }
}

/**
 * Checks if a post meets certain criteria.
 *
 * @param {Object} post - The post object to be checked.
 * @returns {boolean} - Returns true if the post meets the criteria, otherwise false.
 */
function doesPostMeetCriterias(post) {
    return isPostTitleGood(post);
}

/**
 * Checks if a post meets criteria specific to the user's profile.
 *
 * @param {Object} post - The post object to be checked.
 * @returns {boolean} - Returns true if the post meets the profile criteria, otherwise false.
 */
function doesPostMeetProfileCriterias(post) {
    return isPostTitleGood(post) && isPostCreatedByCurrentUser(post);
}

/**
 * Filters out posts that do not meet general criteria.
 *
 * @param {Object[]} posts - An array of post objects to be filtered.
 * @returns {Object[]} - An array of posts that meet the general criteria.
 */
export function filterBadPostData(posts) {
    return posts.filter(doesPostMeetCriterias);
}

/**
 * Filters out posts that do not meet criteria specific to the user's profile.
 *
 * @param {Object[]} posts - An array of post objects to be filtered.
 * @returns {Object[]} - An array of posts that meet the profile criteria.
 */
export function filterPostDataForProfile(posts) {
    return posts.filter(doesPostMeetProfileCriterias);
}
