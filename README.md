![Portada](https://i.imgur.com/UDujezt.jpeg)

# ColorPop

Este aplicativo de punto de venta (POS) está diseñado específicamente para gestionar de manera eficiente una tienda de maquillaje, abordando las necesidades únicas de este sector minorista. El sistema permite la gestión de tres roles clave: Administrador, Cajero y Gerente, cada uno con funcionalidades específicas y permisos ajustados a sus responsabilidades. La interfaz del usuario ha sido cuidadosamente diseñada para priorizar la usabilidad y la eficiencia, lo que permite a los usuarios navegar de manera intuitiva entre las diversas funcionalidades, como la gestión de inventario, procesamiento de ventas, y generación de informes. Además, el aplicativo incorpora un sistema de login seguro para garantizar que solo los usuarios autorizados accedan a las funciones correspondientes. Con un enfoque en la experiencia del usuario, el sistema busca no solo optimizar las operaciones diarias de la tienda, sino también mejorar la satisfacción del cliente y la productividad del personal.



Tecnologias a utilizar 



**HTML/CSS**: Para la estructura y estilo de la interfaz.

**JavaScript**: Para interactividad.

**Fetch API**: Para consumir la API RESTful.

**Bootstrap** : libreria para diseño de sitios y aplicaciones 

**Libreria SweetAlert2**: proporciona estilo para alertas 



**Estructura del Proyecto**

- ```
  /assets
  │
  ├── /css
  │   ├── /login.css/               # Archivos CSS específicos para la página de login.
  │   ├── /style_admin.css/         # Estilos para el rol de administrador. 
  │   ├── /style_cajero.css/        # Estilo para el rol de cajero.
  │   ├──  /tables_deshboard.css/    # Estilo para el desplegue de la informacion en forma  |   							       de tabla. 
  │   └── /syle_index/              # Define el diseño y la apariencia de la aplicación web
  ├── images
  │   └── *               # Imágenes utilizadas en la aplicación
  ├── /js
  │   ├── activos.js                   # Realiza una solicitud a una API para cargar una    |                                      lista de empleados activos y mostrarlos  
  │   ├── carrito.js                   # Es una implementación sólida para gestionar    	
  |									   productos y un carrito de compras
  │   ├── empleados.js                 # Función para actualizar un empleado.
  │   ├── frases.js                    # Archivo JS.  
  │   ├── inventario.js                # Auncionalidad que muestra una lista de productos  										Almacenados en un inventario
  │   ├── login.js                     # Función de inicio de sesión que verifica las    										   credenciales del usuario
  │   ├── producto.js                  # Gestionar productos en una aplicación web
  |   ├── Script_admin_Dashboard.js    # Maneja la interacción y la visualización de un    										panel de control con diferentes secciones.
  │   ├── token.js                     # Manejar el inicio de sesión y la redirección según 										 el rol del usuario
  │   └── ventas.js                    # Archivo JS para la funcionalidad para gestionar 										   una venta 
  └── /view
      ├── admin.html      # Vista para el rol de administrador
      ├── gerente.html    # Vista para el rol de gerente
      └── cajero.html     # Vista para el rol de cajero
  
  index.html               # Página principal de la aplicación
  README.md                # Documentación del proyecto
  ```

**Consumo de la API**

- Breve descripción sobre cómo se consume la API, mencionando los verbos HTTP utilizados y ejemplos de rutas:
  - `GET `: Se utiliza para **obtener datos** de un servidor.
  - `POST : Se utiliza para **enviar datos** al servidor para **crear un nuevo recurso**..
  - `PUT : Se utiliza para **actualizar un recurso existente** en el servidor.
  - `DELETE : Se utiliza para **eliminar un recurso** en el servidor.

**Funcionamiento**

[Descargar Manual Instructivo](Manual_Instructivo._ColorPop.pdf)

**API para POS Gestión de ventas ColorPop**

[API_ColorPop](https://github.com/Alejandramzp/Proyecto_BACK_SpringBoot_MunozPaula-PargaHelen-CeballosKenneth.git)

**Creado por **

Kenneth Ceballos

Paula Muñoz

Helen Parga





