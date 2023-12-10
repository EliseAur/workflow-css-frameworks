/**
 * Creates and renders a profile template for the profile page.
 * Sets the page title, banner, avatar, user information, followers/following counts,
 * and provides options to see followers and edit the profile.
 *
 * @param {Object} profile - The profile data to render.
 *
 * @example
 * // Example usage:
 * templateForProfile({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   avatar: "path/to/avatar.jpg",
 *   banner: "path/to/banner.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 100,
 *     following: 50,
 *   },
 * });
 */
function templateForProfile(profile) {
    const titleElement = document.querySelector("title");
    if (titleElement) {
        titleElement.textContent = `${profile.name}'s profile | Stronger together`;
    }

    const profileDetailsContainer = document.getElementById("profileDetailsContainer");
    profileDetailsContainer.innerHTML = "";

    const bannerBox = document.createElement("div");
    bannerBox.classList.add("bannerBox", "profile", "pb-4", "text-center");
    bannerBox.style.backgroundImage = `url('${profile.banner}')`;
    bannerBox.style.backgroundSize = "cover";
    bannerBox.style.backgroundPosition = "center";
    bannerBox.style.backgroundRepeat = "no-repeat";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add(
        "card",
        "profile__box",
        "bg-dark",
        "text-light",
        "shadow-sm",
        "col-sm-9",
        "col-md-7",
        "col-lg-6",
        "col-xl-5",
        "col-xxl-4",
        "mx-sm-auto",
        "p-4",
        "my-5",
        "mx-2",
        "d-flex",
        "align-items-center"
    );

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("d-sm-flex");

    const profileInfo = document.createElement("div");
    profileInfo.classList.add("profile__info", "d-flex", "flex-column", "justify-content-center", "text-center", "mt-2", "border", "border-white", "p-2", "p-md-3", "m-2", "mb-sm-0");

    profileInfo.innerHTML = `
        <img src="${profile.avatar}" alt="Profile Picture" class="profile__user-img img-fluid rounded-circle w-50 h-50 shadow-sm mx-auto">
        <h3 class="mb-0 color-secondary">${profile.name}</h3>
        <p class="mb-0">${profile.email}</p>
        <p class="pt-2 mb-0 fs-5"><span class="fw-bold">Posts: </span>${profile._count.posts}</p>
    `;

    const editFollowingContainer = document.createElement("div");
    editFollowingContainer.classList.add("mt-2", "mx-2", "mt-2", "mb-0", "d-flex", "flex-column", "align-items-center");

    const followersArea = document.createElement("div");
    followersArea.classList.add("followersArea", "profile__follow", "border", "border-white", "p-2", "p-md-3", "mb-0", "align-items-center", "w-100");

    const followContent = document.createElement("div");
    followContent.classList.add("followContent", "text-center", "follow", "mx-auto", "pb-1", "pb-sm-0");

    followContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <a class="nav-link follow__count p-2 me-1" href="#">
                <p class="mb-0 fs-4">${profile._count.followers}</p>
                <p class="mb-0">Followers</p>
            </a>
            <a class="nav-link follow__count p-2 ms-1" href="#">
                <p class="mb-0 fs-4">${profile._count.following}</p>
                <p class="mb-0">Following</p>
            </a>
        </div>
        <button class="btn btn-secondary follow-button mt-2 mt-md-3">Follow</button>
    `;

    const editArea = document.createElement("div");
    editArea.classList.add("editArea", "profile__follow", "h-100", "w-100", "mt-2", "border", "border-white", "p-2", "p-md-3", "mb-0", "d-flex", "justify-content-center", "align-items-center");

    const editContent = document.createElement("div");
    editContent.innerHTML = `<a class="btn btn-secondary edit-button px-4" href="/profile/edit" >Edit profile </button>`;

    editArea.appendChild(editContent);
    followersArea.appendChild(followContent);
    flexContainer.appendChild(profileInfo);
    flexContainer.appendChild(editFollowingContainer);
    editFollowingContainer.appendChild(followersArea);
    editFollowingContainer.appendChild(editArea);
    cardContainer.appendChild(flexContainer);
    bannerBox.appendChild(cardContainer);
    profileDetailsContainer.appendChild(bannerBox);
}

/**
 * Renders the profile template for the given profile and appends it to the specified parent container.
 * If the parent container is not a valid HTML element, an error is logged, and rendering is aborted.
 *
 * @param {Object} profile - The profile data to be rendered.
 * @param {Element} parent - The parent container where the profile template will be appended.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const userProfile = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   avatar: "path/to/avatar.jpg",
 *   banner: "path/to/banner.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 100,
 *     following: 50,
 *   },
 * };
 * const parentContainer = document.getElementById("profileDetailsContainer");
 * renderProfileTemplate(userProfile, parentContainer);
 */
export function renderProfileTemplate(profile, parent) {
    if (!parent || !(parent instanceof Element)) {
        console.error("Invalid parent element provided for rendering profile template.");
        return;
    }

    templateForProfile(profile);
}
