var updateGroup = function(groupId,  lastResultCreated, cb){
		FBGroup.updateById(groupId, lastResultCreated, cb)
}

var getLastResultDate = function(data){
		return _.chain(data).sortBy(function(post){
			return -post.created.getTime()
		}).map(function(post){return post.created}).first().value()
}

var fetchData = function(groupId, since, callback){
	DataService.fetchData(groupId, since, function(data, err){
			if(err){
				sails.log(err)
				cb(undefined, err)
				return;
			}
			callback(data, err)	
		})
}

var getNew = function(groupId, callback){
	 FBGroup.findOne({fbId:groupId}).exec(function findOneCB(err, group){
	 		var since = group != undefined ? group.lastResultCreated : undefined
	 		fetchData(groupId, since, callback)
	 });
}

module.exports = {

    checkUpdates: function(groupId, callback){
    	 getNew(groupId, function(data){
    	 	var lastPostTime = getLastResultDate(data)
    	 	sails.log(data.length + ' new items for group ' + groupId + ". Last post at" + lastPostTime)
    	 	updateGroup(groupId, lastPostTime, function(group){
    	 		 callback()
    	 	})
    	 })
    }
    
};