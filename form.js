const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const nameParam = params.get("name");
  const surnameParam = params.get("surname");
  const phoneParam = params.get("phone");

  if (id && nameParam && surnameParam && phoneParam) {
    name.value = nameParam;
    surname.value = surnameParam;
    phone.value = phoneParam;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (id) {
    location.href = `contact.html?id=${id}&name=${name.value}&surname=${surname.value}&phone=${phone.value}`;
  } else {
    location.href = `contact.html?name=${name.value}&surname=${surname.value}&phone=${phone.value}`;
  }
});
