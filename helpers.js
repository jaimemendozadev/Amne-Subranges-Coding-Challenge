var checkIncrease = (num1, num2, trends) => {
    
  if (num1 < num2) {
    trends.increase++; 
  } else if (num1 > num2){
    trends.decrease++;
    trends.stillIncreasing = false;
  }
    
  
  
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
module.exports = {
  checkIncrease,
  haveWindowIncrease
}