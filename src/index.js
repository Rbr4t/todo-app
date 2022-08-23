import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'

// Board.addBoard('Task1', 'Do smh');
// console.log(Board.board)
// Board.addBoard('Task2', 'Don\'t do smh', "yeah");
// console.log(Board.board)

// Board.board.forEach(x => populate(x.title, x.description, x.dueDate))


// loads homepage
loadHome()

const Board = (function(){
    let board = [];
    
    const addToBoard = (title, description, dueDate=null) =>{
        const newCard = new Card(title, description)
        board.push(newCard)
        populate(title, description, dueDate)
        addRemove()
    }
    const removeFromBoard = (index) => {
        console.log(board)
        board.splice(index, 1);
        const tasks = document.querySelectorAll('.remove');
        
        // Removes it's parent element, the card 
        tasks[index].parentElement.remove();
    };
    return { addToBoard, removeFromBoard}
})()

// every task has this class
function Card(title, description, dueDate, id){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
}



// Adds for every remove button a event listener
function addRemove(){
    const tasks = document.querySelectorAll('.remove');
    
    tasks.forEach((task, i) => {
        task.addEventListener('click', () => {
            Board.removeFromBoard(i);
        })
    })   
}

// add a task
const addTask = document.getElementById('addtask');
addTask.addEventListener('click', e => {
    Board.addToBoard('TEST', 'test', 'tomorrow')
    
    
    // now left to do is the form element which comes to the middle of screen
    // get the data needed from there
    // use the data do create a new task card
})