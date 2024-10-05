// Función para cargar productos
async function cargarProductos() {
    try {
      const response = await fetch('http://172.16.101.161:8080/POS/api/producto');
      const productos = await response.json();
      const contenedor = document.getElementById('productosTarjetas');
      contenedor.innerHTML = '';
  
      productos.forEach(producto => {
        const tarjeta = `
          <div class="col-12 col-md-6 col-lg-3 mb-4" id="producto-${producto.id_producto}">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text"><strong>Código:</strong> ${producto.codigo_producto}</p>
                <p class="card-text"><strong>Descripción:</strong> ${producto.descripcion}</p>
                <p class="card-text"><strong>Precio:</strong> $${producto.precio_unitario || 'N/A'}</p>
                <p class="card-text"><strong>Cantidad disponible:</strong> ${producto.cantidad_disponible}</p>
                <p class="card-text"><strong>Estado:</strong> ${producto.estado}</p>
                <a href="#" class="btn btn-primary" onclick="abrirModalActualizar(${producto.id_producto})">Actualizar</a>
                <a href="#" class="btn btn-danger" onclick="eliminarProducto(${producto.id_producto})">Eliminar</a>
              </div>
            </div>
          </div>
        `;
        contenedor.innerHTML += tarjeta;
      });
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }
  
  // Función para eliminar un producto
  async function eliminarProducto(idProducto) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${idProducto}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar producto: ${errorData.message || 'Error desconocido'}`);
      }
  
      await cargarProductos();
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo eliminar el producto: ' + error.message);
    }
  }
  
  // Manejo de formulario para crear producto
  document.getElementById('formCrearProducto').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const nuevoProducto = {
      codigo_producto: document.getElementById('codigoProducto').value,
      nombre: document.getElementById('nombreProducto').value,
      descripcion: document.getElementById('descripcionProducto').value,
      precio_unitario: parseFloat(document.getElementById('precioProducto').value),
      cantidad_disponible: parseInt(document.getElementById('cantidadProducto').value),
      estado: document.getElementById('estadoProducto').value
    };
  
    fetch('http://172.16.101.161:8080/POS/api/producto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al crear el producto');
        return response.json();
      })
      .then(data => {
        alert('Producto creado con éxito');
        document.getElementById('formCrearProducto').reset();
        cargarProductos();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('No se pudo crear el producto');
      });
  });
  
  // Función para abrir modal de actualización
  async function abrirModalActualizar(idProducto) {
    try {
      const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${idProducto}`);
      const producto = await response.json();
  
      document.getElementById('productoId').value = producto.id_producto;
      document.getElementById('codigoProductoActualizar').value = producto.codigo_producto;
      document.getElementById('nombreProductoActualizar').value = producto.nombre;
      document.getElementById('descripcionProductoActualizar').value = producto.descripcion;
      document.getElementById('precioProductoActualizar').value = producto.precio_unitario;
      document.getElementById('cantidadProductoActualizar').value = producto.cantidad_disponible;
      document.getElementById('estadoProductoActualizar').value = producto.estado;
  
      $('#actualizarProductoModal').modal('show');
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  }
  
  document.getElementById('formActualizarProducto').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const idProducto = document.getElementById('productoId').value;
    const productoActualizado = {
      codigo_producto: document.getElementById('codigoProductoActualizar').value,
      nombre: document.getElementById('nombreProductoActualizar').value,
      descripcion: document.getElementById('descripcionProductoActualizar').value,
      precio_unitario: document.getElementById('precioProductoActualizar').value,
      cantidad_disponible: document.getElementById('cantidadProductoActualizar').value,
      estado: document.getElementById('estadoProductoActualizar').value,
    };
  
    try {
      const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${idProducto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });
  
      if (response.ok) {
        alert('Producto actualizado correctamente');
        $('#actualizarProductoModal').modal('hide');
        cargarProductos();
      } else {
        console.error('Error al actualizar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  });
  