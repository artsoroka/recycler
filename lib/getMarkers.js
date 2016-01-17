var request = require('request'); 
var xml2js  = require('xml2js').Parser();  
var qs      = require('querystring'); 
var Promise = require('bluebird'); 
var config  = require('../config').dataProvider; 

var fetchData = function(url){
  return new Promise(function(resolve, reject){
    request.get(url, function(err, response, body){
      if( err ) {
        console.log('While fetching url an error occured', err);
        throw err; 
      }

      resolve(body); 
    
    }); 

  }); 
}; 

var parseXml = function(xml){
  return new Promise(function(resolve, reject){
    
    if( ! xml ) throw Error('no xml content to parse'); 

    xml2js.parseString(xml, function(err, result){ 
      if( err ) {
        console.log('While parsing XML response an error occured', err); 
        throw err; 
      } 

      if( ! result 
          || ! result.markers 
          || ! result.markers.marker 
          || ! result.markers.marker.length ) return resolve([]); 

      resolve(result.markers.marker); 

    }); 

  }); 

}; 

module.exports = function(cityId){
    
  var params = qs.stringify({
      city_id: cityId
  });
  var url = [config.cityMarkers, params].join('?'); 
  
  return new Promise(function(resolve, reject){

    fetchData(url)
      .then(function(xml){
        return parseXml(xml); 
      })
      .then(function(markers){
        var list = markers.reduce(function(acc, entry){
        var marker = entry['$']; 
          acc.push({
            cityId: cityId, 
            id    : marker.id, 
            title : marker.title, 
            lat   : marker.lat, 
            lng   : marker.lng, 
            rating: marker.rating
          }); 
          return acc; 
        }, []);

        resolve(list); 

      }); 
  }); 

};  