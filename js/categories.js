window.onload = function() {
  actualizarInterfaz();
};

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

  document.getElementById('nombre-cat').value = "";
  
  actualizarInterfaz();
}

function actualizarInterfaz() {
  var select = document.getElementById('selector-categorias');
  var contenedorLista = document.querySelector('.lista-categorias');
  
  if(select) select.innerHTML = '<option value=""></option>';
  if(contenedorLista) contenedorLista.innerHTML = "";

  var datosNombres = localStorage.getItem('Nombres');
  var datosColores = localStorage.getItem('Colores');

  if (datosNombres) {
    var listaN = datosNombres.split(',');
    var listaC = datosColores.split(',');

    for (var i = 0; i < listaN.length; i++) {
      var nombre = listaN[i];
      var color = listaC[i];

      if (nombre != "") {
        if (select) {
          var nuevaOpcion = document.createElement('option');
          nuevaOpcion.text = nombre;
          nuevaOpcion.value = nombre;
          select.add(nuevaOpcion);
        }

        if (contenedorLista) {
          var fila = document.createElement('div');
          fila.className = "fila-categoria";
          fila.style.display = "flex";
          fila.style.alignItems = "center";
          fila.style.justifyContent = "space-between";
          fila.style.padding = "10px";
          fila.style.marginBottom = "5px";

          fila.innerHTML = `
            <div style="display: flex; align-items: center;">
              <div style="background-color: --color-secondary; width: 12px; height: 12px; border-radius: 10px; margin-right: 10px; font-family: 'Coolvetica';"></div>
              <span>${nombre}</span>
            </div>
            <button class="eliminar-categoria" onclick="borrarCategoria(${i})">Eliminar</button>
          `;
          contenedorLista.appendChild(fila);
        }
      }
    }
  }
}



function borrarCategoria(index) {
  var listaN = localStorage.getItem('Nombres').split(',');
  var listaC = localStorage.getItem('Colores').split(',');

  listaN.splice(index, 1);
  listaC.splice(index, 1);

  localStorage.setItem('Nombres', listaN.join(','));
  localStorage.setItem('Colores', listaC.join(','));

  actualizarInterfaz();
}