
var topics = ["fish", "birds"];

var authKey = "dc6zaTOxFJmzC";
// var queryURLBase = "http://api.giphy.com/v1/gifs/search?q=" +  + "&api_key=dc6zaTOxFJmzC";
var searchTerm = "";
var numResults = 10;


function renderButtons()
	{ 

		// Empties the div prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
		$("#buttonsView").empty();
		// var tempArray = totalArrayAnswers[n];
		// console.log(tempArray);
		// Loops through the array of answers
		for (var i = 0; i < topics.length; i++)
		{

			// Then dynamicaly generates buttons for each item in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('gifbutton'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// This function handles events where one button is clicked
	$('#addGif').on('click', function(){

		// This line of code will grab the input from the textbox
		var newGif = $('#gif-input').val().trim();
		// Empty input field 
		// $('#gif-input').text(" ");
		// The movie from the textbox is then added to our array
		topics.push(newGif);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

		// displayMovieInfo function now re-renders the HTML to display the appropriate content. 
	function displayGif(){

		var gif = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=" + numResults + "&api_key=" + authKey;
		
		// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			// // Creates a generic div to hold the movie
			var gifDiv = $('<div class="gif">');

			for (i = 0; i < numResults; i++) 
			{ 
				// Retrieves the Rating Data
				var rating = response.data[i].rating;

				// Creates an element to have the rating displayed
				var pOne = $('<p>').text( "Rating: " + rating);

				// Displays the rrating
				gifDiv.append(pOne);

				// // Creates an element to hold the image 
				var image = $('<img>')
				image.attr("src", response.data[i].images.fixed_height_still.url);
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
    			image.attr("data-animate", response.data[i].images.fixed_height.url);
    			image.attr("data-state", "still");
        		image.addClass("gifImage");

				// // Appends the image
				gifDiv.append(image);			
			}


			// // Retrieves the release year
			// var released = response.Released;

			// // Creates an element to hold the release year
			// var pTwo = $('<p>').text( "Released: " + released);

			// // Displays the release year
			// gifDiv.append(pTwo);

			// // Retrieves the plot
			// var plot = response.Plot;

			// // Creates an element to hold the plot
			// var pThree = $('<p>').text( "Plot: " + plot);

			// // Appends the plot
			// gifDiv.append(pThree);



			// Puts the entire Movie above the previous movies.
			$('#gifView').prepend(gifDiv);
		});

	}

    function changeState() 
    {
      // STEP ONE: study the html above.
      // Look at all the data attributes.
      // Run the file in the browser. Look at the images.

      // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

      // STEP TWO: make a variable named state and then store the button's data-state into it.
      // Do not use .data('state'). It won't work the way we expect.

      // ============== FILL IN CODE HERE FOR STEP TWO =========================
      var state=$(this).attr("data-state");

      // =============================================

      // STEP THREE: Check if the variable state is equal to 'still',
      if (state == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

      }
      // then update the src attribute of this image to it's data-animate value,

      // and update the data-state attribute to 'animate'.

      if (state != "still"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-animate value and update the data-state attribute to 'still'
      // ============== FILL IN CODE HERE FOR STEP THREE =========================

      // CODE GOES HERE

      // ==============================================

      // STEP FOUR: open the file in the browser and click on the images.
      // Then click again to pause.
    };

renderButtons();

// Generic function for displaying the movieInfo
$(document).on('click', '.gifbutton', displayGif);
$(document).on('click', '.gifImage', changeState);
