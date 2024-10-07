document.addEventListener("DOMContentLoaded", function() {
    const verEmpleadosBtn = document.getElementById('ver-empleados-btn');
    const empleadosSection = document.getElementById('ver-empleados');
    
    // Función para obtener empleados desde la API
    async function fetchEmpleados() {
        try {
            const response = await fetch('http://172.16.101.161:8080/POS/api/empleado');
            const empleados = await response.json();
            displayEmpleados(empleados);
        } catch (error) {
            console.error('No se pudieron cargar los Empleados :c:', error);
        }
    }

    // Función para mostrar los empleados en tarjetas
    function displayEmpleados(empleados) {
        // Limpiar el contenido anterior
        empleadosSection.innerHTML = '<h1>Lista de Empleados</h1>';

        // Crear un contenedor para los empleados
        const empleadoContainer = document.createElement('div');
        empleadoContainer.classList.add('empleado-container');

        empleados.forEach(empleado => {
            // Crear la tarjeta para cada empleado
            const empleadoCard = document.createElement('div');
            empleadoCard.classList.add('empleado-card');

            // Añadir los datos del empleado
            empleadoCard.innerHTML = `
                <p><strong>ID:</strong> ${empleado.id_empleado}</p>
                <p><strong>Nombre:</strong> ${empleado.nombres} ${empleado.apellidos}</p>
                <p><strong>Identificación:</strong> ${empleado.numero_identificacion}</p>
                <p><strong>Dirección:</strong> ${empleado.direccion}</p>
                <p><strong>Teléfono:</strong> ${empleado.telefono}</p>
                <p><strong>Rol:</strong> ${empleado.rol.nombre_rol}</p>
                <p><strong>Estado:</strong> ${empleado.estado}</p>
                <button class="editar-btn" data-id="${empleado.id_empleado}">Editar</button>
                <button class="eliminar-btn" data-id="${empleado.id_empleado}">Eliminar</button>
            `;

            // Añadir la tarjeta al contenedor
            empleadoContainer.appendChild(empleadoCard);
        });

        // Añadir el contenedor de empleados a la sección
        empleadosSection.appendChild(empleadoContainer);

        // Agregar eventos a los botones de Editar y Eliminar
        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const empleadoId = this.dataset.id;
                editarEmpleado(empleadoId);
            });
        });

        document.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const empleadoId = this.dataset.id;
                eliminarEmpleado(empleadoId);
            });
        });
    }

    // Función para manejar la edición de empleados (Por definir funcionalidad)
    function editarEmpleado(id) {
        alert('Editar empleado con ID: ' + id);
        // Lógica para editar empleados
    }

    // Función para eliminar empleados
async function eliminarEmpleado(id) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este empleado?');
    if (confirmacion) {
        try {
            const response = await fetch(`http://172.16.101.161:8080/POS/api/empleado/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Empleado eliminado exitosamente');
                // Vuelve a cargar los empleados
                fetchEmpleados();
            } else {
                alert('Error al eliminar el empleado');
            }
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
        }
    }
}

    // Cargar empleados cuando se haga clic en "Ver Empleados"
    verEmpleadosBtn.addEventListener('click', function() {
        fetchEmpleados();
    });
});
