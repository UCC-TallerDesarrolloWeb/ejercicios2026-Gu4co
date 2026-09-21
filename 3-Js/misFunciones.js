/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */
function covertirUnidades(id , value){
    if(isNaN(value)){
      alert("se ingreso valores incorectos: "+id)
    }else if(id=="metro"){
      document.getElementById("pulgada").value = value*39.3701;
      document.getElementById("pie").value = value*3.2804;
      document.getElementById("yarda").value = value*1.09361;

    }


}