function redirectToDashboard() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizamos la consulta a la API para obtener la lista de usuarios
    fetch('http://172.16.101.161:8080/ColorPop/api/usuarios')
        .then(response => response.json()) // Parseamos la respuesta JSON
        .then(users => {
            // Buscamos si hay un usuario que coincida con el nombre de usuario y la contraseña
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                // Al encontrar el usuario, redirigimos según su rol
                switch (user.id_empleado.rol) {
                    case 'Administrador':
                        window.location.href = "./assets/view/admin_dashboard.html";
                        break;
                    case 'Gerente':
                        window.location.href = "./assets/view/gerente_dashboard.html";
                        break;
                    case 'Cajero':
                        window.location.href = "./assets/view/cajero_dashboard.html";
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Rol no reconocido. Contacta con el administrador.'
                        });
                }
            } else {
                // Si no encontramos al usuario o la contraseña es incorrecta
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.'
                });
            }
        })
        .catch(error => {
            // Si ocurre algún error con la consulta a la API
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al conectarse con el servidor. Intenta más tarde.'
            });
        });
}


// Event listener para el logout
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

    // Eliminar los items del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    
    // Redirigir a la página de inicio
    window.location.href = 'http://127.0.0.1:5500/index.html'; // Cambia 'index.html' por la URL correcta de tu página de inicio
});
