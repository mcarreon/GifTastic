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
        var returnedItems = array;

        var imgPack = $('<div>');

        for (var i = 0; i < returnedItems.length; i++) {
            var imgCard = $('<div>');
            var textPack = $('<div>');
            
            var textRating = $('<div>');
            textRating.text(`Rating: ${returnedItems[i].rating}`);
            var textName = $('<div>');
            textName.text(returnedItems[i].title);
            var textDate = $('<div>');
            textDate.text(`Date Uploaded: ${returnedItems[i].import_datetime}`);
            if (returnedItems[i].username != "") {
                var textUser = $('<div>');
                textUser.text(`Uploaded By: ${returnedItems[i].username}`);
            }
                  
            var img = $('<img>');
            img.attr({
                'class': 'gif-image',
                'data-animate': returnedItems[i].images.original.url,
                'data-still': returnedItems[i].images.original_still.url,
                'data-state': 'still',
                'src': returnedItems[i].images.original_still.url
            });
            
            textPack.append(textRating);
            textPack.append(textName);
            textPack.append(textDate);
            textPack.append(textUser);
            imgCard.append(img);
            imgCard.append(textPack);
            imgPack.append(imgCard);
        }    
        $resultsArea.append(imgPack);
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
        appCtrl.fillResults(returnedItems);
    });

});

  $('#search-button').on('click', function (event) {
    //doesn't work?!
    event.preventDefault();

    appCtrl.clearResults();

    var searchItem = $('#search-entry').val().trim(); 
    var returnedItems = [];
    topics.push(searchItem);
    appCtrl.fillButtons();
    
    if (searchItem != '') {          
        $.ajax({
            url: appCtrl.buildUrl(searchItem),
            method: "GET"
          }).then(function (response) {
            returnedItems = response.data;
            console.log(response);
            console.log(returnedItems);
            appCtrl.fillResults(returnedItems);
          });
    }

    $('#search-entry').val('');
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



 



