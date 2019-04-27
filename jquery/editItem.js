// Get the modal
var modalItem = document.getElementById('itemModal');


// Get the <span> element that closes the modal
var spanEdit = document.getElementsByClassName("closeEdit")[0];

var itemInfo = {};
// When the user clicks on the button, open the modal

$('.edit').on("click",function(){
  modalItem.style.display = "block";
  itemInfo.item_id =  $(this).attr('item_id');
  itemInfo.menue_type =  $(this).attr('menue_type');
  itemInfo.rest_id =  $(this).attr('rest_id');
});

$('#submitEdit').on("click",function(){

  itemInfo.name = document.getElementById("new_name").value;

  $.ajax({
    type: 'POST',
    data: JSON.stringify(itemInfo),
    contentType: 'application/json',
    url: 'http://localhost:3000/editItem',
    success: function(data) {
        if (data.status == 1)
          location.reload();
      }
  });
});
// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function() {
  modalItem.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalItem) {
    modalItem.style.display = "none";
  }
}
