import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'

loadHome()
// populate("test", 'test test test', '1,1,1')
/*
    1. We need a factory module for the board
    2. We need a class for task card

*/ 
const Board = (function(){
    let board = [];

    const addBoard = (title, description, dueDate=null) =>{
        const newCard = new Card(title, description, dueDate)
        board.push(newCard)
    }
    return {board, addBoard}
})()
function Card(title, description, dueDate){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate

    this.say = () => console.log(title);
}



Board.addBoard('test1', 'tets');
console.log(Board.board)
Board.addBoard('test3', 'tets', "yeah");
console.log(Board.board)

Board.board.forEach(x => populate(x))