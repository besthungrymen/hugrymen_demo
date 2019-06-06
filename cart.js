// THIS SCRIPT is based on cart.js and localStorage

var splitters = [
  {
    name: "Person 1",
    vName: "Person_1"
  },
  {
    name: "Person 2",
    vName: "Person_2"
  },
  {
    name: "Person 3",
    vName: "Person_3"
  },
  {
    name: "Person 4",
    vName: "Person_4"
  },
  {
    name: "Person 5",
    vName: "Person_5"
  },
  {
    name: "Person 6",
    vName: "Person_6"
  },
  {
    name: "Person 7",
    vName: "Person_7"
  },
  {
    name: "Person 8",
    vName: "Person_8"
  }
];
var cart;
var cartObj;
var subtotalTotal = 0;
var feeTotal = 0;
var url = './checkout.html'

/*
 * This function is used to delete items in the cart,
 * called by *trash icon* onclick function
 */
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
    // console.log(cart);
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
                $ ${(productCount * productPrice).toFixed(2)}
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
            var split_q_id = "split_q_" + i;
            var grey_label_id = "grey-label-" + i;
            var num_people_id = "num_people_" + i;
            var split_fields_id = "split_fields_" + i;
            var tax = taxrate * subtotal;
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
                <div class="meal_split">
                  <input type="checkbox" class="split_q" id="${split_q_id}" onclick="checkAlert(${i},${tax},${subtotal},${servicefee},${deliveryfee})"/>
                  <label for="${split_q_id}">Split this bill between multiple people?</label>
                  <br>
                  <label id="${grey_label_id}" class="grey-label" for="${num_people_id}" style="color: gray">How many people are splitting this bill?</label>
                  <select id="${num_people_id}" class="num_people" onchange="addPeople(${i},${tax},${subtotal},${servicefee},${deliveryfee})" disabled>
                      <option value="2" selected>2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  <br>
                  <div id="${split_fields_id}"/>
                  <div class="space"/>
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

  function checkAlert(idN,tax,subtotal,servicefee,deliveryfee) {
    var split_q_id = "split_q_" + idN;
    var grey_label_id = "grey-label-" + idN;
    var num_people_id = "num_people_" + idN;
    var split_fields_id = "split_fields_" + idN;
    if (document.getElementById(split_q_id).checked == true) {     //if checked
      document.getElementById(grey_label_id).style.color = "black";    //change color of dropdown label to black
      document.getElementById(num_people_id).disabled = false;         //enable dropdown
      addPeople(idN,tax,subtotal,servicefee,deliveryfee);                                                    //add fields for people splitting bill
    } else {                                                     //if unchecked
      document.getElementById(grey_label_id).style.color = "gray";     //change color of dropdown label to black
      document.getElementById(num_people_id).disabled = true;          //enable dropdown
      var wrap = document.getElementById(split_fields_id);
      while (wrap.hasChildNodes()) {                                 //remove all fields for people
        wrap.removeChild(wrap.lastChild);
      }
    }
  }

  function addPeople(idN,tax,subtotal,servicefee,deliveryfee) {
    var split_q_id = "split_q_" + idN;
    var grey_label_id = "grey-label-" + idN;
    var num_people_id = "num_people_" + idN;
    var split_fields_id = "split_fields_" + idN;
    var fees = tax + servicefee + deliveryfee;
    fees = roundToTwo(fees);
    var numP = document.getElementById(num_people_id);
    var p = parseInt(numP.options[numP.selectedIndex].value);
    var fields = document.getElementById(split_fields_id);
    while (fields.hasChildNodes()) {
      fields.removeChild(fields.lastChild);       //remove all fields currently displayed
    }
    for (var i = 0; i < p; i++) {     //loop for all people splitting bill
      var person = document.createElement('div');
      var person_id = splitters[i].vName + "_" + idN;
      person.classList.add("split-person-wrapper");
      var inputs = `
                    <div class="split-name">${splitters[i].name}</div>
                    <label for="${person_id}">Subtotal: $</label>
                    <input class="split-total" id="${person_id}" type="number" min="0" max="1000" step=".01" pattern="\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?" placeholder="0.00">
                    <div class="total-due" id="tot${person_id}">Total Due: $</div>
                    <div class="user-note" id="note${person_id}"></div>
                   `;
      person.innerHTML = inputs;
      fields.appendChild(person);     //create fields for a new person
    }
    var splitB = document.createElement('div');
    splitB.classList.add("split-button");
    var b = `<button id="split-b${idN}" class="split-b" type="button" onclick="split(${idN},${tax},${subtotal},${servicefee},${deliveryfee})">Split</button>`;
    splitB.innerHTML = b;
    fields.appendChild(splitB);       //creates split button under fields
    var space = document.createElement('div');
    space.classList.add("space");
    fields.appendChild(space);
  }

  function split(idN,tax,subtotal,servicefee,deliveryfee) {
    var split_q_id = "split_q_" + idN;
    var grey_label_id = "grey-label-" + idN;
    var num_people_id = "num_people_" + idN;
    var split_fields_id = "split_fields_" + idN;
    var p = 0;
    do {
      p++;
      var tmp = "Person_" + p + "_" + idN;
    } while (document.getElementById(tmp) != null);
    p -= 1;
    var total = subtotal;
    var tmpTot = 0;   //this will count vals as we loop, will be checked against actual total taken from cart
    var fees = tax + servicefee + deliveryfee;
    var wrap = document.getElementById(split_fields_id);
    var percents = new Array(p);
    var tCosts = new Array(p);
    for (var i = 1; i <= p; i++) {    //loop for every person splitting bill
      var name = "Person_" + i + "_" + idN;
      var cost = parseInt(document.getElementById(name).value);
      tmpTot += cost;
      percents[i-1] = cost / total;
      tCosts[i-1] = cost + (percents[i-1] * fees);
    }
    if (tmpTot == total) {
      for (var i = 1; i <= p; i++) {
        var name = "totPerson_" + i + "_" + idN;
        var noteN = "notePerson_" + i + "_" + idN;
        var due = roundToTwo(tCosts[i-1]);
        var val = "Total Due: $" + due;
        var mes = "Person " + i + " is paying $" + (percents[i-1] * fees) + " of $" + fees + " taxes and fees";
        var elem = document.getElementById(name);
        elem.innerHTML = val;
        var elem2 = document.getElementById(noteN);
        elem2.innerHTML = mes;
      }
    } else {          //if the item totals are not correct
      alert("Item costs must add up to the total cost of the items in your cart before fees!")
    }
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


buildCartList();

$('#checkoutBtn').click(function(){
    var sellerLen = cart.length;
    if ( sellerLen == 0 )  {
        alert("You have nothing to checkout, man!");
        return true;
    }
    else {
        location.href = url;
        return false
    }
});