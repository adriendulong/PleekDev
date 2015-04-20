////////// REACT FUNCTIONS ///////////
_ = require('underscore.js')

exports.pushForNewReact = function(pleek, user){

	var promise = new Parse.Promise();

	var usernameUser = pleek.get("user").get("username");
	var channel = "channel_"+pleek.get("user").id;

	//If the pleek is public
	if (pleek.get("isPublic")){

		var nbRecipients = 1000

		if(pleek.get("user").get("nbRecipients")){
			nbRecipients = pleek.get("user").get("nbRecipients")
		}

		var messageToSend = "";
		var messageToSendOwner = "";
		var needToPush = false;
		

		//The user has less than 500 recipients on his public pleeks
		if (nbRecipients < 500){

			switch (pleek.get("nbReaction")){

				case 5:
					//Send push for 5 pleek
					needToPush = true;
					messageToSend = "Nice! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 👌";
					messageToSendOwner = "Nice! Already "+pleek.get("nbReaction")+" answers on your Pleek ! 👌";
					break;

				case 20:
					needToPush = true;
					messageToSend = "Awesome! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 😳";
					messageToSendOwner = "Awesome! Already "+pleek.get("nbReaction")+" answers on your Pleek ! 😳";
					break;

				case 50:
					needToPush = true;
					messageToSend = "@" + usernameUser + " is making some noise!! "+pleek.get("nbReaction")+" answers on her/his Pleek ! 🎵🎵";
					messageToSendOwner = "You're making some noise!! "+pleek.get("nbReaction")+" answers on your Pleek ! 🎵🎵";
					break;

				case 100:
					needToPush = true;
					messageToSend = "It's getting big! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟";
					messageToSendOwner = "It's getting big! "+pleek.get("nbReaction")+" answers on your Pleek ! 🌟";
					break;

				case 500:
					needToPush = true;
					messageToSend = "Huge!!! "+pleek.get("nbReaction")+" answers reached on @" + usernameUser + "'s Pleek ! 🌟🌟";
					messageToSendOwner = "Huge!!! "+pleek.get("nbReaction")+" answers reached on your Pleek ! 🌟🌟";
					break;

				default:
					needToPush = false;

			}

		}
		else{

			switch (pleek.get("nbReaction")){

				case 100:
					needToPush = true;
					messageToSend = "Nice! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 👌";
					messageToSendOwner = "Nice! Already "+pleek.get("nbReaction")+" answers on your Pleek ! 👌";
					break;

				case 250:
					needToPush = true;
					messageToSend = "Awesome! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 😳";
					messageToSendOwner = "Awesome! Already "+pleek.get("nbReaction")+" answers on your Pleek ! 😳";
					break;

				case 500:
					needToPush = true;
					messageToSend = "@" + usernameUser + " is making some noise!! "+pleek.get("nbReaction")+" answers on her/his Pleek ! 🎵🎵";
					messageToSendOwner = "You're making some noise!! "+pleek.get("nbReaction")+" answers on your Pleek ! 🎵🎵";
					break;

				case 1500:
					needToPush = true;
					messageToSend = "It's getting big! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟";
					messageToSendOwner = "It's getting big! "+pleek.get("nbReaction")+" answers on your Pleek ! 🌟";
					break;

				case 3000:
					needToPush = true;
					messageToSend = "Huge!!! "+pleek.get("nbReaction")+" answers reached on @" + usernameUser + "'s Pleek ! 🌟🌟";
					messageToSendOwner = "Huge!!! "+pleek.get("nbReaction")+" answers reached on your Pleek ! 🌟🌟";
					break;

				case 5000:
					needToPush = true;
					messageToSend = "WoOoOooOOw !! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟🌟🌟🌟🌟";
					messageToSendOwner = "WoOoOooOOw !! "+pleek.get("nbReaction")+" answers on your Pleek ! 🌟🌟🌟🌟🌟";
					break;

				default:
					needToPush = false;

			}

		}


		//If we need to push
		if (needToPush){
			var promises = [];

			var channelName = "channel_" + pleek.get("user").id;				  
			var query = new Parse.Query(Parse.Installation);
			query.equalTo('channels', channelName); // Set our channel
			query.notEqualTo("notificationsEnabled", false);
			query.notEqualTo("user", user);

			promises.push(Parse.Push.send({
				where: query,
				data: {
					alert: messageToSend,
					badge : "Increment",
					sound : "Space_Notification1.wav",
					pikiId : pleek.id
				}
			}));

			if (pleek.get("user").id != user.id){
				//Send to the owner of the pleek
				var queryOwner = new Parse.Query(Parse.Installation);
				queryOwner.notEqualTo("notificationsEnabled", false);
				queryOwner.equalTo("user", pleek.get("user"));

				promises.push(Parse.Push.send({
					where: queryOwner,
					data: {
						alert: messageToSendOwner,
						badge : "Increment",
						sound : "Space_Notification1.wav",
						pikiId : pleek.id
					}
				}));
			}

			//Push in parallel
			Parse.Promise.when(promises).then(function(){

				promise.resolve("Pusehs sent");

			}, function(error){

				promise.reject("Problem sending pushes");

			});


		}
		else{
			promise.resolve("No need to send push")
		}

	}
	//Pivate Pleek
	else{
		
		//Remove the owner of pleek and the sender from this push
		var recipientsToPush = _.without(pleek.get("recipients"), user.id, pleek.get("user").id);
		var messageRecipients = "@"+user.get("username")+" just added an answer to @"+usernameUser+"'s pleek!😉"
		var messagePikiOwner = user.get("username") + " just answered  your Pleek! 🙌";

		if (messageRecipients.length > 140){
			messageRecipients = messageRecipients.substring(0, 137) + "...";
		}

		if (messagePikiOwner.length > 140){
			messagePikiOwner = messagePikiOwner.substring(0, 137) + "...";
		}

		var promises = []

		//Push Owner
		if (pleek.get("user").id != user.id){

			var queryPushOwner = new Parse.Query(Parse.Installation);
			queryPushOwner.equalTo("user", pleek.get("user"));
			queryPushOwner.notEqualTo("notificationsEnabled", false);
			promises.push(Parse.Push.send({
				  	where: queryPushOwner, // Set our Installation query
				  	data: {
				    	alert: messagePikiOwner,
				    	badge : "Increment",
						sound : "Space_Notification1.wav",
						type : "newReact",
						pikiId : pleek.id
				  	}
			}));

		}
		


		//Push Recipients
		var usersRecipientsToPush = []
		_.each(recipientsToPush, function(recipientToPush){
			console.log("Push : "+recipientToPush);
			var newUser = new Parse.User();
			newUser.id = recipientToPush;
			usersRecipientsToPush.push(newUser);

		});

		var queryPushRecipients = new Parse.Query(Parse.Installation);
		queryPushRecipients.containedIn("user", usersRecipientsToPush);
		queryPushRecipients.equalTo("channels", channel);
		queryPushRecipients.notEqualTo("notificationsEnabled", false);
		promises.push(Parse.Push.send({
				  where: queryPushRecipients, // Set our Installation query
				  data: {
				    alert: messageRecipients,
				    badge : "Increment",
					sound : "Space_Notification1.wav",
					type : "newReact",
					pikiId : pleek.id
				  }
		}));


		//Push in parallel
		Parse.Promise.when(promises).then(function(){

			promise.resolve("Pusehs sent");

		}, function(error){

			promise.reject("Problem sending pushes");

		});


		


	}


	return promise;


}

//Create the 3 preview of the reacts that we save in the pleek
exports.createLastReacts = function(pleek, needIncrement){

	var promise = new Parse.Promise();

	var queryReacts = new Parse.Query(Parse.Object.extend("React"));
					
	//on va recup les pikis posté par le friend
	queryReacts.equalTo("Piki",pleek);
	queryReacts.limit(3);		
	queryReacts.descending("createdAt");

	queryReacts.find().then(function(reacts){

		if(reacts){

			var positionReact = 1
			_.each(reacts, function(react){

				var nameField = "react"+positionReact;
				pleek.set(nameField, react.get("smallPhoto"));
				positionReact++;

			});

		}

		if (needIncrement){
			pleek.increment("nbReaction");
		}
		
		return pleek.save();

	}).then(function(){
		promise.resolve("Preview Reacts created");

	}, function(error){
		promise.reject("Problem creating reacts previews : "+error);
	});


	return promise;

}


//Update the last update ate of the pleek depending on the react posted
exports.updateLastUpdateReact = function(pleek){

	var promise = new Parse.Promise();

	var queryPiki = new Parse.Query(Parse.Object.extend("Piki"));
	queryPiki.include("user");
	queryPiki.get(pleek.id).then(function(pleekObject){

		if (pleekObject){

			if (pleekObject.get("isPublic")){
				if(_.contains([5, 10, 20, 100, 250, 500, 1000, 5000], pleekObject.get("nbReaction"))){
					pleekObject.set("lastUpdate", new Date());
					return pleekObject.save();
				}
				else{
					return Parse.Promise.as();
				}
			}
			else{
				pleekObject.set("lastUpdate", new Date());
				return pleekObject.save();
			}

		}
		else{
			return Parse.Promise.error("Pleek not found");
		}

	}).then(function(){
		promise.resolve("Pleek last updated date has been updated");

	}, function(error){
		promise.reject("Problem updating the date of the pleek : "+error);
	});


	return promise;

}



