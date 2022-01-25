//Faire le lien entre un produit de la page d’accueil et la page Produit

var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  var productId = search_params.get('id');
  console.log('id :'+productId);
} else {
    console.log("Le produit que vous avez demandé n'existe pas.");
}

