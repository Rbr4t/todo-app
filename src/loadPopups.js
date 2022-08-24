import './style.css';

export default function loadPopups(){
    const page =document.querySelector('#content');
    page.innerHTML =  page.innerHTML += `<div class="popup createtask">
    <button class="close">X</button>
    <form id="task">
        <div class="data">
            
            <label for="title" class="right">Enter text</label>
            <input type="text" name="text" id="text" required="">
            <label for="date" class="right">Due</label>
            <input type="datetime-local" name="date" id="date" required="">
            <label for="prio" class="right">Priority</label>
            <select name="prio" id="prio">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option selected="" value="low">low</option>
            </select>
        </div>
        <button class="post">Post</button>
     </form>
    </div>
    <div class="popup createproject" id="newproject" style="display: none;">
            <button class="close">X</button>
            <form id="project">
                <label for="titleproject" class="right">Project title</label>
                <input type="text" name="projecttitle" id="titleproject" required="">
                <button class="add">Add</button>
            </form>
        </div>
    `
};