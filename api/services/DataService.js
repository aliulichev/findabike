
// DataService.js - in api/services
var https = require('https');
var token = 'CAAE7j6ehI9IBAKg3P1iUPXFKVoHZBW56dfpNvfvMpJK4PYLBRycQb0surtOSRQrxZA61UoIUiXtlwrA5912i8oz2LYZBjywIYFEJLDbfOnCRYAw6J3M8yma7As6CzHL1ShYwJmgB9Ck7AWHkZBi8AmWb3Hi2iJdhhyRKX5FMuM7FFso7gM0aZCrlb47TuuRByFXUB4sLzaUetmCpkwcZCpZCqWbGwRDyssZD'

var parse = function(post){
    var result = {}
    if(post === null)
        return result;

    var message = post.message
    if(!message){
        return result;
    }
    result.message = message
    result.created = new Date(Date.parse(post.created_time))

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
  //sails.log(data)  
  var results = data.data.map(parse)
  return _.filter(results,function(post) {return Object.keys(post).length !== 0});
}

var fetchNew = function(groupId,since, callback){
    var sinceUrlParam = since != undefined ? "&since=" + since.getTime(): ''
     var url = 'https://graph.facebook.com/v2.4/' + groupId +
    '/feed/?fields=message,picture,full_picture,created_time&limit=100'+
    sinceUrlParam
    +'&access_token=' + token
   // sails.log(url)
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

    fetchData: function(groupId,since, callback) {       
            fetchNew(groupId, since, callback)
    }
};