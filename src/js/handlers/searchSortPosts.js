import * as templates from "../templates/index.js";

/**
 * Filters the posts based on the provided search query. It checks for matches
 * in post titles, bodies, authors, and tags. Returns an array of posts that match
 * the search criteria.
 *
 * @param {string} query - The search query.
 * @param {Array} posts - The array of posts to search through.
 * @returns {Array} - An array of posts that match the search criteria.
 *
 * @example
 * const searchResults = search("example", posts);
 * console.log(searchResults);
 */
export function search(query, posts) {
    return posts.filter((post) => {
        return titleMatches(query, post) || bodyMatches(query, post) || authorMatches(query, post) || tagMatches(query, post);
    });

    function titleMatches(query, post) {
        return post.title.toLowerCase().includes(query.toLowerCase());
    }

    function bodyMatches(query, post) {
        return post.body && post.body.toLowerCase().includes(query.toLowerCase());
    }

    function authorMatches(query, post) {
        return post.author.name.toLowerCase().includes(query.toLowerCase());
    }

    function tagMatches(query, post) {
        return post.tags.map((tag) => tag.toLowerCase()).includes(query.toLowerCase());
    }
}

/**
 * Sorts the posts alphabetically by author name in ascending or descending order.
 *
 * @param {Array} posts - The array of posts to sort.
 * @param {boolean} [postsAZ=true] - If true, sorts posts in ascending order (A to Z),
 *                                  if false, sorts posts in descending order (Z to A).
 * @returns {Array} - An array of posts sorted by author name.
 *
 * @example
 * const sortedPosts = sortPostsByAuthor(posts, true);
 * console.log(sortedPosts);
 */
export function sortPostsByAuthor(posts, postsAZ = true) {
    return posts.slice().sort((a, b) => {
        const authorA = a.author.name.toLowerCase();
        const authorB = b.author.name.toLowerCase();

        if (postsAZ) {
            return authorA.localeCompare(authorB);
        } else {
            return authorB.localeCompare(authorA);
        }
    });
}

/**
 * Updates the feed container with the search results by rendering the post templates.
 *
 * @param {Array} results - An array of posts that match the search criteria.
 * @param {HTMLElement} container - The container element to update with the search results.
 * @returns {void}
 *
 * @example
 * updateFeedWithSearchResults(searchResults, document.querySelector("#postList"));
 */
export function updateFeedWithSearchResults(results, container) {
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `<div class="fs-4 ms-2">No result found...</div>`;
        return;
    }

    templates.renderPostTemplates(results, container);
}
