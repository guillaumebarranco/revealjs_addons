var socket = io('http://localhost:3000');

socket.on('connect', function() {

	Reveal.addEventListener('slidechanged', function(event) {
		// event.previousSlide, event.currentSlide, event.indexh, event.indexv
		socket.emit('slide', {
			indexh: event.indexh,
			indexv: event.indexv
		});
	});

	socket.on('slide', function(data) {
		Reveal.slide(data.indexh, data.indexv);
	});
});
