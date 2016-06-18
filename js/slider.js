var year_filter="";
var type_filter="[data-category~='35mm'],[data-category~='Serie'],[data-category~='Video']";

var slider = document.getElementById('slider');
  current_year = new Date().getFullYear()
  noUiSlider.create(slider, {
   start: [1994, current_year],
   connect: true,
   step: 1,
   range: {
     'min': 1994,
     'max': current_year
   },
   format: wNumb({
     decimals: 0
   })
  });

// When the slider value changes, update the input and span
slider.noUiSlider.on('update', function( values, handle ) {
  label = document.getElementById('year-label');
  var year = values[0];
  year_filter = "";
  while (year<=values[1])
  {
    if (year_filter == '')
    {
      year_filter += "[data-category~='" + year + "']";
    }
    else
    {
      year_filter += ",[data-category~='" + year + "']";
    }
    year = parseInt(year) +  1;
  }
  if (values[0]==values[1])
  {
    label.innerHTML = values[0]
  }
  else
  {
    label.innerHTML = values[0] + " - " + values[1];
  }
  $('.dubbings > div').hide().filter(type_filter).filter(year_filter).show();
});
