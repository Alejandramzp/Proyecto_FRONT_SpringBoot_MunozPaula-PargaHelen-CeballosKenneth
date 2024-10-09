document.addEventListener('DOMContentLoaded', function() {
    const verFacturasBtn = document.getElementById('ver-facturas-btn');
    if (verFacturasBtn) {
        verFacturasBtn.addEventListener('click', cargarDetallesVentas);
    }
});

// Cargar detalles de ventas desde la API
function cargarDetallesVentas() {
    fetch('http://172.16.101.161:8080/ColorPop/api/detalles_ventas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al cargar los detalles de ventas. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        mostrarDetallesVentas(data);
    })
    .catch(error => {
        console.error('Error al cargar los detalles de ventas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los detalles de las ventas. Por favor, intente más tarde.',
        });
    });
}

// Mostrar detalles de ventas en la sección
function mostrarDetallesVentas(detalles) {
    const seccionFacturas = document.getElementById('ver-facturas');
    if (!seccionFacturas) return;

    seccionFacturas.innerHTML = '';

    if (detalles.length === 0) {
        seccionFacturas.innerHTML = '<p>No se encontraron detalles de ventas</p>';
        return;
    }

    const tablaFacturas = document.createElement('table');
    tablaFacturas.innerHTML = `
        <thead>
            <tr>
                <th>Número de Venta</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unidad</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${detalles.map(detalle => `
                <tr>
                    <td>${detalle.id_venta.numero_venta}</td>
                    <td>${detalle.id_producto.nombre}</td>
                    <td>${detalle.cantidad}</td>
                    <td>$${detalle.precio_unidad.toFixed(2)}</td>
                    <td>$${(detalle.cantidad * detalle.precio_unidad).toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    seccionFacturas.appendChild(tablaFacturas);
}
