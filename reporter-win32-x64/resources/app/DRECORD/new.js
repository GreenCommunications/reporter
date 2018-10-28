window.onload = function()
{
  document.getElementById("SEND").addEventListener("click", function()
  {
    document.getElementById("loading").style.display = "block";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200)
        {
          console.log(this.responseText);
          
          window.close();
        }
        else
        {
          console.log(this.status);

          document.getElementById("loading").style.display = "none";
          document.getElementById("ERR").innerHTML = "Failed to send to server";
        }
      }
    };
    xhttp.open("GET", "http://messagenr.esy.es/driving.php?action=addRecord&name=" + encodeURI(document.getElementById("N").value) + "&type=" + encodeURI(document.getElementById("T").value + "&svity=" + encodeURI(document.getElementById("S").value.toString())), true);
    xhttp.send();
  });
};