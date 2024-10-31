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



