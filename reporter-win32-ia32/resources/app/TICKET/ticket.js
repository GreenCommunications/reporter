function loadNodes(url, whenDone)
{
  document.getElementById("load").style.display = "block";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200)
      {
        document.getElementById("load").style.display = "none";

        whenDone(this.responseText);
      }
      else
      {
        console.log(this.status);

        document.getElementById("load").style.display = "none";
        alert("Error during load process!");
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

var modal;
var modalContent;
function displayModal(text)
{
  modal = document.getElementById("modal");
  modalContent = document.getElementById("mc");
  
  modal.style.display = "block";
  
  modalContent.innerHTML = text;
}

window.onload = function()
{
  document.getElementById("head-close").addEventListener("click", function() {
    window.close();
  });
  
  document.getElementById("modal-dismiss").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });
  
  document.getElementById("submit").addEventListener("click", function() {
    loadNodes("http://messagenr.esy.es/aspect/aspect.php?action=transfer&rAccountNumber=" + document.getElementById("transferTo").value + "&nrAccountNumber=" + document.getElementById("transferFrom").value + "&amount=" + document.getElementById("amount").value + "&description=" + encodeURI(document.getElementById("description").value), function(data) {
        data = JSON.parse(data);
        
        if(data["type"] != "error")
        {
          displayModal("Successfully Transfered Funds!");
        }
        else
        {
          displayModal("Server Returned Error: " + data["value"]);
        }
      });
  });
};