import * as templates from "../templates/index.js";
import * as postMethods from "../api/posts/index.js";
import * as handlers from "./index.js";

/**
 * Retrieves the post ID from the URL query parameters.
 *
 * @returns {string|null} The post ID or null if not found.
 *
 * @example
 * // Call 'getPostIdFromUrl' to get the post ID from the URL:
 * const postId = getPostIdFromUrl();
 * console.log(postId); // The post ID or null
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("id");
}

/**
 * Renders the details of a specific post and sets up functionality
 * for removing the post if the current user is the author.
 *
 * @returns {void}
 *
 * @example
 * // Call 'renderPostDetails' to render details of a specific post:
 * await renderPostDetails();
 */
export async function renderPostDetails() {
    const postId = getPostIdFromUrl();
    console.log(postId);

    if (postId) {
        const post = await postMethods.getPost(postId);
        const container = document.querySelector("#postContainer");
        templates.renderPostTemplate(post, container);
        handlers.beAbleToRemovePost(post);
    } else {
        templates.afterDeleteTemplateError();
    }
}

/**
 * Renders posts in the feed, filtering and sorting as needed,
 * and sets up search and sort functionality.
 *
 * @returns {void}
 *
 * @example
 * // Call 'renderPostsInFeed' to render posts in the feed:
 * await renderPostsInFeed();
 */
export async function renderPostsInFeed() {
    const posts = await postMethods.getPosts();
    const container = document.querySelector("#postList");
    container.innerHTML = "";

    if (window.location.pathname.includes("profile/index.html") || window.location.pathname.includes("profile/")) {
        const profilePosts = postMethods.filterPostDataForProfile(posts);
        templates.renderPostTemplates(profilePosts, container);
        setupSearchFunctionality(profilePosts);
        handlers.setCreateCommentFormListener();
    } else {
        const goodPosts = postMethods.filterBadPostData(posts);
        templates.renderPostTemplates(goodPosts, container);
        setupSearchFunctionality(goodPosts);
        setupSortDropdown(goodPosts);

        handlers.setCreateCommentFormListener();
    }
}

/**
 * Sets up search functionality for filtering posts based on user input.
 * Also sets up event listeners for search input and form submission.
 *
 * @param {Array} posts - The array of posts to be searched.
 *
 * @returns {void}
 *
 * @example
 * // Call 'setupSearchFunctionality' to set up search functionality:
 * setupSearchFunctionality(posts);
 */
function setupSearchFunctionality(posts) {
    const searchInput = document.querySelector("#search-input");
    const searchForm = document.querySelector("#search-form");
    const container = document.querySelector("#postList");

    searchInput.addEventListener("keyup", handleSearchInput);
    searchForm.addEventListener("submit", handleSearchSubmit);

    function handleSearchInput(event) {
        const inputValue = event.currentTarget.value.trim().toLowerCase();
        const searchResults = handlers.search(inputValue, posts);
        handlers.updateFeedWithSearchResults(searchResults, container);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        const inputValue = searchInput.value.trim().toLowerCase();
        const searchResults = handlers.search(inputValue, posts);
        handlers.updateFeedWithSearchResults(searchResults, container);
    }
}

/**
 * Sets up sorting functionality for sorting posts based on user selection.
 * Also sets up an event listener for changes in the sort dropdown.
 *
 * @param {Array} posts - The array of posts to be sorted.
 *
 * @returns {void}
 *
 * @example
 * // Call 'setupSortDropdown' to set up sorting functionality:
 * setupSortDropdown(posts);
 */
function setupSortDropdown(posts) {
    const container = document.querySelector("#postList");
    const sortDropdown = document.querySelector("#sort-posts");

    if (sortDropdown) {
        sortDropdown.value = "default";
        sortDropdown.addEventListener("change", handleSortChange);

        function handleSortChange() {
            const selectedOption = sortDropdown.value;
            let sortedPosts;

            switch (selectedOption) {
                case "authorAZ":
                    sortedPosts = handlers.sortPostsByAuthor(posts, true);
                    break;
                case "authorZA":
                    sortedPosts = handlers.sortPostsByAuthor(posts, false);
                    break;
                case "default":
                default:
                    sortedPosts = posts;
            }

            handlers.updateFeedWithSearchResults(sortedPosts, container);
        }
    }
}
