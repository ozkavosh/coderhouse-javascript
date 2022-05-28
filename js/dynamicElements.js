const cartRow = (producto, index) => {
  return `<tr id="tr${index}">
              <th scope="row">${index + 1}</th>
              <td>${producto.name}</td>
              <td>$${producto.price}</td>
              <td>${producto.quantity}</td>
              <td> <a class="text-danger" href="#"><i class="fas fa-trash btnEliminar" data-id=${index}></i></a> </td>
          </tr>`;
};

const productCard = (producto) => {
  return `<div class="card" style="width: 18rem">
          <img
            src=${producto.thumbnailUrl}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
          </div>
  
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
                $${producto.price}
            </li>
            <li class="list-group-item">
              <input
                type="number"
                class="form-control"
                id="inputCantidad${producto.id}"
                value="1"
                min="1"
                max="20"
              />
            </li>
            <li class="list-group-item">
              <a href="#" class="btn btn-dark btnAgregar" data-id=${producto.id}>Agregar al carrito</a>
            </li>
          </ul>
        </div>`;
};
