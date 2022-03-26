/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appLogic/Computer.js":
/*!**********************************!*\
  !*** ./src/appLogic/Computer.js ***!
  \**********************************/
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
  clearDisplay(rightDiv);
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

/***/ "./src/appLogic/Gameboard.js":
/*!***********************************!*\
  !*** ./src/appLogic/Gameboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/appLogic/Ship.js");


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
      if (!isArrayInArray(missed, coords)) {
        missed.push(coords);
      }
    } else {
      var obj = board[coords[0]][coords[1]];
      obj.hit = true;
      obj.ship.hit(obj.index);

      if (!isArrayInArray(hits, coords)) {
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

/***/ "./src/appLogic/Ship.js":
/*!******************************!*\
  !*** ./src/appLogic/Ship.js ***!
  \******************************/
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
/* harmony import */ var _Computer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Computer */ "./src/appLogic/Computer.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/appLogic/Gameboard.js");
/* harmony import */ var _DOMstuff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMstuff */ "./src/appLogic/DOMstuff.js");
/* harmony import */ var _placementDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placementDisplay */ "./src/appLogic/placementDisplay.js");





var gameLoop = function gameLoop() {
  var compPlayer = (0,_Computer__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var humanGameBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var compGameBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();

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
    if (gameOverCheck()) {
      _placementDisplay__WEBPACK_IMPORTED_MODULE_3__.playerPlaceShips.resetProperties();

      if (humanGameBoard.allSunk()) {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Lost :(", gameLoop);
      } else {
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.gameOverDisplay)("You Win!", gameLoop);
      }
    } else {
      (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.addEventListeners)(compGameBoard).then(function () {
        compPlayer.compTurn(humanGameBoard);
        (0,_DOMstuff__WEBPACK_IMPORTED_MODULE_2__.displayLeftDiv)(humanGameBoard);
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


var clearDisplay = function clearDisplay(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var placementDisplay = function placementDisplay(board) {
  var overlay = document.querySelector("#overlay");
  overlay.classList.add("overlay");
  var containerParent = document.querySelector(".placement");
  containerParent.style.display = "flex";
  var container = document.querySelector(".placer");
  clearDisplay(container);
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

var playerPlaceShips = function () {
  var rotator = 1;
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
            return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7O1VDanZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHBMb2dpYy9Db21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL0RPTXN0dWZmLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcExvZ2ljL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwTG9naWMvcGxhY2VtZW50RGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBwcmV2aW91c01vdmVzID0gW107XG5cbiAgZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVNb3ZlKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgY29uc3QgeCA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG4gICAgY29uc3QgeSA9IHJhbmRvbUludGVnZXIoMCwgOSk7XG5cbiAgICByZXN1bHQucHVzaCh4KTtcbiAgICByZXN1bHQucHVzaCh5KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVBsYWNlbWVudCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IHggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xuICAgIGxldCBvcmllbnRhdGlvbiA9IHJhbmRvbUludGVnZXIoMSwgMik7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09IDIpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgcmVzdWx0LnB1c2gob3JpZW50YXRpb24pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBUdXJuKGVuZW15Qm9hcmQpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVNb3ZlKCk7XG5cbiAgICB3aGlsZSAocHJldmlvdXNNb3Zlcy5pbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZU1vdmUoKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICBwcmV2aW91c01vdmVzLnB1c2goY29vcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7IHByZXZpb3VzTW92ZXMsIGdlbmVyYXRlTW92ZSwgZ2VuZXJhdGVQbGFjZW1lbnQsIGNvbXBUdXJuIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcjtcbiIsImNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKGFyciwgaXRlbSkgPT4ge1xuICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICBjb25zdCBjb250YWlucyA9IGFyci5zb21lKChlbGUpID0+IEpTT04uc3RyaW5naWZ5KGVsZSkgPT09IGl0ZW1Bc1N0cmluZyk7XG4gIHJldHVybiBjb250YWlucztcbn07XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlMZWZ0RGl2ID0gKGJvYXJkKSA9PiB7XG4gIGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnRcIik7XG4gIGNsZWFyRGlzcGxheShsZWZ0RGl2KTtcblxuICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3Igd2hlbiBhIHNob3QgaXMgYSBoaXQgb3IgYSBtaXNzXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93Q2VsbC5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICByb3dDZWxsLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJvYXJkQ2VsbC5kYXRhc2V0LmluZGV4ID0gaWR4O1xuXG4gICAgICBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNlbGwuaGl0ID09PSB0cnVlKSB7XG4gICAgICAgIGJvYXJkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5SW5BcnJheShib2FyZC5taXNzZWQsIFtpLCBpZHhdKSkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9XG5cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBsZWZ0RGl2LmFwcGVuZENoaWxkKHJvd0NlbGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlSaWdodERpdiA9IChib2FyZCkgPT4ge1xuICBjb25zdCByaWdodERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmlnaHRcIik7XG4gIGNsZWFyRGlzcGxheShyaWdodERpdik7XG5cbiAgYm9hcmQuZ2V0Qm9hcmQoKS5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICBjb25zdCByb3dDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3dDZWxsLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgIHJvd0NlbGwuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG4gICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG5cbiAgICAgIGlmIChjZWxsLmhpdCkge1xuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheUluQXJyYXkoYm9hcmQubWlzc2VkLCBbaSwgaWR4XSkpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfVxuXG4gICAgICByb3dDZWxsLmFwcGVuZENoaWxkKGJvYXJkQ2VsbCk7XG4gICAgfSk7XG4gICAgcmlnaHREaXYuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnMgPSAoYm9hcmQpID0+IHtcbiAgY29uc3QgY29tcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodFwiKTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29tcEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IGNvbXBCb2FyZCkge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBjb25zdCBjZWxsSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4LCAxMCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3Jvd0luZGV4LCBjZWxsSW5kZXhdKTtcbiAgICAgICAgY2xlYXJEaXNwbGF5KGNvbXBCb2FyZCk7XG4gICAgICAgIGRpc3BsYXlSaWdodERpdihib2FyZCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5jb25zdCBwbGF5QWdhaW5MaXN0ZW5lciA9IChuZXdHYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheUFnYWluXCIpO1xuICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcbiAgICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lT3ZlclwiKTtcbiAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcIm92ZXJsYXlcIik7XG4gICAgICBnYW1lT3Zlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBuZXdHYW1lKCk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcblxuY29uc3QgZ2FtZU92ZXJEaXNwbGF5ID0gKHRleHQsIG5ld0dhbWUpID0+IHtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcbiAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVPdmVyXCIpO1xuICBjb25zdCBnYW1lT3Zlcldpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyXCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xuICBnYW1lT3Zlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGdhbWVPdmVyV2lubmVyLnRleHRDb250ZW50ID0gdGV4dDtcblxuICBwbGF5QWdhaW5MaXN0ZW5lcihuZXdHYW1lKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlMZWZ0RGl2LCBkaXNwbGF5UmlnaHREaXYsIGFkZEV2ZW50TGlzdGVuZXJzLCBnYW1lT3ZlckRpc3BsYXkgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICBdO1xuXG4gIGNvbnN0IG1pc3NlZCA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hpcHMoKSB7XG4gICAgY29uc3QgY2FycmllciA9IFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDMpO1xuICAgIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IFNoaXAoXCJwYXRyb2wgYm9hdFwiLCAyKTtcblxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXRdO1xuICB9XG5cbiAgY29uc3Qgc2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gIGZ1bmN0aW9uIGdldFNoaXBzKCkge1xuICAgIHJldHVybiBzaGlwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9jY3VwaWVkKCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gW107XG5cbiAgICBib2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgb2NjdXBpZWQucHVzaChbaSwgaWR4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VwaWVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuayhnYW1lU2hpcHMgPSBzaGlwcykge1xuICAgIGlmIChnYW1lU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoc3Vua1NoaXApIHtcbiAgICBjb25zdCBpbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4gc3Vua1NoaXAubmFtZSA9PT0gc2hpcC5uYW1lKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVVbmF2YWlsYWJsZShhcnIpIHtcbiAgICBjb25zdCB1bmF2YWlsYWJsZSA9IFtdO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goYXJyKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0sIGFyclsxXSAtIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV1dKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gKyAxLCBhcnJbMV0gKyAxXSk7XG4gICAgdW5hdmFpbGFibGUucHVzaChbYXJyWzBdICsgMSwgYXJyWzFdIC0gMV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXV0pO1xuICAgIHVuYXZhaWxhYmxlLnB1c2goW2FyclswXSAtIDEsIGFyclsxXSArIDFdKTtcbiAgICB1bmF2YWlsYWJsZS5wdXNoKFthcnJbMF0gLSAxLCBhcnJbMV0gLSAxXSk7XG5cbiAgICByZXR1cm4gdW5hdmFpbGFibGU7XG4gIH1cblxuICBjb25zdCBpc0FycmF5SW5BcnJheSA9IChhcnIsIGl0ZW0pID0+IHtcbiAgICBjb25zdCBpdGVtQXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcblxuICAgIGNvbnN0IGNvbnRhaW5zID0gYXJyLnNvbWUoKGVsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZWxlKSA9PT0gaXRlbUFzU3RyaW5nKTtcbiAgICByZXR1cm4gY29udGFpbnM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVQbGFjZW1lbnQoY29vcmRzLCBvcmllbnRhdGlvbiwgc2hpcCkge1xuICAgIGNvbnN0IG9jY3VwaWVkID0gZ2V0T2NjdXBpZWQoKTtcbiAgICBjb25zdCB1bmF2YWlsYWJsZSA9IFtdO1xuICAgIG9jY3VwaWVkLmZvckVhY2goKGFycikgPT4ge1xuICAgICAgZ2VuZXJhdGVVbmF2YWlsYWJsZShhcnIpLmZvckVhY2goKGVsZSkgPT4gdW5hdmFpbGFibGUucHVzaChlbGUpKTtcbiAgICB9KTtcblxuICAgIGxldCB4ID0gY29vcmRzWzBdO1xuICAgIGxldCB5ID0gY29vcmRzWzFdO1xuICAgIGlmIChpc0FycmF5SW5BcnJheSh1bmF2YWlsYWJsZSwgW3gsIHldKSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IGNoZWNrQ29vcmRzO1xuXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB4ICs9IDE7XG4gICAgICAgIGlmICh4ID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjaGVja0Nvb3JkcyA9IFt4LCB5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkgKz0gMTtcbiAgICAgICAgaWYgKHkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNoZWNrQ29vcmRzID0gW3gsIHldO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBcnJheUluQXJyYXkodW5hdmFpbGFibGUsIGNoZWNrQ29vcmRzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVZlcnRpY2FsbHkoY29vcmRzLCBzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBib2FyZFtjb29yZHNbMF0gKyBpXVtjb29yZHNbMV1dID0ge1xuICAgICAgICBzaGlwLFxuICAgICAgICBuYW1lOiBzaGlwLm5hbWUsXG4gICAgICAgIGxlbmd0aDogc2hpcC5sZW5ndGgsXG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdICsgaV0gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIG5hbWU6IHNoaXAubmFtZSxcbiAgICAgICAgbGVuZ3RoOiBzaGlwLmxlbmd0aCxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChjb29yZHMsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHBsYWNlVmVydGljYWxseShjb29yZHMsIHNoaXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZUhvcml6b250YWxseShjb29yZHMsIHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG4gICAgaWYgKGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICghaXNBcnJheUluQXJyYXkobWlzc2VkLCBjb29yZHMpKSB7XG4gICAgICAgIG1pc3NlZC5wdXNoKGNvb3Jkcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9iaiA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICAgIG9iai5oaXQgPSB0cnVlO1xuICAgICAgb2JqLnNoaXAuaGl0KG9iai5pbmRleCk7XG5cbiAgICAgIGlmICghaXNBcnJheUluQXJyYXkoaGl0cywgY29vcmRzKSkge1xuICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHNpbmtTaGlwKG9iai5zaGlwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIGdldFNoaXBzLFxuICAgIGFsbFN1bmssXG4gICAgcGxhY2VTaGlwLFxuICAgIG1pc3NlZCxcbiAgICBoaXRzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0T2NjdXBpZWQsXG4gICAgdmFsaWRhdGVQbGFjZW1lbnQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQmxvY2tzID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCh0cnVlKTtcblxuICBjb25zdCBnZXRTaGlwQmxvY2tzID0gKCkgPT4gc2hpcEJsb2NrcztcblxuICBmdW5jdGlvbiBoaXQobnVtKSB7XG4gICAgc2hpcEJsb2Nrc1tudW1dID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzaGlwQmxvY2tzLmV2ZXJ5KChibG9jaykgPT4gYmxvY2sgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG5hbWUsIGxlbmd0aCwgZ2V0U2hpcEJsb2NrcywgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4vQ29tcHV0ZXJcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQge1xuICBhZGRFdmVudExpc3RlbmVycyxcbiAgZGlzcGxheUxlZnREaXYsXG4gIGRpc3BsYXlSaWdodERpdixcbiAgZ2FtZU92ZXJEaXNwbGF5LFxufSBmcm9tIFwiLi9ET01zdHVmZlwiO1xuaW1wb3J0IHsgcGxhY2VtZW50RGlzcGxheSwgcGxheWVyUGxhY2VTaGlwcyB9IGZyb20gXCIuL3BsYWNlbWVudERpc3BsYXlcIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbXBQbGF5ZXIgPSBDb21wdXRlcigpO1xuXG4gIGNvbnN0IGh1bWFuR2FtZUJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvbXBHYW1lQm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBnYW1lT3ZlckNoZWNrID0gKCkgPT4ge1xuICAgIGlmIChodW1hbkdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29tcEdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBnYW1lVHVybiA9ICgpID0+IHtcbiAgICBpZiAoZ2FtZU92ZXJDaGVjaygpKSB7XG4gICAgICBwbGF5ZXJQbGFjZVNoaXBzLnJlc2V0UHJvcGVydGllcygpO1xuICAgICAgaWYgKGh1bWFuR2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgICBnYW1lT3ZlckRpc3BsYXkoXCJZb3UgTG9zdCA6KFwiLCBnYW1lTG9vcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnYW1lT3ZlckRpc3BsYXkoXCJZb3UgV2luIVwiLCBnYW1lTG9vcCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKGNvbXBHYW1lQm9hcmQpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb21wUGxheWVyLmNvbXBUdXJuKGh1bWFuR2FtZUJvYXJkKTtcbiAgICAgICAgZGlzcGxheUxlZnREaXYoaHVtYW5HYW1lQm9hcmQpO1xuICAgICAgICBnYW1lVHVybigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHBsYWNlbWVudERpc3BsYXkoaHVtYW5HYW1lQm9hcmQpO1xuICBwbGF5ZXJQbGFjZVNoaXBzLnBsYWNlUGlja2VyKGh1bWFuR2FtZUJvYXJkLCBodW1hbkdhbWVCb2FyZC5nZXRTaGlwcygpKTtcblxuICBjb21wR2FtZUJvYXJkLmdldFNoaXBzKCkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBjb21wUGxheWVyLmdlbmVyYXRlUGxhY2VtZW50KCk7XG5cbiAgICB3aGlsZSAoIWNvbXBHYW1lQm9hcmQudmFsaWRhdGVQbGFjZW1lbnQocmVzdWx0WzBdLCByZXN1bHRbMV0sIHNoaXApKSB7XG4gICAgICByZXN1bHQgPSBjb21wUGxheWVyLmdlbmVyYXRlUGxhY2VtZW50KCk7XG4gICAgfVxuXG4gICAgY29tcEdhbWVCb2FyZC5wbGFjZVNoaXAocmVzdWx0WzBdLCByZXN1bHRbMV0sIHNoaXApO1xuICB9KTtcblxuICBkaXNwbGF5TGVmdERpdihodW1hbkdhbWVCb2FyZCk7XG4gIGRpc3BsYXlSaWdodERpdihjb21wR2FtZUJvYXJkKTtcblxuICBnYW1lVHVybigpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUxvb3A7XG4iLCJpbXBvcnQgeyBkaXNwbGF5TGVmdERpdiB9IGZyb20gXCIuL0RPTXN0dWZmXCI7XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IHBsYWNlbWVudERpc3BsYXkgPSAoYm9hcmQpID0+IHtcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcbiAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcbiAgY29uc3QgY29udGFpbmVyUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRcIik7XG4gIGNvbnRhaW5lclBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZXJcIik7XG4gIGNsZWFyRGlzcGxheShjb250YWluZXIpO1xuICBib2FyZC5nZXRCb2FyZCgpLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgIGNvbnN0IHJvd0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0NlbGwuZGF0YXNldC5pbmRleCA9IGk7XG4gICAgcm93Q2VsbC5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib2FyZENlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgYm9hcmRDZWxsLmRhdGFzZXQuaW5kZXggPSBpZHg7XG4gICAgICBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH1cbiAgICAgIHJvd0NlbGwuYXBwZW5kQ2hpbGQoYm9hcmRDZWxsKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93Q2VsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgcGxheWVyUGxhY2VTaGlwcyA9ICgoKSA9PiB7XG4gIGxldCByb3RhdG9yID0gMTtcbiAgbGV0IGlkeCA9IDA7XG5cbiAgY29uc3QgcmVzZXRQcm9wZXJ0aWVzID0gKCkgPT4ge1xuICAgIGlkeCA9IDA7XG4gICAgcm90YXRvciA9IDE7XG4gIH07XG5cbiAgY29uc3QgaG9yaXpvbnRhbEVsZW1lbnQgPSAocm93SW5kZXgsIGNlbGxJbmRleCwgaSkgPT4ge1xuICAgIGNvbnN0IHJvd051bSA9IHBhcnNlSW50KHJvd0luZGV4LCAxMCk7XG4gICAgY29uc3QgbnVtID0gcGFyc2VJbnQoY2VsbEluZGV4LCAxMCkgKyBpO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd051bX1cIl1bZGF0YS1pbmRleD1cIiR7bnVtfVwiXWA7XG4gICAgY29uc3QgaG92ZXJDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gaG92ZXJDZWxsO1xuICB9O1xuXG4gIGNvbnN0IHZlcnRpY2FsRWxlbWVudCA9IChyb3dJbmRleCwgY2VsbEluZGV4LCBpKSA9PiB7XG4gICAgY29uc3Qgcm93TnVtID0gcGFyc2VJbnQocm93SW5kZXgsIDEwKSArIGk7XG4gICAgY29uc3QgbnVtID0gcGFyc2VJbnQoY2VsbEluZGV4LCAxMCk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGAuY2VsbFtkYXRhLXJvdz1cIiR7cm93TnVtfVwiXVtkYXRhLWluZGV4PVwiJHtudW19XCJdYDtcbiAgICBjb25zdCBob3ZlckNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIHJldHVybiBob3ZlckNlbGw7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VQaWNrZXIgPSAoYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXAgPSBzaGlwc1tpZHhdO1xuXG4gICAgY29uc3Qgc2hpcFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBUZXh0XCIpO1xuICAgIHNoaXBUZXh0LnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xuXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlciAuY2VsbFwiKTtcblxuICAgIGNvbnN0IGhvdmVyTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gaG9yaXpvbnRhbEVsZW1lbnQocm93SW5kZXgsIGNlbGxJbmRleCwgaSk7XG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJwbGFjZXJDZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJvdGF0b3IgPT09IDIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaG92ZXJDZWxsID0gdmVydGljYWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBob3Zlck91dExpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IHJvd0luZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGhvdmVyQ2VsbCA9IGhvcml6b250YWxFbGVtZW50KHJvd0luZGV4LCBjZWxsSW5kZXgsIGkpO1xuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VyQ2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyb3RhdG9yID09PSAyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGhvdmVyQ2VsbCA9IHZlcnRpY2FsRWxlbWVudChyb3dJbmRleCwgY2VsbEluZGV4LCBpKTtcbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlckNlbGxcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBob3Zlckxpc3RlbmVyKTtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaG92ZXJPdXRMaXN0ZW5lcik7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgMTApO1xuICAgICAgICBsZXQgb3JpZW50YXRpb247XG4gICAgICAgIGlmIChyb3RhdG9yID09PSAxKSB7XG4gICAgICAgICAgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9hcmQudmFsaWRhdGVQbGFjZW1lbnQoW3gsIHldLCBvcmllbnRhdGlvbiwgc2hpcCkgPT09IHRydWUpIHtcbiAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBvcmllbnRhdGlvbiwgc2hpcCk7XG4gICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgaWYgKGlkeCA9PT0gc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdmVybGF5XCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmxheVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRcIik7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkaXNwbGF5TGVmdERpdihib2FyZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNoaXAgPSBzaGlwc1tpZHhdO1xuICAgICAgICAgIGNsZWFyRGlzcGxheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlclwiKSk7XG4gICAgICAgICAgcGxhY2VtZW50RGlzcGxheShib2FyZCk7XG4gICAgICAgICAgcGxhY2VQaWNrZXIoYm9hcmQsIHNoaXBzKTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaXN0ZW5lcik7XG4gICAgICB9O1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVJvdGF0b3IgPSAoKSA9PiB7XG4gICAgaWYgKHJvdGF0b3IgPT09IDEpIHtcbiAgICAgIHJvdGF0b3IgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3RhdG9yID0gMTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgcm90YXRvckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICByb3RhdG9yQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hhbmdlUm90YXRvcigpO1xuICB9KTtcblxuICByZXR1cm4geyBwbGFjZVBpY2tlciwgcmVzZXRQcm9wZXJ0aWVzIH07XG59KSgpO1xuXG5leHBvcnQgeyBwbGFjZW1lbnREaXNwbGF5LCBwbGF5ZXJQbGFjZVNoaXBzIH07XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBnYW1lTG9vcCBmcm9tIFwiLi9hcHBMb2dpYy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiQ29tcHV0ZXIiLCJwcmV2aW91c01vdmVzIiwicmFuZG9tSW50ZWdlciIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlTW92ZSIsInJlc3VsdCIsIngiLCJ5IiwicHVzaCIsImdlbmVyYXRlUGxhY2VtZW50Iiwib3JpZW50YXRpb24iLCJjb21wVHVybiIsImVuZW15Qm9hcmQiLCJjb29yZHMiLCJpbmNsdWRlcyIsInJlY2VpdmVBdHRhY2siLCJpc0FycmF5SW5BcnJheSIsImFyciIsIml0ZW0iLCJpdGVtQXNTdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGFpbnMiLCJzb21lIiwiZWxlIiwiY2xlYXJEaXNwbGF5IiwiZWxlbWVudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRpc3BsYXlMZWZ0RGl2IiwiYm9hcmQiLCJsZWZ0RGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0Qm9hcmQiLCJmb3JFYWNoIiwicm93IiwiaSIsInJvd0NlbGwiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbCIsImlkeCIsImJvYXJkQ2VsbCIsImhpdCIsIm1pc3NlZCIsImFwcGVuZENoaWxkIiwiZGlzcGxheVJpZ2h0RGl2IiwicmlnaHREaXYiLCJhZGRFdmVudExpc3RlbmVycyIsImNvbXBCb2FyZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsInJvd0luZGV4IiwicGFyc2VJbnQiLCJjZWxsSW5kZXgiLCJwbGF5QWdhaW5MaXN0ZW5lciIsIm5ld0dhbWUiLCJwbGF5QWdhaW5CdG4iLCJvdmVybGF5IiwiZ2FtZU92ZXIiLCJyZW1vdmUiLCJzdHlsZSIsImRpc3BsYXkiLCJvbmNlIiwiZ2FtZU92ZXJEaXNwbGF5IiwidGV4dCIsImdhbWVPdmVyV2lubmVyIiwidGV4dENvbnRlbnQiLCJTaGlwIiwiR2FtZWJvYXJkIiwiaGl0cyIsImNyZWF0ZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0Iiwic2hpcHMiLCJnZXRTaGlwcyIsImdldE9jY3VwaWVkIiwib2NjdXBpZWQiLCJhbGxTdW5rIiwiZ2FtZVNoaXBzIiwibGVuZ3RoIiwic2lua1NoaXAiLCJzdW5rU2hpcCIsImZpbmRJbmRleCIsInNoaXAiLCJuYW1lIiwic3BsaWNlIiwiZ2VuZXJhdGVVbmF2YWlsYWJsZSIsInVuYXZhaWxhYmxlIiwidmFsaWRhdGVQbGFjZW1lbnQiLCJjaGVja0Nvb3JkcyIsInBsYWNlVmVydGljYWxseSIsInBsYWNlSG9yaXpvbnRhbGx5IiwicGxhY2VTaGlwIiwib2JqIiwiaXNTdW5rIiwic2hpcEJsb2NrcyIsIkFycmF5IiwiZmlsbCIsImdldFNoaXBCbG9ja3MiLCJudW0iLCJldmVyeSIsImJsb2NrIiwicGxhY2VtZW50RGlzcGxheSIsInBsYXllclBsYWNlU2hpcHMiLCJnYW1lTG9vcCIsImNvbXBQbGF5ZXIiLCJodW1hbkdhbWVCb2FyZCIsImNvbXBHYW1lQm9hcmQiLCJnYW1lT3ZlckNoZWNrIiwiZ2FtZVR1cm4iLCJyZXNldFByb3BlcnRpZXMiLCJ0aGVuIiwicGxhY2VQaWNrZXIiLCJjb250YWluZXJQYXJlbnQiLCJjb250YWluZXIiLCJyb3RhdG9yIiwiaG9yaXpvbnRhbEVsZW1lbnQiLCJyb3dOdW0iLCJzZWxlY3RvciIsImhvdmVyQ2VsbCIsInZlcnRpY2FsRWxlbWVudCIsInNoaXBUZXh0IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaG92ZXJMaXN0ZW5lciIsImhvdmVyT3V0TGlzdGVuZXIiLCJsaXN0ZW5lciIsInBvcHVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNoYW5nZVJvdGF0b3IiLCJyb3RhdG9yQnRuIl0sInNvdXJjZVJvb3QiOiIifQ==