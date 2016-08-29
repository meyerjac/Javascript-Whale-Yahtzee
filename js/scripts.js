// Business Logic
function Game(numberOfPlayers, players, turn) {
  this.numberOfPlayers = 0;
  this.players = [];
  this.turn = 0;
};

function Player(round, diceValues, diceIndex, countNumber, countMultiple, aces, twos, threes, fours, fives, sixes, score) {
  this.round = round;
  this.diceValues = [];
  this.diceIndex = [0,1,2,3,4];
  this.countNumber = countNumber;
  this.countMultiple = 0;
  this.aces = aces;
  this.twos = twos;
  this.threes = threes;
  this.fours = fours;
  this.fives = fives;
  this.sixes = sixes;
  this.score = score;
};

var rollArray = [];

Player.prototype.roll = function() {
  for (var i = 0; i < this.diceIndex.length; i++) {
    this.diceValues[this.diceIndex[i]] = Math.floor((Math.random() * 6) + 1);
  };
};

Player.prototype.findValues = function() {
  for (var i = 0; i < this.diceIndex.length; i++) {
    if (this.diceValues[this.diceIndex[i]] === this.countNumber) {
      this.countMultiple++;
    }
  };
};

Player.prototype.turnScore = function() {
  return this.countNumber * this.countMultiple;
  this.countNumber = 0;
}

Game.prototype.createPlayers = function(){
    var myPlayer = new Player();
    this.players[this.numberOfPlayers] = myPlayer;
    this.numberOfPlayers++;
};

Game.prototype.switchTurn = function() {
  if ((this.turn+1) < this.players.length) {
    this.turn++;
  } else{
    this.turn = 0;
  };
};

// UI logic
$(document).ready(function() {
  var game = new Game(2);
  game.createPlayers();
  $("#rollButton").click(function(){
    game.players[game.turn].roll();
    $("#die1").text(game.players[game.turn].diceValues[0]);
    $("#die2").text(game.players[game.turn].diceValues[1]);
    $("#die3").text(game.players[game.turn].diceValues[2]);
    $("#die4").text(game.players[game.turn].diceValues[3]);
    $("#die5").text(game.players[game.turn].diceValues[4]);
    game.players[game.turn].diceIndex = [];
      });

    $("#die1").click(function(){
      game.players[game.turn].diceIndex.push(0);
    });
    $("#die2").click(function(){
      game.players[game.turn].diceIndex.push(1);
    });
    $("#die3").click(function(){
      game.players[game.turn].diceIndex.push(2);
    });
    $("#die4").click(function(){
      game.players[game.turn].diceIndex.push(3);
    });
    $("#die5").click(function(){
      game.players[game.turn].diceIndex.push(4);
    });
});
