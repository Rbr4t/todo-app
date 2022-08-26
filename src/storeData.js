function storeData(activeProject, allProjects){
    localStorage.setItem('activeProject', activeProject.title);
    let projects = {}
    allProjects.forEach(project => {
        projects[project.title] =  project.board
    });
    console.log(projects)
    localStorage.setItem('projects', JSON.stringify(projects))
    
}

function loadData(){
    const retrievedObject = localStorage.getItem('projects');

    return JSON.parse(retrievedObject);
}

export {storeData, loadData}