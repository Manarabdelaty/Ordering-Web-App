// Get the modal
var editModal = document.getElementById('editModal');


// Get the <span> element that closes the modal
var spanEdit = document.getElementsByClassName("closeEdit")[0];

var menueInfo = {};

$('.edit').on("click",function(){
  editModal.style.display = "block";
  menueInfo.rest_id =  $(this).attr('rest_id');
  menueInfo.type_id = $(this).attr('type_id');
});

$('#submit_edit').on("click",function(){
  menueInfo.start_hr = document.getElementById("new_start_hr").value;
  menueInfo.end_hr = document.getElementById("new_end_hr").value;
  menueInfo.menue_type = document.getElementById("menue_type").value;

  $.ajax({
    type: 'POST',
    data: JSON.stringify(menueInfo),
    contentType: 'application/json',
    url: 'http://localhost:3000/editMenue',
    success: function(data) {
        if (data.status == 1)
          location.reload();
        else console.log('failure');
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
