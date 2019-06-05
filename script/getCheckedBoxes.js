// Pass the checkbox name to the function
function getCheckedBoxes() {
    var checkboxes = document.getElementsByTagName('input')
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if ( checkboxes[i].type == "checkbox" && checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked;
  }