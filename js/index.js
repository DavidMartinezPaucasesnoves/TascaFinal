let miGrafico;

window.onload = function() {
    dibujarTareas();
    inicializarGrafico();
};

function dibujarTareas() {
    var pendientes = document.getElementById('contenedor-pendientes');
    var acabadas = document.getElementById('contenedor-acabadas');
    var tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    var nombresCat = (localStorage.getItem('Nombres') || "").split(',');
    var coloresCat = (localStorage.getItem('Colores') || "").split(',');

    if (pendientes) pendientes.innerHTML = "";
    if (acabadas) acabadas.innerHTML = "";

    tareas.forEach(function(tarea, index) {
        var colorFondo = "#d4edda";
        if (tarea.prioridad === "Alta") colorFondo = "#f8d7da";
        if (tarea.prioridad === "Media") colorFondo = "#fff3cd";

        var indiceCat = nombresCat.indexOf(tarea.categoria);
        var colorEtiqueta = indiceCat !== -1 ? coloresCat[indiceCat] : "#333";
        var iconoEstado = tarea.completada ? "⬆︎" : "✔";

        var card = document.createElement('div');
        card.className = "tarea-card";
        card.style.backgroundColor = tarea.completada ? "#eee" : colorFondo;

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span style="font-weight: bold; font-size: 1.1em;">${tarea.titulo}</span>
                <span style="font-size: 0.8em; opacity: 0.8;">${tarea.prioridad}</span>
            </div>
            <div style="margin: 10px 0;">
                <span style="background-color: ${colorEtiqueta}; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85em;">
                    ${tarea.categoria}
                </span>
            </div>
            <div style="font-size: 0.85em; color: #444;">${tarea.fecha}</div>
            <div style="font-size: 0.85em; color: #666; flex-grow: 1; margin-top: 5px;">${tarea.descripcion}</div>
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 10px;">
                <button onclick="cambiarEstadoTarea(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.2em;">
                    ${iconoEstado}
                </button>
                <button onclick="borrarTareaGeneral(${index})" style="background:none; border:none; cursor:pointer; font-size: 1.2em;">
                    ✘
                </button>
            </div>
        `;

        if (tarea.completada && acabadas) {
            acabadas.appendChild(card);
        } else if (!tarea.completada && pendientes) {
            pendientes.appendChild(card);
        }
    });

    if (miGrafico) {
        actualizarDatosGrafico();
    }
}

function inicializarGrafico() {
    const ctx = document.getElementById('myChart');
    if (!ctx) return;

    miGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Tareas Realizadas',
                data: obtenerConteosPorMes(),
                borderWidth: 2,
                borderColor: '#FF7D19',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

function obtenerConteosPorMes() {
    var tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    var conteos = new Array(12).fill(0);

    tareas.forEach(function(tarea) {
        if (tarea.completada && tarea.fecha) {
            var fechaTarea = new Date(tarea.fecha);
            var mes = fechaTarea.getMonth(); 
            conteos[mes]++;
        }
    });

    return conteos;
}

function actualizarDatosGrafico() {
    miGrafico.data.datasets[0].data = obtenerConteosPorMes();
    miGrafico.update();
}