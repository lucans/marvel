<?php 

error_reporting(E_ERROR);

define(PUBLIC_KEY, "fe254ae528185f2cdb167c844178d5cf"); 
define(PRIVATE_KEY, "4f7f9b2449614bbfb43c7656d18479c697b439fe"); 

extract($_GET);

$ts = date('YmdHis');
$hash = md5($ts . PRIVATE_KEY . PUBLIC_KEY);

$url = "https://gateway.marvel.com/v1/public/characters?ts=" . $ts . "&nameStartsWith=" . $nameStartsWith . "&apikey=" . PUBLIC_KEY . "&hash=" . $hash;
	
ini_set("allow_url_fopen", 1);
$json = file_get_contents($url);
$result = json_decode($json);

echo json_encode($result);

?>