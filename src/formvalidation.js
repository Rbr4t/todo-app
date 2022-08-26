const add = 0;

function validateTask(){
    
    const title = document.getElementById("title1");
    
    title.setCustomValidity("No value");
    title.reportValidity();
        
    
};

function validateProject(){
    const title = document.getElementById("titleproject");
    
    title.setCustomValidity("No title");
    title.reportValidity();
}

function alreadyTaken(){
    const title = document.getElementById("titleproject");
    
    title.setCustomValidity("Project with the same name already exists");
    title.reportValidity();
}

export {validateTask, validateProject, alreadyTaken}