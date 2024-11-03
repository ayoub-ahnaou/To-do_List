const title = document.getElementById("title");
const description = document.getElementById("description");
const statut = document.getElementById("statut");
const priorety = document.getElementById("priorety");
const deadline = document.getElementById("deadline");

//get the Error elements messages from html
let errTitle = document.querySelector("#err-mssg-title");
let errDesc = document.querySelector("#err-mssg-desc");
let errStatut = document.querySelector("#err-mssg-statut");
let errPriorety = document.querySelector("#err-mssg-priorety");
let errDeadline = document.querySelector("#err-mssg-deadline");

let tasks = loadTasks();
showData(tasks);
// function to check value entered by user
function validValues(){
    let isValid = true;
    if(!title.value){
        errTitle.style.display = "block";
        isValid = false;
    }
    else errTitle.style.display = "none";
    
    if(title.value.length > 80){
        errTitle.style.display = "block";
        errTitle.innerHTML = "Title is too long, maximum caracters is 80!"
        isValid = false;
    }
    else errTitle.style.display = "none";

    if(!description.value) {
        errDesc.style.display = "block";
        isValid = false;
    }
    else errDesc.style.display = "none";

    if(!statut.value) {
        errStatut.style.display = "block";
        isValid = false;
    }
    else errStatut.style.display = "none";

    if(!priorety.value) {
        errPriorety.style.display = "block";
        isValid = false;
    }
    else errPriorety.style.display = "none";

    const date = new Date(deadline.value);
    const dateNow = new Date();
    if(!deadline.value){
        errDeadline.style.display = "block";
        isValid = false;
    }
    
    if(deadline.value){
        if(date.getFullYear() == dateNow.getFullYear() && date.getMonth() == dateNow.getMonth() && date.getUTCDate() < dateNow.getUTCDate()){
            errDeadline.style.display = "block";
            errDeadline.innerHTML = "Date chossen is already gone...";
            isValid = false;
        }
        // year == 2024
        if(date.getFullYear() == dateNow.getFullYear()){
            // month == 11
            if(date.getMonth() == dateNow.getMonth()){
                // day < 2 ==> error: "day chossen is gone"
                if(date.getUTCDate() < dateNow.getUTCDate()){
                    errDeadline.style.display = "block";
                    errDeadline.innerHTML = "Day choosen is gone...";
                    isValid = false;
                }
                // day >= 2 ==> succes: "display none"
                if(date.getUTCDate() >= dateNow.getUTCDate()){
                    errDeadline.style.display = "none";
                }
            }
            // month < 11 ==> error: "month chossen is gone"
            else if(date.getMonth() < dateNow.getMonth()){
                errDeadline.style.display = "block";
                errDeadline.innerHTML = "Month choosen is gone...";
                isValid = false;
            }
            // month > 11 ==> succes: "display none"
            else errDeadline.style.display = "none";
        }
        // year > 2024 ==> succes: "display none"
        else if(date.getFullYear() > dateNow.getFullYear()){
            errDeadline.style.display = "none";
        }
        // year < 2024 ==> erroe: "yrear choosen is gone"
        else {
            errDeadline.style.display = "block";
            errDeadline.innerHTML = "Year choosen is gone...";
            isValid = false;
        }
    }

    return isValid;
}


function handleAddTask() {
    if(!validValues()){
        return;
    }
    const ID = generateID();
    let task = {
        id: ID,
        title: title.value,
        description: description.value,
        statut: statut.value,
        deadline: deadline.value,
        priorety: priorety.value,
    }
    tasks.push(task);

    // clear all inputs after clicking the "add" button
    modal.style.display = "none";
    blurBg.style.filter = "blur(0px)";

    // make all inputs empty after closing the modal window
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("statut").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("priorety").value = "";

    // hide the error messages
    document.querySelector("#err-mssg-title").style.display = "none";
    document.querySelector("#err-mssg-desc").style.display = "none";
    document.querySelector("#err-mssg-statut").style.display = "none";
    document.querySelector("#err-mssg-deadline").style.display = "none";
    document.querySelector("#err-mssg-priorety").style.display = "none";
    
    showData(tasks);
}

// function to affiche all tasks in browser
function showData(tasks) {
    const redTasks = document.getElementById("red-card");
    const orangeTasks = document.getElementById("orange-card");
    const greenTasks = document.getElementById("green-card");
    
    let countRedTasks = 0;
    let countOrangesTasks = 0;
    let countGreensTasks = 0;

    redTasks.innerHTML = ""; 
    orangeTasks.innerHTML = "";
    greenTasks.innerHTML = "";

    // FIX: Make description text responsive (it overflow his div)
    tasks.forEach((task) => {
        let taskHTML = document.createElement("li");
        taskHTML.innerHTML = `
            <li
            class="task-card" id='${task.id}'
            >
                <div class="flex flex-wrap items-center h-full gap-2 text-black font-medium">
                    <p class="font-bold hover:underline cursor-pointer break-words" onclick="showDetails('${task.id}')">${task.title}.</p>
                    <p class="text-xs text-darkGrayColor">#${task.id}</p>
                </div>
                <span class="font-medium text-xs">End date: ${task.deadline}</span>
                <p class="pb-2 break-words">${task.description.slice(0, 50)}...</p>
                <div class="flex gap-1">
                    <button id="edit-btn" class="primary-btn" onclick="showDetails('${task.id}')">Edit</button>
                    <button id="delete-btn" class="secondary-btn" onclick="handleDeleteTask('${task.id}')">Delete</button>
                </div>
            </li>
        `;

        // append the task to the corresponding section based on its statut (to-do, doing, done)
        if(task.statut == "to-do") {
            redTasks.appendChild(taskHTML)
            countRedTasks++;
        }
        if(task.statut == "doing") {
            orangeTasks.appendChild(taskHTML)
            countOrangesTasks++;
        }
        if(task.statut == "done") {
            greenTasks.appendChild(taskHTML)
            countGreensTasks++;
        }

        document.getElementById("countRedTasks").innerHTML = "To-Do: " + countRedTasks;
        document.getElementById("countOrangeTasks").innerHTML = "In progress: " + countOrangesTasks;
        document.getElementById("countGreenTasks").innerHTML = "Done: " + countGreensTasks;

        // add color to the task card based on its priorety
        if(task.priorety == "P0")
            document.getElementById(task.id).style.borderColor = "#ff4040";
        if(task.priorety == "P1")
            document.getElementById(task.id).style.borderColor = "#ffa373";
        if(task.priorety == "P2")
            document.getElementById(task.id).style.borderColor = "#1fd492";
    });
    saveTasks(tasks);
}

// function to generate an id of 6 chiffres
function generateID() {
    const chiffres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let ID = [];
    for(let i=0; i<6; i++){
        let random = Math.floor(Math.random() * chiffres.length);
        ID[i] = chiffres[random];
    }
    return ID.join("");
}

// handle delete a task
function handleDeleteTask(id) {
    let tmpTasks = [];
    tasks.filter((task) => {
        if(task.id != id) {
            tmpTasks.push(task);
        }
    })
    tasks = tmpTasks;
    showData(tasks);
    if(tasks.length == 0){
        document.getElementById("countRedTasks").innerHTML = "To-Do: " + 0;
        document.getElementById("countOrangeTasks").innerHTML = "In progress: " + 0;
        document.getElementById("countGreenTasks").innerHTML = "Done: " + 0;
    }
}

// handle show and hide the details page 
const details = document.getElementById("details");
const closeIconDetails = document.getElementById("close-icon-details");
closeIconDetails.addEventListener("click", () => {
    details.style.right = "100%";
    blurBg.style.filter = "blur(0px)";
    details.style.display = "none"; 
})

// function to place information in thier place in the HTML code
function showDetails(id) {
    details.style.right = "0";   
    details.style.display = "block";
    blurBg.style.filter = "blur(8px)";

  tasks.forEach((task) => {
    if(task.id == id){
        // TODO: statut not showing in HTML
        document.getElementById("title-details").textContent = task.title;
        document.getElementById("id-details").textContent = "#" + task.id;
        document.getElementById("deadline-details").textContent = task.deadline;
        document.getElementById("desc-details").textContent = task.description;
        document.getElementById("statut-details").value = task.statut;
        document.getElementById("priorety-details").value = task.priorety;
    }
  })

  updateBtn.onclick = () => {
    handleUpdateTask(id);
  }
}
// close icon in details modal
document.getElementById("cancel-btn").addEventListener("click", () => {
  blurBg.style.filter = "blur(0px)";
  details.style.display = "none";
});

// handle update a task
const updateBtn = document.getElementById("update-btn");
function handleUpdateTask(id) {
    let statutDetails = document.getElementById("statut-details").value;
    let prioretyDetails = document.getElementById("priorety-details").value;

    tasks.filter((task) => {
        if(task.id == id){
            task.priorety = prioretyDetails;
            task.statut = statutDetails;
        }
    })

    blurBg.style.filter = "blur(0px)";
    details.style.display = "none";
    showData(tasks);
}

// TODO: the local storage functions
// load all task from local storage to tasks array
function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks in the local storage
function saveTasks(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// TODO: Search bar functionemment
const searchInput = document.getElementById("search-input");
searchInput.onkeyup = () => {
    let taskTmp = [];
    tasks.filter((task) => {
        if(task.title.toLowerCase().includes(searchInput.value.toLowerCase())){
          taskTmp.push(task); 
        }
    })
    showData(taskTmp);
    if(searchInput.value == "")
        showData(tasks);
}

// handle filtring task by thier priority
const filterIcon = document.getElementById("filter-icon");
filterIcon.addEventListener("click", () => {
    document.getElementById("filter-menu").classList.toggle("hidden");
    document.getElementById("sort-menu").classList.add("hidden");
})
// TODO: priority P0
document.getElementById("filter-p0").addEventListener("click", () => {
    let tmpTasks = [];
    tasks.forEach((task) => {
        if(task.priorety == "P0")
            tmpTasks.push(task);
    })
    showData(tmpTasks);
    document.getElementById("filter-menu").classList.add("hidden")
})
// TODO: priority P1
document.getElementById("filter-p1").addEventListener("click", () => {
    let tmpTasks = [];
    tasks.forEach((task) => {
        if(task.priorety == "P1")
            tmpTasks.push(task);
    })
    showData(tmpTasks);
    document.getElementById("filter-menu").classList.add("hidden")
})
// TODO: priority P2
document.getElementById("filter-p2").addEventListener("click", () => {
    let tmpTasks = [];
    tasks.forEach((task) => {
        if(task.priorety == "P2")
            tmpTasks.push(task);
    })
    showData(tmpTasks);
    document.getElementById("filter-menu").classList.add("hidden")
})
// TODO: priority All
document.getElementById("filter-all").addEventListener("click", () => {
    showData(tasks);
    document.getElementById("filter-menu").classList.add("hidden")
})

// loading animation
setTimeout(() => {
    document.getElementById("loader").style.display = "none";
}, 1500);

// make logo clickable and refresh page if it clicked
document.getElementById("logo").addEventListener("click", () => {
    location.reload()
})