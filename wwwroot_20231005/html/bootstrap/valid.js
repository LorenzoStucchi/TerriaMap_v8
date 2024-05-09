$(function(){
//validazione -------------------------------------------------------------------
//formA -------------------------------------------------------------------------
    // $('div').find('#formA').validate({
	$('#formA').validate({
    rules: {
      NomeProg: {
        minlength: 3,
        maxlength: 15,
        required: true
      }
    },
    messages: {
      NomeProg: __('Insert project name'),
    },		 
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
    });

	
	$("#NomeProg").change(function(){
		$("#lrNomeProg").html(this.value);
		$("#secENomeProg").html(this.value);
		$("#secFNomeProg").html(this.value);
	});
	
	
//formB -------------------------------------------------------------------------
    // $('div').find('#formB').validate({
	$('#formB').validate({
    rules: {
      NumAgen: {
        digits: true,
        min: 1,
        required: true
      }
    },
    messages: {
      NumAgen: {
        digits: jQuery.validator.format(__('only integer values')),
        min: __('Insert a value greater than 0'),
        required: __('Insert the number of wind turbines units of the wind farm'),
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
    });
	
	$("#NumAgen").change(function(){
		console.log("#NumAgen ="+ document.getElementById("NumAgen").value);
		scriviTabEF();
	});	
	
	
//formC -------------------------------------------------------------------------
    //$('div').find('#formC').validate({
	$('#formC').validate({
    rules: {
      VelMedAnnua: {
        number: true,
        min: 0,
        required: true
      },
      KWeibull: {
        number: true,
        min: 0.5,
        max: 4,
        required: true
      }
    },
    messages: {
      VelMedAnnua: {
        min: __('Insert a value greater than 0'),
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Insert the annual average wind speed [m/s]'),
      },
      KWeibull: {
        min: __('Insert a value greater than 0.5'),
        max: __('Insert a value lower than 4'),
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Insert the shape factor (k) of Weibull distribution'),
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
    });

	$("#VelMedAnnua").change(function(){
		console.log("#VelMedAnnua " + this.value);
		var cVMA = $('#VelMedAnnua');
		var cKW = $('#KWeibull');	

		if (cKW.valid() & cVMA.valid()) {
			setvcarweib();
			$("#lrVelMedAnnua").html(this.value);//tab D
			scriviTabEF();
		};
	});

	$("#KWeibull").change(function(){
		console.log("#KWeibull " + this.value);
		var cVMA = $('#VelMedAnnua');
		var cKW = $('#KWeibull');	

		if (cKW.valid() & cVMA.valid()) {
			setvcarweib();
			$("#lrKWeibull").html(this.value);//tab D
			scriviTabEF();
		};
	});
	
//formE -------------------------------------------------------------------------
    // $('div').find('#formE').validate({
	$('#formE').validate({
    rules: {
      secEAnnoAvvio: {
        digits: true,
        min: 1960,
        required: true
      },
      secECostoCapitSpec: {
        digits: true,
        range: [0, 1000000],
        required: true
      },
      secEDistcab: {
        number: true,
        range: [0, 1000000],
        required: true
      },
      secECostoKmCollegamento: {
        digits: true,
        range: [0, 1000000],
        required: true
      },
      secECostoInfrastrElett: {
        digits: true,
        range: [0, 1000000],
        required: true
      },
      secECostiFissiOM: {
        number: true,
        range: [0, 100],
        required: true
      },
      secECostiVariabiliOM: {
        digits: true,
        range: [0, 1000000],
        required: true
      },
      secEOneriAnnuiRicavi: {
        number: true,
        range: [0, 100],
        required: true
      },
      secEOneriAnnuiFissi: {
        digits: true,
        range: [0, 1000000],
        required: true
      }
    },
    messages: {
      secEAnnoAvvio: {
        digits: jQuery.validator.format(__('only integer values')),
        required: __('Insert the starting year of the wind farm project'),
        min: __('Insert a value greater than 1960')
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
    });

		
	$("#secEAnnoAvvio").change(function(){
		var secEAnnoAvvio = Number(document.getElementById("secEAnnoAvvio").value);
		$("#secEAnnoRealiz").html(secEAnnoAvvio + 1);
	});
	
	$("#secECostoCapitSpec").change(function(){
		scriviTabEF();
	});
	
	$("#secEDistcab").change(function(){
		scriviTabEF();
	});
	
	$("#secECostoKmCollegamento").change(function(){
		scriviTabEF();
	});
	
	$("#secECostoInfrastrElett").change(function(){
		scriviTabEF();
	});
	
	$("#secECostiFissiOM").change(function(){
		scriviTabEF();
	});
	
	$("#secECostiVariabiliOM").change(function(){
		scriviTabEF();
	});
	
	$("#secEOneriAnnuiRicavi").change(function(){
		scriviTabEF();
	});
	
	$("#secEOneriAnnuiFissi").change(function(){
		scriviTabEF();
	});
	
//formF -------------------------------------------------------------------------
    // $('div').find('#formF').validate({
	$('#formF').validate({
    rules: {
      secFPercPotGarantita: {
        number: true,
        range: [0, 100],
        required: true
      },
      secFDispAnnua: {
        number: true,
        range: [0, 100],
        required: true
      },
      secFPerditeAerodin: {
        number: true,
        range: [0, 100],
        required: true
      },
      secFPerditeElettr: {
        number: true,
        range: [0, 100],
        required: true
      },
      secFDispAnnReteEl: {
        number: true,
        range: [0, 100],
        required: true
      },
      secFTassoAtt: {
        number: true,
        range: [0, 100],
        required: true
      },
    },
    messages: {
      secFPercPotGarantita: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      },
      secFDispAnnua: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      },
      secFPerditeAerodin: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      },
      secFPerditeElettr: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      },
      secFDispAnnReteEl: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      },
      secFTassoAtt: {
        number: jQuery.validator.format(__('Only numerical values')),
        required: __('Enter a numerical value'),
      }
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
    });

	$("#secFPercPotGarantita").change(function(){
		scriviTabEF();
	});

	$("#secFDispAnnua").change(function(){
		scriviTabEF();
	});

	$("#secFPerditeAerodin").change(function(){
		scriviTabEF();
	});

	$("#secFPerditeElettr").change(function(){
		scriviTabEF();
	});

	$("#secFDispAnnReteEl").change(function(){
		scriviTabEF();
	});

	$("#secFTassoAtt").change(function(){
		scriviTabEF();
	});

	

//fine validazione ---------------------------------------------------------------------------
});
