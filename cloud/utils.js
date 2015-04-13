//UTILS FUNCTIONS 
var Image = require("parse-image");

//PHOTO
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