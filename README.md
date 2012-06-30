loo.js
======
The Restroom Protocol Library

Features
--------

- Calculate the **maximum number of occupants** that can use a
  set of contiguous stalls without things getting *too* awkward
- **Choose the most socially-acceptable stall** given a set of 
  contiguous stalls and their occupant status
- **Calculate Minespeeper-like distances** away from occupied
  stalls for each empty stall so you can be as informed as 
  possible when making that imporant decision
      
Examples
--------

Let's say you have five contiguous stalls with the 0th, and 2nd
stalls occupied. You can represent these stalls with an array of
Booleans, `true` for occupied, and `false` for vacant.

    ```JavaScript
    var stalls = var stalls = [true, false, true, false, false]
    ```

### Calculate theoretical maximum (non-awkward) occupants

Use `loo.max_occupants` to calculate the theoretical maximum
number of people that can use this set of stalls without things
getting too awkward:

    ```JavaScript
    >>> loo.max_occupants(stalls.length)
    3
    ```
    
Yes ladies, that is a closed-form function.

### Choose a stall

Which stalls are most socially-acceptable to use? 

    ```JavaScript
    >>> loo.choose(stalls)
    [4]
    ```
    
Clearly, the most socially-acceptable stall to use is the 4th
(or last) stall, as it is the greatest distance away from any
occupied stall.

### Create a Minesweeper-like distance map

You're a decisive person. You don't need a computer choosing
things for you! But that doesn't mean you can't be informed
before making your decision.

    >>> loo.minesweeper(stalls)
    [0, 1, 0, 1, 2]

These are the distances away from the nearest occupied stall
for each stall, all in O(2n) time complexity.