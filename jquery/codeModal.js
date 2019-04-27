// Get the modal
var codeModal = document.getElementById('codeModal');


// Get the <span> element that closes the modal
var spanCode = document.getElementsByClassName("closeCode")[0];

var cno;
// When the user clicks on the button, open the modal

$('#add').on("click",function(){
  codeModal.style.display = "block";
  cno =  $(this).attr('value');
});

$('#submit_code').on("click",function(){
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
  codeModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == codeModal) {
    codeModal.style.display = "none";
  }
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}
