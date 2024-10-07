document.addEventListener("DOMContentLoaded", function() {
    const verProductosBtn = document.getElementById('ver-productos-btn');
    const productosSection = document.getElementById('ver-productos');
    
    // Función para obtener productos desde la API
    async function fetchProductos() {
        try {
            const response = await fetch('http://172.16.101.161:8080/POS/api/producto');
            const productos = await response.json();
            displayProductos(productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    // Función para mostrar los productos en tarjetas
    function displayProductos(productos) {
        // Limpiar el contenido anterior
        productosSection.innerHTML = '<h1>Lista de Productos</h1>';

        // Crear un contenedor para los productos
        const productoContainer = document.createElement('div');
        productoContainer.classList.add('producto-container');

        productos.forEach(producto => {
            // Crear la tarjeta para cada producto
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');

            // Añadir los datos del producto
            productoCard.innerHTML = `
                <p><strong>Código:</strong> ${producto.codigo_producto}</p>
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                <p><strong>Precio Unitario:</strong> $${producto.precio_unitario}</p>
                <p><strong>Cantidad Disponible:</strong> ${producto.cantidad_disponible}</p>
                <p><strong>Estado:</strong> ${producto.estado}</p>
                <button class="editar-btn" data-id="${producto.id_Producto}">Editar</button>
                <button class="eliminar-btn" data-id="${producto.id_Producto}">Eliminar</button>
            `;

            // Añadir la tarjeta al contenedor
            productoContainer.appendChild(productoCard);
        });

        // Añadir el contenedor de productos a la sección
        productosSection.appendChild(productoContainer);

        // Agregar eventos a los botones de Editar y Eliminar
        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productoId = this.dataset.id;
                editarProducto(productoId);
            });
        });

        document.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productoId = this.dataset.id;
                eliminarProducto(productoId);
            });
        });
    }

    // Función para manejar la edición de productos (Por definir funcionalidad)
    function editarProducto(id) {
        alert('Editar producto con ID: ' + id);
        // Lógica para editar productos
    }

    // Función para eliminar productos
async function eliminarProducto(id) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmacion) {
        try {
            const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Producto eliminado exitosamente');
                // Vuelve a cargar los productos
                fetchProductos();
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}


    // Cargar productos cuando se haga clic en "Ver Productos"
    verProductosBtn.addEventListener('click', function() {
        fetchProductos();
    });
});
