
// DataService.js - in api/services
var https = require('https');
var token = '380737268756635|G-m4DS2gM7-YnfOpFiGeGkFPSdY'

var parse = function(post){
    var result = {}
    if(post === null)
        return result;

    var message = post.message
    if(!message){
        return result;
    }
    result.message = message
    result.created = new Date(post.created_time * 1000)

    result.link = post.link
    result.id = post.id
    result.picture = post.full_picture

    var tries = [ 
        message.match(/\s*\.*\-*(\d+)\s*\-*€\.*\s*/),
        message.match(/\s*\.*€\s*\-*(\d+)\-*\.*\s*/),
        message.match(/\s*\-*(\d+)\-*\s*euro|eur\.*\s*/i),
        message.match(/\s*\.*\-*euro|eur\-*\s*\-*(\d+)\-*\s*/i),
        message.match(/(\d+)\s*e/i)

    ]

    var transformToResult = function(match){
         var result = {detected:false}
         if(match &&match[1]){
             result.price = parseInt(match[1])
             result.detected = true
         }
            
         return result  
    } 

    var priceResult = _.chain(tries).map(transformToResult).find(function(detected) {return detected.detected == true}).value()
    if(priceResult && priceResult.price)
        result.price = priceResult.price
    return result;

}

var parseData =function(data, groupId){
 // sails.log(data)  
  var results = data.data.map(parse)
  return _.filter(results,function(post) {return Object.keys(post).length !== 0});
}

var fetchNew = function(groupId, callback){
     var url = 'https://graph.facebook.com/v2.4/' + groupId +
    '/feed/?fields=message,picture,full_picture,link,created_time&limit=100&date_format=U&access_token=' + token
   // console.log(url)
    https.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            callback(parseData(JSON.parse(body), groupId), undefined)
        });
        }).on('error', function(e) {
            sails.log("Got error: ", e);    
            callback(undefined, e)
        
    });
}

module.exports = {

    fetchData: function(groupId, callback) {       
            fetchNew(groupId, callback)
    }
};