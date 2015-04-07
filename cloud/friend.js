// Utils function about user friends

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