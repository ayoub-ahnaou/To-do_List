const title = document.getElementById("title");
const description = document.getElementById("description");
const statut = document.getElementById("statut");
const date = new Date();

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
            document.getElementById("red-card").innerHTML += `
                <li
                class="task-card border-redColor"
              >
                <div class="flex flex-wrap gap-2 text-black font-bold">
                  <p>${title.value}.</p>
                  <p>${"#"+ID}</p>
                </div>
                <span class="font-medium text-xs">${date.toLocaleString()}</span>
                <p class="pb-2">${description.value}</p>
                <div class="flex gap-1">
                  <button class="primary-btn">Edit</button>
                  <button class="primary-btn">Delete</button>
                </div>
              </li>
            `;
        }
        if(statut.value == "doing"){
            document.getElementById("orange-card").innerHTML += `
                <li
                class="task-card border-orangeColor"
              >
                <div class="flex flex-wrap gap-2 text-black font-bold">
                  <p>${title.value}.</p>
                  <p>${"#"+ID}</p>
                </div>
                <span class="font-medium text-xs">${date.toLocaleString()}</span>
                <p class="pb-2">${description.value}</p>
                <div class="flex gap-1">
                  <button class="primary-btn">Edit</button>
                  <button class="primary-btn">Delete</button>
                </div>
              </li>
            `;
        }
        if(statut.value == "done"){
            document.getElementById("green-card").innerHTML += `
              <li
                class="task-card border-greenColor"
              >
                <div class="flex flex-wrap gap-2 text-black font-bold">
                  <p>${title.value}.</p>
                  <p>${"#"+ID}</p>
                </div>
                <span class="font-medium text-xs">${date.toLocaleString()}</span>
                <p class="pb-2">${description.value}</p>
                <div class="flex gap-1">
                  <button class="primary-btn">Edit</button>
                  <button class="primary-btn">Delete</button>
                </div>
              </li>
            `;
        }

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

