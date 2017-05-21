// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWvNR_KOoueiou8BgR88O9_EeMasqyvWc",
    authDomain: "trainscheduledm.firebaseapp.com",
    databaseURL: "https://trainscheduledm.firebaseio.com",
    projectId: "trainscheduledm",
    storageBucket: "trainscheduledm.appspot.com",
    messagingSenderId: "645107226846"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = "";
  var minsAway = 0;
  var firstTrainTime = "";

// database.ref().set({
//     name: name,
//     destination: destination,    
//     frequency: frequency,
//     firstArrival: firstArrival,
//     minsAway: minsAway
// });

$(document).ready(function(){
	//add data input from form to database when Submit button is clicked

	$("#newTrain").on("click", function(e){
		e.preventDefault();
		console.log("Submit button is clicked");

		//get the data input from the form
		name = $("#name-input").val().trim();
		destination = $("dest-input").val().trim();
		frequency = $("#freq-input").val().trim();
		firstTrainTime = $("#firstTime-input").val().trim();

		//calculate next arrival time based on current time and frequency

	});




});