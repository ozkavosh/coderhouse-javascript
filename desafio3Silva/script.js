function Producto(nombre, precio, descripcion){
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
}

function Carrito(cliente){
    this.cliente = cliente;
    this.id = Math.round(Math.random() * 999);
    this.productos = [];

    this.darBienvenida = () => {
        alert(`Bienvenido ${this.cliente}`);
        console.log(`Carrito N° ${this.id} Cliente: ${this.cliente}`);
    } 

    this.cargarProductos = () => {
        let numeroIngresado = 0;

        while(numeroIngresado !== 5 && !isNaN(numeroIngresado)){
            numeroIngresado = parseInt(prompt("Simulador de carrito de compras!\n Seleccione sus productos ingresando el número correspondiente:\n 1: Aceite $250\n 2: Bujia $180\n 3: Bateria $390\n 4: Aros $200 \n 5: Finalizar Compra"));

            switch(numeroIngresado){
                case 1:
                        this.productos.push(new Producto('Aceite', 250, '250ml de aceite de primera calidad'));
                        break;
                case 2:
                        this.productos.push(new Producto('Bujia', 180, 'Bujia para motocicleta de 110cc'));
                        break;
                case 3:
                        this.productos.push(new Producto('Bateria', 390, 'Bateria gel para motocicleta'));
                        break;
                case 4:
                        this.productos.push(new Producto('Aros', 200, 'Kit de aros para piston de motocicleta'));
                        break;
                case 5: this.finalizarCompra();
                        break;
                default: this.cancelarCompra();
            }
        }
    }

    this.getTotalBruto = () => this.productos.map((producto) => producto.precio).reduce((acc, precio) => acc += precio, 0);

    this.getTotalNeto = () => this.getTotalBruto() * 1.65;

    this.getCantidadProductos = () => this.productos.length;

    this.finalizarCompra = () => {
        alert(`Gracias por elegir el carrito N°${this.id}!
        Articulos comprados: ${this.getCantidadProductos()}
        Precio bruto: $${this.getTotalBruto()}
        Precio neto: $${this.getTotalNeto()}`);

        console.log(`El carrito N° ${this.id} finalizó una compra!
        Articulos comprados: ${this.getCantidadProductos()}
        Precio bruto: $${this.getTotalBruto()}
        Precio neto: $${this.getTotalNeto()}`);
    }

    this.cancelarCompra = () => {
        alert(`Se canceló la compra!`);
        console.log(`Se canceló la compra!`)
    }
}

let usuario = prompt("Ingrese su usuario:");

if(!usuario) while(!usuario) usuario = prompt("Error al ingresar el usuario!\nIntentelo nuevamente:");

const carrito = new Carrito(usuario);

carrito.darBienvenida();
carrito.cargarProductos();





