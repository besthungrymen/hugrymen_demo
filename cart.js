var cart;
var cartObj;
var subtotalTotal = 0;
var feeTotal = 0;


function delItemFromJson(itemName, sellerName) {
    // console.log("======")
    // console.log(itemName);
    // console.log(sellerName);
    for ( let i = 0; i < cart.length; i++ ) {
        if ( cart[i]["name"] == sellerName) {
            var order = cart[i]["order"];
            // console.log(order);
            for ( let j = 0; j < order.length; j++ ) {
                // console.log(order[i]);
                if (order[j]["name"] == itemName) {
                    order.splice(j, 1);
                    j--;
                }
            }
            if (order.length == 0) {
                cart.splice(i, 1);
                i--;
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartObj));
    // console.log(cart);
    buildCartList();
}
function changeItemNumberFromJson(itemName, sellerName, count) {
    for ( let i = 0; i < cart.length; i++ ) {
        if ( cart[i]["name"] == sellerName) {
            var order = cart[i]["order"];
            // console.log(order);
            for ( let j = 0; j < order.length; j++ ) {
                // console.log(order[i]);
                if (order[j]["name"] === itemName) {
                    order[j]["number"] += count;
                }
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartObj));
    // console.log(cart);
    buildCartList();
}

// load them from cart.json file 
function buildCartList() {
    // $.getJSON('./cart.json', function(data){
    //     // console.log(typeof(data))
    //     cart = data["items"];
        
    // });
    cartObj = JSON.parse(localStorage.getItem("cart"))
    cart = cartObj["items"];
    console.log(cart);
    buildCartListHelper();   
}

function buildCartListHelper() {
    var cartList = document.getElementById("seller-list");
    cartList.innerHTML = ``;
    var sellerLen = cart.length;
    if ( sellerLen == 0 )  {
        cartList.innerHTML = `
            <h1 class="no-item-in-cart">Oops, let's add somethig to your cart!!!</h1>
        `;
    }
    else {
        for ( let i = 0; i < sellerLen; i++ ) {
            // create divs for seller, container and product
            var sellerDiv = document.createElement('div');
            var containerDiv = document.createElement('div');
            var totalDiv = document.createElement('div');
            let subtotal = 0;
            let taxrate = 0.10;
            let servicefee = 5;
            let deliveryfee = 3;
            let total = 0;
            let sellerName = cart[i]["name"];
            var order = cart[i]["order"];
            var orderLen = order.length; 
            for (let j = 0; j < orderLen; j++ ) {
                
                let productImg = order[j]['img'];
                let productName = order[j]['name'];
                let productPrice = order[j]['price'];
                let productCount = order[j]['number'];
                // delete button
                deleteinput = `<i class="fas fa-trash delete"></i>`;
                var deleteDiv = document.createElement('div');
                deleteDiv.classList.add('product-removal');
                deleteDiv.innerHTML = deleteinput;
                $(deleteDiv).click(function(){
                    // console.log("[DEBUG] clicked");
                    // $(document.getElementById(productName)).remove();
                    delItemFromJson(productName, sellerName);
                });
                // product image
                imginput =  `<img class="img-thumbnail" src=${productImg} alt="burger" />`;
                var imgDiv = document.createElement('div');
                imgDiv.classList.add('product-image');
                imgDiv.innerHTML = imginput;
                // product detail
                var detailinput = `
                <p>${productName}</p>`;
                var detailDiv = document.createElement('div');
                detailDiv.classList.add('product-details');
                detailDiv.innerHTML = detailinput;
                // product quantity
                var countplusbtn = document.createElement('button');
                countplusbtn.type = "button";
                countplusbtn.name = "button";
                countplusbtn.classList.add('plus-btn');
                countplusbtn.onclick = function() {
                    plus(productName, sellerName);
                }
                countplusbtn.innerHTML = `<i class="fas fa-plus"></i>`;
                // var valueinput = document.createElement('input')
                // valueinput.id = productName + " input";
                // valueinput.classList.add("text-center","count-value")
                // valueinput.type = 'number';
                // valueinput.name = "name";
                // valueinput.min = '1';
                // valueinput.value = productCount;
                // // valueinput.addEventListener("input", callbackClosure(itemName, sellerName, valueinput.value - order[j]['number'],changeItemNumberFromJson));
                // valueinput.oninput = function() {
                //     if ( this.value <= 0 ) {
                //         this.value = 1;
                //     }
                //     console.log(this.value);
                //     console.log("itemName = ", productName);
                //     console.log("sellerName = ", sellerName);
                //     changeItemNumberFromJson(productName, sellerName, this.value-productCount);
                // }
                var valueinput = document.createElement('div');
                valueinput.classList.add("count-value", "text-center");
                valueinput.innerHTML = `${productCount}`;
                valueinput.id = productName + " input";
    
                var countminusbtn = document.createElement('button');
                countminusbtn.type = "button";
                countminusbtn.name = "button";
                countminusbtn.classList.add('minus-btn');
                countminusbtn.onclick = function() {
                    minus(productName, sellerName);
                }
                countminusbtn.innerHTML = `<i class="fas fa-minus"></i>`;
                var countDiv = document.createElement('div');
                countDiv.classList.add('product-quantity');
                countDiv.appendChild(countplusbtn);
                countDiv.appendChild(valueinput);
                countDiv.appendChild(countminusbtn);
                // product price
                var priceinput = `
                $ ${productCount * productPrice}
                `;
                subtotal += productCount * productPrice;
                var priceDiv = document.createElement('div');
                priceDiv.classList.add('product-price');
                priceDiv.innerHTML = priceinput;
                // clear div
                var paddingDiv = document.createElement('div');
                paddingDiv.classList.add('clear');
                // wrap into product div, add its name used to find
                var productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.id = productName;
                productDiv.appendChild(deleteDiv);
                productDiv.appendChild(imgDiv);
                productDiv.appendChild(detailDiv);
                productDiv.appendChild(countDiv);
                productDiv.appendChild(priceDiv);
                productDiv.appendChild(paddingDiv);
                containerDiv.appendChild(productDiv);
    
            }
            sellerDiv.innerHTML = `<p>${sellerName}</p>`;
            sellerDiv.classList.add('seller');
            sellerDiv.appendChild(containerDiv);
            totalDiv.classList.add('total');
            total = subtotal * (1 + taxrate) + servicefee + deliveryfee;
            totalinput = `
                <div class="total-item">
                    <div class="fee">Subtotal</div> 
                    <div class="value">$ ${subtotal.toFixed(2)}</div>
                </div>
                <div class="total-item">
                    <div class="fee">Tax</div> 
                    <div class="value">$ ${Number(taxrate * subtotal).toFixed(2)}</div>
                </div>
                <div class="total-item">
                    <div class="fee">Service Fee</div> 
                    <div class="value">$ ${servicefee.toFixed(2)}</div>
                </div>
                <div class="total-item">
                    <div class="fee">Delivery Fee</div> 
                    <div class="value">$ ${deliveryfee.toFixed(2)}</div>
                </div>
                <div class="total-item total-item-total">
                    <div class="fee">Total</div> 
                    <div class="value">$ ${total.toFixed(2)}</div>
                </div>
            `;

            totalDiv.innerHTML = totalinput;
            sellerDiv.appendChild(totalDiv);
            // we done, add this to our cartList
            cartList.appendChild(sellerDiv);
        }
    }
    
}


// add 'plus minus' event listener functions
function plus(itemName, sellerName) {
    var pid = itemName + " input";
    // console.log("itemName = ", itemName);
    // console.log("sellerName = ", sellerName);
    // console.log("pid = ", pid);

    var valueinput = document.getElementById(pid);
    valueinput.value = Number(valueinput.textContent) + 1;
    
    changeItemNumberFromJson(itemName, sellerName, 1);
}
function minus(itemName, sellerName) {
    var pid = itemName + " input";
    // console.log("itemName = ", itemName);
    // console.log("sellerName = ", sellerName);
    // console.log("pid = ", pid);

    var valueinput = document.getElementById(pid);
    if ( valueinput.textContent > 1) {
        valueinput.textContent -= 1;
        changeItemNumberFromJson(itemName, sellerName, -1);
    }
}

function callbackClosure(i, j, k, callback) {
    return function() {
      return callback(i, j, k);
    }
  }


buildCartList();

