// Get the modal
var editModal = document.getElementById('editModal');


// Get the <span> element that closes the modal
var spanCode = document.getElementsByClassName("closeEdit")[0];

var cno;

$('#submit_edit').on("click",function(){
  var data = {};
  data.percent = document.getElementById("percent").value;
  data.start = '';
  data.end = '';

  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3000/addCode',
    success: function(data) {
        console.log(JSON.stringify(data));
        if (data.status == 1)
          console.log('success');
      }
  });
});
// When the user clicks on <span> (x), close the modal
spanCode.onclick = function() {
  editModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}
