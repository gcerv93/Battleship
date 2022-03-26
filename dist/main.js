/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appLogic/DOMstuff.js":
/*!**********************************!*\
  !*** ./src/appLogic/DOMstuff.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayCompDiv": () => (/* binding */ displayCompDiv),
/* harmony export */   "displayPlayerDiv": () => (/* binding */ displayPlayerDiv),
/* harmony export */   "gameOverDisplay": () => (/* binding */ gameOverDisplay),
/* harmony export */   "listenForClick": () => (/* binding */ listenForClick)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/appLogic/helpers.js");


var displayPlayerDiv = function displayPlayerDiv(board) {
  var playerDiv = document.querySelector(".left");
  (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.clearDisplay)(playerDiv);
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
      } else if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isArrayInArray)(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    playerDiv.appendChild(rowCell);
  });
};

var displayCompDiv = function displayCompDiv(board) {
  var compDiv = document.querySelector(".right");
  (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.clearDisplay)(compDiv);
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (cell, idx) {
      var boardCell = document.createElement("div");
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");

      if (cell.hit === true) {
        boardCell.classList.add("hit");
      } else if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isArrayInArray)(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    compDiv.appendChild(rowCell);
  });
}; // Returns a promise for the game loop to function in turn based fashion.


var listenForClick = function listenForClick(board) {
  var compBoard = document.querySelector(".right");
  var promise = new Promise(function (resolve) {
    compBoard.addEventListener("click", function (e) {
      if (e.target.parentElement !== compBoard) {
        var rowIndex = parseInt(e.target.parentElement.dataset.index, 10);
        var cellIndex = parseInt(e.target.dataset.index, 10);
        board.receiveAttack([rowIndex, cellIndex]);
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.clearDisplay)(compBoard);
        displayCompDiv(board);
        resolve();
      }
    });
  });
  return promise;
};

var playAgainListener = function playAgainListener(newGame) {
  var playAgainBtn = document.querySelector(".playAgain");
  playAgainBtn.addEventListener("click", function () {
    var overlay = document.querySelector("#overlay");
    var gameOver = document.querySelector(".gameOver");
    overlay.classList.remove("overlay");
    gameOver.style.display = "none";
    newGame();
  }, {
    once: true
  });
};

var gameOverDisplay = function gameOverDisplay(text, newGame) {
  var overlay = document.querySelector("#overlay");
  var gameOver = document.querySelector(".gameOver");
  var gameOverWinner = document.querySelector(".winner");
  overlay.classList.add("overlay");
  gameOver.style.display = "flex";
  gameOverWinner.textContent = text;
  playAgainListener(newGame);
};



/***/ }),

/***/ "./src/appLogic/Factories/Computer.js":
/*!********************************************!*\
  !*** ./src/appLogic/Factories/Computer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Computer = function Computer() {
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
    var orientation = randomInteger(1, 2);

    if (orientation === 2) {
      orientation = "vertical";
    } else {
      orientation = "horizontal";
    }

    result.push([x, y]);
    result.push(orientation);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Computer);

/***/ }),

/***/ "./src/appLogic/Factories/Gameboard.js":
/*!*********************************************!*\
  !*** ./src/appLogic/Factories/Gameboard.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/appLogic/Factories/Ship.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/appLogic/helpers.js");



var Gameboard = function Gameboard() {
  var board = [[false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false]];
  var missed = [];
  var hits = [];

  function createShips() {
    var carrier = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])("carrier", 5);
    var battleship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])("battleship", 4);
    var destroyer = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])("destroyer", 3);
    var submarine = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])("submarine", 3);
    var patrolBoat = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])("patrol boat", 2);
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

    if (index !== -1) {
      ships.splice(index, 1);
    }
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
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isArrayInArray)(unavailable, [x, y])) return false;

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

      if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isArrayInArray)(unavailable, checkCoords)) {
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
      if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isArrayInArray)(missed, coords)) {
        missed.push(coords);
      }
    } else {
      var obj = board[coords[0]][coords[1]];
      obj.hit = true;
      obj.ship.hit(obj.index);

      if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isArrayInArray)(hits, coords)) {
        hits.push(coords);
      }

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/appLogic/Factories/Ship.js":
/*!****************************************!*\
  !*** ./src/appLogic/Factories/Ship.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(name, length) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/appLogic/gameLoop.js":
/*!**********************************!*\
  !*** ./src/appLogic/gameLoop.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Factories_Computer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Factories/Computer */ "./src/appLogic/Factories/Computer.js");
/* harmony import */ var _Factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factories/Gameboard */ "./src/appLogic/Factories/Gameboard.js");
/* harmony import */ var _DOMstuff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMstuff */ "./src/appLogic/DOMstuff.js");
/* harmony import */ var _placementDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placementDisplay */ "./src/appLogic/placementDisplay.js");





var gameLoop = function gameLoop() {
  var compPlayer = (0,_Factories_Computer__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var humanGameBoard = (0,_Factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var compGameBoard = (0,_Factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();

  var gameOverCheck = function gameOverCheck() {
    if (humanGameBoard.allSunk()) {
      return true;
    }

    if (compGameBoard.allSunk()) {
      return true;
    }

    return false;
  }; // recursive function instead of a loop for the game, so that I can wait on the click promise from listenForClick


  var gameTurn = function gameTurn() {
    if (gameOverCheck()) {
      _placementDisplay__WEBPACK_IMPORTED_MODULE_3__.playerPlaceShips.resetProperties();

      if (humanGameBoard.allSunk()) {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Lost :(", gameLoop);
      } else {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Win!", gameLoop);
      }
    } else {
      (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.listenForClick)(compGameBoard).then(function () {
        compPlayer.compTurn(humanGameBoard);
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayPlayerDiv)(humanGameBoard);
        gameTurn();
      });
    }
  };

  (0,_placementDisplay__WEBPACK_IMPORTED_MODULE_3__.placementDisplay)(humanGameBoard);
  _placementDisplay__WEBPACK_IMPORTED_MODULE_3__.playerPlaceShips.placePicker(humanGameBoard, humanGameBoard.getShips());
  compGameBoard.getShips().forEach(function (ship) {
    var result = compPlayer.generatePlacement();

    while (!compGameBoard.validatePlacement(result[0], result[1], ship)) {
      result = compPlayer.generatePlacement();
    }

    compGameBoard.placeShip(result[0], result[1], ship);
  });
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayPlayerDiv)(humanGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayCompDiv)(compGameBoard);
  gameTurn();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);

/***/ }),

/***/ "./src/appLogic/helpers.js":
/*!*********************************!*\
  !*** ./src/appLogic/helpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearDisplay": () => (/* binding */ clearDisplay),
/* harmony export */   "isArrayInArray": () => (/* binding */ isArrayInArray)
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



/***/ }),

/***/ "./src/appLogic/placementDisplay.js":
/*!******************************************!*\
  !*** ./src/appLogic/placementDisplay.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "placementDisplay": () => (/* binding */ placementDisplay),
/* harmony export */   "playerPlaceShips": () => (/* binding */ playerPlaceShips)
/* harmony export */ });
/* harmony import */ var _DOMstuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMstuff */ "./src/appLogic/DOMstuff.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/appLogic/helpers.js");



var placementDisplay = function placementDisplay(board) {
  var overlay = document.querySelector("#overlay");
  overlay.classList.add("overlay");
  var containerParent = document.querySelector(".placement");
  containerParent.style.display = "flex";
  var container = document.querySelector(".placer");
  (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.clearDisplay)(container);
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (cell, idx) {
      // the Cell element takes two dataset entries to make it easier to access later on
      var boardCell = document.createElement("div");
      boardCell.dataset.row = i;
      boardCell.dataset.index = idx;

      if (cell === false) {
        boardCell.classList.add("cell");
      } else {
        boardCell.classList.add("occupied");
      }

      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

var playerPlaceShips = function () {
  // rotator property helps to determine which way to place the ships in the placement display
  var rotator = 1; // idx property helps loop through the ships passed in to the placePicker function

  var idx = 0;

  var resetProperties = function resetProperties() {
    idx = 0;
    rotator = 1;
  };

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
  }; // function for the player to pick a place to place ships in the initial display


  var placePicker = function placePicker(board, ships) {
    // loop through the ships using idx property, so that promises work correctly
    var ship = ships[idx];
    var shipText = document.querySelector(".shipText");
    shipText.textContent = ship.name;
    var cells = document.querySelectorAll(".placer .cell"); // 2 listeners, 1 hover in and 1 hover out, for displaying the ships in the placement display

    var hoverListener = function hoverListener(e) {
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
    };

    var hoverOutListener = function hoverOutListener(e) {
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
    };

    cells.forEach(function (cell) {
      cell.addEventListener("mouseenter", hoverListener);
      cell.addEventListener("mouseleave", hoverOutListener);

      var listener = function listener(e) {
        var x = parseInt(e.target.dataset.row, 10);
        var y = parseInt(e.target.dataset.index, 10);
        var orientation;

        if (rotator === 1) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        if (board.validatePlacement([x, y], orientation, ship) === true) {
          board.placeShip([x, y], orientation, ship);
          idx += 1;

          if (idx === ships.length) {
            var overlay = document.querySelector("#overlay");
            overlay.classList.remove("overlay");
            var popup = document.querySelector(".placement");
            popup.style.display = "none";
            (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_0__.displayPlayerDiv)(board);
            return;
          }

          ship = ships[idx];
          (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.clearDisplay)(document.querySelector(".placer"));
          placementDisplay(board);
          placePicker(board, ships);
        }

        cell.removeEventListener("click", listener);
      };

      cell.addEventListener("click", listener);
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
    placePicker: placePicker,
    resetProperties: resetProperties
  };
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _appLogic_gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appLogic/gameLoop */ "./src/appLogic/gameLoop.js");


(0,_appLogic_gameLoop__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./node_modules/regenerator-runtime/runtime.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7O1VDanZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9ET01zdHVmZi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL0ZhY3Rvcmllcy9Db21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL0ZhY3Rvcmllcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9GYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3BsYWNlbWVudERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0FycmF5SW5BcnJheSwgY2xlYXJEaXNwbGF5IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5jb25zdCBkaXNwbGF5UGxheWVyRGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdFwiKTtcbiAgY2xlYXJEaXNwbGF5KHBsYXllckRpdik7XG5cbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG5cbiAgICAgIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2VsbC5oaXQgPT09IHRydWUpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIHBsYXllckRpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5Q29tcERpdiA9IChib2FyZCkgPT4ge1xuICBjb25zdCBjb21wRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcbiAgY2xlYXJEaXNwbGF5KGNvbXBEaXYpO1xuXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuXG4gICAgICBpZiAoY2VsbC5oaXQgPT09IHRydWUpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIGNvbXBEaXYuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuLy8gUmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSBnYW1lIGxvb3AgdG8gZnVuY3Rpb24gaW4gdHVybiBiYXNlZCBmYXNoaW9uLlxuY29uc3QgbGlzdGVuRm9yQ2xpY2sgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgY29tcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29tcEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IGNvbXBCb2FyZCkge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3Jvd0luZGV4LCBjZWxsSW5kZXhdKTtcbiAgICAgICAgY2xlYXJEaXNwbGF5KGNvbXBCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlDb21wRGl2KGJvYXJkKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbmNvbnN0IHBsYXlBZ2Fpbkxpc3RlbmVyID0gKG5ld0dhbWUpID0+IHtcbiAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5QWdhaW5cIik7XG4gIHBsYXlBZ2FpbkJ0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVPdmVyXCIpO1xuICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmxheVwiKTtcbiAgICAgIGdhbWVPdmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIG5ld0dhbWUoKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuXG5jb25zdCBnYW1lT3ZlckRpc3BsYXkgPSAodGV4dCwgbmV3R2FtZSkgPT4ge1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICBjb25zdCBnYW1lT3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZU92ZXJcIik7XG4gIGNvbnN0IGdhbWVPdmVyV2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG4gIGdhbWVPdmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgZ2FtZU92ZXJXaW5uZXIudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIHBsYXlBZ2Fpbkxpc3RlbmVyKG5ld0dhbWUpO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheVBsYXllckRpdiwgZGlzcGxheUNvbXBEaXYsIGxpc3RlbkZvckNsaWNrLCBnYW1lT3ZlckRpc3BsYXkgfTtcbiIsImNvbnN0IENvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c01vdmVzID0gW107XG5cbiAgZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVNb3ZlKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgY29uc3QgeCA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG5cbiAgICByZXN1bHQucHVzaCh4KTtcbiAgICByZXN1bHQucHVzaCh5KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVBsYWNlbWVudCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGxldCBvcmllbnRhdGlvbiA9IHJhbmRvbUludGVnZXIoMSwgMik7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09IDIpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgcmVzdWx0LnB1c2gob3JpZW50YXRpb24pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBUdXJuKGVuZW15Qm9hcmQpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVNb3ZlKCk7XG5cbiAgICB3aGlsZSAocHJldmlvdXNNb3Zlcy5pbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBwcmV2aW91c01vdmVzLnB1c2goY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IHByZXZpb3VzTW92ZXMsIGdlbmVyYXRlTW92ZSwgZ2VuZXJhdGVQbGFjZW1lbnQsIGNvbXBUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IGlzQXJyYXlJbkFycmF5IH0gZnJvbSBcIi4uL2hlbHBlcnNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICBdO1xuXG4gIGNvbnN0IG1pc3NlZCA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgY2FycmllciA9IFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDMpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoXCJwYXRyb2wgYm9hdFwiLCAyKTtcblxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXRdO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gIGZ1bmN0aW9uIGdldFNoaXBzKCkge1xuICAgIHJldHVybiBzaGlwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9jY3VwaWVkKCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gW107XG5cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgb2NjdXBpZWQucHVzaChbaSwgaWR4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VwaWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVVbmF2YWlsYWJsZShhcnIpIHtcbiAgICBjb25zdCB1bmF2YWlsYWJsZSA9IFtdO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goYXJyKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSAtIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV1dKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV0gKyAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdICsgMSwgYXJyWzFdIC0gMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gLSAxLCBhcnJbMV0gLSAxXSk7XG5cbiAgICByZXR1cm4gdW5hdmFpbGFibGU7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVBsYWNlbWVudChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgY29uc3Qgb2NjdXBpZWQgPSBnZXRPY2N1cGllZCgpO1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlID0gW107XG4gICAgb2NjdXBpZWQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgICBnZW5lcmF0ZVVuYXZhaWxhYmxlKGFycikuZm9yRWFjaCgoZWxlKSA9PiB1bmF2YWlsYWJsZS5wdXNoKGVsZSkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHggPSBjb29yZHNbMF07XG4gICAgbGV0IHkgPSBjb29yZHNbMV07XG4gICAgaWYgKGlzQXJyYXlJbkFycmF5KHVuYXZhaWxhYmxlLCBbeCwgeV0pKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgY2hlY2tDb29yZHM7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIHggKz0gMTtcbiAgICAgICAgaWYgKHggPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNoZWNrQ29vcmRzID0gW3gsIHldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSArPSAxO1xuICAgICAgICBpZiAoeSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY2hlY2tDb29yZHMgPSBbeCwgeV07XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgY2hlY2tDb29yZHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXSArIGldW2Nvb3Jkc1sxXV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV0gKyBpXSA9IHtcbiAgICAgICAgc2hpcCxcbiAgICAgICAgbmFtZTogc2hpcC5uYW1lLFxuICAgICAgICBsZW5ndGg6IHNoaXAubGVuZ3RoLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKGNvb3Jkcywgb3JpZW50YXRpb24sIHNoaXApIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcbiAgICBpZiAoYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBmYWxzZSkge1xuICAgICAgaWYgKCFpc0FycmF5SW5BcnJheShtaXNzZWQsIGNvb3JkcykpIHtcbiAgICAgICAgbWlzc2VkLnB1c2goY29vcmRzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2JqID0gYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dO1xuICAgICAgb2JqLmhpdCA9IHRydWU7XG4gICAgICBvYmouc2hpcC5oaXQob2JqLmluZGV4KTtcblxuICAgICAgaWYgKCFpc0FycmF5SW5BcnJheShoaXRzLCBjb29yZHMpKSB7XG4gICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2lua1NoaXAob2JqLnNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgZ2V0U2hpcHMsXG4gICAgYWxsU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgbWlzc2VkLFxuICAgIGhpdHMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRPY2N1cGllZCxcbiAgICB2YWxpZGF0ZVBsYWNlbWVudCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBCbG9ja3MgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKHRydWUpO1xuXG4gIGNvbnN0IGdldFNoaXBCbG9ja3MgPSAoKSA9PiBzaGlwQmxvY2tzO1xuXG4gIGZ1bmN0aW9uIGhpdChudW0pIHtcbiAgICBzaGlwQmxvY2tzW251bV0gPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNoaXBCbG9ja3MuZXZlcnkoKGJsb2NrKSA9PiBibG9jayA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgbGVuZ3RoLCBnZXRTaGlwQmxvY2tzLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCBDb21wdXRlciBmcm9tIFwiLi9GYWN0b3JpZXMvQ29tcHV0ZXJcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vRmFjdG9yaWVzL0dhbWVib2FyZFwiO1xuaW1wb3J0IHtcbiAgbGlzdGVuRm9yQ2xpY2ssXG4gIGRpc3BsYXlQbGF5ZXJEaXYsXG4gIGRpc3BsYXlDb21wRGl2LFxuICBnYW1lT3ZlckRpc3BsYXksXG59IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5pbXBvcnQgeyBwbGFjZW1lbnREaXNwbGF5LCBwbGF5ZXJQbGFjZVNoaXBzIH0gZnJvbSBcIi4vcGxhY2VtZW50RGlzcGxheVwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgY29tcFBsYXllciA9IENvbXB1dGVyKCk7XG5cbiAgY29uc3QgaHVtYW5HYW1lQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcEdhbWVCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGdhbWVPdmVyQ2hlY2sgPSAoKSA9PiB7XG4gICAgaWYgKGh1bWFuR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjb21wR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIHJlY3Vyc2l2ZSBmdW5jdGlvbiBpbnN0ZWFkIG9mIGEgbG9vcCBmb3IgdGhlIGdhbWUsIHNvIHRoYXQgSSBjYW4gd2FpdCBvbiB0aGUgY2xpY2sgcHJvbWlzZSBmcm9tIGxpc3RlbkZvckNsaWNrXG4gIGNvbnN0IGdhbWVUdXJuID0gKCkgPT4ge1xuICAgIGlmIChnYW1lT3ZlckNoZWNrKCkpIHtcbiAgICAgIHBsYXllclBsYWNlU2hpcHMucmVzZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgIGlmIChodW1hbkdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgZ2FtZU92ZXJEaXNwbGF5KFwiWW91IExvc3QgOihcIiwgZ2FtZUxvb3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2FtZU92ZXJEaXNwbGF5KFwiWW91IFdpbiFcIiwgZ2FtZUxvb3ApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ZW5Gb3JDbGljayhjb21wR2FtZUJvYXJkKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29tcFBsYXllci5jb21wVHVybihodW1hbkdhbWVCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJEaXYoaHVtYW5HYW1lQm9hcmQpO1xuICAgICAgICBnYW1lVHVybigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHBsYWNlbWVudERpc3BsYXkoaHVtYW5HYW1lQm9hcmQpO1xuICBwbGF5ZXJQbGFjZVNoaXBzLnBsYWNlUGlja2VyKGh1bWFuR2FtZUJvYXJkLCBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpKTtcblxuICBjb21wR2FtZUJvYXJkLmdldFNoaXBzKCkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBjb21wUGxheWVyLmdlbmVyYXRlUGxhY2VtZW50KCk7XG5cbiAgICB3aGlsZSAoIWNvbXBHYW1lQm9hcmQudmFsaWRhdGVQbGFjZW1lbnQocmVzdWx0WzBdLCByZXN1bHRbMV0sIHNoaXApKSB7XG4gICAgICByZXN1bHQgPSBjb21wUGxheWVyLmdlbmVyYXRlUGxhY2VtZW50KCk7XG4gICAgfVxuXG4gICAgY29tcEdhbWVCb2FyZC5wbGFjZVNoaXAocmVzdWx0WzBdLCByZXN1bHRbMV0sIHNoaXApO1xuICB9KTtcblxuICBkaXNwbGF5UGxheWVyRGl2KGh1bWFuR2FtZUJvYXJkKTtcbiAgZGlzcGxheUNvbXBEaXYoY29tcEdhbWVCb2FyZCk7XG5cbiAgZ2FtZVR1cm4oKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVMb29wO1xuIiwiY29uc3QgaXNBcnJheUluQXJyYXkgPSAoYXJyLCBpdGVtKSA9PiB7XG4gIGNvbnN0IGl0ZW1Bc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuXG4gIGNvbnN0IGNvbnRhaW5zID0gYXJyLnNvbWUoKGVsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZWxlKSA9PT0gaXRlbUFzU3RyaW5nKTtcbiAgcmV0dXJuIGNvbnRhaW5zO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGVsZW1lbnQpID0+IHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgaXNBcnJheUluQXJyYXksIGNsZWFyRGlzcGxheSB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheVBsYXllckRpdiB9IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5pbXBvcnQgeyBjbGVhckRpc3BsYXkgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmNvbnN0IHBsYWNlbWVudERpc3BsYXkgPSAoYm9hcmQpID0+IHtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcbiAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcbiAgY29uc3QgY29udGFpbmVyUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRcIik7XG4gIGNvbnRhaW5lclBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZXJcIik7XG4gIGNsZWFyRGlzcGxheShjb250YWluZXIpO1xuXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgLy8gdGhlIENlbGwgZWxlbWVudCB0YWtlcyB0d28gZGF0YXNldCBlbnRyaWVzIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGFjY2VzcyBsYXRlciBvblxuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcblxuICAgICAgaWYgKGNlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgcGxheWVyUGxhY2VTaGlwcyA9ICgoKSA9PiB7XG4gIC8vIHJvdGF0b3IgcHJvcGVydHkgaGVscHMgdG8gZGV0ZXJtaW5lIHdoaWNoIHdheSB0byBwbGFjZSB0aGUgc2hpcHMgaW4gdGhlIHBsYWNlbWVudCBkaXNwbGF5XG4gIGxldCByb3RhdG9yID0gMTtcblxuICAvLyBpZHggcHJvcGVydHkgaGVscHMgbG9vcCB0aHJvdWdoIHRoZSBzaGlwcyBwYXNzZWQgaW4gdG8gdGhlIHBsYWNlUGlja2VyIGZ1bmN0aW9uXG4gIGxldCBpZHggPSAwO1xuXG4gIGNvbnN0IHJlc2V0UHJvcGVydGllcyA9ICgpID0+IHtcbiAgICBpZHggPSAwO1xuICAgIHJvdGF0b3IgPSAxO1xuICB9O1xuXG4gIGNvbnN0IGhvcml6b250YWxFbGVtZW50ID0gKHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpID0+IHtcbiAgICBjb25zdCByb3dOdW0gPSBwYXJzZUludChyb3dJbmRleCwgMTApO1xuICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KGNlbGxJbmRleCwgMTApICsgaTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gYC5jZWxsW2RhdGEtcm93PVwiJHtyb3dOdW19XCJdW2RhdGEtaW5kZXg9XCIke251bX1cIl1gO1xuICAgIGNvbnN0IGhvdmVyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGhvdmVyQ2VsbDtcbiAgfTtcblxuICBjb25zdCB2ZXJ0aWNhbEVsZW1lbnQgPSAocm93SW5kZXgsIGNlbGxJbmRleCwgaSkgPT4ge1xuICAgIGNvbnN0IHJvd051bSA9IHBhcnNlSW50KHJvd0luZGV4LCAxMCkgKyBpO1xuICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KGNlbGxJbmRleCwgMTApO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd051bX1cIl1bZGF0YS1pbmRleD1cIiR7bnVtfVwiXWA7XG4gICAgY29uc3QgaG92ZXJDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gaG92ZXJDZWxsO1xuICB9O1xuXG4gIC8vIGZ1bmN0aW9uIGZvciB0aGUgcGxheWVyIHRvIHBpY2sgYSBwbGFjZSB0byBwbGFjZSBzaGlwcyBpbiB0aGUgaW5pdGlhbCBkaXNwbGF5XG4gIGNvbnN0IHBsYWNlUGlja2VyID0gKGJvYXJkLCBzaGlwcykgPT4ge1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgc2hpcHMgdXNpbmcgaWR4IHByb3BlcnR5LCBzbyB0aGF0IHByb21pc2VzIHdvcmsgY29ycmVjdGx5XG4gICAgbGV0IHNoaXAgPSBzaGlwc1tpZHhdO1xuXG4gICAgY29uc3Qgc2hpcFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBUZXh0XCIpO1xuICAgIHNoaXBUZXh0LnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xuXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlciAuY2VsbFwiKTtcblxuICAgIC8vIDIgbGlzdGVuZXJzLCAxIGhvdmVyIGluIGFuZCAxIGhvdmVyIG91dCwgZm9yIGRpc3BsYXlpbmcgdGhlIHNoaXBzIGluIHRoZSBwbGFjZW1lbnQgZGlzcGxheVxuICAgIGNvbnN0IGhvdmVyTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXG4gICAgICBpZiAocm90YXRvciA9PT0gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSBob3Jpem9udGFsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlckNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocm90YXRvciA9PT0gMikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSB2ZXJ0aWNhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhvdmVyT3V0TGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXG4gICAgICBpZiAocm90YXRvciA9PT0gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSBob3Jpem9udGFsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlckNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocm90YXRvciA9PT0gMikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSB2ZXJ0aWNhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaG92ZXJMaXN0ZW5lcik7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhvdmVyT3V0TGlzdGVuZXIpO1xuXG4gICAgICBjb25zdCBsaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgMTApO1xuXG4gICAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvYXJkLnZhbGlkYXRlUGxhY2VtZW50KFt4LCB5XSwgb3JpZW50YXRpb24sIHNoaXApID09PSB0cnVlKSB7XG4gICAgICAgICAgYm9hcmQucGxhY2VTaGlwKFt4LCB5XSwgb3JpZW50YXRpb24sIHNoaXApO1xuICAgICAgICAgIGlkeCArPSAxO1xuXG4gICAgICAgICAgaWYgKGlkeCA9PT0gc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmxheVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRcIik7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkaXNwbGF5UGxheWVyRGl2KGJvYXJkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaGlwID0gc2hpcHNbaWR4XTtcbiAgICAgICAgICBjbGVhckRpc3BsYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZXJcIikpO1xuICAgICAgICAgIHBsYWNlbWVudERpc3BsYXkoYm9hcmQpO1xuICAgICAgICAgIHBsYWNlUGlja2VyKGJvYXJkLCBzaGlwcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaXN0ZW5lcik7XG4gICAgICB9O1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVJvdGF0b3IgPSAoKSA9PiB7XG4gICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgIHJvdGF0b3IgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3RhdG9yID0gMTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgcm90YXRvckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICByb3RhdG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hhbmdlUm90YXRvcigpO1xuICB9KTtcblxuICByZXR1cm4geyBwbGFjZVBpY2tlciwgcmVzZXRQcm9wZXJ0aWVzIH07XG59KSgpO1xuXG5leHBvcnQgeyBwbGFjZW1lbnREaXNwbGF5LCBwbGF5ZXJQbGFjZVNoaXBzIH07XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiaXNBcnJheUluQXJyYXkiLCJjbGVhckRpc3BsYXkiLCJkaXNwbGF5UGxheWVyRGl2IiwiYm9hcmQiLCJwbGF5ZXJEaXYiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRCb2FyZCIsImZvckVhY2giLCJyb3ciLCJpIiwicm93Q2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0IiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJjZWxsIiwiaWR4IiwiYm9hcmRDZWxsIiwiaGl0IiwibWlzc2VkIiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5Q29tcERpdiIsImNvbXBEaXYiLCJsaXN0ZW5Gb3JDbGljayIsImNvbXBCb2FyZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsInJvd0luZGV4IiwicGFyc2VJbnQiLCJjZWxsSW5kZXgiLCJyZWNlaXZlQXR0YWNrIiwicGxheUFnYWluTGlzdGVuZXIiLCJuZXdHYW1lIiwicGxheUFnYWluQnRuIiwib3ZlcmxheSIsImdhbWVPdmVyIiwicmVtb3ZlIiwic3R5bGUiLCJkaXNwbGF5Iiwib25jZSIsImdhbWVPdmVyRGlzcGxheSIsInRleHQiLCJnYW1lT3Zlcldpbm5lciIsInRleHRDb250ZW50IiwiQ29tcHV0ZXIiLCJwcmV2aW91c01vdmVzIiwicmFuZG9tSW50ZWdlciIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlTW92ZSIsInJlc3VsdCIsIngiLCJ5IiwicHVzaCIsImdlbmVyYXRlUGxhY2VtZW50Iiwib3JpZW50YXRpb24iLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsIlNoaXAiLCJHYW1lYm9hcmQiLCJoaXRzIiwiY3JlYXRlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJzaGlwcyIsImdldFNoaXBzIiwiZ2V0T2NjdXBpZWQiLCJvY2N1cGllZCIsImVsZW1lbnQiLCJhbGxTdW5rIiwiZ2FtZVNoaXBzIiwibGVuZ3RoIiwic2lua1NoaXAiLCJzdW5rU2hpcCIsImZpbmRJbmRleCIsInNoaXAiLCJuYW1lIiwic3BsaWNlIiwiZ2VuZXJhdGVVbmF2YWlsYWJsZSIsImFyciIsInVuYXZhaWxhYmxlIiwidmFsaWRhdGVQbGFjZW1lbnQiLCJlbGUiLCJjaGVja0Nvb3JkcyIsInBsYWNlVmVydGljYWxseSIsInBsYWNlSG9yaXpvbnRhbGx5IiwicGxhY2VTaGlwIiwib2JqIiwiaXNTdW5rIiwic2hpcEJsb2NrcyIsIkFycmF5IiwiZmlsbCIsImdldFNoaXBCbG9ja3MiLCJudW0iLCJldmVyeSIsImJsb2NrIiwicGxhY2VtZW50RGlzcGxheSIsInBsYXllclBsYWNlU2hpcHMiLCJnYW1lTG9vcCIsImNvbXBQbGF5ZXIiLCJodW1hbkdhbWVCb2FyZCIsImNvbXBHYW1lQm9hcmQiLCJnYW1lT3ZlckNoZWNrIiwiZ2FtZVR1cm4iLCJyZXNldFByb3BlcnRpZXMiLCJ0aGVuIiwicGxhY2VQaWNrZXIiLCJpdGVtIiwiaXRlbUFzU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRhaW5zIiwic29tZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNvbnRhaW5lclBhcmVudCIsImNvbnRhaW5lciIsInJvdGF0b3IiLCJob3Jpem9udGFsRWxlbWVudCIsInJvd051bSIsInNlbGVjdG9yIiwiaG92ZXJDZWxsIiwidmVydGljYWxFbGVtZW50Iiwic2hpcFRleHQiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3Zlckxpc3RlbmVyIiwiaG92ZXJPdXRMaXN0ZW5lciIsImxpc3RlbmVyIiwicG9wdXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2hhbmdlUm90YXRvciIsInJvdGF0b3JCdG4iXSwic291cmNlUm9vdCI6IiJ9