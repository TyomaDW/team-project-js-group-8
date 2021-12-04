
/* const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const button = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

button.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} */

let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function(){
  modal.style.display = "block"
}
closeBtn.onclick = function(){
  modal.style.display = "none"
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}

