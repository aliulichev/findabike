module.exports = {

  attributes: {
  	  fbId:{
  			type:"string", 
  			required:true
  		},

  		lastRun: {
  			type:"datetime", 
  			required:true
  		},
      lastResult: {
        type:"datetime", 
        required:true
      } 		
  }, 

  init:function(sender, recipient, cb){
      Chat.findOne({'or' :[{"sender":sender,"recipient":recipient}, {"sender":recipient,"recipient":sender} ]}).exec(function(err, chat){
        console.log('chat found' + err)
        if(chat){
          cb(undefined, chat)
          return;
        }

        Chat.create({
         sender:sender, 
         recipient:recipient 
        }).exec(cb)

      });
      
  }
};
