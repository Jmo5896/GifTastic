$(document).ready(function() {
    
// Try using a loop that appends a button for each string in the array.


// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).


// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
// Deploy your assignment to Github Pages.


function populateButtons() {
    var buttonsDiv = $('<div>');
    for (var i = 0; i < topics.length; i++) {
        buttonsDiv.append(getButton(topics[i]));
    }
    $('#buttons').html(buttonsDiv);
}

function getButton(topic) {
    var button = $('<button>');
    button.addClass('topic-button');
    button.attr('value', topic);
    button.attr('data-topic', topic);
    button.text(topic);
    return button;
}

$('#buttons').on('click', '.topic-button', function() {
    //gify population
    $('#gifsGoHere').empty();

    var apiKey = 'Xmjj3tQNWDaq5vc3DK3xgquSrhGcMVdY';
    var chosenTopic = $(this).val();
    
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + chosenTopic + '&api_key=' + apiKey + '&limit=10';

    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
        console.log(response);
        
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $('<div>');
            var ratingsInP = $('<p>').text('Rating: ' + response.data[i].rating);
            var gifImage = $('<img>');

            gifImage.attr('src', response.data[i].images.fixed_height.url);
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

var topics = ['funny', 'fail', 'cats'];
populateButtons();

//giphy api anjax stuff




});