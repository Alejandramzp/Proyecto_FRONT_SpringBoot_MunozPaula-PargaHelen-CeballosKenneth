function redirectToDashboard() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin") {
/*         sessionStorage.setItem('loggedInUser', 'admin');
 */        window.location.href = "./assets/view/admin_dashboard.html";
    } else if (username === "gerente" && password === "gerente") {
/*         sessionStorage.setItem('loggedInUser', 'empleado');
 */        window.location.href = "./assets/view/gerente_dashboard.html";
    } else if (username === "cajero" && password === "cajero") {
/*         sessionStorage.setItem('loggedInUser', 'usuario');
 */        window.location.href = "./assets/view/cajero_dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
}
