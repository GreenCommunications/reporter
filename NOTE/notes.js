window.onload = function()
{
  document.getElementById("FIELD").addEventListener("keyup", function()
  {
    console.log("Clicked");
    
    document.getElementById("SV").innerHTML = "Saving...";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if(this.status == 200)
        {
          document.getElementById("FIELD").innerHTML = this.responseText;
          document.getElementById("FIELD").removeAttribute("disabled");
        
          document.getElementById("SV").innerHTML = "Saved";
        }
        else
        {
          console.log(this.status);
        }
      }
    };
    xhttp.open("POST", "http://messagenr.esy.es/Nget.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + document.getElementById("FIELD").value);
  });
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200)
      {
        document.getElementById("FIELD").innerHTML = this.responseText;
        document.getElementById("FIELD").removeAttribute("disabled");
        
        document.getElementById("SV").innerHTML = "Saved";
      }
      else
      {
        console.log(this.status);
      }
    }
  };
  xhttp.open("GET", "http://messagenr.esy.es/notes.txt?r=" + Math.random(), true);
  xhttp.send();
};