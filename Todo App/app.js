// storing date object;
const date = new Date();
const showDate = date.toDateString();
const showTime = date.toLocaleTimeString();

// display date and time
const dateText = document.querySelector('.showDate .date');
const timeText = document.querySelector('.showDate .time');
dateText.textContent = `${showDate}`
timeText.textContent = `${showTime}`


// adding new list to the todo
const addForm = document.querySelector('.addForm');
const mainUl = document.querySelector('.mainUl');

// creating a reuseable todo template function 
const todoTemplate = (value) => {
    const html = `
        <li>
            <div class="text">${value}</div>
            <div class="allIcon">
                <i class="far fa-circle circle"></i>
                <i class="far fa-trash-alt delete"></i>
            </div>
        </li>
    `   
    mainUl.innerHTML += html;
}
 
var timer;
const textContainer = document.querySelector('.textContainer');

const successText = () => {
const text = 
    `
    <div class="textBox">
        <p class="textSuccess">Todo Successfully added</p>
        <i class="far fa-times-circle trash"></i>
    </div>
    `;
    timer =  setTimeout(() => {
        textContainer.innerHTML += text;
      }, 1000);   
}


// on submit, Add to-do
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const value = addForm.add.value.trim();
    if (value.length) {
        todoTemplate(value);
        addForm.reset();
        successText();
    }
})


textContainer.addEventListener('click', (e) => {
    const trashBtn = e.target.classList.contains('trash')
    if (trashBtn) {
        e.target.parentElement.remove();
    }
})

const circleIcon =  'fa-circle';
const trashIcon =  'fa-trash-alt';

mainUl.addEventListener('click', e => {
    const circleItem = e.target.classList.contains(circleIcon);
    const deleteItem = e.target.classList.contains(trashIcon);
 

    if (deleteItem) {
        e.target.parentElement.parentElement.remove();
    } else if (circleItem) {
       const circleElement = e.target;
       const todoText = e.target.parentElement.parentElement.firstElementChild;
        todoText.classList.toggle('lineThrough');
        circleElement.classList.toggle('iconColor');
    }
        
})



// filter function 
 const filterFunction = (term) => {
        Array.from(mainUl.children)
            .filter((liElement) =>  !liElement.firstElementChild.textContent.toLowerCase().includes(`${term}`))
            .forEach(element => {
                element.classList.add('filtered');
            });

        Array.from(mainUl.children)
            .filter((liElement) =>  liElement.firstElementChild.textContent.toLowerCase().includes(`${term}`))
            .forEach(element => {
                element.classList.remove('filtered');
            });
 }



// filter todo on search
const formSearch = document.querySelector('.formSearch input');
formSearch.addEventListener('keyup', () => {
    const term = formSearch.value.trim().toLowerCase();
    filterFunction(term)
})


window.addEventListener('load', (e) => {
    e.preventDefault();
    const mainload = document.querySelector('.mainload');
    
    setTimeout(() => {
        mainload.classList.add('show')
    }, 2500);

    const start = document.querySelector('.start');
    const addTask = document.querySelector('.addForm input');
    const cancelBtn = document.querySelector('.cancelBtn');
    start.addEventListener('click', () => {
        mainload.classList.remove('show')
        addTask.focus();
        addTask.scrollIntoView();
    })
    cancelBtn.addEventListener('click', () => {
        mainload.classList.remove('show')
    })
})
