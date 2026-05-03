function guardarCategoria() {
  var nombre = document.getElementById('nombre-cat').value;
  var color = document.getElementById('color-cat').value;

  if (nombre == "") {
    alert("Escribe un nombre");
    return;
  }

  var nombresViejos = localStorage.getItem('misNombres') || "";
  var coloresViejos = localStorage.getItem('misColores') || "";

  localStorage.setItem('misNombres', nombresViejos + nombre + ",");
  localStorage.setItem('misColores', coloresViejos + color + ",");

  alert("Guardado!");
  document.getElementById('nombre-cat').value = "";
}
