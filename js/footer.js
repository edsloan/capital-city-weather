function getWeather() {

	var scale = $('#scales button'),
		farenheit = $('#farenheit'),
		getCity = $('[class*="city"]');

	scale.on('click', function() {
		var self = $(this);

		self.siblings().removeClass('selected').attr('disabled', false);
		self.addClass('selected').attr('disabled', true);
		getWeather();
	});

	if (farenheit.hasClass('selected')) {
		var unit = "&units=imperial";
	} else {
		var unit = "&units=metric";
	}

	getCity.each(function() {
		var self = $(this),
			city = self.attr('class').split(' ')[2],
			cityTemp = $('#temp-' + city),
			cityIcon = $('#icon-' + city);

		$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + unit, function(json) {
			var weather = Math.round(json.main.temp),
				icon = (json.weather[0].icon);

			cityTemp.text(weather);
			cityIcon.addClass(icon);
		});
	});
}
setInterval(getWeather, 900000);
getWeather();

function pinToTop() {
	var pinLink = $('.pin-link'),
		pin = $('#pin'),
		pinned = 'pinned';

	pinLink.each(function() {
		var self = $(this);

		self.on('click', function(e) {
			e.preventDefault();

			var continent = self.attr('class').split(' ')[0];

			if (self.hasClass(pinned)) {
				self.prependTo('#' + continent).removeClass(pinned);
			} else {
				self.prependTo(pin).addClass(pinned);
			}
		});
	});
}
pinToTop();