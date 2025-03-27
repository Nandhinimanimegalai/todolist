function updateDate(){
    let today=new Date();
    let options={weekday:'short',day:'numeric',month:'long',year:'numeric'};
    let formatedDate=today.toLocaleDateString('en-Us',options);
    document.getElementById("currentDate").textContent=`Today ${formatedDate}`;
}
updateDate();
document.querySelector(".new-task").addEventListener("click",function(){
    document.getElementById("taskform").style.display="flex";
    let category=prompt("Enter the type of task(Home/Work/Personal/diet)").toLowerCase();
    if (taskCategories.hasOwnProperty(category)) {
        addEventTask(category); // Call the function with the selected category
    } else {
        alert("Invalid category! Please choose from home, work, personal, or diet.");
    }

});

function addTask(){
    let taskName=document.getElementById("taskName").value;
    let taskDate=document.getElementById("taskDate").value;
    let startTime=document.getElementById("startTime").value;
    let endTime=document.getElementById("endTime").value;
    if(!taskName || !taskDate ||!startTime||!endTime){
        alert("Please fill in all details.");
        return;
    }
     
    let task={taskName,taskDate,startTime,endTime};
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
    
    document.getElementById("taskform").style.display="none";
    document.getElementById("taskName").value="";
    document.getElementById("taskDate").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
   


}  
function renderTasks(){
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    let displayActivities=document.querySelector(".display-activities");
    displayActivities.innerHTML="";
    tasks.forEach((task,index)=>{
        let taskDiv=document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
    <strong>${task.taskName}</strong> <br>
    📅 Date: ${task.taskDate} <br>
    ⏰ Time: ${task.startTime} - ${task.endTime}
`;

        let deleteBtn =document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerText="Delete";
        deleteBtn.onclick=function(){
          deleteTask(index);
        }
        taskDiv.appendChild(deleteBtn);
       displayActivities.appendChild(taskDiv);
       
    });
}
function deleteTask(index){
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
}
document.addEventListener("DOMContentLoaded",renderTasks);
document.getElementById("close-form").addEventListener("click",function(){
    document.getElementById("taskform").style.display="none";
})
// task categories
let taskCategories = {
    home: 0,
    work: 0,
    personal: 0,
    diet: 0
};
function updateTaskCount() {
    document.getElementById("home-count").innerHTML = taskCategories.home;
    document.getElementById("work-count").innerHTML = taskCategories.work;
    document.getElementById("personal-count").innerHTML = taskCategories.personal;
    document.getElementById("diet-count").innerHTML = taskCategories.diet; 
}
function addEventTask(category) {
    if (taskCategories.hasOwnProperty(category)) {
        taskCategories[category]++;
        updateTaskCount(); 
    }
}

