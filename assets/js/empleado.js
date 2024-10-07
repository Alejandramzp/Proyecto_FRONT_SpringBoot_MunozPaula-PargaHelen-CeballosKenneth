document.addEventListener("DOMContentLoaded", function() {
    const baseURL = "http://172.16.101.161:8080/ColorPop/api/empleados";
    
    // Elementos del DOM
    const crearEmpleadosBtn = document.getElementById('crear-empleados-btn');
    const verEmpleadosBtn = document.getElementById('ver-empleados-btn');
    const verEmpleadosSection = document.getElementById('ver-empleados');
    const crearEmpleadosSection = document.getElementById('crear-empleados');

    // Mostrar/ocultar secciones
    crearEmpleadosBtn.addEventListener("click", () => {
        crearEmpleadosSection.style.display = "block";
        verEmpleadosSection.style.display = "none";
        mostrarFormularioCrear();
    });

    verEmpleadosBtn.addEventListener("click", () => {
        crearEmpleadosSection.style.display = "none";
        verEmpleadosSection.style.display = "block";
        obtenerEmpleados();
    });

    // Función para mostrar el formulario de creación de empleados
    function mostrarFormularioCrear() {
        crearEmpleadosSection.innerHTML = `
        <form id="form-crear-empleado">
        <label for="identificacion">Identificación:</label>
        <input type="text" id="identificacion" required><br>
    
        <label for="nombres">Nombres:</label>
        <input type="text" id="nombres" required><br>
    
        <label for="apellidos">Apellidos:</label>
        <input type="text" id="apellidos" required><br>
    
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" required><br>
    
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" required><br>
    
        <label for="rol">Rol:</label>
        <select id="rol" required>
            <option value="Cajero">Cajero</option>
            <option value="Administrador">Administrador</option>
            <option value="Gerente">Gerente</option>
        </select><br>
    
        <label for="estado">Estado:</label>
        <select id="estado" required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
        </select><br>
    
        <button type="submit">Crear Empleado</button>
    </form>
    
        `;

        document.getElementById('form-crear-empleado').addEventListener('submit', function(event) {
            event.preventDefault();
            const nuevoEmpleado = {
                identificacion: document.getElementById('identificacion').value,
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value,
                rol: document.getElementById('rol').value,
                estado: document.getElementById('estado').value
            };
            crearEmpleado(nuevoEmpleado);
        });
    }

    // Función para obtener empleados
    function obtenerEmpleados() {
        fetch(baseURL)
            .then(response => response.json())
            .then(empleados => {
                mostrarEmpleados(empleados);
            })
            .catch(error => console.error('Error al obtener empleados:', error));
    }

    // Función para mostrar empleados
    function mostrarEmpleados(empleados) {
        let contenido = '<table>';
        contenido += '<tr><th>ID</th><th>Identificación</th><th>Nombres</th><th>Apellidos</th><th>Dirección</th><th>Teléfono</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>';
        
        empleados.forEach(empleado => {
            contenido += `
                <tr>
                    <td>${empleado.id}</td>
                    <td>${empleado.identificacion}</td>
                    <td>${empleado.nombres}</td>
                    <td>${empleado.apellidos}</td>
                    <td>${empleado.direccion}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.rol}</td>
                    <td>${empleado.estado}</td>
                    <td>
                        <button onclick="editarEmpleado(${empleado.id})">Editar</button>
                        <button onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        contenido += '</table>';
        verEmpleadosSection.innerHTML = contenido;
    }

    // Función para crear un empleado
    function crearEmpleado(empleado) {
        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado)
        })
        .then(response => response.json())
        .then(data => {
            alert('Empleado creado con éxito');
            obtenerEmpleados();
        })
        .catch(error => console.error('Error al crear empleado:', error));
    }

    // Función para eliminar un empleado
    window.eliminarEmpleado = function(id) {
        fetch(`${baseURL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Empleado eliminado con éxito');
                obtenerEmpleados();
            } else {
                alert('Error al eliminar el empleado');
            }
        })
        .catch(error => console.error('Error al eliminar empleado:', error));
    };

    // Función para editar un empleado
    window.editarEmpleado = function(id) {
        fetch(`${baseURL}/${id}`)
            .then(response => response.json())
            .then(empleado => {
                crearEmpleadosSection.style.display = "block";
                verEmpleadosSection.style.display = "none";
                
                crearEmpleadosSection.innerHTML = `
                    <form id="form-editar-empleado">
                        <label for="identificacion">Identificación:</label>
                        <input type="text" id="identificacion" value="${empleado.identificacion}" required><br>
                        <label for="nombres">Nombres:</label>
                        <input type="text" id="nombres" value="${empleado.nombres}" required><br>
                        <label for="apellidos">Apellidos:</label>
                        <input type="text" id="apellidos" value="${empleado.apellidos}" required><br>
                        <label for="direccion">Dirección:</label>
                        <input type="text" id="direccion" value="${empleado.direccion}" required><br>
                        <label for="telefono">Teléfono:</label>
                        <input type="text" id="telefono" value="${empleado.telefono}" required><br>
                        <label for="rol">Rol:</label>
                        <input type="text" id="rol" value="${empleado.rol}" required><br>
                        <label for="estado">Estado:</label>
                        <select id="estado" required>
                            <option value="Activo" ${empleado.estado === 'Activo' ? 'selected' : ''}>Activo</option>
                            <option value="Inactivo" ${empleado.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
                        </select><br>
                        <button type="submit">Actualizar Empleado</button>
                    </form>
                `;

                document.getElementById('form-editar-empleado').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const empleadoActualizado = {
                        identificacion: document.getElementById('identificacion').value,
                        nombres: document.getElementById('nombres').value,
                        apellidos: document.getElementById('apellidos').value,
                        direccion: document.getElementById('direccion').value,
                        telefono: document.getElementById('telefono').value,
                        rol: document.getElementById('rol').value,
                        estado: document.getElementById('estado').value
                    };
                    actualizarEmpleado(id, empleadoActualizado);
                });
            })
            .catch(error => console.error('Error al obtener el empleado:', error));
    };

    // Función para actualizar un empleado
    function actualizarEmpleado(id, empleado) {
        fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado)
        })
        .then(response => response.json())
        .then(data => {
            alert('Empleado actualizado con éxito');
            obtenerEmpleados();
        })
        .catch(error => console.error('Error al actualizar el empleado:', error));
    }
});
