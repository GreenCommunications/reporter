function applyCrashNodes(Target, json)
{
  document.getElementById("new").style.display = "block";
  
  var cnt = document.getElementById("nodeWrapper");
  cnt.innerHTML = "";

  document.getElementById("current").innerHTML = "Driving History";

  var targetEntity = Number(Target.target.id);
  
  console.log(json[targetEntity].length );

  for(var i = 1; json[targetEntity].length-1 >= i; i++)
  {
    cnt.innerHTML = cnt.innerHTML + "<div class='listNode'><div class='nodeType'>" + json[targetEntity][i][0] + "</div><img src='../car.png' class='nodeSvr" + json[targetEntity][i][1].toString() + "'></div>";
  }
}

function applyNameNodes(json)
{
  var nodeType = "node";
  var nodeInterval = 1;

  var nw = document.getElementById("nodeWrapper");

  json = JSON.parse(json);

  for(var i = 0; i <= json.length - 1; i++)
  {
    if(nodeInterval == 3)
    {
      nodeInterval = 1;
    }
    if(nodeInterval == 1)
    {
      nodeType = "node";
    }
    else if(nodeInterval == 2)
    {
      nodeType = "nodeG";
    }

    var div = document.createElement("div");
    div.setAttribute("class", nodeType);
    div.setAttribute("id", i.toString());
    div.innerHTML = '<div class="nodeName">' + json[i][0] + '</div>';
    nw.appendChild(div);

    nodeInterval++;

    document.getElementById(i.toString()).addEventListener("click", function(event)
    {
      applyCrashNodes(event, json);
    });
  }
}

window.onload = function()
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

        console.log(this.responseText);

        applyNameNodes(this.responseText);
      }
      else
      {
        console.log(this.status);

        document.getElementById("ld").style.display = "none";
      }
    }
  };
  xhttp.open("GET", "http://messagenr.esy.es/driving.php?action=pull", true);
  xhttp.send();
  
  document.getElementById("new").addEventListener("click", function()
  {
    chrome.app.window.create('DRECORD/new.html', {
      'outerBounds': {
        'width': 400,
        'height': 500
      }
    });
  });
};
