// load them from cart.json file 
var cart;

$.getJSON('./cart.json', function(data){
    cart = data;
    cart.forEach(element => {
        console.log(element);
    });
});

function buildCartList() {
    var cartList = $("#seller-list")

}
