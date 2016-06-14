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
  console.log(handle);
  console.log(values);
  var year = values[0];
  var filter = "";
  while (year<=values[1])
  {
    console.log("year: " + year + " " +"values: "+ values[1]);
    if (filter == '')
    {
      filter += "[data-category~='" + year + "']";
    }
    else
    {
      filter += ",[data-category~='" + year + "']";
    }
    year = parseInt(year) +  1;
  }
  console.log(filter);
  $('.dubbings > div').hide().filter(filter).show();
});
