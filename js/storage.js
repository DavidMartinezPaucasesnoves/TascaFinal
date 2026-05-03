function borrarCategoria(index) {
    var listaN = localStorage.getItem('Nombres').split(',');
    var listaC = localStorage.getItem('Colores').split(',');

    listaN.splice(index, 1);
    listaC.splice(index, 1);

    localStorage.setItem('Nombres', listaN.join(','));
    localStorage.setItem('Colores', listaC.join(','));

    if (typeof actualizarInterfaz === 'function') {
        actualizarInterfaz();
    }
}