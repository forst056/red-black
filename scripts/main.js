/* OBJECTS */

var deck = {
  cards: [],
  cardsUsed: [],
  cardColor: "",
  lastCardNum: 0,
  cardNum: 0,
  jokers: 0
}

var game = {
  choice: "",
  record: [],
  inputs: [["red","black"],["low", "high"]],
  mode: 0,
  winState: 0,
  responseCurrent: "",
  responseWin: ["Lucky guess..."],
  responseLoss: ["Fail whale."]
}

/* FUNCTIONS */

/* -------- Game logic functions -------- */

function runtime(id) {
  if (game.mode == 0) {
    redOrBlackRuntime(id);
  }
  else if(game.mode == 1) {
    highOrLowRuntime(id);
  }
}

function highOrLowRuntime(id) {
  game.makeChoice(id);
  deck.pickCard();
  deck.getCardInfo();
  deck.setCardArt();
  game.getHighLowWinLoss(deck);
  game.setResponse();
  game.printResponse();
}

function redOrBlackRuntime(id) {
  game.makeChoice(id);
  deck.pickCard();
  deck.getCardInfo();
  deck.setCardArt();
  game.getRedBlackWinLoss(deck);
  game.setResponse();
  game.printResponse();
}

// Gets user's guess
game.makeChoice = function (id) {
  this.choice = id;
}

// Picks the next card from the top of the deck
deck.pickCard = function() {
  if (this.cards.length > 0) {
    var card = this.cards.length - 1;
    this.lastCardNum = this.cardNum;
    this.currentCard = this.cards[card];
    this.cardsUsed.push(this.currentCard);
    this.cards.pop();
  }
  else {return false}
}

// Compares user choice of red/black with current card and records win/loss
game.getRedBlackWinLoss = function(o) {
  if (this.choice) {
    if (this.choice == o.cardColor) {
      this.winState = 1;
    }
    else {this.winState = 0;}
  }
}

// Compares user choice of high/low with current card and records win/loss
game.getHighLowWinLoss = function(o) {
  if (this.choice) {
    if (this.choice == "low") {
      if (deck.cardNum < deck.lastCardNum) {
        this.winState = 1;
      }
      else {this.winState = 0;}
    }
    else if (this.choice == "high") {
      if (deck.cardNum > deck.lastCardNum){
        this.winState = 1;
      }
      else {this.winState = 0;}
    }
  }
}

// Sets the win/loss response
game.setResponse = function() {
  if (this.winState == 1) {this.responseCurrent = this.responseWin[0];}
  else {this.responseCurrent = this.responseLoss[0];}
}

// Sets game mode to (0) Red vs. Black or (1) High vs. Low
game.setGameMode = function(n) {
  printInputDiv(n);
  game.mode = n;
}

// Sets the current card color
deck.getCardColor = function() {
  var c = this.currentCard.charAt(this.currentCard.length - 1);
  if ((c == "h") || (c == "d")) {
    this.cardColor = "red";
  }
  else if ((c == "s") || (c == "c")) {
    this.cardColor = "black";
  }
}

// Sets the current card number
deck.getCardNum = function () {
  this.cardNum = this.currentCard.slice(0, -1);
  this.cardNum = parseInt(this.cardNum);
}

// Sets both card number and card color
deck.getCardInfo = function() {
  this.getCardColor();
  this.getCardNum();
}

/* -------- Render functions -------- */

// Renders the card art
deck.setCardArt = function() {
  var card = document.getElementById("card-art");
  var src = "images/PNGs/" + this.currentCard + ".png";
  card.src = src;
}

// Prints win/loss response
game.printResponse = function() {
  var t = document.getElementById("card-text");
  t.innerHTML = this.responseCurrent;
}

// Sets the color of the card
function setCard(card, color) {
  var x = "card " + color;
  if (card) {
    card.className = x;
  }
}

// Replaces input <div> with game.inputs
function printInputDiv(mode) {
  var a = game.inputs[game.mode];
  var b = game.inputs[mode];
  for (var i = 0; i < a.length; i++) {
    var x = a[i];
    var y = b[i];
    var e = document.getElementById(x);
    e.id = y;
  }
}

/* -------- Reset functions -------- */

// Creates the deck
deck.build = function () {
  this.cards = [];
  for (var x = 1; x < 14; x++) {
    var suits = ["c","d","h","s"];
    var l = suits.length;
    for (var i=0; i<l; i++) {
      var s = suits[i];
      var num = x.toString();
      var card = num + s;
      this.cards.push(card);
    }
  }
}

// Shuffles deck
deck.shuffle = function () {
    var j, x, a;
    a = this.cards;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    this.cards = a;
}

/* -------- Debug functions -------- */

// Prints the current deck array to console
deck.print = function() {
  console.log(this.cards);
  console.log("Count: " + this.cards.length);
}

// Full debug for deck object
deck.debug = function () {
  this.getCardInfo();
  console.log("Top card: " + this.currentCard);
  console.log(this.currentCard + " is " + this.cardColor);
  console.log("Number is " + this.cardNum);
}

// Full debug for user
game.debug = function() {
  console.log(game);
}

// Debug everything
function debug() {
  console.log(deck);
  console.log(game);
}
