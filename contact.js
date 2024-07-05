const addBtn = document.querySelector("#add-btn");
const ul = document.querySelector(".list-group");
const searchInput = document.querySelector("#search");

addBtn.addEventListener("click", () => {
  location.href = "form.html";
});

let data = JSON.parse(localStorage.getItem("data")) || [];

const renderData = (filteredData = data) => {
  let innerHTML = "";
  filteredData.forEach((item) => {
    innerHTML += `<li class="list-group-item d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                      <span class="fw-bold">${item.name} ${item.surname}</span>
                      <span>${item.phone}</span>
                    </div>
                    <div class="d-flex gap-1">
                      <button class="btn btn-danger" onclick="deleteContact(${item.id})">Delete</button>
                      <button class="btn btn-success" onclick="editContact(${item.id})">Edit</button>
                    </div>
                  </li>`;
  });

  ul.innerHTML = innerHTML;
};

const deleteContact = (id) => {
  data = data.filter((item) => item.id !== id);
  localStorage.setItem("data", JSON.stringify(data));
  renderData();
};

const editContact = (id) => {
  const contact = data.find((item) => item.id === id);
  if (contact) {
    location.href = `form.html?id=${contact.id}&name=${contact.name}&surname=${contact.surname}&phone=${contact.phone}`;
  }
};

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.surname.toLowerCase().includes(searchTerm) ||
      item.phone.includes(searchTerm)
  );
  renderData(filteredData);
});

renderData();

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const surname = params.get("surname");
  const phone = params.get("phone");
  const id = params.get("id");

  if (name && surname && phone) {
    if (id) {
      // Editing existing contact
      const contactIndex = data.findIndex((item) => item.id === parseInt(id));
      data[contactIndex] = { id: parseInt(id), name, surname, phone };
    } else {
      // Adding new contact
      data.push({
        id: (data[data.length - 1]?.id || 0) + 1,
        name,
        surname,
        phone,
      });
    }

    window.history.pushState({}, document.title, window.location.pathname);

    localStorage.setItem("data", JSON.stringify(data));

    renderData();
  }
});
