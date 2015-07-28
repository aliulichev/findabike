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
      lastResultCreated: {
        type:"datetime", 
        required:true
      } 		
  },

  updateById:function(groupId, lastResultCreated, cb){
       FBGroup.findOne({fbId:groupId}).exec(function findOneCB(err, group){
          if(err){
             cb(undefined, err)
          } 
          if(group){ 
              group.lastResultCreated = lastResultCreated
              group.lastRun = new Date()
              group.save(cb);
              return;
          }  

          FBGroup.create({
            fbId:groupId, 
            lastRun:new Date(),
            lastResultCreated:lastResultCreated
          }).exec(cb)

          
       });     
  }
};
