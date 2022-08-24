import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'
import loadPopups from './loadPopups.js'

// loads homepage and popups
loadPopups();
loadHome();


const Board = (function(){
    let board = [];
    
    const addToBoard = (title, description, dueDate=null, priority) =>{
        const newCard = new Card(title, description)
        board.push(newCard)
        populate(title, description, dueDate, priority)
        addRemove()
        addDone()
    }

    const removeFromBoard = (e) => {  
        const tasks = document.querySelectorAll('.remove');

        
        for(let t=0; t<document.querySelectorAll('.remove').length; t++){
            if(e.target.parentElement === document.querySelectorAll('.remove')[t].parentElement){
                board.splice(t, 1)
            };   
        }
        // Removes it's parent element, the card 
        e.target.parentElement.remove();
    };

    const removeAll = () => {
        console.log('clearing all')
        board = [];
        while(document.querySelector('.todo').lastChild){
            if(document.querySelector('.todo').lastChild.id === 'addtask'){
                break
            }
            console.log(document.querySelector('.todo').lastChild.remove());
        }
    };

    const taskDone = (e) => {
        e.target.parentElement.classList.toggle('done');
    }

    return { addToBoard, removeFromBoard, taskDone, removeAll}
})()

// every task has this class
function Card(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

// Adds eventlisteners to checkboxes
function addDone(){
    const task = document.querySelectorAll('.done')[document.querySelectorAll('.done').length-1];
    task.addEventListener('click', Board.taskDone);
    
}


// Adds for every remove button a event listener
function addRemove(){
    
    const tasks = document.querySelectorAll('.remove');

    tasks.forEach((task) => {
        task.removeEventListener('click', Board.removeFromBoard);
    })
    tasks.forEach((task) => {
        task.addEventListener('click', Board.removeFromBoard);
    })
      
}


// close window
const close = document.querySelectorAll('.close')
close.forEach(c => c.addEventListener('click', function(){
    console.log()
    this.parentElement.style.display = 'none';
}));

// add new task
const addTask = document.getElementById('addtask');
addTask.addEventListener('click', e => {
    document.querySelector('.createtask').style.display = 'flex';
});


// send a new task
const btn =document.querySelector('.post');
btn.addEventListener('click', function(e){
    e.preventDefault()
    const formData = new FormData(document.querySelector('#task'))

    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value
    });
    console.log(formDataObj.prio)
    Board.addToBoard(formDataObj.title, formDataObj.text, formDataObj.date, formDataObj.prio);
    document.querySelector('.popup').style.display = 'none';
    e.target.parentElement.reset();
}); 

// clear all
const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click', () => {
    Board.removeAll();
    document.querySelector('#options').innerHTML = `<option value="Home">Home</option><option value="project1">Project1</option>`
})

// add a new project
const project = document.querySelector('.addproject');
project.addEventListener('click', e => {
    document.getElementById('newproject').style.display = 'flex';
});

// send a new project
const btnproject = document.querySelector('.add');
btnproject.addEventListener('click', (e) => {
    e.preventDefault();
    const list = document.querySelector('#options');
    
    const formData = new FormData(document.querySelector('#project'))

    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value
    });
    console.log(formDataObj)
    const newSelection = document.createElement('option');
    newSelection.value = formDataObj.projecttitle;
    newSelection.textContent = formDataObj.projecttitle;
    list.appendChild(newSelection);
    e.target.parentElement.reset();
    document.getElementById('newproject').style.display = 'none';
})
