import { getProfile } from "../api/auth/profile.js";
import { updateProfile } from "../api/profile/update.js";

/**
 * Sets up the form listener for updating a user profile. Retrieves the profile details,
 * populates the form fields, and handles the form submission to update the profile.
 *
 * @returns {void}
 *
 * @example
 * setUpdateProfileFormListener();
 */
export async function setUpdateProfileFormListener() {
    const form = document.querySelector("#editProfile");
    const button = document.querySelector("button");
    console.log(form);

    if (form && button) {
        //disable the form with the button before it is uploaded
        button.disabled = true;

        try {
            //loading the form
            const profileEdit = await getProfile();
            form.banner.value = profileEdit.banner;
            form.avatar.value = profileEdit.avatar;

            //Once we have loaded the form
            button.disabled = false;

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                button.disabled = true;
                const formData = new FormData(form);
                const profile = Object.fromEntries(formData.entries());

                try {
                    await updateProfile(profile);
                    alert("Your profile was successfully updated.");
                    location.href = `/profile/index.html`;
                } catch (error) {
                    console.error("Error updating profile:", error);
                    alert(`Error updating profile: ${error.message} Please try again.`);
                } finally {
                    button.disabled = false;
                }
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert(`Error fetching profile details: ${error.message}. Please try again.`);
        }
    }
}
