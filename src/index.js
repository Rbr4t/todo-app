import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'
import loadPopups from './loadPopups.js'

// loads homepage and popups
loadPopups();
loadHome();


function Board(title){
    this.title = title;
    this.board = [];
    
    this.addToBoard = function(title, description, dueDate=null, priority) {
        // console.log([title, description, dueDate, priority])
        console.log('adding to board')
        console.log(description)
        
        console.log(projectManager.activeProject.board)
        const newCard = new Card(title, description, dueDate, priority)
        this.board.push(newCard)
        console.log(this.board)
    }
    this.showOnBoard = function(obj){
        console.log(this.board)
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
        console.log(this.board)
        while(document.querySelector('.todo').lastChild){
            // console.log("deleting")
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

// const projectManager = (function(){
    
//     let projects = [new Board('Home'), new Board('project1')];
//     let activeProject;
//     init()
//     function init(i){
//         activeProject = projects[i];
//     }

//     const createProject = (title) => {
//         const project = new Board(title);
//         console.log(projects)
//         projects.push(project);
//         confirm('project added')
//     }

//     function loadProject(e){
//         console.log('loading project')
//         let i= 0
//         while(e.target.value !== projects[i].title){
//             i++;
//         }
//         init(i)
//         console.log('In projectManager object')
//         console.log(activeProject)
//         activeProject.removeAll()
//     }
    
//     return {createProject, 
            
//             loadProject,

//             activeProject
//         }
// })();

const projectManager = (function(){
    
    let projects = [new Board('Home'), new Board('project1')];
    let activeProject = projects[0];

    const resetAll = () => {
        projects = [new Board('Home'), new Board('project1')];
        activeProject = projects[0];
    }
    const createProject = (title) => {
        const project = new Board(title);
        projects.push(project);
        confirm('project added')
    }

    const loadProject = (e) => {
        projectManager.activeProject.removeAll()
        console.log('loading project')
        for(let i= 0; i< projects.length; i++){
            if(e.target.value === projects[i].title){
                projectManager.activeProject = projects[i];
            }
        }
        projectManager.activeProject.board.forEach(obj => projectManager.activeProject.showOnBoard(obj))
        console.log('In projectManager object')
        // console.log(projectManager.activeProject)
        
    }
    return {createProject, activeProject, loadProject, resetAll}
})();
// console.log(Object(projectManager.activeProject).test())

// Adds eventlisteners to checkboxes
function addDone(){
    const task = document.querySelectorAll('.done')[document.querySelectorAll('.done').length-1];
    task.addEventListener('click', Object(projectManager.activeProject).taskDone);
    
}


// Adds for every remove button a event listener
function addRemove(){
    
    const tasks = document.querySelectorAll('.remove');

    tasks.forEach((task) => {
        console.log(projectManager.activeProject.board)
        task.removeEventListener('click', Object(projectManager.activeProject).removeFromBoard);
    })
    tasks.forEach((task) => {
        task.addEventListener('click', Object(projectManager.activeProject).removeFromBoard);
    })
      
}


// close window
const close = document.querySelectorAll('.close')
close.forEach(c => c.addEventListener('click', function(){
    // console.log()
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
        console.log((value, key))
        formDataObj[key] = value
    });
    console.log([formDataObj])
    projectManager.activeProject.addToBoard(formDataObj.title, formDataObj.description, formDataObj.dueDate, formDataObj.priority);
    projectManager.activeProject.showOnBoard(formDataObj);
    document.querySelector('.popup').style.display = 'none';
    e.target.parentElement.reset();
}); 

// clear all
const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click', () => {
    Object(projectManager.activeProject).removeAll();
    Object(projectManager.activeProject).board = [];
    projectManager.resetAll();
    
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
        console.log((value, key))
        formDataObj[key] = value
    });
    // console.log(formDataObj)
    const newSelection = document.createElement('option');
    newSelection.value = formDataObj.projecttitle;
    newSelection.textContent = formDataObj.projecttitle;
    list.appendChild(newSelection);
    e.target.parentElement.reset();
    document.getElementById('newproject').style.display = 'none';
    
    projectManager.createProject(formDataObj.projecttitle);
})

// choosing a project
const projects = document.querySelector('#options');
projects.addEventListener('change',(e) => {
    projectManager.loadProject(e)
    console.log('in eventlistener');
    console.log(projectManager.activeProject)
})