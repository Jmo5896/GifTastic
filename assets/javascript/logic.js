$(document).ready(function() {

function populateButtons() {
    var buttonsDiv = $('<div>');
    buttonsDiv.addClass('row');
    for (var i = 0; i < topics.length; i++) {
        buttonsDiv.append(getButton(topics[i]));
    }
   
    $('#buttons').html(buttonsDiv);
}

function getButton(topic) {
    var button = $('<button>');
    var buttonDiv = $('<div>');

    button.addClass('topic-button btn-success rounded');
    button.attr('data-topic', topic);
    button.text(topic);

    buttonDiv.append(button);
    
    return buttonDiv;
}

$('#buttons').on('click', '.topic-button', function() {
    
    $('#gifsGoHere').empty();

        var apiKey = config.MY_KEY;
    var chosenTopic = $(this).data('topic'); 
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + chosenTopic + '&api_key=' + apiKey + '&limit=12'; //for github pages switched http to https

    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
                
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $('<div>');
            var ratingsInP = $('<h6>').text('Rating: ' + response.data[i].rating);
            var gifImage = $('<img>');
                        
            gifImage.attr('src', response.data[i].images.fixed_height_still.url);
            gifImage.attr('data-still', response.data[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', response.data[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');
            gifImage.addClass('displayedGif rounded');

            gifDiv.append(ratingsInP);
            gifDiv.append(gifImage);

            $('#gifsGoHere').append(gifDiv);

        }
    });

});

$('form').on('submit', function(event) {
    
    event.preventDefault();
    
    var userInput = $(this).children('input').val().trim();
    
    if (!topics.includes(userInput)) {
        topics.push(userInput);
        populateButtons();
    }
   
    $(this).children('input').val('');

});

$('#gifsGoHere').on('click', '.displayedGif', function() {
    var stateOfGif = $(this).attr("data-state"); //still or not

    if (stateOfGif === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

var topics = ['funny', 'fail', 'cats'];
populateButtons();

});