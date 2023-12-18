const API_URL = "https://portfolio-server-kappa-three.vercel.app/"

const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");
const openTab = (event, tabName) => {
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

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = new FormData(form);
    const emailData = {
        from: "Acme <onboarding@resend.dev>",
        to: ["davidguzman1500@gmail.com"],
        subject: formData.get('name'),
        html: `${formData.get('message')}, te escribo del correo ${formData.get('email')}`,
    };

    console.log(emailData)

    // Send form data to the server
    fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
        .then(response => response.json())
        .then(data => {
            // Process the response from the server
            if (data.success) {
                // Email sent successfully
                console.log('Email sent successfully!')
                form.reset();
                alert("Message sent successfully")
                // Perform any additional actions or show a success message to the user
            } else {
                // Email sending failed
                console.log('Failed to send email:', data.error);
                // Handle the error or show an error message to the user
            }
        })
        .catch(error => {
            // Handle any network or server errors
            console.error('An error occurred:', error);
            // Show an error message to the user
        });
});

// try {
//     form.addEventListener("submit", e => {
//         e.preventDefault();
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const message = document.getElementById("message").value;

//         const data = {
//             name: name,
//             email: email,
//             message: message,
//         };

//         fetch(API_URL, {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });
//         form.reset();
//         alert("Message sent...")
//     })
// } catch (error) {
//     console.log(error);
// }

