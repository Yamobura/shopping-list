const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));

    chechUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //input validation
    if (newItem === '') {
        alert('The input is empty');
        return;
    }

    //check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checIfItemExists(newItem)) {
            alert('That item already exists!');
            return;
        }
    }

    //create item DOM element
    addItemToDOM(newItem);

    //add item to local storage
    addItemToStorage(newItem);

    chechUI();

    itemInput.value = '';
}

function addItemToDOM(item){
        //create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
    
        const button = createButton('remove-item btn-link text-re');
        li.appendChild(button);
    
        //add li to DOM
        itemList.appendChild(li);

}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    //add new item to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createButton(classes)
{
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes)
{
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"> </i> update item'
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
}

function removeItem(item) {

    if (confirm('Are you sure')) {
       //remove item from DOM
        item.remove();

        //remove item from storage
        removeItemFromStorage(item.textContent);

        chechUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i != item);

    // re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems()
{
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from local storage
    localStorage.removeItem('items');

    chechUI();
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

}

function chechUI() 
{
    itemInput.value = "";
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class = "fa-solid fa-plus"> </i> Add item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

}

//initialize app
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearButton.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    chechUI();
}

init();