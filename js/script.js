
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl +'">');

    // NYTimes AJAX request goes here
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=1cad5a3e1d8ca427013b47aa6305852f:0:72435225';

    $.getJSON(nytimesUrl,function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        var articles = data.response.docs;
        for(var i=1,len=articles.length;i<len;i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>' + '<p>' + article.snippet + '</p>'+'</li>');
        }
    }).error(function() { $nytHeaderElem.text('New York Times Articles Could Not Be Loaded')});

    return false;
};

$('#form-container').submit(loadData);

