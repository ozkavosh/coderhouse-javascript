/*Utils*/
const d = document;
const w = window;
const rangoFiltro = d.getElementById("rangoPrecio");
const valorRango = d.getElementById("valorRangoFiltro");
const contenedorProductos = d.getElementById("contenedorProductos");
const contenedorMotos = d.getElementById("contenedorMotos");
const inputBuscar = d.getElementById("inputBuscar");

const fetchProductos = async () => {
  try {
    const productos = await fetch("./js/productos.json");
    return await productos.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchMotos = async () => {
  try {
    const motos = await fetch("./js/motos.json");
    return await motos.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchProductoPorId = async (idBuscado) => {
  const productos = await fetchProductos();
  return productos.find(({id}) => id == idBuscado);
}

const alertErrorBusqueda = {
  title: "Error al buscar",
  text: "No se encontraron productos relacionados con la busqueda!",
  icon: "error",
  button: "Aceptar",
};

const alertErrorFiltro = {
  title: "Error al filtrar",
  text: "No se encontraron productos con estos filtros!",
  icon: "error",
  button: "Aceptar",
};

const alertExitoCompra = {
  title: "Compra exitosa",
  text: "Gracias por tu compra!",
  icon: "success",
  button: "Aceptar",
};

const alertErrorCompra = {
  title: "Error al comprar",
  text: "Su carrito esta vacio!",
  icon: "error",
  button: "Aceptar",
};

//Instanciamos el carrito
const carrito = new Carrito(JSON.parse(localStorage.getItem("cart")) || []);

/*Funciones para eventos*/
const crearProductos = (arrayProductos) => {
  //Crea productos dado un array dentro del contenedor de productos
  //La plantilla de cada producto es devuelta por la funcion productCard dentro de dynamicElements.js
  contenedorProductos.innerHTML = "";
  for (let p of arrayProductos) {
    const producto = d.createElement("div");
    producto.className = "col";
    producto.innerHTML = productCard(p);
    contenedorProductos.appendChild(producto);
  }
};

const renderProductos = async () => {
  //Renderiza los productos dentro del contenedor de productos.
  const productos = await fetchProductos();
  crearProductos(productos);
};

const renderRangoFiltro = ({ target: objetivo }) => {
  if (!objetivo.matches("#rangoPrecio")) return;
  //Muestra el valor del rango.
  valorRango.value = rangoFiltro.value;
};

const agregarAlCarrito = async ({
  target: objetivo,
  srcElement: {
    dataset: { id },
  },
}) => {
  //Agrega un producto al carrito, despues renderiza
  if (!objetivo.matches(".btnAgregar")) return;
  const productoId = Number(id);
  const cantidad = Number(d.getElementById(`inputCantidad${productoId}`).value);
  const productos = await fetchProductos();

  const { name, price } = productos.find(
    (producto) => producto.id === productoId
  );

  carrito.cargarProducto({
    name,
    price,
    quantity: cantidad,
    id: productoId,
  });

  Toastify({
    text: `Se agregó ${cantidad} producto${
      cantidad > 1 ? "s" : ""
    } al carrito!`,
    style: {
      background: "#f47c3c",
    },
    duration: 1000,
    close: true,
  }).showToast();
};

const eliminarDelCarrito = ({
  target: objetivo,
  srcElement: {
    dataset: { id },
  },
}) => {
  if (!objetivo.matches(".btnEliminar")) return;
  //Elimina un producto del carrito, despues renderiza
  carrito.eliminarProducto(Number(id));
};

const buscarProductos = async (e) => {
  if (!e.target.matches(".btnBuscar") && !e.target.matches(".fa-search"))
    return;
  e.preventDefault();
  //Busca un producto y lo renderiza si lo encuentra
  const busqueda = inputBuscar.value.toLowerCase();
  if (!busqueda) return renderProductos(); //Si no se ingreso nada al input no hace falta buscar
  const productos = await fetchProductos();

  if (
    productos.some((producto) => producto.name.toLowerCase().includes(busqueda))
  ) {
    const filtro = productos.filter((producto) =>
      producto.name.toLowerCase().includes(busqueda)
    );
    crearProductos(filtro);
  } else {
    swal(alertErrorBusqueda);
    renderProductos();
  }
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

const filtrarProductos = async (e) => {
  if (
    !e.target.matches(".btnFiltrar") &&
    !e.target.matches(".form-check-input")
  )
    return;
  if (e.target.matches(".btnFiltrar")) e.preventDefault();
  //Filtra y renderiza los productos segun los parametros ingresados
  const radioSeleccionado = d.querySelector(".form-check-input:checked");
  const precioMaximo = Number(rangoFiltro.value);
  const productos = await fetchProductos();

  const filtro = productos.filter((producto) => {
    return e.target.matches(".form-check-input")
      ? producto.category === radioSeleccionado.value
      : radioSeleccionado
      ? producto.category === radioSeleccionado.value &&
        producto.price <= precioMaximo
      : producto.price <= precioMaximo;
  });

  filtro.length
    ? crearProductos(filtro)
    : (swal(alertErrorFiltro), renderProductos());
};

const finalizarCompra = (e) => {
  if (!e.target.matches(".btnComprar")) return;
  e.preventDefault();

  carrito.getCantidadProductos()
    ? (swal(alertExitoCompra), carrito.vaciarCarrito())
    : swal(alertErrorCompra);
};

const mostrarDetalle = async (e) => {
  if(!e.target.matches(".btnVerDetalle")) return;
  const id = e.target.dataset.id;
  const modal = document.querySelector('.modal-body');
  modal.innerHTML = productDetail(await fetchProductoPorId(id));
  const detail = new bootstrap.Modal('#detalle', { focus: true });
  detail.show();
}

const renderMotos = async () => {
  const motos = await fetchMotos();

  motos.forEach((moto, index) => {
    const slice = d.createElement('div');
    slice.classList = index ? "carousel-item" : "carousel-item active";
    slice.innerHTML = motoCard(moto);
    contenedorMotos.appendChild(slice);
  })
}

/*Bindeo a eventos*/
w.addEventListener("load", () => {
  renderProductos(); 
  carrito.renderCarrito();
  renderMotos();
});

d.addEventListener("click", (e) => {
  agregarAlCarrito(e);
  eliminarDelCarrito(e);
  limpiarBusqueda(e);
  buscarProductos(e);
  filtrarProductos(e);
  finalizarCompra(e);
  mostrarDetalle(e);
});

d.addEventListener("input", (e) => {
  renderRangoFiltro(e);
});
