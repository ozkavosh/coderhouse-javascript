let numero = parseInt(
  prompt("Ingrese un número para mostrar su tabla de multiplicar")
);

if (isNaN(numero)){ //Si no se ingresó un número.
  console.log("No se ingresó un número válido!");
  document.write(
    "<li>No se ingresó un número válido!</li>"
  );
} else { //Si se ingresó un número.
  console.log("Tabla de Multiplicar del número " + numero);
  for (let i = 0; i < 10; i++) {
    console.log(numero + " X " + (i + 1) + " = " + numero * (i + 1));
    document.write(
      "<li>" + numero + " X " + (i + 1) + " = " + numero * (i + 1) + "</li>"
    );
  }
}
