var Const = {
   FILL_COLOR: 1432,
   CREATE_FLOW: 1234,
   RANDOM_DIRECTS: ["1230", "2301", "3012", "0123", "1032", "2103", "3021", "0213", "1320"],
   DIRECT_X: [0, -1, 0, 1],
   DIRECT_Y: [1, 0, -1, 0]
}

var Random = {
   nextInt(_value) {
      //get an integer in [0,_value)

      return _value <= 0 ? 0 : Math.floor(_value * Math.random());
   },

   getInt(_first, _second) {
      // get an integer in [_first,_second)      
      return _first >= _second ? 0 : _first + Math.floor((_second - _first) * Math.random());
   }
}

function Pair(_first, _second) {
   this.first = _first;
   this.second = _second;

   this.equals = (other) => (this.first === other.first && this.second === other.second);

}
/*
 * Flow Manager
 */

function FlowManeger() {
   this.split = (flow, index) => [
      flow.slice(0, index),
      flow.slice(index + 1)
   ];

   this.getLongest = function (flows) {
      let longestIndex = 0,
         longestValue = flows[0].length;
      flows.forEach((flow, index) => {
         if (flow.length > longestValue) {
            longestValue = flow.length;
            longestIndex = index;
         }
      });
      return {
         index: longestIndex,
         value: longestValue
      }
   };

   this.divideFlows = function (flows, target) {

      let output = [],
         temp = [],
         current = flows.length;
      output.push.apply(output, flows);

      while (current < target) {
         temp.length = 0;
         temp.push.apply(temp, output);
         output.length = 0;

         let index = this.getLongest(temp).index,
            flow = temp[index],
            length = flow.length;

         output.push.apply(output, temp.slice(0, index));
         output.push.apply(output, temp.slice(index + 1));

         if (length > 5) {
            let divisivePosition = Random.nextInt(length - 6);
            output.push.apply(output, this.split(flow, divisivePosition + 3));
            current++;
         } else {
            output.push(flow);
         }
      }
   }
}

/*
 *  Grid
 */

function Grid(_size) {
   this.size = _size;
   this.grid = [];

   for (let line = 0; line < _size; line++) {
      let _line = [];
      for (let col = 0; col < _size; col++) {
         _line.push(-1);
      }
      this.grid.push(_line);
   }

}
/*
 * Level
 */

function Level(_size) {
   var size = _size,
      level = "a1abbcc2";

   var _isInside = (_x, _y) => (0 <= _x && _x < size && 0 <= _y && _y < size);

   var _fillDominoGrid = function () {
      let grid = (new Grid(size)).grid,
         domino = 0;

      for (let line = 0; line < size; line++) {
         for (let col = 0; col < size; col++) {
            if (grid[line][col] == -1) {
               if (line == size - 1 && col > 1 && grid[line][col - 1] == -1) {
                  grid[line][col] = grid[line][col - 1] = domino++;

               } else if (col == size - 1 && line > 1 && grid[line - 1][col] == -1) {
                  grid[line][col] = grid[line - 1][col] = domino++;
               } else {
                  let orderDirects = Const.RANDOM_DIRECTS[Random.nextInt(Const.RANDOM_DIRECTS.length)];

                  Array.from(orderDirects).every(element => {
                     let dir = parseInt(element);

                     let x = line + Const.DIRECT_X[dir],
                        y = col + Const.DIRECT_Y[dir];
                     if (_isInside(x, y) && grid[x][y] == -1) {
                        grid[line][col] = grid[x][y] = domino++;
                        return false;
                     }
                     return true;
                  });
               }
            }

         }

      }

      console.log(grid);
   }

   this.getLevel = function () {
      size = _size;
      _fillDominoGrid(size);
   }
   return this.getLevel();
}

var level = new Level(5);