// Funciones de interactividad

// Función para mostrar u ocultar el sidebar en pantallas pequeñas
document.getElementById("toggleSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
});

// Función para mostrar secciones del contenido principal
function mostrarSeccion(seccionId) {
  // Oculta la sección de bienvenida
  document.getElementById('bienvenida').style.display = 'none';

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

// Agregar evento al logo para mostrar la sección de bienvenida nuevamente
document.querySelector('.navbar-brand').addEventListener('click', function () {
  document.getElementById('bienvenida').style.display = 'block'; // Muestra la sección de bienvenida
  const secciones = document.querySelectorAll('.contenido-seccion');
  secciones.forEach((seccion) => {
      seccion.style.display = 'none'; // Oculta todas las otras secciones
  });
});
