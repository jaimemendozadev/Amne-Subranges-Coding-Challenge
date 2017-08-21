# [Amne Subranges Coding Challenge]()
Amne Engineering Challenge Solution

## Table of contents

- The Problem
- How It Works
- How to Run the Function
- Created By


# The Problem

As we look at patterns across windows of certain sizes, we will need to efficiently track trends such as increasing and decreasing subranges.

For this problem, you are given `N` days of average home sale price data, and a fixed window size `K` . For each window of `K` days, from left to right, find 

> the number of increasing subranges within the window `- minus` the number of decreasing subranges within the window.

[...] An increasing subrange is defined as a contiguous range of indices `[a,b], a < b` , where each element is larger than the previous element. A decreasing subrange is similarly defined, except each element is smaller than the next.

# How It Works

Our main function `TrackingTrends` is what determines the increasing or decreasing subranges for an `N` input. It relies on `checkIncrease` and `haveWindowIncrease` helper functions located in `helpers.js`.

 Inside our `TrackingTrends` function, we have a `trends` object with key/value pairs that tracks a lot of things, including:
   - a `counter` key that tracks the number of comparisons made in each window
   - an `increase` key that tracks increasing subranges when two numbers are compared
   - a `decrease` key tracks decreasing subranges when two numbers are compared
   - a `windowStart` key tracks the index of the start of each window in the `N` input
   - a `stillIncreasing` key checks if each successive calculation in the current window continues reuslting in an increasing subrange
   - a `windowIncreases` key with an `[]` array value that collects the difference between increasing & decreasing subranges for each window



We solve by looping through the entire N input and check each `K` size window starting at index `i`. When we're done checking a window, we reset the loop and start the next window at the old start `i` index `+1`;  

1. The second line of the loop checks to see if we have compared all the numbers to each other in the current window. For any `K` size window, you can only make `K - 1` comparisons.

2. But starting at index 0, we check a window of size `K`.

   -In each window we compare two numbers at a time with `helpers.checkIncrease`. The function just checks if two numbers result in an increasing or decreasing subrange and increments the appropriate counter in the `trends` object.

3. Once we've made the last comparison in a window, we enter the `if` clause on second line of the loop.
  
   -First, we check if we <strong>made the last comparison of the last possible window</strong> in the `N` input. This is represented by `trends.windowStart + K === N.length`.
   
   -If we did, check `trends.stillIncreasing` to see if the entire window was increasing and increment the `trends.increase` counter one last time.
   
   -Run `helpers.haveWindowIncrease` to make the final calculation, break out of the loop, and return the results.
      
4. `Else` if we're not in the last possible window of the `N` input
   
   -Check `trends.stillIncreasing` to see if the entire window was increasing and increment the `trends.increase` counter one last time.
        
   -Reset the loop index `i` at the current value of `trends.windowStart` so that the next window insepction could start at the the old start `i` index `+1`.
  
   -Invoke `haveWindowIncrease` to make all the subrange calculations and reset the counters in the `trends` object.

   -The loop will increment the `i` index and the next new window inspection will start at new `i` index.

5. This process will repeat until we've <strong>made the last comparison of the last possible window</strong> at `trends.windowStart + K === N.length`.


# How to Run the Function

You'll need Node and NPM to run this program. Go to the [Node website](https://nodejs.org/en/download/) for instrucitons on installing Node to your machine.

Clone the project repo from GitHub locally to your computer.

Open your terminal and make your way to the root directory of the repo.

From the root directory of the project, run `$ npm run start` in your terminal. You should see a `console.log` of the results.

Our `TrackingTrends` function takes an `N` paramater that represents the input (the data to analyze in an array format) and a `K` paramater that represents the window size. These paramaters can be changed in our `input.js` file by changing the `N` and `window` variables respectively.


# Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)