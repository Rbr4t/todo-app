let i = 0;
export default function populate(obj){
    const todo = document.querySelector('.todo');
    console.log(i)
    // card
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('id', i)
    i += 1;
    
    const h1 = document.createElement('h1');
    h1.textContent = obj.title;
    const p = document.createElement('p');
    p.textContent = obj.description;
    const h4 = document.createElement('h4');
    h4.textContent = obj.dueDate;
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