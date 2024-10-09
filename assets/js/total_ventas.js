document.addEventListener('DOMContentLoaded', function() {
    // Cargar el total de ventas del mes al cargar la página
    cargarTotalVentasMes();
});

// Función para cargar el total de ventas del mes
function cargarTotalVentasMes() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Obtener el mes actual (enero = 0)
    const anioActual = fechaActual.getFullYear(); // Obtener el año actual

    fetch('http://172.16.101.161:8080/ColorPop/api/ventas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar las ventas');
        }
        return response.json();
    })
    .then(data => {
        // Filtrar las ventas del mes actual
        const ventasDelMes = data.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            return (
                fechaVenta.getMonth() + 1 === mesActual && 
                fechaVenta.getFullYear() === anioActual
            );
        });

        // Calcular el total de las ventas del mes
        const totalVentasMes = ventasDelMes.reduce((total, venta) => total + venta.total, 0);

        // Actualizar el elemento HTML con el total
        document.getElementById('total-ventas-mes').textContent = `$${totalVentasMes.toFixed(2)}`;
    })
    .catch(error => {
        console.error('Error al cargar el total de ventas del mes:', error);
    });
}
