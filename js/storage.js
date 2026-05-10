function borrarTareaGeneral(index) {
    let tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    tareas.splice(index, 1);
    localStorage.setItem('Tareas', JSON.stringify(tareas));
    if (typeof dibujarTareas === 'function') {
        dibujarTareas();
    } else {
        location.reload();
    }
}

function cambiarEstadoTarea(index) {
    let tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    tareas[index].completada = !tareas[index].completada;
    localStorage.setItem('Tareas', JSON.stringify(tareas));
    if (typeof dibujarTareas === 'function') {
        dibujarTareas();
    } else {
        location.reload();
    }
}