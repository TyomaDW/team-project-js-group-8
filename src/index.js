
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const button = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

button.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  console.log(event.target)
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



