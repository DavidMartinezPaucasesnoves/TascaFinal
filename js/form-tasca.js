window.onload = function() {
    var select = document.getElementById('selector-categorias');
    var datosNombres = localStorage.getItem('Nombres');
    if (datosNombres && select) {
        var lista = datosNombres.split(',');
        lista.forEach(function(nombre) {
            if (nombre !== "") {
                var opt = document.createElement('option');
                opt.text = nombre;
                opt.value = nombre;
                select.add(opt);
            }
        });
    }
};

function guardarTarea() {
    var tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    var nueva = {
        titulo: document.getElementById('titulo-tarea').value,
        descripcion: document.getElementById('desc-tarea').value,
        fecha: document.getElementById('fecha-tarea').value,
        categoria: document.getElementById('selector-categorias').value,
        prioridad: document.getElementById('prioridad-tarea').value,
        completada: false
    };
    tareas.push(nueva);
    localStorage.setItem('Tareas', JSON.stringify(tareas));
    window.location.href = "index.html";
}