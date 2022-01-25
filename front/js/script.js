//fetch the products from API at the 3000 port
const url = "http://localhost:3000/api/products";

function getProducts () {
    fetch (url)
        .then (function(res) {
            if (res.ok) {
                return res.json ();
            }
        })
        
        .then(function(products){
            //display the products according to their ids, images, names and descriptions
            products.forEach(product => {
                let productLink = document.createElement("a");  
                document.getElementById("items").appendChild(productLink);
    
                let productCard = document.createElement("article");
                productLink.appendChild(productCard);
                
                let productImage = document.createElement("img");
                productCard.appendChild(productImage);
                
                let productName = document.createElement("h3");
                productCard.appendChild(productName);
                productName.classList.add("productName");
                
                let productDescription = document.createElement ("p");
                productCard.appendChild(productDescription);
                productDescription.classList.add("productDescription");

                productLink.href = `./product.html?id=${product._id}`;
                productImage.src = `${product.imageUrl}`;
                productImage.alt = `${product.altTxt}`;
                productName.textContent =`${product.name}`;
                productDescription.textContent =`${product.description}`;
            });     
        })
        
        .catch (function(err){
           let items = document.getElementById("items");
           items.textContent = "Désolée, le serveur ne répond pas!";        
        })
}

getProducts();
