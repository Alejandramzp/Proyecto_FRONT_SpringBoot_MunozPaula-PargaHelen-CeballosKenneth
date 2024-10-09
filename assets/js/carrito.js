// carrito.js

// Variables globales
let carrito = [];
let productos = [];

// Cargar productos desde la API
function cargarProductos() {
    fetch('http://172.16.101.161:8080/ColorPop/api/productos')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })
        .catch(error => console.error('Error:', error));
}

// Mostrar productos en la página
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar lista antes de volver a cargar

    productos.forEach(producto => {
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

// Inicialmente cargar los productos cuando la página se carga
cargarProductos();

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto || producto.cantidad_disponible <= 0) {
        alert('Este producto no está disponible');
        return;
    }

    const itemCarrito = carrito.find(item => item.id === idProducto);
    if (itemCarrito) {
        if (itemCarrito.cantidad < producto.cantidad_disponible) {
            itemCarrito.cantidad++;
        } else {
            alert('No hay suficiente stock');
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Actualizar el carrito en pantalla
function actualizarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody');
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

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('iva').textContent = iva.toFixed(2);
    document.getElementById('total-venta').textContent = total.toFixed(2);
}

// Eliminar una unidad del carrito
function eliminarUno(idProducto) {
    const itemCarrito = carrito.find(item => item.id === idProducto);
    if (itemCarrito && itemCarrito.cantidad > 1) {
        itemCarrito.cantidad--;
    } else {
        carrito = carrito.filter(item => item.id !== idProducto); // Si solo queda uno, lo elimina
    }
    actualizarCarrito();
}

// Eliminar todos los productos del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

// Actualizar el stock en el backend
function actualizarStockProducto(idProducto, nuevaCantidad) {
    return fetch(`http://172.16.101.161:8080/ColorPop/api/productos/${idProducto}/cantidad`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad_disponible: nuevaCantidad })
    });
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const actualizaciones = carrito.map(item => {
        const producto = productos.find(p => p.id === item.id);
        const nuevaCantidadDisponible = producto.cantidad_disponible - item.cantidad;
        return actualizarStockProducto(item.id, nuevaCantidadDisponible);
    });

    Promise.all(actualizaciones)
        .then(() => {
            alert('Compra finalizada exitosamente');
            carrito = [];
            actualizarCarrito();
            cargarProductos();
        })
        .catch(error => {
            console.error('Error al actualizar el stock:', error);
            alert('Hubo un problema al finalizar la compra');
        });
});


// Filtrar productos en base al término de búsqueda
function filtrarProductos() {
    const terminoBusqueda = document.getElementById('busqueda').value.toLowerCase();
    
    const productosFiltrados = productos.filter(producto => 
        producto.codigo_producto.toString().toLowerCase().includes(terminoBusqueda) ||
        producto.nombre.toLowerCase().includes(terminoBusqueda)
    );
    
    mostrarProductos(productosFiltrados);
}

// Modifica la función mostrarProductos para aceptar una lista de productos a mostrar
function mostrarProductos(productosAMostrar = productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar lista antes de volver a cargar

    productosAMostrar.forEach(producto => {
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

// Modifica cargarProductos para que, al final, filtre los productos con el término actual de búsqueda
function cargarProductos() {
    fetch('http://172.16.101.161:8080/ColorPop/api/productos')
        .then(response => response.json())
        .then(data => {
            productos = data;
            filtrarProductos(); // Filtra con el término de búsqueda actual
        })
        .catch(error => console.error('Error:', error));
}
