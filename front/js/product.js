//une fois les produits IDs récupérés, afficher les produits selon leurs ids
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProduct(product);
})();

//récupérer le produit ID (un paramètre d'URL) depuis l'URL de la page courante
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

//récupérer le produit selon le produit ID depuis la porte 3000 d'API
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (product) {
      return product;
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

  //faire afficher les options couleurs du produit
  product.colors.forEach((color) => {
    const productColorsOption = document.createElement("option");
    const productColors = document.getElementById("colors");
    productColors.appendChild(productColorsOption);
    productColorsOption.textContent = color;
    productColorsOption.value = color;
  });
}

//-----LOCAL STORAGE-------

//enregistrer les modifications lors de chaque click de la bouton "ajouter du panier"
const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function (event) {
  let productToAddIntoCart = {
    id: getProductId(),
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };

  let isValid = true;

  //gérer le cas où la couleur du produit n'est pas remplie
  if (productToAddIntoCart.color == "") {
    isValid = false;
    window.alert("Veuillez sélectionner une couleur pour le canapé.");
  }
  //gérer le cas où il y a une valeur (>100 ou <1) pour la quantité du produit
  if (
    productToAddIntoCart.quantity > 100 ||
    productToAddIntoCart.quantity < 1
  ) {
    isValid = false;
    window.alert("Veuillez sélectionner une quantité entre 1 et 100. ");
  }

  if (isValid) {
    addProductToCartIntoStorage(productToAddIntoCart);
  }
});

//enregistrer le panier en chaîne de caractère dans le localStorage par clé/valeur
function saveToLocalStorage(myCart) {
  localStorage.setItem("myCart", JSON.stringify(myCart));
}

//récupérer les données du localStorage
function getCartDataFromStorage() {
  let productSavedIntoCart = localStorage.getItem("myCart");
  // vérifier le cas où il y a déjà des données enregistrées dans le localStorage
  if (productSavedIntoCart == null) {
    return [];
  } else {
    //transformer les données du LocalStorage en javascript
    return JSON.parse(productSavedIntoCart);
  }
}

//ajouter un produit nouveau ou exisitant dans le localStorage

function addProductToCartIntoStorage(newProduct) {
  let savedProducts = getCartDataFromStorage();
  // s'il y a déjà des produits enregistrés dans le localStorage
  if (savedProducts.length > 0) {
    savedProducts.forEach((oneItemOfSavedProduct) => {
      // si le produit est déjà présent (même id + couleur)
      if (
        oneItemOfSavedProduct.id == newProduct.id &&
        oneItemOfSavedProduct.color == newProduct.color
      ) {
        let newProductQtyInt = parseInt(newProduct.quantity);
        let oneItemOfSavedProductQtyInt = parseInt(
          oneItemOfSavedProduct.quantity
        );
        oneItemOfSavedProduct.quantity =
          newProductQtyInt + oneItemOfSavedProductQtyInt;
      } else {
        savedProducts.push(newProduct);
      }
    });
    popupConfirmation();
  } else {
    savedProducts = [];
    savedProducts.push(newProduct);
    popupConfirmation();
  }

  saveToLocalStorage(savedProducts);
}

//message de confirmation pour le choix du panier
function popupConfirmation() {
  window.confirm(`Votre produit "${
    document.getElementById("title").textContent
  }", 
  couleur: ${document.getElementById("colors").value}, 
  quantité: ${document.getElementById("quantity").value}, 
  a bien été ajouté au panier.`);

  window.location.href = "cart.html";
}
