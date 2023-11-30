import * as listeners from "./handlers/index.js";
import { getProfile } from "./api/auth/profile.js";

getProfile();

//----------------------------------------------------------------------
// Routing behaviour to make sure the wrong scripts are not running
const path = location.pathname;
console.log(path);

listeners.setLogoutFormListener();

switch (location.pathname) {
    case "/":
    case "/index.html":
        listeners.setLoginFormListener();
        break;
    case "/profile/register/":
    case "/profile/register/index.html":
        listeners.setRegisterFormListener();
        break;
    case "/posts/":
    case "/posts/index.html":
        listeners.renderPostsInFeed();
        break;
    case "/post/":
    case "/post/index.html":
        listeners.renderPostDetails();
        break;
    case "/profile/":
    case "/profile/index.html":
        listeners.renderProfileDetails();
        listeners.renderPostsInFeed();
        break;
    case "/post/create/":
    case "/post/create/index.html":
        listeners.setCreatePostFormListener();
        break;
    case "/post/edit/":
    case "/post/edit/index.html":
        listeners.setUpdatePostFormListener();
        break;
    default:
}
