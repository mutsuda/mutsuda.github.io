// Function for filtering dubbing page
$('.distribution-wrap, .year-wrap').delegate('select', 'change', function() 
{
  var $lis = $('.dubbings > div'), 
  $checked = $('option:selected');  
  if ($checked.length) 
  {              
    type_filter = '';
    $($checked).each(function(index, element)
    {
      if (element.id == "35mm" || element.id == "Serie")
      { 
        if(type_filter === '') 
        {
          type_filter += "[data-category~='" + element.id + "']";                  
        } 
        else
        {
          type_filter += ",[data-category~='" + element.id + "']";
        }
      }
    });                        
    $lis.hide(); 
    console.log(type_filter);
    console.log(year_filter);
    $('.dubbings > div').hide().filter(type_filter).filter(year_filter).show();        
   
  } 
  else 
  {
    $lis.show();
  }
}); 


  
