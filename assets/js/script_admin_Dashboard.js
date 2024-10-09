// Código de control de menú y otros elementos
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});


// Manejador de eventos para cambiar el contenido del dashboard
document.addEventListener("DOMContentLoaded", function() {
    // Mapea los botones con las secciones correspondientes
    const sections = {
        "inicio-btn": "inicio",
        "crear-productos-btn": "crear-productos",
        "ver-productos-btn": "ver-productos",
        "crear-empleados-btn": "crear-empleados",
        "ver-empleados-btn": "ver-empleados",
        "ver-inventario-btn": "ver-inventario",
        "ver-ventas-btn": "ver-ventas",
        "hacer-recibo-btn": "hacer-recibo",
        "gestionar-carrito-btn": "gestionar-carrito",
        "ver-facturas-btn": "ver-facturas"
    };

    // Obtén todas las secciones y los botones del menú
    const allSections = document.querySelectorAll(".content-section");
    const menuItems = document.querySelectorAll(".side-menu a");

    // Función para mostrar la sección correcta y ocultar las demás
    function showSection(sectionId) {
        allSections.forEach(section => section.style.display = "none"); // Ocultar todas
        document.getElementById(sectionId).style.display = "block";     // Mostrar la seleccionada
    }

    // Agregar evento click a cada ítem del menú
    menuItems.forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto de los links
            const sectionId = sections[e.target.closest("a").id]; // Obtener el id de la sección

            if (sectionId) {
                showSection(sectionId);

                // Remover la clase "active" de todos los ítems
                menuItems.forEach(link => link.parentElement.classList.remove("active"));

                // Agregar la clase "active" al ítem actual
                e.target.closest("li").classList.add("active");
            }
        });
    });
});


// Asegúrate de que este script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.logout');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Usar SweetAlert2 para una mejor experiencia de usuario
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas cerrar la sesión?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Limpiar todo el localStorage
                    localStorage.clear();
                    
                    // Mostrar mensaje de éxito
                    Swal.fire(
                        '¡Sesión cerrada!',
                        'Has cerrado sesión correctamente.',
                        'success'
                    ).then(() => {
                        // Redirigir al index
                        window.location.href = 'http://127.0.0.1:5500/index.html';
                    });
                }
            });
        });
    } else {
        console.error('El botón de logout no fue encontrado');
    }
});