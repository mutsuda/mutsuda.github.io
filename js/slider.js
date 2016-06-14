var year_filter="";
var type_filter="[data-category~='35mm'],[data-category~='Serie']";

var slider = document.getElementById('slider');
  noUiSlider.create(slider, {
   start: [1996, 2016],
   connect: true,
   step: 1,
   range: {
     'min': 1996,
     'max': 2016
   },
   format: wNumb({
     decimals: 0
   })
  });

// When the slider value changes, update the input and span
slider.noUiSlider.on('update', function( values, handle ) {
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
  $('.dubbings > div').hide().filter(type_filter).filter(year_filter).show();
});
