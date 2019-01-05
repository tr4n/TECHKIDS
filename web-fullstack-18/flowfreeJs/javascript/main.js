var Random = {
    nextInt(maxValue) {
        return Math.floor(maxValue * Math.random());
    }
}

var PointManager = {
    getDefaultPoint() {
        return {
            x: 0,
            y: 0
        };
    },
    newPoint(_x, _y) {
        return {
            x: _x,
            y: _y
        };
    },

    getX(point) {
        if (point == null) return null;
        return point.x;
    },

    getY(point) {
        if (point == null) return null;
        return point.y;
    }
}



var FlowManager = {
    getDefaultFlow() {
        return {
            pointArray: []
        };
    },

    newFlow(_pointArray) {
        return {
            pointArray: _pointArray
        };
    },

    length(flow) {
        return flow == null ? null : flow.pointArray;
    },

    length(flow) {
        if (flow == null) return -1;

        if (flow.pointArray == null) return -1;
        return flow.pointArray.length;
    },

    getHead(flow) {
        if (flow == null) return -1;
        if (flow.pointArray == null) return -1;
        if (flow.pointArray.length < 1) return -1;
        return flow.pointArray[0];
    },

    getTail(flow) {
        if (flow == null) return -1;
        if (flow.pointArray == null) return -1;
        if (flow.pointArray.length < 1) return -1;
        return flow.pointArray[flow.pointArray.length - 1];
    },

    add(flow, position) {
        flow.pointArray.push(position);
        return position;
    },

    split(flow, index) {
        return [{
                pointArray: (flow.pointArray.slice(0, index))
            },
            {
                pointArray: (flow.pointArray.slice(index, this.length(flow)))
            }
        ];

    },

    getMaxLength(flowArray) {

        let maxIndex = 0,
            maxLength = this.length(flowArray[0]);
        flowArray.forEach((flow, index) => {
            if (this.length(flow) > maxLength) {
                maxLength = this.length(flow);
                maxIndex = index;
            }
        });

        return {
            index: maxIndex,
            value: maxLength
        };
    },

    getFinalFlowArray(input, finalSize) {
        let output = [];
        let tempArray = [];

        output.push.apply(output, input);
        let currentSize = input.length;


        while (currentSize < finalSize) {
            //  console.log("currentSize: " + currentSize + " finalSize: " + finalSize);

            tempArray.length = 0;
            tempArray.push.apply(tempArray, output);
            output.length = 0;
            let index = this.getMaxLength(tempArray).index;
            let flow = tempArray[index];
            output.push.apply(output, tempArray.slice(0, index));
            output.push.apply(output, tempArray.slice(index + 1));

            if (this.length(flow) > 4) {
                let randomPosition = Random.nextInt(this.length(flow) - 4);
                output.push.apply(output, this.split(flow, randomPosition + 2));

                currentSize++;
            } else if (this.length(flow) == 4) {
                output.push.apply(output, this.split(flow, 2));
                currentSize++;
            } else {
                output.push(flow);
                break;
            }



        }


        return output;
    }


}

var Constants = {
    FILL_COLOR: 1432,
    CREATE_FLOW: 1234,
    RANDOM_DIRECTS: ["1230", "2301", "3012", "0123", "1032", "2103", "3021", "0213", "1320"],
    DIRECT_X: [0, -1, 0, 1],
    DIRECT_Y: [1, 0, -1, 0]
}



var ResultFlows = {
    pointNumber: 0,
    width: 5,
    height: 5,
    specialPoint: null,
    table: [],
    flowArray: [],
    finalFlowList: [],
    flowNumber: -2,
    numberFlows: 5,

    getNewTable() {
        let tempTable = [];
        for (let _line = 0; _line < this.height; _line++) {
            let tempArray = [];
            for (let _col = 0; _col < this.width; _col++) {
                tempArray.push([]);
            }
            tempTable.push(tempArray);

        }
        return tempTable;
    },

    isInside(currentX, currentY) {
        return (0 <= currentX && currentX < this.height && 0 <= currentY && currentY < this.width);
    },

    getSpecialPosition(_table) {
        for (let _line = 0; _line < this.height; _line++) {
            for (let _col = 0; _col < this.width; _col++) {
                if (_table[_line][_col] == -1) {
                    return PointManager.newPoint(_line, _col);
                }
            }
        }
        return null;
    },

    initResultFlows(_width, _height) {
        this.width = _width;
        this.height = _height;
        this.table = this.getTable();
        return this.finalFlowList;

    },

    getDominoTable() {
        let tempTable = this.getNewTable();
        for (let _line = 0; _line < this.height; _line++) {
            for (let _col = 0; _col < this.width; _col++) {
                tempTable[_line][_col] = -1;
            }
        }

        let dominoNumber = 0;
        for (let _line = 0; _line < this.height; _line++) {
            for (let _col = 0; _col < this.width; _col++) {
                if (tempTable[_line][_col] == -1) {
                    if (_line == this.height - 1 && _col > 1 && tempTable[_line][_col - 1] == -1) {
                        tempTable[_line][_col] = tempTable[_line][_col - 1] = dominoNumber++;
                    } else if (_col == this.width - 1 && _line > 1 && tempTable[_line - 1][_col] == -1) {
                        tempTable[_line][_col] = tempTable[_line - 1][_col] = dominoNumber++;
                    } else {
                        let k = Random.nextInt(Constants.RANDOM_DIRECTS.length);
                        for (let index = 0; index < 4; index++) {
                            let dir = ((Constants.RANDOM_DIRECTS[k][index]).charCodeAt(0) - ('0').charCodeAt(0));
                            let checkX = _line + Constants.DIRECT_X[dir],
                                checkY = _col + Constants.DIRECT_Y[dir];
                            if (!this.isInside(checkX, checkY, this.width, this.height)) continue;
                            if (tempTable[checkX][checkY] != -1) continue;
                            tempTable[_line][_col] = tempTable[checkX][checkY] = dominoNumber++;
                            break;
                        }
                    }
                }
            }
        }
        this.specialPoint = this.getSpecialPosition(tempTable);

        return tempTable;

    },

    fillFlow(_table, x, y) {

        flow = FlowManager.getDefaultFlow();
        let tmpX = x,
            tmpY = y;
        let isEndOfPoint = false;
        while (!isEndOfPoint) {
            let _flowNumber = _table[tmpX][tmpY];
            _table[tmpX][tmpY] = 1;
            FlowManager.add(flow, tmpX * this.width + tmpY);
            isEndOfPoint = true;
            for (let dir = 0; dir < 4; dir++) {
                let nextX = tmpX + Constants.DIRECT_X[dir],
                    nextY = tmpY + Constants.DIRECT_Y[dir];
                if (this.isInside(nextX, nextY)) {
                    if (_table[nextX][nextY] == _flowNumber - 1) {
                        tmpX = nextX;
                        tmpY = nextY;
                        isEndOfPoint = false;
                        break;
                    }
                }
            }

        }
        return flow;

    },


    fillColor(_table, x, y, isBeginDomino) {
        if (isBeginDomino) {
            for (let dir = 0; dir < 4; dir++) {
                let nextX = x + Constants.DIRECT_X[dir],
                    nextY = y + Constants.DIRECT_Y[dir];
                if (this.isInside(nextX, nextY)) {
                    if (_table[nextX][nextY] >= 0 && _table[nextX][nextY] == _table[x][y]) {
                        _table[x][y] = this.flowNumber * 100 - this.pointNumber++;
                        _table[nextX][nextY] = this.flowNumber * 100 - this.pointNumber++;
                        this.fillColor(_table, nextX, nextY, false);
                        return;
                    }
                }

            }
        } else {
            let index = Random.nextInt(Constants.RANDOM_DIRECTS.length);
            for (let i = 0; i < 4; i++) {
                let dir = ((Constants.RANDOM_DIRECTS[index][i]).charCodeAt(0) - ('0').charCodeAt(0));
                let nextX = x + Constants.DIRECT_X[dir],
                    nextY = y + Constants.DIRECT_Y[dir];
                if (this.isInside(nextX, nextY)) {
                    if (_table[nextX][nextY] >= 0) {
                        this.fillColor(_table, nextX, nextY, true);
                        return;
                    }
                }

            }

        }
    },

    executeSpecialPoint(_table, actionNumber) {
        if (this.specialPoint == null) return;
        if (actionNumber == Constants.FILL_COLOR) {
            this.flowNumber = -2;

            let first = PointManager.getX(this.specialPoint);
            let second = PointManager.getY(this.specialPoint);

            this.pointNumber = 0;
            let index = Random.nextInt(Constants.RANDOM_DIRECTS.length);
            for (let i = 0; i < 4; i++) {
                let dir = ((Constants.RANDOM_DIRECTS[index][i]).charCodeAt(0) - ('0').charCodeAt(0));
                let nextX = first + Constants.DIRECT_X[dir],
                    nextY = second + Constants.DIRECT_Y[dir];
                if (this.isInside(nextX, nextY)) {
                    if (_table[nextX][nextY] >= 0) {
                        _table[first][second] = this.flowNumber * 100 - this.pointNumber++;

                        this.fillColor(_table, nextX, nextY, true);
                        break;

                    }


                }


            }
            this.flowNumber--;
        } else {
            let x = PointManager.getX(this.specialPoint);
            let y = PointManager.getY(this.specialPoint);
            let tmpflow = this.fillFlow(_table, x, y);
            if (tmpflow != null && FlowManager.length(tmpflow) > 0)
                this.flowArray.push(tmpflow);

        }
    },

    getFilledColorTable() {
        let tempTable = this.getDominoTable();

        this.executeSpecialPoint(tempTable, Constants.FILL_COLOR);

        for (let line = 0; line < this.height; line++) {
            for (let col = 0; col < this.width; col++) {
                if (tempTable[line][col] > -2) {
                    this.pointNumber = 0;
                    this.fillColor(tempTable, line, col, true);
                    this.flowNumber--;
                }
            }
        }
        return tempTable;
    },
    getNumberFlows(_min, _max) {

        if (_min > _max) return _min;
        this.numberFlows = _min + Random.nextInt(_max - _min + 1);
        let root = Math.floor(Math.sqrt(this.width * this.height));
        return _max > root ? Math.random() > 0.4 ? root : this.numberFlows : this.numberFlows;
    },

    getTable() {

        let tempTable = this.getFilledColorTable();
        this.executeSpecialPoint(tempTable, Constants.CREATE_FLOW);
        for (let line = 0; line < this.height; line++) {
            for (let col = 0; col < this.width; col++) {
                if (tempTable[line][col] < 0) {
                    let tmpFlow = this.fillFlow(tempTable, line, col);
                    this.flowArray.push(tmpFlow);
                }

            }
        }

        let minSize = this.flowArray.length,
            maxLength = FlowManager.getMaxLength(this.flowArray).value,
            maxSize = minSize + Math.floor(maxLength / 3),
            finalSize = this.getNumberFlows(minSize, maxSize > 26 ? 26 : maxSize);

        this.finalFlowList = FlowManager.getFinalFlowArray(this.flowArray, finalSize);

        return tempTable;

    }


}

var StateManager = {
    width: 3,
    height: 3,
    value: "A.ABBCC..",
    result: [0, 1, 2, 3, 4, 5, 8, 7, 6],

    initDefalutState() {
        return {
            width: 3,
            height: 3,
            value: "A.ABBCC..",
            result: [0, 1, 2, 3, 4, 5, 8, 7, 6]
        };
    },

    initRandomState(_width, _height) {
        let width = _width,
            height = _height;
        let value = "",
            result = [];
        let flowList = ResultFlows.initResultFlows(width, height);
        let valueArray = [];
        for (let index = 0; index < width * height; index++) {
            valueArray.push(".");
        }
        flowList.forEach((flow, index) => {
            valueArray[FlowManager.getHead(flow)] = valueArray[FlowManager.getTail(flow)] = String.fromCharCode('A'.charCodeAt(0) + index);

            flow.pointArray.forEach(point => {
                result.push(point);
            });
        });
        valueArray.forEach(element => {
            value += element;
        });
        return {
            width: _width,
            height: _height,
            value: value,
            result: result
        };

    },

    getLevel(state) {
        let value = state.value; //#endregion
        let level = "";
        let count = 0; //#endregion
        console.log(value);
        Array.from(value).forEach((element) => {
            if (element != '.') {

                if (count > 0) {
                    level += String(count);
                    count = 0; 
                };
                level += (String.fromCharCode(element.charCodeAt(0) - 'A'.charCodeAt(0) + 'a'.charCodeAt(0)));
            } else {
                count++;
            };

        });
        return level;

    },

    solve(state) {

        Show.showState(state);

        let result = state.result,
            value = state.value,
            valueArray = [];
        let currentChar = 'a';

        for (let index = 0; index < state.width * state.height; index++) {
            valueArray.push('.');
        }
        result.forEach(element => {
            if (value[element] != '.') {
                valueArray[element] = value[element];
                currentChar = String.fromCharCode(value[element].charCodeAt(0) - 'A'.charCodeAt(0) + 'a'.charCodeAt(0));

            } else {
                valueArray[element] = currentChar;
            }
        });
        let newValue = "";
        valueArray.forEach(element => {
            newValue += element;
        });
        Show.showState({
            width: state.width,
            height: state.height,
            value: newValue,
            result: state.result
        });
    }



}

var Show = {
    showTable(height, table) {
        for (let i = 0; i < height; i++) {
            Console.log(table[i]);
        }

    },

    showState(state) {
        console.log("---------State----------");
        let value = state.value;
        let firstIndex = 0,
            secondIndex = state.width;

        while (firstIndex < state.height * state.width) {
            console.log(value.substring(firstIndex, secondIndex));
            firstIndex += state.width;
            secondIndex += state.width;
        }
    }
}

var state = (StateManager.initRandomState(15, 15));
console.log(StateManager.getLevel(state));
StateManager.solve(state);