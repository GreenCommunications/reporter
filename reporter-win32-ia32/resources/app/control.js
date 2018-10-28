let {BrowserWindow} = require("electron").remote
let path = require('path')
let url = require('url')

function sizeOf(arr)
{
  var output = 0;

  for(var i = 0; i < arr.length; i++)
  {
    console.log("loop");
    if(arr[i] !== undefined)
    {
      output++;
    }
  }

  return output;
}

function loadNodes()
{
  var cnt = document.getElementById("nodeWrapper");
  cnt.innerHTML = "";

  document.getElementById("ld").style.display = "block";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200)
      {
        document.getElementById("ld").style.display = "none";

        applyNodes(this.responseText);
      }
      else
      {
        console.log(this.status);

        document.getElementById("ld").style.display = "none";
        document.getElementById("error").innerHTML = "Failed to load entries";
      }
    }
  };
  xhttp.open("GET", "http://messagenr.esy.es/REPRT.php?action=check", true);
  xhttp.send();
}

function applyNodes(json)
{
  json = JSON.parse(json);

  var cnt = document.getElementById("nodeWrapper");
  cnt.innerHTML = "";

  for(var i = 0; i <= sizeOf(json) - 1; i++)
  {
    cnt.innerHTML = cnt.innerHTML + "<div class='node'><div class='nodeName'>" + json[i][0] + "</div><div class='nodeUVID'>" + json[i][1] + "</div><div class='reason'>" + json[i][2] + "</div><img class='high' src='high.png'></div><br>";
  }
}

window.onload = function()
{
  document.getElementById("rld").addEventListener("click", function()
  {
    loadNodes();
  }
  );

  loadNodes();

  document.getElementById("REPRT").addEventListener("click", function()
  {
    createWindow("model.html", 400, 500)
  }
  , true);

  document.getElementById("DRIV").addEventListener("click", function()
  {
      createWindow("DRECORD/DRECORD.html", 400, 500)
  }, true);

  document.getElementById("PAY").addEventListener("click", function()
  {
    createWindow("TICKET/ticket.html", 400, 600, false)
  }, true);
  
  document.getElementById("NOTES").addEventListener("click", function()
  {
    createWindow("NOTE/notes.html", 400, 500)
  }, true);
};


//--ELECTRON PORT--//

function createWindow(target, width, height, _frame)
{
  if(_frame == null)
  {
    _frame = true
  }

  launcherWindow = new BrowserWindow({width: width, height: height, icon: "icon.png", show: false, frame: _frame})

  launcherWindow.loadURL(url.format({
    pathname: path.join(__dirname, target),
    protocol: 'file:',
    slashes: true
  }))

  launcherWindow.once("ready-to-show", () => 
  {
    launcherWindow.show();
  });

  launcherWindow.on('closed', function () {
    launcherWindow.close()
  })
}