const closeIcon = document.getElementById("close-icon");
const modal = document.getElementById("modal");
const blurBg = document.getElementById("blur-bg");

closeIcon.addEventListener("click", () => {
    modal.style.display = "none";
    blurBg.style.filter = "blur(0px)";
    blurBg.style.userSelect = "";  
});

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
    modal.style.display = "block";
    blurBg.style.filter = "blur(2px)"; 
    blurBg.style.userSelect = "none";
})