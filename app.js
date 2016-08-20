$( document ).ready(function(){

 $.post('https://www.googleapis.com/geolocation/v1/geolocate?&signed_in=true', function (data){
    var coord = {
    'lon':  data.location.lng,
    'lat': data.location.lat
    }

    var latitude = coord['lat'].toString()
    var longitude = coord['lon'].toString()

  var placeReq = $.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&s', function(data){

    $('#location').html(data.results[2]['formatted_address'])
  })
    
  $.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + latitude + '&' + 'lon=' + longitude + '&' + 'appid=', function (data){
    var weatherLocal = {
      'weather': data.weather[0]
    }

    $('#weather').html(data.weather[0]['description'])
     $('#temp').html((data.main['temp']/10).toFixed(1) + ' °C')
 
    $('#change-to-f').on('click', function(){
      $('#temp').html(((data.main['temp']/10) * ( 1.8 )  + 32).toFixed(1) + ' °F')
    })
    $('#change-to-c').on('click', function(){
       $('#temp').html((data.main['temp']/10).toFixed(1) + ' °C') 
    })
    $('img').attr('src', "http://openweathermap.org/img/w/" + data.weather[0]['icon'] + '.png' )
  })

 });
  
}); 
