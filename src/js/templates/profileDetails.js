function templateForProfile(profile) {
    // Create the main container
    const profileDetailsContainer = document.getElementById("profileDetailsContainer");
    console.log(profileDetailsContainer);
    profileDetailsContainer.innerHTML = ""; // Clear existing content

    // Create the banner box
    const bannerBox = document.createElement("div");
    bannerBox.classList.add("bannerBox", "profile", "pb-4", "text-center");

    // Create the card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "profile__box", "bg-dark", "text-light", "shadow-sm", "col-sm-8", "col-md-7", "col-lg-6", "col-xl-5", "col-xxl-4", "mx-auto", "p-4", "my-5");

    // Create the d-sm-flex container
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("d-sm-flex");

    // Create the profile info section
    const profileInfo = document.createElement("div");
    profileInfo.classList.add("profile__info", "text-center", "mt-2", "border", "border-white", "p-2", "p-md-3", "m-2", "mb-sm-0");

    // Add user details
    profileInfo.innerHTML = `
        <img src="${profile.avatar}" alt="Profile Picture" class="profile__user-img img-fluid rounded-circle w-50 shadow-sm">
        <h3 class="mb-0 color-secondary">${profile.name}</h3>
        <p class="mb-0">${profile.email}</p>
        <p class="pt-2 mb-0 fs-5"><span class="fw-bold">Posts: </span>${profile._count.posts}</p>
    `;

    // Create box for followersArea and editArea
    const editFollowingContainer = document.createElement("div");
    editFollowingContainer.classList.add("mt-2", "mx-2", "mt-2", "mb-0", "d-flex", "flex-column", "align-items-center");

    // Create the profile followers area
    const followersArea = document.createElement("div");
    followersArea.classList.add("followersArea", "profile__follow", "border", "border-white", "p-2", "p-md-3", "mb-0", "align-items-center");

    const followContent = document.createElement("div");
    followContent.classList.add("followContent", "text-center", "follow", "mx-auto", "pb-1", "pb-sm-0");

    // Add followers details
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

    // Add edit area
    const editArea = document.createElement("div");
    editArea.classList.add("editArea", "profile__follow", "h-100", "w-100", "mt-2", "border", "border-white", "p-2", "p-md-3", "mb-0", "d-flex", "justify-content-center", "align-items-center");

    // Add edit details
    const editContent = document.createElement("div");
    editContent.innerHTML = `<button class="btn btn-secondary edit-button px-4">Edit profile </button>`;
    editArea.appendChild(editContent);
    // Append followers content to followers area
    followersArea.appendChild(followContent);

    // Append profile info to flex container
    flexContainer.appendChild(profileInfo);
    flexContainer.appendChild(editFollowingContainer);
    // Append followers area to editFollowingContainer
    editFollowingContainer.appendChild(followersArea);
    editFollowingContainer.appendChild(editArea);

    // ... Create and append other sections (profile__follow) similarly ...

    // Append flex container to card container
    cardContainer.appendChild(flexContainer);

    // Append card container to banner box
    bannerBox.appendChild(cardContainer);

    // Set banner as background image
    bannerBox.style.backgroundImage = `url('${profile.banner}')`;

    // Append banner box to profile details container
    profileDetailsContainer.appendChild(bannerBox);
}

export function renderProfileTemplate(profile, parent) {
    if (!parent || !(parent instanceof Element)) {
        console.error("Invalid parent element provided for rendering profile template.");
        return;
    }
    // Put the template for profile inside the parent
    templateForProfile(profile);
}
