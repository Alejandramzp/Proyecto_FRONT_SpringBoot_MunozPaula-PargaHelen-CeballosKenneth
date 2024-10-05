// 1. Funciones de interactividad

// Función para mostrar u ocultar el sidebar en pantallas pequeñas
document.getElementById("toggleSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
});

// Función para mostrar secciones del contenido principal
function mostrarSeccion(seccionId) {
  // Oculta todas las secciones
  const secciones = document.querySelectorAll('.contenido-seccion');
  secciones.forEach((seccion) => {
    seccion.style.display = 'none';
  });

  // Muestra solo la sección seleccionada
  document.getElementById(seccionId).style.display = 'block';

  // Carga los productos o empleados si es necesario
  if (seccionId === 'verProducto') {
    cargarProductos();
  } else if (seccionId === 'verEmpleado') {
    cargarEmpleados();
  }
}

// 2. Funciones para cargar datos desde la API

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
              <a href="#" class="btn btn-primary">Actualizar</a>
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


// Función para cargar empleados
function cargarEmpleados() {
  fetch('http://172.16.101.161:8080/POS/api/empleado')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar empleados');
      }
      return response.json();
    })
    .then(empleados => {
      const contenedor = document.getElementById('empleadosTarjetas');
      contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos empleados

      empleados.forEach(empleado => {
        const tarjeta = `
          <div class="col-12 col-md-6 col-lg-3 mb-4" id="empleado-${empleado.id_empleado}">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${empleado.nombres} ${empleado.apellidos}</h5>
                <p class="card-text"><strong>ID Empleado:</strong> ${empleado.id_empleado}</p>
                <p class="card-text"><strong>Número de Identificación:</strong> ${empleado.numero_identificacion}</p>
                <p class="card-text"><strong>Teléfono:</strong> ${empleado.telefono || 'No disponible'}</p>
                <p class="card-text"><strong>Dirección:</strong> ${empleado.direccion || 'No disponible'}</p>
                <p class="card-text"><strong>Cargo:</strong> ${empleado.cargo || 'No definido'}</p>
                <p class="card-text"><strong>Estado:</strong> ${empleado.estado}</p>
                <a href="#" class="btn btn-primary">Actualizar</a>
                <a href="#" class="btn btn-danger" onclick="eliminarEmpleado(${empleado.id_empleado})">Eliminar</a>
              </div>
            </div>
          </div>
        `;
        contenedor.innerHTML += tarjeta;
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('No se pudieron cargar los empleados');
    });
}

// 3. Funciones para manejo de formularios

// Función para manejar el envío del formulario de creación de producto
document.getElementById('formCrearProducto').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario

  // Captura los datos del formulario
  const codigoProducto = document.getElementById('codigoProducto').value;
  const nombreProducto = document.getElementById('nombreProducto').value;
  const descripcionProducto = document.getElementById('descripcionProducto').value;
  const precioProducto = parseFloat(document.getElementById('precioProducto').value);
  const cantidadProducto = parseInt(document.getElementById('cantidadProducto').value);
  const estadoProducto = document.getElementById('estadoProducto').value;

  // Crea el objeto del nuevo producto
  const nuevoProducto = {
    codigo_producto: codigoProducto,
    nombre: nombreProducto,
    descripcion: descripcionProducto,
    precio_unitario: precioProducto,
    cantidad_disponible: cantidadProducto,
    estado: estadoProducto
  };

  // Enviar el nuevo producto a la API
  fetch('http://172.16.101.161:8080/POS/api/producto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoProducto)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al crear el producto');
      }
    })
    .then(data => {
      alert('Producto creado con éxito');
      document.getElementById('formCrearProducto').reset(); // Limpia el formulario
    })
    .catch(error => {
      console.error('Error:', error);
      alert('No se pudo crear el producto');
    });
});

// Función para manejar el envío del formulario de creación de empleado
document.getElementById("formCrearEmpleado").addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario

  // Obtener los valores de los campos del formulario
  const numeroIdentificacion = document.getElementById("numeroIdentificacion").value;
  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const direccion = document.getElementById("direccion").value;
  const telefono = document.getElementById("telefono").value;
  const id_rol = document.getElementById("id_rol").value;

  // Crear un objeto con los datos del nuevo empleado
  const nuevoEmpleado = {
    numero_identificacion: numeroIdentificacion,
    nombres: nombres,
    apellidos: apellidos,
    direccion: direccion,
    telefono: telefono,
    id_rol: id_rol,
    estado: 'activo' // Estado por defecto
  };

  // Enviar el nuevo empleado a la API
  fetch('http://172.16.101.161:8080/POS/api/empleado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoEmpleado)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al crear el empleado');
    }
    return response.json();
  })
  .then(data => {
    alert('Empleado creado exitosamente');
    document.getElementById("formCrearEmpleado").reset();
    cargarEmpleados(); // Actualizar la lista de empleados
  })
  .catch(error => {
    console.error('Error:', error);
    alert('No se pudo crear el empleado');
  });
});


//

// Función para eliminar un empleado
function eliminarEmpleado(idEmpleado) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este empleado?');
  if (!confirmacion) {
    return; // Si el usuario cancela, no hacer nada
  }

  fetch(`http://172.16.101.161:8080/POS/api/empleado/${idEmpleado}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar empleado');
      }
      // Después de eliminar, recargar la lista de empleados
      cargarEmpleados();
      alert('Empleado eliminado con éxito');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('No se pudo eliminar el empleado');
    });
}

// Función para eliminar un producto
async function eliminarProducto(idProducto) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
  if (!confirmacion) {
    return; // Si el usuario cancela, no hacer nada
  }

  try {
    const response = await fetch(`http://172.16.101.161:8080/POS/api/producto/${idProducto}`, {
      method: 'DELETE'
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      // Extraer el mensaje de error de la respuesta
      const errorData = await response.json();
      throw new Error(`Error al eliminar producto: ${errorData.message || 'Error desconocido'}`);
    }

    // Recargar la lista de productos
    await cargarProductos();
    alert('Producto eliminado con éxito');
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo eliminar el producto: ' + error.message);
  }
}
