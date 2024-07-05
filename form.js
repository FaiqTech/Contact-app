const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  location.href = `contact.html?name=${name.value}&surname=${surname.value}&phone=${phone.value}`;
});
