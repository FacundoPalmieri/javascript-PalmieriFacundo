
// Password para vendedor
const password = "1234";

//Actualiza nombre en la página

if (localStorage.getItem("nombre") !== null) {
    const nombre = localStorage.getItem("nombre");
    document.querySelector("#saludo").innerText = "Hola " + nombre + "!";
}



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

//--------------------------------------------------------------------------------------------
// Eventos

document.querySelector("#ButtonMostrarProductos").addEventListener("click", mostrarProductos);
document.querySelector("#ButtonAgregarProductoCarrito").addEventListener("click", productoCarrito);
document.querySelector("#ButtonEliminarProductoCarrito").addEventListener("click", eliminarProductoCarrito);
document.querySelector("#ButtonmostrarCarrito").addEventListener("click", mostrarCarrito);


//--------------------------------------------------------------------------------------------

//Función para limpiear el contenido del comprador
function limpiarSectionComprador() {

    let listarProductos = document.getElementById('listarProductos');
    let agregarProductoComprador = document.getElementById('agregarProductoComprador')

    let carrito = document.getElementById('mostrarCarrito')

    if (listarProductos) {
        listarProductos.innerHTML = "";
    }

    if (agregarProductoComprador) {
        agregarProductoComprador.innerHTML = "";
    }

    if(carrito){
        carrito.innerHTML = "";
    }


}



//--------------------------------------------------------------------------------------------

// Función para mostrar productos disponibles (para comprador y vendedor)
function mostrarProductos() {
    limpiarSectionComprador();
    console.log("Productos disponibles:");
    if (localStorage.getItem("productos")) {
        let productosGuardados = JSON.parse(localStorage.getItem("productos"));
    
        productosGuardados.forEach(productosGuardados => {
            document.querySelector("#listarProductos").innerHTML += `<li class="list-group-item">${productosGuardados.id}. ${productosGuardados.nombre} - $${productosGuardados.precio} - Stock: ${productosGuardados.cantidad}</li>`;

        });
    } else {
        productos.forEach(producto => {
            document.querySelector("#listarProductos").innerHTML += `<li class="list-group-item">${producto.id}. ${producto.nombre} - $${producto.precio} - Stock: ${producto.cantidad}</li>`;
        });
    }


}

//--------------------------------------------------------------------------------------------

// Función para agregar stock.
function agregarStock() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    if (localStorage.getItem("productos")) {
        let productosGuardados = JSON.parse(localStorage.getItem("productos"));
        let productoGuardado = productosGuardados.find(producto => producto.id === id);
        if (productoGuardado) {

            actualizarStock(productosGuardados, productoGuardado);

        } else {
            console.log("Producto no encontrado");
        }
    } else if (productos.find(producto => producto.id === id)) {
        let producto = productos.find(producto => producto.id === id);
        if (producto) {

            agregar(productos, producto);
        }
    } else {
        console.log("Producto no encontrado");
    }
}


// función lógica agrega stock.
function actualizarStock(arrayProductos, producto) {
    let cantidad = prompt("Ingrese la cantidad que desea agregar al stock");
    cantidad = parseInt(cantidad);
    producto.cantidad += cantidad;
    console.log("Stock actualizado");
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

// --------------------------------------------------------------------------------------------

//Funcion para eliminar un producto.
function eliminarProducto() {
    let id = prompt("Ingrese el ID del producto");
    id = parseInt(id);

    if (localStorage.getItem("productos")) {
        let productosGuardados = JSON.parse(localStorage.getItem("productos"));
        let index = productosGuardados.indexOf(productosGuardados.find(productosGuardados => productosGuardados.id === id));
        if (index !== -1) {
            eliminar(productosGuardados, index);
        } else {
            console.log("Producto no encontrado");
        }
    } else if (productos.indexOf(productos.find(producto => producto.id === id))) {
        let index = productos.indexOf(productos.find(producto => producto.id === id));
        if (index !== -1) {
            eliminar(productos, index);
        } else {
            console.log("Producto no encontrado");
        }
    } else {
        console.log("Producto no encontrado");
    }
}

// Función lógica para eliminar un producto.
function eliminar(arrayProductos, index) {
    arrayProductos.splice(index, 1);
    console.log("Producto eliminado");
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}



//--------------------------------------------------------------------------------------------
//Función para agregar un producto
function agregarProducto() {
    let id = prompt("Ingrese el ID del producto");
    if (id === null) return;

    id = parseInt(id);

    if (localStorage.getItem("productos")) {
        let productosGuardados = JSON.parse(localStorage.getItem("productos"));
        let producto = productosGuardados.find(producto => producto.id === id);

        if (!producto) {
            agregar(productosGuardados, id);

        } else {
            console.log("El ID ya existe");
        }
    } else {
        let producto = productos.find(producto => producto.id === id)
        if (!producto) {
            agregar(productos, id);
        } else {
            console.log("El ID ya existe");
        }
    }
}

// Función lógica agregar
function agregar(arrayProductos, id) {
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
    arrayProductos.push({ id, nombre, precio, cantidad });
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

//--------------------------------------------------------------------------------------------


let carrito = [];

//Función para agregar un producto al carrito
function productoCarrito() {
    limpiarSectionComprador();
    document.querySelector("#agregarProductoComprador").innerHTML = "<div class='input mb-3'> <input  id= 'idProductoComrpador' type='text' class='form-control'  placeholder='Id Producto' aria-label='Username'> <input  id= 'idCantidad' type='text' class='form-control' placeholder='Cantidad' aria-label='Username'> </br>  </div> <button id ='idAgregarProducto' type='button' class='btn btn-success'>Agregar</button>";
    document.querySelector("#idAgregarProducto").addEventListener("click", agregarProductoCarrito);

}

function agregarProductoCarrito() {
    let idStr = document.querySelector("#idProductoComrpador").value;
    let id = parseInt(idStr);

    let cantidadStr = document.querySelector("#idCantidad").value;
    let cantidad = parseInt(cantidadStr);

    if (localStorage.getItem("productos")) {
        let productosGuardados = JSON.parse(localStorage.getItem("productos"));
        let producto = productosGuardados.find(producto => producto.id === id);

        if (producto) {
            actualizarCarrito(producto, cantidad);
            alert("Producto Agregado correctamente")
            limpiarSectionComprador();
        } else {
            alert("Producto no encontrado");
        }

    } else {
        let producto = productos.find(producto => producto.id === id);
        if (producto) {
            actualizarCarrito(producto, cantidad);
            alert("Producto Agregado correctamente")
            limpiarSectionComprador();
        } else {
            alert("Producto no encontrado");
        }

    }
}



// Función lógica para agregar un producto al carrito
function actualizarCarrito(producto, cantidad) {

    if (cantidad <= producto.cantidad) {
        producto.cantidad -= cantidad;
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });

        if(localStorage.getItem("carrito")){
            let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
            carritoGuardado.push(carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
       
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        alert("Cantidad no disponible");
    }
}




//--------------------------------------------------------------------------------------------
//Función para eliminar un producto del carrito.
function eliminarProductoCarrito() {
    limpiarSectionComprador();
    document.querySelector("#agregarProductoComprador").innerHTML = "<div class='input mb-3'> <input  id= 'idProductoComprador' type='text' class='form-control'  placeholder='Id Producto a Eliminar' aria-label='Username'> </br>  </div> <button id ='idEliminarProducto' type='button' class='btn btn-success'>Eliminar</button>";
    document.querySelector("#idEliminarProducto").addEventListener("click", descontarCarrito);
}

function descontarCarrito() {
    if (localStorage.getItem("carrito")) {
        //Se recupera el valor del input
        let idStr = document.querySelector("#idProductoComprador").value;

        //Se parsea a entero
        let id = parseInt(idStr);

        let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        let producto = carritoGuardado.find(productoCarrito => productoCarrito.id === id);
        if (producto) {
            carrito.splice(carrito.indexOf(id), 1);
            productos.find(producto => producto.id === id).cantidad += producto.cantidad;
            alert("Producto eliminado del carrito");
            localStorage.setItem("carrito", JSON.stringify(carrito));

        } else {
            alert("Producto no encontrado");
        }
    } else {
        let producto = carrito.find(productoCarrito => productoCarrito.id === id);

        if (producto) {
            carrito.splice(carrito.indexOf(id), 1);
            productos.find(producto => producto.id === id).cantidad += producto.cantidad;
            alert("Producto eliminado del carrito");
            localStorage.setItem("carrito", JSON.stringify(carrito));

        } else {
            alert("Producto no encontrado");
        }

    }
}



//--------------------------------------------------------------------------------------------

//Función para mostrar el carrito 
function mostrarCarrito() {
    limpiarSectionComprador();
    if (localStorage.getItem("carrito")) {
        let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if(carritoGuardado <=0){
            alert("No hay productos en el carrito");
        }
        carritoGuardado.forEach(producto => {
            document.getElementById('listarProductos').innerHTML += `<li class="list-group-item">${producto.id}. ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</li>`;
        });
    } else {
        if(carrito <= 0){
            alert("No hay productos en el carrito");
        }
        carrito.forEach(producto => {
            document.getElementById('listarProductos').innerHTML += `<li class="list-group-item">${producto.id}. ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</li>`;
        });
    }


}


//Función para login e inicio de app
function login() {

    const nombre = document.querySelector("#nombre").value;
    const perfilStr = document.querySelector("#perfil").value;

    //validación de campos.
    if (nombre === '' || perfilStr === "") {
        alert("Por favor, complete los campos");
        return;
    }

    const perfil = parseInt(perfilStr);
    localStorage.setItem("nombre", nombre);


    switch (perfil) {
        case 1:
            window.location.href = "./pages/comprador.html";
            break;

        case 2:
            let pass = prompt("Ingrese su contraseña");
            if (pass === password) {
                window.location.href = "./pages/vendedor.html";



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


