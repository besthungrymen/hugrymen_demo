$('#search').keypress(function (e) {
    url = "./main_page.html"
    if (e.keyCode == 13) {
        
        location.href = url;
        return false
    }
});

function validCharForStreetAddress(c) {
    return ",#-/ !@$%^*(){}|[]\\".indexOf(c) >= 0;
}