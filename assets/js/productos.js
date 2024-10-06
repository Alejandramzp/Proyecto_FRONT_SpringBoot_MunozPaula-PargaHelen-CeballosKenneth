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
              <a href="#" class="btn btn-danger" onclick="eliminarProducto(${producto.id_producto}, true)">Eliminar Forzado</a>
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

async function eliminarProducto(idProducto, forzar = false) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.' + (forzar ? ' Se eliminará forzosamente.' : ''));
  if (!confirmacion) return;

  try {
      // Construir la URL con el parámetro de forzar
      const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${idProducto}?force=${forzar}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Datos del error:', errorData);
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

// Función para abrir el modal de actualización y cargar los datos del producto
// Función para abrir el modal con los datos del empleado a actualizar
function abrirActualizarModal(idEmpleado) {
  fetch(`http://172.16.101.161:8080/POS/api/empleado/${idEmpleado}`)
      .then(response => response.json())
      .then(empleado => {
          document.getElementById('empleadoId').value = empleado.id_empleado;
          document.getElementById('numeroIdentificacionActualizar').value = empleado.numero_identificacion;
          document.getElementById('nombresActualizar').value = empleado.nombres;
          document.getElementById('apellidosActualizar').value = empleado.apellidos;
          document.getElementById('direccionActualizar').value = empleado.direccion;
          document.getElementById('telefonoActualizar').value = empleado.telefono;

          // Obtener el nombre del rol aquí
          const nombreRol = empleado.rol ? empleado.rol.nombre_rol : 'No definido';
          document.getElementById('cargoEmpleadoActualizar').value = nombreRol; // Asigna el nombre del rol

          document.getElementById('estadoEmpleadoActualizar').value = empleado.estado;

          $('#actualizarEmpleadoModal').modal('show');
      })
      .catch(error => console.error('Error:', error));
}

// Manejo del formulario para actualizar producto
document.getElementById('formActualizarProducto').addEventListener('submit', function (event) {
  event.preventDefault();

  const productoActualizado = {
    id_producto: document.getElementById('productoId').value,
    codigo_producto: document.getElementById('codigoProductoActualizar').value,
    nombre: document.getElementById('nombreProductoActualizar').value,
    descripcion: document.getElementById('descripcionProductoActualizar').value,
    precio_unitario: parseFloat(document.getElementById('precioProductoActualizar').value),
    cantidad_disponible: parseInt(document.getElementById('cantidadProductoActualizar').value),
    estado: document.getElementById('estadoProductoActualizar').value
  };

  // Petición para actualizar el producto
  fetch(`http://172.16.101.161:8080/POS/api/producto/${productoActualizado.id_producto}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoActualizado)
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al actualizar el producto');
      return response.json();
    })
    .then(data => {
      alert('Producto actualizado con éxito');
      $('#actualizarProductoModal').modal('hide');
      cargarProductos();  // Recargar la lista de productos
    })
    .catch(error => {
      console.error('Error:', error);
      alert('No se pudo actualizar el producto');
    });
});
