//-----------Affichage du produit sélectionné --------------

//une fois le produit ID récupéré, afficher le produit selon son id
(async function () {
  const productId = getProductId();
  const product = await getOneProduct(productId);
  hydrateProduct(product);
})();

//récupérer le produit ID (un paramètre d'URL) depuis l'URL de la page courante
function getProductId() {
  const url = new URL(location.href);
  const idInUrl = url.searchParams.get("id");
  return idInUrl;
}

//récupérer le produit depuis la porte 3000 d'API
function getOneProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (product) {
      return product;
    })
    .catch(function (error) {
      alert(
        "Le produit que vous demandez n'existe pas malheureusement, merci de retourner sur la page d'accueil."
      );
    });
}

//afficher les détails du produit
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

  const productColors = document.getElementById("colors");

  //ajouter chaque couleur du produit
  product.colors.forEach((color) => {
    let productColorsOption = document.createElement("option");
    productColors.appendChild(productColorsOption);
    productColorsOption.textContent = color;
    productColorsOption.value = color;
  });
}

//------------------LOCAL STORAGE-------------------------------
const addToCart = document.getElementById("addToCart");

//écouter la modification de "ajouter au panier"
addToCart.addEventListener("click", function (event) {
  event.preventDefault();

  //construction d'un tableau des données pour le contenu du panier
  let productToAddIntoCart = {
    id: getProductId(),
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };

  // élément de validation
  let isValid = true;
  
  //avant d'ajouter au panier, vérifier s'il y a une couleur choisi
  if (productToAddIntoCart.color == "") {
    isValid = false;
    alert("Veuillez sélectionner une couleur pour le canapé.");
  }

  //avant d'ajouter au panier, vérifier si la quantité est un chiffre entier
  let numbers = /^[0-9]+$/;
  if (!productToAddIntoCart.quantity.match(numbers)) {
    isValid = false;
    alert("Veuillez sélectionner un chiffre entier.");
  }

  //avant d'ajouter au panier, vérifier s'il y a une quantité choisi
  if (
    productToAddIntoCart.quantity > 100 ||
    productToAddIntoCart.quantity < 1
  ) {
    isValid = false;
    alert("Veuillez sélectionner une quantité entre 1 et 100.");
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

  //élément de validation
  let didIFindTheProduct = false;
  // s'il y a déjà des produits enregistrés dans le localStorage
  if (savedProducts.length > 0) {
    savedProducts.forEach((oneItemOfSavedProduct) => {
      // si c'est le même produit (même id + couleur)
      if (
        oneItemOfSavedProduct.id == newProduct.id &&
        oneItemOfSavedProduct.color == newProduct.color
      ) {
        didIFindTheProduct = true;
        //convertir la quantité en chaîne de caractère et renvoyer un nombre sur une base décimale
        let newProductQtyInt = parseInt(newProduct.quantity, 10);
        let oneItemOfSavedProductQtyInt = parseInt(
          oneItemOfSavedProduct.quantity,
          10
        );
        //incrémenter la quantité
        oneItemOfSavedProduct.quantity =
          newProductQtyInt + oneItemOfSavedProductQtyInt;
      }
    });
    // si ce n'est pas le même produit
    if (didIFindTheProduct === false) {
      savedProducts.push(newProduct);
    }
    popupConfirmation();
    //si le panier est dans le localStorage
  } else {
    savedProducts = [];
    savedProducts.push(newProduct);
    popupConfirmation();
  }
  //enregistrer les modifications dans le localStorage
  saveToLocalStorage(savedProducts);
}

//message de confirmation pour le choix du panier
function popupConfirmation() {
  if (
    window.confirm(`Votre produit "${
      document.getElementById("title").textContent
    }", 
  couleur: ${document.getElementById("colors").value}, 
  quantité: ${document.getElementById("quantity").value}, 
  a bien été ajouté au panier. 
  Appuyez "OK" pour consulter le panier ou "annuler" pour modifier.`)
  ) {
    window.location.href = "cart.html";
  } else {
    window.location;
  }
}
