let evitarCierreCarrito = false;

function recibirComentarios() {
    const comentarios = [];

    const boton = document.getElementById('botonComentario');
    const textarea = document.getElementById('inputComentario');

    const texto = textarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribí un comentario antes de enviarlo.");
        return;
    } else {
        comentarios.push(texto);
        textarea.value = "";
        alert("¡Gracias por dejarnos tu comentario!");
    }
}

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregarCarrito');
    const botonVaciar = document.querySelector('.vaciar-carrito');
    const botonFinalizar = document.querySelector('.finalizar-compra');

    botonesAgregar.forEach((btn, index) => {
        btn.addEventListener('click', () => agregarAlCarrito(index));
    });

    botonVaciar.addEventListener('click', vaciarCarrito);
    botonFinalizar.addEventListener('click', finalizarCompra);

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    mostrarCarrito();
    activarBotonesMas();
    activarBotonesMenos();

    //Muestra o esconde el carrito manualmente
    document.getElementById('botonCarrito').addEventListener('click', () => {
        const carrito = document.getElementById('cestaContenido');
        carrito.classList.toggle('oculto');
        evitarCierreCarrito = true;
    });

    // Esconde el carrito si se aprieta afuera
    document.addEventListener('click', (e) => {
        const carrito = document.getElementById('cestaContenido');
        const boton = document.getElementById('botonCarrito');

        if (evitarCierreCarrito) {
            evitarCierreCarrito = false;
            return;
        }

        if (!carrito.contains(e.target) && !boton.contains(e.target)) {
            carrito.classList.add('oculto');
        }
    });

    // Menu hamburgueza
    const menuHamburguesa = document.querySelector(".links-navegacion")
    const menuNav = document.querySelector(".links-navegacion nav")

    if (menuHamburguesa && menuNav) {
    menuHamburguesa.addEventListener("click", () => {
        menuNav.classList.toggle("menu-abierto")
    })

    // Cierra el menú cuando se hace clic en un enlace
    const enlaces = menuNav.querySelectorAll("a")
    for (let i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener("click", () => {
        menuNav.classList.remove("menu-abierto")
        })
    }

    // Cierra el menú cuando se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!menuHamburguesa.contains(e.target)) {
        menuNav.classList.remove("menu-abierto")
        }
    })
    }
});

function agregarAlCarrito(index) {
    const productos = document.querySelectorAll('.producto');
    const producto = productos[index];
    const nombre = producto.querySelector('.nombreProducto').textContent;
    const precioTexto = producto.querySelector('.precio').textContent;
    const cantidad = parseInt(producto.querySelector('.inputCantidad').value);

    const precio = parseFloat(precioTexto.replace('$', '').replace('.', '').replace(',', '.'));

    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    mostrarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Abre el carrito al cuando se agrega algo
    const carritoElement = document.getElementById('cestaContenido');
    carritoElement.classList.remove('oculto');
    evitarCierreCarrito = true;
}

function mostrarCarrito() {
    const tbody = document.querySelector('table tbody');
    const totalElemento = document.querySelector('.precio-total h3:nth-child(2)');
    const mensaje = document.querySelector('.contenido-carrito p');
    const tabla = document.querySelector('.contenido-carrito table');
    const totalBox = document.querySelector('.precio-total');
    const botones = document.querySelector('.botones-carrito');

    tbody.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        mensaje.style.display = 'block';
        tabla.style.display = 'none';
        totalBox.style.display = 'none';
        botones.style.display = 'none';
        totalElemento.textContent = '$0';
        return;
    }

    mensaje.style.display = 'none';
    tabla.style.display = 'table';
    totalBox.style.display = 'flex';
    botones.style.display = 'flex';

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal.toLocaleString()}</td>
            <td><button onclick="eliminarProducto(${index})"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(fila);
    });

    totalElemento.textContent = `$${total.toLocaleString()}`;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    evitarCierreCarrito = true; // Evitar que se cierre el carrito
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    alert("La cesta ha sido vaciada.");
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agregá productos antes de finalizar la compra.");
    } else {
        alert("¡Gracias por tu compra! Se ha realizado de manera exitosa.");
        carrito = [];
        mostrarCarrito();
        localStorage.removeItem('carrito');
    }
}

function activarBotonesMas() {
    const botonesMas = document.querySelectorAll('.btnMas');
    const inputsCantidad = document.querySelectorAll('.inputCantidad');

    botonesMas.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            let valor = parseInt(inputsCantidad[index].value);
            inputsCantidad[index].value = valor + 1;
        });
    });
}

function activarBotonesMenos() {
    const botonesMenos = document.querySelectorAll('.btnMenos');
    const inputsCantidad = document.querySelectorAll('.inputCantidad');

    botonesMenos.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            let valor = parseInt(inputsCantidad[index].value);
            if (valor > 1) {
                inputsCantidad[index].value = valor - 1;
            }
        });
    });
}
