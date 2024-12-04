// MY ATTEMPT
// const input = document.querySelector("#item-input");
// const button = document.querySelector(".btn");
// const list = document.querySelector("ul");

// function addItem(e) {
//   e.preventDefault();

//   if (input.value === "") {
//     return;
//   }

//   const itemText = document.createTextNode(input.value);
//   const li = document.createElement("li");
//   list.appendChild(li);
//   const innerButton = document.createElement("button");
//   innerButton.className = "remove-item btn-link text-red";
//   const icon = document.createElement("i");
//   icon.className = "fa-solid fa-xmark";

//   innerButton.appendChild(icon);
//   li.appendChild(itemText);
//   li.appendChild(innerButton);

//   input.value = "";
// }

// button.addEventListener("click", addItem);

// Brad's workflow
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // validation
  if (newItem.value === "") {
    alert("Please add an item");
    return;
  }
  // Create list item
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  listItem.appendChild(button);
  itemList.appendChild(listItem);
  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Event listeners
itemForm.addEventListener("submit", addItem);
