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
/* harmony export */   "displayRightDiv": () => (/* binding */ displayRightDiv),
/* harmony export */   "gameOverDisplay": () => (/* binding */ gameOverDisplay)
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

var gameOverDisplay = function gameOverDisplay(text) {
  var overlay = document.querySelector("#overlay");
  var gameOver = document.querySelector(".gameOver");
  var gameOverWinner = document.querySelector(".winner");
  overlay.classList.add("overlay");
  gameOver.style.display = "flex";
  gameOverWinner.textContent = text;
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
/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoardFactory */ "./src/appLogic/gameBoardFactory.js");
/* harmony import */ var _DOMstuff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMstuff */ "./src/appLogic/DOMstuff.js");
/* harmony import */ var _placementDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placementDisplay */ "./src/appLogic/placementDisplay.js");





var gameLoop = function gameLoop() {
  var compPlayer = (0,_computerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var humanGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var compGameBoard = (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();

  var gameOverCheck = function gameOverCheck() {
    if (humanGameBoard.allSunk()) {
      return true;
    }

    if (compGameBoard.allSunk()) {
      return true;
    }

    return false;
  };

  var gameTurn = function gameTurn() {
    (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.addEventListeners)(compGameBoard).then(function () {
      compPlayer.compTurn(humanGameBoard);
      (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayLeftDiv)(humanGameBoard);
      gameTurn();
    });

    if (gameOverCheck()) {
      if (humanGameBoard.allSunk()) {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Lost :(");
      } else {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Win!");
      }
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
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayLeftDiv)(humanGameBoard);
  (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayRightDiv)(compGameBoard);
  gameTurn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7O1VDanZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9ET01zdHVmZi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2NvbXB1dGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2dhbWVCb2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL3BsYWNlbWVudERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICBjb25zdCBjb250YWlucyA9IGFyci5zb21lKChlbGUpID0+IEpTT04uc3RyaW5naWZ5KGVsZSkgPT09IGl0ZW1Bc1N0cmluZyk7XG4gIHJldHVybiBjb250YWlucztcbn07XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlMZWZ0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnRcIik7XG4gIGNsZWFyRGlzcGxheShsZWZ0RGl2KTtcblxuICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3Igd2hlbiBhIHNob3QgaXMgYSBoaXQgb3IgYSBtaXNzXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuXG4gICAgICBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNlbGwuaGl0ID09PSB0cnVlKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5SW5BcnJheShib2FyZC5taXNzZWQsIFtpLCBpZHhdKSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBsZWZ0RGl2LmFwcGVuZENoaWxkKHJvd0NlbGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlSaWdodERpdiA9IChib2FyZCkgPT4ge1xuICBjb25zdCByaWdodERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmlnaHRcIik7XG5cbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG4gICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG5cbiAgICAgIGlmIChjZWxsLmhpdCkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheUluQXJyYXkoYm9hcmQubWlzc2VkLCBbaSwgaWR4XSkpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dDZWxsLmFwcGVuZENoaWxkKGJvYXJkQ2VsbCk7XG4gICAgfSk7XG4gICAgcmlnaHREaXYuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnMgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgY29tcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29tcEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IGNvbXBCb2FyZCkge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3Jvd0luZGV4LCBjZWxsSW5kZXhdKTtcbiAgICAgICAgY2xlYXJEaXNwbGF5KGNvbXBCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlSaWdodERpdihib2FyZCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5jb25zdCBnYW1lT3ZlckRpc3BsYXkgPSAodGV4dCkgPT4ge1xuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICBjb25zdCBnYW1lT3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZU92ZXJcIik7XG4gIGNvbnN0IGdhbWVPdmVyV2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG4gIGdhbWVPdmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgZ2FtZU92ZXJXaW5uZXIudGV4dENvbnRlbnQgPSB0ZXh0O1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUxlZnREaXYsIGRpc3BsYXlSaWdodERpdiwgYWRkRXZlbnRMaXN0ZW5lcnMsIGdhbWVPdmVyRGlzcGxheSB9O1xuIiwiY29uc3QgY29tcHV0ZXJGYWN0b3J5ID0gKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c01vdmVzID0gW107XG5cbiAgZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVNb3ZlKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgY29uc3QgeCA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG5cbiAgICByZXN1bHQucHVzaCh4KTtcbiAgICByZXN1bHQucHVzaCh5KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVBsYWNlbWVudCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGxldCBvcmllbnRhdGlvbiA9IHJhbmRvbUludGVnZXIoMSwgMik7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09IDIpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgcmVzdWx0LnB1c2gob3JpZW50YXRpb24pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBUdXJuKGVuZW15Qm9hcmQpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVNb3ZlKCk7XG5cbiAgICB3aGlsZSAocHJldmlvdXNNb3Zlcy5pbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBwcmV2aW91c01vdmVzLnB1c2goY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IHByZXZpb3VzTW92ZXMsIGdlbmVyYXRlTW92ZSwgZ2VuZXJhdGVQbGFjZW1lbnQsIGNvbXBUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlckZhY3Rvcnk7XG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcblxuY29uc3QgZ2FtZUJvYXJkRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgXTtcblxuICBjb25zdCBtaXNzZWQgPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoaXBzKCkge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeShcImNhcnJpZXJcIiwgNSk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShcImRlc3Ryb3llclwiLCAzKTtcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShcInN1Ym1hcmluZVwiLCAzKTtcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkoXCJwYXRyb2wgYm9hdFwiLCAyKTtcblxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXRdO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gIGZ1bmN0aW9uIGdldFNoaXBzKCkge1xuICAgIHJldHVybiBzaGlwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9jY3VwaWVkKCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gW107XG5cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgb2NjdXBpZWQucHVzaChbaSwgaWR4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VwaWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVVbmF2YWlsYWJsZShhcnIpIHtcbiAgICBjb25zdCB1bmF2YWlsYWJsZSA9IFtdO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goYXJyKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSAtIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV1dKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV0gKyAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdICsgMSwgYXJyWzFdIC0gMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gLSAxLCBhcnJbMV0gLSAxXSk7XG5cbiAgICByZXR1cm4gdW5hdmFpbGFibGU7XG4gIH1cblxuICBjb25zdCBpc0FycmF5SW5BcnJheSA9IChhcnIsIGl0ZW0pID0+IHtcbiAgICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICAgIGNvbnN0IGNvbnRhaW5zID0gYXJyLnNvbWUoKGVsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZWxlKSA9PT0gaXRlbUFzU3RyaW5nKTtcbiAgICByZXR1cm4gY29udGFpbnM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVQbGFjZW1lbnQoY29vcmRzLCBvcmllbnRhdGlvbiwgc2hpcCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gZ2V0T2NjdXBpZWQoKTtcbiAgICBjb25zdCB1bmF2YWlsYWJsZSA9IFtdO1xuICAgIG9jY3VwaWVkLmZvckVhY2goKGFycikgPT4ge1xuICAgICAgZ2VuZXJhdGVVbmF2YWlsYWJsZShhcnIpLmZvckVhY2goKGVsZSkgPT4gdW5hdmFpbGFibGUucHVzaChlbGUpKTtcbiAgICB9KTtcblxuICAgIGxldCB4ID0gY29vcmRzWzBdO1xuICAgIGxldCB5ID0gY29vcmRzWzFdO1xuICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgW3gsIHldKSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IGNoZWNrQ29vcmRzO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB4ICs9IDE7XG4gICAgICAgIGlmICh4ID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjaGVja0Nvb3JkcyA9IFt4LCB5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgKz0gMTtcbiAgICAgICAgaWYgKHkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNoZWNrQ29vcmRzID0gW3gsIHldO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBcnJheUluQXJyYXkodW5hdmFpbGFibGUsIGNoZWNrQ29vcmRzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsbHkoY29vcmRzLCBzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBib2FyZFtjb29yZHNbMF0gKyBpXVtjb29yZHNbMV1dID0ge1xuICAgICAgICBzaGlwLFxuICAgICAgICBuYW1lOiBzaGlwLm5hbWUsXG4gICAgICAgIGxlbmd0aDogc2hpcC5sZW5ndGgsXG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdICsgaV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG4gICAgaWYgKGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gZmFsc2UpIHtcbiAgICAgIG1pc3NlZC5wdXNoKGNvb3Jkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9iaiA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICAgIG9iai5oaXQgPSB0cnVlO1xuICAgICAgb2JqLnNoaXAuaGl0KG9iai5pbmRleCk7XG4gICAgICBoaXRzLnB1c2goY29vcmRzKTtcblxuICAgICAgaWYgKG9iai5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHNpbmtTaGlwKG9iai5zaGlwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIGdldFNoaXBzLFxuICAgIGFsbFN1bmssXG4gICAgcGxhY2VTaGlwLFxuICAgIG1pc3NlZCxcbiAgICBoaXRzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0T2NjdXBpZWQsXG4gICAgdmFsaWRhdGVQbGFjZW1lbnQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQm9hcmRGYWN0b3J5O1xuIiwiaW1wb3J0IGNvbXB1dGVyRmFjdG9yeSBmcm9tIFwiLi9jb21wdXRlckZhY3RvcnlcIjtcbmltcG9ydCBnYW1lQm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVCb2FyZEZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIGFkZEV2ZW50TGlzdGVuZXJzLFxuICBkaXNwbGF5TGVmdERpdixcbiAgZGlzcGxheVJpZ2h0RGl2LFxuICBnYW1lT3ZlckRpc3BsYXksXG59IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5pbXBvcnQgeyBwbGFjZW1lbnREaXNwbGF5LCBwbGF5ZXJQbGFjZVNoaXBzIH0gZnJvbSBcIi4vcGxhY2VtZW50RGlzcGxheVwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgY29tcFBsYXllciA9IGNvbXB1dGVyRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGh1bWFuR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBjb21wR2FtZUJvYXJkID0gZ2FtZUJvYXJkRmFjdG9yeSgpO1xuXG4gIGNvbnN0IGdhbWVPdmVyQ2hlY2sgPSAoKSA9PiB7XG4gICAgaWYgKGh1bWFuR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjb21wR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVUdXJuID0gKCkgPT4ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGNvbXBHYW1lQm9hcmQpLnRoZW4oKCkgPT4ge1xuICAgICAgY29tcFBsYXllci5jb21wVHVybihodW1hbkdhbWVCb2FyZCk7XG4gICAgICBkaXNwbGF5TGVmdERpdihodW1hbkdhbWVCb2FyZCk7XG4gICAgICBnYW1lVHVybigpO1xuICAgIH0pO1xuXG4gICAgaWYgKGdhbWVPdmVyQ2hlY2soKSkge1xuICAgICAgaWYgKGh1bWFuR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgICBnYW1lT3ZlckRpc3BsYXkoXCJZb3UgTG9zdCA6KFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdhbWVPdmVyRGlzcGxheShcIllvdSBXaW4hXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwbGFjZW1lbnREaXNwbGF5KGh1bWFuR2FtZUJvYXJkKTtcbiAgcGxheWVyUGxhY2VTaGlwcy5wbGFjZVBpY2tlcihodW1hbkdhbWVCb2FyZCwgaHVtYW5HYW1lQm9hcmQuZ2V0U2hpcHMoKSk7XG5cbiAgY29tcEdhbWVCb2FyZC5nZXRTaGlwcygpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gY29tcFBsYXllci5nZW5lcmF0ZVBsYWNlbWVudCgpO1xuXG4gICAgd2hpbGUgKCFjb21wR2FtZUJvYXJkLnZhbGlkYXRlUGxhY2VtZW50KHJlc3VsdFswXSwgcmVzdWx0WzFdLCBzaGlwKSkge1xuICAgICAgcmVzdWx0ID0gY29tcFBsYXllci5nZW5lcmF0ZVBsYWNlbWVudCgpO1xuICAgIH1cblxuICAgIGNvbXBHYW1lQm9hcmQucGxhY2VTaGlwKHJlc3VsdFswXSwgcmVzdWx0WzFdLCBzaGlwKTtcbiAgfSk7XG5cbiAgZGlzcGxheUxlZnREaXYoaHVtYW5HYW1lQm9hcmQpO1xuICBkaXNwbGF5UmlnaHREaXYoY29tcEdhbWVCb2FyZCk7XG5cbiAgZ2FtZVR1cm4oKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVMb29wO1xuIiwiaW1wb3J0IHsgZGlzcGxheUxlZnREaXYgfSBmcm9tIFwiLi9ET01zdHVmZlwiO1xuXG5jb25zdCBwbGFjZW1lbnREaXNwbGF5ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2VyXCIpO1xuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG4gICAgICBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH1cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGVsZW1lbnQpID0+IHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxufTtcblxuY29uc3QgcGxheWVyUGxhY2VTaGlwcyA9ICgoKSA9PiB7XG4gIGxldCByb3RhdG9yID0gMTtcbiAgbGV0IGlkeCA9IDA7XG5cbiAgY29uc3QgaG9yaXpvbnRhbEVsZW1lbnQgPSAocm93SW5kZXgsIGNlbGxJbmRleCwgaSkgPT4ge1xuICAgIGNvbnN0IHJvd051bSA9IHBhcnNlSW50KHJvd0luZGV4LCAxMCk7XG4gICAgY29uc3QgbnVtID0gcGFyc2VJbnQoY2VsbEluZGV4LCAxMCkgKyBpO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd051bX1cIl1bZGF0YS1pbmRleD1cIiR7bnVtfVwiXWA7XG4gICAgY29uc3QgaG92ZXJDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gaG92ZXJDZWxsO1xuICB9O1xuXG4gIGNvbnN0IHZlcnRpY2FsRWxlbWVudCA9IChyb3dJbmRleCwgY2VsbEluZGV4LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93TnVtID0gcGFyc2VJbnQocm93SW5kZXgsIDEwKSArIGk7XG4gICAgY29uc3QgbnVtID0gcGFyc2VJbnQoY2VsbEluZGV4LCAxMCk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGAuY2VsbFtkYXRhLXJvdz1cIiR7cm93TnVtfVwiXVtkYXRhLWluZGV4PVwiJHtudW19XCJdYDtcbiAgICBjb25zdCBob3ZlckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIHJldHVybiBob3ZlckNlbGw7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VQaWNrZXIgPSAoYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXAgPSBzaGlwc1tpZHhdO1xuXG4gICAgY29uc3Qgc2hpcFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBUZXh0XCIpO1xuICAgIHNoaXBUZXh0LnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xuXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlciAuY2VsbFwiKTtcblxuICAgIGNvbnN0IGhvdmVyTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gaG9yaXpvbnRhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJvdGF0b3IgPT09IDIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gdmVydGljYWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBob3Zlck91dExpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IHJvd0luZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGhvdmVyQ2VsbCA9IGhvcml6b250YWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyb3RhdG9yID09PSAyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGhvdmVyQ2VsbCA9IHZlcnRpY2FsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlckNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBob3Zlckxpc3RlbmVyKTtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaG92ZXJPdXRMaXN0ZW5lcik7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBsZXQgb3JpZW50YXRpb247XG4gICAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgICAgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9hcmQudmFsaWRhdGVQbGFjZW1lbnQoW3gsIHldLCBvcmllbnRhdGlvbiwgc2hpcCkgPT09IHRydWUpIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBvcmllbnRhdGlvbiwgc2hpcCk7XG4gICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgaWYgKGlkeCA9PT0gc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmxheVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRcIik7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkaXNwbGF5TGVmdERpdihib2FyZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNoaXAgPSBzaGlwc1tpZHhdO1xuICAgICAgICAgIGNsZWFyRGlzcGxheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlclwiKSk7XG4gICAgICAgICAgcGxhY2VtZW50RGlzcGxheShib2FyZCk7XG4gICAgICAgICAgcGxhY2VQaWNrZXIoYm9hcmQsIHNoaXBzKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaXN0ZW5lcik7XG4gICAgICB9O1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVJvdGF0b3IgPSAoKSA9PiB7XG4gICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgIHJvdGF0b3IgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3RhdG9yID0gMTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgcm90YXRvckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICByb3RhdG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hhbmdlUm90YXRvcigpO1xuICB9KTtcblxuICByZXR1cm4geyBwbGFjZVBpY2tlciB9O1xufSkoKTtcblxuZXhwb3J0IHsgcGxhY2VtZW50RGlzcGxheSwgcGxheWVyUGxhY2VTaGlwcyB9O1xuIiwiY29uc3Qgc2hpcEZhY3RvcnkgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBCbG9ja3MgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKHRydWUpO1xuXG4gIGNvbnN0IGdldFNoaXBCbG9ja3MgPSAoKSA9PiBzaGlwQmxvY2tzO1xuXG4gIGZ1bmN0aW9uIGhpdChudW0pIHtcbiAgICBzaGlwQmxvY2tzW251bV0gPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNoaXBCbG9ja3MuZXZlcnkoKGJsb2NrKSA9PiBibG9jayA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbmFtZSwgbGVuZ3RoLCBnZXRTaGlwQmxvY2tzLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiaXNBcnJheUluQXJyYXkiLCJhcnIiLCJpdGVtIiwiaXRlbUFzU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRhaW5zIiwic29tZSIsImVsZSIsImNsZWFyRGlzcGxheSIsImVsZW1lbnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJkaXNwbGF5TGVmdERpdiIsImJvYXJkIiwibGVmdERpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdldEJvYXJkIiwiZm9yRWFjaCIsInJvdyIsImkiLCJyb3dDZWxsIiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsImNlbGwiLCJpZHgiLCJib2FyZENlbGwiLCJoaXQiLCJtaXNzZWQiLCJhcHBlbmRDaGlsZCIsImRpc3BsYXlSaWdodERpdiIsInJpZ2h0RGl2IiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJjb21wQm9hcmQiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJyb3dJbmRleCIsInBhcnNlSW50IiwiY2VsbEluZGV4IiwicmVjZWl2ZUF0dGFjayIsImdhbWVPdmVyRGlzcGxheSIsInRleHQiLCJvdmVybGF5IiwiZ2FtZU92ZXIiLCJnYW1lT3Zlcldpbm5lciIsInN0eWxlIiwiZGlzcGxheSIsInRleHRDb250ZW50IiwiY29tcHV0ZXJGYWN0b3J5IiwicHJldmlvdXNNb3ZlcyIsInJhbmRvbUludGVnZXIiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU1vdmUiLCJyZXN1bHQiLCJ4IiwieSIsInB1c2giLCJnZW5lcmF0ZVBsYWNlbWVudCIsIm9yaWVudGF0aW9uIiwiY29tcFR1cm4iLCJlbmVteUJvYXJkIiwiY29vcmRzIiwiaW5jbHVkZXMiLCJzaGlwRmFjdG9yeSIsImdhbWVCb2FyZEZhY3RvcnkiLCJoaXRzIiwiY3JlYXRlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJzaGlwcyIsImdldFNoaXBzIiwiZ2V0T2NjdXBpZWQiLCJvY2N1cGllZCIsImFsbFN1bmsiLCJnYW1lU2hpcHMiLCJsZW5ndGgiLCJzaW5rU2hpcCIsInN1bmtTaGlwIiwiZmluZEluZGV4Iiwic2hpcCIsIm5hbWUiLCJzcGxpY2UiLCJnZW5lcmF0ZVVuYXZhaWxhYmxlIiwidW5hdmFpbGFibGUiLCJ2YWxpZGF0ZVBsYWNlbWVudCIsImNoZWNrQ29vcmRzIiwicGxhY2VWZXJ0aWNhbGx5IiwicGxhY2VIb3Jpem9udGFsbHkiLCJwbGFjZVNoaXAiLCJvYmoiLCJpc1N1bmsiLCJwbGFjZW1lbnREaXNwbGF5IiwicGxheWVyUGxhY2VTaGlwcyIsImdhbWVMb29wIiwiY29tcFBsYXllciIsImh1bWFuR2FtZUJvYXJkIiwiY29tcEdhbWVCb2FyZCIsImdhbWVPdmVyQ2hlY2siLCJnYW1lVHVybiIsInRoZW4iLCJwbGFjZVBpY2tlciIsImNvbnRhaW5lciIsInJvdGF0b3IiLCJob3Jpem9udGFsRWxlbWVudCIsInJvd051bSIsIm51bSIsInNlbGVjdG9yIiwiaG92ZXJDZWxsIiwidmVydGljYWxFbGVtZW50Iiwic2hpcFRleHQiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3Zlckxpc3RlbmVyIiwiaG92ZXJPdXRMaXN0ZW5lciIsInJlbW92ZSIsImxpc3RlbmVyIiwicG9wdXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2hhbmdlUm90YXRvciIsInJvdGF0b3JCdG4iLCJzaGlwQmxvY2tzIiwiQXJyYXkiLCJmaWxsIiwiZ2V0U2hpcEJsb2NrcyIsImV2ZXJ5IiwiYmxvY2siXSwic291cmNlUm9vdCI6IiJ9