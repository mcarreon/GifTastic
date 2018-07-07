var $buttonArea = $('#button-area');
var $resultsArea = $('#results-area');

var topics = [
    "roses",
    "zebra",
    "game",
    "fish",
    "cats",
    "food",
    "idiots",
    "meow",
    "marlo",
    "chew",
    "tabacco",
    "broccoli",
    "meme",
    "lazy",
    "cactus",
    "space",
    "fight",
    "cars"
];

var pastResults = [];


var appCtrl = {
    fillButtons: function () {
        $buttonArea.empty();
        var buttonPack = $('<div>');
        buttonPack.attr('class', 'button-pack');

        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            button.attr('class', 'result-buttons');
            button.attr('search-data', `${topics[i]}`);
            button.text(`${topics[i]}`);    
            buttonPack.append(button);
        }
        $buttonArea.prepend(buttonPack);
    },
    fillResults: function (array) {
        var resultsList = array;
    },
    fillPast: function () {  
    },
    buildUrl: function (search) {
        var queryParams = { 
            "api_key": "OYJEVAFS1M734Eb58kq2f8hBFVMJX6Yj",
            "limit": 9,
     };
        queryParams.q = search;

        return queryURL = "https://api.giphy.com/v1/gifs/search?" + $.param(queryParams);
    },
    clearResults: function () {
        $resultsArea.empty();
    }
}

$(document).ready(function () {
    appCtrl.fillButtons();
});

$(document).on('click', ".result-buttons", function () {
    appCtrl.clearResults();
    var searchItem = $(this).attr('search-data');
    var returnedItems = []; 

    $.ajax({
        url: appCtrl.buildUrl(searchItem),
        method: "GET"
    }).then(function (response) {
        returnedItems = response.data;
        console.log(response);
        console.log(returnedItems);
        var imgPack = $('<div>');

        for (var i = 0; i < returnedItems.length; i++) {
            var imgCard = $('<div>');
            
            var text = $('<div>');
            text.text(`Rating: ${returnedItems[i].rating}`);
        
            var img = $('<img>');
            img.attr({
                'class': 'gif-image',
                'data-animate': returnedItems[i].images.original.url,
                'data-still': returnedItems[i].images.original_still.url,
                'data-state': 'still',
                'src': returnedItems[i].images.original_still.url
            });

            imgCard.append(text);
            imgCard.append(img);
            imgPack.append(imgCard);
        }
        
        
        $resultsArea.append(imgPack);
    });

});

$(document).on("click", ".gif-image", function() {
    
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

$('#search-button').on('click', function (event) {
    //doesn't work?!
    event.preventDefault();

    var searchItem = $('#search-entry').val().trim(); 
    var returnedItems = [];
    pastResults.push(searchItem);
    
    if (searchItem != '') {
          
        $.ajax({
            url: appCtrl.buildUrl(searchItem),
            method: "GET"
          }).then(function (response) {
            returnedItems = response.data;
            console.log(response);
            console.log(returnedItems);
          });
    }

    $('#search-entry').val('');
});


//ajax snippet

 



