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

let tasks = [];
// function to check value entered by user
function handleAddTask() {
    if(!title.value || !description.value || !statut.value || !priorety.value){
        if(!title.value) errTitle.style.display = "block";
        else errTitle.style.display = "none";

        if(!description.value) errDesc.style.display = "block";
        else errDesc.style.display = "none";

        if(!statut.value) errStatut.style.display = "block";
        else errStatut.style.display = "none";

        if(!priorety.value) errPriorety.style.display = "block";
        else errPriorety.style.display = "none";

        if(!deadline.value) errDeadline.style.display = "block";
        else errDeadline.style.display = "none";

        let date = new Date(deadline);
        if(date.getMonth() < new Date().getMonth()){
            if(date.getFullYear() < new Date().getFullYear()){
                errDeadline.innerHTML = "You choose a year already gone. Use a valid year";
            }
            else errDeadline.innerHTML = "You choose a month already gone. Use a valid year";
        }
    }
    else{
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
    }
    showData();
}

// function to affiche all tasks in browser
function showData() {
    const redTasks = document.getElementById("red-card");
    const orangeTasks = document.getElementById("orange-card");
    const greenTasks = document.getElementById("green-card");
    
    let countRedTasks = 0;
    let countOrangesTasks = 0;
    let countGreensTasks = 0;

    redTasks.innerHTML = ""; 
    orangeTasks.innerHTML = "";
    greenTasks.innerHTML = "";

    tasks.forEach((task) => {
        let taskHTML = document.createElement("li");
        taskHTML.innerHTML = `
            <li
            class="task-card" id='${task.id}'
            >
                <div class="flex flex-wrap items-center h-full gap-2 text-black font-medium">
                    <p class="font-bold">${task.title}.</p>
                    <p class="text-xs text-darkGrayColor">#${task.id}</p>
                </div>
                <span class="font-medium text-xs">End date: ${task.deadline}</span>
                <p class="pb-2 tracking-wide">${task.description}</p>
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
    showData();
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
  blurBg.style.filter = "blur(0px)";
  details.style.display = "none"; 
})

// function to place information in thier place in the HTML code
function showDetails(id) {
  blurBg.style.filter = "blur(8px)";
  details.style.display = "block";

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

}
// close icon in details modal
document.getElementById("cancel-btn").addEventListener("click", () => {
  blurBg.style.filter = "blur(0px)";
  details.style.display = "none";
});

