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
/* harmony export */   "displayLeftDiv": () => (/* binding */ displayLeftDiv),
/* harmony export */   "displayRightDiv": () => (/* binding */ displayRightDiv)
/* harmony export */ });
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

      rowCell.appendChild(boardCell);
    });
    leftDiv.appendChild(rowCell);
  });
};

var isArrayInArray = function isArrayInArray(arr, item) {
  var itemAsString = JSON.stringify(item);
  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === itemAsString;
  });
  return contains;
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
  var compShip = compGameBoard.getShips()[0];
  compGameBoard.placeShip([3, 3], "horizontal", compShip);
  compGameBoard.receiveAttack([3, 3]);
  compGameBoard.receiveAttack([3, 2]); // FOR TESTING!!!

  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayLeftDiv)(humanGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayRightDiv)(compGameBoard); // addEventListeners(computerGameBoard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFFQTBCLDhEQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL0RPTXN0dWZmLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvY29tcHV0ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvZ2FtZUJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkaXNwbGF5TGVmdERpdiA9IChib2FyZCkgPT4ge1xuICBjb25zdCBsZWZ0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZWZ0XCIpO1xuXG4gIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciB3aGVuIGEgc2hvdCBpcyBhIGhpdCBvciBhIG1pc3NcbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG5cbiAgICAgIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dDZWxsLmFwcGVuZENoaWxkKGJvYXJkQ2VsbCk7XG4gICAgfSk7XG4gICAgbGVmdERpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBpc0FycmF5SW5BcnJheSA9IChhcnIsIGl0ZW0pID0+IHtcbiAgY29uc3QgaXRlbUFzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG5cbiAgY29uc3QgY29udGFpbnMgPSBhcnIuc29tZSgoZWxlKSA9PiBKU09OLnN0cmluZ2lmeShlbGUpID09PSBpdGVtQXNTdHJpbmcpO1xuICByZXR1cm4gY29udGFpbnM7XG59O1xuXG5jb25zdCBkaXNwbGF5UmlnaHREaXYgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuXG4gICAgICBpZiAoY2VsbC5oaXQpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIHJpZ2h0RGl2LmFwcGVuZENoaWxkKHJvd0NlbGwpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYgfTtcbiIsImNvbnN0IGNvbXB1dGVyRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgcHJldmlvdXNNb3ZlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTW92ZSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuXG4gICAgcmVzdWx0LnB1c2goeCk7XG4gICAgcmVzdWx0LnB1c2goeSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcFR1cm4oZW5lbXlCb2FyZCkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcblxuICAgIHdoaWxlIChwcmV2aW91c01vdmVzLmluY2x1ZGVzKGNvb3JkcykpIHtcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlTW92ZSgpO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHByZXZpb3VzTW92ZXMucHVzaChjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHJldmlvdXNNb3ZlcywgZ2VuZXJhdGVNb3ZlLCBjb21wVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZXJGYWN0b3J5O1xuIiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL3NoaXBGYWN0b3J5XCI7XG5cbmNvbnN0IGdhbWVCb2FyZEZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gIF07XG5cbiAgY29uc3QgbWlzc2VkID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgY2FycmllciA9IHNoaXBGYWN0b3J5KFwiY2FycmllclwiLCA1KTtcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KFwiZGVzdHJveWVyXCIsIDMpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KFwic3VibWFyaW5lXCIsIDMpO1xuICAgIGNvbnN0IHBhdHJvbEJvYXQgPSBzaGlwRmFjdG9yeShcInBhdHJvbCBib2F0XCIsIDIpO1xuXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdF07XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGNyZWF0ZVNoaXBzKCk7XG5cbiAgZnVuY3Rpb24gZ2V0U2hpcHMoKSB7XG4gICAgcmV0dXJuIHNoaXBzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsbHkoY29vcmRzLCBzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBib2FyZFtjb29yZHNbMF0gKyBpXVtjb29yZHNbMV1dID0ge1xuICAgICAgICBzaGlwLFxuICAgICAgICBuYW1lOiBzaGlwLm5hbWUsXG4gICAgICAgIGxlbmd0aDogc2hpcC5sZW5ndGgsXG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdICsgaV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG4gICAgaWYgKGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gZmFsc2UpIHtcbiAgICAgIG1pc3NlZC5wdXNoKGNvb3Jkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9iaiA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICAgIG9iai5oaXQgPSB0cnVlO1xuICAgICAgb2JqLnNoaXAuaGl0KG9iai5pbmRleCk7XG5cbiAgICAgIGlmIChvYmouc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzaW5rU2hpcChvYmouc2hpcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZCxcbiAgICBnZXRTaGlwcyxcbiAgICBhbGxTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICBtaXNzZWQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgY29tcHV0ZXJGYWN0b3J5IGZyb20gXCIuL2NvbXB1dGVyRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllckZhY3RvcnkgZnJvbSBcIi4vcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IGdhbWVCb2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgZGlzcGxheUxlZnREaXYsIGRpc3BsYXlSaWdodERpdiB9IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5cbmNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllckZhY3RvcnkoXCJodW1hblwiKTtcbiAgY29uc3QgY29tcFBsYXllciA9IGNvbXB1dGVyRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGh1bWFuR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBjb21wR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGdhbWVPdmVyQ2hlY2sgPSAoKSA9PiB7fTtcblxuICAvLyBGT1IgVEVTVElORyEhIVxuICBjb25zdCBmaXJzdFNoaXAgPSBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpWzBdO1xuICBodW1hbkdhbWVCb2FyZC5wbGFjZVNoaXAoWzMsIDNdLCBcImhvcml6b250YWxcIiwgZmlyc3RTaGlwKTtcbiAgY29uc3QgY29tcFNoaXAgPSBjb21wR2FtZUJvYXJkLmdldFNoaXBzKClbMF07XG4gIGNvbXBHYW1lQm9hcmQucGxhY2VTaGlwKFszLCAzXSwgXCJob3Jpem9udGFsXCIsIGNvbXBTaGlwKTtcbiAgY29tcEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCAzXSk7XG4gIGNvbXBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgMl0pO1xuICAvLyBGT1IgVEVTVElORyEhIVxuXG4gIGRpc3BsYXlMZWZ0RGl2KGh1bWFuR2FtZUJvYXJkKTtcbiAgZGlzcGxheVJpZ2h0RGl2KGNvbXBHYW1lQm9hcmQpO1xuICAvLyBhZGRFdmVudExpc3RlbmVycyhjb21wdXRlckdhbWVCb2FyZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lTG9vcDtcbiIsImNvbnN0IHBsYXllckZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGNvb3JkcywgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgcGxheWVyVHVybiB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyRmFjdG9yeTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQmxvY2tzID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCh0cnVlKTtcblxuICBjb25zdCBnZXRTaGlwQmxvY2tzID0gKCkgPT4gc2hpcEJsb2NrcztcblxuICBmdW5jdGlvbiBoaXQobnVtKSB7XG4gICAgc2hpcEJsb2Nrc1tudW1dID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzaGlwQmxvY2tzLmV2ZXJ5KChibG9jaykgPT4gYmxvY2sgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGxlbmd0aCwgZ2V0U2hpcEJsb2NrcywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbImRpc3BsYXlMZWZ0RGl2IiwiYm9hcmQiLCJsZWZ0RGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Qm9hcmQiLCJmb3JFYWNoIiwicm93IiwiaSIsInJvd0NlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsImlkeCIsImJvYXJkQ2VsbCIsImFwcGVuZENoaWxkIiwiaXNBcnJheUluQXJyYXkiLCJhcnIiLCJpdGVtIiwiaXRlbUFzU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRhaW5zIiwic29tZSIsImVsZSIsImRpc3BsYXlSaWdodERpdiIsInJpZ2h0RGl2IiwiaGl0IiwibWlzc2VkIiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInJlY2VpdmVBdHRhY2siLCJzaGlwRmFjdG9yeSIsImdhbWVCb2FyZEZhY3RvcnkiLCJjcmVhdGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInNoaXBzIiwiZ2V0U2hpcHMiLCJhbGxTdW5rIiwiZ2FtZVNoaXBzIiwibGVuZ3RoIiwic2lua1NoaXAiLCJzdW5rU2hpcCIsImZpbmRJbmRleCIsInNoaXAiLCJuYW1lIiwic3BsaWNlIiwicGxhY2VWZXJ0aWNhbGx5IiwicGxhY2VIb3Jpem9udGFsbHkiLCJwbGFjZVNoaXAiLCJvcmllbnRhdGlvbiIsIm9iaiIsImlzU3VuayIsInBsYXllckZhY3RvcnkiLCJnYW1lTG9vcCIsImh1bWFuUGxheWVyIiwiY29tcFBsYXllciIsImh1bWFuR2FtZUJvYXJkIiwiY29tcEdhbWVCb2FyZCIsImdhbWVPdmVyQ2hlY2siLCJmaXJzdFNoaXAiLCJjb21wU2hpcCIsInBsYXllclR1cm4iLCJzaGlwQmxvY2tzIiwiQXJyYXkiLCJmaWxsIiwiZ2V0U2hpcEJsb2NrcyIsIm51bSIsImV2ZXJ5IiwiYmxvY2siXSwic291cmNlUm9vdCI6IiJ9