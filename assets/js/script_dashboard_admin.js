function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.contenido-seccion');
    secciones.forEach((seccion) => {
      seccion.style.display = 'none';
    });
    document.getElementById(seccionId).style.display = 'block';
  
    if (seccionId === 'verProducto') {
      cargarProductos();
    } else if (seccionId === 'verEmpleado') {
      cargarEmpleados();
    }
  }
  
  function cargarProductos() {
    const productos = [
      { nombre: 'Base Líquida', descripcion: 'Base mate para piel grasa', imagen: 'base.jpg' },
      { nombre: 'Labial Rojo', descripcion: 'Labial duradero', imagen: 'labial.jpg' },
      { nombre: 'Sombra Ojos', descripcion: 'Paleta de sombras', imagen: 'sombras.jpg' },
      
      { nombre: 'Rimel Volumen', descripcion: 'Rimel resistente al agua', imagen: 'rimel.jpg' }
    ];
  
    const contenedor = document.getElementById('productosTarjetas');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
      const tarjeta = `
        <div class="col-12 col-md-6 col-lg-3 mb-4"> <!-- Ajuste de columnas -->
          <div class="card h-100"> <!-- h-100 para hacer que todas las tarjetas tengan la misma altura -->
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <a href="#" class="btn btn-primary">Actualizar</a>
              <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += tarjeta;
    });
  }
  
  function cargarEmpleados() {
    const empleados = [
      { nombre: 'Juan Pérez', descripcion: 'Vendedor', imagen: 'empleado1.jpg' },
      { nombre: 'Ana Gómez', descripcion: 'Gerente', imagen: 'empleado2.jpg' },
      { nombre: 'Carlos Díaz', descripcion: 'Cajero', imagen: 'empleado3.jpg' },
      { nombre: 'Lucía Rivera', descripcion: 'Atención al Cliente', imagen: 'empleado4.jpg' }
    ];
  
    const contenedor = document.getElementById('empleadosTarjetas');
    contenedor.innerHTML = '';
    empleados.forEach(empleado => {
      const tarjeta = `
        <div class="col-12 col-md-6 col-lg-3 mb-4"> <!-- Ajuste de columnas -->
          <div class="card h-100">
            <img src="${empleado.imagen}" class="card-img-top" alt="${empleado.nombre}">
            <div class="card-body">
              <h5 class="card-title">${empleado.nombre}</h5>
              <p class="card-text">${empleado.descripcion}</p>
              <a href="#" class="btn btn-primary">Actualizar</a>
              <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += tarjeta;
    });
  }
  