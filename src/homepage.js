import './style.css';
import Icon from './images/checkbox.png'
import Moon from './images/night-mode.png'
import Bin from './images/bin.png'

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

    const option = document.createElement('option');
    option.value = `Home`;
    option.textContent = `Home`;
    select.appendChild(option);
    
    
    buttons.appendChild(select);

    // add task
    const task = document.createElement('button');
    task.classList.add('addproject');
    task.textContent = "+";
    buttons.appendChild(task);

    // REMOVE ALL
    const clear = document.createElement('button');
    
    clear.classList.add('clear', 'icon')
    const bin = new Image();
    bin.src = Bin;
    bin.alt = 'clearAll';
    bin.classList.add('icon');
    clear.appendChild(bin);
    buttons.appendChild(clear);

    //adding them to the page
    navbar.appendChild(buttons);

    page.appendChild(navbar)


    
    // container for tasks
    const container = document.createElement('div');
    container.classList.add('container');
    const todo = document.createElement('div');
    todo.classList.add('todo');
    

    // add a new task adding card/button
    const button1 = document.createElement('button');
    button1.classList.add('task')
    button1.setAttribute('id', 'addtask')
    
    
    button1.textContent ='+'
    todo.appendChild(button1)
    container.appendChild(todo);
    page.appendChild(container);
};

