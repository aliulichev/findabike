var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'findabikenl@gmail.com',
        pass: '22findabikenl'
    }
});

function resizeUrl(url){
	//var resize = 'http://i.embed.ly/1/display/resize?url=' + encodeURIComponent(url);
	//console.log(resize)
	return url;
} 
module.exports = {

    sendPost: function(email, name, post,cb) {       
    	 var mailOptions = {
    		from: 'Find a Bike <ffindabikenl@gmail.com>', // sender address
    		to: email, // list of receivers
    		subject: 'Bike for ' + post.price + ' EUR', // Subject line
    		//stext: 'Hello world ✔', // plaintext body
    		html: '<b>Hi, '+ name+'</b><p>' + post.message + '</p></br>'+
    		'<img src="'+ resizeUrl(post.picture) + '"</img>'
    		+'</br><a href="'+ post.link+'">GO</a>' // html body
		};
		console.log("sending post:" + post.id + " to " +  email)
		transporter.sendMail(mailOptions, function(error, info){
   		 	if(error){
        		console.log(error);
        		cb(error)
    		}else{
        		console.log('Message sent: ' + info.response);
        		cb()
    		}
		});
    }
};