import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'

// loads homepage
loadHome()

const Board = (function(){
    let board = [];
    let indexOld = null;

    const addToBoard = (title, description, dueDate=null) =>{
        const newCard = new Card(title, description)
        board.push(newCard)
        populate(title, description, dueDate)
        addRemove()
    }
    const removeFromBoard = (e, index) => {  
        
        console.log(board)
        // Removes it's parent element, the card 
        e.target.parentElement.remove();
    };
    return { addToBoard, removeFromBoard}
})()

// every task has this class
function Card(title, description, dueDate){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
}



// Adds for every remove button a event listener
function addRemove(){
    const task = document.querySelectorAll('.remove')[document.querySelectorAll('.remove').length -1];
    
    
        
    task.addEventListener('click', (e) => {
        // Board.removeFromBoard(e, i);
        let m = [];
        for(let t=0; t<document.querySelectorAll('.remove').length; t++){
            if(e.target.parentElement === document.querySelectorAll('.remove')[t].parentElement){
                Board.removeFromBoard(e, t);
            }   
        }
        
        console.log(e.target.parentElement)
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