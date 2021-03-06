
var resilient = require('resilient');
var servers = [
    'http://api.espn.com'
];

var allShows = [];
var doneFlag = false;

//Return a list of shows
// var getShows = function(callback) {

//     var showsPath = '/audio/shows?apikey=r7gsmkjvz6b99tspg48swttq';
//     var client = resilient({ service: { basePath: '/v1' }})
//     client.setServers(servers)

//     client.get(showsPath, function (err, res) {
//       if (res.status === 200) {
//         //console.log('Success:', res.data)
//         return callback(res.data)
//       } else {
//         console.log('Error:', err)
//         return callback(err)
//       }
//     })
// }


function getShows () {

  return new Promise(function (resolve, reject){
    var showsPath = '/audio/shows?apikey=r7gsmkjvz6b99tspg48swttq';
    var client = resilient({ service: { basePath: '/v1' }})
    client.setServers(servers)

    client.get(showsPath, function (err, res) {
      if (res.status === 200) {
        // Resolve (or fulfill) the promise with data
        return resolve(res.data)
      }
      
      // Reject the Promise with an error
      console.log("Return err " + err)
      return reject(err)

    });
  });
}


// module.exports = getShows;

// //Return a the recording for a given id
// var getRecording = function(callback, id) {
//     var recordPath = '/audio/shows/'+id+'/recordings?apikey=r7gsmkjvz6b99tspg48swttq';
//     var client = resilient({ service: { basePath: '/v1' }})
//     client.setServers(servers)

//     client.get(recordPath, function (err, res) {
//       if (res.status === 200) {
//         console.log('Success:', res.data);
//         resolve(res.data);
//       } else {
//         console.log('Error:', err);
//         resolve(err);
//       }
//     });
// });

function getRecording(id) {
  return new Promise(function (resolve, reject){
    var recordPath = '/audio/shows/'+id+'/recordings?apikey=r7gsmkjvz6b99tspg48swttq';
    var client = resilient({ service: { basePath: '/v1' }})
    client.setServers(servers)

    client.get(recordPath, function (err, res) {
      if (res.status === 200) {
        // Resolve (or fulfill) the promise with data
        return resolve(res.data)
      }      
      // Reject the Promise with an error
      console.log("Return err " + err)
      return reject(err)
    });
  });
}


function buildShowData(data) {

  var shows = data.shows;
  // var allShows = [];

   console.log(shows.length);

     shows.forEach(function (show) {

        allShows.push({
          "id": show.id,
          "headline": show.headline,
          "description": show.description,
          "link": "to be filled"
        });

      });
 return allShows;
}



function addRecordingData(data){
  var shows = data;

  console.log(shows.length);
  
  // var prevPromise = Promise.resolve(); // initial Promise always resolves

  return new Promise(function (resolve, reject){
    shows.forEach(function(show) {  
      
      getRecording(show.id).then(function(data) {
        var recordingData = data.recordings;
        var recording = recordingData[0];
        console.log(recording);
        // console.log('**************', recording.links.source.default.href);

        show.link = recording.links.source.default.href;
        allShows.push(item);

        // console.log(allShows);

      }).catch(function(error) {
        console.log(error);
      });

    });
  });
}

// function addRecording(shows, id) {
//        getRecording(show.id).then(function (data) {
//             recordingData = data.recordings;

//             console.log('Processing id ' + show.id);

//             allShows.push({
//               "id": show.id,
//               "headline": show.headline,
//               "description": show.description,
//               "link": recordingData[0].links.source.default.href
//             });

//         }, function(err) {
//             console.error("Could not retrieve recording data for id ." + show.id + ' ' + err);
//         });

//     }

//      console.log(allShows);
// }

// module.exports = { getShows, recordingPromise };
//getShows()

// var showData;
// showPromise.then(function (data) {
//           console.log(data)
//           showData = data;
//       }, function(err) {
//           console.error("Could not retrieve recording data for id ." + show.id + ' ' + err);
//       });

// buildShowData(showData);

// Usage:
getShows().then(function(data) {
    // console.log("i am here ---> " + data);
    return buildShowData(data);

  }).then(function(data) {
    console.log(data);
    addRecordingData(data).then(function(data) {
        console.log(allShows);
    });

 });



  //********************** seriously
//   function buildShowData2(data) {

//   var shows = data.shows;
//   var allShows = [];

//   console.log(shows.length);

//   promiseWhile(function() {
//       // Condition for stopping
//       console.log("end Condition");
//       return shows.length == allShows.length;
//   }, function() {
//       // The function to run, should return a promise
//       return new Promise(function(resolve, reject) {
//            var recordingData = data.recordings;
//            var recording = recordingData[0];

//             allShows.push({
//               "id": show.id,
//               "headline": show.headline,
//               "description": show.description,
//               "link": recording.links.source.default.href
//             });

//       });
//   }).then(function() {
//       // Notice we can chain it because it's a Promise, this will run after completion of the promiseWhile Promise!
//       console.log(allShows);
//       console.log("Done");
//   });
  
// }

// function buildShowData3(data) {
//   var shows = data.shows;
//   var allShows = [];
//   var promises = [];

//   console.log(shows.length);

//   shows.forEach(function(show) {
//     // console.log(show);
//     promises.push(getRecording(show.id)); // push the Promises to our array
//   });

//   console.log(promises.length);
//   // console.log(promises[0].recordingData[0].links);

//   Promise.all(promises).then(function(dataArr) {
//     dataArr.forEach(function(data) {
//       var recordingData = data.recordings;
//       var recording = recordingData[0];
//       console.log(data);
//             allShows.push({
//               // "id": show.id,
//               // "headline": show.headline,
//               // "description": show.description,
//               "link": recording.links.source.default.href
//             });
//     });


//     return allShows;
//   }).catch(function(err) {
//     console.log(err);
//   });

// }