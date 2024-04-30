const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");
const userInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const form = document.querySelector("form");
const invalidMsg = document.getElementById("invalid-toast")


export function openTab(event, tabName) {
    Array.from(tabLinks).forEach(tabLink => tabLink.classList.remove("active-link"));

    Array.from(tabContents).forEach(tabContent => tabContent.classList.remove("active-tab"));

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
};

window.openTab = openTab;

const sideMenu = document.getElementById("side-menu");

export const openMenu = () => {
    sideMenu.style.right = "0";
}
window.openMenu = openMenu;

export const closeMenu = () => {
    sideMenu.style.right = "-200px";
}

window.closeMenu = closeMenu;


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const emailData = {
        from: "Acme <onboarding@resend.dev>",
        to: ["davidguzman1500@gmail.com"],
        subject: formData.get('name'),
        html: `${formData.get('message')}, te escribo del correo ${formData.get('email')}`,
    };

    fetch(import.meta.env.VITE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Email sent successfully!')
                form.reset();
                alert("Message sent successfully")
            } else {
                console.log('Failed to send email:', data.error);
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
});