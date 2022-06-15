const cartRow = ({ name, price, quantity }, index) => {
  return `<tr id="tr${index}">
              <th scope="row">${index + 1}</th>
              <td>${name}</td>
              <td>$${price.toLocaleString()}</td>
              <td>${quantity}</td>
              <td> <a class="text-danger"><i class="fas fa-trash btnEliminar" data-id=${index}></i></a> </td>
          </tr>`;
};

const motoCard = ({ name, brand, price, description, thumbnailUrl, id }) => {
  return `
  <div class="row align-items-center flex-column flex-md-row">
    <div class="col order-last order-md-first">
      <div class="row align-items-center">
        <div class="col text-white">
          <h4>${brand}</h4>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-auto text-white">
          <h4 class="fs-1">${name}</h4>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-auto text-white">
          <p>
            ${description}
          </p>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-auto text-white">
          <h5 class="fs-3">$${price.toLocaleString()}</h5>
        </div>
      </div>

      <div class="row align-items-center mt-2 mb-4">
        <div class="col-auto text-white" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Próximamente venta online">
          <button
            class="btn btn-warning disabled"
            data-id=${id}
          >
            Más información
          </button>
        </div>
      </div>
    </div>

    <div class="col imgMoto">
      <img
        src=${thumbnailUrl}
        alt="imagen de moto"
        class="img-fluid"
      />
    </div>
  </div>`;
};

const productCard = ({ name, price, id, thumbnailUrl }) => {
  return `<div class="card" style="width: 18rem">
          <img
            src=${thumbnailUrl}
            class="card-img-top p-4"
            style="width: 100%; height: 300px; background-image: url('./assets/img/fondoItem.jpg'); background-size: cover;)"
            alt="..."
          />
          <div class="card-body p-1">
            <h5 class="card-title fw-bold text-center text-uppercase">${name}</h5>
          </div>
  
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">
                $${price.toLocaleString()}
            </li>
            <li class="list-group-item p-0">
              <a class="btn btn-warning btnVerDetalle w-100" style="border-top-right-radius: 0; border-top-left-radius: 0;" data-id=${id}>Ver Detalles</a>
            </li>
          </ul>
        </div>`;
};

const productDetail = ({ name, price, description, id, thumbnailUrl }) => {
  return `<div class="row">
  <div class="col">
    <img
      src=${thumbnailUrl}
      class="img-fluid"
      alt=${description}
    />
  </div>

  <div class="col">
    <h3>${name} <span class="text-secondary fs-6">art.${id}</span> </h3>
    <p>${description}</p>
    <p>Precio unitario: $${price.toLocaleString()}</p>
    <label for="cantidad">Cantidad</label>
    <input
      type="number"
      class="form-control"
      id="inputCantidad${id}"
      value="1"
      min="1"
      max="20"
    />
    <button
    type="button"
    class="btn btn-warning btnAgregar mt-2 w-100"
    data-bs-dismiss="modal"
    data-id=${id}
  >
    Agregar al carrito
  </button>
  </div>
</div>`;
};

const purchaseDetail = () => {
  return `
  <div class="row mb-2">
    <div class="col-auto mb-2">
      <label for="nombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="nombre" placeholder="Nombre completo">
    </div>

    <div class="col-auto">
      <label for="correo" class="form-label">Correo</label>
      <input type="email" class="form-control" id="correo" placeholder="Correo@dominio.com">
    </div>

    <div class="col-12 mb-2">
      <label for="direccion" class="form-label">Dirección</label>
      <input type="text" class="form-control" id="direccion" placeholder="Callefalsa 123">
    </div>
  </div>
  
  <div class="row mb-2">
    <h5>Datos de la tarjeta</h5>

    <div class="row fs-4 text-warning">
      <div class="col-auto">
        <i class="fab fa-cc-mastercard"></i>
      </div>

      <div class="col-auto">
        <i class="fab fa-cc-visa"></i>
      </div>

      <div class="col-auto">
        <i class="fab fa-cc-amex"></i>
      </div>

      <div class="col-auto">
        <i class="fab fa-cc-amazon-pay"></i>
      </div>

      <div class="col-auto">
        <i class="fab fa-cc-paypal"></i>
      </div>
    </div>

    <div class="col-12 mb-2">
      <label for="tarjetaNumero" class="form-label">Número</label>
      <input type="number" class="form-control" id="tarjetaNumero" placeholder="000000000000">
    </div>

    <div class="col-auto">
      <label for="tarjetaFecha" class="form-label">Fecha de expiración</label>
      <input type="year" class="form-control" id="tarjetaFecha" placeholder="MM/AA">
    </div>

    <div class="col-auto">
      <label for="tarjetaCodigo" class="form-label">Codigo de seguridad</label>
      <input type="number" class="form-control" id="tarjetaCodigo" placeholder="000">
    </div>
  </div>

  <div class="row">
    <h6 class="text-center text-danger text-uppercase formError"></h6>
  </div>

  <div class="row">
    <button class="btn btn-warning w-100 btnComprar" type="submit">Comprar</button>
  </div>`;
};
