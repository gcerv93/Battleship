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
    receiveAttack: receiveAttack
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





var gameLoop = function gameLoop() {
  var humanPlayer = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_1__["default"])("human");
  var compPlayer = (0,_computerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var humanGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();
  var compGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();

  var gameOverCheck = function gameOverCheck() {}; // FOR TESTING!!!


  var firstShip = humanGameBoard.getShips()[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUNwQyxNQUFNQyxZQUFZLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxJQUFmLENBQXJCO0FBRUEsTUFBTUksUUFBUSxHQUFHTCxHQUFHLENBQUNNLElBQUosQ0FBUyxVQUFDQyxHQUFEO0FBQUEsV0FBU0osSUFBSSxDQUFDQyxTQUFMLENBQWVHLEdBQWYsTUFBd0JMLFlBQWpDO0FBQUEsR0FBVCxDQUFqQjtBQUNBLFNBQU9HLFFBQVA7QUFDRCxDQUxEOztBQU9BLElBQU1HLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNDLE9BQUQsRUFBYTtBQUNoQyxTQUFPQSxPQUFPLENBQUNDLFVBQWYsRUFBMkI7QUFDekJELElBQUFBLE9BQU8sQ0FBQ0UsV0FBUixDQUFvQkYsT0FBTyxDQUFDQyxVQUE1QjtBQUNEO0FBQ0YsQ0FKRDs7QUFNQSxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLEtBQUQsRUFBVztBQUNoQyxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFoQixDQURnQyxDQUdoQzs7QUFDQUgsRUFBQUEsS0FBSyxDQUFDSSxRQUFOLEdBQWlCQyxPQUFqQixDQUF5QixVQUFDQyxHQUFELEVBQU1DLENBQU4sRUFBWTtBQUNuQyxRQUFNQyxPQUFPLEdBQUdOLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBRCxJQUFBQSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JDLEtBQWhCLEdBQXdCSixDQUF4QjtBQUNBQyxJQUFBQSxPQUFPLENBQUNJLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLEtBQXRCO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ0QsT0FBSixDQUFZLFVBQUNTLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQ3pCLFVBQU1DLFNBQVMsR0FBR2QsUUFBUSxDQUFDTyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0FPLE1BQUFBLFNBQVMsQ0FBQ04sT0FBVixDQUFrQkMsS0FBbEIsR0FBMEJJLEdBQTFCOztBQUVBLFVBQUlELElBQUksS0FBSyxLQUFiLEVBQW9CO0FBQ2xCRSxRQUFBQSxTQUFTLENBQUNKLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLE1BQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xHLFFBQUFBLFNBQVMsQ0FBQ0osU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsVUFBeEI7QUFDRDs7QUFFRCxVQUFJQyxJQUFJLENBQUNHLEdBQUwsS0FBYSxJQUFqQixFQUF1QjtBQUNyQkQsUUFBQUEsU0FBUyxDQUFDSixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixLQUF4QjtBQUNELE9BRkQsTUFFTyxJQUFJM0IsY0FBYyxDQUFDYyxLQUFLLENBQUNrQixNQUFQLEVBQWUsQ0FBQ1gsQ0FBRCxFQUFJUSxHQUFKLENBQWYsQ0FBbEIsRUFBNEM7QUFDakRDLFFBQUFBLFNBQVMsQ0FBQ0osU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsTUFBeEI7QUFDRDs7QUFFREwsTUFBQUEsT0FBTyxDQUFDVyxXQUFSLENBQW9CSCxTQUFwQjtBQUNELEtBakJEO0FBa0JBZixJQUFBQSxPQUFPLENBQUNrQixXQUFSLENBQW9CWCxPQUFwQjtBQUNELEdBdkJEO0FBd0JELENBNUJEOztBQThCQSxJQUFNWSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNwQixLQUFELEVBQVc7QUFDakMsTUFBTXFCLFFBQVEsR0FBR25CLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFqQjtBQUVBSCxFQUFBQSxLQUFLLENBQUNJLFFBQU4sR0FBaUJDLE9BQWpCLENBQXlCLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQ25DLFFBQU1DLE9BQU8sR0FBR04sUUFBUSxDQUFDTyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FELElBQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkMsS0FBaEIsR0FBd0JKLENBQXhCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0ksU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsS0FBdEI7QUFDQVAsSUFBQUEsR0FBRyxDQUFDRCxPQUFKLENBQVksVUFBQ1MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDekIsVUFBTUMsU0FBUyxHQUFHZCxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQU8sTUFBQUEsU0FBUyxDQUFDTixPQUFWLENBQWtCQyxLQUFsQixHQUEwQkksR0FBMUI7QUFDQUMsTUFBQUEsU0FBUyxDQUFDSixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixNQUF4Qjs7QUFFQSxVQUFJQyxJQUFJLENBQUNHLEdBQVQsRUFBYztBQUNaRCxRQUFBQSxTQUFTLENBQUNKLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLEtBQXhCO0FBQ0QsT0FGRCxNQUVPLElBQUkzQixjQUFjLENBQUNjLEtBQUssQ0FBQ2tCLE1BQVAsRUFBZSxDQUFDWCxDQUFELEVBQUlRLEdBQUosQ0FBZixDQUFsQixFQUE0QztBQUNqREMsUUFBQUEsU0FBUyxDQUFDSixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixNQUF4QjtBQUNEOztBQUVETCxNQUFBQSxPQUFPLENBQUNXLFdBQVIsQ0FBb0JILFNBQXBCO0FBQ0QsS0FaRDtBQWFBSyxJQUFBQSxRQUFRLENBQUNGLFdBQVQsQ0FBcUJYLE9BQXJCO0FBQ0QsR0FsQkQ7QUFtQkQsQ0F0QkQ7O0FBd0JBLElBQU1jLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ3RCLEtBQUQsRUFBVztBQUNuQyxNQUFNdUIsU0FBUyxHQUFHckIsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0FBQ0FvQixFQUFBQSxTQUFTLENBQUNDLGdCQUFWLENBQ0UsT0FERixFQUVFLFVBQUNDLENBQUQsRUFBTztBQUNMLFFBQUlBLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxhQUFULEtBQTJCSixTQUEvQixFQUEwQztBQUN4QyxVQUFNSyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0osQ0FBQyxDQUFDQyxNQUFGLENBQVNDLGFBQVQsQ0FBdUJqQixPQUF2QixDQUErQkMsS0FBaEMsRUFBdUMsRUFBdkMsQ0FBekI7QUFDQSxVQUFNbUIsU0FBUyxHQUFHRCxRQUFRLENBQUNKLENBQUMsQ0FBQ0MsTUFBRixDQUFTaEIsT0FBVCxDQUFpQkMsS0FBbEIsRUFBeUIsRUFBekIsQ0FBMUI7QUFDQVgsTUFBQUEsS0FBSyxDQUFDK0IsYUFBTixDQUFvQixDQUFDSCxRQUFELEVBQVdFLFNBQVgsQ0FBcEI7QUFDQW5DLE1BQUFBLFlBQVksQ0FBQzRCLFNBQUQsQ0FBWjtBQUNBSCxNQUFBQSxlQUFlLENBQUNwQixLQUFELENBQWY7QUFDRDtBQUNGLEdBVkgsRUFXRTtBQUFFZ0MsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FYRjtBQWFELENBZkQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUEsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQU1DLGFBQWEsR0FBRyxFQUF0Qjs7QUFFQSxXQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUM7QUFDL0IsV0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkgsR0FBRyxHQUFHRCxHQUFOLEdBQVksQ0FBN0IsQ0FBWCxJQUE4Q0EsR0FBckQ7QUFDRDs7QUFFRCxXQUFTSyxZQUFULEdBQXdCO0FBQ3RCLFFBQU1DLE1BQU0sR0FBRyxFQUFmO0FBRUEsUUFBTUMsQ0FBQyxHQUFHUixhQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBdkI7QUFDQSxRQUFNUyxDQUFDLEdBQUdULGFBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF2QjtBQUVBTyxJQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUYsQ0FBWjtBQUNBRCxJQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUQsQ0FBWjtBQUVBLFdBQU9GLE1BQVA7QUFDRDs7QUFFRCxXQUFTSSxRQUFULENBQWtCQyxVQUFsQixFQUE4QjtBQUM1QixRQUFJQyxNQUFNLEdBQUdQLFlBQVksRUFBekI7O0FBRUEsV0FBT1AsYUFBYSxDQUFDZSxRQUFkLENBQXVCRCxNQUF2QixDQUFQLEVBQXVDO0FBQ3JDQSxNQUFBQSxNQUFNLEdBQUdQLFlBQVksRUFBckI7QUFDRDs7QUFFRE0sSUFBQUEsVUFBVSxDQUFDaEIsYUFBWCxDQUF5QmlCLE1BQXpCO0FBQ0FkLElBQUFBLGFBQWEsQ0FBQ1csSUFBZCxDQUFtQkcsTUFBbkI7QUFDRDs7QUFFRCxTQUFPO0FBQUVkLElBQUFBLGFBQWEsRUFBYkEsYUFBRjtBQUFpQk8sSUFBQUEsWUFBWSxFQUFaQSxZQUFqQjtBQUErQkssSUFBQUEsUUFBUSxFQUFSQTtBQUEvQixHQUFQO0FBQ0QsQ0EvQkQ7O0FBaUNBLGlFQUFlYixlQUFmOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7O0FBRUEsSUFBTWtCLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsR0FBTTtBQUM3QixNQUFNbkQsS0FBSyxHQUFHLENBQ1osQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFBeUQsS0FBekQsRUFBZ0UsS0FBaEUsQ0FEWSxFQUVaLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLENBRlksRUFHWixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxLQUFsRCxFQUF5RCxLQUF6RCxFQUFnRSxLQUFoRSxDQUhZLEVBSVosQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFBeUQsS0FBekQsRUFBZ0UsS0FBaEUsQ0FKWSxFQUtaLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLENBTFksRUFNWixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxLQUFsRCxFQUF5RCxLQUF6RCxFQUFnRSxLQUFoRSxDQU5ZLEVBT1osQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFBeUQsS0FBekQsRUFBZ0UsS0FBaEUsQ0FQWSxFQVFaLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLENBUlksRUFTWixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxFQUFrRCxLQUFsRCxFQUF5RCxLQUF6RCxFQUFnRSxLQUFoRSxDQVRZLEVBVVosQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFBeUQsS0FBekQsRUFBZ0UsS0FBaEUsQ0FWWSxDQUFkO0FBYUEsTUFBTWtCLE1BQU0sR0FBRyxFQUFmO0FBQ0EsTUFBTWtDLElBQUksR0FBRyxFQUFiOztBQUVBLFdBQVNDLFdBQVQsR0FBdUI7QUFDckIsUUFBTUMsT0FBTyxHQUFHSix3REFBVyxDQUFDLFNBQUQsRUFBWSxDQUFaLENBQTNCO0FBQ0EsUUFBTUssVUFBVSxHQUFHTCx3REFBVyxDQUFDLFlBQUQsRUFBZSxDQUFmLENBQTlCO0FBQ0EsUUFBTU0sU0FBUyxHQUFHTix3REFBVyxDQUFDLFdBQUQsRUFBYyxDQUFkLENBQTdCO0FBQ0EsUUFBTU8sU0FBUyxHQUFHUCx3REFBVyxDQUFDLFdBQUQsRUFBYyxDQUFkLENBQTdCO0FBQ0EsUUFBTVEsVUFBVSxHQUFHUix3REFBVyxDQUFDLGFBQUQsRUFBZ0IsQ0FBaEIsQ0FBOUI7QUFFQSxXQUFPLENBQUNJLE9BQUQsRUFBVUMsVUFBVixFQUFzQkMsU0FBdEIsRUFBaUNDLFNBQWpDLEVBQTRDQyxVQUE1QyxDQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsS0FBSyxHQUFHTixXQUFXLEVBQXpCOztBQUVBLFdBQVNPLFFBQVQsR0FBb0I7QUFDbEIsV0FBT0QsS0FBUDtBQUNEOztBQUVELFdBQVN2RCxRQUFULEdBQW9CO0FBQ2xCLFdBQU9KLEtBQVA7QUFDRDs7QUFFRCxXQUFTNkQsT0FBVCxHQUFvQztBQUFBLFFBQW5CQyxTQUFtQix1RUFBUEgsS0FBTzs7QUFDbEMsUUFBSUcsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGFBQU8sS0FBUDtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNEOztBQUVELFdBQVNDLFFBQVQsQ0FBa0JDLFFBQWxCLEVBQTRCO0FBQzFCLFFBQU10RCxLQUFLLEdBQUdnRCxLQUFLLENBQUNPLFNBQU4sQ0FBZ0IsVUFBQ0MsSUFBRDtBQUFBLGFBQVVGLFFBQVEsQ0FBQ0csSUFBVCxLQUFrQkQsSUFBSSxDQUFDQyxJQUFqQztBQUFBLEtBQWhCLENBQWQ7QUFFQVQsSUFBQUEsS0FBSyxDQUFDVSxNQUFOLENBQWExRCxLQUFiLEVBQW9CLENBQXBCO0FBQ0Q7O0FBRUQsV0FBUzJELGVBQVQsQ0FBeUJ0QixNQUF6QixFQUFpQ21CLElBQWpDLEVBQXVDO0FBQ3JDLFNBQUssSUFBSTVELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0RCxJQUFJLENBQUNKLE1BQXpCLEVBQWlDeEQsQ0FBQyxJQUFJLENBQXRDLEVBQXlDO0FBQ3ZDUCxNQUFBQSxLQUFLLENBQUNnRCxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVl6QyxDQUFiLENBQUwsQ0FBcUJ5QyxNQUFNLENBQUMsQ0FBRCxDQUEzQixJQUFrQztBQUNoQ21CLFFBQUFBLElBQUksRUFBSkEsSUFEZ0M7QUFFaENDLFFBQUFBLElBQUksRUFBRUQsSUFBSSxDQUFDQyxJQUZxQjtBQUdoQ0wsUUFBQUEsTUFBTSxFQUFFSSxJQUFJLENBQUNKLE1BSG1CO0FBSWhDcEQsUUFBQUEsS0FBSyxFQUFFSixDQUp5QjtBQUtoQ1UsUUFBQUEsR0FBRyxFQUFFO0FBTDJCLE9BQWxDO0FBT0Q7QUFDRjs7QUFFRCxXQUFTc0QsaUJBQVQsQ0FBMkJ2QixNQUEzQixFQUFtQ21CLElBQW5DLEVBQXlDO0FBQ3ZDLFNBQUssSUFBSTVELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0RCxJQUFJLENBQUNKLE1BQXpCLEVBQWlDeEQsQ0FBQyxJQUFJLENBQXRDLEVBQXlDO0FBQ3ZDUCxNQUFBQSxLQUFLLENBQUNnRCxNQUFNLENBQUMsQ0FBRCxDQUFQLENBQUwsQ0FBaUJBLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWXpDLENBQTdCLElBQWtDO0FBQ2hDNEQsUUFBQUEsSUFBSSxFQUFKQSxJQURnQztBQUVoQ0MsUUFBQUEsSUFBSSxFQUFFRCxJQUFJLENBQUNDLElBRnFCO0FBR2hDTCxRQUFBQSxNQUFNLEVBQUVJLElBQUksQ0FBQ0osTUFIbUI7QUFJaENwRCxRQUFBQSxLQUFLLEVBQUVKLENBSnlCO0FBS2hDVSxRQUFBQSxHQUFHLEVBQUU7QUFMMkIsT0FBbEM7QUFPRDtBQUNGOztBQUVELFdBQVN1RCxTQUFULENBQW1CeEIsTUFBbkIsRUFBMkJ5QixXQUEzQixFQUF3Q04sSUFBeEMsRUFBOEM7QUFDNUMsUUFBSU0sV0FBVyxLQUFLLFVBQXBCLEVBQWdDO0FBQzlCSCxNQUFBQSxlQUFlLENBQUN0QixNQUFELEVBQVNtQixJQUFULENBQWY7QUFDRCxLQUZELE1BRU87QUFDTEksTUFBQUEsaUJBQWlCLENBQUN2QixNQUFELEVBQVNtQixJQUFULENBQWpCO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTcEMsYUFBVCxDQUF1QmlCLE1BQXZCLEVBQStCO0FBQzdCLFFBQUloRCxLQUFLLENBQUNnRCxNQUFNLENBQUMsQ0FBRCxDQUFQLENBQUwsQ0FBaUJBLE1BQU0sQ0FBQyxDQUFELENBQXZCLE1BQWdDLEtBQXBDLEVBQTJDO0FBQ3pDOUIsTUFBQUEsTUFBTSxDQUFDMkIsSUFBUCxDQUFZRyxNQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBTTBCLEdBQUcsR0FBRzFFLEtBQUssQ0FBQ2dELE1BQU0sQ0FBQyxDQUFELENBQVAsQ0FBTCxDQUFpQkEsTUFBTSxDQUFDLENBQUQsQ0FBdkIsQ0FBWjtBQUNBMEIsTUFBQUEsR0FBRyxDQUFDekQsR0FBSixHQUFVLElBQVY7QUFDQXlELE1BQUFBLEdBQUcsQ0FBQ1AsSUFBSixDQUFTbEQsR0FBVCxDQUFheUQsR0FBRyxDQUFDL0QsS0FBakI7QUFDQXlDLE1BQUFBLElBQUksQ0FBQ1AsSUFBTCxDQUFVRyxNQUFWOztBQUVBLFVBQUkwQixHQUFHLENBQUNQLElBQUosQ0FBU1EsTUFBVCxFQUFKLEVBQXVCO0FBQ3JCWCxRQUFBQSxRQUFRLENBQUNVLEdBQUcsQ0FBQ1AsSUFBTCxDQUFSO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQU87QUFDTC9ELElBQUFBLFFBQVEsRUFBUkEsUUFESztBQUVMd0QsSUFBQUEsUUFBUSxFQUFSQSxRQUZLO0FBR0xDLElBQUFBLE9BQU8sRUFBUEEsT0FISztBQUlMVyxJQUFBQSxTQUFTLEVBQVRBLFNBSks7QUFLTHRELElBQUFBLE1BQU0sRUFBTkEsTUFMSztBQU1Ma0MsSUFBQUEsSUFBSSxFQUFKQSxJQU5LO0FBT0xyQixJQUFBQSxhQUFhLEVBQWJBO0FBUEssR0FBUDtBQVNELENBM0dEOztBQTZHQSxpRUFBZW9CLGdCQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTTBCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07QUFDckIsTUFBTUMsV0FBVyxHQUFHRiwwREFBYSxDQUFDLE9BQUQsQ0FBakM7QUFDQSxNQUFNRyxVQUFVLEdBQUc5Qyw0REFBZSxFQUFsQztBQUVBLE1BQU0rQyxjQUFjLEdBQUc3Qiw2REFBZ0IsRUFBdkM7QUFDQSxNQUFNOEIsYUFBYSxHQUFHOUIsNkRBQWdCLEVBQXRDOztBQUVBLE1BQU0rQixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU0sQ0FBRSxDQUE5QixDQVBxQixDQVNyQjs7O0FBQ0EsTUFBTUMsU0FBUyxHQUFHSCxjQUFjLENBQUNwQixRQUFmLEdBQTBCLENBQTFCLENBQWxCO0FBQ0FvQixFQUFBQSxjQUFjLENBQUNSLFNBQWYsQ0FBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixFQUFpQyxZQUFqQyxFQUErQ1csU0FBL0M7QUFDQUgsRUFBQUEsY0FBYyxDQUFDakQsYUFBZixDQUE2QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQTdCO0FBQ0FpRCxFQUFBQSxjQUFjLENBQUNqRCxhQUFmLENBQTZCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBN0I7QUFDQWlELEVBQUFBLGNBQWMsQ0FBQ2pELGFBQWYsQ0FBNkIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUE3QjtBQUNBaUQsRUFBQUEsY0FBYyxDQUFDakQsYUFBZixDQUE2QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQTdCO0FBQ0FpRCxFQUFBQSxjQUFjLENBQUNqRCxhQUFmLENBQTZCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBN0I7QUFFQSxNQUFNcUQsUUFBUSxHQUFHSCxhQUFhLENBQUNyQixRQUFkLEdBQXlCLENBQXpCLENBQWpCO0FBQ0FxQixFQUFBQSxhQUFhLENBQUNULFNBQWQsQ0FBd0IsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF4QixFQUFnQyxZQUFoQyxFQUE4Q1ksUUFBOUM7QUFDQUgsRUFBQUEsYUFBYSxDQUFDbEQsYUFBZCxDQUE0QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQTVCO0FBQ0FrRCxFQUFBQSxhQUFhLENBQUNsRCxhQUFkLENBQTRCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBNUIsRUFyQnFCLENBc0JyQjs7QUFFQWhDLEVBQUFBLHlEQUFjLENBQUNpRixjQUFELENBQWQ7QUFDQTVELEVBQUFBLDBEQUFlLENBQUM2RCxhQUFELENBQWY7QUFDQTNELEVBQUFBLDREQUFpQixDQUFDMkQsYUFBRCxDQUFqQjtBQUNELENBM0JEOztBQTZCQSxpRUFBZUosUUFBZjs7Ozs7Ozs7Ozs7Ozs7QUNsQ0EsSUFBTUQsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDUixJQUFELEVBQVU7QUFDOUIsV0FBU2lCLFVBQVQsQ0FBb0JyQyxNQUFwQixFQUE0QkQsVUFBNUIsRUFBd0M7QUFDdENBLElBQUFBLFVBQVUsQ0FBQ2hCLGFBQVgsQ0FBeUJpQixNQUF6QjtBQUNEOztBQUVELFNBQU87QUFBRW9CLElBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRaUIsSUFBQUEsVUFBVSxFQUFWQTtBQUFSLEdBQVA7QUFDRCxDQU5EOztBQVFBLGlFQUFlVCxhQUFmOzs7Ozs7Ozs7Ozs7OztBQ1JBLElBQU0xQixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDa0IsSUFBRCxFQUFPTCxNQUFQLEVBQWtCO0FBQ3BDLE1BQU11QixVQUFVLEdBQUcsSUFBSUMsS0FBSixDQUFVeEIsTUFBVixFQUFrQnlCLElBQWxCLENBQXVCLElBQXZCLENBQW5COztBQUVBLE1BQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSxXQUFNSCxVQUFOO0FBQUEsR0FBdEI7O0FBRUEsV0FBU3JFLEdBQVQsQ0FBYXlFLEdBQWIsRUFBa0I7QUFDaEJKLElBQUFBLFVBQVUsQ0FBQ0ksR0FBRCxDQUFWLEdBQWtCLElBQWxCO0FBQ0Q7O0FBRUQsV0FBU2YsTUFBVCxHQUFrQjtBQUNoQixRQUFNakMsTUFBTSxHQUFHNEMsVUFBVSxDQUFDSyxLQUFYLENBQWlCLFVBQUNDLEtBQUQ7QUFBQSxhQUFXQSxLQUFLLEtBQUssSUFBckI7QUFBQSxLQUFqQixDQUFmO0FBRUEsV0FBT2xELE1BQVA7QUFDRDs7QUFFRCxTQUFPO0FBQUUwQixJQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUUwsSUFBQUEsTUFBTSxFQUFOQSxNQUFSO0FBQWdCMEIsSUFBQUEsYUFBYSxFQUFiQSxhQUFoQjtBQUErQnhFLElBQUFBLEdBQUcsRUFBSEEsR0FBL0I7QUFBb0MwRCxJQUFBQSxNQUFNLEVBQU5BO0FBQXBDLEdBQVA7QUFDRCxDQWhCRDs7QUFrQkEsaUVBQWV6QixXQUFmOzs7Ozs7Ozs7OztBQ2xCQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBMkIsOERBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvRE9Nc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9jb21wdXRlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9nYW1lQm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICBjb25zdCBjb250YWlucyA9IGFyci5zb21lKChlbGUpID0+IEpTT04uc3RyaW5naWZ5KGVsZSkgPT09IGl0ZW1Bc1N0cmluZyk7XG4gIHJldHVybiBjb250YWlucztcbn07XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlMZWZ0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnRcIik7XG5cbiAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIHdoZW4gYSBzaG90IGlzIGEgaGl0IG9yIGEgbWlzc1xuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcblxuICAgICAgaWYgKGNlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjZWxsLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheUluQXJyYXkoYm9hcmQubWlzc2VkLCBbaSwgaWR4XSkpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dDZWxsLmFwcGVuZENoaWxkKGJvYXJkQ2VsbCk7XG4gICAgfSk7XG4gICAgbGVmdERpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5UmlnaHREaXYgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuXG4gICAgICBpZiAoY2VsbC5oaXQpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIHJpZ2h0RGl2LmFwcGVuZENoaWxkKHJvd0NlbGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvbXBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmlnaHRcIik7XG4gIGNvbXBCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IGNvbXBCb2FyZCkge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3Jvd0luZGV4LCBjZWxsSW5kZXhdKTtcbiAgICAgICAgY2xlYXJEaXNwbGF5KGNvbXBCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlSaWdodERpdihib2FyZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUxlZnREaXYsIGRpc3BsYXlSaWdodERpdiwgYWRkRXZlbnRMaXN0ZW5lcnMgfTtcbiIsImNvbnN0IGNvbXB1dGVyRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgcHJldmlvdXNNb3ZlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTW92ZSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuXG4gICAgcmVzdWx0LnB1c2goeCk7XG4gICAgcmVzdWx0LnB1c2goeSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcFR1cm4oZW5lbXlCb2FyZCkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcblxuICAgIHdoaWxlIChwcmV2aW91c01vdmVzLmluY2x1ZGVzKGNvb3JkcykpIHtcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlTW92ZSgpO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHByZXZpb3VzTW92ZXMucHVzaChjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHJldmlvdXNNb3ZlcywgZ2VuZXJhdGVNb3ZlLCBjb21wVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZXJGYWN0b3J5O1xuIiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL3NoaXBGYWN0b3J5XCI7XG5cbmNvbnN0IGdhbWVCb2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gIF07XG5cbiAgY29uc3QgbWlzc2VkID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBmdW5jdGlvbiBjcmVhdGVTaGlwcygpIHtcbiAgICBjb25zdCBjYXJyaWVyID0gc2hpcEZhY3RvcnkoXCJjYXJyaWVyXCIsIDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShcImJhdHRsZXNoaXBcIiwgNCk7XG4gICAgY29uc3QgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoXCJkZXN0cm95ZXJcIiwgMyk7XG4gICAgY29uc3Qgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoXCJzdWJtYXJpbmVcIiwgMyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KFwicGF0cm9sIGJvYXRcIiwgMik7XG5cbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0XTtcbiAgfVxuXG4gIGNvbnN0IHNoaXBzID0gY3JlYXRlU2hpcHMoKTtcblxuICBmdW5jdGlvbiBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gc2hpcHM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb2FyZCgpIHtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdW5rKGdhbWVTaGlwcyA9IHNoaXBzKSB7XG4gICAgaWYgKGdhbWVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBzaW5rU2hpcChzdW5rU2hpcCkge1xuICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKSA9PiBzdW5rU2hpcC5uYW1lID09PSBzaGlwLm5hbWUpO1xuXG4gICAgc2hpcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXSArIGldW2Nvb3Jkc1sxXV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV0gKyBpXSA9IHtcbiAgICAgICAgc2hpcCxcbiAgICAgICAgbmFtZTogc2hpcC5uYW1lLFxuICAgICAgICBsZW5ndGg6IHNoaXAubGVuZ3RoLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKGNvb3Jkcywgb3JpZW50YXRpb24sIHNoaXApIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcbiAgICBpZiAoYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBmYWxzZSkge1xuICAgICAgbWlzc2VkLnB1c2goY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2JqID0gYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dO1xuICAgICAgb2JqLmhpdCA9IHRydWU7XG4gICAgICBvYmouc2hpcC5oaXQob2JqLmluZGV4KTtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuXG4gICAgICBpZiAob2JqLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2lua1NoaXAob2JqLnNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgZ2V0U2hpcHMsXG4gICAgYWxsU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgbWlzc2VkLFxuICAgIGhpdHMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgY29tcHV0ZXJGYWN0b3J5IGZyb20gXCIuL2NvbXB1dGVyRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllckZhY3RvcnkgZnJvbSBcIi4vcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IGdhbWVCb2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMsIGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYgfSBmcm9tIFwiLi9ET01zdHVmZlwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXJGYWN0b3J5KFwiaHVtYW5cIik7XG4gIGNvbnN0IGNvbXBQbGF5ZXIgPSBjb21wdXRlckZhY3RvcnkoKTtcblxuICBjb25zdCBodW1hbkdhbWVCb2FyZCA9IGdhbWVCb2FyZEZhY3RvcnkoKTtcbiAgY29uc3QgY29tcEdhbWVCb2FyZCA9IGdhbWVCb2FyZEZhY3RvcnkoKTtcblxuICBjb25zdCBnYW1lT3ZlckNoZWNrID0gKCkgPT4ge307XG5cbiAgLy8gRk9SIFRFU1RJTkchISFcbiAgY29uc3QgZmlyc3RTaGlwID0gaHVtYW5HYW1lQm9hcmQuZ2V0U2hpcHMoKVswXTtcbiAgaHVtYW5HYW1lQm9hcmQucGxhY2VTaGlwKFszLCAzXSwgXCJob3Jpem9udGFsXCIsIGZpcnN0U2hpcCk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDNdKTtcbiAgaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgMl0pO1xuICBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFsyLCAyXSk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzEsIDJdKTtcbiAgaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgNF0pO1xuXG4gIGNvbnN0IGNvbXBTaGlwID0gY29tcEdhbWVCb2FyZC5nZXRTaGlwcygpWzBdO1xuICBjb21wR2FtZUJvYXJkLnBsYWNlU2hpcChbMywgM10sIFwiaG9yaXpvbnRhbFwiLCBjb21wU2hpcCk7XG4gIGNvbXBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgM10pO1xuICBjb21wR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDJdKTtcbiAgLy8gRk9SIFRFU1RJTkchISFcblxuICBkaXNwbGF5TGVmdERpdihodW1hbkdhbWVCb2FyZCk7XG4gIGRpc3BsYXlSaWdodERpdihjb21wR2FtZUJvYXJkKTtcbiAgYWRkRXZlbnRMaXN0ZW5lcnMoY29tcEdhbWVCb2FyZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lTG9vcDtcbiIsImNvbnN0IHBsYXllckZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGNvb3JkcywgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgcGxheWVyVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyRmFjdG9yeTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQmxvY2tzID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCh0cnVlKTtcblxuICBjb25zdCBnZXRTaGlwQmxvY2tzID0gKCkgPT4gc2hpcEJsb2NrcztcblxuICBmdW5jdGlvbiBoaXQobnVtKSB7XG4gICAgc2hpcEJsb2Nrc1tudW1dID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzaGlwQmxvY2tzLmV2ZXJ5KChibG9jaykgPT4gYmxvY2sgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGxlbmd0aCwgZ2V0U2hpcEJsb2NrcywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbImlzQXJyYXlJbkFycmF5IiwiYXJyIiwiaXRlbSIsIml0ZW1Bc1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250YWlucyIsInNvbWUiLCJlbGUiLCJjbGVhckRpc3BsYXkiLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZGlzcGxheUxlZnREaXYiLCJib2FyZCIsImxlZnREaXYiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRCb2FyZCIsImZvckVhY2giLCJyb3ciLCJpIiwicm93Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJjZWxsIiwiaWR4IiwiYm9hcmRDZWxsIiwiaGl0IiwibWlzc2VkIiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5UmlnaHREaXYiLCJyaWdodERpdiIsImFkZEV2ZW50TGlzdGVuZXJzIiwiY29tcEJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50Iiwicm93SW5kZXgiLCJwYXJzZUludCIsImNlbGxJbmRleCIsInJlY2VpdmVBdHRhY2siLCJvbmNlIiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInNoaXBGYWN0b3J5IiwiZ2FtZUJvYXJkRmFjdG9yeSIsImhpdHMiLCJjcmVhdGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInNoaXBzIiwiZ2V0U2hpcHMiLCJhbGxTdW5rIiwiZ2FtZVNoaXBzIiwibGVuZ3RoIiwic2lua1NoaXAiLCJzdW5rU2hpcCIsImZpbmRJbmRleCIsInNoaXAiLCJuYW1lIiwic3BsaWNlIiwicGxhY2VWZXJ0aWNhbGx5IiwicGxhY2VIb3Jpem9udGFsbHkiLCJwbGFjZVNoaXAiLCJvcmllbnRhdGlvbiIsIm9iaiIsImlzU3VuayIsInBsYXllckZhY3RvcnkiLCJnYW1lTG9vcCIsImh1bWFuUGxheWVyIiwiY29tcFBsYXllciIsImh1bWFuR2FtZUJvYXJkIiwiY29tcEdhbWVCb2FyZCIsImdhbWVPdmVyQ2hlY2siLCJmaXJzdFNoaXAiLCJjb21wU2hpcCIsInBsYXllclR1cm4iLCJzaGlwQmxvY2tzIiwiQXJyYXkiLCJmaWxsIiwiZ2V0U2hpcEJsb2NrcyIsIm51bSIsImV2ZXJ5IiwiYmxvY2siXSwic291cmNlUm9vdCI6IiJ9