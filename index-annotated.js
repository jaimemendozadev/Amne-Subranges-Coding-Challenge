var input = require('./input.js');

var checkIncrease = (num1, num2, idx, windowSize, trends) => {
  var helper = () => {
    if (num1 < num2) {
      trends.increase++; 
    } else if (num1 > num2){
      trends.decrease++;
      trends.stillIncreasing = false;
    }
  }

  helper();
  trends.counter++;
}

var haveWindowIncrease = (trends) => { 
  trends.windowIncreases.push(trends.increase - trends.decrease);
  trends.increase = 0;
  trends.decrease = 0;
  trends.counter = 0;
  trends.stillIncreasing = true;
  trends.windowStart++;
  
}


var TrackingTrends = (N, K) => {
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
    lastWindowCheck: N.length - K,
    windowIncreases: []
  }  
  
    
  var lastCheck = (idx) => {
    console.log(`do something`)
  }
    
  
  for (var i = 0; i < N.length; i++) {

    if (trends.counter === K - 1) {

      if (trends.windowStart + K === N.length) {

        haveWindowIncrease(trends);
        break;
        
      } else {
        if (trends.stillIncreasing) {
          trends.increase++;
        }  

        i = trends.windowStart;
        haveWindowIncrease(trends);
      }
      
    } else {

      checkIncrease(N[i], N[i+1], i, K, trends);

    }
  }
    
  console.log(`trends.windowIncreases are ${trends.windowIncreases}`)
  
}

TrackingTrends(input.N, input.K);


