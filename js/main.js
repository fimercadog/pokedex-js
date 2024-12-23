// Selecciona el elemento HTML con el id "listaPokemon" donde se mostrarán los Pokémon
const listaPokemon = document.querySelector("#listaPokemon");

// Selecciona todos los botones con la clase "btn-header" (usados para filtrar Pokémon)
const botonesHeader = document.querySelectorAll(".btn-header");

// Define la URL base de la API de Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Realiza un bucle desde 1 hasta 151 (los primeros 151 Pokémon)
for (let i = 1; i <= 151; i++) {
  // Realiza una solicitud a la API para obtener los datos de cada Pokémon por su ID
  fetch(URL + i)
    .then((response) => response.json()) // Convierte la respuesta en un objeto JSON
    .then(data => mostrarPokemon(data)); // Llama a la función mostrarPokemon para renderizar los datos en la página
}

// Función para mostrar los datos de un Pokémon en la interfaz
function mostrarPokemon(poke) {
  //  y crea un párrafo para cada tipo, con una clase que incluye su nombre
  let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  tipos = tipos.join(''); // Convierte el array de tipos en una cadena concatenada

  // Formatea el ID del Pokémon para que siempre tenga 3 dígitos
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = '00' + pokeId; // Si el ID tiene un solo dígito, agrega dos ceros al inicio
  } else if (pokeId.length === 2) {
    pokeId = '0' + pokeId; // Si el ID tiene dos dígitos, agrega un cero al inicio
  }

  // Crea un nuevo elemento div para contener los datos del Pokémon
  const div = document.createElement("div");
  div.classList.add("pokemon"); // Agrega la clase "pokemon" al div
  div.innerHTML = `
            <p class="pokemon-id-back">${pokeId}</p>
            <div class="pokemon-imagen">
              <img
                src="${poke.sprites.other['official-artwork'].front_default}"
                alt="${poke.name}"
              />
            </div>
            <div class="pokemon-info">
              <div class="nombre-contenedor">
                <p class="pokemon-id">${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
              </div>
              <div class="pokemon-tipos">
                ${tipos} <!-- Muestra los tipos del Pokémon -->
              </div>
              <div class="pokemon-stats">
                <div class="stat">${poke.height}m</div> <!-- Altura del Pokémon -->
                <div class="stat">${poke.weight}kg</div> <!-- Peso del Pokémon -->
              </div>
    `;
  // Agrega el div del Pokémon a la lista en la interfaz
  listaPokemon.append(div);
}

// Agrega un evento "click" a cada botón de los filtros
botonesHeader.forEach(boton => boton.addEventListener('click', (event) => {
  const botonId = event.currentTarget.id; // Obtiene el ID del botón clicado

  listaPokemon.innerHTML = ''; // Limpia la lista de Pokémon mostrada en la página

  // Vuelve a recorrer los primeros 151 Pokémon
  for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
      .then((response) => response.json()) // Convierte la respuesta en un objeto JSON
      .then(data => {
        if (botonId == "ver-todos") {
          // Si el botón clicado es "ver-todos", muestra todos los Pokémon
          mostrarPokemon(data);
        } else {
          // De lo contrario, filtra los Pokémon por tipo según el ID del botón
          const tipos = data.types.map(type => type.type.name);
          if (tipos.some(tipo => tipo.includes(botonId))) {
            // Si el tipo del Pokémon coincide con el botón clicado, se muestra
            mostrarPokemon(data);
          }
        }
      });
  }
}));
