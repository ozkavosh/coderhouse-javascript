function Producto(nombre, precio, descripcion){
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
}

function Carrito(){
    this.id = Math.round(Math.random() * 999);
    this.productos = [];

    this.darBienvenida = () => {
        console.log(`Carrito N° ${this.id}`);
    }

    this.mostrarMenu = () => {
        let numeroIngresado = 0;

        while(numeroIngresado !== 5 && !isNaN(numeroIngresado)){
            numeroIngresado = parseInt(prompt("Simulador de carrito de compras!\n Seleccione una opcion ingresando el número correspondiente:\n 1: Elegir productos\n 2: Ver Carrito\n 3: Ver total\n 4: Eliminar producto del carrito \n 5: Finalizar Compra"));

            switch(numeroIngresado){
                case 1:
                        this.cargarProductos();
                        break;
                case 2:
                        alert(`Carrito N°${this.id} | Productos ${this.getCantidadProductos()}\n${this.getProductos()}`);
                        break;
                case 3:
                        alert(`Precio bruto: $${this.getTotalBruto()} | Precio neto: $${this.getTotalNeto()}`)
                        break;
                case 4:
                        this.eliminarProducto(parseInt(prompt(`Ingrese el número del producto a eliminar del carrito!\n${this.getProductos()}`)));
                        break;
                case 5: this.finalizarCompra();
                        break;
                default: alert("No se ingreso una opcion valida!");
            }
        }
    }

    this.eliminarProducto = (productoIndice) => {
        if(productoIndice <= 0 || productoIndice > this.getCantidadProductos() || isNaN(productoIndice)){
            alert("No se ingreso un numero valido!")
        }else{
            this.productos.splice((productoIndice - 1), 1);
            alert("Carrito actualizado!")
        }
    }

    this.cargarProductos = () => {
        let numeroIngresado = 0;

        while(numeroIngresado !== 5 && !isNaN(numeroIngresado)){
            numeroIngresado = parseInt(prompt("Eleccion de productos!\n Seleccione los productos ingresando el número correspondiente:\n 1: Aceite $250\n 2: Bujia $180\n 3: Bateria $390\n 4: Aros $200 \n 5: Volver al menu"));

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
                case 5:
                        break;
                default: alert("Hubo un error al agregar el producto!");
            }
        }
    }

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

    this.getTotalBruto = () => this.productos.map((producto) => producto.precio).reduce((acc, precio) => acc += precio, 0);

    this.getTotalNeto = () => this.getTotalBruto() * 1.65;

    this.getCantidadProductos = () => this.productos.length;

    this.getProductos = () => this.productos.map((producto, index) => `${index + 1} - NOMBRE: ${producto.nombre} | PRECIO: $${producto.precio}`).join('\n');
}

const carrito = new Carrito();

carrito.mostrarMenu();
