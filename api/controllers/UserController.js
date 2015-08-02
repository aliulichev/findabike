/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	subscribe:function(req,res){
		var email = req.param('email');
		var price = req.param('price')
		var keywords = req.param('keywords')
		User.findOne({ email: email}).exec(function(err, user){
			 if(err){sails.log(err); res.badRequest(err); return;}
			 

			 if(user){
			 	user.priceTo = price
			 	user.keywords = keywords
			 	user.save(function(err){			 	 
			 		if(err){sails.log(err); res.badRequest(err); return;}
			 	 	sails.log('Price updated to ' + price)
			 		res.send("OK");	return;

			 	})
			 } else {
			 	User.create({fbId:"1", name:"John Smith", email:email, 
					priceFrom:0, priceTo:price, keywords:keywords}).exec(function(err, user){
					if(err){
						sails.log(err)
						res.badRequest(err)
						return;
					}
					sails.log(user)
					res.send("OK")	

				})

			 }	
			


		})	
		
	}
	
};

