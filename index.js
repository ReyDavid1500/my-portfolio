const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");
const userInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const form = document.querySelector("form");
const invalidMsgName = document.getElementById("invalid-toast-name");
const invalidMsgEmail = document.getElementById("invalid-toast-email");
const invalidMsgMessage = document.getElementById("invalid-toast-message");
const loader = document.querySelector(".loader");
const snackbar = document.querySelector(".snackbar");

export function openTab(event, tabName) {
  Array.from(tabLinks).forEach((tabLink) =>
    tabLink.classList.remove("active-link")
  );

  Array.from(tabContents).forEach((tabContent) =>
    tabContent.classList.remove("active-tab")
  );

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

window.openTab = openTab;

const sideMenu = document.getElementById("side-menu");

export const openMenu = () => {
  sideMenu.style.right = "0";
};
window.openMenu = openMenu;

export const closeMenu = () => {
  sideMenu.style.right = "-200px";
};

window.closeMenu = closeMenu;

function validateEmail(emailValue) {
  let value = /\S+@\S+\.\S+/;
  return value.test(emailValue);
}

function displayLoader() {
  form.style.visibility = "hidden";
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
  form.style.visibility = "visible";
}

const snackbarMessage = document.createElement("p");

function showSnackbar(message) {
  snackbarMessage.innerText = message;
  snackbar.appendChild(snackbarMessage);
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 5000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (userInput.value.length < 2) {
    invalidMsgName.classList.add("active");
  } else {
    invalidMsgName.classList.remove("active");
  }

  if (!validateEmail(emailInput.value)) {
    invalidMsgEmail.classList.add("active");
  } else {
    invalidMsgEmail.classList.remove("active");
  }

  if (messageInput.value.length < 30) {
    invalidMsgMessage.classList.add("active");
  } else {
    invalidMsgMessage.classList.remove("active");
  }

  const errorMessages = document.querySelectorAll(".toast-msg");
  let hasError = false;
  Array.from(errorMessages).forEach((errorMessage) => {
    if (errorMessage.classList.contains("active")) hasError = true;
  });

  if (hasError) {
    return;
  } else {
    const formData = new FormData(form);
    const emailData = {
      from: "Acme <onboarding@resend.dev>",
      to: ["davidguzman1500@gmail.com"],
      subject: formData.get("name"),
      html: `${formData.get("message")}, te escribo del correo ${formData.get(
        "email"
      )}`,
    };
    displayLoader();
    fetch(import.meta.env.VITE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          hideLoader();
          form.reset();
          showSnackbar("Message sent successfully!");
        } else {
          console.log("Failed to send email:", data.error);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
});

userInput.addEventListener("change", function (event) {
  console.log(event.target.value.length);
  if (event.target.value.length > 2) {
    invalidMsgName.classList.remove("active");
  }
});
messageInput.addEventListener("change", function (event) {
  console.log(event.target.value.length);
  if (event.target.value.length > 30) {
    invalidMsgMessage.classList.remove("active");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add("show-scroll")
    } else {
      entry.target.classList.remove("show-scroll")
    }
  })
})

const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach(el => observer.observe(el))

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  spaceBetween: 30,
  direction: "horizontal",
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
})