//fonction auto-invoquée: une fois les produits IDs récupérés, afficher les produits selon leurs ids
(async function(){
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProduct(product);
})();

//récupérer le produit ID (un paramètre d'URL) depuis l'URL de la page courante
function getProductId () {
  return new URL(location.href).searchParams.get("id");
 
}

//récupérer le produit selon le produit ID depuis la porte 3000 d'API
function getProduct (productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
   .then (function(httpBodyResponse) {
     return httpBodyResponse.json();
   })
   .then (function(products) {
     return products;
   })
   .catch (function(error){
     alert(error)
   })
}

//afficher les infos (image, prix, description, couleurs) du produit 
function hydrateProduct (product) {
  
  const productImage = document.createElement("img");
  document.getElementsByClassName("item__img")[0].appendChild(productImage);
  productImage.src = `${product.imageUrl}`;

  const productPrice = document.getElementById("price");
  productPrice.textContent = `${product.price}`;

  const productDescription = document.getElementById("description");
  productDescription.textContent = `${product.description}`;

  const productColors = document.getElementById("colors");
    for (let i=0; i < product.colors.length; i++) {
    const productColorsOption = document.createElement("option");
    productColors.appendChild(productColorsOption);
    productColorsOption.textContent = `${product.colors[i]}`;
  }
}
