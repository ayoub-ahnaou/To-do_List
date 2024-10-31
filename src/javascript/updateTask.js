const modalEdit = document.getElementById("modal-edit");
const closeIconEdit = document.getElementById("close-icon-edit");

const handleShowTaskInfos = (event, id, title, description, statut) => {
    const editBtn = document.getElementById("edit-btn");
    
    modalEdit.style.display = "block";
    blurBg.style.filter = "blur(2px)";
    blurBg.style.userSelect = "none";

    document.getElementById("title-edit").value = title;
    document.getElementById("description-edit").value = description;
    document.getElementById("statut-edit").value = statut;

}

closeIconEdit.addEventListener("click", () => {
    modalEdit.style.display = "none";
    blurBg.style.filter = "blur(0px)";
    blurBg.style.userSelect = "";
  
    // TODO: Commit changes, "fix issue inputs still full with past value even if I closed the modal"
    // hide the error messages
    document.querySelector("#err-mssg-title").style.display = "none";
    document.querySelector("#err-mssg-desc").style.display = "none";
    document.querySelector("#err-mssg-statut").style.display = "none";
});


const handleUpdateTask = () => {
    
}
