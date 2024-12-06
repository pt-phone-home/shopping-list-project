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
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  isListEmpty();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // validation

  if (itemInput.value === "") {
    alert("Please add an item");
    return;
  }

  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);

  isListEmpty(); // calling this from end of page to check now if list is empty.
  itemInput.value = "";
}

function addItemToLocalStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);
  // convert to JSON STRING and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function addItemToDOM(item) {
  // Create list item
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  listItem.appendChild(button);
  itemList.appendChild(listItem);
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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item, e) {
  if (confirm("Are you sure?")) {
    // remove from DOM
    item.remove();
    // remove from storage
    removeItemFromLocalStorage(item.textContent);
    // recheck list
    isListEmpty();
  }
}

function removeItemFromLocalStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  let itemToDelete = itemsFromStorage.indexOf(item);

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => {
    return i !== item;
  });

  // reset to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function removeAllItems(e) {
  let items = document.querySelectorAll("#item-list li");
  items.forEach((item) => {
    item.remove();
  });
  localStorage.removeItem("items");
  isListEmpty();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function isListEmpty() {
  if (!itemList.firstElementChild) {
    clearButton.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialise Application
function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", removeAllItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  isListEmpty();
}

init();

// Event listeners

// localStorage.setItem("name", "Peter");
// sessionStorage.setItem("age", "30");
// console.log(localStorage.getItem("name"));
// localStorage.removeItem("name");
// sessionStorage.clear();
