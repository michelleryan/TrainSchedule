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
	
  console.log("I reloaded the page");
//get existing data from the database


//add data input from form to database when Submit button is clicked
	$("#newTrain").on("click", function(e){
		e.preventDefault();
		console.log("Submit button is clicked");

		//get the data input from the form
		name = $("#name-input").val().trim();
		destination = $("#dest-input").val().trim();
		frequency = $("#freq-input").val().trim();
		firstTrainTime = $("#firstTime-input").val().trim();

    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrainTime);
		

    //push the values to the database 
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      firstTrainTime: firstTrainTime
    });

    //clear the text box so user can enter the next train
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#firstTime-input").val("");

	});

  //firebase watcher
  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

    //store data from db into variables of the same name
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;

    //convert the first train time start to be the previous day so you can subtract
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "day");
    console.log(firstTimeConverted);

    //calculate the next arrival time base on the current time
    // var currentTime = moment();
    // console.log("current time is: " + moment(currentTime).format("hh:mm"));
    // var minsTime = moment().minutes();  //the current minutes from the time
    // console.log("minutes are: " + minsTime);

    //get the difference between the current time and the first train time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in minutes: " + diffTime);

    //find out how many minutes there are until the next arrival time
    var minRemaining = diffTime % frequency;
    console.log(minRemaining);

    //get the minutes until the next arrival time
    var minsAway = frequency - minRemaining;
    console.log(minsAway);

    //determine the next train arrival based on the current time
    var nextArrival = moment().add(minsAway, "minutes");
    console.log ("Next Train Arrival Time: " + moment(nextArrival).format("hh:mm"));
    var niceNextArr = moment(nextArrival).format("hh:mm");

    //display into Train Schedule table
    $("#schedule-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + niceNextArr + "</td><td>" + minsAway + "</td></tr>");
  //    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  // empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
      //create table selector variables
      // var tRow = $("<tr>");
      // var tData = $("<td>");

      // //append data
      // tData.append(name);
      // tRow.append(tData);
      // var tData = $("<td>");

      // tData.append(destination);
      // tRow.append(tData);
      // var tData = $("<td>");



  });

});
