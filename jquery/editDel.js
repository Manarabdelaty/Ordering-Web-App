// Get the modal
var editModal = document.getElementById('editModal');


// Get the <span> element that closes the modal
var spanEdit = document.getElementById("closeEdit");

var areaInfo = {};



$('#submit_edit').on("click",function(){
  areaInfo.charge = document.getElementById("new_charge").value;

  $.ajax({
    type: 'POST',
    data: JSON.stringify(areaInfo),
    contentType: 'application/json',
    url: 'http://localhost:3000/editDel',
    success: function(data) {
        console.log(JSON.stringify(data));
        if (data.status == 1)
          location.reload();
      }
  });
});
// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function() {
  editModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}
