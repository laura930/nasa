const auth = "API KEY";
const gallery = document.querySelector("#contenedor");
const searchInput = document.querySelector("#inputBuscar");
const btn= document.querySelector("#btnBuscar");
let searchValue;
let fetchLink;

searchInput.addEventListener("input", updateInput);
btn.addEventListener("click", () => {
  searchInfo(searchValue); // linea 61
})


function updateInput(e){
    //console.log(e.target.value)
    searchValue= e.target.value;
}
async function fetchApi(url) {
    const dataFetch = await fetch('https://images-api.nasa.gov/search?q='+ searchValue, 
        { // objeto que especifica detalles de la respuesta
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth
      }
    });
    const data = await dataFetch.json();
    return data;
  }
  
  function generatePictures(data) {
    const filterItems = data.collection.items.filter(item => {
      return item.data.length > 0 && item.data[0].title.toLowerCase().includes(searchValue.toLowerCase());
  });
 
        gallery.className= "row row-cols-3 row-cols-md-3 g-4 "; // agrego clase en relacion a bootstrap
        
        filterItems.forEach(item => {

          const galleryImg = document.createElement("div");
                galleryImg.className = "col"; // Clase para columna
              
        galleryImg.innerHTML = `

                  <div class="card h-100">
                    <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}">
                    <div class="card-body">
                      <div class="scrollable-content">
                          <h5 class="card-title">${item.data[0].title}</h5>
                          <p class="card-text">${item.data[0].description || 'No description available.'}</p>
                          <p class="card-text"><small class="text-body-secondary">${item.data[0].date_created}</small></p>
                   </div>
                </div>
              </div>
                `;
        gallery.appendChild(galleryImg);

    });
  }

  async function searchInfo(searchValue) {
    clear();
    fetchLink = 'https://images-api.nasa.gov/search?q='+ searchValue;// Documentacion de la api : GET /search?q={q}

    const data = await fetchApi(fetchLink);
    generatePictures(data);
  }

  function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
  }