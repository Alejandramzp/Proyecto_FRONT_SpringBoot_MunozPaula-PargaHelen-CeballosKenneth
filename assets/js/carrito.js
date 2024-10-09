// Variables globales
let carrito = [];
let productos = [];
let productosFiltrados = [];

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    const inputBusqueda = document.getElementById('busqueda');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', buscarProductos);
    }
    
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', finalizarCompra);
    }

    cargarProductos(); // Cargar productos desde la API
});

// Cargar productos desde la API
function cargarProductos() {    
    fetch('http://172.16.101.161:8080/ColorPop/api/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Autenticación con token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar productos. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        productos = data;
        productosFiltrados = [...productos];
        mostrarProductos(); // Mostrar los productos en la interfaz
    })
    .catch(error => {
        console.error('Error al cargar productos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos. Por favor, intente más tarde.',
        });
    });
}


// Función para buscar productos
function buscarProductos(event) {
    const query = event.target.value.toLowerCase().trim();
    
    productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(query) || 
        producto.descripcion.toLowerCase().includes(query)
    );
    
    mostrarProductos();
}

// Mostrar productos en la página
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    if (!listaProductos) return;
    
    listaProductos.innerHTML = '';

    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Disponibles: ${producto.cantidad_disponible}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto || producto.cantidad_disponible <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Producto no disponible',
            text: 'Este producto no está disponible en stock',
        });
        return;
    }

    const itemCarrito = carrito.find(item => item.id === idProducto);
    if (itemCarrito) {
        if (itemCarrito.cantidad < producto.cantidad_disponible) {
            itemCarrito.cantidad++;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Sin stock suficiente',
                text: 'No hay suficiente stock para agregar más unidades',
            });
            return;
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    
    
}

// Actualizar el carrito en pantalla
function actualizarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    let subtotal = 0;

    carrito.forEach(item => {
        const totalProducto = item.precio * item.cantidad;
        subtotal += totalProducto;
    
        const fila = document.createElement('tr');
        fila.style.backgroundColor = "var(--light)";
        fila.style.color = "var(--dark)";
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio}</td>
            <td>$${totalProducto.toFixed(2)}</td>
            <td>
                <button onclick="eliminarUno(${item.id})">Eliminar Uno</button>
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar Todos</button>
            </td>
        `;
        tbody.appendChild(fila);
    });    

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const subtotalElement = document.getElementById('subtotal');
    const ivaElement = document.getElementById('iva');
    const totalElement = document.getElementById('total-venta');

    if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2);
    if (ivaElement) ivaElement.textContent = iva.toFixed(2);
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

// Eliminar una unidad del carrito
function eliminarUno(idProducto) {
    const itemCarrito = carrito.find(item => item.id === idProducto);
    if (itemCarrito && itemCarrito.cantidad > 1) {
        itemCarrito.cantidad--;
    } else {
        carrito = carrito.filter(item => item.id !== idProducto);
    }
    actualizarCarrito();
}

// Eliminar todos los productos del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

function actualizarStockProducto(idProducto, nuevaCantidad) {
    return fetch(`http://172.16.101.161:8080/ColorPop/api/productos/${idProducto}/cantidad`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token de autenticación
        },
        body: JSON.stringify({ cantidad_disponible: nuevaCantidad })
    });
}


// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'El carrito está vacío. No puedes proceder con la compra.',
        });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas finalizar la compra?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompra();
        }
    });
}

// Procesar la compra
function procesarCompra() {
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    
    const actualizaciones = carrito.map(item => {
        const producto = productos.find(p => p.id === item.id);
        const nuevaCantidadDisponible = producto.cantidad_disponible - item.cantidad;
        return actualizarStockProducto(item.id, nuevaCantidadDisponible);
    });

    Promise.all(actualizaciones)
        .then(() => {
            // Crear el objeto venta para enviarlo a la API
            const venta = {
                numero_venta: generarNumeroVenta(), // función que genere un número de venta único
                fecha: new Date().toISOString(), // Fecha actual en formato ISO
                total: totalCompra.toFixed(2) // Total de la venta
            };

            // Enviar la venta a la API
            return fetch('http://172.16.101.161:8080/ColorPop/api/ventas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(venta)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar la venta');
            }
            return response.json();
        })
        .then(ventaGuardada => {
            // Guardar los detalles de la venta
            const detalles = carrito.map(item => ({
                id_venta: ventaGuardada, // Relacionar con la venta guardada
                id_producto: item, // Producto comprado
                cantidad: item.cantidad,
                precio_unidad: item.precio
            }));

            // Enviar los detalles de la venta a la API
            return Promise.all(detalles.map(detalle =>
                fetch('http://172.16.101.161:8080/ColorPop/api/detalles_ventas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(detalle)
                })
            ));
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Compra finalizada',
                text: 'La compra se ha realizado exitosamente',
            });
            carrito = [];
            actualizarCarrito();
            cargarProductos();
            cargarTotalVentasMes(); // Volvemos a cargar el total de ventas del mes            
        })
        .catch(error => {
            console.error('Error al finalizar la compra:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al finalizar la compra. Intenta nuevamente.',
            });
        });
}


function generarNumeroVenta() {
    // Puedes generar un número de venta único, por ejemplo, usando la fecha o un contador
    const numero = Math.floor(Math.random() * 10000) + 1;
    return `V${numero.toString().padStart(3, '0')}`;
}
