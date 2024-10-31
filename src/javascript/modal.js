const closeIcon = document.getElementById("close-icon");
const modal = document.getElementById("modal");
const blurBg = document.getElementById("blur-bg");

closeIcon.addEventListener("click", () => {
  modal.style.display = "none";
  blurBg.style.filter = "blur(0px)";
  blurBg.style.userSelect = "";

  // make all inputs empty after closing the modal window
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statut").value = "";

  // hide the error messages
  document.querySelector("#err-mssg-title").style.display = "none";
  document.querySelector("#err-mssg-desc").style.display = "none";
  document.querySelector("#err-mssg-statut").style.display = "none";
});

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
  blurBg.style.filter = "blur(2px)";
  blurBg.style.userSelect = "none";
});
