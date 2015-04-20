//UTILS FUNCTIONS 
var Image = require("parse-image");
_ = require('underscore.js')


/*
* 
* PHOTO UTILS FUNCTIONS
*
*/

exports.cropImage = function(image, widthImage, heightImage, name){

	var promise = new Parse.Promise();

	image.scale({width: widthImage,height: heightImage}).then(function(image){

		// Make sure it's a JPEG to save disk space and bandwidth.
	    return image.setFormat("JPEG");

	}).then(function(image){
		// Get the image data in a Buffer.
	    return image.data();
	}).then(function(buffer){
		// Save the image into a new file.
	    var base64 = buffer.toString("base64");
	    var nameImage = ""+name+".jpg";
	    var cropped = new Parse.File(nameImage, { base64: base64 });
	    return cropped.save();
	}).then(function(cropped){

		promise.resolve(cropped)

	}, function(error){

		promise.reject(error)

	});

	return promise;

}



/*
* 
* PUSH UTILS FUNCTIONS
*
*/

//PUSH NEW PLEEK

exports.pushNewPleek = function(userWhoSend, pikiId, recipients){

	var promise = new Parse.Promise();

	var messageToPush = "@"+userWhoSend.get("username")+" sent you a new Pleek!😜";
	var channelName = "channel_" + userWhoSend.id;

	//Limit size of the message
	if (messageToPush.length > 140){
		messageToPush = message.substring(0, 137) + "...";
	}

	//Build the request
	var query = new Parse.Query(Parse.Installation);
	query.equalTo('channels', channelName); // Set our channel
	query.notEqualTo("notificationsEnabled", false);

	//There are recipients : private
	if (recipients){
		//Add the condition of the recipients
		var recipientsObject = []

		recipients = _.without(recipients, userWhoSend.id);

		_.each(recipients, function(recipient){

			var recipientObject = new Parse.User();
			recipientObject.id = recipient;
			recipientsObject.push(recipientObject);

		});

		query.containedIn("user", recipientsObject);
	}


	Parse.Push.send({
		  where: query,
		  data: {
		    alert: messageToPush,
		    type : "newPiki",
		    sound : "Birdy_Notification2.wav",
			"pikiId" : pikiId
		  }
	}).then(function(){

		promise.resolve("push sent");

	}, function(error){

		promise.reject(error)

	})

	return promise;

}