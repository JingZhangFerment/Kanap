//------------tableau récapitulatif des achats ----------------

//récupérer les données enregistrées des produits dans le localStorage
let getCartData = getCartDataFromStorage();

//si le localStorage est vide
function getCartDataFromStorage() {
  let productSavedIntoCart = localStorage.getItem("myCart");
  if (productSavedIntoCart == null) {
    return [];
  } else {
    //transformer les données du LocalStorage en javascript
    return JSON.parse(productSavedIntoCart);
  }
}

//récupérer le produit selon le produit ID depuis la porte 3000 d'API
function getOneProduct(productId) {
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

//afficher les données (id, color, quantity, image, alt, nom, prix)
async function displayCart(getCartData) {
  let myTotalQuantity = 0;
  let myTotalPrice = 0;

  for (i = 0; i < getCartData.length; i++) {
    let cartData = getCartData[i];
    //élement des DOM
    const productDataFromApi = await getOneProduct(cartData.id);

    const cartItem = createDivArticle(cartData.id, cartData.color);

    const cartItemDivImage = createDivCartItemImg(cartItem);

    const cartItemImage = createCartItemImg(
      cartItemDivImage,
      productDataFromApi
    );

    const cartItemContent = createCartItemContent(cartItem);

    const cartItemContentDescription =
      createCartItemContentDescription(cartItemContent);

    const cartItemName = createDivH2(
      cartItemContentDescription,
      productDataFromApi
    );

    createDivColor(cartItemContentDescription, cartData);

    createItemPrice(cartItemContentDescription, productDataFromApi.price);

    const cartItemContentSettings =
      createDivCartItemContentSettings(cartItemContent);

    const cartItemContentSettingsQuantity = createDivCartItemSettingsQuantity(
      cartItemContentSettings
    );

    createCartItemDivQuantity(cartItemContentSettingsQuantity);

    const cartItemQuantity = createQuantityInput(
      cartItemContentSettingsQuantity,
      cartData.quantity
    );

    const cartItemContentSettingsDelete =
      createDivCartItemContentSettingsDelete(cartItemContentSettings);

    const deleteItem = createDeleteItem(cartItemContentSettingsDelete);

    //executer la fonction "suppression"
    registerDeleteAction(deleteItem, cartData, getCartData);

    //executer la fonction "changer la quantité"
    changeCartItemQuantity(cartItemQuantity, cartData, getCartData);

    //calculer la quantité totale
    myTotalQuantity += parseInt(cartItemQuantity.value);

    //calculer le prix total
    myTotalPrice = myTotalQuantity * productDataFromApi.price;
  }

  //afficher la quantité totale
  calculateTotalQuantity(myTotalQuantity);

  //afficher le prix totale
  calculateTotalPrice(myTotalPrice);
}

displayCart(getCartData);

//insertion de la balise "article"
function createDivArticle(id, color) {
  const cartItem = document.createElement("article");
  document.querySelector("#cart__items").appendChild(cartItem);
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", id);
  cartItem.setAttribute("data-color", color);

  return cartItem;
}

//insertion de la div "cart__item__img"
function createDivCartItemImg(parent) {
  const cartItemDivImage = document.createElement("div");
  parent.appendChild(cartItemDivImage);
  cartItemDivImage.classList.add("cart__item__img");

  return cartItemDivImage;
}

//insertion de la balise "image"
function createCartItemImg(parent, productDataFromApi) {
  const cartItemImage = document.createElement("img");
  parent.appendChild(cartItemImage);
  cartItemImage.src = productDataFromApi.imageUrl;
  cartItemImage.alt = productDataFromApi.altTxt;

  return cartItemImage;
}

//insertion de la div "cart__item__content"
function createCartItemContent(parent) {
  const cartItemContent = document.createElement("div");
  parent.appendChild(cartItemContent);
  cartItemContent.classList.add("cart__item__content");

  return cartItemContent;
}

//insertion de la div "cart__item__content__description"
function createCartItemContentDescription(parent) {
  const cartItemContentDescription = document.createElement("div");
  parent.appendChild(cartItemContentDescription);
  cartItemContentDescription.classList.add("cart__item__content__description");

  return cartItemContentDescription;
}

//insertion de <h2>
function createDivH2(parent, productDataFromApi) {
  const cartItemName = document.createElement("h2");
  parent.appendChild(cartItemName);
  cartItemName.textContent = productDataFromApi.name;

  return cartItemName;
}

//insertion de <p> pour la couleur
function createDivColor(parent, cartData) {
  const cartItemColor = document.createElement("p");
  parent.appendChild(cartItemColor);
  cartItemColor.textContent = cartData.color;
}

//insertion de la p - prix
function createItemPrice(parent, price) {
  const cartItemPrice = document.createElement("p");
  parent.appendChild(cartItemPrice);
  cartItemPrice.textContent = `${price} €`;
}

//insertion de la div "cart__item__content__settings"
function createDivCartItemContentSettings(parent) {
  const cartItemContentSettings = document.createElement("div");
  parent.appendChild(cartItemContentSettings);
  cartItemContentSettings.classList.add("cart__item__content__settings");

  return cartItemContentSettings;
}

//insertion de la div "cart__item__content__settings__quantity"
function createDivCartItemSettingsQuantity(parent) {
  const cartItemContentSettingsQuantity = document.createElement("div");
  parent.appendChild(cartItemContentSettingsQuantity);
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );

  return cartItemContentSettingsQuantity;
}

//insertion de "Qté :"
function createCartItemDivQuantity(parent) {
  const cartItemDivQuantity = document.createElement("p");
  parent.appendChild(cartItemDivQuantity);
  cartItemDivQuantity.textContent = "Qté :";
}

//insertion d'input - quantité
function createQuantityInput(parent, quantity) {
  const cartItemQuantity = document.createElement("input");
  parent.appendChild(cartItemQuantity);
  cartItemQuantity.classList.add("itemQuantity");
  cartItemQuantity.setAttribute("type", "number");
  cartItemQuantity.setAttribute("name", "itemQuantity");
  cartItemQuantity.setAttribute("min", "1");
  cartItemQuantity.setAttribute("max", "100");
  cartItemQuantity.setAttribute("value", quantity);

  return cartItemQuantity;
}

//insertion de div "cart__item__content__settings__delete"
function createDivCartItemContentSettingsDelete(parent) {
  const cartItemContentSettingsDelete = document.createElement("div");
  parent.appendChild(cartItemContentSettingsDelete);
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );

  return cartItemContentSettingsDelete;
}

//insertion de <p> "deleteItem"
function createDeleteItem(parent) {
  const deleteItem = document.createElement("p");
  parent.appendChild(deleteItem);
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";

  return deleteItem;
}

//suppression d'un produit selon son id ET sa couleur
function registerDeleteAction(deleteItem, cartData, getCartData) {
  //écouter la modification de "supprimer"
  deleteItem.addEventListener("click", (event) => {
    event.preventDefault();

    //selection des items à supprimer selon son id ET sa couleur
    let idDelete = cartData.id;
    let colorDelete = cartData.color;

    //garder uniquement les items qui n'ont pas les mêmes id ou les couleurs
    let updatedCartData = getCartData.filter(
      (element) => element.id !== idDelete || element.color !== colorDelete
    );

    //enregistrer dans le localStorage
    localStorage.setItem("myCart", JSON.stringify(updatedCartData));

    alert("Ce produit va être supprimé du panier.");

    //recharger la page
    location.reload();
  });
}

//modification d'un produit selon son id ET sa couleur
function changeCartItemQuantity(cartItemQuantity, cartData, getCartData) {
  //écouter la modification de "quantité"
  cartItemQuantity.addEventListener("change", (event) => {
    event.preventDefault();

    let idChange = cartData.id;
    let colorChange = cartData.color;
    let updatedQuantity = cartItemQuantity.value;
    let findCartData = getCartData;

    for (let i = 0; i < findCartData.length; i++) {
      if (
        //changer la quantité selon son id ET sa couleur
        findCartData[i].id == idChange &&
        findCartData[i].color == colorChange
      ) {
        findCartData[i].quantity = updatedQuantity;
      }
    }

    //enregistrer dans le localStorage
    localStorage.setItem("myCart", JSON.stringify(findCartData));

    //recharger la page
    location.reload();
  });
}

//fonction pour afficher la quantité totale
function calculateTotalQuantity(myTotalQuantity) {
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent += myTotalQuantity;
}

//fonction pour afficher le prix total
function calculateTotalPrice(myTotalPrice) {
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = myTotalPrice;
}

//--------------formulaire de commande ----------------------

const cartOrderForm = document.querySelector(".cart__order__form");

//écouter la modification du prénom
cartOrderForm.firstName.addEventListener("change", function () {
  validFirstName(this);
});

//écouter la modification du nom
cartOrderForm.lastName.addEventListener("change", function () {
  validLastName(this);
});

//écouter la modification de l'adresse
cartOrderForm.address.addEventListener("change", function () {
  validAddress(this);
});

//écouter la modification de la ville
cartOrderForm.city.addEventListener("change", function () {
  validCity(this);
});

//écouter la modification de l'email
cartOrderForm.email.addEventListener("change", function () {
  validEmail(this);
});

//validation du prénom
function validFirstName(inputFirstName) {
  //création de la reg exp pour valider prénom
  const firstNameRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testFirstName = firstNameRegExp.test(inputFirstName.value);
  const firstNameErrorMsg = inputFirstName.nextElementSibling;

  if (testFirstName) {
    firstNameErrorMsg.textContent = " ";
    return true;
  } else {
    firstNameErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation du nom
function validLastName(inputLastName) {
  //création de la reg exp pour valider nom
  const lastNameRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testLastName = lastNameRegExp.test(inputLastName.value);
  const lastNameErrorMsg = inputLastName.nextElementSibling;

  if (testLastName) {
    lastNameErrorMsg.textContent = " ";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation de l'adresse postale
function validAddress(inputAddress) {
  //création de la reg exp pour valider l'adresse
  const addressRegExp = new RegExp("^[a-zA-ZÀ-ÿ0-9 ,.'-]{2,}$", "g");

  const testAddress = addressRegExp.test(inputAddress.value);
  const addressErrorMsg = inputAddress.nextElementSibling;

  if (testAddress) {
    addressErrorMsg.textContent = " ";
    return true;
  } else {
    addressErrorMsg.textContent =
      "Minimum 2 caractères, chiffres ou lettres uniquement.";
    return false;
  }
}

//validation de la ville
function validCity(inputCity) {
  //création de la reg exp pour valider la ville
  const cityRegExp = new RegExp("^[a-zA-ZÀ-ÿ ,.'-]{2,}$", "g");

  const testCity = cityRegExp.test(inputCity.value);
  const cityErrorMsg = inputCity.nextElementSibling;

  if (testCity) {
    cityErrorMsg.textContent = " ";
    return true;
  } else {
    cityErrorMsg.textContent = "Minimum 2 caractères, lettres uniquement.";
    return false;
  }
}

//validation de l'email
function validEmail(inputEmail) {
  //création de la reg exp pour valider email
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  const testEmail = emailRegExp.test(inputEmail.value);
  const emailErrorMsg = inputEmail.nextElementSibling;

  if (testEmail) {
    emailErrorMsg.textContent = " ";
    return true;
  } else {
    emailErrorMsg.textContent = "Merci de respecter le format email. ";
    return false;
  }
}

//préparer les données validées du formulaires avant d'envoyer au back-end
function prepareOrderData() {
  //préparer le tableau de string product ID
  const idProducts = [];

  for (let i = 0; i < getCartData.length; i++) {
    idProducts.push(getCartData[i].id);
  }

  //préparer les données (produit ID + contact) qui correspond au format demandé par le back-end
  const contactData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
  };

  const orderData = {
    products: idProducts,
    contact: contactData,
  };
  return orderData;
}

//récupérer ces données lors du click sur la bouton "commander"
function getOrderData() {
  //écouter la modification de la bouton "commander"
  cartOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputFirstName = document.getElementById("firstName");
    const inputLastName = document.getElementById("lastName");
    const inputAddress = document.getElementById("address");
    const inputEmail = document.getElementById("email");
    const inputCity = document.getElementById("city");

    //récupérer les données quand tous les champs sont bien validés
    if (
      validFirstName(inputFirstName) &&
      validLastName(inputLastName) &&
      validAddress(inputAddress) &&
      validCity(inputCity) &&
      validEmail(inputEmail)
    ) {
      //si le panier est vide
      if (getCartData.length == 0) {
        alert("Attention, votre panier est vide ! ");
      } else {
        sendOrderData();
        alert("Votre commande a bien été prise en compte.");
      }
    } else {
      alert("Merci de bien vérifier votre formulaire avant de commander");
    }
  });
}
getOrderData();

//envoyer les données du formulaire et les traiter
function sendOrderData() {
  const orderData = prepareOrderData();
  const jsonOrderData = JSON.stringify(orderData);

  //effectuer une requête POST sur l'API
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonOrderData,
  };

  //envoyer toutes les données concernées (prorduct-ID + données contacts) au back-end
  fetch("http://localhost:3000/api/products/order", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //vider le localStorage
      localStorage.clear();
      //diriger sur la page confirmation en passant l'id dans l'URL
      window.location.replace(`confirmation.html?order=${data.orderId}`);
    })
    .catch(function (error) {
      alert(
        "Le serveur ne répond pas. Si le problème persiste, contactez-nous par email : support@name.com."
      );
    });
}
