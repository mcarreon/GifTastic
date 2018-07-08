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

var favoritesList = JSON.parse(localStorage.getItem('favorites'));
if (!Array.isArray(favoritesList)) {
    favoritesList = [];
}

var pastResults = [];


var appCtrl = {
    fillButtons: function () {
        $buttonArea.empty();
        var buttonPack = $('<div>');
        buttonPack.attr('class', 'button-pack');

        var favorites = $('<button>');
        favorites.attr({
            'class': 'favorite-buttons btn btn-success btn-sm',
            'search-data': 'favorites',
        });
        favorites.text('Favorites');
        buttonPack.append(favorites);

        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            button.attr('class', 'result-buttons btn btn-outline-primary btn-sm');
            button.attr('search-data', `${topics[i]}`);
            button.text(`${topics[i]}`);    
            buttonPack.append(button);
        }
        $buttonArea.prepend(buttonPack);
    },
    fillResults: function (array) {
        var returnedItems = array;

        var imgPack = $('<div>');
        imgPack.attr('class', 'card-columns mt-2');

        for (var i = 0; i < returnedItems.length; i++) {
            var imgCard = $('<div>');
            imgCard.attr('class', `gif${i} gif-text card bg-dark`);
            var textPack = $('<div>');
            textPack.attr('class', 'card-body p-1')
            
            var textRating = $('<div>');
            textRating.text(`Rating: ${returnedItems[i].rating}`);
            textRating.attr('class', 'rating card-text');
            textRating.attr('data', returnedItems[i].rating);
            var textName = $('<div>');
            textName.text(returnedItems[i].title);
            textName.attr('class', 'name card-text');
            var textDate = $('<div>');
            textDate.text(`Date Uploaded: ${returnedItems[i].import_datetime}`);
            textDate.attr('class', 'date card-text');
            textDate.attr('data', returnedItems[i].import_datetime);
            
            if (returnedItems[i].username != "") {
                var textUser = $('<div>');
                textUser.text(`Uploaded By: ${returnedItems[i].username}`);
                textUser.attr('class', 'username card-text');
                textUser.attr('data', returnedItems[i].username);
            }
                  
            var img = $('<img>');
            img.attr({
                'class': 'gif-image card-img-top',
                'data-animate': returnedItems[i].images.original.url,
                'data-still': returnedItems[i].images.original_still.url,
                'data-state': 'still',
                'src': returnedItems[i].images.original_still.url
            });

            var fav = $('<i>');
            fav.attr({
                'value': `${i}`,
                'class': 'save-favorite-button float-right far fa-star'
        });
            
            textPack.append(textRating);
            textPack.append(textName);
            textPack.append(textDate);
            textPack.append(textUser);

            imgCard.append(img);
            imgCard.append(fav);
            imgCard.append(textPack);
            

            imgPack.append(imgCard);
        }    
        $resultsArea.append(imgPack);
    },
    fillPast: function () {  
    },
    saveFavorite: function (element) {
        var original = { url: $(element).siblings(".gif-image").attr('data-animate') }; 
        var original_still = {  url: $(element).siblings(".gif-image").attr('data-still')}
        
        var rating = $(element).siblings(".card-body").children('.rating').attr('data');
        var title = $(element).siblings(".card-body").children('.name').text();
        var import_datetime = $(element).siblings(".card-body").children('.date').attr('data');
        var username = $(element).siblings(".card-body").children('.username').attr('data');
    
        
    
        console.log(rating);
        console.log(title);
        console.log(import_datetime);
        console.log(username);
        console.log(original);
    
        var favorite = {
            rating: rating,
            title: title,
            import_datetime: import_datetime,
            username: username,
            images: {
                original: original,
                original_still: original_still
            }
        }
    
        console.log(favorite);

        return favorite;
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

    

    var searchItem = $('#search-entry').val().trim(); 
    var returnedItems = [];
    
    
    if (searchItem != '') {     
        appCtrl.clearResults();
        topics.push(searchItem);
        appCtrl.fillButtons();     

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

$(document).on('click', '.favorite-buttons', function () {
    appCtrl.clearResults();
    appCtrl.fillResults(favoritesList);
    $('.save-favorite-button').remove();
});

$(document).on('click', '.save-favorite-button', function () {
    $(this).css({color: '#343a40'});
    favoritesList.push(appCtrl.saveFavorite(this));
    localStorage.clear();
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    console.log(favoritesList);

    
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

$('.clear-fav').on('click', function () {
    localStorage.clear();
    favoritesList = [];
});



 



