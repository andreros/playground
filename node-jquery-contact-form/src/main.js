/**
 * file: main.js
 * description: Form main control file.
 * author: André Rosa
 */

// Immediately Invoked Function Expression
(function ($) {
	'use strict';

	/***************************************************************************************************************************************/
	/* Inputs validation object
	/***************************************************************************************************************************************/
	var inputs = {
		validate: function (input) {
			var value = $(input).val().trim();
			if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
				if (value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
					return false;
				}
			}
			if (value == '' || parseInt(value) == -1) {
				return false;
			}
			return true;
		},
		showAlert: function (input) {
			$(input).parent().addClass('alert-validate');
		},
		hideAlert: function (input) {
			$(input).parent().removeClass('alert-validate');
		}
	}

	/***************************************************************************************************************************************/
	/* Select 2 Init
	/***************************************************************************************************************************************/
	$('.js-select2').each(function() {
		$(this)
		.select2({
			minimumResultsForSearch: 20,
			dropdownParent: $(this).next('.dropDownSelect2')
		})
		.on('select2:open', function (e) {
			$(this).parent().next().addClass('eff-focus-selection');
		})
		.on('select2:close', function (e) {
			$(this).parent().next().removeClass('eff-focus-selection');
			if (inputs.validate(this)) { inputs.hideAlert(this); }
		});
	});


	/***************************************************************************************************************************************/
	/* Validate form
	/***************************************************************************************************************************************/
    $('.contact100-form-btn').on('click', function() {
		var isFormValid = true;

		$('.validate-form .input100').each(function(index, htmlEl) {
            if (!inputs.validate(htmlEl)) {
                inputs.showAlert(htmlEl);
                isFormValid = false;
            } else {
				inputs.hideAlert(htmlEl);
			}
			$(htmlEl).focus(function() {
				inputs.hideAlert(htmlEl);
			});
		});

		if (isFormValid) {
			$('.contact100-form-btn-spinner').removeClass('dis-none');

			// access document form (the only one, index 0)
			var form = document.forms[0],
				formData = new FormData(form);

			//jQuery AJAX request
			//https://api.jquery.com/jquery.ajax/
			$.ajax({
				url: 'http://localhost:5000/api/v1/sendmail/',
				type: 'POST',
				data: formData,
				processData: false,  // tell jQuery not to process the data
				contentType: false,  // tell jQuery not to set contentType
				success: function(data) {
					console.log('Success');
					console.log('  data:', data);
					$('.contact100-form-btn-spinner').addClass('dis-none');
				},
				error: function(request, textStatus, errorThrown) {
					console.log('Error');
					console.info('  request: ', request);
					console.info('  textStatus: ', textStatus);
					console.info('  errorThrown: ', errorThrown);
					// just a reminder ;)
					console.log('Send API not reachable.');
					$('.contact100-form-btn-spinner').addClass('dis-none');
				}

			});
		}
    });
})(jQuery);
