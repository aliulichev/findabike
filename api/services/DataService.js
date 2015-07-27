
// DataService.js - in api/services
var https = require('https');
var token = 'CAAF3VVJtxX0BAFUTqf60nnZCDNlcVzQskqufBqq4Fn0dRIvbgGtJLZB1TlQsqctNjaZBBGb8NQoaY0WbrZA1ZACDH52Uh8DRR7ZCncu3nolpC7JJZBR6ZApIzip9Gp5fR3gKsEKpKCaE03bZAgNirb8tcpBaPCDewlhwPr65Y6y3JI0A2yqDuYun6phuvRMRzBaU6vMQXWrv0Mm3n9tVgoKKJuwY5DEJHNT4ZD'

var parse = function(post){
    var result = {}
    if(post === null)
        return result;

    var message = post.message
    if(!message){
        return result;
    }
    result.message = message
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
  var results = data.data.map(parse)
  // var withPrice = _.filter(results, function(result){ return result.price})
  // var withoutPrice = _.filter(results, function(result){ return !result.price})
  // var filtered = _.filter(results, function(result){ return result.price < 70})
  
  // var prices = withPrice.map(function(bike) {return bike.price})
  // sails.log("Group" + groupId)
  // sails.log("All results :" + results.length)
  // sails.log("All detected :" + withPrice.length)
  return results;
}

var fetchNew = function(groupId, callback){
    var url = 'https://graph.facebook.com/v2.4/' + groupId +
    '/feed/?fields=message,picture,full_picture&limit=100&access_token=' + token
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