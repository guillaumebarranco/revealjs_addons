var socket = io('http://localhost:3000');

socket.on('connect', function() {

	Reveal.addEventListener('slidechanged', function(event) {
		// event.previousSlide, event.currentSlide, event.indexh, event.indexv
		socket.emit('slide', {
			indexh: event.indexh,
			indexv: event.indexv
		});
	});

	$('a[data-lightbox]').on('click', function() {
		console.log('ouiok');
		socket.emit('lightbox', $(this).attr('href'));
	});

	$('#lightbox .lb-close').on('click', function() {
		socket.emit('close_lightbox');
	});

	socket.on('close_lightbox', function() {
		$('#lightbox .lb-close').click();
	});

	socket.on('lightbox', function(data) {

		if($('#lightboxOverlay').css('display') === 'none') {
			console.log('received', data);
			$('a[href="'+data+'"]').click();
		}
	});

	socket.on('slide', function(data) {
		Reveal.slide(data.indexh, data.indexv);
	});
});
