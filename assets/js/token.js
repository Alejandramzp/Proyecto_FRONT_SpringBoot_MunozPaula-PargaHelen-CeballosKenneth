document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Comprobar si ya hay un rol y un token
    if (localStorage.getItem('rol') && localStorage.getItem('token')) {
        comprobarRol();
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
        const response = await fetch('http://172.16.101.161:8080/ColorPop/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);

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
                    role = 'Usuario';
            }
            localStorage.setItem('rol', role);
            alert("Inicio de sesión exitoso");
            comprobarRol();
        } else {
            alert('No se recibió token del servidor.');
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        alert(`Error en la autenticación: ${error.message}`);
    }
});

function comprobarRol() {
    const rol = localStorage.getItem('rol');

    if (rol) {
        switch (rol) {
            case 'Cajero':
                window.location.href = 'http://127.0.0.1:5500/assets/view/cajero_dashboard.html';
                break;
            case 'Gerente':
                window.location.href = 'http://127.0.0.1:5500/assets/view/gerente_dashboard.html';
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