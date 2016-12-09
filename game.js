/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(237);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game(rootID, width, height) {
	        _classCallCheck(this, Game);

	        this.width = width || 30;
	        this.height = height || 30;
	        this.rootEl = document.getElementById(rootID);
	        this.bottomEdge = this.rootEl.clientHeight;
	        this.scoreCount = 0;
	        this.tap = 'touchend';

	        this.score = document.createElement('div');
	        this.timer = document.createElement('div');

	        this.score.className = 'game-score';
	        this.timer.className = 'game-timer';

	        this.rootEl.appendChild(this.score);
	        this.rootEl.appendChild(this.timer);
	    }

	    _createClass(Game, [{
	        key: 'onResize',
	        value: function onResize() {
	            console.log(32132);
	            this.bottomEdge = this.rootEl.clientHeight;
	        }
	    }, {
	        key: 'init',
	        value: function init(gameDuration) {
	            var _this = this;

	            var audio = document.querySelector('audio');

	            function audioPlay() {
	                audio.play();
	            }
	            audio.addEventListener('canplaythrough', audioPlay, false);

	            window.addEventListener('orientationchange', this.onResize.bind(this), false);

	            this.showMessage('Chatch them all! <br> (not pokemons^^)', true);

	            setTimeout(function () {
	                _this.start(gameDuration);
	            }, 3000);
	        }

	        // showMessage(text, needHide) {
	        //     var msg;
	        //     setTimeout(() => {
	        //         this.message.classList.add('showed');
	        //     }, 300);
	        //     if (needHide) {
	        //         msg = text;
	        //         setTimeout(() => {
	        //             this.message.classList.remove('showed');
	        //         }, 1300);
	        //     } else {
	        //         msg = text + '<a class="game-button" href="/platform">вернуться к торгам</a>'
	        //     }
	        //     this.message.innerHTML = msg;
	        //
	        //}

	    }, {
	        key: 'removeMessage',
	        value: function removeMessage() {
	            console.log(this);
	            this.rootEl.removeChild(this.message);
	        }
	    }, {
	        key: 'showMessage',
	        value: function showMessage(text, needHide) {
	            var _this2 = this;

	            this.message = document.createElement('div');
	            this.message.className = 'game-message';
	            this.rootEl.appendChild(this.message);
	            var msg, btn;

	            if (needHide) {
	                msg = text;
	                this.message.addEventListener('animationend', this.removeMessage.bind(this), false);
	                setTimeout(function () {
	                    _this2.message.classList.add('game-message--show-hide');
	                }, 300);
	            } else {
	                msg = text + '<a class="game-button">back to trading</a>';
	                setTimeout(function () {
	                    _this2.message.classList.add('game-message--show');
	                }, 300);
	                setTimeout(function () {
	                    btn = document.querySelector('.game-button');
	                    btn.setAttribute('href', '/platform');
	                }, 1000);
	            }
	            this.message.innerHTML = msg;
	        }
	    }, {
	        key: 'getRandomInt',
	        value: function getRandomInt(min, max) {

	            return Math.floor(Math.random() * (max - min + 1) + min);
	        }
	    }, {
	        key: 'createGift',
	        value: function createGift() {
	            var gift = document.createElement('div');
	            var wh = this.getRandomInt(40, 80);
	            var giftType = this.getRandomInt(1, 5);

	            gift.className = 'game-gift';
	            gift.style.width = wh + 'px';
	            gift.style.height = wh + 'px';
	            gift.classList.add('game-gift--type-' + giftType);
	            this.rootEl.appendChild(gift);
	            gift.addEventListener(this.tap, this.clickHandler.bind(this, gift), false);
	            return gift;
	        }
	    }, {
	        key: 'setStartGiftPosition',
	        value: function setStartGiftPosition(gift) {
	            var x = this.getRandomInt(10, this.rootEl.clientWidth - 20);
	            gift.style.webkitTransform = 'translateY(0px)';
	            gift.style.left = x + 'px';
	        }
	    }, {
	        key: 'draw',
	        value: function draw(timePassed, gift, speed) {
	            gift.style.transform = 'translateY(' + timePassed / speed + 'px) rotate(' + timePassed / speed + 'deg)';
	        }
	    }, {
	        key: 'animateGift',
	        value: function animateGift(draw, gift, speed) {
	            var start = performance.now();
	            requestAnimationFrame(function animate(time) {
	                var timePassed = time - start;
	                var pos = gift.getBoundingClientRect().top;

	                draw(timePassed, gift, speed);

	                if (pos < this.bottomEdge) {

	                    requestAnimationFrame(animate.bind(this));
	                } else {
	                    this.removeGift(gift);
	                }
	            }.bind(this));
	        }
	    }, {
	        key: 'removeGift',
	        value: function removeGift(gift) {
	            gift.removeEventListener(this.tap, this.clickHandler);
	            this.rootEl.removeChild(gift);
	        }
	    }, {
	        key: 'clickHandler',
	        value: function clickHandler(gift) {
	            this.scoreCount = this.scoreCount + 1;
	            this.score.innerHTML = 'score: ' + this.scoreCount;
	            gift.classList.add('game-gift--catched');
	        }
	    }, {
	        key: 'gameOver',
	        value: function gameOver() {
	            clearInterval(this.gameId);
	            this.rootEl.removeChild(this.score);
	            this.rootEl.removeChild(this.timer);
	            this.showMessage('Time is OVER<br/>' + 'Your score: ' + this.scoreCount, false);
	        }
	    }, {
	        key: 'startCounter',
	        value: function startCounter(sec) {
	            var id;
	            var self = this;

	            function update() {
	                if (sec <= 0) {
	                    clearInterval(id);
	                    self.gameOver();
	                }
	                sec = sec < 10 ? '0' + sec : sec;

	                self.timer.innerHTML = '00:' + sec;

	                sec = sec - 1;
	            }

	            id = setInterval(update, 1000);
	            update();
	        }
	    }, {
	        key: 'start',
	        value: function start(gameDuration) {
	            var _this3 = this;

	            this.score.innerHTML = 'score: 00';
	            this.startCounter(gameDuration);

	            this.gameId = setInterval(function () {
	                var gift = _this3.createGift();
	                var speed = _this3.getRandomInt(3, 6);
	                _this3.setStartGiftPosition(gift);
	                _this3.animateGift(_this3.draw, gift, speed);
	            }, 500);
	        }
	    }]);

	    return Game;
	}();

	var game = new Game('game-root');
	game.init(20);

/***/ },

/***/ 237:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });
