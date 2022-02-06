//récupérer les données enregistrées des produits dans le localStorage
let getCartData = JSON.parse(localStorage.getItem("myCart"));

//récupérer les données des produits selon le produit ID depuis la porte 3000 d'API
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

//afficher les données (id, color, quantity, image, alt, nom, prix)
async function displayCart(getCartData) {
  let myTotal = 0;

  for (i = 0; i < getCartData.length; i++) {
    let cartData = getCartData[i];

    const productDataFromApi = await getProduct(cartData.id);

    createDivArticle(cartData);

    //insertion de la div "cart__item__img"
    const cartItemDivImage = document.createElement("div");
    cartItem.appendChild(cartItemDivImage);
    cartItemDivImage.classList.add("cart__item__img");

    //insertion de la balise "image"
    const cartItemImage = document.createElement("img");
    cartItemDivImage.appendChild(cartItemImage);
    cartItemImage.src = productDataFromApi.imageUrl;
    cartItemImage.alt = productDataFromApi.altTxt;

    //insertion de la div "cart__item__content"
    const cartItemContent = document.createElement("div");
    cartItem.appendChild(cartItemContent);
    cartItemContent.classList.add("cart__item__content");

    //insertion de la div "cart__item__content__description"
    const cartItemContentDescription = document.createElement("div");
    cartItemContent.appendChild(cartItemContentDescription);
    cartItemContentDescription.classList.add(
      "cart__item__content__description"
    );

    //insertion de <h2>
    const cartItemName = document.createElement("h2");
    cartItemContentDescription.appendChild(cartItemName);
    cartItemName.textContent = productDataFromApi.name;

    //insertion de <p> pour la couleur
    const cartItemColor = document.createElement("p");
    cartItemContentDescription.appendChild(cartItemColor);
    cartItemColor.textContent = cartData.color;

    //insertion de <p> pour le prix
    createItemPrice(cartItemContentDescription, productDataFromApi.price);

    //insertion de la div "cart__item__content__settings"
    const cartItemContentSettings = document.createElement("div");
    cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.classList.add("cart__item__content__settings");

    //insertion de la div "cart__item__content__settings__quantity"
    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );

    //insertion de "Qté :"
    const cartItemDivQuantity = document.createElement("p");
    cartItemContentSettingsQuantity.appendChild(cartItemDivQuantity);
    cartItemDivQuantity.textContent = "Qté :";

    //insertion de <input> pour la quantité
    const cartItemQuantity = createQuantityInput(
      cartItemContentSettingsQuantity,
      cartData.quantity
    );

    //insertion de div "cart__item__content__settings__delete"
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );

    //insertion de <p> "deleteItem"
    const deleteItem = document.createElement("p");
    cartItemContentSettingsDelete.appendChild(deleteItem);
    deleteItem.classList.add("deleteItem");
    deleteItem.textContent = "Supprimer";

    registerDeleteAction(deleteItem, cartData, getCartData);

    changeCartItemQuantity(cartItemQuantity, cartData, getCartData);

    myTotal += parseInt(cartItemQuantity.value);
    console.log(myTotal);
  }

  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent += myTotal;
  console.log(myTotal);
}

displayCart(getCartData);

//insertion de la balise "article"
function createDivArticle(cartData) {
  const cartItem = document.createElement("article");
  document.querySelector("#cart__items").appendChild(cartItem);
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", cartData.id);
  cartItem.setAttribute("data-color", cartData.color);

  return cartItem;
}

//insertion de la p - prix
function createItemPrice(parent, price) {
  const cartItemPrice = document.createElement("p");
  parent.appendChild(cartItemPrice);
  cartItemPrice.textContent = `${price} €`;
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

//suppression d'un produit selon son id ET sa couleur
function registerDeleteAction(deleteItem, cartData, getCartData) {
  deleteItem.addEventListener("click", (event) => {
    event.preventDefault();

    //selection des items à supprimer selon son id ET sa couleur
    let idDelete = cartData.id;
    let colorDelete = cartData.color;

    let updatedCartData = getCartData.filter(
      (element) => element.id !== idDelete || element.color !== colorDelete
    );

    localStorage.setItem("myCart", JSON.stringify(updatedCartData));
    window.alert("Ce produit va être supprimé du panier.");
    location.reload();
  });
}

//modification d'un produit selon son id ET sa couleur
function changeCartItemQuantity(cartItemQuantity, cartData, getCartData) {
  cartItemQuantity.addEventListener("change", (event) => {
    event.preventDefault();

    let idChange = cartData.id;
    let colorChange = cartData.color;
    let updatedQuantity = cartItemQuantity.value;
    let findCartData = getCartData;

    for (let i = 0; i < findCartData.length; i++) {
      if (
        findCartData[i].id == idChange &&
        findCartData[i].color == colorChange
      ) {
        findCartData[i].quantity = updatedQuantity;
      }
    }

    localStorage.setItem("myCart", JSON.stringify(findCartData));
  });
}
