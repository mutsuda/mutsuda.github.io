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
      if(type_filter === '') 
      {
        type_filter += "[data-category~='" + element.id + "']";                  
      } 
      else
      {
        type_filter += ",[data-category~='" + element.id + "']";
      }
    });                        
    $lis.hide(); 
    $('.dubbings > div').hide().filter(type_filter).filter(year_filter).show();        
   
  } 
  else 
  {
    $lis.show();
  }
}); 
