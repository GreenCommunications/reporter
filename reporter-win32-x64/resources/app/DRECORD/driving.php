<?php
$action = $_GET["action"];

if($action == "pull")
{
  $file = fopen("d.json", "r");
  
  echo(fread($file, filesize("d.json")));
}
elseif($action == "addRecord")
{
  $name = $_GET["name"];
  $type = $_GET["type"];
  $servereity = $_GET["svity"];
  
  $file = fopen("d.json", "r");
  $json = json_decode(fread($file, filesize("d.json")), true);
  fclose($file);
  
  $location;
  
  foreach($json as $key => $value)
  {
    if($value[0] == $name)
    {
      $location = $key;
    }
  }
  
  array_push($json[$location], array($type, $servereity));
  
  $file = fopen("d.json", "w");
  fwrite($file, json_encode($json));
}
?>