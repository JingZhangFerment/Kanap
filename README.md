# Kanap #

This is the front end and back end server for Project 5 of the Web Developer path.

### Context ###

Kanap has developed a website, with the HTML, CSS and back-end ready.
They need to implement the website dynamically and set up a test plan once the implementation is done.

### Functional specifications ###

1/ Create the main products page: all the products will be displayed on this page with details like images, names and descriptions.</br>
2/ Create the single page product: 
  - once the user selected a product, the page will redirect from homepage to the product page. 
  - the following infos should be displayed : image, name, price, description, color options and quantity options on this product page. 
  - the choices should be taken into account properly.</br>
</br> 3/ Create the cart page: 
  - a list with the choices of the user : product name, color, price and quantities. 
  - possibilities to delete the product(s) or change these quantities. 
  - update the total quantity and price
  - check the formula data and take into account in the cart</br>
4/ Create the confirmation page: display the ordered number which corresponds to the selected product(s) 

### Technical challenges ###

1/ The development must be done in pure JavaScript, without framework or library.
2/ Product data must be retrieved from the provided API.
3/ The cart must be saved properly in the localStorage.
4/ Change the API URL depending on the chosen item.
5/ List the chosen items without duplicating unnecessarily them and calculate the total amount.
6/ The fields of the order form must be validated before sending to the API

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
