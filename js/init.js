$(document).ready(function(){
  $('#nav-toggle').on("click", function() {
    $('#nav-menu')[0].classList.toggle('hidden')
    $('#hamburger')[0].classList.toggle('hidden')
    $('#cross')[0].classList.toggle('hidden')
  });
});