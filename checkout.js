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
function checkAlert() {
  if (document.getElementById("split_q").checked == true) {
    document.getElementById("grey-label").style.color = "black";
    document.getElementById("num_people").disabled = false;
    addPeople();
  } else {
    document.getElementById("grey-label").style.color = "gray";
    document.getElementById("num_people").disabled = true;
    var wrap = document.getElementById("split_fields");
    while (wrap.hasChildNodes()) {
      wrap.removeChild(wrap.lastChild);
    }
  }
}

function addPeople() {
  var numP = document.getElementById("num_people");
  var p = parseInt(numP.options[numP.selectedIndex].value);
  var fields = document.getElementById("split_fields");
  while (fields.hasChildNodes()) {
    fields.removeChild(fields.lastChild);
  }
  for (var i = 0; i < p; i++) {
    var person = document.createElement('div');
    person.classList.add("split-person-wrapper");
    //CHANGE MAX IN NUMBER INPUT TO BE TOTAL COST OF ALL ITEMS ONCE I KNOW HOW TO RETRIEVE THAT INFO
    //ALSO ADD SHIT TO MAKE THIS ALL NICE AND STYLIZED (SPACER, LABEL, etc)
    //PUT IN REAL MAX VALUE FOR INPUT AS WELL
    var inputs = `
                  <div class="split-name">${splitters[i].name}</div>
                  <label for="${splitters[i].vName}">Item Total: $</label>
                  <input class="split-total" id="${splitters[i].vName}" type="number" min="0" max="1000" step=".01" pattern="\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?" placeholder="0.00">
                  <div class="total-due" id="tot${splitters[i].vName}">Total Due: $</div>
                 `;
    person.innerHTML = inputs;
    fields.appendChild(person);
    //fields.appendChild(document.createElement('br'));
  }
  var splitB = document.createElement('div');
  splitB.classList.add("split-button");
  var b = `<button id="split-b" type="button" onclick="split()">Split</button>`;
  splitB.innerHTML = b;
  fields.appendChild(splitB);
  //fields.appendChild(document.createElement('br'));
}

function split() {
  //SOMEHOW I NEED TO GET ITEM TOTAL AND TAXES/FEES FROM CART, WILL JUST USE PLACEHOLDER VARIABLES FOR NOW
  var p = 0;
  do {
    p++;
    var tmp = "Person_" + p;
  } while (document.getElementById(tmp) != null);
  p -= 1;
  var total = 100;  //this needs to change
  var tmpTot = 0;   //this will count vals as we loop, will be checked against actual total taken from cart
  var fees = 15;     //this needs to change
  var wrap = document.getElementById("split_fields");
  var percents = new Array(p);
  var tCosts = new Array(p);
  for (var i = 1; i <= p; i++) {
    var name = "Person_" + i;
    var cost = parseInt(document.getElementById(name).value);
    tmpTot += cost;
    percents[i-1] = cost / total;                   //this will not work until I know how to get total from cart
    tCosts[i-1] = cost + (percents[i-1] * fees);    //this will not work until I know how to get total from cart
  }
  if (true) {                                       //will be tmpTot == total but this will not work until I have real total value
    for (var i = 1; i <= p; i++) {
      var name = "totPerson_" + i;
      var val = "Total Due: $" + tCosts[i-1];
      var elem = document.getElementById(name);
      elem.innerHTML = val;
    }
  } else {
    alert("Item costs must add up to the total cost of the items in your cart before fees!")
  }
}
function checkout() {
  alert("Your order has been placed and your food is on the way. Enjoy!");
  window.location.href = "./main_page.html";
}
