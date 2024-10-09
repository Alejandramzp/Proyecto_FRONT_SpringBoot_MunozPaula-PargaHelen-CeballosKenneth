document.addEventListener("DOMContentLoaded", function() {
    // URL de la API
    const apiUrl = 'http://172.16.101.161:8080/ColorPop/api/empleados';

    // Selecciona el tbody donde se insertarán los empleados
    const tbody = document.getElementById('active-employees');

    // Selecciona el botón de inicio
    const inicioBtn = document.getElementById('inicio-btn');

    // Función para crear una fila de empleado activo
    function createEmployeeRow(employee) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.identificacion}</td>
            <td>${employee.nombres}</td>
            <td>${employee.apellidos}</td>
            <td>${employee.rol}</td>
        `;

        return tr;
    }

    // Función para cargar los empleados
    function loadActiveEmployees() {
        fetch(apiUrl, {  // Agregada la coma aquí
            method: 'GET',  // Cambiado a GET para obtener la lista de empleados
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Filtrar los empleados activos
            const activeEmployees = data.filter(emp => emp.estado === "Activo");

            // Vaciar el contenido del tbody
            tbody.innerHTML = '';

            // Añadir cada empleado activo a la tabla
            activeEmployees.forEach(emp => {
                const row = createEmployeeRow(emp);
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
    }

    // Evento click en el botón de inicio para cargar los empleados
    inicioBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamiento por defecto del enlace
        loadActiveEmployees(); // Cargar empleados activos al hacer click en "Inicio"
    });

    // Opcional: Cargar automáticamente al cargar la página
    loadActiveEmployees(); 
});
