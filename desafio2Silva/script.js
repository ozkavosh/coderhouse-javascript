function Carrito(cliente){
    this.total = 0;
    this.cantidad = 0;
    this.cliente = cliente;
    this.id = Math.round(Math.random() * 999);

    this.darBienvenida = () => {
        alert(`Bienvenido ${this.cliente}`);
        console.log(`Carrito N° ${this.id} Cliente: ${this.cliente}`);
    } 

    this.cargarProductos = () => {
        let numeroIngresado = 0;

        while(numeroIngresado !== 5 && !isNaN(numeroIngresado)){
            numeroIngresado = parseInt(prompt("Simulador de carrito de compras!\n Seleccione sus productos ingresando el número correspondiente:\n 1: Aceite $250\n 2: Bujias $180\n 3: Baterias $390\n 4: Aros $200 \n 5: Finalizar Compra"));
            this.cantidad++;
            switch(numeroIngresado){
                case 1: this.total += 250; break;
                case 2: this.total += 180; break;
                case 3: this.total += 390; break;
                case 4: this.total += 200; break;
                case 5: this.finalizarCompra(); break;
                default: this.cancelarCompra();
            }
        }
    }

    this.calcularIva = () => this.total + this.total * 0.65;

    this.finalizarCompra = () => {
        alert(`Gracias por elegir el carrito N°${this.id}!
        Articulos comprados: ${this.cantidad}
        Precio bruto: $${this.total}
        Precio neto: $${this.calcularIva()}`);
        console.log(`El carrito N° ${this.id} finalizó una compra!
        Articulos comprados: ${this.cantidad}
        Precio bruto: $${this.total}
        Precio neto: $${this.calcularIva()}`);
    }

    this.cancelarCompra = () => {
        alert(`Se canceló la compra!`);
        console.log(`Se canceló la compra!`)
    }
}

let usuario = prompt("Ingrese su usuario:");

const carrito = new Carrito(usuario);

carrito.darBienvenida();
carrito.cargarProductos();





