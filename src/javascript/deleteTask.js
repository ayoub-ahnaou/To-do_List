
function handleDeleteTask(event, statut) {
  if(statut == "to-do")
    document.getElementById("countRedTasks").innerHTML = "To-Do: " + --countRedTasks;
  if(statut == "doing")
    document.getElementById("countOrangeTasks").innerHTML = "In progress: " + --countOrangesTasks;
  if(statut == "done")
    document.getElementById("countGreenTasks").innerHTML = "Done: " + --countGreensTasks;

  event.target.parentElement.parentElement.parentElement.remove();
}