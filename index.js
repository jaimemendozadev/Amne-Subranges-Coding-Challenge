var input = require('./input.js');
var helpers = require('./helpers.js');


var TrackingTrends = (N, K) => {
  /*
  we first check to make sure the window size is greater than 1,
  that we have enough data to make a comparison, and that N 
  is an array.
  */

  if (!Array.isArray(N)){
    return 'Your N input is formatted incorrectly, please use array formatting.'
  }
  if (K < 2) {
    return 'Your window size needs to be greater than > 1';
  }

  if (N.length < 1 || K > N.length) {
    return 'You have insufficient data to make a comparison';
  }
  
 

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
        of the last window of our N data array
        make the last comparison and then break the loop
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
    
  for (var idx in trends.windowIncreases)
    console.log(trends.windowIncreases[idx]);

  return trends.windowIncreases;
    
    
}

TrackingTrends(input.N, input.K);


