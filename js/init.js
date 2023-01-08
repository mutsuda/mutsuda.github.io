$(document).ready(function(){
  $('#nav-toggle').on("click", function() {
    $('#nav-menu')[0].classList.toggle('hidden')
    $('#hamburger')[0].classList.toggle('hidden')
    $('#cross')[0].classList.toggle('hidden')
  });  
});


function playOnHover(player) {
  player.addEventListener("mouseover", function() {
    player.play();
  });

  player.addEventListener("mouseout", function() {
    player.pause();
  });
}

var players = document.getElementsByTagName("video");

for (var i = 0; i < players.length; i++) {
  playOnHover(players[i]);
  // Detectar Safari
  if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
  // Mostrar los controles en Safari
    players[i].controls = 'true';
  }
  
}