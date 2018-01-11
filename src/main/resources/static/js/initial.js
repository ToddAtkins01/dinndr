$(document).ready(function() {
	disliked.style.display = 'none';
	liked.style.display = 'none';
});

var start = document.querySelector('.start');
start.onclick = function() {
	
	$.ajax({
		url : 'http://localhost:8080/dishes/next',
		method : 'GET'
	}).done(function(dish) {
		$('#dishImage').html('<img src="' + dish.image + '">');
		$('.disliked').attr('data-dishid', dish.id);
		$('.liked').attr('data-dishid', dish.id);
		$('.getMapInfo').attr('data-longitude', dish.restaurant.longitude)
		$('.getMapInfo').attr('data-latitude', dish.restaurant.latitude)
		$('#name').html(dish.name)
		$('#description').html(dish.description)
		$('#price').html(dish.price)
		$('#restaurantName').html(dish.restaurant.name)
		$('#address').html(dish.restaurant.address)
		$('#phoneNumber').html(dish.restaurant.phoneNumber)
		$('#hours').html('Hours: ' + dish.restaurant.hours)
		$('#website').html(dish.restaurant.website)
		$('#delivery').html('Delivery? ' + dish.restaurant.delivery)
		start.style.display = 'none';
		disliked.style.display = 'inline';
		liked.style.display = 'inline';
	}).done(myMap);
};