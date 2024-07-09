const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('fiter');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //input validation
    if (newItem === '') {
        alert('The input is empty');
        return;
    }

    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-re');
    li.appendChild(button);

    //add li to DOM
    itemList.appendChild(li);
    chechUI();
    itemInput.value = '';
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            chechUI();
        }
    }
}

function clearItems()
{
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    chechUI();
}

function chechUI()
{
    const items = itemList.querySelectorAll();
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);

chechUI();
