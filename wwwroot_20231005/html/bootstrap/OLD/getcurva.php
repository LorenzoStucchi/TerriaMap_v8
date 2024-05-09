<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: text/json");    // Set the JSON header

$idmac = $_GET["id"];


$dbconn = pg_connect("host=kawau.ricerca.lan dbname=aerogen user=postgres password=M@nutenzione1")
    or die('Could not connect: ' . pg_last_error());
	
//$SQL = "SELECT id_macchina vel pot FROM curva_vel WHERE (id_macchina = " . idmac . " ) ORDER BY vel";
//$SQL = "SELECT * FROM curva_vel WHERE (id_macchina = " . idmac . " ) ORDER BY vel";
$SQL = "SELECT id_macchina, vel, pot FROM curva_vel WHERE (id_macchina = " . $idmac . " ) ORDER BY vel";
$result = pg_query($SQL) or die('Query failed: ' . pg_last_error());
$curva_vel=array();
while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
	$record = array();
	array_push($record,($row['vel'])) ;
	array_push($record,($row['pot'])) ;
	array_push($curva_vel,$record) ;
}
pg_free_result($result);

//echo json_encode('pippo '. $idmac); 
echo json_encode($curva_vel); 


?>
