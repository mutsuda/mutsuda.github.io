// Obtener el elemento del slider
var range = document.getElementById('steps-range');

var selectedYear = range.value;

document.getElementById('selected-year').innerHTML = selectedYear;

// Obtener todos los carteles de películas
var posters = document.querySelectorAll('.poster');

range.addEventListener('input', function() {
  // Obtener el año seleccionado
  selectedYear = range.value;

  // Actualizar el contenido del div con el año seleccionado
  document.getElementById('selected-year').innerHTML = selectedYear;

  // Filtrar los carteles de películas según el año seleccionado y el tipo seleccionado en los checkboxes
  filterPosters();
});

// Obtener los checkboxes para filtrar por tipo de película
var checkboxes = document.querySelectorAll('#filter-type input[type="checkbox"]');

// Crear una función para filtrar los carteles de películas según los checkboxes seleccionados
function filterPosters() {
  // Obtener los valores de los checkboxes seleccionados
  var selectedTypes = [];
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      selectedTypes.push(checkbox.value);
      if (checkbox.value == "Video") {
         selectedTypes.push("Serie");
      }
    }
  });

  // Mostrar todos los carteles de películas
  posters.forEach(function(poster) {
    poster.style.display = 'block';
  });

  // Ocultar los carteles de películas que no estén seleccionados
  if (selectedTypes.length >= 0) {
    posters.forEach(function(poster) {
      var posterType = poster.getAttribute('data-type');
      if (!selectedTypes.includes(posterType)) {
        poster.style.display = 'none';
      }
    });
  }

  // Ocultar los carteles de películas que no estén en el rango de años seleccionado
  posters.forEach(function(poster) {
    var posterYear = poster.dataset.year;
    if (posterYear > selectedYear) {
      poster.style.display = 'none';
    }
  });
}

// Añadir un evento de cambio a cada checkbox
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', filterPosters);
});