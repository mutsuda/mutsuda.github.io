    $('.distribution-wrap, .year-wrap').delegate('input[type=checkbox]', 'change', function() {
          var $lis = $('.dubbings > div'),
            $checked = $('input:checked');  
          if ($checked.length) {              
                        var selector = '';
                        $($checked).each(function(index, element){
              if(selector === '') {
                selector += "[data-category~='" + element.id + "']";                  
              } else {
                selector += ",[data-category~='" + element.id + "']";
              }
                        });                        
            $lis.hide(); 
                        console.log(selector);
            $('.dubbings > div').hide().filter(selector).show();        
          } else {
            $lis.show();
          }
        });   
