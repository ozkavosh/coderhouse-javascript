//Plantillas de elementos HTML para ser usadas por la aplicación.
const cartRow = ({ name, price, quantity }, index) => {
  return `
    <tr id="tr${index}">
      <th scope="row">${index + 1}</th>
      <td>${name}</td>
      <td>$${price.toLocaleString()}</td>
      <td>${quantity}</td>
      <td> <i class="text-danger fas fa-trash btnDelete" data-id=${index}></i> </td>
    </tr>
    `.trim();
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
  </div>
  `.trim();
};

const productCard = ({ name, price, id, thumbnailUrl }) => {
  return `
  <div class="card" style="width: 18rem">
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
        <a class="btn btn-warning btnProductDetail w-100" style="border-top-right-radius: 0; border-top-left-radius: 0;" data-id=${id}>Ver Detalles</a>
      </li>
    </ul>
  </div>
  `.trim();
};

const productDetail = ({ name, price, description, id, thumbnailUrl }) => {
  return `
  <div class="row">
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
        id="quantityInput${id}"
        value="1"
        min="1"
        max="20"
      />
      <button
        type="button"
        class="btn btn-warning btnAdd mt-2 w-100"
        data-bs-dismiss="modal"
        data-id=${id}
      >
        Agregar al carrito
      </button>
    </div>
  </div>
  `.trim();
};

const purchaseDetail = () => {
  return `
  <div class="row mb-2">
    <div class="col-auto mb-2">
      <label for="name" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="name" placeholder="Nombre completo">
    </div>

    <div class="col-auto">
      <label for="email" class="form-label">Correo</label>
      <input type="email" class="form-control" id="email" placeholder="Correo@dominio.com">
    </div>

    <div class="col-12 mb-2">
      <label for="address" class="form-label">Dirección</label>
      <input type="text" class="form-control" id="address" placeholder="Dirección 123">
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
      <label for="ccNumber" class="form-label">Número</label>
      <input type="number" class="form-control" id="ccNumber" placeholder="000000000000">
    </div>

    <div class="col-auto">
      <label for="ccExpDate" class="form-label">Fecha de expiración</label>
      <input type="month" class="form-control" id="ccExpDate" placeholder="MM/AA">
    </div>

    <div class="col-auto">
      <label for="ccCode" class="form-label">Codigo de seguridad</label>
      <input type="number" class="form-control" id="ccCode" placeholder="000">
    </div>
  </div>

  <div class="row">
    <h6 class="text-center text-danger text-uppercase formError"></h6>
  </div>

  <div class="row">
    <button class="btn btn-warning w-100 btnPurchase" type="submit">Comprar</button>
  </div>
  `.trim();
};
