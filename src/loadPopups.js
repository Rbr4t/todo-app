import './style.css';

export default function loadPopups(){
    const page =document.querySelector('#content');
    page.innerHTML =  page.innerHTML += `<div class="popup createtask">
    <button class="close">X</button>
    <form id="task">
        <div class="data">
            <label for="title1" class="right">Enter title</label>
            <input type="text" name="title" id="title1" required minlength="1" maxlength="15">
            <label for="description" class="right" >Enter text</label>
            <input type="text" name="description" id="description" maxlength="249">
            <label for="dueDate" class="right">Due</label>
            <input type="date" name="dueDate" id="dueDate">
            <label for="priority" class="right">Priority</label>
            <select name="priority" id="priority">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option selected="" value="low">low</option>
            </select>
        </div>
        <button type="submit" class="post">Post</button>
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