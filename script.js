/*Clases y Objetos*/
function Carrito() {
  this.productos = [];

  this.renderTotal = () => {
    const bruto = document.getElementById("carritoBruto");
    const neto = document.getElementById("carritoNeto");

    bruto.innerText = this.getTotalBruto();
    neto.innerText = this.getTotalNeto();
  };

  this.renderCarrito = () => {
    const bodyCarrito = document.getElementById("bodyCarrito");
    bodyCarrito.innerHTML = this.productos
      .map(
        (producto, index) =>
          `<tr id="tr${index}">
            <th scope="row">${index + 1}</th>
            <td>${producto.name}</td>
            <td>$${producto.price}</td>
            <td>${producto.quantity}</td>
            <td> <a class="text-danger" href="#"><i class="fas fa-trash btnEliminar" data-id=${index}></i></a> </td>
        </tr>`
      )
      .join("\n");
    this.renderTotal();

    //Bindear los botones para eliminar el producto
    const botonesEliminar = document.getElementsByClassName("btnEliminar");
    for (let b of botonesEliminar) {
      b.addEventListener("click", eliminarDelCarrito);
    }
  };

  this.cargarProducto = (nuevoProducto) => {
    //Buscamos si existe el producto en el carrito y al mismo tiempo obtenemos el indice
    let indice = this.productos.indexOf(
      this.productos.find((producto) => producto.name === nuevoProducto.name)
    );
    if (indice !== -1) {
      this.productos[indice].quantity += nuevoProducto.quantity;
    } else {
      this.productos.push(nuevoProducto);
    }
    this.renderCarrito();
  };

  this.eliminarProducto = (productoIndice) => {
    this.productos.splice(productoIndice, 1);
    this.renderCarrito();
  };

  this.vaciarCarrito = () => {
    this.productos = [];
    this.renderCarrito();
  };

  this.getTotalBruto = () =>
    this.productos
      .map((producto) => producto.price * producto.quantity)
      .reduce((acc, precio) => (acc += precio), 0);

  this.getTotalNeto = () => this.getTotalBruto() * 1.65;

  this.getCantidadProductos = () => this.productos.length;
}

//Instanciamos el carrito
const carrito = new Carrito();

/*Mock JSON Productos Temporal*/
const productosTemp = [
  {
    name: "Aceite",
    price: 250,
    thumbnailUrl: "./assets/img/aceite.jpg",
    description: "250ml de aceite de primera calidad.",
    category: "varios",
    id: 1,
  },
  {
    name: "Bujia",
    price: 180,
    thumbnailUrl: "./assets/img/bujia.jpg",
    description: "Bujia para motocicleta de 110cc.",
    category: "mecanicos",
    id: 2,
  },
  {
    name: "Bateria",
    price: 390,
    thumbnailUrl: "./assets/img/bateria.jpg",
    description: "Bateria gel para motocicleta.",
    category: "electronicos",
    id: 3,
  },
  {
    name: "Aros",
    price: 200,
    thumbnailUrl: "./assets/img/aros.jpg",
    description: "Kit de aros para piston de motocicleta.",
    category: "mecanicos",
    id: 4,
  },
];

/*Funciones para eventos*/
const renderRangoFiltro = (event) => {
  //Muestra el valor del rango.
  let output = document.getElementById("valorRangoFiltro");
  output.value = event.srcElement.value;
};

const crearProductos = (contenedorProductos, arrayProductos) =>{
  for (let p of arrayProductos) {
    const producto = document.createElement("div");
    producto.className = "col";

    producto.innerHTML = `<div class="card" style="width: 18rem">
          <img
            src=${p.thumbnailUrl}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.description}</p>
          </div>
  
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
                $${p.price}
            </li>
            <li class="list-group-item">
              <input
                type="number"
                class="form-control"
                id="inputCantidad${p.id}"
                value="1"
                min="1"
                max="20"
              />
            </li>
            <li class="list-group-item">
              <a href="#" class="btn btn-dark btnAgregar" data-id=${p.id}>Agregar al carrito</a>
            </li>
          </ul>
        </div>`;

    contenedorProductos.appendChild(producto);
  }
}

const renderProductos = () => {
  //Renderiza los productos dentro del contenedor de productos.
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  crearProductos(contenedorProductos, productosTemp);

  //Bindear los botones de cada card al carrito
  let botonesCards = document.getElementsByClassName("btnAgregar");
  for (const b of botonesCards) {
    b.addEventListener("click", agregarAlCarrito);
  }
};

const agregarAlCarrito = (event) => {
  //Agrega un producto al carrito, despues renderiza
  const productoId = Number(event.srcElement.dataset.id);
  const producto = productosTemp.find((producto) => producto.id === productoId);
  const cantidad = Number(
    document.getElementById(`inputCantidad${productoId}`).value
  );

  carrito.cargarProducto({
    name: producto.name,
    price: producto.price,
    quantity: cantidad,
  });
};

const eliminarDelCarrito = (event) => {
  //Elimina un producto del carrito, despues renderiza
  const id = Number(event.srcElement.dataset.id);
  carrito.eliminarProducto(id);
};

const buscarProductos = (e) => {
  e.preventDefault();
  //Busca un producto y lo renderiza si lo encuentra
  let busqueda = document.getElementById("inputBuscar").value.toLowerCase();

  if (!busqueda) return renderProductos(); //Si no se ingreso nada al input no hace falta buscar

  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  if (
    productosTemp.some((producto) =>
      producto.name.toLowerCase().includes(busqueda)
    )
  ) {
    const producto = document.createElement("div");
    producto.className = "col";
    const filtro = productosTemp.filter((producto) =>
      producto.name.toLowerCase().includes(busqueda)
    );

    crearProductos(contenedorProductos, filtro);

    //Bindear los botones de cada card al carrito
    let botonesCards = document.getElementsByClassName("btnAgregar");
    for (const b of botonesCards) {
      b.addEventListener("click", agregarAlCarrito);
    }
  } else {
    const myModal = new bootstrap.Modal(
      document.getElementById("busquedaModal"),
      { focus: true }
    );
    myModal.show();
    renderProductos();
  }
};

const limpiarBusqueda = (e) => {
  e.preventDefault();
  //Limpia el input de busqueda y renderiza todos los productos
  let inputBuscar = document.getElementById("inputBuscar");
  inputBuscar.value = "";

  renderProductos();
};

const filtrarProductos = (e) => {
  e.preventDefault();
  //Filtra y renderiza los productos segun los parametros ingresados
  const categoria = document.querySelector(".form-check-input:checked").value;
  const precioMaximo = Number(document.getElementById("rangoPrecio").value);

  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  const producto = document.createElement("div");
  producto.className = "col";
  const filtro = productosTemp.filter(
    (producto) =>
      producto.category === categoria && producto.price <= precioMaximo
  );

  if (filtro.length > 0) {
    crearProductos(contenedorProductos, filtro);

    //Bindear los botones de cada card al carrito
    let botonesCards = document.getElementsByClassName("btnAgregar");
    for (const b of botonesCards) {
      b.addEventListener("click", agregarAlCarrito);
    }
  } else {
    const myModal = new bootstrap.Modal(
      document.getElementById("filtroModal"),
      { focus: true }
    );
    myModal.show();
    renderProductos();
  }
};

const comprarProductos = (e) => {
  e.preventDefault();
  if (carrito.getCantidadProductos() > 0) {
    const myModal = new bootstrap.Modal(
      document.getElementById("compraModal"),
      { focus: true }
    );
    myModal.show();
    carrito.vaciarCarrito();
  }
};

/*Bindeo a eventos*/

const rangoFiltro = document.getElementById("rangoPrecio");
rangoFiltro.addEventListener("input", renderRangoFiltro);

const btnBuscar = document.querySelector(".btnBuscar");
btnBuscar.addEventListener("click", buscarProductos);

const btnLimpiar = document.getElementsByClassName("btnLimpiar");
[...btnLimpiar].forEach((btn) =>
  btn.addEventListener("click", limpiarBusqueda)
);

const btnFiltrar = document.querySelector(".btnFiltrar");
btnFiltrar.addEventListener("click", filtrarProductos);

const btnComprar = document.querySelector(".btnComprar");
btnComprar.addEventListener("click", comprarProductos);

window.addEventListener("load", renderProductos);
