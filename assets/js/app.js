var $buttonArea = $('#button-area');
var topicList = [
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

        for (var i = 0; i < topicList.length; i++) {
            var button = $('<button>');
            button.attr('class', 'result-buttons');
            button.attr('search-data', `${topicList[i]}`);
            button.text(`${topicList[i]}`);    
            buttonPack.append(button);
        }
        $buttonArea.append(buttonPack);
    },
    fillPast: function () {  
    }
}

$(document).ready(function () {
    appCtrl.fillButtons();
});

$(document).on('click', ".result-buttons", function () {
    var queryParams = { "api_key": "OYJEVAFS1M734Eb58kq2f8hBFVMJX6Yj" };
    queryParams.q = $(this).attr('search-data'); 


    var queryURL = "https://api.giphy.com/v1/gifs/search?" + $.param(queryParams);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
          console.log(response);
      });
});

$('#search-button').on('click', function (event) {
    //doesn't work?!
    event.preventDefault();

    var searchItem = $('#search-entry').val().trim(); 
    pastResults.push(searchItem);
    
    if (searchItem != '') {
        var queryParams = { "api_key": "OYJEVAFS1M734Eb58kq2f8hBFVMJX6Yj" };
        queryParams.q = searchItem; 
    
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + $.param(queryParams);
        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
              console.log(response);
          });
    }

    $('#search-entry').val('');
});


//ajax snippet

 



