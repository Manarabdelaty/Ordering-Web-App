// Get the modal
var modalPass = document.getElementById('passModal');


// Get the <span> element that closes the modal
var spanPass = document.getElementsByClassName("closePass")[0];

var userId;
// When the user clicks on the button, open the modal

$('.cp').on("click",function(){
  modalPass.style.display = "block";
  userId =  $(this).attr('value');
});

$('#submit_pass').on("click",function(){
  var data = {};
  data.pass = document.getElementById("pass").value;
  data.id = userId;
  var pass_confirm = document.getElementById("passtwo").value;
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3000/changePass',
    success: function(data) {
        console.log(JSON.stringify(data));
        if (data.status == 1){
          changedModal.style.display= "block";
          modalPass.style.display = "none";
        }
      }
  });
});
// When the user clicks on <span> (x), close the modal
spanPass.onclick = function() {
  modalPass.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalPass) {
    modalPass.style.display = "none";
  }
  if (event.target == changedModal) {
    changedModal.style.display = "none";
  }
}
