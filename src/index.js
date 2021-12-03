
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var button = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

button.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



