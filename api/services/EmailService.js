var nodemailer = require('nodemailer');
var path = require('path')
var EmailTemplate = require('email-templates').EmailTemplate
var templateDir = path.join(__dirname, '..', '..', 'templates', 'email')
sails.log(templateDir)
var email = new EmailTemplate(templateDir)

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }
});

function render(user, post, cb){
    email.render(post, function (err, result) {
    if (err) return cb(err)
    cb(undefined, result.html)    
    return     
  })
}

function resizeUrl(url){
	//var resize = 'http://i.embed.ly/1/display/resize?url=' + encodeURIComponent(url);
	//console.log(resize)
	return url;
} 

function send(email, html, price, cb) {
     var mailOptions = {
            from: 'Find a Bike <ffindabikenl@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Bike for ' + price + ' EUR', // Subject line
            html: html
    };
         transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    cb(error)
                }else {
                    console.log('Message sent: ' + info.response);
                    cb()
                }
            });
}


module.exports = {

    sendPost: function(user, post,cb) {       
    	
        render (user, {post:post, name:user.name, link:sails.getBaseURL() + "/unsubscribe/" + user.id,  userId:user.id}, function(err, html) {
               if(err) {
                    sails.log(err) 
                    cb(err) 
                    return
                }
                //console.log(post)
               send(user.email, html, post.price, function(err){
                    if(err) {
                        sails.log(err)
                        cb(err)
                        return 

                    }
                    console.log("sent post:" + post.id + " to " +  user.email)
               }) 
        })
		
		
    }
};
