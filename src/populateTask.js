import {format} from 'date-fns';
import Bin from './images/bin.png'

export default function populate(title, description, dueDate, priority, state){
    const todo = document.querySelector('.todo');
    // card
    const div = document.createElement('div');
    div.classList.add('task');
    if(priority==='low'){
        div.classList.add('low-priority')
    } else if(priority==='medium'){
        div.classList.add('medium-priority')
    } else {
        div.classList.add('high-priority')
    }
    
    const h1 = document.createElement('h1');
    h1.textContent = title;
    const p = document.createElement('p');
    p.textContent = description;
    const h4 = document.createElement('h4');
    
    try {
        h4.textContent = `${format(new Date(parseInt(dueDate.substr(0, 4)),parseInt(dueDate.substr(5, 2)),parseInt(dueDate.substr(8, 2))), 'EEEE')} ${dueDate.substr(8, 2)}.${dueDate.substr(5, 2)}.${dueDate.substr(0, 4)}` ;
    } catch(err) {
        
        h4.textContent = `no date`
             
    }
    
    const button = document.createElement('button');
    button.classList.add('remove');
    const img = new Image();
    img.src = Bin;
    img.alt = 'delete';
    button.appendChild(img)
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('done');

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(h4)
    div.appendChild(button)
    div.appendChild(input)

    if(state){
        div.classList.add('done');
    }

    todo.appendChild(div)
}