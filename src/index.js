import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'
import loadPopups from './loadPopups.js'
import {validateTask, validateProject} from './formvalidation.js'


// loads homepage and popups
loadPopups();
loadHome();


function Board(title){
    this.title = title;
    this.board = [];
    
    this.addToBoard = function(title, description, dueDate=null, priority) {
        const newCard = new Card(title, description, dueDate, priority)
        this.board.push(newCard)
    }
    this.showOnBoard = function(obj){
        populate(obj.title, obj.description, obj.dueDate, obj.priority)
        addRemove()
        addDone()
    }
        
    this.removeFromBoard = function (e){
        for(let t=0; t<document.querySelectorAll('.remove').length; t++){
            if(e.target.parentElement === document.querySelectorAll('.remove')[t].parentElement){
                projectManager.activeProject.board.splice(t, 1)
            };   
        }
        // Removes it's parent element, the card 
        e.target.parentElement.remove();
    };

    this.removeAll = function() {
        while(document.querySelector('.todo').lastChild){
            if(document.querySelector('.todo').lastChild.id === 'addtask'){
                break;
            } else {
                document.querySelector('.todo').lastChild.remove()
            }
        }
    };

    this.taskDone = function (e)  {
        e.target.parentElement.classList.toggle('done');
    }

}

// every task has this class
function Card(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}


const projectManager = (function(){
    
    let projects = [new Board('Home')];
    let activeProject = projects[0];

    const resetAll = () => {
        projects = [new Board('Home')];
        activeProject = projects[0];
    }
    const createProject = (title) => {
        const project = new Board(title);
        projects.push(project);
        confirm('new project added')
    }

    const loadProject = (e) => {
        activeProject.removeAll()
        for(let i= 0; i< projects.length; i++){
            if(e.target.value === projects[i].title){
                activeProject = projects[i];
            }
        }
        activeProject.board.forEach(obj => projectManager.activeProject.showOnBoard(obj))  
    }
    return {createProject, 
        get activeProject(){return activeProject}, 
        loadProject,
        resetAll}
})();

// Adds eventlisteners to checkboxes
function addDone(){
    const task = document.querySelectorAll('.done')[document.querySelectorAll('.done').length-1];
    task.addEventListener('click', Object(projectManager.activeProject).taskDone);
    
}

// Adds for every remove button a event listener
function addRemove(){
    
    const tasks = document.querySelectorAll('.remove');

    tasks.forEach((task) => {
        task.removeEventListener('click', Object(projectManager.activeProject).removeFromBoard);
    })
    tasks.forEach((task) => {
        task.addEventListener('click', Object(projectManager.activeProject).removeFromBoard);
    })
      
}


// close window
const close = document.querySelectorAll('.close')
close.forEach(c => c.addEventListener('click', function(){
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

    if(formDataObj.title !== ''){
        projectManager.activeProject.addToBoard(formDataObj.title, formDataObj.description, formDataObj.dueDate, formDataObj.priority);
        projectManager.activeProject.showOnBoard(formDataObj);
        document.querySelector('.popup').style.display = 'none';
        e.target.parentElement.reset();
    } else {
        validateTask()
    }
    
}); 

// clear all
const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click', () => {
    projectManager.activeProject.removeAll();
    projectManager.activeProject.board = [];
    projectManager.resetAll();    
    document.querySelector('#options').innerHTML = `<option value="Home">Home</option>`
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

    if (formDataObj.title !== ''){
        const newSelection = document.createElement('option');
        newSelection.value = formDataObj.projecttitle;
        newSelection.textContent = formDataObj.projecttitle;
        list.appendChild(newSelection);
        e.target.parentElement.reset();
        document.getElementById('newproject').style.display = 'none';
        
        projectManager.createProject(formDataObj.projecttitle);
    } else{
        validateProject()
    }
    
})

// choosing a project
const projects = document.querySelector('#options');
projects.addEventListener('change',(e) => {
    projectManager.loadProject(e)
})