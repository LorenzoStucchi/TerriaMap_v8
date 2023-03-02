<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: text/json");    // Set the JSON header

$dbconn = pg_connect("host=kawau.ricerca.lan dbname=aerogen user=postgres password=M@nutenzione1")
    or die('Could not connect: ' . pg_last_error());
	
$testoSQL = "SELECT DISTINCT costruttore FROM macchine WHERE (macchine.potnom < 1000) ORDER BY costruttore";
$result = pg_query($testoSQL) or die('Query failed: ' . pg_last_error());
$costruttorisotto1000=array();
while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		array_push($costruttorisotto1000,($row['costruttore'])) ;
}
pg_free_result($result);


$testoSQL = "SELECT DISTINCT costruttore FROM macchine WHERE (macchine.potnom >= 1000) ORDER BY costruttore";
$result = pg_query($testoSQL) or die('Query failed: ' . pg_last_error());
$costruttorisopra1000=array();
while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		array_push($costruttorisopra1000,($row['costruttore'])) ;
}
pg_free_result($result);


$max = sizeof($costruttorisotto1000);
$costrEmacP = array();
for($i = 0; $i < $max; $i++) {
	$costruttore = $costruttorisotto1000[$i];
	$SQL = "SELECT * FROM macchine WHERE (macchine.potnom < 1000) AND (macchine.costruttore = '" . $costruttore . "')";
	$result_macchine = pg_query($SQL) or die('Query failed: ' . pg_last_error());
	$macchinesotto1000=array();
	while ($row = pg_fetch_array($result_macchine, null, PGSQL_ASSOC)) {
			$record_macchina = array();
			array_push($record_macchina,($row['id_macchina'])) ;
			array_push($record_macchina,($row['nome'])) ;
			array_push($record_macchina,($row['costruttore'])) ;
			array_push($record_macchina,($row['potnom'])) ;
			array_push($record_macchina,($row['diarot'])) ;
			array_push($record_macchina,($row['hub_m1'])) ;
			array_push($record_macchina,($row['hub_m2'])) ;
			array_push($record_macchina,($row['hub_m3'])) ;
			array_push($record_macchina,($row['hub_m4'])) ;
			array_push($record_macchina,($row['hub_m5'])) ;
			array_push($record_macchina,($row['hub_m6'])) ;
			array_push($record_macchina,($row['passostallo'])) ;
			array_push($macchinesotto1000, $record_macchina);
	}
	pg_free_result($result_macchine);
	array_push($costrEmacP,$costruttore,$macchinesotto1000) ;
}	 


$max = sizeof($costruttorisopra1000);
$costrEmacG = array();
for($i = 0; $i < $max; $i++) {
	$costruttore = $costruttorisopra1000[$i];
	$SQL = "SELECT * FROM macchine WHERE (macchine.potnom >= 1000) AND (macchine.costruttore = '" . $costruttore . "')";
	$result_macchine = pg_query($SQL) or die('Query failed: ' . pg_last_error());
	$macchinesotto1000=array();
	while ($row = pg_fetch_array($result_macchine, null, PGSQL_ASSOC)) {
			$record_macchina = array();
			array_push($record_macchina,($row['id_macchina'])) ;
			array_push($record_macchina,($row['nome'])) ;
			array_push($record_macchina,($row['costruttore'])) ;
			array_push($record_macchina,($row['potnom'])) ;
			array_push($record_macchina,($row['diarot'])) ;
			array_push($record_macchina,($row['hub_m1'])) ;
			array_push($record_macchina,($row['hub_m2'])) ;
			array_push($record_macchina,($row['hub_m3'])) ;
			array_push($record_macchina,($row['hub_m4'])) ;
			array_push($record_macchina,($row['hub_m5'])) ;
			array_push($record_macchina,($row['hub_m6'])) ;
			array_push($record_macchina,($row['passostallo'])) ;
			array_push($macchinesotto1000, $record_macchina);
	}
	pg_free_result($result_macchine);
	array_push($costrEmacG,$costruttore,$macchinesotto1000) ;
}	



$risultato=array();
array_push($risultato,$costrEmacP);
array_push($risultato,$costrEmacG);

// Closing connection
pg_close($dbconn);
echo json_encode($risultato); 
//echo json_encode($costrEmacG); 

?>
