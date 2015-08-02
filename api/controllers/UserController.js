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
		console.log(price)
		var keywords = req.param('keywords')
		User.create({fbId:"1", name:"John Smith", email:email, 
			priceFrom:0, priceTo:price, keywords:keywords}).exec(function(err, user){
				if(err){
					res.badRequest(err)
					return;
				}
				sails.log(user)
				res.send("OK")	

		})
		
	}
	
};

