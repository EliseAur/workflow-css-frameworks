import * as templates from "../templates/index.js";

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

//test comment

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

export function updateFeedWithSearchResults(results, container) {
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `<div class="fs-4 ms-2">No result found...</div>`;
        return;
    }

    templates.renderPostTemplates(results, container);
}
