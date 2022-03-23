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
  var leftDiv = document.querySelector(".left");
  clearDisplay(leftDiv); // TODO: add support for when a shot is a hit or a miss

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
  var promise = new Promise(function (resolve) {
    compBoard.addEventListener("click", function (e) {
      if (e.target.parentElement !== compBoard) {
        var rowIndex = parseInt(e.target.parentElement.dataset.index, 10);
        var cellIndex = parseInt(e.target.dataset.index, 10);
        board.receiveAttack([rowIndex, cellIndex]);
        clearDisplay(compBoard);
        displayRightDiv(board);
        resolve();
      }
    });
  });
  return promise;
};



/***/ }),

/***/ "./src/appLogic/computerFactory.js":
/*!*****************************************!*\
  !*** ./src/appLogic/computerFactory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

  var gameOverCheck = function gameOverCheck() {
    if (humanGameBoard.allSunk()) {
      return true;
    }

    if (compGameBoard.allSunk()) {
      return true;
    }

    return false;
  };

  var gameOver = function gameOver() {};

  var gameTurn = function gameTurn() {
    (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.addEventListeners)(compGameBoard).then(function () {
      compPlayer.compTurn(humanGameBoard);
      (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayLeftDiv)(humanGameBoard);
      gameTurn();
    });
    gameOverCheck();
  };

  gameTurn();
  (0,_placementDisplay__WEBPACK_IMPORTED_MODULE_4__.placementDisplay)(humanGameBoard);
  _placementDisplay__WEBPACK_IMPORTED_MODULE_4__.playerPlaceShips.placePicker(humanGameBoard, humanGameBoard.getShips());
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayLeftDiv)(humanGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_3__.displayRightDiv)(compGameBoard); // add in computer ship placement
  // playerShipPlacement(humanGameBoard);
  // // FOR TESTING!!!
  // const smallShip = humanGameBoard.getShips()[4];
  // playerPlaceShips.placePicker(humanGameBoard, firstShip);
  // humanGameBoard.placeShip([3, 3], "horizontal", firstShip);
  // humanGameBoard.receiveAttack([3, 3]);
  // humanGameBoard.receiveAttack([3, 2]);
  // humanGameBoard.receiveAttack([2, 2]);
  // humanGameBoard.receiveAttack([1, 2]);
  // humanGameBoard.receiveAttack([3, 4]);
  // const compShip = compGameBoard.getShips()[0];
  // compGameBoard.placeShip([3, 3], "horizontal", compShip);
  // compGameBoard.receiveAttack([3, 3]);
  // compGameBoard.receiveAttack([3, 2]);
  // // FOR TESTING!!!
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);

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


var placementDisplay = function placementDisplay(board) {
  var container = document.querySelector(".placer");
  board.getBoard().forEach(function (row, i) {
    var rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach(function (cell, idx) {
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

var clearDisplay = function clearDisplay(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var playerPlaceShips = function () {
  var rotator = 1;
  var idx = 0;

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

  var placePicker = function placePicker(board, ships) {
    var ship = ships[idx];
    var shipText = document.querySelector(".shipText");
    shipText.textContent = ship.name;
    var cells = document.querySelectorAll(".placer .cell");

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
            (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_0__.displayLeftDiv)(board);
          }

          ship = ships[idx];
          clearDisplay(document.querySelector(".placer"));
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
    placePicker: placePicker
  };
}();



/***/ }),

/***/ "./src/appLogic/playerFactory.js":
/*!***************************************!*\
  !*** ./src/appLogic/playerFactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7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Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvRE9Nc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9jb21wdXRlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9nYW1lQm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9wbGFjZW1lbnREaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaXNBcnJheUluQXJyYXkgPSAoYXJyLCBpdGVtKSA9PiB7XG4gIGNvbnN0IGl0ZW1Bc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuXG4gIGNvbnN0IGNvbnRhaW5zID0gYXJyLnNvbWUoKGVsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZWxlKSA9PT0gaXRlbUFzU3RyaW5nKTtcbiAgcmV0dXJuIGNvbnRhaW5zO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGVsZW1lbnQpID0+IHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxufTtcblxuY29uc3QgZGlzcGxheUxlZnREaXYgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgbGVmdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdFwiKTtcbiAgY2xlYXJEaXNwbGF5KGxlZnREaXYpO1xuXG4gIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciB3aGVuIGEgc2hvdCBpcyBhIGhpdCBvciBhIG1pc3NcbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG5cbiAgICAgIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2VsbC5oaXQgPT09IHRydWUpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbkFycmF5KGJvYXJkLm1pc3NlZCwgW2ksIGlkeF0pKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIGxlZnREaXYuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheVJpZ2h0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcblxuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcbiAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcblxuICAgICAgaWYgKGNlbGwuaGl0KSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5SW5BcnJheShib2FyZC5taXNzZWQsIFtpLCBpZHhdKSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICByaWdodERpdi5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRFdmVudExpc3RlbmVycyA9IChib2FyZCkgPT4ge1xuICBjb25zdCBjb21wQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0XCIpO1xuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb21wQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudCAhPT0gY29tcEJvYXJkKSB7XG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGNvbnN0IGNlbGxJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgsIDEwKTtcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93SW5kZXgsIGNlbGxJbmRleF0pO1xuICAgICAgICBjbGVhckRpc3BsYXkoY29tcEJvYXJkKTtcbiAgICAgICAgZGlzcGxheVJpZ2h0RGl2KGJvYXJkKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYsIGFkZEV2ZW50TGlzdGVuZXJzIH07XG4iLCJjb25zdCBjb21wdXRlckZhY3RvcnkgPSAoKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzTW92ZXMgPSBbXTtcblxuICBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZU1vdmUoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICBjb25zdCB4ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcbiAgICBjb25zdCB5ID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcblxuICAgIHJlc3VsdC5wdXNoKHgpO1xuICAgIHJlc3VsdC5wdXNoKHkpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlUGxhY2VtZW50KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgY29uc3QgeCA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeiA9IHJhbmRvbUludGVnZXIoMSwgMik7XG5cbiAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgIHJlc3VsdC5wdXNoKHopO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBUdXJuKGVuZW15Qm9hcmQpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVNb3ZlKCk7XG5cbiAgICB3aGlsZSAocHJldmlvdXNNb3Zlcy5pbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBwcmV2aW91c01vdmVzLnB1c2goY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IHByZXZpb3VzTW92ZXMsIGdlbmVyYXRlTW92ZSwgZ2VuZXJhdGVQbGFjZW1lbnQsIGNvbXBUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlckZhY3Rvcnk7XG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcblxuY29uc3QgZ2FtZUJvYXJkRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgXTtcblxuICBjb25zdCBtaXNzZWQgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeShcImNhcnJpZXJcIiwgNSk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShcImRlc3Ryb3llclwiLCAzKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShcInN1Ym1hcmluZVwiLCAzKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkoXCJwYXRyb2wgYm9hdFwiLCAyKTtcblxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXRdO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gIGZ1bmN0aW9uIGdldFNoaXBzKCkge1xuICAgIHJldHVybiBzaGlwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9jY3VwaWVkKCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gW107XG5cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgb2NjdXBpZWQucHVzaChbaSwgaWR4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VwaWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVVuYXZhaWxhYmxlKGFycikge1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlID0gW107XG4gICAgdW5hdmFpbGFibGUucHVzaChhcnIpO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSwgYXJyWzFdICsgMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSwgYXJyWzFdIC0gMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSArIDEsIGFyclsxXV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSArIDEsIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV0gLSAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdIC0gMSwgYXJyWzFdXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdIC0gMSwgYXJyWzFdICsgMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXSAtIDFdKTtcblxuICAgIHJldHVybiB1bmF2YWlsYWJsZTtcbiAgfVxuXG4gIGNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICAgIGNvbnN0IGl0ZW1Bc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuXG4gICAgY29uc3QgY29udGFpbnMgPSBhcnIuc29tZSgoZWxlKSA9PiBKU09OLnN0cmluZ2lmeShlbGUpID09PSBpdGVtQXNTdHJpbmcpO1xuICAgIHJldHVybiBjb250YWlucztcbiAgfTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZVBsYWNlbWVudChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgY29uc3Qgb2NjdXBpZWQgPSBnZXRPY2N1cGllZCgpO1xuICAgIGNvbnN0IHVuYXZhaWxhYmxlID0gW107XG4gICAgb2NjdXBpZWQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgICBnZW5lcmF0ZVVuYXZhaWxhYmxlKGFycikuZm9yRWFjaCgoZWxlKSA9PiB1bmF2YWlsYWJsZS5wdXNoKGVsZSkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHggPSBjb29yZHNbMF07XG4gICAgbGV0IHkgPSBjb29yZHNbMV07XG4gICAgaWYgKGlzQXJyYXlJbkFycmF5KHVuYXZhaWxhYmxlLCBbeCwgeV0pKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgY2hlY2tDb29yZHM7XG5cbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIHggKz0gMTtcbiAgICAgICAgaWYgKHggPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNoZWNrQ29vcmRzID0gW3gsIHldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSArPSAxO1xuICAgICAgICBpZiAoeSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY2hlY2tDb29yZHMgPSBbeCwgeV07XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgY2hlY2tDb29yZHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXSArIGldW2Nvb3Jkc1sxXV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV0gKyBpXSA9IHtcbiAgICAgICAgc2hpcCxcbiAgICAgICAgbmFtZTogc2hpcC5uYW1lLFxuICAgICAgICBsZW5ndGg6IHNoaXAubGVuZ3RoLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKGNvb3Jkcywgb3JpZW50YXRpb24sIHNoaXApIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgcGxhY2VWZXJ0aWNhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYWNlSG9yaXpvbnRhbGx5KGNvb3Jkcywgc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcbiAgICBpZiAoYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBmYWxzZSkge1xuICAgICAgbWlzc2VkLnB1c2goY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2JqID0gYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dO1xuICAgICAgb2JqLmhpdCA9IHRydWU7XG4gICAgICBvYmouc2hpcC5oaXQob2JqLmluZGV4KTtcbiAgICAgIGhpdHMucHVzaChjb29yZHMpO1xuXG4gICAgICBpZiAob2JqLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2lua1NoaXAob2JqLnNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgZ2V0U2hpcHMsXG4gICAgYWxsU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgbWlzc2VkLFxuICAgIGhpdHMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRPY2N1cGllZCxcbiAgICB2YWxpZGF0ZVBsYWNlbWVudCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgY29tcHV0ZXJGYWN0b3J5IGZyb20gXCIuL2NvbXB1dGVyRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllckZhY3RvcnkgZnJvbSBcIi4vcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IGdhbWVCb2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lcnMsIGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYgfSBmcm9tIFwiLi9ET01zdHVmZlwiO1xuaW1wb3J0IHsgcGxhY2VtZW50RGlzcGxheSwgcGxheWVyUGxhY2VTaGlwcyB9IGZyb20gXCIuL3BsYWNlbWVudERpc3BsYXlcIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyRmFjdG9yeShcImh1bWFuXCIpO1xuICBjb25zdCBjb21wUGxheWVyID0gY29tcHV0ZXJGYWN0b3J5KCk7XG5cbiAgY29uc3QgaHVtYW5HYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGNvbXBHYW1lQm9hcmQgPSBnYW1lQm9hcmRGYWN0b3J5KCk7XG5cbiAgY29uc3QgZ2FtZU92ZXJDaGVjayA9ICgpID0+IHtcbiAgICBpZiAoaHVtYW5HYW1lQm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbXBHYW1lQm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7fTtcblxuICBjb25zdCBnYW1lVHVybiA9ICgpID0+IHtcbiAgICBhZGRFdmVudExpc3RlbmVycyhjb21wR2FtZUJvYXJkKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbXBQbGF5ZXIuY29tcFR1cm4oaHVtYW5HYW1lQm9hcmQpO1xuICAgICAgZGlzcGxheUxlZnREaXYoaHVtYW5HYW1lQm9hcmQpO1xuICAgICAgZ2FtZVR1cm4oKTtcbiAgICB9KTtcblxuICAgIGdhbWVPdmVyQ2hlY2soKTtcbiAgfTtcblxuICBnYW1lVHVybigpO1xuXG4gIHBsYWNlbWVudERpc3BsYXkoaHVtYW5HYW1lQm9hcmQpO1xuICBwbGF5ZXJQbGFjZVNoaXBzLnBsYWNlUGlja2VyKGh1bWFuR2FtZUJvYXJkLCBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpKTtcblxuICBkaXNwbGF5TGVmdERpdihodW1hbkdhbWVCb2FyZCk7XG4gIGRpc3BsYXlSaWdodERpdihjb21wR2FtZUJvYXJkKTtcblxuICAvLyBhZGQgaW4gY29tcHV0ZXIgc2hpcCBwbGFjZW1lbnRcblxuICAvLyBwbGF5ZXJTaGlwUGxhY2VtZW50KGh1bWFuR2FtZUJvYXJkKTtcbiAgLy8gLy8gRk9SIFRFU1RJTkchISFcbiAgLy8gY29uc3Qgc21hbGxTaGlwID0gaHVtYW5HYW1lQm9hcmQuZ2V0U2hpcHMoKVs0XTtcbiAgLy8gcGxheWVyUGxhY2VTaGlwcy5wbGFjZVBpY2tlcihodW1hbkdhbWVCb2FyZCwgZmlyc3RTaGlwKTtcblxuICAvLyBodW1hbkdhbWVCb2FyZC5wbGFjZVNoaXAoWzMsIDNdLCBcImhvcml6b250YWxcIiwgZmlyc3RTaGlwKTtcbiAgLy8gaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgM10pO1xuICAvLyBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCAyXSk7XG4gIC8vIGh1bWFuR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soWzIsIDJdKTtcbiAgLy8gaHVtYW5HYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMSwgMl0pO1xuICAvLyBodW1hbkdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCA0XSk7XG5cbiAgLy8gY29uc3QgY29tcFNoaXAgPSBjb21wR2FtZUJvYXJkLmdldFNoaXBzKClbMF07XG4gIC8vIGNvbXBHYW1lQm9hcmQucGxhY2VTaGlwKFszLCAzXSwgXCJob3Jpem9udGFsXCIsIGNvbXBTaGlwKTtcbiAgLy8gY29tcEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFszLCAzXSk7XG4gIC8vIGNvbXBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbMywgMl0pO1xuICAvLyAvLyBGT1IgVEVTVElORyEhIVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUxvb3A7XG4iLCJpbXBvcnQgeyBkaXNwbGF5TGVmdERpdiB9IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5cbmNvbnN0IHBsYWNlbWVudERpc3BsYXkgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZXJcIik7XG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5pbmRleCA9IGlkeDtcbiAgICAgIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgICAgfVxuICAgICAgcm93Q2VsbC5hcHBlbmRDaGlsZChib2FyZENlbGwpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dDZWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGVhckRpc3BsYXkgPSAoZWxlbWVudCkgPT4ge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG5jb25zdCBwbGF5ZXJQbGFjZVNoaXBzID0gKCgpID0+IHtcbiAgbGV0IHJvdGF0b3IgPSAxO1xuICBsZXQgaWR4ID0gMDtcblxuICBjb25zdCBob3Jpem9udGFsRWxlbWVudCA9IChyb3dJbmRleCwgY2VsbEluZGV4LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93TnVtID0gcGFyc2VJbnQocm93SW5kZXgsIDEwKTtcbiAgICBjb25zdCBudW0gPSBwYXJzZUludChjZWxsSW5kZXgsIDEwKSArIGk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGAuY2VsbFtkYXRhLXJvdz1cIiR7cm93TnVtfVwiXVtkYXRhLWluZGV4PVwiJHtudW19XCJdYDtcbiAgICBjb25zdCBob3ZlckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIHJldHVybiBob3ZlckNlbGw7XG4gIH07XG5cbiAgY29uc3QgdmVydGljYWxFbGVtZW50ID0gKHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpID0+IHtcbiAgICBjb25zdCByb3dOdW0gPSBwYXJzZUludChyb3dJbmRleCwgMTApICsgaTtcbiAgICBjb25zdCBudW0gPSBwYXJzZUludChjZWxsSW5kZXgsIDEwKTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gYC5jZWxsW2RhdGEtcm93PVwiJHtyb3dOdW19XCJdW2RhdGEtaW5kZXg9XCIke251bX1cIl1gO1xuICAgIGNvbnN0IGhvdmVyQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGhvdmVyQ2VsbDtcbiAgfTtcblxuICBjb25zdCBwbGFjZVBpY2tlciA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBsZXQgc2hpcCA9IHNoaXBzW2lkeF07XG5cbiAgICBjb25zdCBzaGlwVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcFRleHRcIik7XG4gICAgc2hpcFRleHQudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XG5cbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VyIC5jZWxsXCIpO1xuXG4gICAgY29uc3QgaG92ZXJMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICBjb25zdCByb3dJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleDtcbiAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICBpZiAocm90YXRvciA9PT0gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSBob3Jpem9udGFsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcInBsYWNlckNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocm90YXRvciA9PT0gMikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBob3ZlckNlbGwgPSB2ZXJ0aWNhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhvdmVyT3V0TGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gaG9yaXpvbnRhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJvdGF0b3IgPT09IDIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gdmVydGljYWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhvdmVyTGlzdGVuZXIpO1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBob3Zlck91dExpc3RlbmVyKTtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2FyZC52YWxpZGF0ZVBsYWNlbWVudChbeCwgeV0sIG9yaWVudGF0aW9uLCBzaGlwKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIG9yaWVudGF0aW9uLCBzaGlwKTtcbiAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICBpZiAoaWR4ID09PSBzaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI292ZXJsYXlcIik7XG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJvdmVybGF5XCIpO1xuICAgICAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlbWVudFwiKTtcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRpc3BsYXlMZWZ0RGl2KGJvYXJkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hpcCA9IHNoaXBzW2lkeF07XG4gICAgICAgICAgY2xlYXJEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2VyXCIpKTtcbiAgICAgICAgICBwbGFjZW1lbnREaXNwbGF5KGJvYXJkKTtcbiAgICAgICAgICBwbGFjZVBpY2tlcihib2FyZCwgc2hpcHMpO1xuICAgICAgICB9XG4gICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpc3RlbmVyKTtcbiAgICAgIH07XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlUm90YXRvciA9ICgpID0+IHtcbiAgICBpZiAocm90YXRvciA9PT0gMSkge1xuICAgICAgcm90YXRvciA9IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvdGF0b3IgPSAxO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByb3RhdG9yQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb3RhdGVcIik7XG4gIHJvdGF0b3JCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjaGFuZ2VSb3RhdG9yKCk7XG4gIH0pO1xuXG4gIHJldHVybiB7IHBsYWNlUGlja2VyIH07XG59KSgpO1xuXG5leHBvcnQgeyBwbGFjZW1lbnREaXNwbGF5LCBwbGF5ZXJQbGFjZVNoaXBzIH07XG4iLCJjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG5hbWUpID0+IHtcbiAgZnVuY3Rpb24gcGxheWVyVHVybihjb29yZHMsIGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIHBsYXllclR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllckZhY3Rvcnk7XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcEJsb2NrcyA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwodHJ1ZSk7XG5cbiAgY29uc3QgZ2V0U2hpcEJsb2NrcyA9ICgpID0+IHNoaXBCbG9ja3M7XG5cbiAgZnVuY3Rpb24gaGl0KG51bSkge1xuICAgIHNoaXBCbG9ja3NbbnVtXSA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc2hpcEJsb2Nrcy5ldmVyeSgoYmxvY2spID0+IGJsb2NrID09PSBudWxsKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4geyBuYW1lLCBsZW5ndGgsIGdldFNoaXBCbG9ja3MsIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwRmFjdG9yeTtcbiIsImltcG9ydCBcIi4vc3R5bGVzLmNzc1wiO1xuaW1wb3J0IGdhbWVMb29wIGZyb20gXCIuL2FwcExvZ2ljL2dhbWVMb29wXCI7XG5cbmdhbWVMb29wKCk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIGRlZmluZShHcCwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gIGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvbik7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJpc0FycmF5SW5BcnJheSIsImFyciIsIml0ZW0iLCJpdGVtQXNTdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGFpbnMiLCJzb21lIiwiZWxlIiwiY2xlYXJEaXNwbGF5IiwiZWxlbWVudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRpc3BsYXlMZWZ0RGl2IiwiYm9hcmQiLCJsZWZ0RGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Qm9hcmQiLCJmb3JFYWNoIiwicm93IiwiaSIsInJvd0NlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsImlkeCIsImJvYXJkQ2VsbCIsImhpdCIsIm1pc3NlZCIsImFwcGVuZENoaWxkIiwiZGlzcGxheVJpZ2h0RGl2IiwicmlnaHREaXYiLCJhZGRFdmVudExpc3RlbmVycyIsImNvbXBCb2FyZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsInJvd0luZGV4IiwicGFyc2VJbnQiLCJjZWxsSW5kZXgiLCJyZWNlaXZlQXR0YWNrIiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJnZW5lcmF0ZVBsYWNlbWVudCIsInoiLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInNoaXBGYWN0b3J5IiwiZ2FtZUJvYXJkRmFjdG9yeSIsImhpdHMiLCJjcmVhdGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsInNoaXBzIiwiZ2V0U2hpcHMiLCJnZXRPY2N1cGllZCIsIm9jY3VwaWVkIiwiYWxsU3VuayIsImdhbWVTaGlwcyIsImxlbmd0aCIsInNpbmtTaGlwIiwic3Vua1NoaXAiLCJmaW5kSW5kZXgiLCJzaGlwIiwibmFtZSIsInNwbGljZSIsImdlbmVyYXRlVW5hdmFpbGFibGUiLCJ1bmF2YWlsYWJsZSIsInZhbGlkYXRlUGxhY2VtZW50Iiwib3JpZW50YXRpb24iLCJjaGVja0Nvb3JkcyIsInBsYWNlVmVydGljYWxseSIsInBsYWNlSG9yaXpvbnRhbGx5IiwicGxhY2VTaGlwIiwib2JqIiwiaXNTdW5rIiwicGxheWVyRmFjdG9yeSIsInBsYWNlbWVudERpc3BsYXkiLCJwbGF5ZXJQbGFjZVNoaXBzIiwiZ2FtZUxvb3AiLCJodW1hblBsYXllciIsImNvbXBQbGF5ZXIiLCJodW1hbkdhbWVCb2FyZCIsImNvbXBHYW1lQm9hcmQiLCJnYW1lT3ZlckNoZWNrIiwiZ2FtZU92ZXIiLCJnYW1lVHVybiIsInRoZW4iLCJwbGFjZVBpY2tlciIsImNvbnRhaW5lciIsInJvdGF0b3IiLCJob3Jpem9udGFsRWxlbWVudCIsInJvd051bSIsIm51bSIsInNlbGVjdG9yIiwiaG92ZXJDZWxsIiwidmVydGljYWxFbGVtZW50Iiwic2hpcFRleHQiLCJ0ZXh0Q29udGVudCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImhvdmVyTGlzdGVuZXIiLCJob3Zlck91dExpc3RlbmVyIiwicmVtb3ZlIiwibGlzdGVuZXIiLCJvdmVybGF5IiwicG9wdXAiLCJzdHlsZSIsImRpc3BsYXkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2hhbmdlUm90YXRvciIsInJvdGF0b3JCdG4iLCJwbGF5ZXJUdXJuIiwic2hpcEJsb2NrcyIsIkFycmF5IiwiZmlsbCIsImdldFNoaXBCbG9ja3MiLCJldmVyeSIsImJsb2NrIl0sInNvdXJjZVJvb3QiOiIifQ==