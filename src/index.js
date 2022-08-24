import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'

// loads homepage
loadHome()

const Board = (function(){
    let board = [];
    let indexOld = null;

    const addToBoard = (title, description, dueDate=null, priority=2) =>{
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
        console.log(board)
        // Removes it's parent element, the card 
        e.target.parentElement.remove();
    };

    const taskDone = (e) => {
        e.target.parentElement.classList.toggle('done');
    }
    return { addToBoard, removeFromBoard, taskDone}
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

// add a task
const addTask = document.getElementById('addtask');
addTask.addEventListener('click', e => {
    Board.addToBoard('TEST', String(Math.random()), 'tomorrow')
    
    
    // now left to do is the form element which comes to the middle of screen
    // get the data needed from there
    // use the data do create a new task card
})