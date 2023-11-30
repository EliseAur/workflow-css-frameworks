import { API_SOCIAL_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post";

// console.log("/auth/login.js running");

export async function login(profile) {
    const loginURL = `${API_SOCIAL_URL}${action}?_count=true`;
    // API_SOCIAL_URL + action;
    console.log("This is the login URL:", loginURL);

    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    // const result = await response.json();
    // console.log("This is a new user logged in, with an ID and token", result);
    // storage.save("token", result.accessToken);
    // storage.save("profile", result);
    //Instead of grabbing the whole object and picking them apart like above, we can destructure

    const { accessToken, ...user } = await response.json(); //the first is the token and then we want everything else to be called user
    console.log("This is a new user logged in, with a token", accessToken, user);
    storage.save("token", accessToken); // Saves the token seperatly
    storage.save("profile", user); // saves all the other details apart from the token as user
    console.log(user.name);
    storage.save("userName", user.name);

    alert("You are now logged in");
    window.location.href = "/posts/index.html";
}

// const token = storage.load("token");
// console.log("This is the token from local storage", token);

// const user = storage.load("profile");
// console.log("This is the profile from local storage", user);
