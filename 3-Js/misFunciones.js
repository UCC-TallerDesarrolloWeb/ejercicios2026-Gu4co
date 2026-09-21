/**
 * converson de unidades de metros,pies, yardas y pulgadas
 * @method covertirUnidades
 * @param {string} id - id del elemento input en el html
 * @param {number} valor - valor ingresado por el usuario
 * @return Valor que retorna
 */
convertirUnidades = (id , value) => {
  value = value.replace(",",".");
    if(isNaN(value)){
      alert("se ingreso valores incorectos: "+id);
      metro = "";
      pie = "";
      yarda = "";
      pulgada = "";
    }else if(id=="metro"){
      document.getElementById("pulgada").value = value*39.3701.toFixed(2);
      document.getElementById("pie").value = value*3.2804.toFixed(2);
      document.getElementById("yarda").value = value*1.09361.toFixed(2);

    } else if (id == "pie") {
    document.getElementById("metro").value = value * 0.3048.toFixed(2);
    document.getElementById("pulgada").value = value * 12 .toFixed(2);
    document.getElementById("yarda").value = value / 3 .toFixed(2);
  }

  else if (id == "yarda") {
    document.getElementById("metro").value = value * 0.9144.toFixed(2);
    document.getElementById("pie").value = value * 3 .toFixed(2);
    document.getElementById("pulgada").value = value * 36 .toFixed(2);
  }

  else if (id == "pulgada") {
    document.getElementById("metro").value = value * 0.0254.toFixed(2);
    document.getElementById("pie").value = value / 12 .toFixed(2);
    document.getElementById("yarda").value = value / 36 .toFixed(2);
  }
document.getElementById("metro").value = (value * 0.0254).toFixed(2);
 document.getElementById("pie").value = (value / 12).toFixed(2);
document.getElementById("yarda").value = (value / 36).toFixed(2);

}




function convertirGR(id){
  let grad,rad;

  if(id=="grados"){
    grad = document.getElementById("grados").value;
    rad = grad*Math.PI/180;
  }else{
    rad = document.getElementById("radianes").value;
    grad = rad*180/Math.PI;
  }
  document.getElementById("grados").value = grad;
  document.getElementById("radianes").value = rad;
}
function mostrarOcultar(valor){

  if(valor=="val_mostrar"){

    document.getElementById("unDiv").style.display = 'block';

  }else{

    document.getElementById("unDiv").style.display = 'none';

  }

}
function calcularSuma(){
  sum1 = Number(document.getElementById("nums1").value);
  sum2 = Number(document.getElementById("nums2").value);
  document.getElementById("totalS").innerText = sum1 + Number(sum2);

}