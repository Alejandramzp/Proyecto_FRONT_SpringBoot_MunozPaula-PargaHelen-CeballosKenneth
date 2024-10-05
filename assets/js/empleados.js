// Función para cargar empleados
function cargarEmpleados() {
    fetch('http://172.16.101.161:8080/POS/api/empleado')
      .then(response => response.json())
      .then(empleados => {
        const contenedor = document.getElementById('empleadosTarjetas');
        contenedor.innerHTML = '';

        empleados.forEach(empleado => {
          const nombreRol = empleado.rol ? empleado.rol.nombre_rol : 'No definido';

          const tarjeta = `
            <div class="col-12 col-md-6 col-lg-3 mb-4" id="empleado-${empleado.id_empleado}">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">${empleado.nombres} ${empleado.apellidos}</h5>
                  <p class="card-text"><strong>ID Empleado:</strong> ${empleado.id_empleado}</p>
                  <p class="card-text"><strong>Número de Identificación:</strong> ${empleado.numero_identificacion}</p>
                  <p class="card-text"><strong>Teléfono:</strong> ${empleado.telefono || 'No disponible'}</p>
                  <p class="card-text"><strong>Dirección:</strong> ${empleado.direccion || 'No disponible'}</p>
                  <p class="card-text"><strong>Cargo:</strong> ${nombreRol}</p>
                  <p class="card-text"><strong>Estado:</strong> ${empleado.estado}</p>
                  <a href="#" class="btn btn-primary" onclick="abrirActualizarModal(${empleado.id_empleado})">Actualizar</a>
                  <a href="#" class="btn btn-danger" onclick="eliminarEmpleado(${empleado.id_empleado})">Eliminar</a>
                </div>
              </div>
            </div>
          `;
          contenedor.innerHTML += tarjeta;
        });
      })
      .catch(error => console.error('Error:', error));
}

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
            document.getElementById('cargoEmpleadoActualizar').value = empleado.id_rol;
            document.getElementById('estadoEmpleadoActualizar').value = empleado.estado; // Nuevo campo de estado

            $('#actualizarEmpleadoModal').modal('show');
        })
        .catch(error => console.error('Error:', error));
}

// Manejo de formulario para actualizar empleado
document.getElementById("formActualizarEmpleado").addEventListener("submit", function (event) {
    event.preventDefault();

    const idEmpleado = document.getElementById("empleadoId").value;
    const empleadoActualizado = {
        numero_identificacion: document.getElementById("numeroIdentificacionActualizar").value,
        nombres: document.getElementById("nombresActualizar").value,
        apellidos: document.getElementById("apellidosActualizar").value,
        direccion: document.getElementById("direccionActualizar").value,
        telefono: document.getElementById("telefonoActualizar").value,
        id_rol: document.getElementById("cargoEmpleadoActualizar").value,
        estado: document.getElementById("estadoEmpleadoActualizar").value // Enviar el estado seleccionado
    };

    fetch(`http://172.16.101.161:8080/POS/api/empleado/${idEmpleado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleadoActualizado)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar el empleado');
        $('#actualizarEmpleadoModal').modal('hide');
        cargarEmpleados();
        alert('Empleado actualizado exitosamente');
    })
    .catch(error => console.error('Error:', error));
});

  
// Función para eliminar un empleado
function eliminarEmpleado(idEmpleado) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (!confirmacion) {
      return;
    }
  
    fetch(`http://172.16.101.161:8080/POS/api/empleado/${idEmpleado}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar empleado');
        }
        cargarEmpleados();
        alert('Empleado eliminado con éxito');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('No se pudo eliminar el empleado');
      });
}

// Manejo de formulario para crear empleado
document.getElementById("formCrearEmpleado").addEventListener("submit", function (event) {
    event.preventDefault();

    const nuevoEmpleado = {
      numero_identificacion: document.getElementById("numeroIdentificacion").value,
      nombres: document.getElementById("nombres").value,
      apellidos: document.getElementById("apellidos").value,
      direccion: document.getElementById("direccion").value,
      telefono: document.getElementById("telefono").value,
      id_rol: document.getElementById("id_rol").value,
      estado: 'activo' // Estado predeterminado
    };
  
    fetch('http://172.16.101.161:8080/POS/api/empleado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEmpleado)
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al crear el empleado');
        return response.json();
      })
      .then(data => {
        alert('Empleado creado exitosamente');
        document.getElementById("formCrearEmpleado").reset();
        cargarEmpleados();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('No se pudo crear el empleado');
      });
});
