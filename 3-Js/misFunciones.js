/**
 * converson de unidades de metros,pies, yardas y pulgadas
 * @method covertirUnidades
 * @param {string} id - id del elemento input en el html
 * @param {number} valor - valor ingresado por el usuario
 * @return Valor que retorna
 */
convertirUnidades = (id , value) => {
    if(isNaN(value)){
      alert("se ingreso valores incorectos: "+id);
      metro = "";
      pie = "";
      yarda = "";
      pulgada = "";
    }else if(id=="metro"){
      document.getElementById("pulgada").value = value*39.3701;
      document.getElementById("pie").value = value*3.2804;
      document.getElementById("yarda").value = value*1.09361;

    } else if (id == "pie") {
    document.getElementById("metro").value = value * 0.3048;
    document.getElementById("pulgada").value = value * 12;
    document.getElementById("yarda").value = value / 3;
  }

  else if (id == "yarda") {
    document.getElementById("metro").value = value * 0.9144;
    document.getElementById("pie").value = value * 3;
    document.getElementById("pulgada").value = value * 36;
  }

  else if (id == "pulgada") {
    document.getElementById("metro").value = value * 0.0254;
    document.getElementById("pie").value = value / 12;
    document.getElementById("yarda").value = value / 36;
  }
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
  let sum1,sum2
  sum1 = document.getElementById("nums1").value;
  sum2 = document.getElementById("nums2").value;
  document.getElementById("totalS").value = sum1 + Number(sum2);

}