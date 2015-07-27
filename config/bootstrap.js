/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
 var http = require('http');
var groups = ['245976828868737', '857687074272396', '1413120325569205', '1585480988396293']
var trackGroup = function(groupId){
	setTimeout(function(){ 
		GroupService.checkUpdates(groupId,function(){
			trackGroup(groupId)
		})
	 }, 1000);
}





module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  groups.forEach(function(group){trackGroup(group)})
  cb();
};
