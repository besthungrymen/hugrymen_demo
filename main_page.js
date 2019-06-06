// here are my hard-coded list of dictionaries
var  restaurants = [
    // keep track of the index from the menu list
    // storing all the items like this we cant generate it all dynamically add another resturant or items 
    // and now you generate a menu dynamically
    // will have one page for resturants and itll just changew from that. 
    {"name": "Burger City", "rating": 'two', "price":1, "menu":[{name: "Bacon Burger", price: "$10.99"} ,{name: "Avocado Burger", price:"$9.99"} , {name:"Vegan Cheese Burger", price:"$11.99"}, "appetizers, "], "id": 'burger_city'},
    {"name": "Jim's  Pizza", "rating": 'three', "price":1, "menu":["pizza", "salad", "burger"], "id": 'jim_pizza'}
]
// makes an array of the items to pick w/e items we want.
console.log("burger_city-3".split("-"));

$( document ).ready(function() {
    var restaurant = "";
    // stores my list of resturants
    for(var rest of restaurants) {
        restaurant += "<box><a href='./"+ rest.id +".html'><span class='rest-name'>" + rest.name + "</span></a><span class='" + rest.rating+ "'></span></box>";
        // the dot gets  the link and name and rating to display.
    }
    // for loop goes through the list of resturant thats gonna have the names and ratings
    $("#right_section").html(restaurant);
    // replace all the  the right section html with the string resturant. 
    // in document onclick  of clear uncheck, check to  false 
    $("#clear").on("click",  function(){
        // when I click the clear button, it redoes adding them all in as a list of string
        var restaurant = "";
        for(var rest of restaurants) {
            restaurant += "<box><a href='./"+ rest.id +".html'><span class='rest-name'>" + rest.name + "</span></a><span class='" + rest.rating+ "'></span></box>";
        }
        $("#right_section").html(restaurant);
          // sets all options to unclicked
        $(".filters").prop( "checked", false );
      
    });
    $("#submit").on("click", function(){
        // on submit sets the string back to nothing
        restaurant =  "";
        for(var rest of restaurants) {
            if(rest.rating == $("input:radio[name='rating']:checked").val()){
                restaurant += "<box><a href='./"+ rest.id +".html'><span class='rest-name'>" + rest.name + "</span></a><span class='" + rest.rating+ "'></span></box>";
            }
        }
        $("#right_section").html(restaurant);
    });
});

var userinputvalue = localStorage.getItem("userinput");
console.log(userinputvalue);
var userinputtag = document.getElementById("user-input")
userinputtag.value = userinputvalue;