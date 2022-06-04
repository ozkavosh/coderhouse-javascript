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
const carrito = new Carrito(JSON.parse(localStorage.getItem("cart")) || []);

/*Funciones para eventos*/
const renderRangoFiltro = ({ target: objetivo }) => {
  if (!objetivo.matches("#rangoPrecio")) return;
  //Muestra el valor del rango.
  valorRango.value = rangoFiltro.value;
};

const agregarAlCarrito = ({
  target: objetivo,
  srcElement: {
    dataset: { id },
  },
}) => {
  //Agrega un producto al carrito, despues renderiza
  if (!objetivo.matches(".btnAgregar")) return;
  const productoId = Number(id);
  const cantidad = Number(d.getElementById(`inputCantidad${productoId}`).value);

  fetchProductos().then((productos) => {
    const { name, price } = productos.find(
      (producto) => producto.id === productoId
    );

    carrito.cargarProducto({
      name,
      price,
      quantity: cantidad,
      id: productoId
    });

    Toastify({
      text: `Se agregó ${cantidad} producto${
        cantidad > 1 ? "s" : ""
      } al carrito!`,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      duration: 1000,
      close: true,
    }).showToast();
  });
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

const buscarProductos = (e) => {
  if (!e.target.matches(".btnBuscar")) return;
  e.preventDefault();
  //Busca un producto y lo renderiza si lo encuentra
  const busqueda = inputBuscar.value.toLowerCase();

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
      swal({
        title: "Error al buscar",
        text: "No se encontraron productos relacionados con tu busqueda!",
        icon: "error",
        button: "Aceptar",
      });
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

    const filtro = productos.filter((producto) => {
      return e.target.matches(".form-check-input")
        ? producto.category === radioSeleccionado.value
        : radioSeleccionado
          ? producto.category === radioSeleccionado.value && producto.price <= precioMaximo
          : producto.price <= precioMaximo
    })

    if (filtro.length > 0) {
      crearProductos(filtro);
    } else {
      swal({
        title: "Error al filtrar",
        text: "No se encontraron productos con estos filtros!",
        icon: "error",
        button: "Aceptar",
      });
      renderProductos();
    }
  });
};

const finalizarCompra = (e) => {
  if (!e.target.matches(".btnComprar")) return;
  e.preventDefault();

  const exito = {
    title: "Compra exitosa",
    text: "Gracias por tu compra!",
    icon: "success",
    button: "Aceptar",
  };

  const error = {
    title: "Error al comprar",
    text: "Su carrito esta vacio!",
    icon: "error",
    button: "Aceptar",
  };

  if (carrito.getCantidadProductos()) {
    swal(exito);
    carrito.vaciarCarrito();
  } else {
    swal(error);
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
