document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://172.16.101.161:8080/ColorPop/api/productos";
    let todosLosProductos = []; // Variable para almacenar todos los productos

    // Elementos del DOM
    const verInventarioBtn = document.getElementById('ver-inventario-btn');
    const verInventarioSection = document.getElementById('ver-inventario');
    const inputBusqueda = document.getElementById('busqueda-inventario');

    // Mostrar/ocultar secciones
    verInventarioBtn.addEventListener("click", () => {
        verInventarioSection.style.display = "block";
        obtenerInventario();
    });

    // Función para obtener inventario
function obtenerInventario() {    
    fetch(baseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al obtener productos. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(productos => {
        todosLosProductos = productos; // Guardamos todos los productos
        mostrarInventario(productos);   // Mostrar los productos en el DOM
    })
    .catch(error => {
        console.error('Error al obtener productos:', error);
        Swal.fire(
            'Error!',
            'Hubo un problema al obtener el inventario de productos.',
            'error'
        );
    });
}


    // Función para mostrar el inventario (con divs)
    function mostrarInventario(productos) {
        const inventarioContainer = document.createElement('div');
        inventarioContainer.classList.add('inventario-container');
        
        // Limpiamos el contenido previo de la sección de inventario
        verInventarioSection.querySelector('.inventario-container')?.remove();

        // Iteramos sobre los productos y generamos divs con el estilo anterior
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('inventario-item');
            item.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p><strong>Precio:</strong><br>${producto.precio}</p>
                <p><strong>Código:</strong><br>${producto.codigo_producto}</p>
                <p><strong>Cantidad disponible:</strong><br> ${producto.cantidad_disponible}</p>
            `;
            inventarioContainer.appendChild(item);
        });

        // Insertamos el inventario generado en la sección correspondiente
        verInventarioSection.appendChild(inventarioContainer);
    }

    // Función para realizar la búsqueda
    function realizarBusqueda(event) {
        const terminoBusqueda = event.target.value.toLowerCase();
        
        const productosFiltrados = todosLosProductos.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda)
        );

        mostrarInventario(productosFiltrados); // Mostramos los productos filtrados
    }

    // Configuramos la búsqueda solo una vez
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', realizarBusqueda);
    }
});
