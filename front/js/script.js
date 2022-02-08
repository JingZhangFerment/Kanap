//fonction auto-invoquée: une fois les produits récupérés, afficher les informations des produits.
(async function () {
  const products = await getAllProducts();

  //exécuter la fonction "produit" sur chaque élément de "produits".
  products.forEach(product => {
    displayProduct(product);
  });
})();

//récupérer les produits depuis la porte 3000 d'API
function getAllProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}

//afficher les informations des produits sur la page d'accueil
function displayProduct(product) {
  const productLink = document.createElement("a");
  document.getElementById("items").appendChild(productLink);

  const productCard = document.createElement("article");
  productLink.appendChild(productCard);

  const productImage = document.createElement("img");
  productCard.appendChild(productImage);

  const productName = document.createElement("h3");
  productCard.appendChild(productName);
  productName.classList.add("productName");

  const productDescription = document.createElement("p");
  productCard.appendChild(productDescription);
  productDescription.classList.add("productDescription");

  productLink.href = `./product.html?id=${product._id}`;
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;
  productName.textContent = product.name;
  productDescription.textContent = product.description;
}
