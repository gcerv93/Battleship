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
    var x = coords[0];
    var y = coords[1];
    if (isArrayInArray(unavailable, coords)) return false;

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

  (0,_placementDisplay__WEBPACK_IMPORTED_MODULE_4__["default"])(humanGameBoard); // FOR TESTING!!!

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

/***/ "./src/appLogic/placementDisplay.js":
/*!******************************************!*\
  !*** ./src/appLogic/placementDisplay.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var playerShipPlacement = function playerShipPlacement(board) {
  var container = document.querySelector(".placer");
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (_cell, idx) {
      var boardCell = document.createElement("div");
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");
      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerShipPlacement);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsU0FBaEJBLGFBQWdCO0FBQUEsV0FBTUgsVUFBTjtBQUFBLEdBQXRCOztBQUVBLFdBQVNoRixHQUFULENBQWFvRixHQUFiLEVBQWtCO0FBQ2hCSixJQUFBQSxVQUFVLENBQUNJLEdBQUQsQ0FBVixHQUFrQixJQUFsQjtBQUNEOztBQUVELFdBQVNsQixNQUFULEdBQWtCO0FBQ2hCLFFBQU16QyxNQUFNLEdBQUd1RCxVQUFVLENBQUNLLEtBQVgsQ0FBaUIsVUFBQ0MsS0FBRDtBQUFBLGFBQVdBLEtBQUssS0FBSyxJQUFyQjtBQUFBLEtBQWpCLENBQWY7QUFFQSxXQUFPN0QsTUFBUDtBQUNEOztBQUVELFNBQU87QUFBRThCLElBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRTCxJQUFBQSxNQUFNLEVBQU5BLE1BQVI7QUFBZ0JpQyxJQUFBQSxhQUFhLEVBQWJBLGFBQWhCO0FBQStCbkYsSUFBQUEsR0FBRyxFQUFIQSxHQUEvQjtBQUFvQ2tFLElBQUFBLE1BQU0sRUFBTkE7QUFBcEMsR0FBUDtBQUNELENBaEJEOztBQWtCQSxpRUFBZS9CLFdBQWY7Ozs7Ozs7Ozs7O0FDbEJBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUFrQyw4REFBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9ET01zdHVmZi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2NvbXB1dGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2dhbWVCb2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3BsYWNlbWVudERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICBjb25zdCBjb250YWlucyA9IGFyci5zb21lKChlbGUpID0+IEpTT04uc3RyaW5naWZ5KGVsZSkgPT09IGl0ZW1Bc1N0cmluZyk7XG4gIHJldHVybiBjb250YWlucztcbn07XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlMZWZ0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnRcIik7XG5cbiAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIHdoZW4gYSBzaG90IGlzIGEgaGl0IG9yIGEgbWlzc1xuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcblxuICAgICAgaWYgKGNlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjZWxsLmhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheUluQXJyYXkoYm9hcmQubWlzc2VkLCBbaSwgaWR4XSkpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dDZWxsLmFwcGVuZENoaWxkKGJvYXJkQ2VsbCk7XG4gICAgfSk7XG4gICAgbGVmdERpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5UmlnaHREaXYgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuXG4gICAgICBpZiAoY2VsbC5oaXQpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIHJpZ2h0RGl2LmFwcGVuZENoaWxkKHJvd0NlbGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvbXBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmlnaHRcIik7XG4gIGNvbXBCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IGNvbXBCb2FyZCkge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3Jvd0luZGV4LCBjZWxsSW5kZXhdKTtcbiAgICAgICAgY2xlYXJEaXNwbGF5KGNvbXBCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlSaWdodERpdihib2FyZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUxlZnREaXYsIGRpc3BsYXlSaWdodERpdiwgYWRkRXZlbnRMaXN0ZW5lcnMgfTtcbiIsImNvbnN0IGNvbXB1dGVyRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgcHJldmlvdXNNb3ZlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTW92ZSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuXG4gICAgcmVzdWx0LnB1c2goeCk7XG4gICAgcmVzdWx0LnB1c2goeSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVQbGFjZW1lbnQoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICBjb25zdCB4ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcbiAgICBjb25zdCB5ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcbiAgICBjb25zdCB6ID0gcmFuZG9tSW50ZWdlcigxLCAyKTtcblxuICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgcmVzdWx0LnB1c2goeik7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcFR1cm4oZW5lbXlCb2FyZCkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcblxuICAgIHdoaWxlIChwcmV2aW91c01vdmVzLmluY2x1ZGVzKGNvb3JkcykpIHtcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlTW92ZSgpO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHByZXZpb3VzTW92ZXMucHVzaChjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHJldmlvdXNNb3ZlcywgZ2VuZXJhdGVNb3ZlLCBnZW5lcmF0ZVBsYWNlbWVudCwgY29tcFR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXB1dGVyRmFjdG9yeTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5jb25zdCBnYW1lQm9hcmRGYWN0b3J5ID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICBdO1xuXG4gIGNvbnN0IG1pc3NlZCA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KFwiY2FycmllclwiLCA1KTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KFwiZGVzdHJveWVyXCIsIDMpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KFwic3VibWFyaW5lXCIsIDMpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBzaGlwRmFjdG9yeShcInBhdHJvbCBib2F0XCIsIDIpO1xuXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdF07XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGNyZWF0ZVNoaXBzKCk7XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHMoKSB7XG4gICAgcmV0dXJuIHNoaXBzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T2NjdXBpZWQoKSB7XG4gICAgY29uc3Qgb2NjdXBpZWQgPSBbXTtcblxuICAgIGJvYXJkLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGVsZW1lbnQsIGlkeCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBvY2N1cGllZC5wdXNoKFtpLCBpZHhdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2NjdXBpZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdW5rKGdhbWVTaGlwcyA9IHNoaXBzKSB7XG4gICAgaWYgKGdhbWVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBzaW5rU2hpcChzdW5rU2hpcCkge1xuICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKSA9PiBzdW5rU2hpcC5uYW1lID09PSBzaGlwLm5hbWUpO1xuXG4gICAgc2hpcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlVW5hdmFpbGFibGUoYXJyKSB7XG4gICAgY29uc3QgdW5hdmFpbGFibGUgPSBbXTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKGFycik7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdLCBhcnJbMV0gKyAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdLCBhcnJbMV0gLSAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdICsgMSwgYXJyWzFdXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdICsgMSwgYXJyWzFdICsgMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSArIDEsIGFyclsxXSAtIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gLSAxLCBhcnJbMV1dKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gLSAxLCBhcnJbMV0gKyAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdIC0gMSwgYXJyWzFdIC0gMV0pO1xuXG4gICAgcmV0dXJuIHVuYXZhaWxhYmxlO1xuICB9XG5cbiAgY29uc3QgaXNBcnJheUluQXJyYXkgPSAoYXJyLCBpdGVtKSA9PiB7XG4gICAgY29uc3QgaXRlbUFzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG5cbiAgICBjb25zdCBjb250YWlucyA9IGFyci5zb21lKChlbGUpID0+IEpTT04uc3RyaW5naWZ5KGVsZSkgPT09IGl0ZW1Bc1N0cmluZyk7XG4gICAgcmV0dXJuIGNvbnRhaW5zO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUGxhY2VtZW50KGNvb3Jkcywgb3JpZW50YXRpb24sIHNoaXApIHtcbiAgICBjb25zdCBvY2N1cGllZCA9IGdldE9jY3VwaWVkKCk7XG4gICAgY29uc3QgdW5hdmFpbGFibGUgPSBbXTtcbiAgICBvY2N1cGllZC5mb3JFYWNoKChhcnIpID0+IHtcbiAgICAgIGdlbmVyYXRlVW5hdmFpbGFibGUoYXJyKS5mb3JFYWNoKChlbGUpID0+IHVuYXZhaWxhYmxlLnB1c2goZWxlKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgeCA9IGNvb3Jkc1swXTtcbiAgICBsZXQgeSA9IGNvb3Jkc1sxXTtcbiAgICBpZiAoaXNBcnJheUluQXJyYXkodW5hdmFpbGFibGUsIGNvb3JkcykpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBjaGVja0Nvb3JkcztcblxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgeCArPSAxO1xuICAgICAgICBpZiAoeCA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY2hlY2tDb29yZHMgPSBbeCwgeV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5ICs9IDE7XG4gICAgICAgIGlmICh5ID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjaGVja0Nvb3JkcyA9IFt4LCB5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQXJyYXlJbkFycmF5KHVuYXZhaWxhYmxlLCBjaGVja0Nvb3JkcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VWZXJ0aWNhbGx5KGNvb3Jkcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYm9hcmRbY29vcmRzWzBdICsgaV1bY29vcmRzWzFdXSA9IHtcbiAgICAgICAgc2hpcCxcbiAgICAgICAgbmFtZTogc2hpcC5uYW1lLFxuICAgICAgICBsZW5ndGg6IHNoaXAubGVuZ3RoLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsbHkoY29vcmRzLCBzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXSArIGldID0ge1xuICAgICAgICBzaGlwLFxuICAgICAgICBuYW1lOiBzaGlwLm5hbWUsXG4gICAgICAgIGxlbmd0aDogc2hpcC5sZW5ndGgsXG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXAoY29vcmRzLCBvcmllbnRhdGlvbiwgc2hpcCkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICBwbGFjZVZlcnRpY2FsbHkoY29vcmRzLCBzaGlwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxhY2VIb3Jpem9udGFsbHkoY29vcmRzLCBzaGlwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuICAgIGlmIChib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09IGZhbHNlKSB7XG4gICAgICBtaXNzZWQucHVzaChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvYmogPSBib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV07XG4gICAgICBvYmouaGl0ID0gdHJ1ZTtcbiAgICAgIG9iai5zaGlwLmhpdChvYmouaW5kZXgpO1xuICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XG5cbiAgICAgIGlmIChvYmouc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzaW5rU2hpcChvYmouc2hpcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZCxcbiAgICBnZXRTaGlwcyxcbiAgICBhbGxTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICBtaXNzZWQsXG4gICAgaGl0cyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldE9jY3VwaWVkLFxuICAgIHZhbGlkYXRlUGxhY2VtZW50LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkRmFjdG9yeTtcbiIsImltcG9ydCBjb21wdXRlckZhY3RvcnkgZnJvbSBcIi4vY29tcHV0ZXJGYWN0b3J5XCI7XG5pbXBvcnQgcGxheWVyRmFjdG9yeSBmcm9tIFwiLi9wbGF5ZXJGYWN0b3J5XCI7XG5pbXBvcnQgZ2FtZUJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lQm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVycywgZGlzcGxheUxlZnREaXYsIGRpc3BsYXlSaWdodERpdiB9IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5pbXBvcnQgcGxheWVyU2hpcFBsYWNlbWVudCBmcm9tIFwiLi9wbGFjZW1lbnREaXNwbGF5XCI7XG5cbmNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllckZhY3RvcnkoXCJodW1hblwiKTtcbiAgY29uc3QgY29tcFBsYXllciA9IGNvbXB1dGVyRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGh1bWFuR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBjb21wR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGdhbWVPdmVyQ2hlY2sgPSAoKSA9PiB7fTtcblxuICBwbGF5ZXJTaGlwUGxhY2VtZW50KGh1bWFuR2FtZUJvYXJkKTtcbiAgLy8gRk9SIFRFU1RJTkchISFcbiAgY29uc3QgZmlyc3RTaGlwID0gaHVtYW5HYW1lQm9hcmQuZ2V0U2hpcHMoKVswXTtcbiAgaHVtYW5HYW1lQm9hcmQucGxhY2VTaGlwKFszLCAzXSwgXCJob3Jpem9udGFsXCIsIGZpcnN0U2hpcCk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDNdKTtcbiAgaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgMl0pO1xuICBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFsyLCAyXSk7XG4gIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzEsIDJdKTtcbiAgaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgNF0pO1xuXG4gIGNvbnN0IGNvbXBTaGlwID0gY29tcEdhbWVCb2FyZC5nZXRTaGlwcygpWzBdO1xuICBjb21wR2FtZUJvYXJkLnBsYWNlU2hpcChbMywgM10sIFwiaG9yaXpvbnRhbFwiLCBjb21wU2hpcCk7XG4gIGNvbXBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgM10pO1xuICBjb21wR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzMsIDJdKTtcbiAgLy8gRk9SIFRFU1RJTkchISFcblxuICBkaXNwbGF5TGVmdERpdihodW1hbkdhbWVCb2FyZCk7XG4gIGRpc3BsYXlSaWdodERpdihjb21wR2FtZUJvYXJkKTtcbiAgYWRkRXZlbnRMaXN0ZW5lcnMoY29tcEdhbWVCb2FyZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lTG9vcDtcbiIsImNvbnN0IHBsYXllclNoaXBQbGFjZW1lbnQgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZXJcIik7XG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKF9jZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcbiAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyU2hpcFBsYWNlbWVudDtcbiIsImNvbnN0IHBsYXllckZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGNvb3JkcywgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgcGxheWVyVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyRmFjdG9yeTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQmxvY2tzID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCh0cnVlKTtcblxuICBjb25zdCBnZXRTaGlwQmxvY2tzID0gKCkgPT4gc2hpcEJsb2NrcztcblxuICBmdW5jdGlvbiBoaXQobnVtKSB7XG4gICAgc2hpcEJsb2Nrc1tudW1dID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzaGlwQmxvY2tzLmV2ZXJ5KChibG9jaykgPT4gYmxvY2sgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGxlbmd0aCwgZ2V0U2hpcEJsb2NrcywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbImlzQXJyYXlJbkFycmF5IiwiYXJyIiwiaXRlbSIsIml0ZW1Bc1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250YWlucyIsInNvbWUiLCJlbGUiLCJjbGVhckRpc3BsYXkiLCJlbGVtZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZGlzcGxheUxlZnREaXYiLCJib2FyZCIsImxlZnREaXYiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRCb2FyZCIsImZvckVhY2giLCJyb3ciLCJpIiwicm93Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJjZWxsIiwiaWR4IiwiYm9hcmRDZWxsIiwiaGl0IiwibWlzc2VkIiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5UmlnaHREaXYiLCJyaWdodERpdiIsImFkZEV2ZW50TGlzdGVuZXJzIiwiY29tcEJvYXJkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50Iiwicm93SW5kZXgiLCJwYXJzZUludCIsImNlbGxJbmRleCIsInJlY2VpdmVBdHRhY2siLCJvbmNlIiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJnZW5lcmF0ZVBsYWNlbWVudCIsInoiLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInNoaXBGYWN0b3J5IiwiZ2FtZUJvYXJkRmFjdG9yeSIsImhpdHMiLCJjcmVhdGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInNoaXBzIiwiZ2V0U2hpcHMiLCJnZXRPY2N1cGllZCIsIm9jY3VwaWVkIiwiYWxsU3VuayIsImdhbWVTaGlwcyIsImxlbmd0aCIsInNpbmtTaGlwIiwic3Vua1NoaXAiLCJmaW5kSW5kZXgiLCJzaGlwIiwibmFtZSIsInNwbGljZSIsImdlbmVyYXRlVW5hdmFpbGFibGUiLCJ1bmF2YWlsYWJsZSIsInZhbGlkYXRlUGxhY2VtZW50Iiwib3JpZW50YXRpb24iLCJjaGVja0Nvb3JkcyIsInBsYWNlVmVydGljYWxseSIsInBsYWNlSG9yaXpvbnRhbGx5IiwicGxhY2VTaGlwIiwib2JqIiwiaXNTdW5rIiwicGxheWVyRmFjdG9yeSIsInBsYXllclNoaXBQbGFjZW1lbnQiLCJnYW1lTG9vcCIsImh1bWFuUGxheWVyIiwiY29tcFBsYXllciIsImh1bWFuR2FtZUJvYXJkIiwiY29tcEdhbWVCb2FyZCIsImdhbWVPdmVyQ2hlY2siLCJmaXJzdFNoaXAiLCJjb21wU2hpcCIsImNvbnRhaW5lciIsIl9jZWxsIiwicGxheWVyVHVybiIsInNoaXBCbG9ja3MiLCJBcnJheSIsImZpbGwiLCJnZXRTaGlwQmxvY2tzIiwibnVtIiwiZXZlcnkiLCJibG9jayJdLCJzb3VyY2VSb290IjoiIn0=