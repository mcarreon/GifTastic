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
]

var appCtrl = {
    fill: function () {
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
}

$(document).ready(function () {
    appCtrl.fill();
});


//ajax snippet
var queryParams = {
    "api_key": "OYJEVAFS1M734Eb58kq2f8hBFVMJX6Yj"
}
 
var queryURL = "https://api.giphy.com/v1/gifs/search?" + $.param(queryParams);
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
      console.log(response);
  });