// Utils function about user friends
_ = require('underscore.js')

exports.isAFriend = function(user, friendId) {
  
  var promise = new Parse.Promise();

  var queryFriend = new Parse.Query(Parse.Object.extend("Friend"));
  queryFriend.equalTo("user", user);
  queryFriend.equalTo("friendId", friendId)
  queryFriend.find().then(function(friendObjects){

  	if (friendObjects.length > 0){
  		promise.resolve(true)
  	}
  	else{
  		promise.resolve(false)
  	}

  }, function(error){

  	promise.reject(error);

  })

  return promise;


}

exports.incrementBestScoreMultiUsers = function(user, friendsId){

  var promise = new Parse.Promise();

  var queryFriend = new Parse.Query(Parse.Object.extend("Friend"));
  queryFriend.equalTo("user", user);
  queryFriend.containedIn("friendId", friendsId);
  queryFriend.find().then(function(friendObjects){

    _.each(friendObjects, function(friendObject){

        friendObject.increment("score");

    })

    return Parse.Object.saveAll(friendObjects);

  }).then(function(){

    promise.resolve();

  }, function(error){

    promise.reject(error);

  })



  return promise;

}


exports.addFriend = function(user, friendId){

  Parse.Cloud.useMasterKey();
  var friendObject;

  var promise = new Parse.Promise();

  exports.isAFriend(user, friendId).then(function(isAFriend){

    //Not yet a friend
    if (isAFriend == false){
      var query = new Parse.Query(Parse.User);
      //Get the user we want to add as a friend
      return query.get(friendId);
    }
    else{
      return Parse.Promise.error("User is already a friend");
    }

  }).then(function(friend){
    friendObject = friend;

    if (friend){
      var Friend = Parse.Object.extend("Friend");
      //Create the friend object
      var newFriend = new Friend();
      newFriend.set("friend", friend);
      newFriend.set("friendId", friend.id);
      newFriend.set("user", user);
      newFriend.set("score", 0);
      return newFriend.save();

    }
    else{
      return Parse.Promise.error("No user found");
    }

  }).then(function(){

    //Get the installation of the user
    var queryInstallations = new Parse.Query(Parse.Installation);     
    queryInstallations.equalTo("user", user);
    return queryInstallations.find();

  }).then(function(installations){
    var promises = [];

    // Add the channel to each installation
    var channelName = "channel_" + friendId;
    _.each(installations, function(installation){

      installation.addUnique("channels", channelName);

    });
    promises.push(Parse.Object.saveAll(installations));

    //Modify user object
    user.increment("nbFriends");
    user.set("lastFriendsModification", new Date());
    promises.push(user.save());

    //Save in parrallel the installations and the user
    return Parse.Promise.when(promises);

  }).then(function(){

    promise.resolve(friendObject);

  }, function(error){

    promise.reject(error);
  })

  return promise;

}


exports.getFriends = function(user, withFriendObject){

  var promise = new Parse.Promise();

  var queryFriend = new Parse.Query(Parse.Object.extend("Friend"));
  queryFriend.equalTo("user", user);

  if (withFriendObject){
    queryFriend.include("friend");
  }

  queryFriend.find().then(function(friendObjects){

    promise.resolve(friendObjects);

  }, function(error){

    promise.reject(error);

  })


  return promise;

}


//Migrate all the old friends model to the new one (table Friend)
exports.migrateFriends = function(user) {
  
  var promise = new Parse.Promise();
  var startDate = new Date()
  Parse.Cloud.useMasterKey();
  var counter = 0;
  
  var mainUser = user
  var friendsObjects = [];

  var queryFriend = new Parse.Query(Parse.User);

  if (!user.get("usersFriend")){
      return Parse.Promise.as();
  }
  else if (user.get("usersFriend").length > 300){
    //Don't transform the friends for the prople who has more than 300 friends : they are spammer or stars
    return Parse.Promise.as();
  }
  else{
    queryFriend.containedIn("objectId", user.get("usersFriend"));
  }

  queryFriend.find().then(function(friends){

    var Friend = Parse.Object.extend("Friend");
    var promises = [];
    
    _.each(friends, function(friend){
      var newFriend = new Friend();
      newFriend.set("friend", friend);
      newFriend.set("friendId", friend.id);
      newFriend.set("user", mainUser);
      newFriend.set("score", 0);

      var ACLFriend = new Parse.ACL();
      ACLFriend.setPublicReadAccess(true);
      ACLFriend.setWriteAccess(mainUser, true);
      newFriend.setACL(ACLFriend);

      friendsObjects.push(newFriend);

      promises.push(newFriend.save());
    })

    // Create all friends object
    console.log("**** SAVE ALL FRIENDS *****");
    return Parse.Promise.when(promises);

    
  }).then(function(){

    console.log("**** SET USER *****");
    mainUser.set("nbFriends", friendsObjects.length);
    mainUser.set("lastFriendsModification", new Date());
    mainUser.set("migrationFriendsDone", true);

    // Add all the PFRelation between the user and the friends
    return mainUser.save()

  }).then(function(){
    console.log("**** FINISH MIGRATION OF THIS USER *****");
    var endDate = new Date();
    var lengthJob = endDate - startDate;
    promise.resolve("Migration completed successfully in "+lengthJob+".");

  }, function(error) {
    // Set the job's error status
    promise.reject("Uh oh, something went wrong." + error);
  });


  return promise;


}

