import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'

loadHome()
/*
    1. We need a factory module for the board
    2. We need a class for task card

*/ 
const Board = (function(){
    let board = [];

    const addBoard = (title, description, dueDate=null) =>{
        const newCard = new Card(title, description, dueDate)
        board.push(newCard)
        console.log(newCard)
    }
    const removeBoard = (index) => {
        board.splice(index, 1)
        removeTask[index].parentNode.remove()
    };
    return {board, addBoard, removeBoard}
})()

function Card(title, description, dueDate){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;

    this.say = () => console.log(title);
}


Board.addBoard('Task1', 'Do smh');
console.log(Board.board)
Board.addBoard('Task2', 'Don\'t do smh', "yeah");
console.log(Board.board)

Board.board.forEach(x => populate(x))

// remove a task
const removeTask = document.querySelectorAll('.remove');
console.log(removeTask)
removeTask.forEach((task, index) => {
    task.addEventListener('click', e=> {
        Board.removeBoard(index)
        console.log(index)
        
    })
})