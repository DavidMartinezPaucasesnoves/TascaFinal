window.onload = function() {
    var select = document.getElementById('selector-categorias');
    

    if (!select) {
        console.error("No se encontró el elemento con ID 'selector-categorias'");
        return;
    }

    var datosNombres = localStorage.getItem('Nombres');
    console.log("Datos recuperados:", datosNombres);

    if (datosNombres) {
        select.innerHTML = '<option value="">Selecciona una...</option>';
        
        var listaN = datosNombres.split(',');
        
        for (var i = 0; i < listaN.length; i++) {
            var nombre = listaN[i].trim();
            
            if (nombre !== "") {
                var nuevaOpcion = document.createElement('option');
                nuevaOpcion.text = nombre;
                nuevaOpcion.value = nombre;
                select.add(nuevaOpcion);
            }
        }
    } else {
        console.warn("No hay categorías guardadas en localStorage.");
    }
};