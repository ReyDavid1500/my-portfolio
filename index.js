const dotenv = require("dotenv")

dotenv.config();

const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");
const openTab = (tabName) => {
    Array.from(tabLinks).forEach(tabLink => tabLink.classList.remove("active-link"));

    Array.from(tabContents).forEach(tabContent => tabContent.classList.remove("active-tab"));

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
};

const sideMenu = document.getElementById("side-menu");

const openMenu = () => {
    sideMenu.style.right = "0";
}
const closeMenu = () => {
    sideMenu.style.right = "-200px";
}

const form = document.querySelector("form");

try {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const data = {
            name: name,
            email: email,
            message: message,
        };

        const API_URL = process.env.API_URL;

        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });
        form.reset();
        alert("Message sent...")
    })
} catch (error) {
    console.log(error);
}

