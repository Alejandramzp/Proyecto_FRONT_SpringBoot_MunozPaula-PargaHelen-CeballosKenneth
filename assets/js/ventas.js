document.addEventListener('DOMContentLoaded', function() {
    const verVentasBtn = document.getElementById('ver-ventas-btn');
    if (verVentasBtn) {
        verVentasBtn.addEventListener('click', cargarVentas);
    }
});

// Cargar ventas desde la API
function cargarVentas() {
    fetch('http://172.16.101.161:8080/ColorPop/api/ventas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar las ventas. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        mostrarVentas(data);
    })
    .catch(error => {
        console.error('Error al cargar las ventas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las ventas. Por favor, intente más tarde.',
        });
    });
}

// Mostrar ventas en la sección
function mostrarVentas(ventas) {
    const seccionVentas = document.getElementById('ver-ventas');
    if (!seccionVentas) return;

    seccionVentas.innerHTML = '';

    if (ventas.length === 0) {
        seccionVentas.innerHTML = '<p>No se encontraron ventas</p>';
        return;
    }

    const tablaVentas = document.createElement('table');
    tablaVentas.innerHTML = `
        <thead>
            <tr>
                <th>Número de Venta</th>
                <th>Fecha</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${ventas.map(venta => `
                <tr>
                    <td>${venta.numero_venta}</td>
                    <td>${new Date(venta.fecha).toLocaleString()}</td>
                    <td>$${venta.total.toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    seccionVentas.appendChild(tablaVentas);
}
