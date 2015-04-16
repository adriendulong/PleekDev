////////// REACT FUNCTIONS ///////////
_ = require('underscore.js')

exports.pushForNewReact = function(pleek, user){

	var promise = new Parse.Promise();

	//If the pleek is public
	if (pleek.get("isPublic")){

		var nbRecipients = 1000

		if(pleek.get("user").get("nbRecipients")){
			nbRecipients = pleek.get("user").get("nbRecipients")
		}

		var messageToSend = "";
		var needToPush = false;
		var usernameUser = pleek.get("user").get("username");

		//The user has less than 500 recipients on his public pleeks
		if (nbRecipients < 500){

			switch (pleek.get("nbReaction")){

				case 5:
					//Send push for 5 pleek
					needToPush = true;
					messageToSend = "Nice! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 👌";
					break;

				case 20:
					needToPush = true;
					messageToSend = "Awesome! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 😳";
					break;

				case 50:
					needToPush = true;
					messageToSend = "@" + usernameUser + " is making some noise!! "+pleek.get("nbReaction")+" answers on  her/his Pleek ! 🎵🎵";
					break;

				case 100:
					needToPush = true;
					messageToSend = "It's getting big! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟";
					break;

				case 500:
					needToPush = true;
					messageToSend = "Huge!!! "+pleek.get("nbReaction")+" answers reached on @" + usernameUser + "'s Pleek ! 🌟🌟";
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
					break;

				case 250:
					needToPush = true;
					messageToSend = "Awesome! Already "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 😳";
					break;

				case 500:
					needToPush = true;
					messageToSend = "@" + usernameUser + " is making some noise!! "+pleek.get("nbReaction")+" answers on  her/his Pleek ! 🎵🎵";
					break;

				case 1500:
					needToPush = true;
					messageToSend = "It's getting big! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟";
					break;

				case 3000:
					needToPush = true;
					messageToSend = "Huge!!! "+pleek.get("nbReaction")+" answers reached on @" + usernameUser + "'s Pleek ! 🌟🌟";
					break;

				case 5000:
					needToPush = true;
					messageToSend = "WoOoOooOOw !! "+pleek.get("nbReaction")+" answers on @" + usernameUser + "'s Pleek ! 🌟🌟🌟🌟🌟";
					break;

				default:
					needToPush = false;

			}

		}


		//If we need to push
		if (needToPush){
			var channelName = "channel_" + pleek.get("user").id;				  
			var query = new Parse.Query(Parse.Installation);
			query.equalTo('channels', channelName); // Set our channel
			query.notEqualTo("notificationsEnabled", false);
			query.notEqualTo("user", user);
			Parse.Push.send({
				where: query,
				data: {
					alert: messagePikiOwner,
					badge : "Increment",
					sound : "Space_Notification1.wav",
					pikiId : request.params.pikiId
				}
			}).then(function(){

				promise.resolve("Push sent");

			}, function(error){

				promise.reject("Problem sending push");

			});
		}
		else{
			promise.resolve("No need to send push")
		}

	}
	//Pivate Pleek
	else{
		
	}


	return promise;


}