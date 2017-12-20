//Initialize the Google Map
var initMap = function() {
    //Centers on the state which is chosen.
    var options = {
        center: mapCenter,
        zoom: 5
    };
    //places map in Div
    map = new google.maps.Map(
        document.getElementById('map'),
        options
    );
}
//Adding the markers function

var addMarker = function(markers) {
    //Add marker for each park in the array, adding content and creating a new marker for our map.
    for (var i = 0; i < markers.length; i++) {
        var content = '<div id="iw-content"' + markers[i].content + '</div>'
        var marker =  new google.maps.Marker({
                position: markers[i].coords,
                content: content,
                map:map
        });
        //Creating the infoWindows for the google map icons.
        var infoWindow = new google.maps.InfoWindow();
        //listeners on the markers for hover and click.
        (function(marker, i) {
            //Mouseover icon and reveal the Park name
            marker.addListener('mouseover', function() {
                    infoWindow.setContent(marker.content);
                    infoWindow.open(map, marker);
            });
            // add click event for images to display in paralell div.
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(marker.content);
                infoWindow.open(map, marker);
                //Pop open the div with the images in it. 
                $('#infoColumn').css({
                    'display': 'inline-block',
                    'width': '100%',
                    'height': '400px',
                    'border': 'solid',
                    'margin-top': '20px'
                })
                //Adds a title to the div so we know where images are from when viewing
                $('#title').html('<div id="infoWindowHeader">' + marker.content + '</div>')

                //Tell flickr what URL to get images from.
                var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=jsonpcallback&tagmode=all&tags=' + markers[i].flickrImg;
                console.log(markers[i].flickrImg);
                

                // hide the infowindow when user mouses-out
                marker.addListener('mouseout', function() {
                    infoWindow.close();
                });

                $.ajax({
                  url: url,
                  method: "GET",
                  dataType: 'jsonp'
                })
                .done(function(response) {
                    console.log("test");
                  })
                .fail(function(error) {
                  console.log(error);
                })
                // console.log(locationName);
                console.log(marker.content);
            //close add listener function
            });
        //close markers, i function
        })(marker, i);
    };//close For loop
};//close addMarker function

