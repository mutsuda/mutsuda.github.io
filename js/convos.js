function filter(from, to) {
  var total = 0;
  $(".fbody tr").each(function() {
    var row = $(this);
    var date = new Date(row.find("td").eq(0).text());
    var price = row.find("td").eq(7).text();
    price = price.substring(0, price.length-1);
    
    //show all rows by default
    var show = true;

    //if from date is valid and row date is less than from date, hide the row
    if (from && date < from)
      show = false;
    
    //if to date is valid and row date is greater than to date, hide the row
    if (to && date > to)
      show = false;

    if (show) {
      total = total + parseFloat(price);
      row.show();
    }
    else
      row.hide();
    document.getElementById("total").innerHTML = Number((total).toFixed(2)) + "€";
  });
}

$("#last30").click(function() {
  var to = new Date();
  var from = new Date();
  // Substract 30 days to today's date
  from.setDate(from.getDate()-30);
  filter(from, to);
});

$("#last7").click(function() {
  var to = new Date();
  var from = new Date();
  // Substract 30 days to today's date
  from.setDate(from.getDate()-7);
  filter(from, to);
});

$("#thisMonth").click(function() {
  var today = new Date();
  var from = new Date(today.getYear()+1900, today.getMonth(), 1);
  var to = new Date(today.getYear()+1900, today.getMonth()+1, 0);
  // Substract 30 days to today's date
  filter(from, to);
});

$("#all").click(function() {
  var to = new Date();
  var from = new Date();
  // Substract 30 days to today's date
  from.setDate(from.getDate()-1000);
  to.setDate(to.getDate()+1000)
  filter(from, to);
});



