export default function populate(title, description, dueDate, priority){
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
    h4.textContent = dueDate;
    const button = document.createElement('button');
    button.classList.add('remove');
    button.textContent = 'remove';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('done');

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(h4)
    div.appendChild(button)
    div.appendChild(input)

    todo.appendChild(div)
}