const cartRow = ({name, price, quantity}, index) => {
  return `<tr id="tr${index}">
              <th scope="row">${index + 1}</th>
              <td>${name}</td>
              <td>$${price}</td>
              <td>${quantity}</td>
              <td> <a class="text-danger" href="#"><i class="fas fa-trash btnEliminar" data-id=${index}></i></a> </td>
          </tr>`;
};

const productCard = ({name, price, description, id, thumbnailUrl}) => {
  return `<div class="card" style="width: 18rem; height: 38rem">
          <img
            src=${thumbnailUrl}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
          </div>
  
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
                $${price}
            </li>
            <li class="list-group-item">
              <input
                type="number"
                class="form-control"
                id="inputCantidad${id}"
                value="1"
                min="1"
                max="20"
              />
            </li>
            <li class="list-group-item">
              <a href="#" class="btn btn-warning btnAgregar" data-id=${id}>Agregar al carrito</a>
            </li>
          </ul>
        </div>`;
};
