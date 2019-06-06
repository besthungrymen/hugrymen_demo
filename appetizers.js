
var checkedbox = [];
var cartObj = JSON.parse(localStorage.getItem("cart"));
var cart = cartObj["items"];
var seller;
var sellerName = "Burger City";

$('#add-to-cart-box').click(function(){
    // get all checked boxes
    checkedbox = getCheckedBoxes()
    if ( checkedbox.length == 0 ) {
        alert("You should check something before you add to cart!");
        return false;
    }
    $('#add-to-cart-box').removeClass("btn-primary")
    $('#add-to-cart-box').addClass("btn-success")
    $('#cart').addClass('cart-bounce')
    // get orderlist
    var orderlist = getOrderList();
    console.log(orderlist);
    if ( orderlist == undefined) {
        orderlist = []
        jsonObj = {
            name: "Burger City",
            order: orderlist
        }
        cart.push(jsonObj)
    }
    console.log(orderlist);    
    // get info.json first
    $.getJSON('./info.json', function(data){
        // console.log(typeof(data))
        var info = data["restaurants"];
        var items = getItemsList(info);
        for ( let i = 0; i < checkedbox.length; i++ ) {
            var itemName = checkedbox[i].id; 
            console.log("itemname = ", itemName);
            console.log("items", items);
            var itemObj = getItemObj(itemName, items);
            itemObj["number"] = 1;
            console.log(itemObj);
            
            // need to escape repeating adding here
            if (isInOrderList(orderlist, itemName) ) {
                
            }
            else {
                orderlist.push(itemObj);
            }
        }
        console.log(orderlist);
        localStorage.setItem("cart", JSON.stringify(cartObj));
    });
    
});

function getOrderList() {
    for ( let i = 0; i < cart.length; i++ ) {
        if (cart[i]["name"] == sellerName ) {
            return cart[i]["order"];
        }
    }
}

function getItemsList(info) {
    for ( let i = 0; i < info.length; i++ ) {
        if ( info[i]["name"] == sellerName ) {
            return info[i]["foods"]["appertize"];
        }
    }
}

function getItemObj(itemName, items) {
    for ( let i = 0; i < items.length; i++ ) {
        if ( items[i]["name"] == itemName ) {
            return items[i];
        }
    }
}

function isInOrderList(orderlist, itemName) {

    for ( let i = 0; i < orderlist.length; i++ ) {
        if ( orderlist[i]["name"] == itemName ) {
            orderlist[i]["number"] += 1;
            return true;
        }
    }
    return false;
}

/*{
            "name": "Burger City",
            "order": [
                {
                    "name": "Bacon Burger",
                    "img": "./image/bacon_burger.jpg",
                    "number": 1,
                    "price": 10
                },
                {
                    "name": "Vegan Cheese Burger",
                    "img": "./image/vegan_option.jpeg",
                    "number": 1,
                    "price": 10
                }   
            ]
        },
        {
            "name": "Jim's Pizza",
            "order": [
                {
                    "name": "Chocalate Ice Cream",
                    "img": "./image/chocalate.jpeg",
                    "number": 1,
                    "price": 6
                },
                {
                    "name": "Mint Chip Ice Cream",
                    "img": "./image/mint_option.jpg",
                    "number": 1,
                    "price": 4
                },
                {
                    "name": "Cookies n' Cream Ice Cream",
                    "img": "./image/cookiesandcream_option.jpg",
                    "number": 1,
                    "price": 4
                }
            ]
        } */