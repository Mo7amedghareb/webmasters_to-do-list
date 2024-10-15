let input =document.querySelector(".input"); 
let myid=0;
let add =document.querySelector(".add");
let tasks =document.querySelector(".tasks");
let arrayOfTasks=[]; // array that stores the tasks
let btnupdate=document.querySelector(".btnupdate");
// if local storage have items get these items
if(localStorage.getItem("tasks")){
    arrayOfTasks =JSON.parse(localStorage.getItem("tasks"));
}
getdataFromLocalStorage();  // draw this items in the page 



//add task button
add.onclick=function(){
    if(input.value != ""){
        if(myid<=arrayOfTasks.length){
            addTasksToArray(myid,input.value);
        }
        
        input.value=""; // after add the task i clear the input field
        window.alert("task was added successfuly");
        myid++;
    }
}


// events delete and update
tasks.addEventListener("click" ,(e)=>{
    
    //remove button
    if(e.target.classList.contains("del")){
        deletetask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
        window.alert("task removed");
    }

    //when click on task it will be completed
    if(e.target.classList.contains("task")){
        completedOrNot(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
    if(e.target.classList.contains("upd")){
        updatetask(e.target.parentElement.getAttribute("data-id"));
    }

    if(e.target.classList.contains("btnupdate")){
        btnupdatetask();
    }
})
let x=0;
function updatetask(taskid){
    for(let i=0 ;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id == taskid){
            x=arrayOfTasks[i];
            input.value=arrayOfTasks[i].title;
        }
    }
    addTasksToLocalStorage(arrayOfTasks);
    addElementsToTasksDiv(arrayOfTasks);
    
}


function btnupdatetask(){

    arrayOfTasks[x.id].title=input.value;
    addTasksToLocalStorage(arrayOfTasks);
    addElementsToTasksDiv(arrayOfTasks);
    input.value="";
}






// function that add tasks to array and to the local storage then draw it in the page
function addTasksToArray(id,taskText){
    const mytask={ // object that contains task data
        id : id,
        title : taskText,
        completed : false,
    };
    arrayOfTasks.push(mytask);
    addElementsToTasksDiv(arrayOfTasks);
    addTasksToLocalStorage(arrayOfTasks);
}



// add tasks to the empty div tasks in the page
function addElementsToTasksDiv(arrayOfTasks){
    tasks.innerHTML="";
    arrayOfTasks.forEach((element) => {
        let div=document.createElement("div") ;
        div.className="task";

        // if enter on the task
        if(element.completed){
            div.className="task done";
        }
        div.setAttribute("data-id",element.id); 
        div.appendChild(document.createTextNode(element.title));

        let update=document.createElement("button");
        update.className="upd";
        update.appendChild(document.createTextNode("update"));
        div.appendChild(update);

        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);

        
        tasks.appendChild(div);
    });
}






function addTasksToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}



function getdataFromLocalStorage(){
    let data =window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addElementsToTasksDiv(tasks);
    }
}


function deletetask(taskid){
    arrayOfTasks=arrayOfTasks.filter((element)=>element.id != taskid);
    addTasksToLocalStorage(arrayOfTasks);
}





//function that save the status of task if completed or not
function completedOrNot(taskid){
    for(let i=0 ;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id ==taskid){
            arrayOfTasks[i].completed ==false? (arrayOfTasks[i].completed=true) : (arrayOfTasks[i].completed=false);
            if(arrayOfTasks[i].completed==true){
                window.alert("task completed");
            }
        }
    }
    addTasksToLocalStorage(arrayOfTasks);
}


function deleteall(){
    tasks.innerHTML="";
    localStorage.clear();
    arrayOfTasks=[];
    window.alert("all tasks have been deleted");
}