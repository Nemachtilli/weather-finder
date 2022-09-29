const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.alert');

    if (!alerta) {
        console.log(mensaje);

    const alerta = document.createElement('div');

    alerta.classList.add('alert', 'alert-danger');

    alerta.innerHTML = `
        <strong> Error! ${mensaje}</strong>
    `;

    resultado.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);

    }
}

function consultarAPI(ciudad, pais) {
    
    const appId = '93f90253f65d7cc7404a9c166ffc04e4';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            console.log(datos);
            
            limpiarHTML();
            
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }
            mostrarClima(datos);
        })

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min, humidity}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `El clima actual en ${name} es de:`;
    nombreCiudad.classList.add('font-weight-bold' ,'display-3');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-weight-bold' ,'display-2');
    
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('font-weight-bold' ,'display-4');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('font-weight-bold' ,'display-4');

    const humedad = document.createElement('p');
    humedad.innerHTML = `Humedad: ${humidity}%`;
    humedad.classList.add('font-weight-bold' ,'display-4');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-light');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(humedad);

    resultado.appendChild(resultadoDiv);
}

// function kelvinACentigrados(grados) {
//     return parseInt(grados - 273.15);
// }

const kelvinACentigrados = grados => parseInt(grados - 273.15)

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
