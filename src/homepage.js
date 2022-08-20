import './style.css';
import Icon from './checkbox.png'
import Moon from './night-mode.png'

export default function loadHome(){
    const page = document.querySelector('#content');

    // navbar
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');

    // logo and name
    const logo = document.createElement('div');
    logo.classList.add('logo');
    const icon = new Image();
    icon.src = Icon;
    icon.alt = "logo";
    icon.classList.add('icon')
    logo.appendChild(icon);
    const header = document.createElement('h2');
    header.textContent = 'TODO APP';
    logo.appendChild(header);
    
    //adding them to the page
    navbar.appendChild(logo);
    
    // buttons section
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    // label and select element
    
    const select = document.createElement('select');
    select.name = 'projects';
    select.id = 'options';

    for(let i=0; i<2; i++){
        const option = document.createElement('option');
        option.value = `project${i}`;
        option.textContent = `Project${i}`;
        select.appendChild(option);
    };
    const option = document.createElement('option');
    option.value = 'add';
    option.textContent = 'new project';
    select.appendChild(option);
    buttons.appendChild(select);

    // add task
    const task = document.createElement('button');
    task.classList.add('addtask');
    task.textContent = "+";
    buttons.appendChild(task);

    // dark mode switch
    const button = document.createElement('button');
    const moon = new Image();
    moon.src = Moon;
    moon.alt = "darkmode";
    moon.classList.add('icon');
    button.appendChild(moon);
    buttons.appendChild(button);

    //adding them to the page
    navbar.appendChild(buttons);

    page.appendChild(navbar)


    
    // container for tasks
    const container = document.createElement('div');
    container.classList.add('container');
    const todo = document.createElement('div');
    todo.classList.add('todo');
    container.appendChild(todo);
    page.appendChild(container);


};

