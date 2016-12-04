
var topics = ["fish", "birds"];



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
		    // a.addClass('movie'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// This function handles events where one button is clicked
	$('#addGif').on('click', function(){

		// This line of code will grab the input from the textbox
		var newGif = $('#gif-input').val().trim();

		// The movie from the textbox is then added to our array
		topics.push(newGif);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

renderButtons();