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

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // validation

  if (itemInput.value === "") {
    alert("Please add an item");
    return;
  }
  // Create list item
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  listItem.appendChild(button);
  itemList.appendChild(listItem);

  isListEmpty(); // calling this from end of page to check now if list is empty.
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  isListEmpty();
}

function removeAllItems(e) {
  let items = document.querySelectorAll("#item-list li");
  items.forEach((item) => {
    item.remove();
  });
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

isListEmpty();

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", removeAllItems);
itemFilter.addEventListener("input", filterItems);
