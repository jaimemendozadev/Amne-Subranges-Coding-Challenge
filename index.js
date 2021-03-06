var fs = require('fs');
var importedFile = process.argv[2];
var helpers = require('./helpers.js');


var TrackingTrends = (N, K) => {
  
  var trends = {
    counter: 0,
    increase: 0,
    decrease: 0,
    windowStart: 0,
    stillIncreasing: true,
    windowIncreases: []
  }  
  

  for (var i = 0; i < N.length; i++) {
    /*
    First check to see if we have compared all the   
    numbers to each other in the current window. 
    For any K size window, you can only make K - 1 comparisons.
    */
    

    if (trends.counter === K - 1) {


      /*
      trends.windowStart + K means we're currently 
      processing the last possible window set because the
      starting index of the current window + the K window size 
      equals the length of the N data array
      */

      if (trends.windowStart + K === N.length) {
        /*
        inside here, we're at the last comparison 
        of the last window of our N data array.
        make the last comparison, the last calculation, 
        and then break the loop
        */
        if (trends.stillIncreasing) {
          trends.increase++;
        } 

        helpers.haveWindowIncrease(trends);
        break;
        
      } else {
        /*
        we've reached the end of the window comparison, but
        not the last possible window set. 
        first, check to see if the entire set was increasing
        second, use trends.windowStart to reset the loop incrementor
        finally make the last comparison of the current window. 
        the loop at i will restart at windowStart + 1;
        */

        if (trends.stillIncreasing) {
          trends.increase++;
        }  

        i = trends.windowStart;
       helpers.haveWindowIncrease(trends);
      }
      
    } else {
      /*
      we haven't made it to the 2nd to last comparison of the 
      current window, this is a simple comparison between 2 numbers
      */
      helpers.checkIncrease(N[i], N[i+1], trends);

    }
  }
  
  console.log("The window increase results are: ");
  for (var idx in trends.windowIncreases)
    console.log(trends.windowIncreases[idx]);

  return trends.windowIncreases;
    
    
}


/*
perform async read of file & 
invoke TrackingTrends in callback
*/
fs.readFile(importedFile, (err, data) => {
  if(err) throw err;

  /*
  data is converted to a string, then converted
  to array by splitting the string at new line 
  */
  var dataArray = data.toString().split("\n");


  //each string is trimmed to remove trailing white space
  dataArray = dataArray.map(string => string.trim());


  //extract the N_Length, K_Window, & N_Data and convert to numbers
  var N_Length = dataArray[0].split(" ")[0];
  N_Length = parseInt(N_Length, 10);

  var K_Window = dataArray[0].split(" ")[1];
  K_Window = parseInt(K_Window, 10);

  var N_Data = dataArray[1].split(" ");  
  N_Data = N_Data.map(int => parseInt(int, 10));  



  /*
  we first check to make sure the window size is greater than 1,
  that the expected N length of the data matches the actual data length,
  and that we have enough data to make a comparison
  */

  if (K_Window < 2) {
    throw new Error('Your window size needs to be greater than > 1');
  }

  if (N_Length !== N_Data.length){
    throw new Error('The expected size of the data doesn\'t match what you passed in. Please make sure you passed in all the data.');
  }

  if (N_Data.length < 1 || K_Window > N_Data.length) {
    throw new Error('You have insufficient data to make a comparison');
  }

  TrackingTrends(N_Data, K_Window);
  
});







