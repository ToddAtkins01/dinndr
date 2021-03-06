var showNextDishButton = document.querySelector('.nextdish');
showNextDishButton.style.display = 'none';
var info = document.querySelector('.info');
var next = document.querySelector('.next');

var liked = document.querySelector('.liked');
var myRestaurant;
liked.onclick = function() {
	var hideDislikeButton = document.querySelector('.disliked');
	if (info.style.display === 'none') {
		info.style.display = 'block';
		google.maps.event.trigger(map, 'resize');
		map.setCenter(new google.maps.LatLng(myRestaurant));
		hideDislikeButton.style.display = 'none';
		showNextDishButton.style.display = 'inline';
		liked.style.display = 'none';
	} else {
		info.style.display = 'none';
	}

	var likedId = parseFloat(liked.dataset.dishid);
	$.ajax({
		url : 'http://localhost:8080/dishes/' + likedId + '/liked',
		method : 'PUT'
	});
};

var populateDish = function(dish) {
	$('#dishImage').html('<img src="' + dish.image + '">');
	$('.disliked').attr('data-dishid', dish.id);
	$('.liked').attr('data-dishid', dish.id);
	$('.getMapInfo').attr('data-longitude', dish.restaurant.longitude)
	$('.getMapInfo').attr('data-latitude', dish.restaurant.latitude)
	$('#name').html(dish.name)
	$('#description').html(dish.description)
	$('#price').html(dish.price)
	$('#restaurantName').html('<a href="' + dish.restaurant.website + '" target="_blank">' + dish.restaurant.name + '</a>')
	$('#address').html(dish.restaurant.address)
	$('#phoneNumber').html('<a href="tel:' + dish.restaurant.phoneNumber + '">' + dish.restaurant.phoneNumber + '</a>');
	$('#hours').html('Hours: ' + dish.restaurant.hours)
	$('#website').html('<a href="' + dish.restaurant.website + '" target="_blank">' + dish.restaurant.name + '</a>');
	$('#delivery').html('Delivery? ' + dish.restaurant.delivery)
};

var showNextDish = function() {
	$.ajax({
		url : 'http://localhost:8080/dishes/next',
		method : 'GET'
	}).done(function(dish) {
		if (dish) {
			populateDish(dish);
		} else {
			$.ajax({
				url : 'http://localhost:8080/dishes/liked/random',
				method : 'GET'
			}).done(populateDish);
			disliked.style.display = 'none';
			liked.style.display = 'none';
			info.style.display = 'block';
			end.style.display = 'block';
		}
	}).done(myMap);

};
var map;
function myMap() {
	var info = document.querySelector('.getMapInfo');
	var myLat = parseFloat(info.dataset.latitude);
	var myLng = parseFloat(info.dataset.longitude);
	myRestaurant = {
		lat : myLat,
		lng : myLng
	};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 15,
		center : myRestaurant
	});
	var marker = new google.maps.Marker({
		position : myRestaurant,
		map : map
	});
};

var disliked = document.querySelector('.disliked');
disliked.onclick = function() {
	if (next.style.display === 'none') {
		next.style.display = 'block';
		info.style.display = 'none';
	} else {
		next.style.display = 'none';
	}
	var disliked = document.querySelector('.disliked');
	var dislikedId = parseFloat(disliked.dataset.dishid);
	$.ajax({
		url : 'http://localhost:8080/dishes/' + dislikedId + '/disliked',
		method : 'PUT'
	}).done(showNextDish);
};

var viewMoreDishesAfterLike = document.querySelector('.nextdish');
viewMoreDishesAfterLike.onclick = function() {
	next.style.display = 'block';
	info.style.display = 'none';
	showNextDish();
	showNextDishButton.style.display = 'none';
	var hideDislikeButton = document.querySelector(".disliked");
	hideDislikeButton.style.display = 'inline';
	liked.style.display = 'inline';
};
