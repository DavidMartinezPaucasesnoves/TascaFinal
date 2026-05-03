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
    var contenedorLista = document.querySelector('.lista-categorias');
    if (!contenedorLista) return;

    contenedorLista.innerHTML = "";
    var datosNombres = localStorage.getItem('Nombres');
    var datosColores = localStorage.getItem('Colores');

    if (datosNombres) {
        var listaN = datosNombres.split(',');
        var listaC = datosColores.split(',');

        for (var i = 0; i < listaN.length; i++) {
            var nombre = listaN[i];
            var color = listaC[i];

            if (nombre != "") {
                var fila = document.createElement('div');
                fila.className = "fila-categoria";
                fila.style.display = "flex";
                fila.style.alignItems = "center";
                fila.style.justifyContent = "space-between";
                fila.style.padding = "10px";

                fila.innerHTML = `
                    <div style="display: flex; align-items: center;">
                      <div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 10px; margin-right: 10px;"></div>
                      <span>${nombre}</span>
                    </div>
                    <button class="eliminar-categoria" onclick="borrarCategoria(${i})">Eliminar</button>
                `;
                contenedorLista.appendChild(fila);
            }
        }
    }
}