
toggleCheck = (btn) => {
  btn.addEventListener("click", () => {
    let parent = btn.parentElement;
    let foodItem = parent.children[1];
    if (btn.className.includes("grey-txt")) {
      btn.classList.remove("grey-txt");
      foodItem.classList.remove("grey-txt");
      foodItem.children[0].classList.add("invisible");
    } else {
      btn.classList.add("grey-txt");
      foodItem.classList.add("grey-txt");
      foodItem.children[0].classList.remove("invisible");
    }
  });
};

onDelete = (btn) => {
  btn.addEventListener("click", () => {
    let parent = btn.parentElement;
    parent.remove();
  });
};

addToList = (item) => {
  item.addEventListener("click", () => {
    let foodItems = document.getElementById("food-items");
    let foodItem = document.createElement("div");
    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-circle-check", "btn");
    toggleCheck(checkIcon);
    let delIcon = document.createElement("i");
    delIcon.classList.add("fa-solid", "fa-x", "btn");
    onDelete(delIcon);
    let cross = document.createElement("span");
    cross.classList.add("cross", "invisible");
    item.appendChild(cross);
    foodItem.classList.add("food-item");

    foodItems.appendChild(foodItem);
    foodItem.appendChild(checkIcon);
    foodItem.appendChild(item);
    foodItem.appendChild(delIcon);
  });
};

getSuggestions = ( foodItem) => {
     let foodSuggestions;
     fetch(`https://api.frontendeval.com/fake/food/${foodItem}`)
       .then((response) => response.json())
       .then((data) => {
         foodSuggestions = data;
         let suggestionBox = document.getElementById("suggestion-box");
         suggestionBox.innerHTML = "";
         foodSuggestions.forEach((suggestion) => {
           let item = document.createElement("p");
           addToList(item);
           item.innerHTML = suggestion;
           suggestionBox.appendChild(item);
         });
       });
}


searchItem = async (event) => {
  let foodItem = event.target.value;
  if (foodItem.length > 1) {
     getSuggestions(foodItem)
  }
  let suggestionBox = document.getElementById("suggestion-box");
  suggestionBox.innerHTML = "";
};

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}

document.getElementById("searchbar").addEventListener("input", e => debounce(searchItem(e), 500))
