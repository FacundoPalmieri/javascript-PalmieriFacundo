
// Password para vendedor
const password = "1234";


//Productos en stock
let productos = [
    { id: 1, nombre: "Mouse Logitech", precio: 150000, cantidad: 10 },
    { id: 2, nombre: "Teclado Logitech", precio: 350000, cantidad: 20 },
    { id: 3, nombre: "Monitor Philips - 32 Pulgadas", precio: 430000, cantidad: 5 },
    { id: 4, nombre: "Auriculares Sony WH-1000XM5", precio: 800000, cantidad: 8 },
    { id: 5, nombre: "Parlante Bluetooth JBL Xtreme 3", precio: 600000, cantidad: 12 },
    { id: 6, nombre: "Cargador Inalámbrico Anker", precio: 120000, cantidad: 30 },
    { id: 7, nombre: "Laptop Dell Inspiron 15", precio: 1200000, cantidad: 15 },
    { id: 8, nombre: "Smartphone Samsung Galaxy S22", precio: 2500000, cantidad: 25 },
    { id: 9, nombre: "Tablet Apple iPad Air 2022", precio: 1000000, cantidad: 18 },
    { id: 10, nombre: "Cámara Fotográfica Canon EOS 1500D", precio: 500000, cantidad: 10 }
];

// Función para mostrar productos disponibles (para comprador y vendedor)
function mostrarProductos() {
    console.log("Productos disponibles:");
    productos.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio} - Stock: ${producto.cantidad}`);
    });
}

// Función para agregar stock.
function agregarStock() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    let producto = productos.find(producto => producto.id === id);

    if (producto) {
        let cantidad = prompt("Ingrese la cantidad que desea agregar al carrito");
        cantidad = parseInt(cantidad);

        producto.cantidad += cantidad;
        console.log("Stock actualizado");
    } else {
        console.log("Producto no encontrado");
    }
}


//Funcion para eliminar un producto.
function eliminarProducto() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    let index = productos.indexOf(productos.find(producto => producto.id === id));

    if (index !== -1) {
        productos.splice(index, 1);
        console.log("Producto eliminado");
    } else {
        console.log("Producto no encontrado");
    }
}

//Función para agregar un producto
function agregarProducto() {
    let id = prompt("Ingrese el ID del producto");
    if (id === null) return;

    id = parseInt(id);

    let producto = productos.find(producto => producto.id === id);


    if (!producto) {
        let nombre = prompt("Ingrese el nombre del producto nuevo");
        let cantidad = prompt("Ingrese la cantidad del producto");
        cantidad = parseInt(cantidad);
        while (cantidad <= 0) {
            console.log("Cantidad no válida");
            cantidad = prompt("Ingrese la cantidad del producto");
        }

        let precio = prompt("Ingrese el precio del producto");
        precio = parseInt(precio);
        while (precio <= 0) {
            console.log("Precio no válido");
            precio = prompt("Ingrese el precio del producto");
        }
        productos.push({ id, nombre, precio, cantidad });
    } else {
        console.log("El ID ya existe");
    }
}



let carrito = [];

//Función para agregar un producto al carrito
function agregarProductoCarrito() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    let producto = productos.find(producto => producto.id === id);

    if (producto) {
        let cantidad = prompt("Ingrese la cantidad que desea agregar al carrito");
        cantidad = parseInt(cantidad);

        if (cantidad <= producto.cantidad) {
            producto.cantidad -= cantidad;
            carrito.push({ id, nombre: producto.nombre, precio: producto.precio, cantidad });

            console.log("Producto agregado al carrito");
        } else {
            console.log("Cantidad no disponible");
        }
    } else {
        console.log("Producto no encontrado");
    }
}

//Función para eliminar un producto del carrito
function eliminarProductoCarrito() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    let producto = carrito.find(productoCarrito => productoCarrito.id === id);

    if (producto) {
        carrito.splice(carrito.indexOf(id), 1);
        productos.find(producto => producto.id === id).cantidad += producto.cantidad;
        console.log("Producto eliminado del carrito");

    } else {
        console.log("Producto no encontrado");
    }
}


//Función para mostrar el carrito
function mostrarCarrito() {
    console.log("Carrito:");
    carrito.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`);
    });
}


//Función para login e inicio de app
function login() {
    let perfil = prompt("Comprador (1) - Vendedor (2)");

    // Convertir perfil a número
    perfil = parseInt(perfil);

    switch (perfil) {
        case 1:
            window.location.href = "./comprador.html";
            break;

        case 2:
            let pass = prompt("Ingrese su contraseña");
            if (pass === password) {
                window.location.href = "./vendedor.html";

            } else {
                while (pass !== password) {
                    if (pass === null) return;
                    console.log("Contraseña incorrecta");
                    pass = prompt("Ingrese su contraseña");
                }
            }
            break;

        default:
            console.log("Opción inválida");
            break;
    }
}


