/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appLogic/DOMstuff.js":
/*!**********************************!*\
  !*** ./src/appLogic/DOMstuff.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners),
/* harmony export */   "displayLeftDiv": () => (/* binding */ displayLeftDiv),
/* harmony export */   "displayRightDiv": () => (/* binding */ displayRightDiv)
/* harmony export */ });
var isArrayInArray = function isArrayInArray(arr, item) {
  var itemAsString = JSON.stringify(item);
  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === itemAsString;
  });
  return contains;
};

var clearDisplay = function clearDisplay(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var displayLeftDiv = function displayLeftDiv(board) {
  var leftDiv = document.querySelector(".left"); // TODO: add support for when a shot is a hit or a miss

  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (cell, idx) {
      var boardCell = document.createElement("div");
      boardCell.dataset.index = idx;

      if (cell === false) {
        boardCell.classList.add("cell");
      } else {
        boardCell.classList.add("occupied");
      }

      if (cell.hit === true) {
        boardCell.classList.add("hit");
      } else if (isArrayInArray(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    leftDiv.appendChild(rowCell);
  });
};

var displayRightDiv = function displayRightDiv(board) {
  var rightDiv = document.querySelector(".right");
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (cell, idx) {
      var boardCell = document.createElement("div");
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");

      if (cell.hit) {
        boardCell.classList.add("hit");
      } else if (isArrayInArray(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    rightDiv.appendChild(rowCell);
  });
};

var addEventListeners = function addEventListeners(board) {
  var compBoard = document.querySelector(".right");
  compBoard.addEventListener("click", function (e) {
    if (e.target.parentElement !== compBoard) {
      var rowIndex = parseInt(e.target.parentElement.dataset.index, 10);
      var cellIndex = parseInt(e.target.dataset.index, 10);
      board.receiveAttack([rowIndex, cellIndex]);
      clearDisplay(compBoard);
      displayRightDiv(board);
    }
  }, {
    once: true
  });
};



/***/ }),

/***/ "./src/appLogic/computerFactory.js":
/*!*****************************************!*\
  !*** ./src/appLogic/computerFactory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var computerFactory = function computerFactory() {
  var previousMoves = [];

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMove() {
    var result = [];
    var x = randomInteger(0, 9);
    var y = randomInteger(0, 9);
    result.push(x);
    result.push(y);
    return result;
  }

  function generatePlacement() {
    var result = [];
    var x = randomInteger(0, 9);
    var y = randomInteger(0, 9);
    var z = randomInteger(1, 2);
    result.push([x, y]);
    result.push(z);
    return result;
  }

  function compTurn(enemyBoard) {
    var coords = generateMove();

    while (previousMoves.includes(coords)) {
      coords = generateMove();
    }

    enemyBoard.receiveAttack(coords);
    previousMoves.push(coords);
  }

  return {
    previousMoves: previousMoves,
    generateMove: generateMove,
    generatePlacement: generatePlacement,
    compTurn: compTurn
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computerFactory);

/***/ }),

/***/ "./src/appLogic/gameBoardFactory.js":
/*!******************************************!*\
  !*** ./src/appLogic/gameBoardFactory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/appLogic/shipFactory.js");


var gameBoardFactory = function gameBoardFactory() {
  var board = [[false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false]];
  var missed = [];
  var hits = [];

  function createShips() {
    var carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("carrier", 5);
    var battleship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("battleship", 4);
    var destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("destroyer", 3);
    var submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("submarine", 3);
    var patrolBoat = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("patrol boat", 2);
    return [carrier, battleship, destroyer, submarine, patrolBoat];
  }

  var ships = createShips();

  function getShips() {
    return ships;
  }

  function getBoard() {
    return board;
  }

  function getOccupied() {
    var occupied = [];
    board.forEach(function (row, i) {
      row.forEach(function (element, idx) {
        if (element !== false) {
          occupied.push([i, idx]);
        }
      });
    });
    return occupied;
  }

  function allSunk() {
    var gameShips = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ships;

    if (gameShips.length > 0) {
      return false;
    }

    return true;
  }

  function sinkShip(sunkShip) {
    var index = ships.findIndex(function (ship) {
      return sunkShip.name === ship.name;
    });
    ships.splice(index, 1);
  }

  function generateUnavailable(arr) {
    var unavailable = [];
    unavailable.push(arr);
    unavailable.push([arr[0], arr[1] + 1]);
    unavailable.push([arr[0], arr[1] - 1]);
    unavailable.push([arr[0] + 1, arr[1]]);
    unavailable.push([arr[0] + 1, arr[1] + 1]);
    unavailable.push([arr[0] + 1, arr[1] - 1]);
    unavailable.push([arr[0] - 1, arr[1]]);
    unavailable.push([arr[0] - 1, arr[1] + 1]);
    unavailable.push([arr[0] - 1, arr[1] - 1]);
    return unavailable;
  }

  var isArrayInArray = function isArrayInArray(arr, item) {
    var itemAsString = JSON.stringify(item);
    var contains = arr.some(function (ele) {
      return JSON.stringify(ele) === itemAsString;
    });
    return contains;
  };

  function validatePlacement(coords, orientation, ship) {
    var occupied = getOccupied();
    var unavailable = [];
    occupied.forEach(function (arr) {
      generateUnavailable(arr).forEach(function (ele) {
        return unavailable.push(ele);
      });
    });
    console.log(unavailable);
    var x = parseInt(coords[0], 10);
    var y = parseInt(coords[1], 10);
    if (isArrayInArray(unavailable, [x, y])) return false;

    for (var i = 1; i < ship.length; i += 1) {
      var checkCoords = void 0;

      if (orientation === "vertical") {
        x += 1;
        if (x > 9) return false;
        checkCoords = [x, y];
      } else {
        y += 1;
        if (y > 9) return false;
        checkCoords = [x, y];
        console.log(checkCoords);
      }

      if (isArrayInArray(unavailable, checkCoords)) {
        return false;
      }
    }

    return true;
  }

  function placeVertically(coords, ship) {
    for (var i = 0; i < ship.length; i += 1) {
      board[coords[0] + i][coords[1]] = {
        ship: ship,
        name: ship.name,
        length: ship.length,
        index: i,
        hit: false
      };
    }
  }

  function placeHorizontally(coords, ship) {
    for (var i = 0; i < ship.length; i += 1) {
      board[coords[0]][coords[1] + i] = {
        ship: ship,
        name: ship.name,
        length: ship.length,
        index: i,
        hit: false
      };
    }
  }

  function placeShip(coords, orientation, ship) {
    if (orientation === "vertical") {
      placeVertically(coords, ship);
    } else {
      placeHorizontally(coords, ship);
    }
  }

  function receiveAttack(coords) {
    if (board[coords[0]][coords[1]] === false) {
      missed.push(coords);
    } else {
      var obj = board[coords[0]][coords[1]];
      obj.hit = true;
      obj.ship.hit(obj.index);
      hits.push(coords);

      if (obj.ship.isSunk()) {
        sinkShip(obj.ship);
      }
    }
  }

  return {
    getBoard: getBoard,
    getShips: getShips,
    allSunk: allSunk,
    placeShip: placeShip,
    missed: missed,
    hits: hits,
    receiveAttack: receiveAttack,
    getOccupied: getOccupied,
    validatePlacement: validatePlacement
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoardFactory);

/***/ }),

/***/ "./src/appLogic/gameLoop.js":
/*!**********************************!*\
  !*** ./src/appLogic/gameLoop.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _computerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computerFactory */ "./src/appLogic/computerFactory.js");
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerFactory */ "./src/appLogic/playerFactory.js");
/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoardFactory */ "./src/appLogic/gameBoardFactory.js");
/* harmony import */ var _DOMstuff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOMstuff */ "./src/appLogic/DOMstuff.js");
/* harmony import */ var _placementDisplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./placementDisplay */ "./src/appLogic/placementDisplay.js");






var gameLoop = function gameLoop() {
  var humanPlayer = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_1__["default"])("human");
  var compPlayer = (0,_computerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var humanGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();
  var compGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();

  var gameOverCheck = function gameOverCheck() {};

  (0,_placementDisplay__WEBPACK_IMPORTED_MODULE_4__.playerShipPlacement)(humanGameBoard); // FOR TESTING!!!

  var firstShip = humanGameBoard.getShips()[0];
  var smallShip = humanGameBoard.getShips()[4];
  _placementDisplay__WEBPACK_IMPORTED_MODULE_4__.playerPlaceShips.placePicker(humanGameBoard, smallShip);
  humanGameBoard.placeShip([3, 3], "horizontal", firstShip);
  humanGameBoard.receiveAttack([3, 3]);
  humanGameBoard.receiveAttack([3, 2]);
  humanGameBoard.receiveAttack([2, 2]);
  humanGameBoard.receiveAttack([1, 2]);
  humanGameBoard.receiveAttack([3, 4]);
  var compShip = compGameBoard.getShips()[0];
  compGameBoard.placeShip([3, 3], "horizontal", compShip);
  compGameBoard.receiveAttack([3, 3]);
  compGameBoard.receiveAttack([3, 2]); // FOR TESTING!!!

  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayLeftDiv)(humanGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayRightDiv)(compGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.addEventListeners)(compGameBoard);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);

/***/ }),

/***/ "./src/appLogic/placementDisplay.js":
/*!******************************************!*\
  !*** ./src/appLogic/placementDisplay.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerPlaceShips": () => (/* binding */ playerPlaceShips),
/* harmony export */   "playerShipPlacement": () => (/* binding */ playerShipPlacement)
/* harmony export */ });
var playerShipPlacement = function playerShipPlacement(board) {
  var container = document.querySelector(".placer");
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (_cell, idx) {
      var boardCell = document.createElement("div");
      boardCell.dataset.row = i;
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");
      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

var playerPlaceShips = function () {
  var rotator = 1;

  var horizontalElement = function horizontalElement(rowIndex, cellIndex, i) {
    var rowNum = parseInt(rowIndex, 10);
    var num = parseInt(cellIndex, 10) + i;
    var selector = ".cell[data-row=\"".concat(rowNum, "\"][data-index=\"").concat(num, "\"]");
    var hoverCell = document.querySelector(selector);
    return hoverCell;
  };

  var verticalElement = function verticalElement(rowIndex, cellIndex, i) {
    var rowNum = parseInt(rowIndex, 10) + i;
    var num = parseInt(cellIndex, 10);
    var selector = ".cell[data-row=\"".concat(rowNum, "\"][data-index=\"").concat(num, "\"]");
    var hoverCell = document.querySelector(selector);
    return hoverCell;
  };

  var placePicker = function placePicker(board, ship) {
    var shipText = document.querySelector(".shipText");
    shipText.textContent = ship.name;
    var cells = document.querySelectorAll(".placer .cell");
    cells.forEach(function (cell) {
      cell.addEventListener("mouseenter", function (e) {
        var rowIndex = e.target.parentElement.dataset.index;
        var cellIndex = e.target.dataset.index;

        if (rotator === 1) {
          for (var i = 0; i < ship.length; i += 1) {
            var hoverCell = horizontalElement(rowIndex, cellIndex, i);
            hoverCell.classList.add("placerCell");
          }
        } else if (rotator === 2) {
          for (var _i = 0; _i < ship.length; _i += 1) {
            var _hoverCell = verticalElement(rowIndex, cellIndex, _i);

            _hoverCell.classList.add("placerCell");
          }
        }
      });
      cell.addEventListener("mouseleave", function (e) {
        var rowIndex = e.target.parentElement.dataset.index;
        var cellIndex = e.target.dataset.index;

        if (rotator === 1) {
          for (var i = 0; i < ship.length; i += 1) {
            var hoverCell = horizontalElement(rowIndex, cellIndex, i);
            hoverCell.classList.remove("placerCell");
          }
        } else if (rotator === 2) {
          for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
            var _hoverCell2 = verticalElement(rowIndex, cellIndex, _i2);

            _hoverCell2.classList.remove("placerCell");
          }
        }
      });
      cell.addEventListener("click", function (e) {
        console.log(ship, board);
        console.log(board.getBoard());
        var orientation;

        if (rotator === 1) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        console.log(e.target.dataset.row, e.target.dataset.index);
        console.log(board.validatePlacement([e.target.dataset.row, e.target.dataset.index], orientation, ship));
      });
    });
  };

  var changeRotator = function changeRotator() {
    if (rotator === 1) {
      rotator = 2;
    } else {
      rotator = 1;
    }
  };

  var rotatorBtn = document.querySelector(".rotate");
  rotatorBtn.addEventListener("click", function () {
    changeRotator();
  });
  return {
    placePicker: placePicker
  };
}();



/***/ }),

/***/ "./src/appLogic/playerFactory.js":
/*!***************************************!*\
  !*** ./src/appLogic/playerFactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var playerFactory = function playerFactory(name) {
  function playerTurn(coords, enemyBoard) {
    enemyBoard.receiveAttack(coords);
  }

  return {
    name: name,
    playerTurn: playerTurn
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);

/***/ }),

/***/ "./src/appLogic/shipFactory.js":
/*!*************************************!*\
  !*** ./src/appLogic/shipFactory.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var shipFactory = function shipFactory(name, length) {
  var shipBlocks = new Array(length).fill(true);

  var getShipBlocks = function getShipBlocks() {
    return shipBlocks;
  };

  function hit(num) {
    shipBlocks[num] = null;
  }

  function isSunk() {
    var result = shipBlocks.every(function (block) {
      return block === null;
    });
    return result;
  }

  return {
    name: name,
    length: length,
    getShipBlocks: getShipBlocks,
    hit: hit,
    isSunk: isSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _appLogic_gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appLogic/gameLoop */ "./src/appLogic/gameLoop.js");


(0,_appLogic_gameLoop__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBcUMsOERBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvRE9Nc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9jb21wdXRlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9nYW1lQm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9wbGFjZW1lbnREaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpc0FycmF5SW5BcnJheSA9IChhcnIsIGl0ZW0pID0+IHtcbiAgY29uc3QgaXRlbUFzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG5cbiAgY29uc3QgY29udGFpbnMgPSBhcnIuc29tZSgoZWxlKSA9PiBKU09OLnN0cmluZ2lmeShlbGUpID09PSBpdGVtQXNTdHJpbmcpO1xuICByZXR1cm4gY29udGFpbnM7XG59O1xuXG5jb25zdCBjbGVhckRpc3BsYXkgPSAoZWxlbWVudCkgPT4ge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG5jb25zdCBkaXNwbGF5TGVmdERpdiA9IChib2FyZCkgPT4ge1xuICBjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZWZ0XCIpO1xuXG4gIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciB3aGVuIGEgc2hvdCBpcyBhIGhpdCBvciBhIG1pc3NcbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG5cbiAgICAgIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2VsbC5oaXQgPT09IHRydWUpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIGxlZnREaXYuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVJpZ2h0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcblxuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcbiAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcblxuICAgICAgaWYgKGNlbGwuaGl0KSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5SW5BcnJheShib2FyZC5taXNzZWQsIFtpLCBpZHhdKSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICByaWdodERpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRFdmVudExpc3RlbmVycyA9IChib2FyZCkgPT4ge1xuICBjb25zdCBjb21wQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuICBjb21wQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5wYXJlbnRFbGVtZW50ICE9PSBjb21wQm9hcmQpIHtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXgsIDEwKTtcbiAgICAgICAgY29uc3QgY2VsbEluZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3dJbmRleCwgY2VsbEluZGV4XSk7XG4gICAgICAgIGNsZWFyRGlzcGxheShjb21wQm9hcmQpO1xuICAgICAgICBkaXNwbGF5UmlnaHREaXYoYm9hcmQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH1cbiAgKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYsIGFkZEV2ZW50TGlzdGVuZXJzIH07XG4iLCJjb25zdCBjb21wdXRlckZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzTW92ZXMgPSBbXTtcblxuICBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZU1vdmUoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICBjb25zdCB4ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcbiAgICBjb25zdCB5ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcblxuICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIHJlc3VsdC5wdXNoKHkpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlUGxhY2VtZW50KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgY29uc3QgeCA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeiA9IHJhbmRvbUludGVnZXIoMSwgMik7XG5cbiAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgIHJlc3VsdC5wdXNoKHopO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBUdXJuKGVuZW15Qm9hcmQpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVNb3ZlKCk7XG5cbiAgICB3aGlsZSAocHJldmlvdXNNb3Zlcy5pbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBwcmV2aW91c01vdmVzLnB1c2goY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IHByZXZpb3VzTW92ZXMsIGdlbmVyYXRlTW92ZSwgZ2VuZXJhdGVQbGFjZW1lbnQsIGNvbXBUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlckZhY3Rvcnk7XG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcblxuY29uc3QgZ2FtZUJvYXJkRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgXTtcblxuICBjb25zdCBtaXNzZWQgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeShcImNhcnJpZXJcIiwgNSk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShcImRlc3Ryb3llclwiLCAzKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShcInN1Ym1hcmluZVwiLCAzKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkoXCJwYXRyb2wgYm9hdFwiLCAyKTtcblxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXRdO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gIGZ1bmN0aW9uIGdldFNoaXBzKCkge1xuICAgIHJldHVybiBzaGlwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9jY3VwaWVkKCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gW107XG5cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgb2NjdXBpZWQucHVzaChbaSwgaWR4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VwaWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVVuYXZhaWxhYmxlKGFycikge1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlID0gW107XG4gICAgdW5hdmFpbGFibGUucHVzaChhcnIpO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSwgYXJyWzFdICsgMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSwgYXJyWzFdIC0gMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSArIDEsIGFyclsxXV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSArIDEsIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV0gLSAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdIC0gMSwgYXJyWzFdXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdIC0gMSwgYXJyWzFdICsgMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXSAtIDFdKTtcblxuICAgIHJldHVybiB1bmF2YWlsYWJsZTtcbiAgfVxuXG4gIGNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICAgIGNvbnN0IGl0ZW1Bc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuXG4gICAgY29uc3QgY29udGFpbnMgPSBhcnIuc29tZSgoZWxlKSA9PiBKU09OLnN0cmluZ2lmeShlbGUpID09PSBpdGVtQXNTdHJpbmcpO1xuICAgIHJldHVybiBjb250YWlucztcbiAgfTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZVBsYWNlbWVudChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgY29uc3Qgb2NjdXBpZWQgPSBnZXRPY2N1cGllZCgpO1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlID0gW107XG4gICAgb2NjdXBpZWQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgICBnZW5lcmF0ZVVuYXZhaWxhYmxlKGFycikuZm9yRWFjaCgoZWxlKSA9PiB1bmF2YWlsYWJsZS5wdXNoKGVsZSkpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2codW5hdmFpbGFibGUpO1xuXG4gICAgbGV0IHggPSBwYXJzZUludChjb29yZHNbMF0sIDEwKTtcbiAgICBsZXQgeSA9IHBhcnNlSW50KGNvb3Jkc1sxXSwgMTApO1xuICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgW3gsIHldKSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IGNoZWNrQ29vcmRzO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB4ICs9IDE7XG4gICAgICAgIGlmICh4ID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjaGVja0Nvb3JkcyA9IFt4LCB5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgKz0gMTtcbiAgICAgICAgaWYgKHkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNoZWNrQ29vcmRzID0gW3gsIHldO1xuICAgICAgICBjb25zb2xlLmxvZyhjaGVja0Nvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgY2hlY2tDb29yZHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXSArIGldW2Nvb3Jkc1sxXV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV0gKyBpXSA9IHtcbiAgICAgICAgc2hpcCxcbiAgICAgICAgbmFtZTogc2hpcC5uYW1lLFxuICAgICAgICBsZW5ndGg6IHNoaXAubGVuZ3RoLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKGNvb3Jkcywgb3JpZW50YXRpb24sIHNoaXApIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcbiAgICBpZiAoYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBmYWxzZSkge1xuICAgICAgbWlzc2VkLnB1c2goY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2JqID0gYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dO1xuICAgICAgb2JqLmhpdCA9IHRydWU7XG4gICAgICBvYmouc2hpcC5oaXQob2JqLmluZGV4KTtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuXG4gICAgICBpZiAob2JqLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2lua1NoaXAob2JqLnNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgZ2V0U2hpcHMsXG4gICAgYWxsU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgbWlzc2VkLFxuICAgIGhpdHMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRPY2N1cGllZCxcbiAgICB2YWxpZGF0ZVBsYWNlbWVudCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgY29tcHV0ZXJGYWN0b3J5IGZyb20gXCIuL2NvbXB1dGVyRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllckZhY3RvcnkgZnJvbSBcIi4vcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IGdhbWVCb2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMsIGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYgfSBmcm9tIFwiLi9ET01zdHVmZlwiO1xuaW1wb3J0IHsgcGxheWVyU2hpcFBsYWNlbWVudCwgcGxheWVyUGxhY2VTaGlwcyB9IGZyb20gXCIuL3BsYWNlbWVudERpc3BsYXlcIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyRmFjdG9yeShcImh1bWFuXCIpO1xuICBjb25zdCBjb21wUGxheWVyID0gY29tcHV0ZXJGYWN0b3J5KCk7XG5cbiAgY29uc3QgaHVtYW5HYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGNvbXBHYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG5cbiAgY29uc3QgZ2FtZU92ZXJDaGVjayA9ICgpID0+IHt9O1xuXG4gIHBsYXllclNoaXBQbGFjZW1lbnQoaHVtYW5HYW1lQm9hcmQpO1xuICAvLyBGT1IgVEVTVElORyEhIVxuICBjb25zdCBmaXJzdFNoaXAgPSBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpWzBdO1xuICBjb25zdCBzbWFsbFNoaXAgPSBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpWzRdO1xuICBwbGF5ZXJQbGFjZVNoaXBzLnBsYWNlUGlja2VyKGh1bWFuR2FtZUJvYXJkLCBzbWFsbFNoaXApO1xuXG4gIGh1bWFuR2FtZUJvYXJkLnBsYWNlU2hpcChbMywgM10sIFwiaG9yaXpvbnRhbFwiLCBmaXJzdFNoaXApO1xuICBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCAzXSk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDJdKTtcbiAgaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMiwgMl0pO1xuICBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFsxLCAyXSk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDRdKTtcblxuICBjb25zdCBjb21wU2hpcCA9IGNvbXBHYW1lQm9hcmQuZ2V0U2hpcHMoKVswXTtcbiAgY29tcEdhbWVCb2FyZC5wbGFjZVNoaXAoWzMsIDNdLCBcImhvcml6b250YWxcIiwgY29tcFNoaXApO1xuICBjb21wR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDNdKTtcbiAgY29tcEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCAyXSk7XG4gIC8vIEZPUiBURVNUSU5HISEhXG5cbiAgZGlzcGxheUxlZnREaXYoaHVtYW5HYW1lQm9hcmQpO1xuICBkaXNwbGF5UmlnaHREaXYoY29tcEdhbWVCb2FyZCk7XG4gIGFkZEV2ZW50TGlzdGVuZXJzKGNvbXBHYW1lQm9hcmQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUxvb3A7XG4iLCJjb25zdCBwbGF5ZXJTaGlwUGxhY2VtZW50ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2VyXCIpO1xuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChfY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBwbGF5ZXJQbGFjZVNoaXBzID0gKCgpID0+IHtcbiAgbGV0IHJvdGF0b3IgPSAxO1xuXG4gIGNvbnN0IGhvcml6b250YWxFbGVtZW50ID0gKHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpID0+IHtcbiAgICBjb25zdCByb3dOdW0gPSBwYXJzZUludChyb3dJbmRleCwgMTApO1xuICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KGNlbGxJbmRleCwgMTApICsgaTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gYC5jZWxsW2RhdGEtcm93PVwiJHtyb3dOdW19XCJdW2RhdGEtaW5kZXg9XCIke251bX1cIl1gO1xuICAgIGNvbnN0IGhvdmVyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGhvdmVyQ2VsbDtcbiAgfTtcblxuICBjb25zdCB2ZXJ0aWNhbEVsZW1lbnQgPSAocm93SW5kZXgsIGNlbGxJbmRleCwgaSkgPT4ge1xuICAgIGNvbnN0IHJvd051bSA9IHBhcnNlSW50KHJvd0luZGV4LCAxMCkgKyBpO1xuICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KGNlbGxJbmRleCwgMTApO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd051bX1cIl1bZGF0YS1pbmRleD1cIiR7bnVtfVwiXWA7XG4gICAgY29uc3QgaG92ZXJDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gaG92ZXJDZWxsO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlUGlja2VyID0gKGJvYXJkLCBzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBUZXh0XCIpO1xuICAgIHNoaXBUZXh0LnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xuXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlciAuY2VsbFwiKTtcblxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSBob3Jpem9udGFsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocm90YXRvciA9PT0gMikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gdmVydGljYWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSBob3Jpem9udGFsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocm90YXRvciA9PT0gMikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gdmVydGljYWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXAsIGJvYXJkKTtcbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBib2FyZC52YWxpZGF0ZVBsYWNlbWVudChcbiAgICAgICAgICAgIFtlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5pbmRleF0sXG4gICAgICAgICAgICBvcmllbnRhdGlvbixcbiAgICAgICAgICAgIHNoaXBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VSb3RhdG9yID0gKCkgPT4ge1xuICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICByb3RhdG9yID0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcm90YXRvciA9IDE7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJvdGF0b3JCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZVwiKTtcbiAgcm90YXRvckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNoYW5nZVJvdGF0b3IoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgcGxhY2VQaWNrZXIgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IHBsYXllclNoaXBQbGFjZW1lbnQsIHBsYXllclBsYWNlU2hpcHMgfTtcbiIsImNvbnN0IHBsYXllckZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGNvb3JkcywgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgcGxheWVyVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyRmFjdG9yeTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQmxvY2tzID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCh0cnVlKTtcblxuICBjb25zdCBnZXRTaGlwQmxvY2tzID0gKCkgPT4gc2hpcEJsb2NrcztcblxuICBmdW5jdGlvbiBoaXQobnVtKSB7XG4gICAgc2hpcEJsb2Nrc1tudW1dID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzaGlwQmxvY2tzLmV2ZXJ5KChibG9jaykgPT4gYmxvY2sgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGxlbmd0aCwgZ2V0U2hpcEJsb2NrcywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbImlzQXJyYXlJbkFycmF5IiwiYXJyIiwiaXRlbSIsIml0ZW1Bc1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250YWlucyIsInNvbWUiLCJlbGUiLCJjbGVhckRpc3BsYXkiLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZGlzcGxheUxlZnREaXYiLCJib2FyZCIsImxlZnREaXYiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRCb2FyZCIsImZvckVhY2giLCJyb3ciLCJpIiwicm93Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJjZWxsIiwiaWR4IiwiYm9hcmRDZWxsIiwiaGl0IiwibWlzc2VkIiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5UmlnaHREaXYiLCJyaWdodERpdiIsImFkZEV2ZW50TGlzdGVuZXJzIiwiY29tcEJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50Iiwicm93SW5kZXgiLCJwYXJzZUludCIsImNlbGxJbmRleCIsInJlY2VpdmVBdHRhY2siLCJvbmNlIiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJnZW5lcmF0ZVBsYWNlbWVudCIsInoiLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInNoaXBGYWN0b3J5IiwiZ2FtZUJvYXJkRmFjdG9yeSIsImhpdHMiLCJjcmVhdGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInNoaXBzIiwiZ2V0U2hpcHMiLCJnZXRPY2N1cGllZCIsIm9jY3VwaWVkIiwiYWxsU3VuayIsImdhbWVTaGlwcyIsImxlbmd0aCIsInNpbmtTaGlwIiwic3Vua1NoaXAiLCJmaW5kSW5kZXgiLCJzaGlwIiwibmFtZSIsInNwbGljZSIsImdlbmVyYXRlVW5hdmFpbGFibGUiLCJ1bmF2YWlsYWJsZSIsInZhbGlkYXRlUGxhY2VtZW50Iiwib3JpZW50YXRpb24iLCJjb25zb2xlIiwibG9nIiwiY2hlY2tDb29yZHMiLCJwbGFjZVZlcnRpY2FsbHkiLCJwbGFjZUhvcml6b250YWxseSIsInBsYWNlU2hpcCIsIm9iaiIsImlzU3VuayIsInBsYXllckZhY3RvcnkiLCJwbGF5ZXJTaGlwUGxhY2VtZW50IiwicGxheWVyUGxhY2VTaGlwcyIsImdhbWVMb29wIiwiaHVtYW5QbGF5ZXIiLCJjb21wUGxheWVyIiwiaHVtYW5HYW1lQm9hcmQiLCJjb21wR2FtZUJvYXJkIiwiZ2FtZU92ZXJDaGVjayIsImZpcnN0U2hpcCIsInNtYWxsU2hpcCIsInBsYWNlUGlja2VyIiwiY29tcFNoaXAiLCJjb250YWluZXIiLCJfY2VsbCIsInJvdGF0b3IiLCJob3Jpem9udGFsRWxlbWVudCIsInJvd051bSIsIm51bSIsInNlbGVjdG9yIiwiaG92ZXJDZWxsIiwidmVydGljYWxFbGVtZW50Iiwic2hpcFRleHQiLCJ0ZXh0Q29udGVudCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImNoYW5nZVJvdGF0b3IiLCJyb3RhdG9yQnRuIiwicGxheWVyVHVybiIsInNoaXBCbG9ja3MiLCJBcnJheSIsImZpbGwiLCJnZXRTaGlwQmxvY2tzIiwiZXZlcnkiLCJibG9jayJdLCJzb3VyY2VSb290IjoiIn0=