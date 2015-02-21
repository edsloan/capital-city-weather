function getWeather () {

	var scale = $('#scales button'),
		farenheit = $('#farenheit'),
		matchCity = $('[class*="city"]');

	scale.on('click', function (){
		$(this).siblings().removeClass('selected').attr('disabled', false);
		$(this).addClass('selected').attr('disabled', true);
		getWeather();
	});

	if (farenheit.hasClass('selected')) {
		var unit = "&units=imperial";
	} else {
		var unit = "&units=metric";
	}

	matchCity.each(function(index, value){
		var getCity = $(this).attr('class').split(/\s/),
			city = getCity[getCity.length -1];

		$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + unit, function(json) {
			var weather = Math.round(json.main.temp),
				icon = (json.weather[0].icon);

			$('#temp-' + city).text(weather);
			$('#icon-' + city).addClass(icon);
		});
	});
}
setInterval(getWeather, 900000);
getWeather();

function pinToTop () {
	var pinLink = $('.pin-link'),
		pin = $('#pin'),
		pinned = 'pinned',
		cities = $('.cities');

	pinLink.each(function() {
		var self = $(this),
			findParent = self.parent();

		self.on('click', function(e){
			e.preventDefault();

			if (findParent.hasClass(pinned)) {
				findParent.prependTo(cities).removeClass(pinned);
			} else {
				findParent.prependTo(pin).addClass(pinned);
			}
		});
	});
}
pinToTop();