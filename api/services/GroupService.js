var updateGroup = function(groupId,  lastResultCreated, cb){
		FBGroup.updateById(groupId, lastResultCreated, cb)
}

var getLastResultDate = function(data){
		return _.chain(data).sortBy(function(post){
			return -post.created.getTime()
		}).map(function(post){return post.created}).first().value()
}

var fetchData = function(groupId, callback){
	DataService.fetchData(groupId, function(data, err){
			if(err){
				sails.log(err)
				cb(undefined, err)
				return;
			}	
			callback(err, data)	
		})
}

var getNew = function(groupId, callback){
	 FBGroup.findOne({fbId:groupId}).exec(function findOneCB(err, group){
	 	    var yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
	 		var since = group != undefined ? group.lastResultCreated : yesterday
	 		fetchData(groupId, function(err, data){
	 
	 			 if(err) {
	 			 	callback(err, undefined); return;
	 			 }

	 			 var filtered = _.filter(data, function(post){return post.created.getTime() > since.getTime()})
	 			 callback(filtered)
	 		})
	 });
}

module.exports = {

    checkUpdates: function(groupId, callback){
    	 getNew(groupId,  function(data){
    	 	var lastPostTime = getLastResultDate(data)
    	 	sails.log(data.length + ' new items for group ' + groupId + ". Last post at " + lastPostTime)
    	 	updateGroup(groupId, lastPostTime, function(group){
    	 		 NotificationService.process(data)
    	 		 callback(data)
    	 	})
    	 })
    }
    
};