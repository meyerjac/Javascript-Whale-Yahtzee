// Business Logic
function Game(numberOfPlayers, players, turn) {
  this.numberOfPlayers = 0;
  this.players = [];
  this.turn = 0;
}

function Player(round, diceValues, aces, twos, threes, fours, fives, sixes, score) {
  this.round = round;
  this.diceValues = [];
  this.diceIndex = [];
  this.aces = aces;
  this.twos = twos;
  this.threes = threes;
  this.fours = fours;
  this.fives = fives;
  this.sixes = sixes;
  this.score = score;
}

Player.prototype.roll = function() {
  for (var i = 0; i < this.diceIndex.length; i++) {
    this.diceValues[this.diceIndex[i]] = Math.floor((Math.random() * 6) + 1);
  }
}

// UI logic
$(document).ready(function() {

});
