const title = document.getElementById("title");
const description = document.getElementById("description");
const statut = document.getElementById("statut");
const date = new Date();

let countRedTasks = 0;
let countOrangesTasks = 0;
let countGreensTasks = 0;

const handleAddTask = () => {
    let errTitle = document.querySelector("#err-mssg-title");
    let errDesc = document.querySelector("#err-mssg-desc");
    let errStatut = document.querySelector("#err-mssg-statut");

    if(!title.value || !description.value || !statut.value){
        if(!title.value) errTitle.style.display = "block";        
        else errTitle.style.display = "none"; 

        if(!description.value) errDesc.style.display = "block";        
        else errDesc.style.display = "none";        

        if(!statut.value) errStatut.style.display = "block";        
        else errStatut.style.display = "none";        
    }else {
        errTitle.style.display = "none"; errDesc.style.display = "none"; errStatut.style.display = "none";
        const ID = generateID();

        if(statut.value == "to-do"){
          const redTasks = document.getElementById("red-card");
          const task = document.createElement("li");
          task.innerHTML = `
                <li
                class="task-card border-redColor"
              >
                <div class="flex flex-wrap gap-2 text-black font-bold">
                  <p>${title.value}.</p>
                  <p>${"#"+ID}</p>
                </div>
                <span class="font-medium text-xs">${new Date().toLocaleString()}</span>
                <p class="pb-2 tracking-wide">${description.value}</p>
                <div class="flex gap-1">
                  <button class="primary-btn">Edit</button>
                  <button id="delete-btn" onclick="handelDeleteTask()" class="primary-btn">Delete</button>
                </div>
              </li>
            `;
          redTasks.appendChild(task);
          countRedTasks++;
        }
        if(statut.value == "doing"){
          const orangeTasks = document.getElementById("orange-card");
          const task = document.createElement("li");
          task.innerHTML += `
              <li
              class="task-card border-orangeColor"
            >
              <div class="flex flex-wrap gap-2 text-black font-bold">
                <p>${title.value}.</p>
                <p>${"#"+ID}</p>
              </div>
              <span class="font-medium text-xs">${new Date().toLocaleString()}</span>
              <p class="pb-2 tracking-wide">${description.value}</p>
              <div class="flex gap-1">
                <button class="primary-btn">Edit</button>
                <button id="delete-btn" onclick="handelDeleteTask()" class="primary-btn">Delete</button>
              </div>
            </li>
          `;
          orangeTasks.appendChild(task);
          countOrangesTasks++;
        }
        if(statut.value == "done"){
          const greenTasks = document.getElementById("green-card");
          const task = document.createElement("li");
          task.innerHTML += `
            <li
              class="task-card border-greenColor"
            >
              <div class="flex flex-wrap gap-2 text-black font-bold">
                <p>${title.value}.</p>
                <p>${"#"+ID}</p>
              </div>
              <span class="font-medium text-xs">${date.toLocaleString()}</span>
              <p class="pb-2 tracking-wide">${description.value}</p>
              <div class="flex gap-1">
                <button class="primary-btn">Edit</button>
                <button id="delete-btn" onclick="handelDeleteTask()" class="primary-btn">Delete</button>
              </div>
            </li>
          `;
          greenTasks.appendChild(task);
          countGreensTasks++;
        }

        document.getElementById("countRedTasks").innerHTML = "To-Do: " + countRedTasks;
        document.getElementById("countOrangeTasks").innerHTML = "In progress: " + countOrangesTasks;
        document.getElementById("countGreenTasks").innerHTML = "Done: " + countGreensTasks;

        modal.style.display = "none";
        blurBg.style.filter = "blur(0px)";
        blurBg.style.userSelect = "";

        title.value = ""; description.value = ""; statut.value = "";
    }
}

function generateID() {
    const chiffres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let ID = [];
    for(let i=0; i<6; i++){
        let random = Math.floor(Math.random() * chiffres.length);
        ID[i] = chiffres[random];
    }
    return ID.join("");
}

