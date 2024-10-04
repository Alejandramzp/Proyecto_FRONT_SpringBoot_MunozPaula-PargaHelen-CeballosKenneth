function redirectToDashboard() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "./assets/view/admin_dashboard.html";
    } else if (username === "empleado" && password === "empleado123") {
        window.location.href = "./assets/view/empleado_dashboard.html";
    } else if (username === "usuario" && password === "usuario123") {
        window.location.href = "./assets/view/usuario_dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
}
