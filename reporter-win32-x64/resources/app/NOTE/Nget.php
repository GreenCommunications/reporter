<?php
$text = $_POST["text"];

$file = fopen("notes.txt", "w");
fwrite($file, $text);
fclose($file);
?>