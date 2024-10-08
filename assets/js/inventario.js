document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://172.16.101.161:8080/ColorPop/api/productos";

    // Elementos del DOM
    const verInventarioBtn = document.getElementById('ver-inventario-btn');
    const verInventarioSection = document.getElementById('ver-inventario');

    // Mostrar/ocultar secciones
    verInventarioBtn.addEventListener("click", () => {
        verInventarioSection.style.display = "block";
        obtenerInventario();
    });

    // Función para obtener inventario
    function obtenerInventario() {
        fetch(baseURL)
            .then(response => response.json())
            .then(productos => {
                mostrarInventario(productos);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }

    // Función para mostrar el inventario
    function mostrarInventario(productos) {
        // Inicializamos el contenedor de inventario
        let contenido = '<div class="inventario-container">';
        
        // Iteramos sobre los productos y generamos una lista con el nombre y la cantidad
        productos.forEach(producto => {
            contenido += `
                <div class="inventario-item">
                    <h3>${producto.nombre}</h3>
                    <p><strong>Cantidad disponible:</strong><br> ${producto.cantidad_disponible}</p>
                </div>
            `;
        });

        // Cerramos el contenedor
        contenido += '</div>';
        
        // Insertamos el contenido generado en la sección correspondiente
        verInventarioSection.innerHTML = contenido;
    }
});
