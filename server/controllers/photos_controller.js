import cloudinary = require('cloudinary');
import Photo from '../models/Photo';

/*
*how to pass in photo upload to this point?
*/

export function uploadPhoto(req, res){
	cloudinary.uploader.upload('pizza.jpg', {tags: 'basic_sample', uid: 'uid'}, function(err, image) {
		if(err){
			console.warn(err);
		}
	});
}