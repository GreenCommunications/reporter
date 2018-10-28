<?php
$action = $_GET["action"];

if($action == "pull")
{
  $file = fopen("stats.json", "r");
  $json = json_decode(fread($file, filesize("stats.json")), true);
  
  foreach($json as $key => $value)
  {
    if($value[0] == "Elliot")
    {
      $json[$key] = null;
    }
  }
  
  echo(json_encode($json));
}
elseif($action == "update")
{
  $from = $_GET["from"];
  
  $file = fopen("stats.json", "r");
  $json = json_decode(fread($file, filesize("stats.json")), true);
  fclose($file);
  
  $fromLocation;
  $toLocation;
  foreach($json as $key => $value)
  {
    if($value[0] == $from)
    {
      $fromLocation = $key;
    }
    elseif($value[0] == "Elliot")
    {
      $toLocation = $key;
    }
  }
  
  $json[(string)$fromLocation][1] = (string)((int)$json[$fromLocation][1] - 50);
  
  $json[(string)$toLocation][1] = (string)((int)$json[$toLocation][1] + 50);
  
  $file = fopen("stats.json", "w");
  fwrite($file, json_encode(array_values($json)));
}
?>