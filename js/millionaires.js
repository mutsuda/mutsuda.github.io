const productSelect = document.getElementById('products');
const millionaireSelect = document.getElementById("millionaires");
const networthInput = document.getElementById('networth');
const conclusion = document.getElementById('result');


millionaireSelect.addEventListener('change', function() {
  const selectedMillionaire = millionaireSelect.value.split("||")[1].slice(0,-1);
  generateLabel();
});


networthInput.addEventListener('input', function() {
  const networthValue = networthInput.value;
  generateLabel();
});


productSelect.addEventListener('change', function() {
  const selectedProduct = productSelect.value.split("||")[1].slice(1,-1);
  generateLabel();
});


function generateLabel()
{
  // the millionaire or the net worth of a millionaire
  var millionaire = millionaireSelect.value.split(" || ")

  // your net worth
  var networth = networthInput.value;

  // the product
  var product = productSelect.value.split(" || ")

  

  if (millionaire[0] && product[0] && networth != "")
  {
    var ratio = parseFloat(networth) / parseFloat(millionaire[1].slice(0,-1))
    var price = ratio * parseFloat(product[1].slice(0,-1))
    var times = Math.round(parseFloat(product[1].slice(0,-1)) / price);
    result.innerHTML = "Para " + millionaire[0] + " gastarse " + parseFloat(product[1].slice(0,-1))+"€" + " en un " + product[0] + " es como para ti gastarte " + customround(price)+"€. Dicho de otra manera, para despeinar a " + millionaire[0] + " igual que a ti, se tendría que comprar " + times + " " + product[0]+"s"
  }
}


function customround(numero) {
  var decimales = 2; // Número inicial de decimales a considerar
  var redondeado = Number(numero.toFixed(decimales));

  while (redondeado === 0) {
    decimales++; // Incrementar la cantidad de decimales
    redondeado = Number(numero.toFixed(decimales));
  }

  return redondeado.toFixed(decimales);
}