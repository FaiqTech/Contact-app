const addBtn = document.querySelector("#add-btn");
const ul = document.querySelector(".list-group");

addBtn.addEventListener("click", (e) => {
  location.href = "form.html";
});

let data = JSON.parse(localStorage.getItem("data")) || [];
const renderData = () => {
  let innerHTML = "";
  data.forEach((item) => {
    innerHTML += `<li class="list-group-item d-flex align-items-center justify-content-between">
                                <div class="d-flex flex-column">
                                <span class="fw-bold">${item.name} ${item.surname}</span>
                                <span>${item.phone}</span>
                                  </div>
                                <div class="d-flex gap-1">
                                    <button class="btn btn-danger">Delete</button>
                                    <button class="btn btn-success">Edit</button>
                                </div>
                            </li>`;
  });

  ul.innerHTML = innerHTML;
};

renderData();

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const surname = params.get("surname");
  const phone = params.get("phone");

  if (name && surname && phone) {
    data.push({
      id: (data[data.length - 1]?.id || 0) + 1,
      name,
      surname,
      phone,
    });

    window.history.pushState({}, document.title, window.location.pathname);

    localStorage.setItem("data", JSON.stringify(data));

    renderData();
  }
});
