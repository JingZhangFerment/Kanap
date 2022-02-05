//récupérer les données enregistrées des produits dans le localStorage
const myCart = localStorage.getItem("myCart");
const getCartDataFromLocalStorage = JSON.parse(myCart);

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
getCartDataFromLocalStorage.forEach(async (cartData) => {
  const productDataFromApi = await getProduct(cartData.id);

  //insertion de la balise "article"
  const cartItem = document.createElement("article");
  document.querySelector("#cart__items").appendChild(cartItem);
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", cartData.id);
  cartItem.setAttribute("data-color", cartData.color);

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
  cartItemContentDescription.classList.add("cart__item__content__description");

  //insertion de <h2>
  const cartItemName = document.createElement("h2");
  cartItemContentDescription.appendChild(cartItemName);
  cartItemName.textContent = productDataFromApi.name;

  //insertion de <p> pour la couleur
  const cartItemColor = document.createElement("p");
  cartItemContentDescription.appendChild(cartItemColor);
  cartItemColor.textContent = cartData.color;

  //insertion de <p> pour le prix
  const cartItemPrice = document.createElement("p");
  cartItemContentDescription.appendChild(cartItemPrice);
  cartItemPrice.textContent = `${productDataFromApi.price} €`;

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
  const cartItemQuantity = document.createElement("input");
  cartItemContentSettingsQuantity.appendChild(cartItemQuantity);
  cartItemQuantity.classList.add("itemQuantity");
  cartItemQuantity.setAttribute("type", "number");
  cartItemQuantity.setAttribute("name", "itemQuantity");
  cartItemQuantity.setAttribute("min", "1");
  cartItemQuantity.setAttribute("max", "100");
  cartItemQuantity.setAttribute("value", cartData.quantity);

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

  //supprimer les produits lors de chaque click sur "supprimer"
  deleteItem.addEventListener("click", function (event) {
    let itemQuantity = cartData.quantity;
    let itemQuantityAfterDelete = itemQuantity--;
    console.log(itemQuantityAfterDelete) ;
  });
});
