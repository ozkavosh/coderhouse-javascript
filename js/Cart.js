class Cart {
  constructor(items, iva = 1.21) {
    this.items = items;
    this.IVA = iva;
  }

  renderCartWidgetCount = () => {
    const cartWidgetCount = document.querySelector(".cartWidgetCount");
    cartWidgetCount.innerHTML =
      this.itemQuantity > 99 ? "99+" : this.itemQuantity;
  };

  renderAmount = () => {
    const amount = document.querySelector("#cartAmount");
    amount.innerText = this.netAmount.toLocaleString();
  };

  renderCart = () => {
    const cartBody = document.querySelector("#cartBody");
    cartBody.innerHTML = this.items
      .map((item, index) => cartRow(item, index))
      .join("\n");
    this.renderAmount();
    this.renderCartWidgetCount();
    this.saveAtLocal();
  };

  saveAtLocal = () => {
    this.items.length > 0
      ? localStorage.setItem("cart", JSON.stringify(this.items))
      : localStorage.removeItem("cart");
  };

  addItem = (newItem) => {
    this.items = this.items.some((item) => item.id == newItem.id)
      ? this.items.map((item) =>
          item.id == newItem.id
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
              }
            : item
        )
      : [...this.items, newItem];

    this.renderCart();
  };

  deleteItem = (itemIndex) => {
    this.items.splice(itemIndex, 1);
    this.renderCart();
  };

  emptyCart = () => {
    this.items = [];
    this.renderCart();
  };

  get grossAmount() {
    return this.items
      .map(({ price, quantity }) => price * quantity)
      .reduce((acc, price) => acc + price, 0);
  }

  get netAmount() {
    return this.grossAmount * this.IVA;
  }

  get itemQuantity() {
    return this.items
      .map(({ quantity }) => quantity)
      .reduce((acc, quantity) => acc + quantity, 0);
  }
}
