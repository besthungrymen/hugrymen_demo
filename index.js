$('#search').keypress(function (e) {
    url = "./main_page.html"
    if (e.keyCode == 13) {
        // get the value in the input check every character to see if it is valid
        var valueinput = $('#search').val();
        // for (let i = 0; i < valueinput.length; i++ ) {
        //     let c = valueinput.charAt(i);
        //     if ( !validCharForStreetAddress(c) ) {
        //         alert("Please input valid address!");
        //         return true;
        //     }
        // }
        if ( valueinput.length == 0 ) {
            alert("Please input your address!");
            return true;
        }
        if ( !validCharForStreetAddress(valueinput) ) {
            alert("Please input valid address!");
            return true;
        }
        location.href = url;
        return false
    }
});

$('#searchBtn').click(function(){
    var valueinput = $('#search').val();
    // for (let i = 0; i < valueinput.length; i++ ) {
    //     let c = valueinput.charAt(i);
    //     if ( !validCharForStreetAddress(c) ) {
    //         alert("Please input valid address!");
    //         return true;
    //     }
    // }
    if ( valueinput.length == 0 ) {
        alert("Please input your address!");
        return true;
    }
    if ( !validCharForStreetAddress(valueinput) ) {
        alert("Please input valid address!");
        return true;
    }
    location.href = url;
    return false
});

function validCharForStreetAddress(c) {
    return ",#-/! @$%^*(){}|[]\\".indexOf(c) >= 0;
}