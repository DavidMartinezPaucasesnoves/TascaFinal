function guardarCategoria() {
  var nombre = document.getElementById('nombre-cat').value;
  var color = document.getElementById('color-cat').value;

  if (nombre == "") {
    alert("Escribe un nombre");
    return;
  }

  var nombresViejos = localStorage.getItem('Nombres') || "";
  var coloresViejos = localStorage.getItem('Colores') || "";

  localStorage.setItem('Nombres', nombresViejos + nombre + ",");
  localStorage.setItem('Colores', coloresViejos + color + ",");

  alert("Guardado!");
  document.getElementById('nombre-cat').value = "";
}


window.onload = function() {
  var select = document.getElementById('selector-categorias');
  
  var datos = localStorage.getItem('Nombres');

  if (datos) {
    var lista = datos.split(','); 

    for (var i = 0; i < lista.length; i++) {
      var nombre = lista[i];

      if (nombre != "") {
        var nuevaOpcion = document.createElement('option');
        
        nuevaOpcion.text = nombre;
        nuevaOpcion.value = nombre;
        select.add(nuevaOpcion);
      }
    }
  }
}