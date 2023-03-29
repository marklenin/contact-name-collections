let str = "new changes";
let name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let image = document.querySelector("#image");
let btn = document.querySelector("#btn");
let container = document.querySelector("#container");
let ul = document.querySelector("#ul");

function loop() {
  let data = JSON.parse(localStorage.getItem("task-data"));

  // console.log(data);
  container.innerHTML = "";

  let count = 0;

  data.forEach((elem, index) => {
    container.innerHTML += `<div class="cardcard">
    <div class="card-img">
    <img src="${elem.image}" alt="${elem.name}  id="container-img"
    object-fit='cover';
    >
    </div>
    <div class="card-text">
    <div class="card-name"> ${elem.name}</div>
    <div class="card-name">${elem.phone}</div>
    </div>
    <button id="btnDel" onclick="bigDelete(${index})" class="btn btn-danger">delete</button>
      <button onclick="edit(${index})" class="btn btn-primary">edit</button></div>
    `;
  });
}

btn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!name.value.trim() || !phone.value.trim() || !image.value.trim()) {
    // check the input content
    alert("fill all inputs && third input is for images(url link)...)");
    return;
  }

  let obj = { name: name.value, phone: phone.value, image: image.value };
  let data = JSON.parse(localStorage.getItem("task-data")) || [];
  data.push(obj);
  localStorage.setItem("task-data", JSON.stringify(data));
  name.value = "";
  phone.value = "";
  image.value = "";

  loop();
});

//?Delete

function bigDelete(index) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(index, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  loop();
}
// console.log(bigDelete());

let modal = document.querySelector(".modal-modal");
let btnEdit = document.querySelector(".modal_body button");
let closeModal = document.querySelector("#modalSave");
let btnSave = document.querySelector("#btnSave");
let modalName = document.querySelector("#mname");
let modalNum = document.querySelector("#num");
let modalUrl = document.querySelector("#url");

function edit(index) {
  modal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));

  modalName.value = data[index].name;
  modalName.setAttribute("id", index);

  modalNum.value = data[index].phone;
  modalNum.setAttribute("id", index);

  modalUrl.value = data[index].image;
  modalUrl.setAttribute("id", index);

  // console.log(data[index].name);
  // console.log(data[index].phone);
  // console.log(data[index].image);
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
// document.addEventListener("click", () => {
//   modal.style.display = "none";
// });

btnSave.addEventListener("click", () => {
  let nid = modalName.nid;
  let numid = modalNum.numid;
  let url = modalUrl.url;
  let data = JSON.parse(localStorage.getItem("task-data"));
  let newObj = {
    name: modalName.value,
    phone: modalNum.value,
    image: modalUrl.value,
  };
  data.splice(nid, 1, newObj);
  data.splice(numid, 1, newObj);
  data.splice(url, 1, newObj);
  localStorage.setItem("task-data", JSON.stringify(data));
  modal.style.display = "none";
  loop();
});

let reset = document.querySelector("#reset");

reset.addEventListener("click", () => {
  name.value = "";
  phone.value = "";
  image.value = "";
});

console.log(reset);
