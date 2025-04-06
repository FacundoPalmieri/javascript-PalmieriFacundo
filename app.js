
// Password para vendedor
//const password = "1234";


/*
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
*/



//---------------------------------------------------------------------------------------------
// Sección Login
//---------------------------------------------------------------------------------------------


if (window.location.pathname.includes("index.html")) {

    //Función para login e inicio de app
    function login() {

        const nombre = document.querySelector("#nombre").value;
        //const perfilStr = document.querySelector("#perfil").value;

        //validación de campos.
        if (nombre != '') {
            localStorage.setItem("nombre", nombre);
            window.location.href = "./pages/comprador.html";
        } else {
            Swal.fire({
                icon: "error",
                title: "Por favor, complete su nombre",
                width: "250px",
                customClass: {
                    popup: "small-popup"
                }
            });
        }
    }

}


//---------------------------------------------------------------------------------------------
// Sección Comprador
//---------------------------------------------------------------------------------------------


if (window.location.pathname.includes("comprador.html")) {
    //Actualiza nombre en la página comprador 
    if (localStorage.getItem("nombre") !== null) {
        const nombre = localStorage.getItem("nombre");
        document.querySelector("#usuario").innerText = nombre;
        cargarProductos();
    }

}



let productos = [];
async function cargarProductos() {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products");
        productos = await respuesta.json();
        productosCompleto = productos.map(producto => ({
            id: producto.id,
            description: producto.description,
            image: producto.image,
            price: producto.price,
            title: producto.title,
            category: producto.category,
            cantidad: 1
        }));

        mostrarProductos(productosCompleto);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}



// Función buscar producto
function buscar(event) {
    event.preventDefault();
    const valorBusqueda = document.querySelector("#input-busqueda").value.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.title.toLowerCase().includes(valorBusqueda)
    );

    if (resultados.length > 0) {
        mostrarProductos(resultados);
        console.log("productos encontrados");
    } else {
        Swal.fire({
            icon: "error",
            title: "No se encontraron resultados",
            width: "350px",
            customClass: {
                popup: "small-popup-comprador"
            }
        });

        document.querySelector("#input-busqueda").value = "";
    }
}


// Función buscar producto por categoría
function buscarPorCategoria(categoria) {
    console.log(productos[0].category);
    console.log(categoria);
    const resultados = productos.filter(producto =>
        producto.category === categoria
    );

    if (resultados.length > 0) {
        mostrarProductos(resultados);
    } else {
        Swal.fire({
            icon: "error",
            title: "No se encontraron resultados",
            width: "350px",
            customClass: {
                popup: "small-popup-comprador"
            }
        });
    }
}



//Funcíón para limpiar el buscador.
function limpiarBuscador() {
    if (inputBusqueda.value.trim() === "") {
        mostrarProductos(productos);
    }
}






// Función para mostrar productos disponibles 
function mostrarProductos(productos) {
    productos.forEach(producto => console.log(producto.category));

    let contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        card.innerHTML = `
                <div class="card h-100">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}" style="height: 300px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">$${producto.price}</p>
                        <p class="card-text small">${producto.category}</p>
                        <button class="btn btn-primary mt-auto btn-agregar" data-id="${producto.id}">Añadir al carrito</button>                    </div>
                </div>
            `;
        contenedor.appendChild(card);
    });
}



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarProductoCarrito(id) {
    // Se obtiene el ID del producto del array local.
    const producto = productosCompleto.find(producto => producto.id === id);

    //Se verifica si existe un carrito en localStorage para actualizarlo o crearlo.
    if (localStorage.getItem("carrito")) {
        let carritoAlmacenado = JSON.parse(localStorage.getItem("carrito"));

        //Buscamos si existe el producto en el carrito para aumentar cantidad o incorporar el producto.
        let indice = carritoAlmacenado.findIndex(item => item.id === id);
        if (indice !== -1) {
            carritoAlmacenado[indice].cantidad += 1;
        } else {
            carritoAlmacenado.push(producto);
        }
        localStorage.setItem("carrito", JSON.stringify(carritoAlmacenado));
    } else {
        let carrito = [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    mostrarCarrito();
    Toastify({
        text: "Producto agregado",
        duration: 1000,
        style: {
            background: "green",
            borderRadius: "50px",
            color: "white",
        }

    }).showToast();
}



//Función para mostrar el carrito
function mostrarCarrito() {
    let contenedor = document.getElementById('carrito-lista');
    let totalContenedor = document.getElementById('total-carrito');
    if (contenedor && totalContenedor) {
        contenedor.innerHTML = "";
        totalContenedor.innerHTML = "";

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let total = 0;

        carrito.forEach(producto => {
            total += producto.price * producto.cantidad;
            contenedor.innerHTML += `
                <div class="card mb-2" style="max-width: 100%;">
                    <div class="row g-0">
                        <div class="col-3">
                            <img src="${producto.image}" class="img-fluid rounded-start" alt="${producto.title}">
                        </div>
                        <div class="col-6">
                            <div class="card-body p-2">
                                <h6 class="card-title mb-1">${producto.title}</h6>
                                <p class="card-text mb-1">$${producto.price}</p>
                                <p class="card-text"><small class="text-muted">${producto.category}</small></p>
                                <p class="card-text"><small class="text-muted">Cantidad: ${producto.cantidad} </small></p>
                            </div>
                        </div>
                        <div class="col-3 d-flex align-items-center justify-content-center">
                            <button class="btn btn-danger btn-sm eliminar"  data-id="${producto.id}">🗑</button>
                        </div>
                    </div>
                </div>`;
        });
        if (total !== 0) {
            totalContenedor.innerHTML = `
        <div class="mt-3">
            <h5>Total a pagar: $${total}</h5>
            <button id="btn-comprar" class="btn btn-success mt-2">Comprar</button>
        </div>`;
        }
    }
}


//Función para eliminar producto del carrito
function eliminarProducto(e) {
    const id = parseInt(e.target.dataset.id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    Toastify({
        text: "Producto eliminado",
        duration: 1000,
        style: {
            background: "red",
            borderRadius: "50px",
            color: "white",
        }

    }).showToast();
}


//Función para finalizar Compra
function finalizarCompra() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
    const offcanvas = document.getElementById('offcanvasScrolling');
    const instance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (instance) instance.hide();

    Swal.fire({
        title: "Compra realizada!",
        icon: "success",
        draggable: true
    });
}





//--------------------------------------------------------------------------------------------
// Sección Eventos
//--------------------------------------------------------------------------------------------


//Ingresar en el login
const btnIngresar = document.querySelector("#btn-ingresar");
if (btnIngresar) {
    btnIngresar.addEventListener("click", login);
}


// Mostrar productos
document.addEventListener("DOMContentLoaded", function () {
    const btnHome = document.querySelector("#home");
    if (btnHome) {
        btnHome.addEventListener("click", () => mostrarProductos(productos));
    }
});

// Buscar producto por buscador
document.addEventListener("DOMContentLoaded", function () {
    const formBusqueda = document.querySelector("#form-busqueda");
    if (formBusqueda) {
        formBusqueda.addEventListener("submit", buscar);
    }
});


//Buscar producto por categoría
document.addEventListener("DOMContentLoaded", () => {
    const btnMujeresVestimenta = document.querySelector("#mujeres-vestimenta");
    const btnMujeresAccesorio = document.querySelector("#mujeres-accesorios");
    const btnHombres = document.querySelector("#hombres");
    const btnTecnologia = document.querySelector("#tecnologia");

    if (btnMujeresVestimenta) {
        btnMujeresVestimenta.addEventListener("click", () => buscarPorCategoria("women's clothing"));
    }

    if (btnMujeresAccesorio) {
        btnMujeresAccesorio.addEventListener("click", () => buscarPorCategoria("jewelery"));
    }



    if (btnHombres) {
        btnHombres.addEventListener("click", () => buscarPorCategoria("men's clothing"));
    }

    if (btnTecnologia) {
        btnTecnologia.addEventListener("click", () => buscarPorCategoria("electronics"));
    }

});



document.addEventListener("DOMContentLoaded", function () {

    // Agregar producto al carrito (si existe el contenedor de productos)
    const contenedor = document.getElementById("contenedor-productos");
    if (contenedor) {
        contenedor.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-agregar")) {
                const id = parseInt(e.target.dataset.id);
                agregarProductoCarrito(id);
            }
        });
    }

    // Mostrar carrito (si existe el botón #mi-carrito)
    const btnCarrito = document.querySelector("#mi-carrito");
    if (btnCarrito) {
        btnCarrito.addEventListener("click", mostrarCarrito);
    }

    // Eliminar producto del carrito (no requiere validación porque escucha todo el documento)
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("eliminar")) {
            eliminarProducto(e);
        }
    });

    // Finalizar compra (misma lógica: escucha todo el documento)
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "btn-comprar") {
            finalizarCompra();
        }
    });
});













//document.querySelector("#mi-carrito").addEventListener("click", mostrarCarrito);

/**
const inputBusqueda = document.querySelector("#input-busqueda");
if (inputBusqueda) {
    inputBusqueda.addEventListener("input", limpiarBuscador);
}

document.querySelector("#ButtonEliminarProductoCarrito").addEventListener("click", eliminarProductoCarrito);

*/





/**
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

    if (carrito) {
        carrito.innerHTML = "";
    }


}


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
}*/




/**

// Función lógica para agregar un producto al carrito
function actualizarCarrito(producto, cantidad) {

    if (cantidad <= producto.cantidad) {
        producto.cantidad -= cantidad;
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });

        if (localStorage.getItem("carrito")) {
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

*/

//--------------------------------------------------------------------------------------------

/** 
//Función para mostrar el carrito 
function mostrarCarrito() {
    limpiarSectionComprador();
    if (localStorage.getItem("carrito")) {
        let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado <= 0) {
            alert("No hay productos en el carrito");
        }
        carritoGuardado.forEach(producto => {
            document.getElementById('listarProductos').innerHTML += `<li class="list-group-item">${producto.id}. ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</li>`;
        });
    
    } else {
        if (carrito <= 0) {
            alert("No hay productos en el carrito");
        }
        carrito.forEach(producto => {
            document.getElementById('listarProductos').innerHTML += `<li class="list-group-item">${producto.id}. ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</li>`;
        });
    }


}
*/

