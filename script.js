/* Animación de error 404 */

window.onload = function () {
	var error = Snap.select("#error" ),
      hole = Snap.select("#svg-hole" ),
      hand = Snap.select("#svg-hand" ),
      mask = Snap.select("#svg-mask" );
	function onSVGLoaded( ){
		function animOn(){
			hand.animate({
				transform: "t10,-300, r0"
			}, 4500, mina.easeinout, animOut);
			mask.animate({
				transform: "t-10,300, r0"
			}, 4500, mina.easeinout);
		}
		function animOut() {
			hand.animate({
				transform: "t-10,-305, r0"
			}, 4500, mina.easeinout, animOn);

			mask.animate({
				transform: "t10,305, r0"
			}, 4500, mina.easeinout);
		};
    function open() {
			clearTimeout(timer);
			hand.animate({
				transform: "t0,-300"
			}, 800, mina.backout, animOn);

			mask.animate({
				transform: "t0,300"
			}, 800, mina.backout);
		}
		timer = setTimeout(open, 1000);
		hand.attr({
			mask: mask
		});
	}
  onSVGLoaded();
};

/* Calculó del valor del ticket a pagar y verificación de que el formulario está completo antes de hacer Submit */

// Definimos el valor del ticket:
let valorTicket = 200;

// Definimos los porcentajes de descuento usando el equivalente:
let descuentoEstudiante = 0.20;
let descuentoTrainee = 0.50;
let descuentoJunior = 0.85;

// Guardamos los elementos del formulario en variables:
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let mail = document.getElementById("mail");
let cantidad = document.getElementById('cantidadTickets');
let categoria = document.getElementById('categoriaSelect');
let botonCalcular = document.getElementById('submit');
let botonReset = document.getElementById('erase');
let resultado = document.getElementById('total');
let checked = document.getElementById('check');

// Eliminamos el estilo de campo incompleto que tiene el form por defecto:
function quitarClaseError() {
    let x = document.getElementById("formulario");
    let i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('is-invalid');
    }
}

// Hacemos una función que toma el valor total, lo multiplica por el valor del ticket, luego aplica el descuento y muestra el resultado:
function totalPagar(){
    let totalValor = (cantidad.value) * valorTicket; // .value es una propiedad que solo da el valor de lo que se ingresa en el formulario.
    if(categoria.value == 1){
        totalValor = totalValor * descuentoEstudiante;
    } else if (categoria.value == 2) {
        totalValor = totalValor * descuentoTrainee;
    } else if (categoria.value == 3) {
        totalValor = totalValor * descuentoJunior;
    } else {
        totalValor = totalValor;
    }
    resultado.innerHTML = `TOTAL: $${totalValor}`; // Modifica el span para que de el resultado.
}

// Función para que aparezca el div del total a pagar y el botón para hacer el pago si el formulario está completo, sino emite un alert para completarlo:
function showTotal() {
	// Quitamos estilo de verificación por defecto:
	quitarClaseError();
	// Verificamos que se haya completado el nombre, el apellido y el mail:
	if (nombre.value === "") {
        alert("Please, complete your name.");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;
    }
	if (apellido.value === "" ) {
        alert("Please, complete your last name.");
        apellido.classList.add("is-invalid");
        apellido.focus();
        return;
    }
	if (mail.value === "") {
        alert("Please, complete your email address.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }
	// Verificamos que se trate de un mail válido:
	const emailValido = mail => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    }
    if (!emailValido(mail.value)) {
        alert("Please, enter a valid email address.");
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }
	// Verificamos que se haya ingresado una cantidad de tickets y una categoría de descuento:
	if ( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value)) ) {
        alert("Please, enter an amount of tickets.");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }
	if (categoria.value == "") {
        alert("Please, select a discount category.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }
    // Verificamos que se haya hecho check al consentimiento de haber leido los términos y condiciones:
	if (!checked.checked) {
		alert("Please, read and accept the terms and conditions.");
        checked.classList.add("is-invalid");
        categoria.focus();
        return;
	}
	// Si todos los campos están completos, se muestra el valor del ticket calculado y el botón para ir a la página de pago:
	document.getElementById('total').style.display = "block";
	document.getElementById('pay').style.display = "block";
    // Y desliza la pantalla hasta el div con el total a pagar:
    document.getElementById('total').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
 }

// Función para ocultar el div del total a pagar y el botón para ir a la página de pago:
 function hideTotal() {
	document.getElementById('total').style.display = "none";
    document.getElementById('pay').style.display = "none";
 }

// Función para limpiar el formulario:
function limpiarForm(){
	document.getElementById("formulario").reset();
    // Y desliza la pantalla hasta el div del formulario:
    document.getElementById('Buy').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

/* Eventos botones submit y reset */

// Evento boton submit para calcular el precio a pagar, verificar que todos los campos estén completos y mostrar el total a pagar y el botón para ir a la página de pago:
botonCalcular.addEventListener('click', totalPagar);
botonCalcular.addEventListener('click', showTotal);

// Evento boton reset para reiniciar formulario y ocultar total a pagar:
botonReset.addEventListener('click', limpiarForm);
botonReset.addEventListener('click', hideTotal);