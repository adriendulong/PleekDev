// Require and initialize the Twilio module with your credentials
var client = require('twilio')('AC565e7be131da6f810b8d746874fb3774', '8d432341211ffaca933c13dd2e000eea');
var Image = require("parse-image");
_ = require('underscore.js')




// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.afterSave("Interaction", function(request, response) {
	Parse.Cloud.useMasterKey();	

if (request.user) {
  var interractionType = request.object.get("type");
  console.log("interraction type : " + interractionType);
  var userObj = request.user;
  
  //si c'est un message ajouté
  if (interractionType == 0) {
	  query = new Parse.Query("Piki");
	  query.get(request.object.get("piki").id, {
	    success: function(piki) {
	      piki.increment("nb_interactions");
	      piki.save();

  	//on regarde la version du user
	var queryUserVersion = new Parse.Query(Parse.Installation);
	queryUserVersion.equalTo('user', userObj);
	
	queryUserVersion.find({
		  success: function(userInstallation) {
		    // Successfully retrieved the object.

			if(userInstallation[0]){
				var userVersion = userInstallation[0].get("appVersion");
			} else {
				var userVersion = "undefine";
			}
			
		    //si il a une ancienne version on ne fait rien
		    if (userVersion == "1.0" || userVersion == "1.0.1"  || userVersion == "1.0.2" ) {  }
		    
		    //si il a une nouvelle version on envoi le push depuis le serveur
		    else {
				//on va recuperer le groupe
				query = new Parse.Query("Group");
				query.get(piki.get("group").id, {
					success: function(group) {	
						
					//on va chercher les membres du groupe
					queryMember = new Parse.Query("Member");
					queryMember.equalTo("group",group);
					queryMember.exists("user");
					                  
					queryMember.find({
					    success: function(memberFind) {
					    
					    	//si il y a des membres
							if (memberFind.length >0) {
								var userMemberTab = [];
								for (var i=0; i < memberFind.length; i++) {
									//on stock tout les membres sauf le user qui commente
									if(memberFind[i].get("user").id != request.user.id) {
										userMemberTab.push(memberFind[i].get("user"));
									}
								}
							
							
							//on balance un push à tout ceux déjà sur l'app
							var queryPush = new Parse.Query(Parse.Installation);
							queryPush.containedIn('user', userMemberTab);
							
							//on regarde si c'est incognito
							if (request.object.get("isSecret") == true) {
								
								var argsTab = [];
								argsTab.push("Incognito");
								argsTab.push(group.get("name"));
							
							} else {
								
								var argsTab = [];
								argsTab.push(request.user.get("first_name"));
								argsTab.push(group.get("name"));
								
								
							}
								 
								Parse.Push.send({
									  where: queryPush, // Set our Installation query
									  data: {
									    alert: { "loc-key" : "Push_NewComment", "loc-args" : argsTab},
									    badge : "Increment",
										sound : "default",
										type : "new_comment",
										group : group.id
									  }
									}, {
									  success: function() {
									    // Push sent successful
									    
									    console.log("New comment push send");
									  },
									  error: function(error) {
									    // Handle error
									    console.log("Error while sending new comment push");
									  }
									});
								
							} else {
						  	//si il en a pas on en créer une et on push le photograph
						  		console.log("il n'y a pas de membres");
							}
			
					      
					    },
					    error: function(error) {
					      console.error("Got an error find group member" );
					    }
					  });
				   },
				    error: function(error) {
				      console.error("Got an error finding group");
				    }
				  });
			}
  	    },
	    error: function(error) {
	      console.error("Got an error finding user version");
	    }
	  });  
   	},
    error: function(error) {
      console.error("Got an error finding piki");
    }
  }); 
  }
  
  }
});


Parse.Cloud.beforeSave("Piki", function(request, response) {
	
	var piki = request.object

	if (!piki.dirty("photo")) {
    	response.success();
    	return;
  	}

  	Parse.Cloud.httpRequest({
	    url: piki.get("photo").url()
	 
	  }).then(function(response) {
	    var image = new Image();
	    return image.setData(response.buffer);
	 
	  /*}).then(function(image) {
	    // Crop the image to the smaller of width or height.
	    var size = Math.min(image.width(), image.height());
	    return image.crop({
	      left: (image.width() - size) / 2,
	      top: (image.height() - size) / 2,
	      width: size,
	      height: size
	    });*/
	 
	  }).then(function(image) {
	    // Resize the image to 64x64.
	    return image.scale({
	      ratio: 0.25
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
	    piki.set("smallPhoto", cropped);
	 
	  }).then(function(result) {
	    response.success();
	  }, function(error) {
	    response.error(error);
	  });
  
});

Parse.Cloud.define("seenPiki", function(request, response) {
	Parse.Cloud.useMasterKey();	
	
	
	console.log(" seenPiki function CALLLLLLL");

	//on regarde si le user n'est pas le photograph
	var photographId = request.params.photoGraphId;
		
	//si le user n'est pas le photograph on ajoute une vue unique + total view
	if (photographId != request.user.id) {
		console.log("le user n'est pas le photograph");
		
		query = new Parse.Query("Piki");
		query.get(request.params.pikiId, {
			success: function(pikiFind) {		
		
		//on regarde si le user a deja une interraction de type vue
		queryInter = new Parse.Query("Interaction");
		queryInter.equalTo("piki",pikiFind);
		queryInter.equalTo("user",request.user);
		queryInter.equalTo("type",1);
		                  
		queryInter.find({
		    success: function(interactionFind) {
		    	//si il a deja une vue
				if (interactionFind.length >0) {
				//on ne fait rien
					console.log("il a deja une vue");
					response.success();	
				//on incremente uniquement le nombre de vue !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					
				} else {
			  	//si il en a pas on en créer une et on push le photograph
			  		console.log("il na pas de vue");
			  		
					var Interaction = Parse.Object.extend("Interaction");
					var newInteraction = new Interaction();
					 
					newInteraction.set("piki", pikiFind);
					newInteraction.set("type", 1);
					newInteraction.set("user", request.user);
					newInteraction.save(null, {
						  success: function(gameScore) {
						  	console.log("on a ajoutee une vue unique");
						  	
						  	
						  	pikiFind.increment("nb_views_unique"); 
						  	pikiFind.save();
						  	
						  	console.log ("photograph Id :" + photographId )
						  	
						  	query = new Parse.Query("User");
						  	query.get(photographId, {
							  	success: function(photographFind) {
						  	
								//on balance un push à tout ceux déjà sur l'app
								var queryPush = new Parse.Query(Parse.Installation);
								queryPush.equalTo('user', photographFind);
								
								var argsTab = [];
								argsTab.push("👀 " + request.user.get("first_name"));
									
									Parse.Push.send({
									  where: queryPush,
									  data: {
									    alert: { "loc-key" : "Push_LookingPicture", "loc-args" : argsTab},
									    badge : "Increment",
									    sound : "default",
									    type : "new_view",
									    group : pikiFind.get("group").id
									  }
									}, {
									  success: function() {
									    // Push was successful
									    console.log("Push New photo seen OK");
									    response.success();	
									  },
									  error: function(error) {
									    // Handle error
									    console.log("Error while sending push of photo seen");
									    response.error();	
									  }
									});
								},
								error: function(error) {
								   console.error("Got an error finding photograph object");
								 }
							});
								
							},
						  error: function(gameScore, error) {
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and description.
						    console.log('Failed to save the new interaction view counter ');
						  }
						});
				}

		      
		    },
		    error: function(error) {
		      console.error("Got an error find interaction" );
		    }
		  });
		
		
		},
		error: function(error) {
		   console.error("Got an error finding Piki");
		}
	});
		  
	}
	//si le user est le photograph on ajoute juste une vue totale
	else {
		response.success();	
	}
		
});


Parse.Cloud.afterSave("Piki", function(request, response) {
	
	query = new Parse.Query("Group");
	query.get(request.object.get("group").id, {
		success: function(group) {

				//Keep the last piki in the group object
				group.set("last_piki", request.object)
				group.set("last_piki_file", request.object.get("photo"))
				group.save();

				//on va chercher les membres du groupe
				queryMember = new Parse.Query("Member");
				queryMember.equalTo("group",group);
				queryMember.exists("user");


						                  
				queryMember.find({
					success: function(memberFind) {

						if (memberFind.length >0) {

							var userMemberTab = [];
							for (var i=0; i < memberFind.length; i++) {
								//on stock tout les membres sauf le user qui commente
								if(memberFind[i].get("user").id != request.user.id) {
									userMemberTab.push(memberFind[i].get("user"));
								}
									
							}
								
							//on balance un push à tout ceux déjà sur l'app
							var queryPush = new Parse.Query(Parse.Installation);
							queryPush.containedIn('user', userMemberTab);
								
							var argsTab = [];
							argsTab.push(group.get("name"));
								 
							Parse.Push.send({
								where: queryPush, // Set our Installation query
								data: {
									alert: { "loc-key" : "Push_NewPiki", "loc-args" : argsTab},
									badge : "Increment",
									sound : "default",
									type : "new_piki",
									group : group.id
								}
								}, {
									success: function() {
									    console.log("New piki available push send");
									  },
									error: function(error) {
									    console.log("Error while sending push new piki");
									  }
									});
									
						} else {
							console.log("il n'y a pas de membres");
						}
				
						      
					},
					 error: function(error) {
						console.error("Got an error find group member" );
					}
				});
		},
		error: function(error){
			console.log("problem getting the group");
		}
	});
				
});


///////////
Parse.Cloud.afterSave(Parse.User, function(request) {
	Parse.Cloud.useMasterKey();
	
	var hasSendWelcomePushBool = request.object.get('hasSendWelcomePush');
	
	//on check si c'est bien un nouvel inscrit
	if (hasSendWelcomePushBool != true ) {

		//on save qu'il s'est inscrit
		request.object.set("hasSendWelcomePush",true);
		request.object.save();
		
		var testAuth = request.object.get('authData');
		
		if(testAuth){
		var accessToken = testAuth.facebook.access_token;
		var url = 'https://graph.facebook.com/me/friends?field=id&access_token=' + accessToken;
		var nameUrl = 'https://graph.facebook.com/me/?field=first_name&access_token=' + accessToken;
		}
		
		//on va chercher sa liste de potes sur FB
		Parse.Cloud.httpRequest({
		  url: nameUrl,
		  success: function(httpResponse) {
		
			var parsed = httpResponse.data;
			
			if (parsed.name){
			var userName = parsed.name;
			} else {
				if (parsed.first_name) {
					var userName = parsed.first_name;
				} else {
					var userName = "";
				}
				
				
			}
			
			//on va chercher sa liste de potes sur FB
			Parse.Cloud.httpRequest({
			  url: url,
			  success: function(httpResponse) {
			
			    var parsed = httpResponse.data,
			    data = parsed.data; 
			    
			    var friendsIdTab= [];  
			    for (var i = 0; i < data.length; i++) {	
							
							friendsIdTab.push(data[i].id);
						
						}
			    
			    //on regarde lesquelles sont deja sur l'app
				var checkFriendsOnApp = new Parse.Query("User");
				checkFriendsOnApp.containedIn("facebookId",
			                  friendsIdTab);
			    checkFriendsOnApp.find({
					 success: function(friendsOnApp) {
		
					 	//on balance un push à tout ceux déjà sur l'app
						var queryPush = new Parse.Query(Parse.Installation);
						queryPush.containedIn('user', friendsOnApp);
							 
						Parse.Push.send({
							  where: queryPush, // Set our Installation query
							  data: {
							    alert: "Your Facebook friends " + userName +  " is now on Pikichat! Let's Piki :)"
							  }
							}, {
							  success: function() {
							    // Push was successful
							    console.log("New Friends join push successful send");
							  },
							  error: function(error) {
							    // Handle error
							    console.log("Error while sending push welcome");
							  }
							});
					 
					 },
					 error: function() {
						 //console.log(" \n !!!!! !!!!! \n" );
						 }
					}); 
		 
			
			  },
			  error: function(httpResponse) {
			  }
			});
		},
			error: function(httpResponse) {
			}
		});
	
	 }   



});




Parse.Cloud.define("sendSMS", function(request, response) {

 
	// Send an SMS message
	client.sendSms({
	    to: request.params.phoneNumber, 
	    from: '+1 708-669-0294', 
	    body: 'Pikichat AppStore Link : \n https://itunes.apple.com/us/app/pikichat-group-messaging-app/id873280504'
	  }, function(err, responseData) { 
	    if (err) {
	      console.log(err);
	    } else { 
	      response.success("sms send appstore link from website");
	    }
	  }
	);

});


Parse.Cloud.define("sendInviteSMS", function(request, response) {

 	//on boucle pour chaque numéro
 	for (var i=0; i < request.params.phoneNumberTab.length ; i++) {

 		// Send an SMS message
		client.sendSms({
		    to: request.params.phoneNumberTab[i], 
		    from: '+1 708-669-0294', 
		    body: request.params.inviteText
		  }, function(err, responseData) { 
		    if (err) {
		      console.log(err);
		      response.error(err);
		    } else { 
		      console.log(responseData.to); 
		      console.log(responseData.body);
		      response.success(responseData.body);
		    }
		  }
		);
		 	
 	}

});


Parse.Cloud.define("confirmPhoneNumber", function(request, response) {

	var randomNumber = Math.floor((Math.random() * 8999) + 1000);
 
	// Send an SMS message
	client.sendSms({
	    to: request.params.phoneNumber, 
	    from: '+1 708-669-0294', 
	    body: 'PikiChat confirmation code : ' + randomNumber
	  }, function(err, responseData) { 
	    if (err) { 
	      response.error("Failed to send the SMS");
	      console.log("sms NOT sent"); 
	    } else { 
	      response.success(randomNumber);
	      console.log("sms sent confirmation"); 
	    }
	  }
	);

});




// Migrate User friends
Parse.Cloud.job("userFriendsMigration", function(request, status) {
  // Set up to modify user data

  Parse.Cloud.useMasterKey();
  var counter = 0;
  
  var mainUser;
  var friendsObjects = [];

  //Get the user we want add Friends
  var query = new Parse.Query(Parse.User);
  query.get(request.params.userId).then(function(user){
  	mainUser = user
  	var queryFriend = new Parse.Query(Parse.User);
  	queryFriend.containedIn("objectId", user.get("usersFriend"));

  	//Find all the friends User object
  	return queryFriend.find();
  }).then(function(friends) {
  	var Friend = Parse.Object.extend("Friend");
  	var promises = []
    
  	_.each(friends, function(friend){
  		var newFriend = new Friend();
		newFriend.set("friend", friend);
		friendsObjects.push(newFriend);

		promises.push(newFriend.save());
  	})

  	// Create all friends object
    return Parse.Promise.when(promises);

  }).then(function(){

  	_.each(friendsObjects, function(friend){

  		var relation = mainUser.relation("friends");
		relation.add(friend);

  	})

  	// Add all the relation between the user and the friends
  	return mainUser.save()

  }).then(function(){

  	status.success("Migration completed successfully.");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });

});


// Remove all friends
//Display user friends name
Parse.Cloud.job("removeFriends", function(request, status) {
	Parse.Cloud.useMasterKey();
	var query = new Parse.Query(Parse.User);
	var mainUser;
	query.get(request.params.userId).then(function(user){
		mainUser = user
		var relation = user.relation("friendsUsers");
		var queryRelation = relation.query();
		return queryRelation.find();

	}).then(function(friendsObject){

		var relation = mainUser.relation("friendsUsers");
		relation.remove(friendsObject)
		return mainUser.save()

	}).then(function(friendsObject){

		status.success("printed all the name");

	}, function(error){
		status.error("NO printed all the name");
	});

});


// Migrate User friends using User objects
Parse.Cloud.define("userFriendsMigrationUsersObjects", function(request, response) {
  // Set up to modify user data

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
  		return Parse.Promise.as()
  	}
  	else{
		queryFriend.containedIn("objectId", user.get("usersFriend"));
  	}

  	

  	//Find all the friends User object
  	return queryFriend.find();
  }).then(function(friends){

  	if (friends){
		var relation = mainUser.relation("friends");
		relation.add(friends);

	  	// Add all the relation between the user and the friends
	  	return mainUser.save()
  	}
  	else{
  		return Parse.Promise.as()
  	}
  	

  }).then(function(){
  	var endDate = new Date()
  	var lengthJob = endDate - startDate
  	response.success("Migration completed successfully in "+lengthJob+".");

  }, function(error) {
    // Set the job's error status
    response.error("Uh oh, something went wrong." + error);
  });

});


// Migrate User friends for all the users
Parse.Cloud.job("migrateFriendsUsers", function(request, status) {
  // Set up to modify user data

  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;

  //Get the user we want add Friends
  var query = new Parse.Query(Parse.User);
  query.each(function(user) {

  	if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
    }
    counter += 1;

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

  }).then(function(){
  	var endDate = new Date();
  	var lengthJob = endDate - startDate;
  	status.success("Migration completed successfully in "+lengthJob+".");

  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong. : "+error);
  });

});

//Display user friends name
Parse.Cloud.job("printMyFriendsName", function(request, status) {

	var query = new Parse.Query(Parse.User);
	query.get(request.params.userId).then(function(user){

		var relation = user.relation("friends");
		var queryRelation = relation.query();

		console.log(relation.toJSON())

		return queryRelation.find();

	}).then(function(friendsObject){

		_.each(friendsObject, function(friendObject){

			console.log("Friend Name : "+friendObject.get("username"));

		})
		console.log("Number of friends : "+friendsObject.length)
		status.success("printed all the name");

	}, function(error){
		status.error("NO printed all the name");
	});

});



//Call Add Friends Background Job
function addFriendsForUser(user){

  Parse.Cloud.useMasterKey();
  var promise = Parse.Promise()
  
  var mainUser;
  var friendsObjects = [];

  var queryFriend = new Parse.Query(Parse.User);
  queryFriend.containedIn("objectId", user.get("usersFriend"));
	
  queryFriend.find().then(function(friends){


  	var relation = mainUser.relation("friendsUsers");
	relation.add(friends);

  	// Add all the relation between the user and the friends
  	return mainUser.save()

  }).then(function(){
  	
  	promise.resolve()

  }, function(error) {
    // Set the job's error status
    promise.reject(error)
  });

  return promise;
}


function callBackgroundAddFriends(userId){

	var promise = new Parse.Promise();

	Parse.Cloud.httpRequest({
	  method: 'POST',
	  url: 'https://api.parse.com/1/functions/userFriendsMigrationUsersObjects',
	  headers: {
	    'Content-Type': 'application/json',
	    'X-Parse-Application-Id' : 'BA7FMG5LmMRx0RIPw3XdrOkR7FTnnSe4SIMRrnRG',
	    'X-Parse-Master-Key' : 'AKQhW3cNH3y4nwaKovCNhAcUeW6Z4rasX3OdiIkR'
	  },
	  body: {
	    'userId' : userId
	  },
	  success: function(httpResponse) {
	    console.log(httpResponse.text);
	    promise.resolve()
	  },
	  error: function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status);
	    promise.reject()
	  }
	});


}

