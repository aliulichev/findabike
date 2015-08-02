/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	  fbId:{
  			type:"string", 
  			required:true
  		},
      name: {
        type:"string", 
        required:true
      },

      email: {
        type:"string", 
        required:true,
        unique: true
      },
  	 priceFrom: {
  			type:"integer", 
  			required:true
  		},
      priceTo: {
        type:"integer", 
        required:true
      },
      keywords: {
        type:"array", 
        required:false
      }		
  }, 

  findByPrice:function(price, cb){
  	  User.find({ priceFrom: { '<=': price }, priceTo: { '>=': price }}).exec(cb)
  }

};

