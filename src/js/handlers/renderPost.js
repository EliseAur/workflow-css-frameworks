import * as templates from "../templates/index.js";
import * as postMethods from "../api/posts/index.js";
import * as handlers from "./index.js";

function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("id");
}

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

export async function renderPostsInFeed() {
    const posts = await postMethods.getPosts();
    //getting the goodPosts with title and media from API
    const container = document.querySelector("#postList");
    container.innerHTML = "";

    if (window.location.pathname.includes("profile/index.html") || window.location.pathname.includes("profile/")) {
        const profilePosts = postMethods.filterPostDataForProfile(posts);
        console.log(profilePosts);
        templates.renderPostTemplates(profilePosts, container);
        setupSearchFunctionality(profilePosts);
    } else {
        const goodPosts = postMethods.filterBadPostData(posts);
        console.log(goodPosts);
        templates.renderPostTemplates(goodPosts, container);
        setupSearchFunctionality(goodPosts);
        setupSortDropdown(goodPosts);
    }
}

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
