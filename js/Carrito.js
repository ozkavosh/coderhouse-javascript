class Carrito {
  constructor(productos, iva = 1.65) {
    this.productos = productos;
    this.IVA = iva;
  }

  renderTotal = () => {
    const bruto = d.getElementById("carritoBruto");
    const neto = d.getElementById("carritoNeto");

    bruto.innerText = this.getTotalBruto();
    neto.innerText = this.getTotalNeto();
  };

  renderCarrito = () => {
    //La plantilla de cada fila es devuelta por la funcion cartRow dentro de dynamicElements.js
    const bodyCarrito = d.getElementById("bodyCarrito");
    bodyCarrito.innerHTML = this.productos
      .map((producto, index) => cartRow(producto, index))
      .join("\n");
    this.renderTotal();
    this.guardarLocal();
  };

  cargarProducto = (nuevoProducto) => {
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

  guardarLocal = () => {
    if (this.productos.length > 0) {
      localStorage.setItem("cart", JSON.stringify(this.productos));
    } else {
      localStorage.removeItem("cart");
    }
  };

  eliminarProducto = (productoIndice) => {
    this.productos.splice(productoIndice, 1);
    this.renderCarrito();
  };

  vaciarCarrito = () => {
    this.productos = [];
    this.renderCarrito();
  };

  getTotalBruto = () =>
    this.productos
      .map((producto) => producto.price * producto.quantity)
      .reduce((acc, precio) => (acc += precio), 0);

  getTotalNeto = () => this.getTotalBruto() * this.IVA;

  getCantidadProductos = () => this.productos.length;
}
