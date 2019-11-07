// Weather Data Structure
// var weatherData = {
//   base: "stations",
//   clouds: {
//     all: 1
//   },
//   coord: {
//     lat: 43.65,
//     lon: -79.38
//   },
//   dt: 1507510380,
//   id: 6167863,
//   main: {
//     humidity: 77,
//     pressure: 1014,
//     temp: 17.99,
//     temp_max: 20,
//     temp_min: 16
//   },
//   name: 'Downtown Toronto',
//   sys: {
//     type: 1,
//     id: 2117,
//     message: 0.0041,
//     country: 'CA',
//     sunrise: 1507548290,
//     sunset: 1507589027,
//     type: 1
//   },
//   visibility: 16093,
//   weather: [
//     {
//       description: 'clear sky',
//       icon: '01n',
//       id: 800,
//       main: "Clear"
//     }
//   ],
//   wind: {
//     deg: 170,
//     speed: 1.5
//   }
//
// }
//End Weather Data Structure

//Retrieve Weather API
var apiKey = '253682c0bd759acfb4255d4aa08c3dd7'

//Function for changing color of header
function successTitleClass() {
  $('.title').removeClass('blue')
  $('.title').addClass('green')
}

function failTitleClass() {
  $('.title').removeClass('blue')
  $('.title').addClass('red')
}

function resetTitleClass() {
  $('.title').addClass('blue')
  $('.title').removeClass('green')
  $('.title').removeClass('red')
}

$(document).ready(function(){
  // WRITE YOUR CODE HERE.
  //Function for getting stuff when button is pushed
  $('#enter-city').on('submit', function(event) {
    event.preventDefault();
    //slide and hide input form
    $(this).slideUp(200)
    $(this).toggleClass('hidden')
    //Change header color to red
    $.get('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + $('input').val() + '&appid=' + apiKey, function(retrievedData) {
      //test if data retrieval targeting works using console logs
      console.log($('input').val())
      console.log(retrievedData)
      console.log(retrievedData.name)
      console.log(retrievedData.main.temp)
      successTitleClass();

      //Show City and Temperature
      $('.results p').replaceWith("<p>The temperature in " + retrievedData.name + " is " + retrievedData.main.temp + "&deg;C.</p>")

      //reveal results and submitAgain button
      $('div.results').toggleClass('hidden')
      $('button.hidden').toggleClass('hidden');
      //What image to reveal
      if (retrievedData.main.temp >= 25) {
        $('#veryHot').toggleClass('hidden');
      }
      else if (retrievedData.main.temp >= 15) {
        $('#kindOfHot').toggleClass('hidden');
      }
      else if (retrievedData.main.temp >= 8) {
        $('#regular').toggleClass('hidden');
      }
      else if (retrievedData.main.temp >= 0) {
        $('#kindOfCold').toggleClass('hidden');
      }
      else if (retrievedData.main.temp < 0) {
        $('#veryCold').toggleClass('hidden');
      }
    }).fail(function() {
    $('div.results').toggleClass('hidden');
    $('button.hidden').toggleClass('hidden');
    $('.results p').replaceWith("<p>Are you sure '" + $('input').val() + "' is a real city?</p>")
    $('#notInDatabase').toggleClass('hidden')
    failTitleClass();
})
  })
  //Function for resetting form when SearchAgain is pushed
  $('#submitAgain').click(function(event) {
    //Change color back to blue, remove red if needed
    resetTitleClass();
    $('.title').removeClass('red')
    //Hide All Images again
    $('#veryHot').addClass('hidden')
    $('#kindOfHot').addClass('hidden')
    $('#regular').addClass('hidden')
    $('#kindOfCold').addClass('hidden')
    $('#veryCold').addClass('hidden')
    $('#notInDatabase').addClass('hidden')
    //Reveal enter city form again
    $('#enter-city').slideDown(200)
    $('#enter-city').toggleClass('hidden')
    $('#enter-city').trigger("reset");
    // reset results to original and hide
    $('div.results').html('<p>These are the results!</p>')
    $('div.results').toggleClass('hidden')
    //Hide Submit Again button
    $(this).toggleClass('hidden');
  })

  $('#city').on('focus blur', function(event) {
    $(this).toggleClass('border');
  })

});
