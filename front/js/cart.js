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

    const cartItemColor = createDivColor(cartItemContentDescription, cartData);

    createItemPrice(cartItemContentDescription, productDataFromApi.price);

    const cartItemContentSettings =
      createDivCartItemContentSettings(cartItemContent);

    const cartItemContentSettingsQuantity = createDivCartItemSettingsQuantity(
      cartItemContentSettings
    );

    const cartItemDivQuantity = createCartItemDivQuantity(
      cartItemContentSettingsQuantity
    );

    const cartItemQuantity = createQuantityInput(
      cartItemContentSettingsQuantity,
      cartData.quantity
    );

    const cartItemContentSettingsDelete =
      createDivCartItemContentSettingsDelete(cartItemContentSettings);

    const deleteItem = createDeleteItem(cartItemContentSettingsDelete);

    registerDeleteAction(deleteItem, cartData, getCartData);

    changeCartItemQuantity(cartItemQuantity, cartData, getCartData);

    myTotal += parseInt(cartItemQuantity.value);
  }
  calculateTotals(myTotal);
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

  return cartItemColor;
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

  return createCartItemDivQuantity;
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

//calculer la quantité totale et le prix total

function calculateTotals(myTotal) {
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent += myTotal;
  console.log(myTotal);

  let totalPrice = document.getElementById("totalPrice");
}
