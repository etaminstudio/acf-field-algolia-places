(function($){


	function initialize_field( $el ) {

    var $hiddenField = $el.find('input[type=hidden]');
    var $searchField = $el.find('input[type=search]');

    try {
      var data = JSON.parse($hiddenField.val());
    } catch (e) {
      var data = {value: ''};
    }

    $searchField.val(data.value);

    var placesAutocomplete = places({
      container: $searchField[0]
    });

    placesAutocomplete.on('change', function(e){
      var s = e.suggestion;

      // https://community.algolia.com/places/documentation.html#suggestions
      var json = {
        type: s.type,
        name: s.name,
        city: s.city,
        country: s.country,
        countryCode: s.countryCode,
        administrative: s.administrative,
        latlng: s.latlng,
        postcode: s.postcode,
        value: s.value
      };
      $hiddenField.val(JSON.stringify(json));
    });

	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			// search $el for fields of type 'algolia_places'
			acf.get_fields({ type : 'algolia_places'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="algolia_places"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
