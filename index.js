regex = /^\d+\s[A-z]+\s[A-z]+/g
url = "./main_page.html"

$.getJSON('./cart.json', function(data){
    localStorage.setItem("cart", JSON.stringify(data));
    firsttime = false;
});





$('#search').keypress(function (e) {
    if (e.keyCode == 13) {
        // get the value in the input check every character to see if it is valid
        var valueinput = $('#search').val();
        localStorage.setItem("userinput", valueinput);
        if ( valueinput.length == 0 ) {
            alert("Please input your address!");
            return true;
        }
        var found = valueinput.match(regex);
        if ( !valueinput.match(regex) ){
            alert("Please input a valid address!");
            return true;
        }
        location.href = url;
        return false
    }
});

$('#searchBtn').click(function(){
    var valueinput = $('#search').val();
    localStorage.setItem("userinput", valueinput);
    if ( valueinput.length == 0 ) {
        alert("Please input your address!");
        return true;
    }
    if ( !valueinput.match(regex) ){
        alert("Please input a valid address!");
        return true;
    }
    location.href = url;
    return false
});
