//fonction auto-invoquée: une fois les produits IDs récupérés, afficher les produits selon leurs ids
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProduct(product);
})();

//récupérer le produit ID (un paramètre d'URL) depuis l'URL de la page courante
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

//récupérer new URL(location.href).searchParams.get("id");le produit selon le produit ID depuis la porte 3000 d'API
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
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

//afficher les infos (image, nom, prix, description, couleurs) du produit
function hydrateProduct(product) {
  const productImage = document.createElement("img");
  document.getElementsByClassName("item__img")[0].appendChild(productImage);
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;

  const productName = document.getElementById("title");
  productName.textContent = product.name;

  const productPrice = document.getElementById("price");
  productPrice.textContent = product.price;

  const productDescription = document.getElementById("description");
  productDescription.textContent = product.description;

  //fonction pour faire afficher les options couleurs du produit
  product.colors.forEach((color) => {
    const productColorsOption = document.createElement("option");
    const productColors = document.getElementById("colors");
    productColors.appendChild(productColorsOption);
    productColorsOption.textContent = color;
    productColorsOption.value = color;
    console.log(color);
  });
}

//-----LOCAL STORAGE-------
//enregistrer les modifications lors de chaque click de la bouton "ajouter du panier"
const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function (event) {
  // créer un tableau du produit (id, couleur,quantité)
  let productAdded = {
    id: getProductId(),
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };

  // créer une variable pour la liste des produits
  let productList = [];

  populateStorage(productList);
});

//fonction pour enregistrer la clé/valeur au localStorage
function populateStorage(productAdded) {
  //transformer l'objet en chaîne de caractère
  localStorage.setItem("productAdded", JSON.stringify(productAdded));
}

//fonction pour récupérer les données du localStorage s'il y en a
function getStorage() {
  let productAdded = localStorage.getItem("productAdded");
  if (productAdded == null) {
    return [];
  } else {
    return JSON.parse(productAdded);
  }
}

function addStorage() {
  let productAdded = getStorage();
  // verifier s'il y a déjà des produits dans le localStorage
  if (productList) {
    productList.push(productAdded);
    console.log(productList);
    popupConfirmation();
  } else {
    // verifier s'il n'y a pas de produits enregistré dans le localStorage
    productList = [];
    productList.push(productAdded);
    console.log(productList);
    popupConfirmation();
  }
}

//fonction pour confirmer le choix du panier
function popupConfirmation() {
  if (
    window.confirm(`Votre produit "${
      document.getElementById("title").textContent
    }", 
  couleur: ${document.getElementById("colors").value}, 
  quantité: ${document.getElementById("quantity").value}, 
  a bien été ajouté au panier.`)
  ) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "product.html";
  }
}
