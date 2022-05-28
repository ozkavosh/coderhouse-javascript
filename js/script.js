/*Utils*/
const d = document;
const w = window;
const rangoFiltro = d.getElementById("rangoPrecio");
const valorRango = d.getElementById("valorRangoFiltro");
const contenedorProductos = d.getElementById("contenedorProductos");
const inputBuscar = d.getElementById("inputBuscar");

const crearProductos = (arrayProductos) => {
  //Crea productos dado un array dentro del contenedor de productos
  //La plantilla de cada producto es devuelta por la funcion productCard dentro de dynamicElements.js
  for (let p of arrayProductos) {
    const producto = d.createElement("div");
    producto.className = "col";
    producto.innerHTML = productCard(p);
    contenedorProductos.appendChild(producto);
  }
};

const renderProductos = () => {
  //Renderiza los productos dentro del contenedor de productos.
  contenedorProductos.innerHTML = "";

  fetchProductos().then((productos) => {
    crearProductos(productos);
  });
};

//Instanciamos el carrito
const carrito = new Carrito(
  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
);

/*Funciones para eventos*/
const renderRangoFiltro = (e) => {
  if (!e.target.matches("#rangoPrecio")) return;
  //Muestra el valor del rango.
  valorRango.value = rangoFiltro.value;
};

const agregarAlCarrito = (e) => {
  //Agrega un producto al carrito, despues renderiza
  if (!e.target.matches(".btnAgregar")) return;
  const productoId = Number(e.srcElement.dataset.id);
  const cantidad = Number(d.getElementById(`inputCantidad${productoId}`).value);

  fetchProductos().then((productos) => {
    const producto = productos.find((producto) => producto.id === productoId);

    carrito.cargarProducto({
      name: producto.name,
      price: producto.price,
      quantity: cantidad,
    });
  });
};

const eliminarDelCarrito = (e) => {
  if (!e.target.matches(".btnEliminar")) return;
  //Elimina un producto del carrito, despues renderiza
  const id = Number(e.srcElement.dataset.id);
  carrito.eliminarProducto(id);
};

const buscarProductos = (e) => {
  if (!e.target.matches(".btnBuscar")) return;
  e.preventDefault();
  //Busca un producto y lo renderiza si lo encuentra
  let busqueda = inputBuscar.value.toLowerCase();

  if (!busqueda) return renderProductos(); //Si no se ingreso nada al input no hace falta buscar

  contenedorProductos.innerHTML = "";

  fetchProductos().then((productos) => {
    if (
      productos.some((producto) =>
        producto.name.toLowerCase().includes(busqueda)
      )
    ) {
      const producto = d.createElement("div");
      producto.className = "col";
      const filtro = productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda)
      );

      crearProductos(filtro);
    } else {
      const myModal = new bootstrap.Modal(d.getElementById("busquedaModal"), {
        focus: true,
      });
      myModal.show();
      renderProductos();
    }
  });
};

const limpiarBusqueda = (e) => {
  if (!e.target.matches(".btnLimpiar")) return;
  e.preventDefault();
  //Limpia el input de busqueda y renderiza todos los productos
  const radioSeleccionado = d.querySelector(".form-check-input:checked");

  inputBuscar.value = "";
  if (radioSeleccionado) radioSeleccionado.checked = false;
  rangoFiltro.value = rangoFiltro.min;
  valorRango.value = rangoFiltro.min;

  renderProductos();
};

const filtrarProductos = (e) => {
  if (
    !e.target.matches(".btnFiltrar") &&
    !e.target.matches(".form-check-input")
  )
    return;
  if (e.target.matches(".btnFiltrar")) e.preventDefault();
  //Filtra y renderiza los productos segun los parametros ingresados
  const radioSeleccionado = d.querySelector(".form-check-input:checked");
  const precioMaximo = Number(rangoFiltro.value);

  contenedorProductos.innerHTML = "";

  fetchProductos().then((productos) => {
    const producto = d.createElement("div");
    producto.className = "col";

    let filtro;

    if (e.target.matches(".form-check-input")) {
      filtro = productos.filter(
        (producto) => producto.category === radioSeleccionado.value
      );
    } else if (radioSeleccionado) {
      filtro = productos.filter(
        (producto) =>
          producto.category === radioSeleccionado.value &&
          producto.price <= precioMaximo
      );
    } else {
      filtro = productos.filter((producto) => producto.price <= precioMaximo);
    }

    if (filtro.length > 0) {
      crearProductos(filtro);
    } else {
      const myModal = new bootstrap.Modal(d.getElementById("filtroModal"), {
        focus: true,
      });
      myModal.show();
      renderProductos();
    }
  });
};

const finalizarCompra = (e) => {
  if (!e.target.matches(".btnComprar")) return;
  e.preventDefault();
  if (carrito.getCantidadProductos() > 0) {
    const myModal = new bootstrap.Modal(d.getElementById("compraModal"), {
      focus: true,
    });
    myModal.show();
    carrito.vaciarCarrito();
  }
};

/*Bindeo a eventos*/
w.addEventListener("load", () => {
  renderProductos(), carrito.renderCarrito();
});

d.addEventListener("click", (e) => {
  agregarAlCarrito(e);
  eliminarDelCarrito(e);
  limpiarBusqueda(e);
  buscarProductos(e);
  filtrarProductos(e);
  finalizarCompra(e);
});

d.addEventListener("input", (e) => {
  renderRangoFiltro(e);
});
