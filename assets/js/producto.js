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
            <form id="form-crear-producto">
                <label for="codigo_producto">Código Producto:</label>
                <input type="text" id="codigo_producto" required><br>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required><br>
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" required><br>
                <label for="precio">Precio:</label>
                <input type="number" id="precio" required><br>
                <label for="cantidad_disponible">Cantidad Disponible:</label>
                <input type="number" id="cantidad_disponible" required><br>
                <button type="submit">Crear Producto</button>
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

    // Función para mostrar productos
    function mostrarProductos(productos) {
        let contenido = '<table>';
        contenido += '<tr><th>ID</th><th>Código</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Cantidad</th><th>Acciones</th></tr>';
        
        productos.forEach(producto => {
            contenido += `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.codigo_producto}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.cantidad_disponible}</td>
                    <td>
                        <button onclick="editarProducto(${producto.id})">Editar</button>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        contenido += '</table>';
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
                    <form id="form-editar-producto">
                        <label for="codigo_producto">Código Producto:</label>
                        <input type="text" id="codigo_producto" value="${producto.codigo_producto}" required><br>
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" value="${producto.nombre}" required><br>
                        <label for="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" value="${producto.descripcion}" required><br>
                        <label for="precio">Precio:</label>
                        <input type="number" id="precio" value="${producto.precio}" required><br>
                        <label for="cantidad_disponible">Cantidad Disponible:</label>
                        <input type="number" id="cantidad_disponible" value="${producto.cantidad_disponible}" required><br>
                        <button type="submit">Actualizar Producto</button>
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
