//insérer le numéro de commande sur la page de confirmation
const orderId = document.getElementById("orderId");
orderId.textContent = getOrderId();

//récupérer le "orderID" depuis l'URL
function getOrderId() {
    return new URL(location.href).searchParams.get("order");
  }
