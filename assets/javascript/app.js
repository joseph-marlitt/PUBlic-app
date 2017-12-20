// declaring global variables

var state;
var radius;
var options;
var map;
var markers = [];
//array for NAN coordinates on the NPS array
var badMarkers= [];
var mapCenter;

    //Search on-click reveals the map and column with information.
$('#submitButton').on('click', function() {
    //getting variables from state selector input
    var state = $('#state').val().trim();
    markers = [];
    var infoWindow = new google.maps.InfoWindow();
    //Display Map
    $('#map').css({
        'display': 'inline-block',
        'width': '100%',
        'height': '400px',
        'border': 'solid',
        'margin-top': '20px'
        });
    //Ready images for click on icons
    $('#images').css({
        'display': 'inline-block',
        'width': '100%',
        'height': '347px',
        'margin-top': '20px',
        'overflow': 'scroll'
    })
    //animation effects and scroll
    $('html, body').animate({
        scrollTop: $('#searchForm').offset().top
    }, 1000);
    $('#frontPage').css({
        'height': '100%'
    });
    $('#infoWindowHeader').css({
        'color': '#fcbd20;'
    })
    //Search result gets passed through NPS/ API.
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&limit=50%20=&api_key=FnU7EWa9B2RlDnwnu33mMpYJZuWYhXAbYfGxkFh8",
        "method": "GET",
        "headers": {
            "authorization": "Basic Og==",
            "cache-control": "no-cache",
            "postman-token": "509a7a9e-dd99-d214-70d9-793c94ad5033"
        }
    }
    //AJAX response for NPS and Instagram
    $.ajax(settings).done(function(response) {
        console.log(response);
        //pulled variables from National Park Service website
        var results = response.data;
        var latitude
        var longitude
        var locationName
        $.each(results, function(index, value) {
            //finding the latitude and longitude
            var latLong = results[index].latLong
            //Get the location name
            locationName = results[index].fullName;
            // Slice the string to break out latLong into two values.
            latitude = parseFloat(latLong.slice(latLong.indexOf(':') + 1, latLong.indexOf(',')));
            longitude = parseFloat(latLong.slice(latLong.lastIndexOf(':') + 1));
            //  add markers/ from results
            var currentMarker = {
                    coords: { lat: latitude, lng: longitude},
                    content: '<h1>' + locationName +  '</h1>',
                    flickrImg: locationName
                };
            //Checking to see if the park has coordinates to pass through to our Array
            if (isNaN(latitude)) {
                //push NAN markers to garbage array
                badMarkers.push(currentMarker);
                console.log(locationName + 'does not have latitude');
            } else {
                // Push the markers into the array
                markers.push(currentMarker);
            }
        });
        mapCenter = markers[2].coords;
        console.log(mapCenter);
        initMap();
        addMarker(markers);
    });
});
    





