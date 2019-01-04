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

var StateManager = {
    getDefaultState() {
        return {
            width: 3,
            height: 3,
            value: "101223300",
            numberFlows: 3
        };
    },

    initState(_width, _height) {
        var value = "",
            temp = _width * _height;
        while (temp--) {
            value += "0"
        };
        return {
            width: _width,
            height: _height,
            value: value,
            numberFlows: Math.floor(Math.sqrt(_width * _height))
        }
    },

    newState(_width, _height, _value) {
        return {
            width: _width,
            height: _height,
            value: _value,
            numberFlows: Math.floor(Math.sqrt(_width * _height))
        }
    },

    showState(state) {
        if (!state) return;
        if (state.width && state.height && state.value && state.numberFlows) {
            var firstIndex = 0,
                secondIndex = state.width;
            while (firstIndex < state.value.length) {
                console.log(state.value.substring(firstIndex, secondIndex));

                firstIndex += state.width;
                secondIndex += state.width;
            }
        }

    },

    getNumberFlows(state) {

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

    getPointArray(flow) {
        return flow == null ? null : flow.pointArray;
    },

    length(flow) {
        if (flow == null) return -1;
        i
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
        flow.pointArray.add(position);
        return position;
    },

    split(flow, index) {
        return [
            this.newFlow(flow.pointArray.slice(0, index)),
            this.newFlow(flow.pointArray.slice(index, this.length(flow)))
        ];
    },

    getFlowArray(flowArray, size) {
        var targetFlowArray = [];
        var tempArray = [];
        targetFlowArray = flowArray.slice();
        var currentSize = flowArray.length;

        while (currentSize < size) {
            tempArray = targetFlowArray.slice();
            targetFlowArray = [];

            tempArray.forEach(flow => {
                if (this.length(flow) > 4 && currentSize < size) {
                    var randomPosition = Math.floor(Math.random() * (this.length(flow) - 4));
                    var splitedFlows = this.split(flow, randomPosition + 2);
                    targetFlowArray.push(splitedFlows[0]);
                    targetFlowArray.push(splitedFlows[1]);
                    currentSize++;
                } else if (this.length(flow) == 4 && currentSize < size) {
                    var splitedFlows = this.split(flow, 2);
                    targetFlowArray.push(splitedFlows[0]);
                    targetFlowArray.push(splitedFlows[1]);
                    currentSize++;
                } else {
                    targetFlowArray.push(flow);
                }
            });
        }

        return targetFlowArray;
    }


}

var Constants = {
    FILL_COLOR: 1432,
    CREATE_FLOW: 1234,
    RANDOM_DIRECTS: ["1230", "2301", "3012", "0123", "1032", "2103", "3021", "0213", "1320"],
    DIRECT_X: [0, -1, 0, 1],
    DIRECT_Y: [1, 0, -1, 0]
}

var Show = {
    showTable(height, table) {
        for (let i = 0; i < height; i++) {
            Console.log(table[i]);
        }

    }
}

var StateValueManager = {
    pointNumber: 0,
    width: 5, //#endregion
    height: 5, //#endregion
    table: [], //#endregion
    specialPosition: null,
    flowList: [], //#endregion
    flowNumber: -2,

    getNewTable() {
        var tempTable = [];
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

    generateTable(_width, _height) {
        this.width = _width; //#endregion
        this.height = _height; //#endregion
        this.table = this.getFilledColorTable();
        return this.table;
    },

    getDominoTable() {
        let tempTable = this.getNewTable();
        for (let _line = 0; _line < this.height; _line++) {
            for (let _col = 0; _col < this.width; _col++) {
                tempTable[_line][_col] = -1;
            }
        }

        var dominoNumber = 0;
        for (let _line = 0; _line < this.height; _line++) {
            for (let _col = 0; _col < this.width; _col++) {
                if (tempTable[_line][_col] == -1) {
                    if (_line == this.height - 1 && _col > 1 && tempTable[_line][_col - 1] == -1) {
                        tempTable[_line][_col] = tempTable[_line][_col - 1] = dominoNumber++;
                    } else if (_col == this.width - 1 && _line > 1 && tempTable[_line - 1][_col] == -1) {
                        tempTable[_line][_col] = tempTable[_line - 1][_col] = dominoNumber++;
                    } else {
                        var k = Random.nextInt(Constants.RANDOM_DIRECTS.length);
                        for (let index = 0; index < 4; index++) {
                            let dir = ((Constants.RANDOM_DIRECTS[k][index]).charCodeAt(0) - ('0').charCodeAt(0));
                            var checkX = _line + Constants.DIRECT_X[dir],
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
        this.specialPosition = this.getSpecialPosition(tempTable);

        return tempTable;

    },

    getFlow(x, y) {
        let tempTable = this.getFilledColorTable();

        flow = FlowManager.getDefaultFlow();
        let tmpX = x,
            tmpY = y;
        let isEndOfPoint = false;
        while (!isEndOfPoint) {
            var flowNumber = tempTable[tmpX][tmpY];
            tempTable[tmpX][tmpY] = 1;
            FlowManager.add(flow, tmpX * width + tmpY);
            isEndOfPoint = true;
            for (let dir = 0; dir < 4; dir++) {
                let nextX = tmpX + Constants.DIRECT_X[dir],
                    nextY = tmpY + Constants.DIRECT_Y[dir];
                if (this.isInside(nextX, nextY, width, this.height)) {
                    if (tempTable[nextX][nextY] == numberFlow - 1) {
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

    executeSpecialPosition(_table, actionNumber) {
        if (this.specialPosition == null) return;
        if (actionNumber == Constants.FILL_COLOR) {
            this.flowNumber = -2;

            let first = PointManager.getX(this.specialPosition);
            let second = PointManager.getY(this.specialPosition);

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
            /*
            var tmpflow = Utils.createFlowList(map, specialPosition.getKey(), specialPosition.getValue());
            if (tmpflow != null && tmpflow.length() > 0)
                flowList.add(tmpflow);
                */
        }
    },

    getFilledColorTable() {
        let tempTable = this.getDominoTable();

        this.executeSpecialPosition(tempTable, Constants.FILL_COLOR);

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
    }



}



console.log(StateValueManager.generateTable(5, 5));