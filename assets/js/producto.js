document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://172.16.101.161:8080/ColorPop/api/productos";
    
    // Elementos del DOM
    const crearProductosBtn = document.getElementById('crear-productos-btn');
    const verProductosBtn = document.getElementById('ver-productos-btn');
    const verProductosSection = document.getElementById('ver-productos');
    const crearProductosSection = document.getElementById('crear-productos');
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    
    let productosOriginales = []; // Para guardar la lista completa de productos

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

    // Eventos de búsqueda
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchBy = searchType.value;
        
        if (searchTerm === '') {
            mostrarProductos(productosOriginales);
            return;
        }
        
        const productosFiltrados = productosOriginales.filter(producto => {
            if (searchBy === 'nombre') {
                return producto.nombre.toLowerCase().includes(searchTerm);
            } else {
                return producto.codigo_producto.toLowerCase().includes(searchTerm);
            }
        });
        
        mostrarProductos(productosFiltrados);
    });

    searchType.addEventListener('change', function() {
        searchInput.value = '';
        mostrarProductos(productosOriginales);
    });

    // Función para mostrar el formulario de creación de productos
    function mostrarFormularioCrear() {
        crearProductosSection.innerHTML = `
            <form id="form-crear-producto" class="product-form">
                <h2>Crear Producto</h2>
                <div class="form-group">
                    <label for="codigo_producto">Código Producto:</label>
                    <input type="text" id="codigo_producto" required placeholder="Ingresa el código del producto.">
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" required placeholder="Ingresa el Nombre del producto.">
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" required placeholder="Ingresa una breve descripcion del producto.">
                </div>
                <div class="form-group">
                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" required placeholder="Ingresa el precio del producto.">
                </div>
                <div class="form-group">
                    <label for="cantidad_disponible">Cantidad Disponible:</label>
                    <input type="number" id="cantidad_disponible" required placeholder="Ingresa la cantidad disponible.">
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
        fetch(baseURL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(productos => {
                productosOriginales = productos; // Guardar los productos originales
                mostrarProductos(productos);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }

    // Función para mostrar productos como tarjetas
function mostrarProductos(productos) {
    const productosGrid = document.getElementById('productos-grid');
    let contenido = '<div class="productos-container">';
    
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

    contenido += '</div>';
    productosGrid.innerHTML = contenido;
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
            Swal.fire(
                'Éxito!',
                'Producto creado con éxito.',
                'success'
            );
            obtenerProductos();
        })
        .catch(error => console.error('Error al crear producto:', error));
    }

    // Función para eliminar un producto
    window.eliminarProducto = function(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar este producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseURL}/${id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        Swal.fire(
                            'Eliminado!',
                            'Producto eliminado con éxito.',
                            'success'
                        );
                        obtenerProductos();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Error al eliminar el producto.',
                            'error'
                        );
                    }
                })
                .catch(error => console.error('Error al eliminar producto:', error));
            } else {
                Swal.fire(
                    'Cancelado',
                    'Eliminación cancelada.',
                    'info'
                );
            }
        });
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
            Swal.fire(
                'Actualizado!',
                'Producto actualizado con éxito.',
                'success'
            );
            obtenerProductos();
        })
        .catch(error => console.error('Error al actualizar el producto:', error));
    }
});