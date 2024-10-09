document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Comprobar si ya hay un rol y un token
    if (localStorage.getItem('rol') && localStorage.getItem('token')) {
        comprobarRol(); // Llama a la función para redirigir según el rol
        return; // No hacer nada más, ya que el usuario ya está autenticado
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si se están obteniendo los valores correctamente
    console.log('username:', username);
    console.log('Password:', password);

    // Comprobar si los campos están vacíos
    if (!username || !password) {
        alert('Por favor, ingresa correo y contraseña.');
        return;
    }

    const credentials = {
        username: username,
        password: password
    };

    try {
        // Realizar la petición POST al servidor
        const response = await fetch(' http://172.16.101.161:8080/ColorPop/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        // Verificar si la respuesta fue exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parsear la respuesta como JSON para obtener el token
        const data = await response.json();

        // Verificar si se recibió el token en la respuesta
        if (data.token) {
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            console.log('Token guardado:', data.token);

            // Guardar el rol en localStorage según el email
            let role;
            switch (password) {
                case 'contraseña3':
                    role = 'Cajero';
                    break;
                case 'contraseña2':
                    role = 'Gerente';
                    break;
                case 'contraseña1':
                    role = 'Administrador';
                    break;
                default:
                    role = 'Usuario'; // O cualquier rol por defecto si es necesario
            }
            localStorage.setItem('rol', role);
            console.log('Rol guardado:', role); 
            alert("hola");
            comprobarRol(); // Llama a la función para redirigir según el rol
        } else {
            alert('No se recibió token del servidor.');
        }
    } catch (error) {
        // Mostrar cualquier error en la consola
        console.error('Error en la autenticación:', error);
        alert(`Error en la autenticación: ${error.message}`);
    }
});

// Función para redirigir según el rol
function comprobarRol() {
    const rol = localStorage.getItem('rol');

    if (rol) { // Verificamos si la variable 'rol' existe
        switch (rol) {
            case 'Cajero':

                window.location.href = 'http://172.16.101.109/assets/view/cajero_dashboard.html';
                break;
            case 'Gerente':

                window.location.href = 'http://172.16.101.109/assets/view/gerente_dashboard.html';
                break;
            case 'Administrador':

                window.location.href = 'http://127.0.0.1:5500/assets/view/admin_dashboard.html';
                break;
            default:
                console.log('Rol no reconocido: ' + rol);
                break;
        }
    }
}