//Plantillas de SweetAlert para usar en la aplicación.
const alertConfirmDeleteProduct = {
  title: "¿Esta seguro de eliminar el producto del carrito?",
  text: "Esta acción no se puede deshacer!",
  icon: "warning",
  buttons: {
    cancelar: { text: "Cancelar", className: "bg-dark" },
    aceptar: { text: "Aceptar", className: "bg-warning", value: 'confirm' },
  },
  className: "bg-light",
};

const alertConfirmDeleteProducts = {
  title: "¿Esta seguro de eliminar todos los productos del carrito?",
  text: "Esta acción no se puede deshacer!",
  icon: "warning",
  buttons: {
    cancelar: { text: "Cancelar", className: "bg-dark" },
    aceptar: { text: "Aceptar", className: "bg-warning", value: 'confirm' },
  },
  className: "bg-light",
};

const alertSuccessDeleteProduct = {
  title: "Producto eliminado",
  text: "Se elimino el producto seleccionado!",
  icon: "success",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
}

const alertSuccessDeleteProducts = {
  title: "Productos eliminados",
  text: "Se eliminaron todos los productos!",
  icon: "success",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
}

const alertErrorSearch = {
  title: "Error al buscar",
  text: "No se encontraron productos relacionados con la busqueda!",
  icon: "error",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
};

const alertErrorFilter = {
  title: "Error al filtrar",
  text: "No se encontraron productos con estos filtros!",
  icon: "error",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
};

const alertSuccessPurchase = {
  title: "Compra exitosa",
  icon: "success",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
};

const alertErrorCart = {
  title: "Error",
  text: "Su carrito esta vacio!",
  icon: "error",
  button: { text: "Aceptar", className: "bg-warning" },
  className: "bg-light",
};
