/*Utils*/
//Variables que referencian elementos del documento
const productsContainer = document.querySelector("#productsContainer");
const motorcyclesContainer = document.querySelector("#motorcyclesContainer");
const filterMaxPriceRange = document.querySelector("#filterMaxPriceRange");
const filterMaxPriceOutput = document.querySelector("#filterMaxPriceOutput");
const searchInput = document.querySelector("#searchInput");
const modalBody = document.querySelector(".modal-body");
const modalLabel = document.querySelector("#modal-label");
let purchaseModal; //Esta variable va a almacenar los modales de compra para poder ocultarlos y borrarlos para optimizar memoria.

//Funciones auxiliares
const fetchProducts = async () => {
  //Obtener los productos del archivo JSON
  try {
    const products = await fetch("./js/products.json");
    return await products.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchProductById = async (searchedId) => {
  //Obtener un solo producto por su id
  const products = await fetchProducts();
  return products.find(({ id }) => id == searchedId);
};

const fetchMotorcycles = async () => {
  //Obtener las motos del archivo JSON
  try {
    const motorcycles = await fetch("./js/motorcycles.json");
    return await motorcycles.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

//Instancia del carrito
const cart = new Cart(JSON.parse(localStorage.getItem("cart")) || []);

/*Funciones para eventos*/
const renderOrder = (e) => {
  //Renderiza la orden y simula un numero de orden generado aleatoriamente
  if (!e.target.matches(".btnPurchase")) return;
  const formError = document.querySelector(".formError");

  validateForm()
    ? (swal({
        ...alertSuccessPurchase,
        text: `Gracias por su compra! Su número de pedido es: ${Math.round(
          Math.random() * 1000 + 1
        )}`,
      }),
      cart.emptyCart(),
      purchaseModal.hide(),
      delete purchaseModal)
    : (formError.innerHTML = "Todos los campos son obligatorios!");
};

const renderProductDetail = async (e) => {
  //Renderiza el modal de detalle del producto
  if (!e.target.matches(".btnProductDetail")) return;
  const id = e.target.dataset.id;
  modalLabel.innerHTML = "Detalle del producto";
  modalBody.innerHTML = productDetail(await fetchProductById(id));
  const detail = new bootstrap.Modal("#modal", { focus: true });
  detail.show();
};

const renderMotos = async () => {
  //Renderiza los slices del carrusel de motos
  const motorcycles = await fetchMotorcycles();

  motorcycles.forEach((motorcycle, index) => {
    const slice = document.createElement("div");
    slice.classList = index ? "carousel-item" : "carousel-item active";
    slice.innerHTML = motoCard(motorcycle);
    motorcyclesContainer.appendChild(slice);
  });

  const buttons = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...buttons].map((btn) => new bootstrap.Tooltip(btn, {}));
};

const renderProducts = async () => {
  //Renderiza los productos dentro del contenedor de productos.
  const products = await fetchProducts();
  createProducts(products);
};

const renderFilterRangeValue = ({ target }) => {
  if (!target.matches("#filterMaxPriceRange")) return;
  //Muestra el valor del rango.
  filterMaxPriceOutput.value = filterMaxPriceRange.value;
};

const renderPurchaseDetail = () => {
  //Renderiza el modal del formulario de compra
  modalLabel.innerHTML = "Detalle de compra";
  modalBody.innerHTML = purchaseDetail();
  purchaseModal = new bootstrap.Modal("#modal", { focus: true });
  purchaseModal.show();
};

const createProducts = (productsArray) => {
  //Crea productos dado un array dentro del contenedor de productos
  productsContainer.innerHTML = "";

  productsArray.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.className = "col";
    productElement.innerHTML = productCard(item);
    productsContainer.appendChild(productElement);
  });
};

const addToCart = async ({
  target,
  srcElement: {
    dataset: { id },
  },
}) => {
  //Agrega un producto al carrito, despues renderiza
  if (!target.matches(".btnAdd")) return;
  const productId = Number(id);
  const quantity = Number(
    document.getElementById(`quantityInput${productId}`).value
  );
  const products = await fetchProducts();

  const { name, price } = products.find(({ id }) => id === productId);

  cart.addItem({
    name,
    price,
    quantity,
    id: productId,
  });

  Toastify({
    text: `Se agregó ${quantity} producto${
      quantity > 1 ? "s" : ""
    } al carrito!`,
    style: {
      background: "#f47c3c",
    },
    duration: 1500,
    close: true,
  }).showToast();
};

const deleteFromCart = async ({
  target,
  srcElement: {
    dataset: { id },
  },
}) => {
  if (!target.matches(".btnDelete")) return;
  //Elimina un producto del carrito, despues renderiza

  const option = await swal(alertConfirmDeleteProduct);
  switch (option) {
    case "confirm":
      cart.deleteItem(Number(id));
      swal(alertSuccessDeleteProduct);
      break;
  }
};

const productSearch = async (e) => {
  if (!e.target.matches(".btnSearch")) return;
  e.preventDefault();
  //Busca un producto y lo renderiza si lo encuentra
  const query = searchInput.value.toLowerCase();
  if (!query) return renderProducts(); //Si no se ingreso nada al input no hace falta buscar
  const products = await fetchProducts();
  const filter = products.filter(({ name }) =>
    name.toLowerCase().includes(query)
  );

  filter.length
    ? createProducts(filter)
    : (swal(alertErrorSearch), renderProducts());
};

const productFilter = async (e) => {
  if (!e.target.matches(".btnFilter") && !e.target.matches(".form-check-input"))
    return;
  if (e.target.matches(".btnFilter")) e.preventDefault();
  //Filtra y renderiza los productos segun los parametros ingresados
  const checkedRadio = document.querySelector(".form-check-input:checked");
  const maxPrice = Number(filterMaxPriceRange.value);
  const products = await fetchProducts();

  const filter = products.filter(({ category, price }) => {
    return e.target.matches(".form-check-input")
      ? category === checkedRadio.value
      : checkedRadio
      ? category === checkedRadio.value && price <= maxPrice
      : price <= maxPrice;
  });

  filter.length
    ? createProducts(filter)
    : (swal(alertErrorFilter), renderProducts());
};

const clearFilters = (e) => {
  if (!e.target.matches(".btnClear")) return;
  e.preventDefault();
  //Limpia el input de busqueda y renderiza todos los productos
  const checkedRadio = document.querySelector(".form-check-input:checked");

  if (checkedRadio) checkedRadio.checked = false;
  searchInput.value = "";
  filterMaxPriceRange.value = filterMaxPriceRange.min;
  filterMaxPriceOutput.value = filterMaxPriceRange.min;

  renderProducts();
};

const completePurchase = (e) => {
  //Llama a renderizar el modal de formulario de compra
  if (!e.target.matches(".btnCompletePurchase")) return;
  e.preventDefault();

  cart.itemQuantity ? renderPurchaseDetail() : swal(alertErrorCart);
};

const validateForm = () => {
  //Valida los campos del formulario en caso de que alguno este vacio devuelve falso
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const address = document.querySelector("#address").value;
  const ccNumber = document.querySelector("#ccNumber").value;
  const ccExpDate = document.querySelector("#ccExpDate").value;
  const ccCode = document.querySelector("#ccCode").value;

  return name && email && address && ccNumber && ccExpDate && ccCode;
};

const clearCart = async (e) => {
  //Vacia el carrito y renderiza
  if(!e.target.matches(".btnClearCart")) return;

  if(!cart.itemQuantity) return swal(alertErrorCart);

  const option = await swal(alertConfirmDeleteProducts);
  switch (option) {
    case "confirm":
      cart.emptyCart();
      swal(alertSuccessDeleteProducts);
      break;
  }
}

/*Bindeo a eventos*/
window.addEventListener("load", () => {
  renderProducts();
  cart.renderCart();
  renderMotos();
});

document.addEventListener("click", (e) => {
  addToCart(e);
  clearCart(e);
  clearFilters(e);
  completePurchase(e);
  deleteFromCart(e);
  productSearch(e);
  productFilter(e);
  renderOrder(e);
  renderProductDetail(e);
});

document.addEventListener("input", (e) => {
  renderFilterRangeValue(e);
});
