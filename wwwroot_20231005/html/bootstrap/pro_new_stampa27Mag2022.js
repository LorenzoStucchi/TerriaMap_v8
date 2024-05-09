//versione con stampa su pdf
//var graserv="http://localhost/cgi-bin/owtchart.exe";
//var bootstrapserv="http://localhost/bt/prod";
var graserv="https://atlanteeolico.rse-web.it/cgi-bin/owtchart.exe";
var bootstrapserv="https://atlanteeolico.rse-web.it/bootstrap";
var indmac=-1; //indh= -1;

// console.log("lingua=" + lingua);
var DensitaSito = 1.225;
var DensitaSlm = 1.225;
var VelMed=[];
var Produc=[];
var KWe=[];

var aerog_name = "";
var aerog_diam = 0;
var aerog_pot = 0;
var aerog_hmozzo = 0;
var lu = 25;
var VelAgen = new Array(lu);	//curva di potenza dell'aerogeneratore
var PotAgen = new Array(lu);
	
var ProdSpecAgen = 0;		    //producibilità specifica dell'aerogeneratore
var ProducibilitaAgen = 0;	//producibilità dell'aerogeneratore

var ModCalc ={};

ModCalc.tabE = {
	"annoavvio" : 2022,
	"vitautile" : 20,
	"costocapitspec" : 1500,
	"tipocollegamento" : "cavo",
	"costokmcollegamento" : 250,
	"costoinfrastrelett" : 3000,
	"costifissiom" : 2,
	"costivariabiliom" : 0,
	"oneriannuiricavi" : 1.5,
	"oneriannuifissi" : 2,
}
ModCalc.tabF = {
	"percpotgarantita" : 95,
	"dispannua" : 97,
	"perditeaerodin" : 5,
	"perditeelettr" : 3,
	"dispannreteel" : 99.5,
	"tassoatt" : 8,
	"taxco2" : 0.56,	//kg/kWh   	da foglio excel Lembo
	"taxnox" : 0.56,	//g/kWh		  idem
	"taxso2" : 1.46,	//g/kWh		  idem
	"taxpm" : 0.3,		//g/kWh		  idem
}

function inizializza() {
	setURLParam();
	setvcarweib();
	scriviRiepilogo();
	scriviTabEF();
}

function scriviTabEF() {
console.log("scriviTabEF");
	var Aerogeneratore = aerog_name;
	var PotNom = Number(aerog_pot);
	var NumAerog = Number(document.getElementById("NumAgen").value);  
	var PotParco = NumAerog * PotNom;
	
	var NomeProg = document.getElementById("NomeProg").value;
	var AnnoAvvio = Number(document.getElementById("secEAnnoAvvio").value);
	var VitaUtile = ModCalc.tabE.vitautile;
	var CostoCapitSpec = Number(document.getElementById("secECostoCapitSpec").value);
	var CostoCapitale = CostoCapitSpec * PotParco / 1000;
	var Distcab = Number(document.getElementById("secEDistcab").value);
	var CostoKmCollegamento = Number(document.getElementById("secECostoKmCollegamento").value);
	var CostoInfrastrElett = Number(document.getElementById("secECostoInfrastrElett").value);
	var CostoComplCollegamento = (CostoKmCollegamento * Distcab) + CostoInfrastrElett;
	var CostoComplParcoEol = CostoComplCollegamento + CostoCapitale; 
	var CostiFissiOM = Number(document.getElementById("secECostiFissiOM").value);
	var CostiVariabiliOM= Number(document.getElementById("secECostiVariabiliOM").value);
	var OneriAnnuiRicavi = Number(document.getElementById("secEOneriAnnuiRicavi").value);
	var OneriAnnuiFissi = Number(document.getElementById("secEOneriAnnuiFissi").value);
	
	var ProdLorda = ProdSpecAgen * PotParco / 1000;
	var ProdSpecLorda = ProdSpecAgen;
	var PercPotGarantita = Number(document.getElementById("secFPercPotGarantita").value);
	var DispAnnua= Number(document.getElementById("secFDispAnnua").value);
	var PerditeAerodin= Number(document.getElementById("secFPerditeAerodin").value);
	var PerditeElettr = Number(document.getElementById("secFPerditeElettr").value);
	var DispAnnReteEl = Number(document.getElementById("secFDispAnnReteEl").value);
	var EffComplParco = 100 * (PercPotGarantita/100 * DispAnnua/100 * (1-PerditeAerodin/100) * (1-PerditeElettr/100) * DispAnnReteEl/100);
	var ProdNetta = ProdLorda * PercPotGarantita/100 * DispAnnua/100 * (1-PerditeAerodin/100) * (1-PerditeElettr/100) * DispAnnReteEl/100;
	ProdNetta = Number(ProdNetta.toFixed(0));

	var TassoAtt = Number(document.getElementById("secFTassoAtt").value);
	var taxCO2 = ModCalc.tabF.taxco2;  
	var taxNOx = ModCalc.tabF.taxnox;	
	var taxSO2 = ModCalc.tabF.taxso2;	
	var taxPM = ModCalc.tabF.taxpm;	
	var CO2 = 0;
	var NOx = 0;
	var SO2 = 0;
	var PM = 0;

	var foglio_2J18, foglio_2L18, foglio_2M18, foglio_2N18, foglio_2O18, foglio_2P18, foglio_2Q18; //foglio2 excel Lembo
	
	foglio_2Q18 = (1-OneriAnnuiRicavi/100)*ProdNetta*1000;	//(D-gam)*E*1000
	foglio_2P18 = OneriAnnuiFissi*PotParco/1000;
	foglio_2O18 = ProdNetta*CostiVariabiliOM*10/1000;  			//Ce
	foglio_2N18 = CostiFissiOM*CostoComplParcoEol/100
	foglio_2M18 = CostoComplParcoEol;							          //Ci
	foglio_2L18 = (TassoAtt/100 * Math.pow((1+TassoAtt/100),VitaUtile) ) / ( Math.pow((1+TassoAtt/100),VitaUtile) - 1);		//alfa
	foglio_2J18 = ((foglio_2L18*1000*foglio_2M18+(foglio_2N18+foglio_2O18+foglio_2P18)*1000)/foglio_2Q18)*100;

//console.log("J" + foglio_2J18 + " L" + foglio_2L18 + " M" + foglio_2M18 + " N" + foglio_2N18 + " O" + foglio_2O18 + " P" + foglio_2P18 + " Q" + foglio_2Q18);
	
//secE
	$("#secENomeProg").html(NomeProg);
	$("#secEAnnoRealiz").html(AnnoAvvio + 1);
	$("#secECostoCapitale").html(CostoCapitale);
	$("#secECostoComplCollegamento").html(CostoComplCollegamento);
	$("#secECostoComplParcoEol").html(CostoComplParcoEol);
	
//secF
	$("#secFNomeProg").html(NomeProg);
	$("#secFAerogeneratore").html(Aerogeneratore);
	$("#secFPotNom").html(aerog_pot);
	$("#secFNumAerog").html(NumAerog);
	$("#secFPotParco").html(PotParco);
	$("#secFProdLorda").html(ProdLorda);
	$("#secFProdSpecLorda").html(ProdSpecLorda);
	// document.getElementById("secFPercPotGarantita").value = PercPotGarantita;
	// document.getElementById("secFDispAnnua").value = DispAnnua;
	// document.getElementById("secFPerditeAerodin").value = PerditeAerodin;
	// document.getElementById("secFPerditeElettr").value = PerditeElettr;
	// document.getElementById("secFDispAnnReteEl").value = DispAnnReteEl;
	$("#secFEffComplParco").html(EffComplParco.toFixed(1));
	$("#secFProdNetta").html(ProdNetta);
	//document.getElementById("secFTassoAtt").value = TassoAtt;
	$("#secFCostoMedkWh").html(foglio_2J18.toFixed(1));

	CO2 = ProdNetta*1000*taxCO2/1000;
	NOx = ProdNetta*1000*taxNOx/1000000;
	SO2 = ProdNetta*1000*taxSO2/1000000;
	PM  = ProdNetta*1000*taxPM/1000000;
	$("#secFCO2").html(CO2.toFixed(0));
	$("#secFNOx").html(NOx.toFixed(0));
	$("#secFSO2").html(SO2.toFixed(0));
	$("#secFPM").html(PM.toFixed(0));
}
	
function setURLParam() {
	var str, VelMedAnn, KWeib;
  ModCalc.onShore = getURLParameter("ons")
	ModCalc.coord = {
		"lat": getURLParameter("Lat"),
		"lon": getURLParameter("Lon"),
		"comune": getURLParameter("Com"),
		"provincia": getURLParameter("Prov"),
		"regione": getURLParameter("Reg"),
		"altitudine": getURLParameter("Alti"),
	};
	ModCalc.VelMed = {
		"0": "0",
		"50": getURLParameter("Vel50"),
		"75": getURLParameter("Vel75"),
		"100": getURLParameter("Vel100"),
		"125": getURLParameter("Vel125"),
		"150": getURLParameter("Vel150"),
	};
	ModCalc.Produc = {
		"0": "0",
		"50": getURLParameter("Pro50"),
		"75": getURLParameter("Pro75"),
    "100": getURLParameter("Pro100"),
    "125": getURLParameter("Pro125"),
    "150": getURLParameter("Pro150"),
	};
	ModCalc.KWe = {
		"50": getURLParameter("KWe50"),
		"75": getURLParameter("KWe75"),
    "100": getURLParameter("KWe100"),
	};
	ModCalc.DistanzaImp = getURLParameter("Distimp");
	
	$("#Lati").html(__('Latitude: ') + ModCalc.coord.lat);
	$("#Long").html(__('Longitude: ') + ModCalc.coord.lon);
	$("#Comune").html(ModCalc.coord.comune);
	$("#Provincia").html(ModCalc.coord.provincia);
	$("#Regione").html(ModCalc.coord.regione);
	DensitaSito = calcDensita(ModCalc.coord.altitudine);
	$("#Altitudine").html(ModCalc.coord.altitudine);
	$("#Densita").html(DensitaSito.toFixed(2));
	$("#DistanzaImp").html(getURLParameter("Distimp"));
	VelMed[0]=ModCalc.VelMed["0"];
	VelMed[1]=ModCalc.VelMed["50"];
	VelMed[2]=ModCalc.VelMed["75"];
	VelMed[3]=ModCalc.VelMed["100"];
	VelMed[4]=ModCalc.VelMed["125"];
	VelMed[5]=ModCalc.VelMed["150"];
	Produc[0]=ModCalc.Produc["50"];
	Produc[1]=ModCalc.Produc["75"];
	Produc[2]=ModCalc.Produc["100"];
	Produc[3]=ModCalc.Produc["125"];
	Produc[4]=ModCalc.Produc["150"];
  KWe[0]=ModCalc.KWe["50"];
	KWe[1]=ModCalc.KWe["75"];
	KWe[2]=ModCalc.KWe["100"];
  // console.log(VelMed)
  // console.log(Produc)
  // console.log(KWe)
	VelMedAnn = Interpola(25,VelMed.slice());
  KWeib = SelKweib(25,KWe.slice(),ModCalc.onShore)
	document.getElementById("VelMedAnnua").value = VelMedAnn.toFixed(2);
	document.getElementById("KWeibull").value = KWeib;
  console.log("VelMedAnn="+VelMedAnn+" KWeib="+KWeib);
	// $("#VelMedAnnua").html(VelMedAnn);
	$("#KWeibull").html(KWeib);
	
	str = __("Atlas value : ") + KWeib;
	$("#labKWeibullAtl").html(str);
	str = __('Select hub height');
	$("#labVelMedAnnAtl").html(str);
	
	//init tabE
	document.getElementById("secEAnnoAvvio").value = ModCalc.tabE.annoavvio;
	$("#secEVitaUtile").html(ModCalc.tabE.vitautile);
	document.getElementById("secECostoCapitSpec").value = ModCalc.tabE.costocapitspec;
	document.getElementById("secEDistcab").value = ModCalc.DistanzaImp;
	document.getElementById("secETipoCollegamento").value = ModCalc.tabE.tipocollegamento;
	document.getElementById("secECostoKmCollegamento").value = ModCalc.tabE.costokmcollegamento;
	document.getElementById("secECostoInfrastrElett").value = ModCalc.tabE.costoinfrastrelett;
	document.getElementById("secECostiFissiOM").value = ModCalc.tabE.costifissiom;
	document.getElementById("secECostiVariabiliOM").value = ModCalc.tabE.costivariabiliom;
	document.getElementById("secEOneriAnnuiRicavi").value = ModCalc.tabE.oneriannuiricavi;
	document.getElementById("secEOneriAnnuiFissi").value = ModCalc.tabE.oneriannuifissi;

	//init tabF
	document.getElementById("secFPercPotGarantita").value = ModCalc.tabF.percpotgarantita;
	document.getElementById("secFDispAnnua").value = ModCalc.tabF.dispannua;
	document.getElementById("secFPerditeAerodin").value = ModCalc.tabF.perditeaerodin;
	document.getElementById("secFPerditeElettr").value = ModCalc.tabF.perditeelettr;
	document.getElementById("secFDispAnnReteEl").value = ModCalc.tabF.dispannreteel;
	document.getElementById("secFTassoAtt").value = ModCalc.tabF.tassoatt;
};


function scriviRiepilogo() {
  $("#lrNomeProg").html($("#NomeProg").html());
  $("#lrComune").html(__("Municipality: ") + $("#Comune").html());
  $("#lrProvincia").html(__("Province: ") + $("#Provincia").html());
  $("#lrRegione").html(__("Region: ") + $("#Regione").html());
  $("#lrLati").html($("#Lati").html());
  $("#lrLong").html($("#Long").html());
  $("#lrDensita").html($("#Densita").html() + "  kg/m3");
  $("#lrDistanzaImp").html($("#DistanzaImp").html() + " km");
  $("#lrAerogeneratore").html($("#labAerog").html());
  $("#lrVelMedAnnua").html(document.getElementById("VelMedAnnua").value);
  $("#lrKWeibull").html(document.getElementById("KWeibull").value);
  $("#lrlabAWeibull").html($("#labAWeibull").html());
};


function Interpola(altmoz,Valori) {
  // interpola la velocità del vento all'altezza del mozzo
	var altezze = [0,50,75,100,125,150];       // [25,50,75,100];
  // var Valori = new Array();
  // Valori = valori;
  // Valori.unshift(0)
  // console.log('Interpola *** ', altmoz, Valori)
	var sett, Vint, y1, y2, v1, v2;
	sett = 0;
	for (i = 0; i < 6; i++) {
		if (altmoz >= altezze[i]) {
			sett = i;
			//console.log(sett);
		}
	}
	sett = sett > 2 ? 2 : sett; 
	y2 = altezze[sett+1];
	y1 = altezze[sett];
	v2 = Number(Valori[sett+1]);
	v1 = Number(Valori[sett]);
	Vint = (v2 - v1) / (y2 - y1) * (altmoz - y1) + v1
	// console.log(altmoz + " " + sett + " y:" + y1 + " " + y2 + " v:" + v1 + " " + Vint + " " + v2 );
  // console.log('Interpola *** ', Vint)
	return Vint;
};

function SelKweib(altmoz,Valori,onShore) { // seleziona il valore della k di weibull secondo l'altezza del mozzo
  if (onShore == 1) {
    var altezze = [50, 75, 100];   
    var altmed = [];
    for (i = 0; i < 2; i++) { altmed[i]= (altezze[i] +  altezze[i+1])/2 }
    // console.log('SelKweib *** ', altezze, altmed)
    Kweib = Number(Valori[2]);
    for (i = 0; i < 2; i++) {
      if (altmoz < altmed[i]) { 
        Kweib = Number(Valori[i]); 
        break;
      }
    }
  } else {
    Kweib = Number(Valori[2]);
  }
  // console.log('SelKweib *** ',onShore, altmoz, Valori, Kweib)
  return Kweib;
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};
//esempio chiamata
//http://ric304017.ricerca.lan/bt/prod/prov2.html?Lat=45&Lon=11&Com=Segrate&Prov=Milano&Reg=Lombardia&Alti=1000&Distimp=222&Velmed25=5&Velmed50=10&Velmed75=15&Velmed100=20&Produc25=1000&Produc50=2000&Produc75=3000&Produc100=4000&KWeib=1.3#


function calcPot() {
	var n = document.getElementById("NumAgen").value;
	//console.log("NumAgen= " + n);
	$("#PotParco").html(n==0 ? "" : n*aerog_pot + " kW");
	$("#lrNumAerog").html(n);//tab D riepilogo
	$("#lrPotParco").html(n==0 ? "" : n*aerog_pot + " kW"); //tab D riepilogo
};


function weibull(x,alfa,beta,cumulata) {
//cumulata o densità di probabilità distrib weibull
//alfa=fatt forma (k);  beta=vel caratteristica (A)
	var out;
	if (cumulata == true) {
		out = 1 - Math.exp(-Math.pow((x/beta),alfa));
	} else {
		out = (alfa / Math.pow(beta,alfa)) * Math.pow(x,(alfa - 1)) * Math.exp(-Math.pow((x/beta),alfa));
	}
	return out;
};


function calcProducibilita(PotNomAgen,kforma,vcar) {
  //riproduce il foglio CALCOLO_ORE di Lembo, calcola la PotSpecifica e la Producibilita
	//alfa=fatt forma (k);  beta=vel caratteristica (A), VMA=velocità media annuale
	var minx=0; maxx=40; step=0.5; mezzostep = step/2;
	var nEl=41;
	myVelAgen = new Array(nEl);
	myPotAgen = new Array(nEl);
	
	//bin_V   V_CP   weib  1-weib  verifica   V1    P(V1)  V2     P(V2) P_V_CP  integrale     //label da foglio CALCOLO_ORE di Lembo
	var exA,  exB,   exC,   exD,     exE,     exF,  exG,   exH,   exI,  exJ,     exK;        //colonne excel riga corrente
	var exDp;        //colonne excel riga prec
	var integrale;   //cella K87 foglio excel
	exA = minx;		exDp = 1;

	myVelAgen[0] = 0;
	myPotAgen[0] = 0;
	for (i = 1; i < VelAgen.length; i++) {
		myVelAgen[i] = Number(VelAgen[i-1]);
		myPotAgen[i] = Number(PotAgen[i-1]);
	}
	for (i = VelAgen.length; i < nEl; i++) {
		myVelAgen[i] = i;
		myPotAgen[i] = Number(PotAgen[PotAgen.length-1]);
	}
	// for (i = 0; i < nEl; i++) {
		// console.log(i + " " + myVelAgen[i] + " " + myPotAgen[i]);
	// }
	integrale = 0;
	while (exA < maxx) {
		exA += step;					//bin_V
		exB = exA - mezzostep;			//V_CP
		//exC = weibull(exA,kforma,vcar,true);  //WEIBULL EXCEL
		exD = Math.exp(-Math.pow((exA/vcar),kforma));  //
		//exE = -(exC - 1);						//Verifica
		exF = Math.ceil(exA) - 1;				//V1
		exG = myPotAgen[exF];					//P(V1)
		exH = Math.ceil(exA);  					//V2
		exI = myPotAgen[exH];					//P(V1)
		exJ = exG + (exI - exG) * (exB - exF) / (exH - exF);  //P_V_CP 
		exK = exJ * (exDp - exD);				//integrale
		
		//console.log("exA="+exA+" exB="+exB+" exD="+exD.toFixed(5)+" exF="+exF+" exG="+exG.toFixed(4)+" exH="+exH+" exI="+exI.toFixed(5)+" exJ="+exJ.toFixed(5)+" exK="+exK.toFixed(5));
		integrale += exK;
		
		exDp = exD;
	}
	ProdSpecAgen = integrale * 8760 / PotNomAgen;
	ProdSpecAgen = Number(ProdSpecAgen.toFixed(0));
	ProducibilitaAgen = integrale * 8760 / 1000;
	ProducibilitaAgen = Number(ProducibilitaAgen.toFixed(0));
	console.log( "integrale=" + integrale + "  PotSpecifica=" + ProdSpecAgen + "   Producibilita=" + ProducibilitaAgen);
}


function velCaratt_weibull(VmedAnnua,k_weibull) {
//data la velocità media e il fattore di forma k
//calcola la velocità caratteristica della distrib weibull 
	var x, k1, c1, c2, c3, c4, c5, c6, fg;
	var fg_1, k1_1, check_1, fg_2 ,k1_2, check_2, fg_3, k1_3;
	var F_GAMMA, V_Weibull;

	x = 1 + (1/k_weibull);  //=1+1/O3
	k1 = x-1;				//=O5-1
	c1 = -0.574846;			
	c2 = 0.9512363;			
	c3 = -0.69985880;		
	c4 = 0.42455490;		
	c5 = -0.10106780;
	fg = 1;

	fg_1 = k1 < 0 ? "ERRORE" : (k1 > 1 ? fg * k1 : 1); //=SE(O7<0;"ERRORE";SE(O7>=1;O13*O7;1))
	k1_1 = k1 >= 1 ? (k1-1) : k1;   		//=SE(O7>=1;O7-1;O7)
	check_1 = k1_1 < 1 ? 1 : 0;				//=SE(N17<1;1;0)
	fg_2 = k1_1 < 1 ? 1 : 0;				//=SE(N17<1;1;0)
	k1_2 = k1_1 >= 1 ? k1_1-1 : k1_1;		//=SE(N17>=1;N17-1;N17)
	check_2 = k1_2 < 1 ? 1 : 0;				//=SE(N20<1;1;0)
	fg_3 = check_2 == 1 ? fg_2 : fg_2*k1_2;	//=SE(N21=1;N19;N19*N20)
	k1_3 = k1_2 >= 1 ? k1_2-1 : k1_2;		//=SE(N20>=1;N20-1;N20)
	F_GAMMA = fg_3 * (1 + c1 * k1_3 + c2 * Math.pow(k1_3,2) + c3 * Math.pow(k1_3,3) + c4 * Math.pow(k1_3,4) + c5 * Math.pow(k1_3,5)); //=N22* (1+O8*N23 +O9*N23^2+O10*N23^3+O11*N23^4+O12*N23^5)
	V_Weibull = VmedAnnua / F_GAMMA;			//=O4/N28
	return V_Weibull;
	// console.log('x=' + x)
	// console.log('k1=' + k1)
	// console.log('c1=' + c1)
	// console.log('c2=' + c2)
	// console.log('c3=' + c3)
	// console.log('c4=' + c4)
	// console.log('c5=' + c5)
	// console.log('fg=' + fg)
	// console.log('fg_1=' + fg_1)
	// console.log('k1_1=' + k1_1)
	// console.log('check_1=' + check_1)
	// console.log('fg_2=' + fg_2)
	// console.log('k1_2=' + k1_2)
	// console.log('check_2=' + check_2)
	// console.log('fg_3=' + fg_3)
	// console.log('k1_3=' + k1_3)
	// console.log('F_GAMMA=' + F_GAMMA)
	// console.log('V_Weibull=' + V_Weibull)
};


function DrawCurvaWeib(VMA,kforma,vcar) {
	//alfa=fatt forma (k);  beta=vel caratteristica (A), VMA=velocità media annuale
	var x; minx=0; maxx=36; step=0.5;
	var XLabels, Vals, YMax=1.2; YMax2=0.1;
	var verde = "008000"; arancio = "fb6c0c";
	Valscw = "&Vals=";		Valsdw = "";		XLabels = "&XLabels=";
	x=minx;
	while (x <= maxx) {
		cw = 1 - weibull(x,kforma,vcar,true);
		dw = weibull(x,kforma,vcar,false);
		XLabels = XLabels + x + ";";
		Valscw = Valscw + cw + "!";
		Valsdw = Valsdw + dw + "!";
//		console.log("x=" + x.toFixed(1) + "  weib=" + weibull(x,kforma,vcar,true) + "  cw=" + cw.toFixed(4) + "  dw=" + dw.toFixed(4) + " "  );
		x += step;
	}
	XLabels = XLabels.substring(0,XLabels.length-1)
	Valsdw = Valsdw.substring(0,Valsdw.length-1)
	// console.log(XLabels)
	// console.log('Valsdw')
	// console.log(Valsdw)
	// console.log('Valscw')
	// console.log(Valscw)
	var gra = graserv + "?Type=Combo_Line_Line&W=800&H=300&NumSets=1&NumPts=" + ((maxx-minx)/step + 1);
	gra = gra + "&YMin=0&YMax=" + YMax + "&YMin2=0&YMax2=" + YMax2 + "&Yaxis2=1";
	gra = gra + "&Title=" + __('WEIBULL+DISTRUBUTION+CURVE++(average+wind+speed+at+wind+turbine=') + VMA +"++A=" + vcar.toFixed(1) + "++k=" + kforma + ")";
	gra = gra + "&XTitle=" + __('Wind+speed+at+hub+height+(m/s)');
	gra = gra + "&YTitle=" + __('Cumulative+distribution');
	gra = gra + "&YTitle2=" + __('Probability+density') + "&XLabelFont=M";
	gra = gra + "&PlotColor=" + verde + "&VolColor=" + arancio +  "&Jpeg_Quality=2";
	gra = gra + "&YInterval=0.2" + "&YLabelColor=" + verde + "&YTitleColor=" + verde;
	gra = gra + "&YInterval=0.01" + "&YLabel2Color=" + arancio + "&YTitle2Color=" + arancio + '&YLabel2Fmt=%25.2f&LineWidth=4';
	gra = gra + Valscw + Valsdw + XLabels;
	console.log(gra);
	$("#curweib").html("<img id='theImg' src=" + gra + " />");
	$("#lrcurweib").html("<img id='theImg' src=" + gra + " />");
};

function setvcarweib() {
	//imposta la v caratteristica della weibull
	//e ricalcola la ProdSpecAgen e la ProducibilitaAgen

  console.log("setvcarweib");
	VMA=document.getElementById("VelMedAnnua").value;
	KW=document.getElementById("KWeibull").value;
	var vcarweib = velCaratt_weibull(VMA,KW);
	var el=document.getElementById("labAWeibull")
	var text = "";
	// text += "<label align='left'>Velocit&agrave caratteristica A della distribuzione di Weibull: ";	
	// text += vcarweib.toFixed(1) + " [m/s]</label>";	
	text += vcarweib.toFixed(1) + " m/s";	
	$("#labAWeibull").html(text);
	$("#lrlabAWeibull").html(text);//tab D
	DrawCurvaWeib(VMA,KW,vcarweib)
	
	calcProducibilita(aerog_pot,KW,vcarweib)
};	

function calcDensita(alti) {
	if (alti < 0) {alti=0};
	Densita = 1.225 * Math.exp(-alti/10262);
	return Densita
};

function __(string) {
    var dict = ModCalc.dict;
    if (typeof(dict) != 'undefined' && dict[string]) {
        return dict[string];
    }
    return string;
};

ModCalc.dict = {
	'Latitude: ' : 'Latitudine: ',
	'Longitude: ' : 'Longitudine: ',
	//validazione
	'Insert project name' : 'Inserire il nome del progetto',
	'Only numerical values' : 'Solo valori numerici',
	'Insert site elevation' : "Inserire l'altitudine del sito",
	'only integer values' : "Solo valori interi",
  'Insert a value greater than 0' : 'Inserire un valore maggiore di 0',
  'Insert a value greater than 0.5' : 'Inserire un valore maggiore di 0.5',
  'Insert a value lower than 4' : 'Inserire un valore minore di 4',
	'Insert the number of wind turbines units of the wind farm' : "Inserire il numero di aerogeneratori che compongono il parco",
	'Insert the annual average wind speed [m/s]' : "Inserire la velocit&agrave media annua del sito [m/s]",
	'Insert the shape factor (k) of Weibull distribution' : "Inserire il fattore di forma k della distribuzione di Weibull",
	'Insert the characteristic wind speed (A) of Weibull distribution [m/s]' : "Inserire la velocit&agrave caratteristica A della distribuzione di Weibull [m/s]",
	'Insert the starting year of the wind farm project' : "Inserire l'anno di avvio del progetto del Parco Eolico",
	'Insert a value greater than 1960' : "inserire un valore maggiore di 1960",
	
	'Atlas value : ' : 'Valore atlante: ',
	'Select hub height' : 'Selezionare altezza mozzo ',
	'Municipality: ' : 'Comune: ',
	'Province: ' : 'Provincia: ',
	'Region: ' : 'Regione: ',
	

	//secF
	'Enter a numerical value' : 'Inserire un valore numerico',
	
	'WEIBULL+DISTRUBUTION+CURVE++(average+wind+speed+at+wind+turbine=' : 'CURVA+DI+DISTRIBUZIONE+DI+WEIBULL++(velocita+media+annua+ad+altezza+mozzo=',
	'Wind+speed+at+wind+turbine+(m/s)' : 'Velocita+del+vento+al+mozzo+(m/s)',
	'Cumulative+distribution' : 'Distribuzione+cumulata',
	'Probability+density' : 'Densita+di+probabilita',
	'Choose a wind turbine' : 'Scelta aerogeneratore',
	'power' : 'potenza',
	'Wind turbine: ' : 'Aerogeneratore: ',
	'Rated power: ' : 'Potenza nominale: ',
	'Rotor diameter: ' : 'Diametro rotore: ',
	'not found' : 'non trovato',
	'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHub height&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' : '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAltezza mozzo&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
	'Height: ' : 'Altezza: ',
	'Annual average wind speed at turbine height (' : 'Velocit&agrave media annua del vento ad altezza mozzo (',
	'Generated+power+(kW)' : 'Potenza+generata+(kW)',
};


function setLingua(lingua) {
	ModCalc.dict = (lingua == 'it') ? ModCalc.dict : undefined
	//console.log(ModCalc.dict);
};


$(function(){
	setLingua(lingua);

	$('#formA').on('submit', function(e) { //use on if jQuery 1.7+
	// alert('formA .submit() called.');
		e.preventDefault();  //prevent form from submitting
	});	
	$('#formB').on('submit', function(e) { //use on if jQuery 1.7+
	// alert('formB .submit() called.');
		e.preventDefault();  //prevent form from submitting
	});	
	
	// $('#formC').on('submit', function(e) { //use on if jQuery 1.7+
	// alert('formC .submit() called.');
		// e.preventDefault();  //prevent form from submitting
	// });	

	
// $('#formA').submit(function() {
    // alert('formA .submit() called.');
// });
// $('#formC').submit(function() {
    // alert('formC .submit() called.');
// });

//	getcurvaGen(15);	

	// var a=1.66, b, x=1;
	
	// b=velCaratt_weibull(7.4,a);	
	
	// console.log('V_weibull=' +  velCaratt_weibull(7.4,a));

	// // console.log('cum_weib=' + (1-cum_weib(x,a,b)))
	// // console.log('dens_weib=' + dens_weib(x,a,b))
	// console.log('cweibull=' + (1-weibull(x,a,b,true)))
	// console.log('dweibull=' + weibull(x,a,b,false))
	
	//DrawCurvaWeib(a,b);

	inizializza();
	//document.getElementById("AWeibull").value=getURLParameter("AWeib");


//pulsanti navigazione ---------------------------------------------------------------------------
//    $(".nav-tabs a").click(function(){
//        $(this).button('loading').delay(500).queue(function() {
//            $(this).button('reset');
//            $(this).dequeue();
//        });        
//    });
	
	$( '[data-trigger="tab"]' ).click( function( e ) {
		var href = $( this ).attr( 'href' );
		e.preventDefault();
		$( '[data-toggle="tab"][href="' + href + '"]' ).trigger( 'click' );
	} );
//fine pulsanti navigazione ---------------------------------------------------------------------------

//combo ---------------------------------------------------------------------------
	var macp = [], macg = []; macall =[]; 		
	
	$.getJSON(bootstrapserv + "/getm2.php",function(result){

		//alert(result[1][1]);
		macp=result[0];
		macg=result[1];
		//macall=macp.concat(macg);
		
		 // console.log("a:" + result.length);
		 // console.log("0:" + result[0].length);
		 // console.log("1:" + result[1].length);
		 // console.log("e0:" + result[0][0]);
		 // var aa=result[0][0]
		 // console.log("e1:" + aa);
		 
		 // console.log("f0:" + result[1][0]);
		 // console.log("f1:" + result[1][1]);
		
		var testo =	'';
		testo +='<a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#">';
		testo +=	__('Choose a wind turbine') + ' <span class="caret"></span>';
		testo +='</a>';
		testo +='<ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">';	
//macp		
		testo +=	'<li class="dropdown-submenu">';
		testo +=		'<a tabindex="-1" href="#">' + __('power') + ' < 1000kW</a>';
		testo +=		'<ul class="dropdown-menu">';
		$.each(macp, function(i, field){
			var card 
			if ((i % 2) == 0) {
				testo +=  '<li class="dropdown-submenu">';
				testo +=    '<a href="#">' + field + '</a>';
				testo +=    '<ul class="dropdown-menu">';
//				console.log("i:" + i + "  field:" + field);
			} else {
				card = macp[i].length
				macall=macall.concat(field)
				$.each(field, function(j, item){
					testo +='<li><a id="opzio' + item[0] + '" href="#" >' + item[1] + '</a></li>';
//					console.log("j:" + j + "card:" +  + card + "  item:" + item);
					if (j==(card-1)) {
						testo +=  '</ul>';
						testo +='</li>';
					}
				});
			}
		});
		testo +=  '</ul>';
		testo +='</li>';
		
//macg		
		testo +=	'<li class="dropdown-submenu">';
		testo +=		'<a tabindex="-1" href="#">' + __('power') + ' > 1000kW</a>';
		testo +=		'<ul class="dropdown-menu">';
		$.each(macg, function(i, field){
			var card 
			if ((i % 2) == 0) {
				testo +=  '<li class="dropdown-submenu">';
				testo +=    '<a href="#">' + field + '</a>';
				testo +=    '<ul class="dropdown-menu">';
//				console.log("i:" + i + "  field:" + field);
			} else {
				card = macg[i].length
				macall=macall.concat(field)
				$.each(field, function(j, item){
					testo +='<li><a id="opzio' + item[0] + '" href="#" >' + item[1] + '</a></li>';
//					console.log("j:" + j + "card:" +  + card + "  item:" + item);
					if (j==(card-1)) {
						testo +=  '</ul>';
						testo +='</li>';
					}
				});
			}
		});
		testo +=  '</ul>';
		testo +='</li>';

		testo +='</ul>';
//		console.log(testo)
	
		$("#combomacchine").html(testo);
		
//		console.log("macall.length:" + macall.length);
//		console.log(macall[0][0]);
		
		$("[id^=opzio]").click(function(){
			var str = this.id
//			console.log(str);
			idmac = str.substring(5); 

			var found=-1;  
			for (i = 0; i < macall.length; i++) {
				if (idmac == macall[i][0]) {
					found = Number(i);
				}
			}
//			console.log(found);
			indmac = found;
			if (found >= 0) {
				// $("#Aerog").html("Aerogeneratore: " + macall[found][1]);
				// $("#PotNom").html("Potenza nominale: " + macall[found][3] + " kW");
				// $("#DiamRot").html("Diametro: " + macall[found][4] + " m");
				passo = macall[found][11];
				aerog_pot = Number(macall[found][3]);
				aerog_diam = Number(macall[found][4]);
				aerog_name = macall[found][1];
				aerog_name = aerog_name.replace(/\./g," ");
				var strAerog = __('Wind turbine: ') + aerog_name;
				strAerog = strAerog + "&nbsp&nbsp&nbsp&nbsp" + __('Rated power: ') + aerog_pot + " kW";
				strAerog = strAerog + "&nbsp&nbsp&nbsp&nbsp" + __('Rotor diameter: ') + macall[found][4] + " m"; // passo: " + passo;
				$("#labAerog").html(strAerog);
				$("#labHaerog").html("");
				$("#labVelMedAnnAtl").html(__('Select hub height')); //tab C
				$("#lrAerogeneratore").html(aerog_name);//tab D riepilogo
				$("#lrPotNom").html(aerog_pot + " kW");
				$("#lrDiamRot").html( macall[found][4] + " m");
				$("#lrhaerog").html("");
				$("#secFAerogeneratore").html(aerog_name);//tab F
				
				cboAltGen(found);
				calcPot();
				getcurvaGen(idmac,passo);
			} else {
				alert(__('not found'));
			}
		}); 
	});
//fine combo ---------------------------------------------------------------------------

	function cboAltGen(id) {
	//	console.log('indmac:' + indmac);
	//	console.log('id:' + id);
		var t =	'', str;
		t +='<a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#">';
		t += __('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHub height&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp') + ' <span class="caret"></span>';
		t +='</a>';
		t +='<ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">';	
		var r = macall[id];
		// console.log('r:' + r);

		for (i = 5; i <= 10; i++) {
			if (r[i] !== null) {
				// console.log('i=' + i +' ' + r[i] + '\n');
				t +='<li><a id="hgene' + (i-5) + '" href="#">' + r[i] + ' m </a></li>'
			}
		}
		t +='</ul>';
		// console.log(t);
		$("#comboHaerog").html(t);
		
		
		$("[id^=hgene]").click(function(){
      str=this.id;
			idh=str.substring(5); 
			var strlab = __('Height: ') + r[5 + Number(idh)] + " m";
			aerog_hmozzo = r[5 + Number(idh)];
			$("#labHaerog").html(strlab);
			$("#lrhaerog").html(r[5 + Number(idh)] + " m");	//tab D riepilogo
			str = __('Annual average wind speed at turbine height (') + r[5 + Number(idh)] + " m) [m/s]:"
			$("#labVelMedAnnua").html(str);
			
			var Vinterp = Interpola(r[5 + Number(idh)],VelMed);
      var KWeib = SelKweib(aerog_hmozzo,KWe.slice(),ModCalc.onShore);
      console.log("Vinterp="+Vinterp+" KWeib="+KWeib);

			document.getElementById("VelMedAnnua").value = Vinterp.toFixed(2);
			$("#lrVelMedAnnua").html(Vinterp.toFixed(2) + " m/s");		//tab D
			str = __('Atlas value : ') + Vinterp.toFixed(2) + " m/s";
			$("#labVelMedAnnAtl").html(str);                          //tab C

      document.getElementById("KWeibull").value = KWeib;

			setvcarweib();
			scriviTabEF();
		}); 	
	};

	
	function getcurvaGen(id,passo) {
	//estrae la curva dal Dbase e la plotta
		var url = bootstrapserv + "/getcurva.php?id=" + id;
		//console.log(macall[indmac]);
		$.getJSON(url,function(result){
			var lu = result.length
			//console.log("lu="+lu);
			var Velnom = new Array(lu);
			var Potnom = new Array(lu);
			var Velcp = new Array(lu);
			var Potcp = new Array(lu);
			// console.log('DensitaSito= '+DensitaSito+ '    passo ='+ passo);	
			for (i = 0; i < lu; i++) {
				Velnom[i] = Number(result[i][0]);
				Potnom[i] = Number(result[i][1]);
			}
			if (passo == 't') {  //aerogeneratori a variazione di passo
				var rappdens = DensitaSlm / DensitaSito
				for (i = 0; i < lu; i++) {
					Potcp[i] = Potnom[i];
					Velcp[i] = Velnom[i] * Math.pow(rappdens,(1/3))
				}
				PotAgen[0] = 0;		VelAgen[0] = Velnom[0];
				for (i = 1; i < lu; i++) {
					VelAgen[i] = Velnom[i];
					PotAgen[i] = ((Potnom[i] - Potnom[i-1]) / (Velcp[i] - Velcp[i-1]) * (Velnom[i] - Velcp[i-1])) + Potnom[i-1];
				}			
			} else {		//aerogeneratori con regolazione a stallo
				for (i = 0; i < lu; i++) {
					VelAgen[i] = Velnom[i];
					PotAgen[i] = Potnom[i] * DensitaSito / DensitaSlm;  
				}
			}

			// for (i = 0; i < lu; i++) {
				// console.log("Vnom" + Velnom[i] + "  Pnom" + Potnom[i] + "  Vcp" + Velcp[i] + "  Pcp" + Potcp[i] + "  V" + VelAgen[i] + "  P" + PotAgen[i] + "  P" + PotAgen[i].toFixed(1) )
			// }			
			
			
			var XLabels, Vals, titolo;
			Vals = "&Vals=0!";
			XLabels = "&XLabels=0;";
			for (i = 0; i < lu-1; i++) {
				XLabels = XLabels + VelAgen[i] + ";";
				valore = PotAgen[i];
				if (valore < 0) {valore = 0;};
				Vals = Vals + PotAgen[i] + "!";
			}	
			XLabels = XLabels + result[lu-1][0] + " ";
			Vals = Vals + result[lu-1][1];	
			titolo = macall[indmac][1];	
			titolo = titolo.replace(/ /g,"+");	
			titolo = titolo.replace(/\./g,"+");
			titolo += "+(" + macall[indmac][3] + "kW++diam." + macall[indmac][4] + "m++dens." + DensitaSito.toFixed(2) + "kg/m3)";
						
			var gra = graserv + "?Type=Line&W=600&H=400&NumSets=1&NumPts=" + (lu+1);

			// gra = gra + "&Title=Curva+di+Potenza+del+sito+(dens=" + DensitaSito.toFixed(3) + "+kg/m3)";
			gra = gra + "&Title=" + titolo;
			gra = gra + "&XTitle=" + __('Wind+speed+at+hub+height+(m/s)') + "&YTitle=" + __('Generated+power+(kW)') + "&XLabelFont=M";
			gra = gra + Vals + XLabels;
			//console.log(gra);
			$("#curpot").html("<img id='theImg' src=" + gra + "/>");
			$("#lrcurpot").html("<img id='theImg' src=" + gra + "/>");
		});
	};
});


