requirejs.config({
	baseUrl: 'js',
	urlArgs: 'time=' + (new Date()).getTime(), // Bypass cache for development
	paths: {
		underscore: 'lib/underscore-1.5.2/underscore-min',
		backbone:   'lib/backbone-1.1.0/backbone-min',
		jquery:     'lib/jquery-1.10.2/jquery-1.10.2.min',
		leaflet:    'lib/leaflet-0.8-dev/leaflet',
		jspdf:      'lib/jspdf-0.9.0/jspdf.source',
		text:       'lib/text-2.0.10/text',
		css:        'lib/require-css-0.1.0/css',
		template:   '../template',
	},
	shim: {
		jquery: {
			exports: '$',
		},
		underscore: {
			exports: '_',
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',
		},
		jspdf: {
			exports: 'jsPDF',
		}
	}
});

require(['underscore', 'jquery', 'view/map', 'model/print'],
	function(_, $, Map, Print) {

	// Create map and print model
	var map = new Map();
	var print = new Print({ element: $('#map') });

	// Move this to print later on,
	// Pass instance into constructor
	function resize() {
		print.fit();
		map.map.invalidateSize();
	}
	resize();
	$(window).resize(resize);

	// Initiate printing
	$('#button').click(print.generate);
});
