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
		sails.log(email)
		sails.log(price)
		sails.log(keywords)
		res.send("OK")
	}
	
};

