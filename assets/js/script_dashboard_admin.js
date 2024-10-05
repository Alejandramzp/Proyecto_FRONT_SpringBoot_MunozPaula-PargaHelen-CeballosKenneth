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

// Función para cargar productos desde la API
async function cargarProductos() {
  try {
    const response = await fetch('http://172.16.101.161:8080/POS/api/producto'); // Cambia esta URL por la correcta de tu API
    const productos = await response.json();

    const contenedor = document.getElementById('productosTarjetas');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
      const tarjeta = `
        <div class="col-12 col-md-6 col-lg-3 mb-4">
          <div class="card h-100">
<!-- 
            <img src="${producto.imagen || '/assets/img/default-producto.jpg'}" class="card-img-top" alt="${producto.nombre}">  Cambia la URL por defecto si es necesario
            -->     
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">Precio: $${producto.precio_unitario || 'N/A'}</p> <!-- Asegúrate de que el objeto producto tenga el campo precio -->
              <a href="#" class="btn btn-primary">Actualizar</a>
              <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += tarjeta;
    });
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    // Manejo de errores si es necesario
  }
}


// Función para cargar empleados desde la API
async function cargarEmpleados() {
  try {
    const response = await fetch('http://172.16.101.161:8080/POS/api/empleado');
    const empleados = await response.json();

    const contenedor = document.getElementById('empleadosTarjetas');
    contenedor.innerHTML = '';

    empleados.forEach(empleado => {
      const tarjeta = `
        <div class="col-12 col-md-6 col-lg-3 mb-4">
          <div class="card h-100">
          <!--
            <img src="/assets/img/default-empleado.jpg" class="card-img-top" alt="${empleado.nombres} ${empleado.apellidos}">  Reemplaza con la imagen correcta si la tienes
            -->
            <div class="card-body">
              <h5 class="card-title">${empleado.nombres} ${empleado.apellidos}</h5>
              <p class="card-text">ID: ${empleado.id_empleado}</p>
              <p class="card-text">Rol: ${empleado.rol.nombre_rol}</p>
              <p class="card-text">Estado: ${empleado.estado}</p>
              <a href="#" class="btn btn-primary">Actualizar</a>
              <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += tarjeta;
    });
  } catch (error) {
    console.error('Error al cargar los empleados:', error);
    // Manejo de errores si es necesario
  }
}



// 
