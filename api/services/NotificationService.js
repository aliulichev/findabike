function matchKeywords(user, post){
	var matched = _.find(user.keywords, function( keyword ){
	 	return post.message.toLowerCase().indexOf(keyword.toLowerCase()) != -1
	 }) != undefined
	sails.log(post.message)
	sails.log(matched)
	return matched
}
function match(post, cb){
		User.findByPrice(post.price, function(err, users){
			 if(err){
			 	 sails.log(err)
			 	 cb(err)
			 	 return;
			 }
			 cb(undefined, _.filter(users, function(user) { return matchKeywords(user, post) }))
		});
	}

	function processPost(post){
		 match(post, function(err, users){
		 		if(err){
		 			sails.log(err)
		 			return;
		 		}
		 		notifyUsers(users, post)
		 });
	}

	function notifyUsers(users, post){
		users.forEach(function(user){
			notifyUser(user, post)
		})	
	}

	
	function notifyUser(user, post){
		
		EmailService.sendPost(user, post, function(error){
			if(error)
				sails.log(error)
			else
				sails.log("User notifcation is sent to " + user.email + ' price:' + post.price)
		})
	}

module.exports = {

    process: function(data) {       
    	data.forEach(processPost)

    }
};