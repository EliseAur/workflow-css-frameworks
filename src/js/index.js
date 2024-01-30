import * as listeners from "./handlers/index.js";

/**
 * Sets up routing behavior and initializes event listeners based on the current URL path.
 * This function ensures that the appropriate listeners and actions are executed for each page.
 * If the current path does not match any predefined cases, no specific actions are taken.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // This function is typically called once when the application starts to set up the initial state.
 * setupRoutingAndListeners();
 */
function setupRoutingAndListeners() {
  listeners.setLogoutFormListener();
  switch (location.pathname) {
    case "/":
    case "/index.html":
    case "/workflow-css-frameworks/index.html":
      listeners.setLoginFormListener();
      break;
    case "/profile/register/":
    case "/profile/register/index.html":
    case "/workflow-css-frameworks/profile/register/":
    case "/workflow-css-frameworks/profile/register/index.html":
      listeners.setRegisterFormListener();
      break;
    case "/posts/":
    case "/posts/index.html":
    case "/workflow-css-frameworks/posts/":
    case "/workflow-css-frameworks/posts/index.html":
      listeners.renderPostsInFeed();
      break;
    case "/post/":
    case "/post/index.html":
    case "/workflow-css-frameworks/post/":
    case "/workflow-css-frameworks/post/index.html":
      listeners.renderPostDetails();
      break;
    case "/profile/":
    case "/profile/index.html":
    case "/workflow-css-frameworks/profile/":
    case "/workflow-css-frameworks/profile/index.html":
      listeners.renderProfileDetails();
      listeners.renderPostsInFeed();
      break;
    case "/post/create/":
    case "/post/create/index.html":
    case "/workflow-css-frameworks/post/create/":
    case "/workflow-css-frameworks/post/create/index.html":
      listeners.setCreatePostFormListener();
      break;
    case "/post/edit/":
    case "/post/edit/index.html":
    case "/workflow-css-frameworks/post/edit/":
    case "/workflow-css-frameworks/post/edit/index.html":
      listeners.setUpdatePostFormListener();
      break;
    case "/profile/edit/":
    case "/profile/edit/index.html":
    case "/workflow-css-frameworks/profile/edit/":
    case "/workflow-css-frameworks/profile/edit/index.html":
      listeners.setUpdateProfileFormListener();
      break;
    default:
  }
}

setupRoutingAndListeners();
