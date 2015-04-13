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
      promise.reject("User is already a friend");
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
      promise.reject("No user found");
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
