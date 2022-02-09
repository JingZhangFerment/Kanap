//insérer le numéro de commande sur la page de confirmation
const orderId = document.getElementById("orderId");


//récupérer le "orderID" depuis l'API et ajout sur la navigateur 
function getOrderId() {
    return new URL(location.href).searchParams.get("order");
  }
