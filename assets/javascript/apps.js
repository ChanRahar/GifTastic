var topics = ["Samurai Champloo", "Bleach", "Naruto", "My Hero Academia", "Death Note", "Cowboy Bebop", "Code Geass", "Durarara","Dragon Ball", "Stein Gate", "One Piece"];


$(document).ready(function(){
	createButton();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#anime-entry").val().trim());
		$("#anime-entry").val("");
	});
});

function createButton () {
    for (var i = 0; i < topics.length; i++){
        var button = $("<button>");
		button.text(topics[i]);
		button.attr("class","btn btn-primary")
        button.attr("class","animeButton");
        button.appendTo($(".buttonDiv"));
    }
    $(".animeButton").on("click", function(){
        $("#gif-display").empty();
        gifCreator($(this).text());
	});
}

function addButton(name){
	if(topics.indexOf(name) === -1) {
		topics.push(name);
		$(".buttonDiv").empty();
		createButton();
	}
}

function gifCreator(title){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + title + 
		"&api_key=sZAjuwSvLVGBcGtaCvmg7xHNeGu5Oe7v&limit=10",
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			gifDiv = $("<div>");
			var gif = $("<img src =" + element.images.fixed_height_still.url + ">");
			gif.addClass("move-gif");
			gif.attr("state", "still");
			gif.attr("still-img", element.images.fixed_height_still.url);
			gif.attr("animated-img", element.images.fixed_height.url);
            gifDiv.append(gif);
            gifDiv.append("<p class = 'ratingImg'>Rating: " + element.rating.toUpperCase() + "</p>");
			$("#gif-display").append(gifDiv);
		});
		

		$(".move-gif").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-img"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-img"));
			}
		});
	});
}



