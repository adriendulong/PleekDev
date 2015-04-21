
var infosDev = {
	twillio_sid : "AC565e7be131da6f810b8d746874fb3774",
	twilio_token : "8d432341211ffaca933c13dd2e000eea",
	accounts_id : {
		pleekTeam_id : "TMaNfNq0Kl",
		remi_id : "0ufOfqJZM5",
		adrien_id : "8BvQhG1fPu",
		cyril_id : "MVFSYoDHWb",
	}
}


var infosProd = {
	twillio_sid : "AC565e7be131da6f810b8d746874fb3774",
	twilio_toker : "8d432341211ffaca933c13dd2e000eea",
	accounts_id : {
		pleekTeam_id : "1IJJAdzBYR",
		remi_id : "SD7bSBaCI0",
		adrien_id : "Qb1h3r79yi",
		cyril_id : "NDWV7E98zE",
	}
}

//WE ARE IN PROD OR DEV ???
var isProd = false;

//Modify between dev and Prod
var infosApp;
if (isProd){
	infosApp = infosProd;
}
else{
	infosApp = infosDev;
}


// Require and initialize the Twilio module with your credentials
var client = require('twilio')(infosApp.twillio_sid, infosApp.twilio_token);
var Image = require("parse-image");
var friend = require('cloud/friend.js');
var utils = require('cloud/utils.js');
var react = require('cloud/react.js');
var Slack = require('cloud/slack.js');
var slack = new Slack('https://hooks.slack.com/services/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');

_ = require('underscore.js')
 
var pikiTeamId = infosApp.accounts_id.pleekTeam_id;
var remiId = infosApp.accounts_id.remi_id;
var adrienId = infosApp.accounts_id.adrien_id;
var cyrilId = infosApp.accounts_id.cyril_id;
   

//TO DELETE
var firstUsePeekeeIds = ["fI7hLy3Ian" , "6DYaqoO2aG"];
var nbRecipientsMaxToPublicPleekPush = 500;
var ApplicationId = "BA7FMG5LmMRx0RIPw3XdrOkR7FTnnSe4SIMRrnRG";
var MasterKey = "AKQhW3cNH3y4nwaKovCNhAcUeW6Z4rasX3OdiIkR";
   

//Number to use for Twillio
var numberTab = ['+18444311851','+18444871402','+18444524509','+18444396638','+18669777429','+18444311833','+18444311819','+18444871404','+18444683581','+18443258728','+18443240467','+18669574382','+18444871423','+18442907653','+18444871406','+18444871432','+18445019774','+18664598710','+18444311868','+18444871424','+18444311798','+18662058264','+18445019781','+18445019772','+18444311828','+18444871408','+18445019801','+18444871410','+18667047183','+18444997329','+18442761551','+18667047083','+18444311806','+18445189538','+18445019773','+18445019780','+18444871409','+18445019800','+18662067260','+18444318358','+18445189545','+18445189541','+18445189583','+18445189539','+18445019799','+18444434258','+18445189547','+18666800432','+18445189551','+18444932543','+18444337329','+18445189536','+18444311863','+18445019792','+18445019793','+18445189558','+18445019786','+18668979247','+18445189557','+18445019779','+18444871401','+18445019798','+18445019790','+18444871428','+18444311864','+18445189533','+18445019794','+18669930488','+18445189590','+18443363593','+18662202536','+18669579612','+18445189585','+18445189598','+18445019783','+18445189540','+18445189542','+18445189594','+18669789271','+18662299916','+18445189599','+18445019789','+18445189552','+18445189607','+18445189556','+18444871430','+18444871431','+18445189593','+18445189613','+18445189618','+18446152205','+18668043969','+18447896913','+18445774516','+18774238223','+18448073101','+18445774508','+18444167185','+18448285134','+18446789329','+18442878738','+18774517542','+18773143135','+18448232428','+18777876882','+18777788915','+18777449717','+18445540204','+18778402839','+18777613644','+18669375702','+18774826870','+18662283479','+18448713298','+18448692001','+18442948483','+18445532035','+18662352668','+18445544022','+18443576859','+18776209584','+18442027272','+18442948232','+18778011077','+18448185969','+18775121738','+18772321586','+18669868538','+18445920006','+18446110638','+18442148412','+18444308482','+18442147932','+18779272387','+18443345957','+18776113832','+18442148387','+18775125523','+18776472048','+18772499741','+18777454906','+18448691995','+18448073102','+18448073100','+18448232437','+18778176077','+18448692002','+18448713299','+18669378429','+18442148781','+18777901310','+18445774510','+18442686339','+18444485309','+18442148421','+18446152211','+18446152210','+18668702352','+18554667018','+18775329524','+18446155200','+18445579015','+18442148783','+18554667101','+18446152209','+18669377988','+18444690691','+18669375713','+18448073108','+18776665717','+18666335853','+18446152214','+18669377995','+18779599822','+18443347045','+18445579020','+18442148424','+18444690664','+18448285132','+18448691996','+18777606352','+18448892484','+18448892490','+18669375707','+18444694712','+18448285133','+18772997311','+18449772522','+18448285139','+18442148801','+18665974690','+18446627037','+18449732283','+18442148786','+18444694827','+18667873042','+18445185525','+18662063737','+18445185527','+18445789329'];
	


///////////////////////////////// START ////////////////////////////////////////
////////////////// SET PRIVATE ACL FOR PHONE NUMBERS //////////////////////////

// Set Migration variable to false to all users
Parse.Cloud.job("setUserInofsACL", function(request, status) {

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;

  //Go through all the users
  var query = new Parse.Query(Parse.User);
  query.include("userInfos")
  query.equalTo("ACLsetDone", false)
  query.each(function(user) {



  	var testDate = new Date();
  	var lengthJob = testDate - startDate;
  	var nbMinutesLimit = 14;

  	if (lengthJob > (nbMinutesLimit * 60 * 1000)){
  		console.log("finish")
  		return Parse.Promise.as();
  	}
  	else{
  		if (counter % 100 === 0) {
        	status.message(counter + " users processed.");
    	}
    	counter += 1;

    	//set ACL
    	if (user.get("userInfos")){
    		user.get("userInfos").setACL(new Parse.ACL(user));
    		user.get("userInfos").set("hasBeenSetPrivate", true);
    		user.set("ACLsetDone", true);
    		return user.save();
    	}
    	else{
    		return Parse.Promise.as()
    	}
  	}

  }).then(function(){

  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Set private ACL done in "+lengthJob+" for "+counter+" users");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
  });

});

////////////////// SET PRIVATE ACL FOR PHONE NUMBERS //////////////////////////
///////////////////////////////// END ////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// START ////////////////////////////////////////
////////////////// MIGRATE USER FRIENDS TO PFRELATION //////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Set Migration variable to false to all users
Parse.Cloud.job("setMigrationFriendsFalse", function(request, status) {

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var letter = request.params.letter;

  //Go through all the users
  var query = new Parse.Query(Parse.User);
  query.doesNotExist("migrationFriendsDone");

  if (letter !== "0"){
  	query.startsWith("username", letter);
  }

  query.each(function(user) {

  	if (counter % 100 === 0) {
        status.message(counter + " users processed.");
    }
    counter += 1;

    if(user.get("usersFriend")){
    	if (user.get("usersFriend").length > 300){
    		user.set("isBigAccount", true);
    	}
    	else{
    		user.set("isBigAccount", false);
    	}
    }
    else{
    	user.set("isBigAccount", false);
    }

  	user.set("migrationFriendsDone", false);
  	user.set("ACLsetDone", false);
  	user.set("nbFriends", 0);
  	user.set("nbRecipients", 0);
  	return user.save();

  }).then(function(){

  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Set false to "+counter+" users done in "+lengthJob+" for letter : "+letter);

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
  });

});


// Migrate all the friends of all the user of the base
Parse.Cloud.job("migrateFriendsUsers", function(request, status) {

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;
  var nbSeries = 0;
  var letter = request.params.letter;
  
  //Go through all the users
  var query = new Parse.Query(Parse.User);
  query.equalTo("migrationFriendsDone", false)
  query.equalTo("isBigAccount", false)

  if (letter !== "0"){
  	query.startsWith("username", letter);
  }
  
  query.each(function(user) {

    //See if it has been more that x minutes
    var testDate = new Date();
  	var lengthJob = testDate - startDate;
  	var nbMinutesLimit = 14;

  	if (lengthJob > (nbMinutesLimit * 60 * 1000)){
  		console.log("finish")
  		return Parse.Promise.as();
  	}
  	else{
  		if (counter % 100 === 0) {
        	status.message(counter + " users processed.");
    	}
    	counter += 1;

  		console.log("still acting");
  		//Call the function the migrate all the friends of this user
  		return friend.migrateFriends(user);
  	}


    

  }).then(function(){

  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Migration completed successfully in "+lengthJob+" for letter : "+letter+" and "+counter+" users");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
  });

});



//Nb of users to migrate for a specified letter
Parse.Cloud.define("countFriendsToMigrate", function(request, response) {
	Parse.Cloud.useMasterKey();	
	


	var letter = request.params.letter;

	console.log("Letter : "+letter);

	var query = new Parse.Query(Parse.User);
  	query.equalTo("migrationFriendsDone", false)
  	query.equalTo("isBigAccount", false)
  	query.startsWith("username", letter);
  	query.count().then(function(nbToMigrate){
  		response.success("Still to migrate with letter "+letter+" : "+nbToMigrate);
  	}, function(error){
  		response.success("Problem counting");
  	});
	
	
});

//Set FriendshipScores
Parse.Cloud.job("setFriendshipScores", function(request, status){

	Parse.Cloud.useMasterKey();
	var startDate = new Date()

	var friendshipScore = Parse.Object.extend("friendshipScore");
	var queryfriendshipScore = new Parse.Query(friendshipScore);
	
	queryfriendshipScore.include("user")

	//Iterate over all the friendhsipScores
	queryfriendshipScore.each(function(friendshipScore){

		var user = friendshipScore.get("user")
		var friendId = friendshipScore.get("friendId")

		var queryFriend = new Parse.Query(Parse.Object.extend("Friend"))
		queryFriend.equalTo("user", user)
		queryFriend.equalTo("friendId", friendId)

		//Get the Friend Object
		return setOldScore(friendshipScore);

	}).then(function(){

		var endDate = new Date();
  		var lengthJob = endDate - startDate;
		status.success("Has Set all the friendships score in : "+ lengthJob)

	}, function(error){
		status.error("Error : "+ error);
	});

});



//Set the score of the friendhsip table in the Friend Table
function setOldScore(friendshipScore){

	var promise = new Parse.Promise();

	var user = friendshipScore.get("user")
	var friendId = friendshipScore.get("friendId")

	var queryFriend = new Parse.Query(Parse.Object.extend("Friend"))
	queryFriend.equalTo("user", user)
	queryFriend.equalTo("friendId", friendId)

	queryFriend.first(function(friend){

		friend.set("score", friendshipScore.get("score"))

		return friend.save();

	}).then(function(){

		promise.resolve()

	}, function(error){

		promise.reject()

	});

	return promise;

}

/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// END ////////////////////////////////////////
////////////////// MIGRATE USER FRIENDS TO PFRELATION //////////////////////////
///////////////////////////////////////////////////////////////////////////////

Parse.Cloud.afterSave("Friend", function(request) {
	Parse.Cloud.useMasterKey();

	//If new friend object
	if (!request.object.existed()){


		var queryFriend = new Parse.Query(Parse.User);
		queryFriend.containedIn("objectId", [request.object.get("friend").id, request.object.get("user").id])
		queryFriend.find().then(function(users){
			var friendObject;
			var userObject;
			
			_.each(users, function(user){

				//Increment nbrecipients friend
				if (user.id == request.object.get("friend").id){
					friendObject = user;
					user.increment("nbRecipients");
					user.save();
				}
				//Push user
				else{
					userObject = user;
				}

			});

			var pushQuery = new Parse.Query(Parse.Installation);
			pushQuery.equalTo("user",friendObject);
			pushQuery.notEqualTo("notificationsEnabled", false);


			/*
			
			if (userObject){
				var message;

				if (userObject.get("username")){
					message = "@" + userObject.get("username") + " added you on Pleek!! 😎";
				}
				else{
					message = "@unknown added you on Pleek!! 😎";
				}

			

				Parse.Push.send({
					where: pushQuery, // Set our Installation query
					data: {
						alert: message,
						badge : "Increment",
						sound : "default",
						type : "newFriend"
					}
				});
			}*/
			

		});

	}


});


Parse.Cloud.afterDelete("Friend", function(request) {
	Parse.Cloud.useMasterKey();
  
	var queryFriend = new Parse.Query(Parse.User);
	queryFriend.get(request.object.get("friend").id).then(function(friend){

		friend.increment("nbRecipients", -1);
		friend.save();

	})

});


   
Parse.Cloud.define("seenPiki", function(request, response) {
	Parse.Cloud.useMasterKey();	
	
	var peekeeId = request.params.peekeeId;
	var ownerId = request.params.ownerId;
	
	var message = "@" + request.user.get("username") + " has seen your Pleek! 😉" ;
	
	//on va push le owner
	var pushQuery = new Parse.Query(Parse.Installation);
	
	var User = Parse.Object.extend("User");
	var innerQuery = new Parse.Query(User);
	
	innerQuery.equalTo("objectId",ownerId);
	pushQuery.matchesQuery("user", innerQuery);
	pushQuery.notEqualTo("notificationsEnabled", false);
	
	// Send the push notification to results of the query
	Parse.Push.send({
	  where: pushQuery, // Set our Installation query
	  data: {
	    alert: message,
		sound : "default",
		type : "newPiki",
		"pikiId" : peekeeId,
		"content-available" : 1
	  }
	}, {
	  success: function() {
	    // Push sent successful
	    console.log("New Piki push send");
	    response.success("push send");
	  },
	  error: function(error) {
	    // Handle error
	    console.log("Error while sending new Piki push");
	    response.error();
	  }
	});
	
	
});
   
Parse.Cloud.define("sendInviteSMS", function(request, response) {

	var message = "@" +  request.user.get("username") + " added you on Pleek!! \n http://www.pleekapp.com?" + request.user.get("username");
	
	var number = numberTab[Math.floor(Math.random()*numberTab.length)];
	
	// Validate the message text.
	// For example make sure it is under 160 characters
	if (message.length > 160) {
	// Truncate and add a ...
	message = message.substring(0, 157) + "...";
	}
	
	
	
	var numberSmsSent = 0;
	
 	//on boucle pour chaque numéro
 	for (var i=0; i < request.params.phoneNumberTab.length ; i++) {
 	
	 	
 		// Send an SMS message
		client.sendSms({
		    to: request.params.phoneNumberTab[i],
		    from: number, 
		    body: message
		  }, function(err, responseData) { 
		    if (err) {
		      console.log(err);
		      //response.error(err);
		      numberSmsSent++;
		      if (request.params.phoneNumberTab.length == numberSmsSent) {
			     response.success(responseData.body); 
		      }
		    } else { 
		      numberSmsSent++;
		      console.log(responseData.to); 
		      console.log(responseData.body);
		      
		      if (request.params.phoneNumberTab.length == numberSmsSent) {
			     response.success(responseData.body); 
		      }
		      
		    }
		  }
		);
		 	
 	}
 	

}); 

Parse.Cloud.define("addToAPublicPleek", function(request, response) {

	Parse.Cloud.useMasterKey();	
	
	var pleekId = request.params.pleekId
		
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	//on cherche les pikis public
	queryPiki.equalTo("objectId",pleekId);
	
	queryPiki.first({
	  success: function(publicPleekFind) {
	  
	  	if (publicPleekFind) {
				    
				    
				   //on save le pleek avec le user en en plus dans les recipients
				   publicPleekFind.addUnique("recipients",request.user.id);
				    
				   publicPleekFind.save(null, {
					  success: function(pleekSaved) {			  
					  
					  
						  response.success("user added to the messenger public pleek");
					 
					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    console.log('Failed to save the new recipient in public pleek messenger');
					    response.error("Failed to save the new recipient in public pleek messenger")
					    
					  }
					});
		
		}
		
		else {
			response.success("Messenger Pleek not find !")
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the messenger pleek");
	    response.error("finding the messenger pleek");
	  }
	});
 	

});

/*
Parse.Cloud.define("callMuteAll", function(request, response) {
	Parse.Cloud.useMasterKey();
	
	Parse.Cloud.httpRequest({
    method: "POST",
    url: "https://api.parse.com/1/jobs/muteAll",
    headers: {
      "X-Parse-Application-Id": ApplicationId,
      "X-Parse-Master-Key": MasterKey,
      "Content-Type": "application/json"
    },
    body: {
      "userId" : request.user.id
    },
    success: function(httpResponse) {
      console.log(httpResponse);
      response.success();
    },
    error: function(error) {
      console.log("ERROR"); 
      response.error();
    }
  });

});

Parse.Cloud.define("callunmuteAll", function(request, response) {
	Parse.Cloud.useMasterKey();
	
	Parse.Cloud.httpRequest({
    method: "POST",
    url: "https://api.parse.com/1/jobs/unmuteAll",
    headers: {
      "X-Parse-Application-Id": ApplicationId,
      "X-Parse-Master-Key": MasterKey,
      "Content-Type": "application/json"
    },
    body: {
      "userId" : request.user.id
    },
    success: function(httpResponse) {
      console.log(httpResponse);
      response.success();
    },
    error: function(error) {
      console.log("ERROR"); 
      response.error();
    }
  });

});

Parse.Cloud.job("muteAll", function(request, status) {

	Parse.Cloud.useMasterKey();
	
	
	var User = Parse.Object.extend("User");
	var queryUserMuteOn = new Parse.Query(User);
	
	var numberToSkipVar = 0;
	
	queryUserMuteOn.equalTo("objectId" , request.params.userId)
	queryUserMuteOn.first({
		success: function(userMatch) {

			
			
			muteAllFriends(numberToSkipVar, userMatch);


		
		},
		error: function() {
		
			status.error("\n ****** ERREUR DE LA RECHERCHE du user ******* \n");
			
			
		}
	});
	
	
	
	function muteAllFriends(numberToSkip, userMutedOn) {
	
		var queryUser = new Parse.Query(User);
		var userfriends = userMutedOn.get("usersFriend");
		var lenght = userfriends.length.toString();
		

	
		//on va recup l'object user du friends
		queryUser.containedIn("objectId", userfriends);
		queryUser.limit(1000);
		queryUser.skip(numberToSkip);
		queryUser.find({
		  success: function(friendsObject) {
		  	if (friendsObject) {
		  	
		  	
		  		
					    
					    for (var i = 0 ; i < friendsObject.length ; i++) {
					    	
					    	//si il ne s'agit pas de lui meme
					    	if (friendsObject[i].id != userMutedOn.id){
					    
							    //on save le friends avec le user en ami
							    friendsObject[i].addUnique("usersWhoMutedMe",userMutedOn.id);
							    //on save le user avec le friends en mute
							    userMutedOn.addUnique("usersIMuted",friendsObject[i].id);
						    
						    }
						    
						}
					    
					    Parse.Object.saveAll([friendsObject, userMutedOn], {
						  success: function(friendSaved) {			  
						  
						  
						  	  //on ajoute les users à leurs channels
								var query = new Parse.Query(Parse.Installation);
								var changedObjects = [];
								
								query.equalTo("user",userMutedOn);
								query.find({
									success: function(installations){
											
											
											for (var j = 0 ; j < userfriends.length ; j++) {
												var channelName = "channel_" + userfriends[j];
													
												for (var k = 0; k < installations.length; k++){
												
													// Add the channel to all the installations for this user
													installations[k].remove("channels", channelName); //Add the channel to the installation
													changedObjects.push(installations[k]); //Add the installation to be saved later on!
												}
											}
									
										//Saving all the installations
										Parse.Object.saveAll(changedObjects, { 
										
											success: function(installations) {
																  
												//si on a pas encore traiter la totalité des amis on lance la suite
												if (friendsObject.length == 1000) {
													numberToSkipVar = numberToSkipVar + 1000;
													console.log("il reste encore des amis à traiter. On en a déjà fait : " + numberToSkipVar);
													muteAllFriends(numberToSkipVar, userMutedOn);
												
												} else {
													userMutedOn.set("endMuteAllJob", true);
													userMutedOn.set("endunmuteAllJob", false);
													userMutedOn.save(null,{ 
							
														success: function(installations) {
															
															status.success("JOB END OK ! user is now mutedOn");
															
															  var pushQueryRecipients = new Parse.Query(Parse.Installation);
															
															  pushQueryRecipients.equalTo("user", userMutedOn );
														      pushQueryRecipients.notEqualTo("notificationsEnabled", false);
														      
														       var message = userMutedOn.get("username") + " : you are now in mute mode ! check settings to unmute few people that matters.";
															  
															  // Send the push notification to results of the query
															  Parse.Push.send({
																  where: pushQueryRecipients, // Set our Installation query
																  data: {
																    alert: message,
																    badge : "Increment",
																	sound : "Birdy_Notification2.wav",
																	"content-available" : 1
																  }
																}, {
																  success: function() {
																    // Push sent successful
																    console.log('New react push send on public Pleek! with < 100 recipients');
																    status.success("mute mode activé correctement !!!!\n\n\n !!!!");
																  },
																  error: function(error) {
																    // Handle error
																    console.log("Error while sending new react push");
																    status.error();
																  }
																});
															
															
															
														},
														error: function() {
															// An error occurred while saving one of the objects.
															status.error("failing saving the user that launch jobs to mute");
														}
													
													});
												}
											
											},
											error: function(error) {
												// An error occurred while saving one of the objects.
												console.log("failed to save the new installation of the user  without the friends channel");
												status.error(error);
											}
										
										});
									},
									error: function(error) {
										console.log("failed to find the users installations");
										status.error(error);
									}
								});						
						 
						    
						  },
						  error: function() {
						  
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    console.log('Failed to save all the users friends object he muted');
						    status.error(error);
						    
						  }
						});
			
			}
			
		    
		    
		  },
		  error: function() {
		    console.log("failed to find the users friend object");
		    status.error(error);
		  }
		});
	
	}
	

});

Parse.Cloud.job("unmuteAll", function(request, status) {

	Parse.Cloud.useMasterKey();
	
	var User = Parse.Object.extend("User");
	var queryUserMuteOn = new Parse.Query(User);
	
	var numberToSkipVar = 0;
	
	queryUserMuteOn.equalTo("objectId" , request.params.userId)
	queryUserMuteOn.first({
		success: function(userMatch) {

			
			
			
			unmuteAllFriends(numberToSkipVar, userMatch);


		
		},
		error: function() {
		
			status.error("\n ****** ERREUR DE LA RECHERCHE du user ******* \n");
			
			
		}
	});
	
	
	
	function unmuteAllFriends(numberToSkip, userMutedOn) {
	
		var queryUser = new Parse.Query(User);
		var userfriends = userMutedOn.get("usersFriend");
	
		//on va recup l'object user du friends
		queryUser.containedIn("objectId", userfriends);
		queryUser.limit(1000);
		queryUser.skip(numberToSkip);
		queryUser.find({
		  success: function(friendsObject) {
		  
		  	if (friendsObject) {
					    
					    for (var i = 0 ; i < friendsObject.length ; i++) {
					    
						    //on save le friends avec le user en ami
						    friendsObject[i].remove("usersWhoMutedMe",userMutedOn.id);
						    //on save le user avec le friends en mute
						    userMutedOn.remove("usersIMuted",friendsObject[i].id);
						    
						}
					    
					    Parse.Object.saveAll([friendsObject, userMutedOn], {
						  success: function(friendSaved) {			  
						  
						  
						  	  //on ajoute les users à leurs channels
								var query = new Parse.Query(Parse.Installation);
								var changedObjects = [];
								
								query.equalTo("user",userMutedOn);
								query.find({
									success: function(installations){
											
											
											for (var j = 0 ; j < userfriends.length ; j++) {
												var channelName = "channel_" + userfriends[j];
													
												for (var k = 0; k < installations.length; k++){
												
													// Add the channel to all the installations for this user
													installations[k].addUnique("channels", channelName); //Add the channel to the installation
													changedObjects.push(installations[k]); //Add the installation to be saved later on!
												}
											}
									
										//Saving all the installations
										Parse.Object.saveAll(changedObjects, { 
										
											success: function(installations) {
																  
												//si on a pas encore traiter la totalité des amis on lance la suite
												if (friendsObject.length == 1000) {
													numberToSkipVar = numberToSkipVar + 1000;
													console.log("il reste encore des amis à traiter. On en a déjà fait : " + numberToSkipVar);
													unmuteAllFriends(numberToSkipVar, userMutedOn);
												
												} else {
													userMutedOn.set("endunmuteAllJob", true);
													userMutedOn.set("endMuteAllJob", false);
													userMutedOn.save(null,{ 
							
														success: function(installations) {
															
															status.success("JOB END OK ! user is now unmutedOn");
															
														},
														error: function() {
															// An error occurred while saving one of the objects.
															status.error("failing saving the user that launch jobs to unmute");
														}
													
													});
													
												}
											
											},
											error: function(error) {
												// An error occurred while saving one of the objects.
												console.log("failed to save the new installation of the user  without the friends channel");
												status.error(error);
											}
										
										});
									},
									error: function(error) {
										console.log("failed to find the users installations");
										status.error(error);
									}
								});						
						 
						    
						  },
						  error: function() {
						  
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    console.log('Failed to save all the users friends object he muted');
						     status.error(error);
						    
						  }
						});
			
			}
			
		    
		    
		  },
		  error: function() {
		    console.log("failed to find the users friend object");
		     status.error(error);
		  }
		});
	
	}
	

});*/

Parse.Cloud.job("fixProdChannel", function(request, status) {
	Parse.Cloud.useMasterKey();
	
	var totalInstallationSaved = 0;
	var totalInstallationToFind = 90;
	
	//on va chercher tout les users
	
	var User = Parse.Object.extend("User");
	var queryUser = new Parse.Query(User);
	
	queryUser.limit(1000);
	
	queryUser.find({
		success: function(userMatch) {
			
			if (userMatch.length > 0) {
			
			status.message("on a trouvé : " + userMatch + " users");
			
			
				
				for (var i = 0 ; i < userMatch.length ; i++) {
					
					var channelToAdd = [];
					
					//on recupere par user sa liste d'amis
					var userFriends = [];
					if (userMatch[i].get("usersFriend")) {
						var userFriends = userMatch[i].get("usersFriend");
					}
					
					//on recupere sa liste de gens qu'il a muté
					var userHeMuted = [];
					if (userMatch[i].get("usersIMuted")) {
						var userHeMuted = userMatch[i].get("usersIMuted");
					}
					
					//on crée un tableau avec tout les channel name des users friends
					for (var j = 0 ; j < userFriends.length ; j++ ) {
						
						if (userHeMuted.indexOf(userFriends[j]) == -1){
							
							var channelName = "channel_" + userFriends[j];
							channelToAdd.push(channelName);
							
							
						}				
					}
					
					//on appel la fonction pour ajouter les channels a l'installation
					setChannelForUser(channelToAdd, userMatch[i]);
					
	
				
				}
						
				//on save toutes les installations
			
			}


		
		},
		error: function() {
		
			status.error("\n ****** ERREUR DE LA RECHERCHE des users ******* \n");
			
			
		}
	});
	
	
	
	function setChannelForUser(channelToAdd, userMatch) {
	
		//on va recup son / ses installation lié
		var queryInstallation = new Parse.Query(Parse.Installation);
	
	 	queryInstallation.equalTo("user",userMatch)
	 	
	 	queryInstallation.find({
			success: function(installationsMatch) {
			
				if (installationsMatch.length > 0) {
		
					//pour chaque installation on ajoute les channels du tableau à ces installations
					for (var i = 0 ; i < installationsMatch.length ; i++) {
						
						for (var j = 0 ; j < channelToAdd.length ; j++) {
						
							installationsMatch[i].addUnique("channels", channelToAdd[j] );
						
						}
						
						//on save l'installation
						installationsMatch[i].save(null, { 
							
							success: function(installations) {
								
								totalInstallationSaved++;			  
								status.message(" installation save with the new channel array. number : "+ totalInstallationSaved);
								if (totalInstallationToFind == totalInstallationSaved) {
									status.success();
								}
								
							},
							error: function() {
								// An error occurred while saving one of the objects.
								status.message("error saving the new installation");
							}
						
						});
						
						
					}
				
				
				
				}
		
			},
			error: function() {
			
				status.message("\n ****** ERREUR DE LA RECHERCHE des users ******* \n");
				
				
			}
		});
	
	};
	

});

Parse.Cloud.define("inviteFriendsParams", function(request, response) {

	var result = {forceFriends: false, numberToAdd: 3};
	response.success(result);

});

/*
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
		     
	var username = request.object.get("username");

	//request.object.set("hasSeenFriends", true);

	//si il n'y as pas de majuscule on ne fait rien
 	if (username == username.toLowerCase()) {
 	
 		response.success();	
 	
 	//si il y a une maj alors on set un newUsername sans maj
 	}  else {
 	  
 	  	//on check si il n'y a pas un user avec le meme nom
		var User = Parse.Object.extend("User");
		var queryUser = new Parse.Query(User);
		var lowerCaseUsername = username.toLowerCase();
		
		queryUser.equalTo("username", lowerCaseUsername);
		
		
		queryUser.first({
			success: function(userFind) {
			
				//si il y en a un error
				if (userFind) {
					
					response.error();
					
				} else {
				//si il y en a pas on save	
					
				  console.log("on enregistre le new username sans majuscule");
			      var newUsername = username.toLowerCase();
			      request.object.set("usernameNew",newUsername );	
			      
			      response.success();	
			      			
					
				}
				
				
 	  
 		  },
		  error: function() {
		  
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    console.log('Failed to save the new username');
		    response.error();	
		    
		  }
		});
      
    }
	

});*/


Parse.Cloud.afterSave(Parse.User, function(request, response) {
	Parse.Cloud.useMasterKey();
	
	
	if (request.object.get("usernameNew")) {
		
		console.log("il y a un usernameNew");
		
		if ( request.object.get("usernameNew") != "") {
		
		console.log("il n'est pas vide, on enregistre le new username et on vire usernameNew");
		
			var newUsername = request.object.get("usernameNew");
			request.object.set("username", newUsername);
			request.object.set("usernameNew", "");
			request.object.set("password", newUsername);
			
			request.object.save(null, {
			  success: function(pikiSaved) {
			  	
			    console.log("on a bien save");
			   
			   
			    
			  },
			  error: function(result, error) {
			    //on a pas pu save le piki
			    response.error();
			  }
			});

			
		} else {
		}
		
	}else {
	}
	
	if (!request.object.existed()) {
	
			var msg = "@" + request.object.get("username") + " just signup on Pleek!";
			var channelName = "#newuser";
			var usernameName = "Pleek users";
		
		  return slack.send({text: msg, channel: channelName,  username : usernameName}).then(function(){
		    // success
		    console.log("new user sur slack added");
		  }, function(error){
		    // error
		  });
		  
	}
	

	
	
});


Parse.Cloud.define("sendSMS", function(request, response) {
 	
 	var number = numberTab[Math.floor(Math.random()*numberTab.length)];
  
    // Send an SMS message
    client.sendSms({
        to: request.params.phoneNumber, 
        from: number, 
        body: 'Here is the Pleek! AppStore & Google Play link : http://pleekapp.com/gettheapp/  See you soon on the app! ' 
      }, function(err, responseData) { 
        if (err) {
          console.log(err);
        } else { 
          response.success("sms send appstore link from website");
        }
      }
    );
 
});   



Parse.Cloud.afterSave(Parse.Installation, function(request, response) {

	Parse.Cloud.useMasterKey();
	
	var installationSaved = request.object;

	if (!request.object.existed() || !request.object.get("channelClean")) { 

		if (installationSaved.get("user")){

			var queryInstallation = new Parse.Query(Parse.Installation);
		 	queryInstallation.equalTo("user",installationSaved.get("user"));
		 	queryInstallation.notEqualTo("objectId", request.object.id);
		 	queryInstallation.include("user");
		 	queryInstallation.find().then(function(installationsFound){

		 		//If he already had installations, we copy paste their channels in the new installation
		 		if (installationsFound.length > 0){
		 			installationSaved.set("channels", installationsFound[0].get("channels"));
		 			installationSaved.set("channelClean",true);
		 			installationSaved.save();
		 		}
		 		//else add a channel for each friends 
		 		else{

		 			friend.getFriends(installationSaved.get("user"), false).then(function(friendsObjects){

		 				_.each(friendsObjects, function(friendObject){

		 					var channelName = "channel_" + friendObject.get("friendId");
							installationSaved.addUnique("channels", channelName);

		 				})

		 				installationSaved.set("channelClean",true);
		 				installationSaved.save();
		 					
		 			});

		 		}

		 	})

		}

	}
 	
});

//**********************//
// send push new Comment
//**********************//

Parse.Cloud.define("sendPushNewComment", function(request, response){

	//If public adapt the push sent
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	queryPiki.include("user");

	queryPiki.get(request.params.pikiId).then(function(pikiFind){

		if (pikiFind){

			//Send Push new react
			react.pushForNewReact(pikiFind, request.user).then(function(){
				response.success("Pushes Sent");

			}, function(error){
				response.error(error);
			})

		}
		else{

			response.error("Pleek not found");

		}

	}, function(error){

		response.error(error);

	});

});


//**********************//
// create thumbnail piki
//**********************//
Parse.Cloud.afterSave("React", function(request, response) {
	Parse.Cloud.useMasterKey();
	
 	var reactObject = request.object;

 	if (!request.object.existed()){

 		var imageToCropName = "photo";

 		if (reactObject.get("video")){

 			imageToCropName = "previewImage";

 		}

 		//Cropp 
 		Parse.Cloud.httpRequest({
	        url: reactObject.get(imageToCropName).url()
	      
	    }).then(function(response) {
	        var image = new Image();
	        return image.setData(response.buffer);
	      
	    }).then(function(image) {
	        // Resize the image to 64x64.
	        return utils.cropImage(image, 120, 120, "thumbnail");
	      
	    }).then(function(cropped) {
	        // Attach the image file to the original object.
	        reactObject.set("smallPhoto", cropped);
	        return reactObject.save();
	      
	    }).then(function(result) {
	    	var promises = [];
	        
	        promises.push(react.createLastReacts(request.object.get("Piki"), true));
	        promises.push(react.updateLastUpdateReact(request.object.get("Piki")));

	        return Parse.Promise.when(promises);

	    }).then(function(){
	    	console.log("**** GOOD **** : After Save React succeeded");
	        
	    }, function(error) {
	        console.log("*** ERROR *** :" + error);
	    });

 	}

 });


//**********************//
// create thumbnail piki
//**********************//

Parse.Cloud.afterSave("Piki", function(request, response) {


	Parse.Cloud.useMasterKey();
	
 	var piki = request.object;
 	var imageToResize;
 	

 	if(!request.object.existed()){

 		//VIDEO PLEEK
 		if (piki.get("video")){
 			var nowDate = new Date();
			piki.set("lastUpdate" , nowDate);
			piki.set("extraSmallPiki" , piki.get("previewImage"));
			piki.save();
 		}
 		//PHOTO PLEEK
 		else{
 			Parse.Cloud.httpRequest({
	        	url: piki.get("photo").url()
	      
	      	}).then(function(response) {
	        	var image = new Image();
	        	return image.setData(response.buffer);
	      

	      
	      	}).then(function(image) {
	     		imageToResize = image;

	        	return utils.cropImage(image, 550, 550, "thumbnail");

	      
	      	}).then(function(croppedBig) {
	        	// Attach the image file to the original object.
	        	piki.set("smallPiki", croppedBig);
	        

	        	return utils.cropImage(imageToResize, 375, 375, "thumbnail");

	      	}).then(function(croppedSmall){

	      		var nowDate = new Date();
	        	piki.set("lastUpdate" , nowDate);
	      		piki.set("extraSmallPiki", croppedSmall);
	      		return piki.save();

	      	}).then(function(result) {
	        	console.log("*** Piki thumbnail created ***")
	      	}, function(error) {
	        	console.log("*** ERROR *** : " + error);
	      	});
 		}


 		//If the pleek is private we increment friendscores 
 		if (piki.get("isPublic") == false) {
	 	
	 		//si privé on recupere les recipients
	 		var recipients = piki.get("recipients");

	 		friend.incrementBestScoreMultiUsers(request.user, recipients).then(function(){
	 			console.log("increment scores");
	 		})

	 	
 		}

 	}

   
});


Parse.Cloud.define("addToFirstUsePiki", function(request, response) {

	//ADD TEAM PLEEK, TODO : ADD MYSELF
	var promises = [];

	//Add myself
	promises.push(friend.addFriend(request.user, request.user.id));

	//Add teampleek
	promises.push(friend.addFriend(request.user, pikiTeamId));

	Parse.Promise.when(promises).then(function(){
		response.success("**** PLEEKTEAM ADDED ****");
	}, function(error){
		response.error("**** ERROR ADDING PLEEKTEAM ****");
	})

});

/*************************************************************
**************      envoi sms confirmation     *************
*************************************************************/
Parse.Cloud.define("confirmPhoneNumber", function(request, response) {

	var randomNumber = Math.floor((Math.random() * 8999) + 1000);

	if (!isProd){
		randomNumber = 1988;
	}
	

	var result = []; 

	//Pick a number for Twillio service
	var number = numberTab[Math.floor(Math.random()*numberTab.length)];
	
 	Parse.Cloud.useMasterKey();
	
	//Get a userInfos with this phone Number
	var innerQuery = new Parse.Query(Parse.Object.extend("UserInfos"));
	innerQuery.equalTo("phoneNumber", request.params.phoneNumber);
	
	//Find user that match the userInfos found
	var query = new Parse.Query(Parse.User);
	query.matchesQuery("userInfos", innerQuery);


	query.find().then(function(userMatch){

		//A user already exists, he is trying to log in
		if (userMatch.length > 0){

			// Send an SMS message
				client.sendSms({
				    to: request.params.phoneNumber, 
				    from: number, 
				    body: 'Pleek! confirmation code : ' + randomNumber
				  }, function(err, responseData) { 

				    if (err) { 
				    	console.log("sms NOT sent : " + err + " \n reponse : " + responseData); 
				      	response.error("Failed to send the SMS");
				    } 
				    else { 
				    	console.log("sms sent confirmation for existed user : " + userMatch[0].get("username")); 
					  	//We send the username of the first user found
			 		  	result.push({
						  	randomNumber:   randomNumber,
						  	username: userMatch[0].get("username")
					  	});
			 		  	response.success(result);
				      
				    }
				});

		}
		//New user
		else{
			// Send an SMS message
			client.sendSms({
			    to: request.params.phoneNumber, 
			    from: number, 
			    body: 'Pleek! confirmation code : ' + randomNumber
			  }, function(err, responseData) { 

			    if (err) { 
			    	console.log("sms NOT sent. Status : " + err.status + " \n Message : " + err.message ); 
			      	response.error("Failed to send the SMS : " + err );
			      
			    } 
			    else { 
			    	console.log("sms sent confirmation for new user"); 
			      	result.push({
				    	randomNumber:   randomNumber
				  	});
				  	response.success(result);
			      	
			    }
			});
		}

	}, function(error){
		response.error("Failed to send the SMS : " + error);
	});


});


/*************************************************************
**************      Check des contacts      *************
*************************************************************/

Parse.Cloud.define("checkContactOnPiki", function(request, response) {

 	Parse.Cloud.useMasterKey();
 	
 	var result = []; // create an empty array
 	
 	//si il y a des phones numbers 
 	if (request.params.phoneNumbers) {
 	
	 	var phoneNumbers = request.params.phoneNumbers;
	 	
 	}
 	
 	else {
 	
	 	response.error("no phone numbers send");
 	
 	}
 	
 	
 	//console.log("voila les phones number : \n" + phoneNumbers);
 	
	var User = Parse.Object.extend("User");
	var UserInfos = Parse.Object.extend("UserInfos");
	
	var innerQuery = new Parse.Query(UserInfos);
	innerQuery.containedIn("phoneNumber", phoneNumbers);
	
	var query = new Parse.Query(User);
	query.matchesQuery("userInfos", innerQuery);
	query.include("userInfos");
	
	query.find({
	 success: function(userMatch) {
	 
	 	if (userMatch) {
		 	if (userMatch.length >0) {
		 	
		 		console.log("\n\n\n On a trouvé : " + userMatch.length + "des contacts qui étaient déjà inscrits ! \n\n\n");
			 	
			 	for (var i = 0; i < userMatch.length; i++) {
			 	
				 	result.push({
						  username: userMatch[i].get("username"),
						  userObjectId : userMatch[i].id,
						  phoneNumber : userMatch[i].attributes.userInfos.attributes.phoneNumber
					  });
				  
				}
				
				
				console.log(result);
				
				//si on avait déjà envoyé le push a ses amis
				if (request.user.get("firstContactCheck")) {
					
					response.success(result);
					
				} else {
					
					
					  var message = "Your friend @" + request.user.get("username") + " is now on the App! Send her / him a welcome Pleek! ? 😉" ;
					  
					  // Send the push.
					  // Find devices associated with the recipient user
					  var pushQuery = new Parse.Query(Parse.Installation);

					  
					  pushQuery.containedIn("user",userMatch);
					  pushQuery.notEqualTo("notificationsEnabled", false);
					  
					  // Send the push notification to results of the query
					  Parse.Push.send({
						  where: pushQuery, // Set our Installation query
						  data: {
						    alert: message,
						    badge : "Increment",
							sound : "default",
							type : "newFriend",
							"content-available" : 1
						  }
						}, {
						  success: function() {
						    // Push sent successful
						    console.log("New Piki push send");
						    
						    request.user.set("firstContactCheck" , true);
						    
						    //Saving all the installations
							request.user.save(null, { 
							
								success: function(installations) {
													  
	
									response.success(result);
								
								},
								error: function(error) {
									// An error occurred while saving one of the objects.
									response.error(error);
								}
							
							});
						    
						  },
						  error: function(error) {
						    // Handle error
						    console.log("Error while sending new Piki push");
						    response.error();
						  }
						});
					}
	
	
		 	}else {
		 	
			 	console.log("\n\n\n On a pas trouvé de contacts \n\n\n");
			 	response.success(result);
			 	
		 	}
		 }
	 
	 
	 },
	  error: function() {
	    console.log("Error: finding the user for contact");
	  }
	});
});

/*************************************************************
**************      save Piki  *************
*************************************************************/
Parse.Cloud.define("savePiki", function(request, response) {
	Parse.Cloud.useMasterKey();

	//private
	if (request.params.recipients){
		utils.pushNewPleek(request.user, request.params.pikiId, request.params.recipients).then(function(){

		}).then(function(){

			response.success("Push Sent");

		}, function(error){

			response.error(error);

		});
	}
	else{
		utils.pushNewPleek(request.user, request.params.pikiId).then(function(){

		}).then(function(){

			response.success("Push Sent");

		}, function(error){

			response.error(error);
			
		});
	}
		

});
		
/*************************************************************
**************      fonction Add to the last public piki of a user   *************
*************************************************************/
Parse.Cloud.define("addToLastPublicPiki", function(request, response) {	
	Parse.Cloud.useMasterKey();	
		
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	var User = Parse.Object.extend("User");
	var friendUserObject = new User();
	
	friendUserObject.id = request.params.friendId;
	
	//on va recup les pikis posté par le friend
	queryPiki.equalTo("user",friendUserObject);
	
	//on cherche les pikis public
	queryPiki.equalTo("isPublic",true);
	
	//on ne prend que le dernier
	queryPiki.descending("createdAt");
	
	
	queryPiki.first({
	  success: function(lastPikiObject) {
	  
	  	if (lastPikiObject) {
				    
				    
				    //on save le friends avec le user en ami
				    lastPikiObject.addUnique("recipients",request.user.id);
				    
				   lastPikiObject.save(null, {
					  success: function(friendsSaved) {			  
					  
					  
						  response.success("user added to the last public piki of this new friend");
					 
					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    console.log('Failed to save the new recipient in user');
					    response.error("fail to save the piki for the new friend")
					    
					  }
					});
		
		}
		
		else {
			response.success("no public piki for this friend")
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the friends");
	    response.error("can't find the friend");
	  }
	});
	
	




});

/*************************************************************
**************      fonction hide ou remove Piki   *************
*************************************************************/
Parse.Cloud.define("hideOrRemovePikiV2", function(request, response) {	

	Parse.Cloud.useMasterKey();	
	var pikiId = request.params.pikiId

	var queryPiki = new Parse.Query(Parse.Object.extend("Piki"));
	queryPiki.get(pikiId).then(function(pikiObject){

		if (pikiObject){

			//If user is owner of the pleek, delete it
			if(pikiObject.get("user").id == request.user.id){
				return pikiObject.destroy();
			}
			//User not owner, if private modify the ACL
			else{
				if(!pikiObject.get("isPublic")){
					//remove from the recipients
					var recipients = _.without(pikiObject.get("recipients"), request.user.id)
					pikiObject.set("recipients",recipients);

					//Set the new ACL
					var newACL = new Parse.ACL()
					newACL.setWriteAccess(pikiObject.get("user").id, true)

					_.each(recipients,function(recipient){
						console.log("User to put in ACL : "+recipient);
						newACL.setReadAccess(recipient, true)
					})
					pikiObject.setACL(newACL);
					return pikiObject.save();


				}
				else{
					return Parse.Promise.as("Nothing to do, public pleek")
				}
			}

		}
		else{
			response.error("Pleek not found")
		}

	}).then(function(){
		response.success("Done");
	}, function(error){
		response.error(error);
	})

});

Parse.Cloud.define("hideOrRemovePiki", function(request, response) {	

	Parse.Cloud.useMasterKey();	
	
	var pikiId = request.params.pikiId;
		
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	//on va recup les pikis posté par le friend
	queryPiki.equalTo("objectId",pikiId);
	
	queryPiki.first({
	  success: function(pikiObject) {
	  
	  	if (pikiObject) {
				    
			//si le user est le owner on delete le piki
			if (pikiObject.get("user").id == request.user.id) {
				
				pikiObject.destroy({
				  success: function(pikiDestroy) {
				    // The object was deleted from the Parse Cloud.
				    response.success("piki has been deleted");
				  },
				  error: function(error) {
				    response.error("fail to delete the piki")
				  }
				});
				
			//si le user n'est pas le owner, alors on le hide (enleve de la liste des recipients)
			} else {
				
				console.log("la tableau de recipient avant : " + pikiObject.get("recipients"));
				
				var positionUserId = pikiObject.get("recipients").indexOf(request.user.id);
				
				console.log("user id a la position : " + positionUserId);
				
				var recipientsTabNew= pikiObject.get("recipients");
				recipientsTabNew.splice(positionUserId, 1);
				
				pikiObject.set("recipients",recipientsTabNew);
				console.log("la tableau de recipient apres : " + pikiObject.get("recipients"));
				
			    
			   pikiObject.save({
				  success: function(pikiSaved) {			  
				  
				  
					  response.success("piki saved without this user");
				 
				    
				  },
				  error: function() {
				  
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    console.log('Failed to save the new recipient in user');
				    response.error("fail to save the piki without this user")
				    
				  }
				});
				
			}    
		
		}
		
		else {
			response.success("no piki find :/")
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the pikiId");
	    response.error("can't find the piki");
	  }
	});
	
	




});

/*************************************************************
**************      fonction remove or remove the react   *************
*************************************************************/
Parse.Cloud.afterDelete("React", function(request) {
	Parse.Cloud.useMasterKey();
  
	var queryPleek = new Parse.Query(Parse.Object.extend("Piki"));
	queryPleek.get(request.object.get("Piki").id).then(function(pleek){
		var promises = [];
		pleek.increment("nbReaction", -1);

		promises.push(pleek.save());
		promises.push(react.createLastReacts(pleek, false));

		return Parse.Promise.when(promises);

	}).then(function(){

	}, function(error){
		console.log("*** ERROR after delete React : "+error+" ***");
	})

});


Parse.Cloud.define("reportOrRemoveReact", function(request, response) {	

	Parse.Cloud.useMasterKey();	
	var reactId = request.params.reactId;

	//Query React
	var queryReact = new Parse.Query(Parse.Object.extend("React"));
	queryReact.include("Piki");
	queryReact.get(reactId).then(function(reactObject){

		//All these persons can remove the react
		if (_.contains([reactObject.get("user").id, reactObject.get("Piki").get("user").id, pikiTeamId, remiId, cyrilId], request.user.id)){
			return reactObject.destroy();
		}
		//Else we just report the react
		else{
			reactObject.addUnique("reported",request.user.id);
			return reactObject.save();
		}

	}).then(function(){
		response.success("React removed or reported");
	}, function(error){
		response.error(error);
	});

});


/*************************************************************
**************      report a piki  *************
*************************************************************/
Parse.Cloud.define("reportPiki", function(request, response) {	

	Parse.Cloud.useMasterKey();	
	
	var pikiId = request.params.pikiId;
		
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	//on va recup les pikis posté par le friend
	queryPiki.equalTo("objectId",pikiId);
	
	queryPiki.first({
	  success: function(pikiObject) {
	  
	  	if (pikiObject) {
				
				
			   pikiObject.addUnique("reported",request.user.id);
			    
			   pikiObject.save(null, {
				  success: function(pikiSaved) {			  
				  
				  
					  response.success("piki saved with one more report count");
				 
				 
				    
				  },
				  error: function() {
				  
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    response.error("fail to save the piki with one more report count")
				    
				  }
				}); 
		
		}
		
		else {
			response.success("no piki find :/")
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the piki");
	    response.error("can't find the piki");
	  }
	});

});

/*************************************************************
**************      fonction Add Friends   *************
*************************************************************/
Parse.Cloud.define("addFriendV2", function(request, response){
	Parse.Cloud.useMasterKey();
	var user = request.user;
	var friendId = request.params.friendId;
	var friendObject;


	//Add a friend
	friend.addFriend(user, friendId).then(function(friendObject){
		response.success(friendObject);
	}, function(error){
		response.error(error);
	})


});


Parse.Cloud.define("addFriend", function(request, response) {	
	Parse.Cloud.useMasterKey();	

	response.error("Please update the app");
		
	var userObject = request.user;
		
	var User = Parse.Object.extend("User");
	var queryUser = new Parse.Query(User);
	
	//on va recup l'object user du friends
	queryUser.equalTo("objectId",request.params.friendId);
	queryUser.first({
	  success: function(friendsObject) {
	  
	  	if (friendsObject) {
				    
				    //on save le friends avec le user en ami
				    friendsObject.addUnique("usersFriend",request.user.id);
					
					//on save le user avec le new friends en ami
				    userObject.addUnique("usersFriend",friendsObject.id);
				    
				    //si c'est un user qui a active le userMutedOn
				    if (friendsObject.get("isMuteModeEnabled")== true) {
						friendsObject.addUnique("usersIMuted",request.user.id);
						userObject.addUnique("usersWhoMutedMe",friendsObject.id);
					}
				    
				    
				    Parse.Object.saveAll([userObject,friendsObject] , {
					  success: function(friendsSaved) {			  
					  
					  
					  	  //on ajoute les users à leurs channels
							var query = new Parse.Query(Parse.Installation);
							var changedObjects = [];
							
							query.containedIn("user",friendsSaved);
							query.find({
								success: function(installations){
								
									for (var i = 0; i < installations.length; i++){
									
										//pour le user on le rajoute au channel du friends
										if(installations[i].get("user").id == request.user.id) {
										
											var channelName = "channel_" + friendsObject.id;
										
											//console.log("on a ajoute le friends au channel du user");
											
										//pour le friends on le rajoute au channel du user
										} else if (installations[i].get("user").id == friendsObject.id){
										
											var channelName = "channel_" + request.user.id;
											//console.log("on a ajoute le user au channel du friend");
											
											if (friendsObject.get("isMuteModeEnabled")== true) {
												channelName = "";
												
											}
											
										} else {
											response.error();
										}
										// Add the channel to all the installations for this user
										installations[i].addUnique("channels", channelName); //Add the channel to the installation
										changedObjects.push(installations[i]); //Add the installation to be saved later on!
										
									}
									
								
									//Saving all the installations
									Parse.Object.saveAll(changedObjects, { 
									
										success: function(installations) {
											
										  //si le friends n'est pas en muted mode alors on le push
										  if (friendsObject.get("isMuteModeEnabled") != true) {
															  
										  // Send the push.
										  // Find devices associated with the recipient user
										  var pushQuery = new Parse.Query(Parse.Installation);
										  pushQuery.equalTo("user",friendsObject);
										  pushQuery.notEqualTo("notificationsEnabled", false);
										  
										  var message = "@" + request.user.get("username") + " is now friend with you on Pleek!! 😎";
										  
										  
										  
										  // Send the push notification to results of the query
										  Parse.Push.send({
											  where: pushQuery, // Set our Installation query
											  data: {
											    alert: message,
											    badge : "Increment",
												sound : "default",
												type : "newFriends",
												"content-available" : 1
											  }
											}, {
											  success: function() {
											    // Push sent successful
											    //console.log("New Piki push send");
											    response.success(friendsObject);
											  },
											  error: function(error) {
											    // Handle error
											    //console.log("Error while sending new Piki push");
											    response.error();
											  }
											});
											
											} else {
												response.success(friendsObject);
											}
											
										
										},
										error: function(error) {
											// An error occurred while saving one of the objects.
											response.error();
										}
									
									});
								},
								error: function(error) {
								response.error();
								}
							});						
					 
					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    //console.log('Failed to save the new recipient in user');
					    
					  }
					});
		
		}
		
	    
	    
	  },
	  error: function() {
	    //console.log("Error: finding the friends");
	  }
	});
	
	




});

/*************************************************************
**************      fonction Add Friends   *************
*************************************************************/
Parse.Cloud.define("removeFriendV2", function(request, response){
	Parse.Cloud.useMasterKey();
	var user = request.user;
	var friendId = request.params.friendId;
	var friendObject;


	var queryFriend = new Parse.Query(Parse.Object.extend("Friend"));
	queryFriend.equalTo("user", user);
	queryFriend.equalTo("friendId", friendId);
	queryFriend.first().then(function(friendObject){

		if (friendObject){
			return friendObject.destroy();
		}
		else{
			Parse.Promise.error("User is not a friend");
		}

	}).then(function(){

		//Get the installation of the user
		var queryInstallations = new Parse.Query(Parse.Installation);			
		queryInstallations.equalTo("user", user);
		return queryInstallations.find();

	}).then(function(installations){

		var promises = [];

		// Remove the channel from each installation
		var channelName = "channel_" + friendId;
		_.each(installations, function(installation){

			installation.remove("channels", channelName);

		});
		promises.push(Parse.Object.saveAll(installations));

		//Modify user object
		user.increment("nbFriends", -1);
		user.set("lastFriendsModification", new Date());
		promises.push(user.save());

		//Save in parrallel the installations and the user
		return Parse.Promise.when(promises);
	}).then(function(){

		response.success("Friend removed");

	}, function(error){
		response.error(error);
	})

});


Parse.Cloud.define("removeFriend", function(request, response) {
	response.error("Please update the app");

	Parse.Cloud.useMasterKey();	
		
	var User = Parse.Object.extend("User");
	var queryUser = new Parse.Query(User);
	
	//on va recup l'object user du friends
	queryUser.equalTo("objectId",request.params.friendId);
	queryUser.first({
	  success: function(friendsObject) {

			if (friendsObject) {
				
					friendsObject.remove("usersFriend",request.user.id);			
					request.user.remove("usersFriend",friendsObject.id);

				    
				    Parse.Object.saveAll([request.user,friendsObject] , {
					  success: function(newFriendsObject) {		  


					  	  //on ajoute les users à leurs channels
							var query = new Parse.Query(Parse.Installation);
							var changedObjects = [];
							
							query.containedIn("user",newFriendsObject);
							query.find({
								success: function(installations){
								
									for (var i = 0; i < installations.length; i++){
									
										//pour le user on le rajoute au channel du friends
										if(installations[i].get("user").id == request.user.id) {
										
											var channelName = "channel_" + friendsObject.id;
											
										//pour le friends on le rajoute au channel du user
										} else if (installations[i].get("user").id == friendsObject.id){
										
											var channelName = "channel_" + request.user.id;
											
										} else {
											response.error("can't find the channel name");
										}
										
										// Add the channel to all the installations for this user
										installations[i].remove("channels", channelName); //Add the channel to the installation
										changedObjects.push(installations[i]); //Add the installation to be saved later on!
										
									}
									
									//Saving all the installations
									Parse.Object.saveAll(changedObjects, { 
									
										success: function(installations) {
										 	
										 	//on check quels recipients on déja un score avec le user
											var friendshipScore = Parse.Object.extend("friendshipScore");
											var queryfriendshipScore = new Parse.Query(friendshipScore);
											
											queryfriendshipScore.equalTo("user", request.user);
											queryfriendshipScore.equalTo("friendId", friendsObject.id);
											
											queryfriendshipScore.first({
												success: function(friendshipFind) {
												
													//si il y en a un error
													if (friendshipFind) {
														
																		
														friendshipFind.destroy({
														  success: function(pikiDestroy) {
														    // The object was deleted from the Parse Cloud.
														    response.success("friend remove and friendship Score deleted");
														  },
														  error: function(error) {
														    response.error("fail to delete the friendship score")
														  }
														});
														
													} else {
														response.success("friends remove, no friendship Score finded");
													}
													
													
													
									 	  
									 		  },
											  error: function() {
											  
											    // Execute any logic that should take place if the save fails.
											    // error is a Parse.Error with an error code and message.
											    console.log('Failed to find the existing friendshipScore to delete after removing friends');
											    response.error();	
											    
											  }
											});
											
										},
										error: function(error) {
											// An error occurred while saving one of the objects.
											response.error(error);
										}
									
									});
									
									
								},
								error: function(error) {
								response.error(error);
								}
							});	

							

					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    console.log('Failed to save the new recipient in user');
					    response.error('Failed to save the new recipient in user');
					    
					  }
					});
				
				
			}
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the friends");
	    response.error("Error: finding the friends");
	  }
	});






});

/*************************************************************
**************      fonction mute   *************
*************************************************************/
Parse.Cloud.define("muteFriend", function(request, response) {	
	Parse.Cloud.useMasterKey();	
		
	var User = Parse.Object.extend("User");
	var queryUser = new Parse.Query(User);
	
	var userThatMute = request.user;
	
	//on va recup l'object user du friends
	queryUser.equalTo("objectId",request.params.friendId);
	queryUser.first({
	  success: function(friendsObject) {
	  
	  	if (friendsObject) {
				    
				    //on save le friends avec le user en ami
				    friendsObject.addUnique("usersWhoMutedMe",userThatMute.id);
				    //on save le user avec le friends en mute
				    userThatMute.addUnique("usersIMuted",request.params.friendId);
					
				    
				    Parse.Object.saveAll([friendsObject, userThatMute], {
					  success: function(friendSaved) {			  
					  
					  
					  	  //on ajoute les users à leurs channels
					  	  
							var query = new Parse.Query(Parse.Installation);
							var changedObjects = [];
							
							query.equalTo("user",request.user);
							query.find({
								success: function(installations){
										
										var channelName = "channel_" + request.params.friendId;
											
										for (var i = 0; i < installations.length; i++){
										
											// Add the channel to all the installations for this user
											installations[i].remove("channels", channelName); //Add the channel to the installation
											changedObjects.push(installations[i]); //Add the installation to be saved later on!
											
										}
								
								
									//Saving all the installations
									Parse.Object.saveAll(changedObjects, { 
									
										success: function(installations) {
															  

											response.success(request.user);
										
										},
										error: function(error) {
											// An error occurred while saving one of the objects.
											response.error(error);
										}
									
									});
								},
								error: function(error) {
								response.error(error);
								}
							});						
					 
					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    console.log('Failed to save the new recipient in user');
					    
					  }
					});
		
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the friends");
	  }
	});
	
	




});

/*************************************************************
**************      fonction unMute   *************
*************************************************************/
Parse.Cloud.define("unMuteFriend", function(request, response) {	
	Parse.Cloud.useMasterKey();	
		
	var User = Parse.Object.extend("User");
	var queryUser = new Parse.Query(User);
	
	//on va recup l'object user du friends
	queryUser.equalTo("objectId",request.params.friendId);
	queryUser.first({
	  success: function(friendsObject) {
	  
	  	if (friendsObject) {
				    
				    //on save le friends avec le user en ami
				    friendsObject.remove("usersWhoMutedMe",request.user.id);
				    request.user.remove("usersIMuted",request.params.friendId);
					
				    
				    Parse.Object.saveAll( [request.user, friendsObject], {
					  success: function(friendSaved) {			  
					  
					  
					  	  //on ajoute les users à leurs channels
							var query = new Parse.Query(Parse.Installation);
							
							query.equalTo("user",request.user);
							query.find({
								success: function(installations){
										
										var channelName = "channel_" + request.params.friendId;
										var changedObjects = [];
											
										for (var i = 0; i < installations.length; i++){
											// Add the channel to all the installations for this user
											installations[i].addUnique("channels", channelName); //Add the channel to the installation
											changedObjects.push(installations[i]); //Add the installation to be saved later on!
											
										}
								
									//Saving all the installations
									Parse.Object.saveAll(changedObjects, { 
									
										success: function(installations) {
															  

											response.success("user " + request.params.friendsId + " muted");
										
										},
										error: function(error) {
											// An error occurred while saving one of the objects.
											response.error(error);
										}
									
									});
								},
								error: function(error) {
								response.error(error);
								}
							});						
					 
					    
					  },
					  error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    console.log('Failed to save the new recipient in user');
					    
					  }
					});
		
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the friends");
	  }
	});
	
	




});



/////////////////// START ////////////////////////////////
////////////////// STATS ////////////////////////////////
////////////////////////////////////////////////////////

Parse.Cloud.job("generateDayStats", function(request, status) {
	Parse.Cloud.useMasterKey();	
	var promises = []

	//Date of yesterday
	var dateYesterday = new Date();
	dateYesterday.setDate(dateYesterday.getDate() - 2);
	dateYesterday.setHours(22)
	dateYesterday.setMinutes(0)
	dateYesterday.setSeconds(0)

	// Date of today
	var dateToday = new Date();
	dateToday.setDate(dateToday.getDate() - 1);
	dateToday.setHours(22)
	dateToday.setMinutes(0)
	dateToday.setSeconds(0)


	//NB USER TODAY
	var query = new Parse.Query(Parse.User);
	query.greaterThan("createdAt", dateYesterday)
	query.lessThan("createdAt", dateToday)
	promises.push(query.count())

	//NB REACT TODAY
	var queryReact = new Parse.Query(Parse.Object.extend("React"));
	queryReact.greaterThan("createdAt", dateYesterday)
	queryReact.lessThan("createdAt", dateToday)
	promises.push(queryReact.count())

	//NB PLEEK TODAY
	var queryPleek = new Parse.Query(Parse.Object.extend("Piki"));
	queryPleek.greaterThan("createdAt", dateYesterday)
	queryPleek.lessThan("createdAt", dateToday)
	promises.push(queryPleek.count())

	Parse.Promise.when(promises).then(function(nbUser, nbReact, nbPleek){

		var msg = "Stats of yesterday : \n 👦 New Users : "+nbUser+" \n 📷 Pleek sent : "+nbPleek+" \n ✉️ React sent : "+nbReact;
		var channelName = "#stats";
		var usernameName = "Day Stats";
		
		return slack.send({text: msg, channel: channelName,  username : usernameName});

	}).then(function(){
		status.success("Day Stats");
	}, function(error){
		status.error("Error :"+error);
	})

});


Parse.Cloud.job("generateForeverStats", function(request, status) {
	Parse.Cloud.useMasterKey();	
	var promises = [];

	// Date of today
	var dateToday = new Date();
	dateToday.setDate(dateToday.getDate() - 1);
	dateToday.setHours(22);
	dateToday.setMinutes(0);
	dateToday.setSeconds(0);

	//NB USER TODAY
	var query = new Parse.Query(Parse.User);
	query.lessThan("createdAt", dateToday);
	promises.push(query.count());

	//NB REACT TODAY
	var queryReact = new Parse.Query(Parse.Object.extend("React"));
	queryReact.lessThan("createdAt", dateToday);
	promises.push(queryReact.count());

	//NB PLEEK TODAY
	var queryPleek = new Parse.Query(Parse.Object.extend("Piki"));
	queryPleek.lessThan("createdAt", dateToday);
	promises.push(queryPleek.count());

	Parse.Promise.when(promises).then(function(nbUser, nbReact, nbPleek){

		var msg = "📢 General Stats  : \n 👦 Users : "+nbUser+" \n 📷 Pleek sent : "+nbPleek+" \n ✉️ React sent : "+nbReact;
		var channelName = "#stats";
		var usernameName = "General Stats";
		
		return slack.send({text: msg, channel: channelName,  username : usernameName});

	}).then(function(){
		status.success("Stats Generated");
	}, function(error){
		status.error("Error :"+error);
	});

});

/////////////////// STATS ////////////////////////////////
//////////////////   END  ////////////////////////////////
////////////////////////////////////////////////////////

