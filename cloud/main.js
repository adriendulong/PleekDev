// Require and initialize the Twilio module with your credentials
var client = require('twilio')('AC565e7be131da6f810b8d746874fb3774', '8d432341211ffaca933c13dd2e000eea');
var Image = require("parse-image");
var friend = require('cloud/friend.js');
var utils = require('cloud/utils.js');
_ = require('underscore.js')

/* ######## @@@@@@@@ ######## @@@@@@@@ ######## @@@@@@@@ 
   ######## @@@@@@@@ ######## @@@@@@@@ ######## @@@@@@@@ 
Supprimer les fonctions sendPushNewPiki, sendPushNewReact
   ######## @@@@@@@@ ######## @@@@@@@@ ######## @@@@@@@@ 
   ######## @@@@@@@@ ######## @@@@@@@@ ######## @@@@@@@@     */
   
   //DEV VERSION 
   var pikiTeamId = "TMaNfNq0Kl";
   var remiId = "0ufOfqJZM5";
   var adrienId = "8BvQhG1fPu";
   var cyrilId = "MVFSYoDHWb";
   
   var firstUsePeekeeIds = ["fI7hLy3Ian" , "6DYaqoO2aG"];
   var nbRecipientsMaxToPublicPleekPush = 500;
   var ApplicationId = "BA7FMG5LmMRx0RIPw3XdrOkR7FTnnSe4SIMRrnRG";
   var MasterKey = "AKQhW3cNH3y4nwaKovCNhAcUeW6Z4rasX3OdiIkR";
   
   
   
   
   
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

  //Go through all the users
  var query = new Parse.Query(Parse.User);
  //query.doesNotExist("migrationFriendsDone");
  query.each(function(user) {

  	if (counter % 100 === 0) {
        status.message(counter + " users processed.");
    }
    counter += 1;

  	user.set("migrationFriendsDone", false);
  	user.set("ACLsetDone", false);
  	user.set("nbFriends", 0);
  	user.set("nbRecipients", 0);
  	return user.save();

  }).then(function(){

  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Set false to all users done in "+lengthJob+".");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
  });

});


// Migrate all the friends of one user
Parse.Cloud.define("userFriendsMigrationUsersObjects", function(request, response) {

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;
  
  var mainUser;
  var friendsObjects = [];

  //Get the user we want add Friends
  var query = new Parse.Query(Parse.User);
  query.get(request.params.userId).then(function(user){
  	mainUser = user

  	var queryFriend = new Parse.Query(Parse.User);

  	//console.log(user.get("usersFriend"))
  	if (!user.get("usersFriend")){
  		return Parse.Promise.as();
  	}
  	else{
		queryFriend.containedIn("objectId", user.get("usersFriend"));
  	}
  	//Find all the friends User object
  	return queryFriend.find();
  }).then(function(friends){

  	var Friend = Parse.Object.extend("Friend");
  	var promises = [];
    
  	_.each(friends, function(friend){
  		var newFriend = new Friend();
		newFriend.set("friend", friend);
		newFriend.set("friendId", friend.id);
		newFriend.set("user", mainUser);
		newFriend.set("score", 0);
		friendsObjects.push(newFriend);

		promises.push(newFriend.save());
  	})

  	// Create all friends object
    return Parse.Promise.when(promises);

  	
  }).then(function(){

  	mainUser.set("nbFriends", friendsObjects.length);
  	mainUser.set("lastFriendsModification", new Date());
  	mainUser.set("migrationFriendsDone", true);

  	// Add all the PFRelation between the user and the friends
  	return mainUser.save()

  }).then(function(){
  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	response.success("Migration completed successfully in "+lengthJob+".");

  }, function(error) {
    // Set the job's error status
    response.error("Uh oh, something went wrong." + error);
  });

});



// Migrate all the friends of all the user of the base
Parse.Cloud.job("migrateFriendsUsers", function(request, status) {

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;

  //Go through all the users
  var query = new Parse.Query(Parse.User);
  //query.equalTo("migrationFriendsDone", false)
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
  		return Parse.Cloud.httpRequest({
	  		method: 'POST',
	  		url: 'https://api.parse.com/1/functions/userFriendsMigrationUsersObjects',
	  		headers: {
	    	'Content-Type': 'application/json',
	    	'X-Parse-Application-Id' : 'BA7FMG5LmMRx0RIPw3XdrOkR7FTnnSe4SIMRrnRG',
	    	'X-Parse-Master-Key' : 'AKQhW3cNH3y4nwaKovCNhAcUeW6Z4rasX3OdiIkR'
	  	},
	  	body: {
	    	'userId' : user.id
	  	}});
  	}


    

  }).then(function(){

  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Migration completed successfully in "+lengthJob+" for "+counter+" users");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
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

			var message = "@" + userObject.get("username") + " added you on Pleek!! 😎";

			Parse.Push.send({
				where: pushQuery, // Set our Installation query
				data: {
					alert: message,
					badge : "Increment",
					sound : "default",
					type : "newFriend"
				}
			});

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
	

});

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

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
		     
	var username = request.object.get("username");

	//request.object.set("hasSeenFriends", true);

	//si il n'y as pas de majuscule on ne fait rien
 	if (username == username.toLowerCase()) {
 	
 		console.log("pas de maj dans le username ij");
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
	

});

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
	

	
	
});

Parse.Cloud.define("testSlack", function(request, response) {


 var myUrl = '{"text": "This is a line of text in a channel.\nAnd this is another line of text."}';
 var encodedURL= "https://hooks.slack.com/services/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?payload=" + encodeURIComponent(myUrl);

  Parse.Cloud.httpRequest({
	  method: 'POST',
	  url: encodedURL,
	  success: function(httpResponse) {
	    console.log(httpResponse.text);
	    response.success("good");
	  },
	  error: function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status);
	    response.error("not good");
	  }
	});

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


//**********************//
// create thumbnail piki
//**********************//
Parse.Cloud.afterSave(Parse.Installation, function(request, response) {


	Parse.Cloud.useMasterKey();
	
	var installationSaved = request.object;

	/*if (request.object.existed()) { 
		// it existed before 
		console.log("\n\n\n\n\n !!! l'installation existait \n\n\n\n\n");
		
	} else */
	if (!request.object.existed() || !request.object.get("channelClean")) { 
		// it is new 

	 	if (installationSaved.get("user")) {
		 	
		 	//si il existe un user avec deja une installation alors on copie colle les channels
		 	//si pas d'installations existante avec ce user alors on ajoute tout les channels de ses friends - muted
		 	
		 	var queryInstallation = new Parse.Query(Parse.Installation);
		 	
		 	queryInstallation.equalTo("user",installationSaved.get("user"))
		 	queryInstallation.include("user");
		 	
		 	queryInstallation.find({
				success: function(installationsMatch) {
				
					if (installationsMatch.length > 0) {
							
							//on cherche l'installation qui n'est pas la nouvelle et on lui ajoute les channel de l'ancienne installation
							for (var i= 0; i < installationsMatch.length ; i++ ) {
								
								console.log ("installationsMatch[i].id : " + installationsMatch[i].id + " \n installationSaved.id : " + installationSaved.id);
								
								
								
								if (installationsMatch[i].id != installationSaved.id) {
								
									console.log("il existait d'autre installation pour ce meme user installationsMatch.length = " + installationsMatch.length);
									
									
									//si il y a plus d'un resultat : donc déjà un device existant on copie la liste des channels
									if (installationsMatch.length > 1) {
										console.log("on ajoute les channels de l'ancienne installation a cette nouvelle installation");
										installationSaved.set("channels" , installationsMatch[i].get("channels"));
									}
									
								} else if (installationsMatch[i].id ==  installationSaved.id) {
									
									console.log("c'est l'installation que l'on vient de créer");
									
									//si on en a trouve qu'une seule (celle qu'on vient de save) alors on ajoute les channels selon ses amis
									if (installationsMatch.length ==  1){
									
										console.log("il n'en existait pas d'autre pour ce meme user");
									
										//on recup les infos de l'installation qui vient d'être sauve pour avoir son objet user include	
										var channelsTab = [];
										var userFriendsTab = [];
										var userFriendsMutedTab = [];
										
										if (installationsMatch[i].get("user").get("usersFriend")) {
											var userFriendsTab = installationsMatch[i].get("user").get("usersFriend");
										}
										if (installationsMatch[i].get("user").get("usersIMuted")) {
											var userFriendsMutedTab = installationsMatch[i].get("user").get("usersIMuted");
										}
										
										for (var j = 0 ; j < userFriendsTab.length ; j++ ) {
											
											console.log("un pote trouvé à ajoute en channel");
											
											
											
											//si on ne trouve pas l'id du friends dans la table des friends qu'il a muté alors on rajoute le channel
											if (userFriendsMutedTab.indexOf(userFriendsTab[j]) == -1){
											
												console.log("on a ajouté 1 pote");
												
												var channelName = "channel_" + userFriendsTab[j];
												installationSaved.addUnique("channels", channelName);
												
												
											}
											
										}
										
									}
									
								}
								
							}
						
						//on set a true le cleaning pour android
						installationSaved.set("channelClean",true);
						
						//on save l'installation avec les nouveaux channels
						installationSaved.save(null, { 
							
							success: function(installations) {
												  
								console.log("New installation save with the new channel array");
								
							},
							error: function() {
								// An error occurred while saving one of the objects.
								console.log("error saving the new installation");
							}
						
						});

						
					} else {
					
						console.log("\n ****** On a trouvé AUCUNE Installation ! ******* \n");
					
					}
				
				},
				error: function() {
				
					console.log("\n ****** ERREUR DE LA RECHERCHE d'installation ******* \n");
					
					
				}
			});
		 	
		 	
	 	} else {
		 	
		 	console.log("aucun user n'a été associé à cette installation");
		 	
	 	}
	 	
	 	
 	}
 	
 	
});

//**********************//
// send push new Comment
//**********************//

Parse.Cloud.define("sendPushNewComment", function(request, response) {
 
  
  
  //si c'est un piki public alors on ne push pas pour une nouvelle reaction
  if (request.params.isPublic == true) {
  
  
  
  	//on va recup le Pleek!
  	
  	
  	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	
	queryPiki.equalTo("objectId",request.params.pikiId);
	queryPiki.include("user");


	queryPiki.first({
			success: function(pikiFind) {
			
				if (pikiFind) {
				
					var pikiToSave = pikiFind
					
					//on va modifier le lastUpdate selon le nombre et le type de piki
					//si c'est un piki public
					
					
					//si < X recipients. On va pusher certains seuils
					/*if (pikiToSave.get("recipients").length < nbRecipientsMaxToPublicPleekPush) {
					
						
						//on ne remonte la piki que si il y a 10, 100 500, 1500, 3000, 5000 reponses
						if( pikiToSave.get("nbReaction") == 10 ||pikiToSave.get("nbReaction") == 25 || pikiToSave.get("nbReaction") == 100 || pikiToSave.get("nbReaction") == 250 || pikiToSave.get("nbReaction") == 500 || pikiToSave.get("nbReaction") == 1500 || pikiToSave.get("nbReaction") == 3000 || pikiToSave.get("nbReaction") == 50 ) {
							
							  
							  
							 if (pikiToSave.get("nbReaction") == 5) {
							 
							  	var messagePikiOwner = "Pretty Cool! 5 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 😻";
							  
							  } else if (pikiToSave.get("nbReaction") == 10) {
							  
							  	var messagePikiOwner = "Awesome! 10 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 👑";
							  
							  } else if (pikiToSave.get("nbReaction") == 25) {
							  
							  	var messagePikiOwner = "It's making some noise!! 25 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 📢";
							  
							  } else if (pikiToSave.get("nbReaction") == 50) {
							  
							  	var messagePikiOwner = "It's getting big! 50 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 😱";
							  
							  } else if (pikiToSave.get("nbReaction") == 100) {
							  
							  	var messagePikiOwner = "Huge!! 100 answers reach on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟";
							  
							  } else if (pikiToSave.get("nbReaction") == 250) {
							  
							  var messagePikiOwner = "WoOoOooOOw !! 250 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟🌟";
							  
							  } else if (pikiToSave.get("nbReaction") == 500) {
							  
							  var messagePikiOwner = "Buzzzzz! 500 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟🌟🌟🌟🌟";
							  
							  } else {
							  
							  var messagePikiOwner = "@" + pikiToSave.get("user").get("username") + "'s Pleek now has more than " + pikiToSave.get("nbReaction") + " answers ! ";
							  
							  }
							  
												  
							  var channelName = "channel_" + pikiToSave.get("user").id;	
							  
							  var query = new Parse.Query(Parse.Installation);
							  query.equalTo('channels', channelName); // Set our channel
							  query.notEqualTo("notificationsEnabled", false);
							  					  
							  
							  // Send the push notification to results of the query
							  Parse.Push.send({
								  where: query,
								  data: {
								    alert: messagePikiOwner,
								    badge : "Increment",
									sound : "Space_Notification1.wav",
									"content-available" : 1
								  }
								}, {
								  success: function() {
								    // Push sent successful
								    console.log('New react push send');
								    response.success('New react push send en pleek public car seuil de react atteint');
								  },
								  error: function(error) {
								    // Handle error
								    console.log("Error while sending new react push");
								  }
								});				
							
							
							
							
							
							
						} else {
							console.log("on N'A PAS update le last Update car il est public et il avait : " + pikiToSave.get("nbReaction") + " reacts");
							response.success('Pas de push sent car pleek public');
						}
						
						
					//si + X recipients. On va pusher certains seuils au dessus
					} else {*/
					
					
					//on ne remonte la piki que si il y a 10, 100 500, 1500, 3000, 5000 reponses
						if( pikiToSave.get("nbReaction") == 100 || pikiToSave.get("nbReaction") == 250 || pikiToSave.get("nbReaction") == 500 || pikiToSave.get("nbReaction") == 1500 || pikiToSave.get("nbReaction") == 3000 || pikiToSave.get("nbReaction") == 5000 ) {
							
							  
							  
							 if (pikiToSave.get("nbReaction") == 100) {
							 
							  	var messagePikiOwner = "Nice! Already 100 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 👌";
							  
							  } else if (pikiToSave.get("nbReaction") == 250) {
							  
							  	var messagePikiOwner = "Awesome! 250 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 😳";
							  
							  } else if (pikiToSave.get("nbReaction") == 500) {
							  
							  	var messagePikiOwner = "@" + pikiToSave.get("user").get("username") + " is making some noise!! 500 answers on  her/his Pleek ! 🎵🎵";
							  
							  } else if (pikiToSave.get("nbReaction") == 1500) {
							  
							  	var messagePikiOwner = "It's getting big! 1500 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟";
							  
							  } else if (pikiToSave.get("nbReaction") == 3000) {
							  
							  	var messagePikiOwner = "Huge!!! 3000 answers reach on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟🌟";
							  
							  } else if (pikiToSave.get("nbReaction") == 5000) {
							  
							  var messagePikiOwner = "WoOoOooOOw !! 5000 answers on @" + pikiToSave.get("user").get("username") + "'s Pleek ! 🌟🌟🌟🌟🌟";
							  
							  } else {
							  
							  var messagePikiOwner = "@" + pikiToSave.get("user").get("username") + "'s Pleek now has more than " + pikiToSave.get("nbReaction") + " answers ! ";
							  
							  }
							  
												  
							  var channelName = "channel_" + pikiToSave.get("user").id;	
							  
							  var query = new Parse.Query(Parse.Installation);
							  query.equalTo('channels', channelName); // Set our channel
							  query.notEqualTo("notificationsEnabled", false);
							  query.equalTo("deviceType", "ios");				  
							  
							  // Send the push notification to results of the query
							  Parse.Push.send({
								  where: query,
								  data: {
								    alert: messagePikiOwner,
								    badge : "Increment",
									sound : "Space_Notification1.wav",
									pikiId : request.params.pikiId
								  }
								}, {
								  success: function() {
								    // Push sent successful
								    console.log('New react push send');
								    response.success('New react push send en pleek public car seuil de react atteint');
								  },
								  error: function(error) {
								    // Handle error
								    console.log("Error while sending new react push");
								  }
								});				
							
							
							
							
							
							
						} else {
							console.log("on N'A PAS update le last Update car il est public et il avait : " + pikiToSave.get("nbReaction") + " reacts");
							response.success('Pas de push sent car pleek public');
						}
					
					
						
					//}
						

			
					
				} else {
				
					console.log("\n ****** On a pas retrouvé le Pleek! public! ******* \n");
					response.error("on a pas retrouvé le Pleek! public");
				
				}
			
			},
			error: function() {
			
				console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
				response.error("on a pas retrouvé le Pleek! public");
				
				
			}
		});
  
  
	  
	  
	  
	  
  }else if (request.params.isPublic == false ) {
  
	  var message = "@" +  request.user.get("username") + " just added an answer to a Pleek! you were part of 😉";
	  
	  var messagePikiOwner = request.user.get("username") + " just answered  your Pleek! 🙌";
	  
	  var pikiId = request.params.pikiId;
	 
	  // Validate the message text.
	  // For example make sure it is under 140 characters
	  if (message.length > 140) {
	  // Truncate and add a ...
	    message = message.substring(0, 137) + "...";
	  }
	 
	  // Send the push.
	  // Find devices associated with the recipient user
	  var pushQuery = new Parse.Query(Parse.Installation);
	  var pushQueryOwner = new Parse.Query(Parse.Installation);
	  
	  var User = Parse.Object.extend("User");
	  var tabUser = [];
	  
	  var pikiOwnerId = "";
	  
	  
	  
	  if (request.params.ownerId ) {
	  
	      if (request.params.ownerId != request.user.id) {
			  pikiOwnerId = request.params.ownerId;
			  
			  		
		      var newUserOwner = new User();
			  newUserOwner.id = request.params.ownerId ;
			  
			  
		      pushQueryOwner.equalTo("user", newUserOwner );
		      pushQueryOwner.notEqualTo("notificationsEnabled", false);
			  
			  // Send the push notification to results of the query
			  Parse.Push.send({
				  where: pushQueryOwner, // Set our Installation query
				  data: {
				    alert: messagePikiOwner,
				    badge : "Increment",
					sound : "Space_Notification1.wav",
					type : "newReact",
					pikiId : pikiId
				  }
				}, {
				  success: function() {
				    // Push sent successful
				    console.log('New react push send');
				  },
				  error: function(error) {
				    // Handle error
				    console.log("Error while sending new react push");
				    response.error();
				  }
				});
			}		  
		  
	  }
	  
	  for (var i = 0; i < request.params.recipients.length ; i++) {
		  
		  //on verifie juste que ce ne soit pas le user qui a repondu pour ne pas lui envoyer un push ni le owner du piki (message différent)
		  if (request.params.recipients[i] == request.user.id || request.params.recipients[i] == request.params.ownerId) {
		  
			  
		  } else {
		  
			  var newUser = new User();
			  newUser.id = request.params.recipients[i] ;
			  tabUser.push(newUser);
			  
		  }
		  
	  }
	  
	  pushQuery.containedIn("user", tabUser );
	  pushQuery.notEqualTo("notificationsEnabled", false);
	  
	  // Send the push notification to results of the query
	  Parse.Push.send({
		  where: pushQuery, // Set our Installation query
		  data: {
		    alert: message,
		    badge : "Increment",
			sound : "Space_Notification1.wav",
			type : "newReact",
			pikiId : pikiId
		  }
		}, {
		  success: function() {
		    // Push sent successful
		    
		    response.success('New react push send');
		  },
		  error: function(error) {
		    // Handle error
		    console.log("Error while sending new react push");
		    response.error();
		  }
		});		
		
		
	} else {
		response.error("no piki type found");
	}
  
  
});

//**********************//
// create thumbnail piki
//**********************//
Parse.Cloud.afterSave("React", function(request, response) {
	Parse.Cloud.useMasterKey();
	
 	var react = request.object;
 
	//si il y a déjà un thumbnail 
    if (react.get("smallPhoto") || react.get("smallPreviewImage")) {
    	console.log("pas de nouvelles photos react ajoutées");
    	
    //si c'est une video qui a ete ajouté
    } else if (react.get("video") &&  !react.get("smallPreviewImage")){
	    
	    //on save une mini preview de l'image vidéo
	    Parse.Cloud.httpRequest({
	        url: react.get("previewImage").url()
	      
	      }).then(function(response) {
	        var image = new Image();
	        return image.setData(response.buffer);
	      
	      }).then(function(image) {
	        // Resize the image to 64x64.
	        return image.scale({
	          width: 120,
	          height: 120
	        });
	      
	      }).then(function(image) {
	        // Make sure it's a JPEG to save disk space and bandwidth.
	        return image.setFormat("JPEG");
	      
	      }).then(function(image) {
	        // Get the image data in a Buffer.
	        return image.data();
	      
	      }).then(function(buffer) {
	        // Save the image into a new file.
	        var base64 = buffer.toString("base64");
	        var cropped = new Parse.File("thumbnail.jpg", { base64: base64 });
	        return cropped.save();
	      
	      }).then(function(cropped) {
	        // Attach the image file to the original object.
	        react.set("smallPreviewImage", cropped);
	        react.set("smallPhoto", cropped);
	        create3LastReact();
	      
	      }).then(function(result) {
	        //miniThumbnailGen();
	        react.save();
	        console.log("*** thumbnail preview image created ***")
	        
	      }, function(error) {
	        console.log("*** ERROR *** :" + error);
	      });

	    
    
    //si c'est une photo qui est ajouté
    } else {
	 
	    Parse.Cloud.httpRequest({
	        url: react.get("photo").url()
	      
	      }).then(function(response) {
	        var image = new Image();
	        return image.setData(response.buffer);
	      
	      }).then(function(image) {
	        // Resize the image to 64x64.
	        return image.scale({
	          width: 120,
	          height: 120
	        });
	      
	      }).then(function(image) {
	        // Make sure it's a JPEG to save disk space and bandwidth.
	        return image.setFormat("JPEG");
	      
	      }).then(function(image) {
	        // Get the image data in a Buffer.
	        return image.data();
	      
	      }).then(function(buffer) {
	        // Save the image into a new file.
	        var base64 = buffer.toString("base64");
	        var cropped = new Parse.File("thumbnail.jpg", { base64: base64 });
	        return cropped.save();
	      
	      }).then(function(cropped) {
	        // Attach the image file to the original object.
	        react.set("smallPhoto", cropped);
	        
	      
	      }).then(function(result) {
	        //miniThumbnailGen();
	        react.save(null, {
						  success: function(pikiSaved) {			  
						  
						  
							  	        create3LastReact();
						 
						    
						  },
						  error: function() {
						  
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    console.log('Failed to save the new piki with the new preview and NbReaction');
						    
						    
						  }
						});
						
	        updateLastUpdate();
	        console.log("*** thumbnail created ***")

	        
	      }, function(error) {
	        console.log("*** ERROR *** :" + error);
	      });
	   
	}
	
	
	function updateLastUpdate () {
		
		//on check quels recipients on déja un score avec le user
		var piki = Parse.Object.extend("Piki");
		var queryPiki = new Parse.Query(piki);
		
		queryPiki.equalTo("objectId", request.object.get("Piki").id);
		queryPiki.include("user");
		
		queryPiki.first({
			success: function(pikiFind) {
			
				//si il y en a un error
				if (pikiFind) {
					
					var pikiToSave = pikiFind
					
					var nowDate = new Date();
					//on va modifier le lastUpdate selon le nombre et le type de piki
					//si c'est un piki public
					if (pikiToSave.get("isPublic") == true) {
						
						//on ne remonte la piki que si il y a 10, 100 500, 1500, 3000, 5000 reponses
						if(pikiToSave.get("nbReaction") == 5 || pikiToSave.get("nbReaction") == 10 ||pikiToSave.get("nbReaction") == 20 || pikiToSave.get("nbReaction") == 100 || pikiToSave.get("nbReaction") == 250 || pikiToSave.get("nbReaction") == 500 || pikiToSave.get("nbReaction") == 1500 || pikiToSave.get("nbReaction") == 3000 || pikiToSave.get("nbReaction") == 50 ) {
						
							pikiToSave.set("lastUpdate" , nowDate);
							console.log("on a update le last Update car il avait : " + pikiToSave.get("nbReaction") + " reacts");
							
							
						} else {
							console.log("on N'A PAS update le last Update car il est public et il avait : " + pikiToSave.get("nbReaction") + " reacts");
							console.log("!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n 2 !!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n");
						}
						
						
					//si c'est un piki prive on met a jour a chaque fois
					} else {
						console.log("!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n 3 !!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n!!!!!!!!!!!!\n");
						pikiToSave.set("lastUpdate" , nowDate);
						console.log("on a update le last Update car c'est un piki privé avec : " + pikiToSave.get("nbReaction") + " reacts");
					}
			
			
				    pikiToSave.save(); 
				    console.log("*** ON A INCREMENTE ET ON RAJOUTE LES PREVIEW DU REACT DANS LE PIKI ***");
				    
				    
	    				}else {	
					
				}
				 	
				   
 		  },
		  error: function() {
		  
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    console.log('Failed to find the existing friendshipScore');		    
		  }
		});

	    
	 
	}
	
	
	function create3LastReact() {
		
		var pikiObjectToSave = request.object.get("Piki");
		
		var React = Parse.Object.extend("React");
		var queryReact2 = new Parse.Query(React);
					
		//on va recup les pikis posté par le friend
		queryReact2.equalTo("Piki",pikiObjectToSave);
		queryReact2.limit(3);		
		queryReact2.descending("createdAt");
				    
	    queryReact2.find({
			success: function(reactFind) {
			
				if (reactFind) {
					
					for (var i = 0 ; i < reactFind.length ; i++){
					
					   var j = i + 1;
					   var reactFieldWording = "react" + j ; 
					
					    pikiObjectToSave.set(reactFieldWording, reactFind[i].get("smallPhoto"));

			    	}
			    	
					pikiObjectToSave.increment("nbReaction");
					
					pikiObjectToSave.save(null, {
						  success: function(pikiSaved) {			  
						  
						  
							  console.log("react has been deleted");
						 
						    
						  },
						  error: function() {
						  
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						    console.log('Failed to save the new piki with the new preview and NbReaction');
						    
						  }
						});
					
					
					
				} else {
					
					console.log("\n ****** on a trouve aucun react correspondant ******* \n");
				
				}
			
			},
			error: function() {
			
				console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
				
				
			}
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
 	
 
	//si il y a déjà un thumbnail 
    if ( request.object.existed() ) {
    	console.log("pas de nouveau piki  crée");
    	
	} else if ( piki.get("video") && !request.object.existed() ) {
	
		var nowDate = new Date();
		piki.set("lastUpdate" , nowDate);
		piki.set("extraSmallPiki" , piki.get("previewImage"));
		piki.save();
		
		
	
	
    //si c'est une photo qui est ajouté
    } else if (!piki.get("video") && !request.object.existed()){

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
  
  
  	//on verifie si on est sur la nouvelle version (recipients vide)
 	//si les recipients n'existent pas alors je les ajoute sur le serveur
 	if (!piki.get("recipients") && !request.object.existed() && piki.get("isPublic")== true) {
 		
 		console.log("ON A PAS DE RECIPIENTS");
 		var userFriendsList = [];
 		var userWhoMutedHimList = [];

 		if (request.user.get("usersFriend") && request.user.get("usersWhoMutedMe")){
 			//on va recup l'objet user
 			userFriendsList = request.user.get("usersFriend");
 			userWhoMutedHimList = request.user.get("usersWhoMutedMe");
 		
 			if (userFriendsList.length < 1000) {
	 		
	 		
	 			//on enleve les users qui m'ont muté a ma liste de friends
	 			for (var i = 0 ; i < userWhoMutedHimList.length ; i++) {
		 		
		 			var index = userFriendsList.indexOf(userWhoMutedHimList[i]);
		 			if (index > -1) {
				    	userFriendsList.splice(index, 1);
				    	console.log("ON A TROUVE 1 USER QUI MA MUTE");
					}
		 		
		 		
	 			}
	 		
	 			console.log("ON VA AJOUTER : " +  userFriendsList.length + " recipients au piki public");
	 		
	 			//on ajoute le tableau dans les recipients du pleek
	 			piki.set("recipients",userFriendsList);
	 			piki.save({
					 	 success: function(pikiSaved) {			  
					  
					  
						  	console.log("piki saved with the recipients liste");
					 
					    
					  	},
					  	error: function() {
					  
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    	console.log("piki NOT saved with the recipients liste");
					    
					 	 }
						});
	 		
	 		}
 		}
 		
 		
 	
 	}
  
  
   	//on update friendshipScore
 	//on check si privé
 	if (piki.get("isPublic")== false && !request.object.existed()) {
	 	
	 	//si privé on recupere les recipients
	 	var recipients = piki.get("recipients");

	 	friend.incrementBestScoreMultiUsers(request.user, recipients).then(function(){
	 		console.log("increment scores");
	 	})

	 	
 	}
  
  
   
});

Parse.Cloud.define("addToFirstUsePiki", function(request, response) {

//response.success();

	friend.addFriend(request.user, pikiTeamId).then(function(friendObject){
		response.success("**** PLEEKTEAM ADDED ****");
	}, function(error){
		response.error("**** ERROR ADDING PLEEKTEAM ****");
	})

	/*
	Parse.Cloud.useMasterKey();
	
	
	
	var Piki = Parse.Object.extend("Piki");
	var queryPiki = new Parse.Query(Piki);
	
	
	queryPiki.containedIn("objectId",firstUsePeekeeIds);


	queryPiki.find({
		success: function(pikiFind) {
		
			if (pikiFind) {
				
				for (var i = 0; i < pikiFind.length ; i++) {
					pikiFind[i].addUnique("recipients" , request.user.id);
				}

				//Saving all the installations
				Parse.Object.saveAll(pikiFind, { 
				
					success: function(pikiSaved) {

						//on va chercher le user pikiteam
					    var User = Parse.Object.extend("User");
						var queryUser = new Parse.Query(User);
						
						
						queryUser.equalTo("objectId", pikiTeamId);
					
					
						queryUser.first({
							success: function(userFind) {
							
								if (userFind) {

									//on save le friends avec le user en ami
								    userFind.addUnique("usersFriend",request.user.id);
									
									//on save le user avec le new friends en ami
								    request.user.addUnique("usersFriend",pikiTeamId);
								    //on save le user avec le new friends en ami
								    request.user.addUnique("usersFriend",request.user.id);
								    
								    Parse.Object.saveAll([request.user,userFind] , {
									  success: function(friendsSaved) {			  
									  
									  
									  	  //on ajoute les users à leurs channels
											var query = new Parse.Query(Parse.Installation);
											var changedObjects = [];
											
											query.containedIn("user",[userFind, request.user]);
											query.find({
												success: function(installations){
												
													for (var i = 0; i < installations.length; i++){
													
														//pour le user on le rajoute au channel du friends
														if(installations[i].get("user").id == request.user.id) {
														
															var channelName = "channel_" + pikiTeamId;
															
														//pour le friends on le rajoute au channel du user
														} else if (installations[i].get("user").id == pikiTeamId){
														
															var channelName = "channel_" + request.user.id;
															
														} else {
															response.error("can't find the channel name");
														}
														
														// Add the channel to all the installations for this user
														installations[i].addUnique("channels", channelName); //Add the channel to the installation
														changedObjects.push(installations[i]); //Add the installation to be saved later on!
														
													}
													
												
													//Saving all the installations
													Parse.Object.saveAll(changedObjects, { 
													
														success: function(installations) {
				
															response.success("2 first uses added + user is now friend with the pikiteam");
														
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
							
								console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
								reponse.error(" Pikiteam object don't find");
								
								
							}
						});
						
						
					
					},
					error: function(error) {
						// An error occurred while saving one of the objects.
						response.error(error);
					}
				
				});

				
			} else {
			
				console.log("\n ****** On a pas trouvé les piki first use ! ******* \n");
				reponse.error(" Piki first use not find");
			
			}
		
		},
		error: function() {
		
			console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
			reponse.error(" Piki first use not find");
			
			
		}
	});*/


});

/*************************************************************
**************      envoi sms confirmation     *************
*************************************************************/
Parse.Cloud.define("confirmPhoneNumber", function(request, response) {

var randomNumber = Math.floor((Math.random() * 8999) + 1000);
	//randomNumber = 1988;
	
	
	
	console.log("Random confirm number : " + randomNumber );
	var result = []; // create an empty array
	
	

	var number = numberTab[Math.floor(Math.random()*numberTab.length)];

 	Parse.Cloud.useMasterKey();

	var User = Parse.Object.extend("User");
	var UserInfos = Parse.Object.extend("UserInfos");
	
	var innerQuery = new Parse.Query(UserInfos);
	innerQuery.equalTo("phoneNumber", request.params.phoneNumber);
	
	var query = new Parse.Query(User);
	query.matchesQuery("userInfos", innerQuery);
	
	query.find({
	 success: function(userMatch) {
	 
	 
	 	if (userMatch.length >0) {
	 	
	 			console.log("\n\n\n On a déjà un user, voici son pseudo : "+ userMatch[0].get("username") + "\n\n\n");
		 		
		 		// Send an SMS message
				client.sendSms({
				    to: request.params.phoneNumber, 
				    from: number, 
				    body: 'Pleek! confirmation code : ' + randomNumber
				  }, function(err, responseData) { 
				    if (err) { 
				      response.error("Failed to send the SMS");
				      console.log("sms NOT sent : " + err + " \n reponse : " + responseData); 
				    } else { 
					  //on envoi le premier username trouvé
			 		  result.push({
						  randomNumber:   randomNumber,
						  username: userMatch[0].get("username")
					  });
			 		  response.success(result);
				      console.log("sms sent confirmation for existed user : " + userMatch[0].get("username")); 
				    }
				  }
				);


	 	}else {
	 	
		 	console.log("\n\n\n No Match : on envoi le sms pour le code\n\n\n");
		 	
		 	// Send an SMS message
			client.sendSms({
			    to: request.params.phoneNumber, 
			    from: number, 
			    body: 'Pleek! confirmation code : ' + randomNumber
			  }, function(err, responseData) { 
			    if (err) { 
			      response.error("Failed to send the SMS : " + err );
			      console.log("sms NOT sent. Status : " + err.status + " \n Message : " + err.message ); 
			    } else { 
			      result.push({
				    randomNumber:   randomNumber
				  });
				  response.success(result);
			      console.log("sms sent confirmation for new user"); 
			    }
			  }
			);
		 	
	 	}
	 
	 
	 },
	  error: function() {
	    console.log("Error: finding the user for connexion");
	  }
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
	
	var pikiId = request.params.pikiId;
	var message = "@" + request.user.get("username") + " sent you a new Pleek!! 😜";
	
	// Validate the message text.
	// For example make sure it is under 140 characters
	if (message.length > 140) {
	// Truncate and add a ...
	message = message.substring(0, 137) + "...";
	}


	//on verifie le type de piki
	if (request.params.type == "sendToAll" ) {
		
		console.log("***  piki send to all  ***");
		
		var channelName = "channel_" + request.user.id;

		var query = new Parse.Query(Parse.Installation);
		query.equalTo('channels', channelName); // Set our channel
		query.notEqualTo("notificationsEnabled", false);

		Parse.Push.send({
		  where: query,
		  data: {
		    alert: message,
		    type : "newPiki",
		    sound : "Birdy_Notification2.wav",
			"pikiId" : pikiId
		  }
		}, {
		  success: function() {
		    // Push was successful
		    response.success("push send for piki private");
		  },
		  error: function(error) {
		    // Handle error
		    response.error("push not send for piki private");
		  }
		});

		
		
	}else if (request.params.type == "private"){
		
		  console.log("***  piki private  ***");
		 
		  // Send the push.
		  // Find devices associated with the recipient user
		  var pushQuery = new Parse.Query(Parse.Installation);
		  
		  var User = Parse.Object.extend("User");
		  var innerQuery = new Parse.Query(User);
		  
		  
		  innerQuery.containedIn("objectId",request.params.recipients);
		  innerQuery.notEqualTo("objectId",request.user.id);
		  pushQuery.matchesQuery("user", innerQuery);
		  pushQuery.notEqualTo("notificationsEnabled", false);
		  
		  // Send the push notification to results of the query
		  Parse.Push.send({
			  where: pushQuery, // Set our Installation query
			  data: {
			    alert: message,
			    badge : "Increment",
				sound : "Birdy_Notification2.wav",
				type : "newPiki",
				"pikiId" : pikiId
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
		
		
		
		
	} else {
		response.error("no type send");
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
Parse.Cloud.define("reportOrRemoveReact", function(request, response) {	

	Parse.Cloud.useMasterKey();	
	
	var reactId = request.params.reactId;
		
	var React = Parse.Object.extend("React");
	var queryReact = new Parse.Query(React);
	
	//on va recup les pikis posté par le friend
	queryReact.equalTo("objectId",reactId);
	queryReact.include("Piki");
	
	queryReact.first({
	  success: function(reactObject) {
	  
	  	if (reactObject) {
				    
			//si le user est le owner du react ou du peekee on delete le react
			console.log('reactObject.get("user").id : ' + reactObject.get("user").id + "\n request.user.id : " + request.user.id);
			
			if (reactObject.get("user").id == request.user.id || reactObject.get("Piki").get("user").id == request.user.id || request.user.id == pikiTeamId || request.user.id == remiId || request.user.id == cyrilId) {
				
				

				
				
				reactObject.destroy({
				  success: function(pikiDestroy) {
				    // The object was deleted from the Parse Cloud.
				    
				    //we remove 1 to total number of react in the piki object
				    var pikiObjectToSave = reactObject.get("Piki");
				    
					var queryGetReact = new Parse.Query(React);
					 
					queryGetReact.equalTo("Piki",pikiObjectToSave);
					
					queryGetReact.count({
					  success: function(count) {
					    // The count request succeeded. Show the count
						pikiObjectToSave.set("nbReaction" , count);

						console.log("refresh nbreaction : " + count);
						var queryReact2 = new Parse.Query(React);
						
						//on va recup les pikis posté par le friend
						queryReact2.equalTo("Piki",pikiObjectToSave);
						queryReact2.limit(3);		
						queryReact2.descending("createdAt");
								    
					    queryReact2.find({
							success: function(reactFind) {
							
								if (reactFind) {
									
									for (var i = 0 ; i < reactFind.length ; i++){
									
									   var j = i + 1;
									   var reactFieldWording = "react" + j ; 
									
									    pikiObjectToSave.set(reactFieldWording, reactFind[i].get("smallPhoto"));
		
							    	}
							    	
									
									
									pikiObjectToSave.save(null, {
										  success: function(pikiSaved) {			  
										  
										  
											  response.success("react has been deleted");
										 
										    
										  },
										  error: function() {
										  
										    // Execute any logic that should take place if the save fails.
										    // error is a Parse.Error with an error code and message.
										    console.log('Failed to save the new piki with the new preview and NbReaction');
										    response.error("Failed to save the new piki with the new preview and NbReaction")
										    
										  }
										});
									
									
									
								} else {
									
									console.log("\n ****** on a trouve aucun react correspondant ******* \n");
								
								}
							
							},
							error: function() {
							
								console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
								
								
							}
						});
					  },
					  error: function(error) {
					    // The request failed
					  }
					});		
				    
				    
				  },
				  error: function(error) {
				    response.error("fail to delete the react")
				  }
				});
				
			//si le user n'est pas le owner, alors on le hide (enleve de la liste des recipients)
			} else {
				
				
			   reactObject.addUnique("reported",request.user.id);
			    
			   reactObject.save(null, {
				  success: function(reactSaved) {			  
				  
				  
					  response.success("react saved with one more report count");
				 
				    
				  },
				  error: function() {
				  
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    console.log('Failed to save the react with the new report count');
				    response.error("fail to save the react with one more report count")
				    
				  }
				});
				
			}    
		
		}
		
		else {
			response.success("no react find :/")
		}
		
	    
	    
	  },
	  error: function() {
	    console.log("Error: finding the react");
	    response.error("can't find the react");
	  }
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




/************

		friendsQuery.find()({
			success: function(match) {
			
				if (match) {
					
					console.log("\n ****** On a trouvé : " + match.length + " resultats ! ******* \n");
					
				} else {
				
					console.log("\n ****** On a trouvé AUCUN resultats ! ******* \n");
				
				}
			
			},
			error: function() {
			
				console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
				
				
			}
		});
		
		
************/

/*
	if (!request.user) {
		
		response.error("pas de user");
		
	} else {

		// on creer l'objet piki
		var Piki = Parse.Object.extend("Piki");
		var newPiki = new Piki();
	
	
		//on ajoute le file selon si c'est une photo ou video
		//si photo
		if (request.params.fileType == "photo") {
		
			newPiki.set("photo", request.params.file);
			
		//si video
		} else if (request.params.fileType == "video"){
		
			newPiki.set("video", request.params.file);
			
		//si type pas defini
		} else {
		
			response.error("No file type");
			
		}
		
		
		//si il y a du texte
		if (request.params.textContent) {
		
			newPiki.set("text", request.params.textContent);
		
		}
		
		//si on a la taille du texte
		if (request.params.textSize) {
		
			newPiki.set("textSize", request.params.textSize);
		
		}
		
		//on ajoute le user qui a poste le piki
		if (request.user) {
		
			newPiki.set("user", request.user);
		
		}
		
		//on precise le username
		if (request.user.get("username")) {
		
			newPiki.set("username", request.user.get("username"));
		
		}
		
		//selon si c'est un piki to all ou a quelques personnes selectionnés
		//si cest un piki pour quelques personnes
		if (request.params.pikiType == "private" ) {
			
			newPiki.set("type", "private");
			
			if (request.params.recipient) {
				var pikiACL = new Parse.ACL();
				pikiACL.setWriteAccess(request.user,true);
				
				for (var i=0; i < request.params.recipient.length ; i++) {
				
					pikiACL.setReadAccess(request.params.recipient[i],true);
					
				}
					
			} else {
				response.error("No recipient send");
			}
			
		//si c'est un piki To All
		} else if (request.params.pikiType == "toAll") {
		
			newPiki.set("type", "toAll");
			
			var pikiACL = new Parse.ACL();
			
			pikiACL.setPublicReadAccess(true);
			pikiACL.setWriteAccess(request.user,true);
			
	
			
		} else {
			response.error("no piki type define");
		}
		
		
		newPiki.setACL(pikiACL);
		
		newPiki.save(null, {
		  success: function(pikiSaved) {
		    //on a save le piki
		    console.log("on a save le nouveau piki");
		    
		    //si c'est un piki privé on va créer les liens
		    if (pikiSaved.get("type") ==  "private") {
			    createLink(request.params.recipient, pikiSaved);
			    
			//si c'est un piki public ok
		    } else {
			    response.success();
		    }
		    
		  },
		  error: function(result, error) {
		    //on a pas pu save le piki
		    respons.error(error.message);
		  }
		});
	
	}
	
	
	}*/	
	
/*************************************************************
**************      save Piki  *************
*************************************************************

Parse.Cloud.define("savePiki", function(request, response) {
	Parse.Cloud.useMasterKey();


	//on verifie le type de piki
	if (request.params.type == "sendToAll") {
		
		console.log("***  piki send to all  ***");

		
		//on va chercher tout les gens qu'il a ajoute sauf ceux qui l'ont ajouté pour checker si ils autorisent de recevoir des pikis des gens qu'ils n'ont pas ajouté eux meme
		
		var Friends = Parse.Object.extend("Friends");
		var friendsQuery = new Parse.Query(Friends);
		
		var User = Parse.Object.extend("User");
		var innerQuery = new Parse.Query(User);
		
		
		//on check si il a des gens qui l'on ajouté
		if (request.user.get("usersFriend")) {
		
			//on va chercher tout les gens qui l'ont ajouté
			var userAddedMe = request.user.get("usersFriend");
			
			//on enleve ces gens (ils l'ont ajouté donc ils peuvent recevoir les toAll)
			innerQuery.notContainedIn("objectId",userAddedMe);
			
			console.log("les users qui m'ont ajouté : " + userAddedMe);
			
			friendsQuery.matchesQuery("friend", innerQuery);
		}
		
		friendsQuery.equalTo("user",request.user);
		friendsQuery.include("friend");
		
		friendsQuery.find({
			success: function(userIOnlyAdded) {
			
				if (userIOnlyAdded) {
					
					var recipientToAdd = [];
					
					//on va verifier si ils ont authorisé la reception de pikis de personnes les ayant ajouté
					for (var i = 0; i < userIOnlyAdded.length ; i++) {
						
						//si ils ont accepté on les met dans un tableau de personnes à pusher
						if (userIOnlyAdded[i].get("friend").get("acceptPikiFromAnyone") == true) {
							
							recipientToAdd.push(userIOnlyAdded[i].get("friend"));
							
						}
						
					}
					
					console.log("\n ****** Sur " + userIOnlyAdded.length + " personnes que j'ai ajouté et qui ne m'ont pas ajouté, " + recipientToAdd.length + " ont accepté de recevoir des pushs d'inconnus ******* \n");
					
					
					//on va rajouter ces users au piki
					//on va donc chercher l'objet piki
					var Piki = Parse.Object.extend("Piki");
					var pikiQuery = new Parse.Query(Piki);
					
					
					
					//on va recup l'object user du friends
					pikiQuery.equalTo("objectId",request.params.piki);
					pikiQuery.first({
					  success: function(pikiObject) {
					  
					  	if (pikiObject) {
						  	
						  			console.log("ON A TROUVE LE PIKI");
						  	
						  			var pikiRecipients = [];
								    
								    if (pikiObject.get("recipients")) {
								    
								    	pikiRecipients = pikiObject.get("recipients");
								    	
								    	for (var i = 0; i < recipientToAdd.length ; i++) {
											pikiRecipients.push(recipientToAdd[i].id);
										}
										
										
								    } else {
									    
									    for (var i = 0; i < recipientToAdd.length ; i++) {
											pikiRecipients.push(recipientToAdd[i].id);
										}
									    
								    }
								    
								    
								    pikiObject.set("recipients",pikiRecipients);
								    
								    pikiObject.save(null, {
									  success: function(newPikiObject) {
									  
										  // Send the push.
										  // On envoi un push uniquement à ces user là
										  var pushQuery = new Parse.Query(Parse.Installation);
										  pushQuery.containedIn("user",recipientToAdd);
										  
										  var message = "@" + request.user.get("username") + " a ajouté un nouveau piki to all! :) ";
										  
										  
										  
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
											    console.log("New Piki push to all send");
											    response.success("liaison crée et push send");
											  },
											  error: function(error) {
											    // Handle error
											    console.log("Error while sending new Piki push");
											    response.error();
											  }
											});
					
					
									    
									  },
									  error: function() {
									  
									    // Execute any logic that should take place if the save fails.
									    // error is a Parse.Error with an error code and message.
									    console.log('Failed to save the new piki with new recipient');
									    
									  }
									});

						
						} else {
							console.log("ON A PAS TROUVE LE PIKI");
						}	    
					    
					  },
					  error: function() {
					    console.log("Error: finding the piki");
					  }
					});			
					
				} else {
				
					console.log("\n ****** On a trouvé AUCUN resultats ! ******* \n");
				
				}
				
			},
			error: function() {
			
				console.log("\n ****** ERREUR DE LA RECHERCHE ******* \n");
				response.error();
				
				
			}
		});
		
		
		
		//pour chaque user on check si ils ont l'autorisation de recevoir des pikis de gens qu'ils ont pas add eux meme
		
		//on rajoute ces users dans les recipients
		//on save le piki
		
		//on envoie un push à ses users
		//on envoi un push au channel
		
		
	}else if (request.params.type == "private"){
		
		  console.log("***  piki private  ***");
			
		  var pikiId = request.params.piki;
		  var message = "@" + request.user.get("username") + " à ajouté un nouveau Piki ! 🎉";
		 
		  // Validate the message text.
		  // For example make sure it is under 140 characters
		  if (message.length > 140) {
		  // Truncate and add a ...
		    message = message.substring(0, 137) + "...";
		  }
		 
		  // Send the push.
		  // Find devices associated with the recipient user
		  var pushQuery = new Parse.Query(Parse.Installation);
		  
		  var User = Parse.Object.extend("User");
		  var innerQuery = new Parse.Query(User);
		  
		  innerQuery.containedIn("objectId",request.params.recipients);
		  pushQuery.matchesQuery("user", innerQuery);
		  
		  // Send the push notification to results of the query
		  Parse.Push.send({
			  where: pushQuery, // Set our Installation query
			  data: {
			    alert: message,
			    badge : "Increment",
				sound : "default",
				type : "newPiki",
				"pikiId" : pikiId,
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
		
		
		
		
	} else {
		response.error("no type send");
	}
	
		

});

*/
