function storeData(activeProject, allProjects){
    
    localStorage.setItem('activeProject', activeProject.title);
    let projects = {};

    allProjects.forEach(project => {
        projects[project.title] =  project.board;
    });

    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadData(){
    const retrievedObject = localStorage.getItem('projects');

    return JSON.parse(retrievedObject);
}

function loadActiveProject(){
    const retrievedObject = localStorage.getItem('activeProject');
    console.log(retrievedObject)
    return retrievedObject;
}
export {storeData, loadData, loadActiveProject}