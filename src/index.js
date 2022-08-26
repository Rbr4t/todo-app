import './style.css';
import loadHome from './homepage.js'
import populate from './populateTask.js'
import loadPopups from './loadPopups.js'
import {validateTask, validateProject, alreadyTaken} from './formvalidation.js'
import {storeData, loadData, loadActiveProject} from './storeData.js'

// checking if document is loaded in.
let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      projectManager.load(loadData())
      projectManager.loadProjects();
    }
  }, 100);

// loads homepage and popups
loadPopups();
loadHome();

function Board(title){
    this.title = title;
    this.board = [];
    
    this.addToBoard = function(title, description, dueDate=null, priority) {
        // console.log([title, description, dueDate, priority])
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
        e.target.parentElement.parentElement.remove();
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
    
    const load = (data) => {
        const keys = Object.keys(data);
        // console.log(keys)
        projects = []

        for(let j=0; j<keys.length; j++) {
            // console.log(j)
            const obj = new Board(keys[j]);
            // console.log(data[obj.title])
            for(let objectData of data[obj.title]){
                obj.addToBoard(objectData.title, objectData.description, objectData.dueDate, objectData.priority)
            }
            projects.push(obj)
        };
        activeProject = loadActiveProject();
        // console.log(projects);
    }
    const loadToTheSelection = (DataObj, selected) => {
        console.log(projects)
        const list = document.querySelector('#options');
        document.querySelector('#options').innerHTML = ``;
        // console.log(DataObj)
        projects.forEach(p => {
            console.log("HERE")
            const newSelection = document.createElement('option');
            newSelection.value = p.title;
            newSelection.textContent = p.title;
            list.appendChild(newSelection);
        })
        list.value = selected;
    }

    const save = () => {
        storeData(activeProject, projects)
    }
    const isIn = (X) => {
        return projects.filter(obj => obj.title === X).length < 1? false: true;
    }
    const resetAll = () => {
        projects = [];
        activeProject = projects[0];
    }
    const createProject = (title) => {
        const project = new Board(title);
        projects.push(project);
        confirm('new project added')
    }

    // Loading individual project
    const loadProject = (e) => {
        activeProject.removeAll()
        for(let i= 0; i< projects.length; i++){
            if(e.target.value === projects[i].title){
                activeProject = projects[i];
            }
        }
        
        activeProject.board.forEach(obj => projectManager.activeProject.showOnBoard(obj));  
    }

    // For loading the projects to the selection bar
    const loadProjects = () => {
        for(let i= 0; i< projects.length; i++){
            if(activeProject=== projects[i].title){
                activeProject = projects[i];
                // console.log(activeProject.title)
            }
        }
        loadToTheSelection(projects, activeProject.title);
        activeProject.board.forEach(obj => activeProject.showOnBoard(obj))

    }
    return {
        createProject, 
        get activeProject(){return activeProject}, 
        isIn,
        loadProject,
        resetAll,
        save,
        load,
        loadProjects,
        loadToTheSelection
    }
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
    projectManager.save();
}); 

// clear all
const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click', () => {
    localStorage.clear();
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

    if (projectManager.isIn(formDataObj.projecttitle)){
        alreadyTaken()
    } else {
        if (formDataObj.projecttitle !== ''){
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
    }
    projectManager.save();
    
})

// choosing a project
const projects = document.querySelector('#options');
projects.addEventListener('change',(e) => {
    projectManager.loadProject(e);
    
})