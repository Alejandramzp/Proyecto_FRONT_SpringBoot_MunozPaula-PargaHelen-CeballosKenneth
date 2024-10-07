document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://172.16.101.161:8080/ColorPop/api/productos";
    
    // Elementos del DOM
    const crearProductosBtn = document.getElementById('crear-productos-btn');
    const verProductosBtn = document.getElementById('ver-productos-btn');
    const verProductosSection = document.getElementById('ver-productos');
    const crearProductosSection = document.getElementById('crear-productos');

    // Mostrar/ocultar secciones
    crearProductosBtn.addEventListener("click", () => {
        crearProductosSection.style.display = "block";
        verProductosSection.style.display = "none";
        mostrarFormularioCrear();
    });

    verProductosBtn.addEventListener("click", () => {
        crearProductosSection.style.display = "none";
        verProductosSection.style.display = "block";
        obtenerProductos();
    });

    // Función para mostrar el formulario de creación de productos
function mostrarFormularioCrear() {
    crearProductosSection.innerHTML = `
        <form id="form-crear-producto" class="product-form">
            <h2>Crear Producto</h2>
            <div class="form-group">
                <label for="codigo_producto">Código Producto:</label>
                <input type="text" id="codigo_producto" required>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required>
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" required>
            </div>
            <div class="form-group">
                <label for="precio">Precio:</label>
                <input type="number" id="precio" required>
            </div>
            <div class="form-group">
                <label for="cantidad_disponible">Cantidad Disponible:</label>
                <input type="number" id="cantidad_disponible" required>
            </div>
            <button type="submit" class="submit-btn">Crear Producto</button>
        </form>
    `;

    // Evento de envío del formulario
    document.getElementById('form-crear-producto').addEventListener('submit', function(event) {
        event.preventDefault();
        const nuevoProducto = {
            codigo_producto: document.getElementById('codigo_producto').value,
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: parseFloat(document.getElementById('precio').value),
            cantidad_disponible: parseInt(document.getElementById('cantidad_disponible').value)
        };
        crearProducto(nuevoProducto);
    });
}

    // Función para obtener productos
    function obtenerProductos() {
        fetch(baseURL)
            .then(response => response.json())
            .then(productos => {
                mostrarProductos(productos);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }

    // Función para mostrar productos como tarjetas
function mostrarProductos(productos) {
    // Inicializamos el contenedor de productos
    let contenido = '<div class="productos-container">';
    
    // Iteramos sobre los productos y generamos una tarjeta para cada uno
    productos.forEach(producto => {
        contenido += `
            <div class="producto-card">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p><strong>Código:</strong> ${producto.codigo_producto}</p>
                    <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <p><strong>Cantidad disponible:</strong> ${producto.cantidad_disponible}</p>
                </div>
                <div class="producto-actions">
                    <button onclick="editarProducto(${producto.id})">Editar</button>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    // Cerramos el contenedor
    contenido += '</div>';
    
    // Insertamos el contenido generado en la sección correspondiente
    verProductosSection.innerHTML = contenido;
}


    // Función para crear un producto
    function crearProducto(producto) {
        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.json())
        .then(data => {
            alert('Producto creado con éxito');
            obtenerProductos();
        })
        .catch(error => console.error('Error al crear producto:', error));
    }

    // Función para eliminar un producto
    window.eliminarProducto = function(id) {
        fetch(`${baseURL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado con éxito');
                obtenerProductos();
            } else {
                alert('Error al eliminar el producto');
            }
        })
        .catch(error => console.error('Error al eliminar producto:', error));
    };

    // Función para editar un producto
window.editarProducto = function(id) {
    fetch(`${baseURL}/${id}`)
        .then(response => response.json())
        .then(producto => {
            crearProductosSection.style.display = "block";
            verProductosSection.style.display = "none";
            
            crearProductosSection.innerHTML = `
                <form id="form-editar-producto" class="product-form">
                    <h2>Editar Producto</h2>
                    <div class="form-group">
                        <label for="codigo_producto">Código Producto:</label>
                        <input type="text" id="codigo_producto" value="${producto.codigo_producto}" required>
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" value="${producto.nombre}" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" value="${producto.descripcion}" required>
                    </div>
                    <div class="form-group">
                        <label for="precio">Precio:</label>
                        <input type="number" id="precio" value="${producto.precio}" required>
                    </div>
                    <div class="form-group">
                        <label for="cantidad_disponible">Cantidad Disponible:</label>
                        <input type="number" id="cantidad_disponible" value="${producto.cantidad_disponible}" required>
                    </div>
                    <button type="submit" class="submit-btn">Actualizar Producto</button>
                </form>
            `;

            document.getElementById('form-editar-producto').addEventListener('submit', function(event) {
                event.preventDefault();
                const productoActualizado = {
                    codigo_producto: document.getElementById('codigo_producto').value,
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio: parseFloat(document.getElementById('precio').value),
                    cantidad_disponible: parseInt(document.getElementById('cantidad_disponible').value)
                };
                actualizarProducto(id, productoActualizado);
            });
        })
        .catch(error => console.error('Error al obtener el producto:', error));
};

    // Función para actualizar un producto
    function actualizarProducto(id, producto) {
        fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.json())
        .then(data => {
            alert('Producto actualizado con éxito');
            obtenerProductos();
        })
        .catch(error => console.error('Error al actualizar el producto:', error));
    }
});
