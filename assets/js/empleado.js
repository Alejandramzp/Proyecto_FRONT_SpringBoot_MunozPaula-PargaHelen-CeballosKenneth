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
        <form id="form-crear-empleado" class="employee-form">
    <h2>Crear Empleado</h2>
    
    <div class="form-group">
        <label for="identificacion" class="form-label">Identificación:</label>
        <input type="text" id="identificacion" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="nombres" class="form-label">Nombres:</label>
        <input type="text" id="nombres" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="apellidos" class="form-label">Apellidos:</label>
        <input type="text" id="apellidos" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="direccion" class="form-label">Dirección:</label>
        <input type="text" id="direccion" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="telefono" class="form-label">Teléfono:</label>
        <input type="text" id="telefono" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="rol" class="form-label">Rol:</label>
        <select id="rol" class="form-select" required>
            <option value="Cajero">Cajero</option>
            <option value="Administrador">Administrador</option>
            <option value="Gerente">Gerente</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="estado" class="form-label">Estado:</label>
        <select id="estado" class="form-select" required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
        </select>
    </div>
    
    <button type="submit" class="submit-btn">Crear Empleado</button>
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
        let contenido = '<div class="empleados-container">';
        
        empleados.forEach(empleado => {
            contenido += `
                <div class="empleado-card">
                    <h3>${empleado.nombres} ${empleado.apellidos}</h3>
                    <p><strong>Identificación:</strong> ${empleado.identificacion}</p>
                    <p><strong>Dirección:</strong> ${empleado.direccion}</p>
                    <p><strong>Teléfono:</strong> ${empleado.telefono}</p>
                    <p><strong>Rol:</strong> ${empleado.rol}</p>
                    <p><strong>Estado:</strong> ${empleado.estado}</p>
                    <div class="card-actions">
                        <button onclick="editarEmpleado(${empleado.id})">Editar</button>
                        <button onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
    
        contenido += '</div>';
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
                <form id="form-editar-empleado" class="employee-form">
                    <h2>Editar Empleado</h2>
                    
                    <div class="form-group">
                        <label for="identificacion" class="form-label">Identificación:</label>
                        <input type="text" id="identificacion" class="form-input" value="${empleado.identificacion}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="nombres" class="form-label">Nombres:</label>
                        <input type="text" id="nombres" class="form-input" value="${empleado.nombres}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="apellidos" class="form-label">Apellidos:</label>
                        <input type="text" id="apellidos" class="form-input" value="${empleado.apellidos}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="direccion" class="form-label">Dirección:</label>
                        <input type="text" id="direccion" class="form-input" value="${empleado.direccion}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefono" class="form-label">Teléfono:</label>
                        <input type="text" id="telefono" class="form-input" value="${empleado.telefono}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="rol" class="form-label">Rol:</label>
                        <select id="rol" class="form-select" required>
                            <option value="Cajero" ${empleado.rol === 'Cajero' ? 'selected' : ''}>Cajero</option>
                            <option value="Administrador" ${empleado.rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
                            <option value="Gerente" ${empleado.rol === 'Gerente' ? 'selected' : ''}>Gerente</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="estado" class="form-label">Estado:</label>
                        <select id="estado" class="form-select" required>
                            <option value="Activo" ${empleado.estado === 'Activo' ? 'selected' : ''}>Activo</option>
                            <option value="Inactivo" ${empleado.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="submit-btn">Actualizar Empleado</button>
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
