// Function for filtering dubbing page
$('.distribution-wrap, .year-wrap').delegate('select', 'change', function() 
{
  var $lis = $('.dubbings > div'), 
  $checked = $('option:selected');  
  if ($checked.length) 
  {              
    var type_selector = '';
    $($checked).each(function(index, element)
    {
      console.log(element.id);
      if (element.id == "35mm" || element.id == "Serie")
      { 
        if(type_selector === '') 
        {
          type_selector += "[data-category~='" + element.id + "']";                  
        } 
        else
        {
          type_selector += ",[data-category~='" + element.id + "']";
        }
      }
    });                        
    $lis.hide(); 
    $('.dubbings > div').hide().filter(type_selector).show();        
   
  } 
  else 
  {
    $lis.show();
  }
}); 


  
