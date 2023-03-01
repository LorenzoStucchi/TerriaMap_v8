<!DOCTYPE html>
<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

</head>
  
<body>

<div align = "center", class="loader"></div>
	
 <strong>ABILITARE POPUP PER VISUALIZZARE GRAFICO</strong> 	
	
<?php
	

	


	$var_id = $_GET['var_id'];
	$cod_ammin = $_GET['cod_ammin'];
	$lingua = $_GET['lingua'];
	$limite = $_GET['limite'];
	
	echo "<script type=\"text/javascript\">";
	echo "Window_feedback= window.open(\"http://dbeta.rse-web.it/ai_grafici.phtml\"+ \"?var_id=$var_id&cod_ammin=$cod_ammin&lingua=$lingua&limite=$limite\",\"\", \"left=320,width=580,height=470,top=150\");";
		//echo "if(!Window_feedback || Window_feedback.closed || typeof Window_feedback.closed=='undefined');"; 
		//echo "{";
		//	echo "alert(\"POPUP BLOCCATI!\");";
		//echo "}";
	echo "</script>";

		


//-- start of snippet --







	
	//echo $scelta_opt_feedback;
	//echo $scelta_opt_feedback1;
	//echo $suggerimenti_utente;
	
	//echo "<button id=\"btn-save\" type=\"button\" class=\"btn btn-primary\" onClick=\"javascript: salvataggio();\">Esporta tabella</button>";


	//echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

	//echo "<a  href=\"#\" onclick=\"apri_pagina_prod_rsu('Legenda');\"  style=\"font-size: 11px;\">LEGENDA</a>";
	
	

	$commento = "FINE ESTRAZIONE";

	$anno_file = str_replace(";","-",$anno);
	$nome_file = $prod_rsu_tab . "-" . $anno_file;
?>

<div style="overflow: auto;height: 500px; width: 1200px;"> 
	<?php

					$parametri_connessione = "host=kawau.ricerca.lan dbname=dbeta user=postgres password=M@nutenzione1";
					$dbconn = pg_connect($parametri_connessione) or die('Could not connect: ' . pg_last_error());
					$mia_data = date("Y-m-d");
					$sql_max_id = "SELECT id FROM public.feedback WHERE id=(SELECT max(id) FROM public.feedback)";
					$result_sql_max_id = pg_query($sql_max_id) or die('Query failed: ' . pg_last_error());
				$num_sql_max_id = count(pg_fetch_all($result_sql_max_id));
				pg_fetch_row($result_sql_max_id, 0);
				$id_max = pg_fetch_result($result_sql_max_id, 0, 0);
				$id_max = $id_max + 1;
				$sql_update_feedback = "insert into public.feedback (id, esperienza, consiglierebbe, suggerimenti, data, sito_web) values ('$id_max', '$scelta_opt_feedback', '$scelta_opt_feedback1','$suggerimenti_utente','$mia_data', '$sito_web')";
				//echo"sql_update_feedback" . $sql_update_feedback;
				$aggiornamento = pg_query($sql_update_feedback);
				pg_close($dbconn);	
				?>

</div>


<!--<form role="form">
  <h3>Saving a file with pure JS!</h3>
  <p>Uses HTML5 W3C saveAs() function and the <a href="https://github.com/eligrey/FileSaver.js" target="_blank">FileSaver.js</a> polyfill for this.<br>
  I didn't think this was even possible without a server but the docs say it should work in IE 10+,  Sweet!</p>
  <div class="form-group">
    <label for="input-fileName">File name</label>
    <input type="text" class="form-control" id="input-fileName" value="textFile" placeholder="Enter file name">
  </div>
  <div class="form-group">
    <label for="textarea">Text</label>
    <textarea id="textarea" class="form-control" rows="10" placeholder="Enter text to save">Hai salvato il file consuccesso.</textarea>
  </div>
  <button id="btn-save" type="button" class="btn btn-primary" onClick="javascript: salvataggio();">Esporta tabella</button>
</form>-->

<input type="hidden" id="nome_file" name="nome_file" value="<?php echo $nome_file; ?>" />






<script type="text/javascript">

	window.close();
	
 
</script>

</body>
</html>