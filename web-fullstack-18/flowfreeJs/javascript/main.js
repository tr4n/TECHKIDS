var Point = {
    first : 0,
    second: 0, 
}



var a = [[1],[2]];
a.push([2, 3, 4]); 
 for(var i = 0 ; i < a.length ; i ++){
    var line = "";  
    for(var j = 0 ;j < a[i].length ;j ++){
        line += (a[i][j] + " "); 
     }; 
     console.log(line); 
 }

 a[2].map((value, index) => (value * index)); 
 console.log(a[2].map((value, index) => (value * index)));   