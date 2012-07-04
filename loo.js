/*
    loo.js - The restroom protocol library
    
    Use this library to make various can-related decisions based on 
    the International Choice of Urinal Protocol (I.C.U.P)
*/

var loo = {
    log2: function(n){
        return Math.log(n) / Math.log(2);
    },
    max_occupants: function(n){
        /* Return the maximum number of occupants a given number of 
        contiguous stalls can have without it getting kinda awkward,
        assuming the occupants arrive one after another.
        
        Params:
            `n`, the number of congiguous stalls.
            
        Returns:
            The maximum number of occupants that can use the given
            stalls without it getting too awkward.
        
        Based on the XKCD's "Urinal protocol vulnerability" 
        (http://blog.xkcd.com/2009/09/02/urinal-protocol-vulnerability/)
        */
        
        // Zero stalls, zero possible occupants
        if(n < 1){
            return 0;
        
        // One or two stalls, one possible occupant (variation on
        // urinal protocol)
        } else if(n == 1 || n == 2){
            return 1;
            
        // Otherwise, return result of the closed-form expression for
        // > 2 stalls
        } else {
            return  1 + Math.pow(
                        2, Math.floor(loo.log2(n - 2) - 1)
                    ) +
                    Math.max(
                        0, 
                        n - 3 / 2 * Math.pow(
                            2, Math.floor(loo.log2(n - 2))
                        ) - 1
                    );
        }
    },
    
    choose: function(stalls){
        /* Choose the most socially-acceptable stall to use given a 
        set of contiguous stalls and thier vacancy status based on
        furthest distance away from the nearest stall.
        
        Params:
            `stalls` should be array of booleans representing a set of 
            contiguous stalls and their vacancy statuses. An occupied 
            stall should be represented as a `true`, and an vacant 
            stall should be represented as `false`. For example, 
            `[true, false, false]` would represent a set of three 
            stalls, with the first stall occupied.
            
        Returns:
            An array of the positions in the `stalls` array 
            representing the optimal stalls to use based on furthest 
            distances away from the nearest occupied stall.
            
            If there are no optimal stalls, an empty array will be 
            returned.
        */
        
        var optimal_stalls = [];
        var minesweeper_map = this.minesweeper(stalls);
        
        if(minesweeper_map.length > 0){
            var max_distance =
                isNaN(Math.max.apply(null, minesweeper_map)) ? 
                undefined : Math.max.apply(null, minesweeper_map);
            
            if(max_distance != 0){
                for(var i = 0; i<minesweeper_map.length; ++i){
                    var stall_distance = minesweeper_map[i];
                    
                    if(stall_distance == max_distance){
                        optimal_stalls.push(parseInt(i));
                    }
                }   
            }
        }
        
        return optimal_stalls;
    },
    
    is_talking_allowed: function(){
        /* Determines if talking is currently allowed in the loo. 
        */
        return false;
    },
    
    minesweeper: function(stalls){
        /* Given an array representing stalls and their occupants, 
        determine the distance of each vacant stall from their
        nearest occupied stall, much like the values in Minewsweeper.
        
        Params:
            `stalls` should be array of booleans representing a set of 
            contiguous stalls and their vacancy statuses. An occupied 
            stall should be represented as a `true`, and an vacant 
            stall should be represented as `false`. For example, 
            `[true, false, false]` would represent a set of three 
            stalls, with the first stall occupied.
            
        Returns:
            An array containing distance values for each stall, 
            corresponding to the given `stalls` array, will be 
            returned. Occupied stalls will always have the value of 0, 
            and stalls with no nearest occupied stall will be 
            undefined.
        */
        
        var map = new Array(stalls.length);
        
        for(i in stalls){
            var stall = stalls[i];
            var prev_dist = map[i-1];
            
            if(stall){
                map[i] = 0;
                
            } else if(prev_dist != undefined){
                map[i] = ++prev_dist;
            }
        }
        
        for(var i = stalls.length - 1; i >= 0; --i){
            var stall = stalls[i];
            var prev_dist = map[i+1];
            
            if(stall){
                map[i] = 0;
                
            } else if(prev_dist != undefined){
                dist_from_left = map[i];
                dist_from_right = ++prev_dist;
                
                if(!dist_from_left){
                    map[i] = dist_from_right;
                } else {
                    map[i] = Math.min(dist_from_right, 
                            dist_from_left);
                }
            }
        }
        
        return map;
    }
}