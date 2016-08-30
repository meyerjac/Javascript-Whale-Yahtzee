// Business Logic
function Game(numberOfPlayers, players, turn) {
  this.numberOfPlayers = 0;
  this.players = [];
  this.turn = 0;
};

Game.prototype.createPlayers = function(){
  var myPlayer = new Player("Player " + (this.numberOfPlayers+1));
  this.players[this.numberOfPlayers] = myPlayer;
  this.numberOfPlayers++;
};

Game.prototype.switchTurn = function() {
  this.players[this.turn].diceIndex = [0,1,2,3,4];
  this.players[this.turn].countMultiple = 0;
  this.players[this.turn].round = 0;
  if ((this.turn) < this.players.length-1) {
    this.turn++;
  } else{
    this.turn = 0;
  };
  this.hideButtons();
  this.players[this.turn].diceValues = [0,0,0,0,0]
};

function Player(playerName, round, diceValues, diceIndex, countNumber, countMultiple, aces, twos, threes, fours, fives, sixes, score) {
  this.playerName = playerName;
  this.round = 0;
  this.diceValues = [];
  this.diceIndex = [0,1,2,3,4];
  this.countNumber = 0;
  this.countMultiple = 0;
  this.scores = [[this.aces, false], [this.twos, false], [this.threes, false], [this.fours, false], [this.fives, false], [this.sixes, false]];
};

Player.prototype.roll = function() {
  for (var i = 0; i < this.diceIndex.length; i++) {
    this.diceValues[this.diceIndex[i]] = Math.floor((Math.random() * 6) + 1);
  };
  this.round++;
};

Player.prototype.findValues = function() {
  for (var i = 0; i < 5; i++) {
    if (this.diceValues[i] === this.countNumber) {
      this.countMultiple++;
    }
  };
};

Player.prototype.turnScore = function() {
  return this.countNumber * this.countMultiple;
  this.countNumber = 0;
}

// UI logic
Game.prototype.hideButtons = function() {
  $("#1sButton").show();
  $("#2sButton").show();
  $("#3sButton").show();
  $("#4sButton").show();
  $("#5sButton").show();
  $("#6sButton").show();

for (var i = 0; i < 6; i++) {
  if (this.players[this.turn].scores[i][1] === true) {
      $("#" + (i+1) + "sButton").hide();
    }
  }
}

$(document).ready(function() {
  var game = new Game();
  for (var i = 0; i < 2; i++) {
      game.createPlayers();
    }

  setTimeout(function(){$('h1').show();
    $('h1').addClass('animated bounceIn');}, 600);
  var displayDice = function() {
    $("#die1").text(game.players[game.turn].diceValues[0]);
    $("#die2").text(game.players[game.turn].diceValues[1]);
    $("#die3").text(game.players[game.turn].diceValues[2]);
    $("#die4").text(game.players[game.turn].diceValues[3]);
    $("#die5").text(game.players[game.turn].diceValues[4]);
    $("#rollButton").show();
  }


  $("form").submit(function(event) {
    event.preventDefault();
    $("#playerNameInput").fadeOut();
    setTimeout(function(){$("#scoreCards").fadeIn();}, 450);
    var player1Input = $("#player1Name").val();
    var player2Input = $("#player2Name").val();
    $("#player1Display").text(player1Input);
    $("#player2Display").text(player2Input);
  });

  $("#rollButton").click(function(){
    $(".dice-boxes").show();
    game.players[game.turn].roll();
<<<<<<< HEAD
    $("#die1").text(game.players[game.turn].diceValues[0]);
    $("#die2").text(game.players[game.turn].diceValues[1]);
    $("#die3").text(game.players[game.turn].diceValues[2]);
    $("#die4").text(game.players[game.turn].diceValues[3]);
    $("#die5").text(game.players[game.turn].diceValues[4]);

=======
    displayDice();
    game.players[game.turn].diceIndex = [];
>>>>>>> master
    $("#die1").css("background-color", "inherit");
    $("#die2").css("background-color", "inherit");
    $("#die3").css("background-color", "inherit");
    $("#die4").css("background-color", "inherit");
    $("#die5").css("background-color", "inherit");
    if (game.players[game.turn].round >= 3) {
      $("#rollButton").hide();

    }
  });

  $("#die1").click(function(){
    $("#die1").css("background-color", "lightblue");
    game.players[game.turn].diceIndex.push(0);
  });
  $("#die2").click(function(){
    $("#die2").css("background-color", "lightblue");
    game.players[game.turn].diceIndex.push(1);
  });
  $("#die3").click(function(){
    $("#die3").css("background-color", "lightblue");
    game.players[game.turn].diceIndex.push(2);
  });
  $("#die4").click(function(){
    $("#die4").css("background-color", "lightblue");
    game.players[game.turn].diceIndex.push(3);
  });
  $("#die5").click(function(){
    $("#die5").css("background-color", "lightblue");
    game.players[game.turn].diceIndex.push(4);
  });

  $("#1sButton").click(function(){
    game.players[game.turn].countNumber = 1;
    game.players[game.turn].findValues();
    game.players[game.turn].aces = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Aces").append(game.players[game.turn].aces);
    game.players[game.turn].scores[0][1] =  true;
    game.switchTurn();
    displayDice();
  });
  $("#2sButton").click(function(){
    game.players[game.turn].countNumber = 2;
    game.players[game.turn].findValues();
    game.players[game.turn].twos = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Twos").append(game.players[game.turn].twos);
    game.players[game.turn].scores[1][1] =  true;
    game.switchTurn();
    displayDice();
  });
  $("#3sButton").click(function(){
    game.players[game.turn].countNumber = 3;
    game.players[game.turn].findValues();
    game.players[game.turn].threes = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Threes").append(game.players[game.turn].threes);
    game.players[game.turn].scores[2][1] =  true;
    game.switchTurn();
    displayDice();
  });
  $("#4sButton").click(function(){
    game.players[game.turn].countNumber = 4;
    game.players[game.turn].findValues();
    game.players[game.turn].fours = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Fours").append(game.players[game.turn].fours);
    game.players[game.turn].scores[3][1] =  true;
    game.switchTurn();
    displayDice();
  });
  $("#5sButton").click(function(){
    game.players[game.turn].countNumber = 5;
    game.players[game.turn].findValues();
    game.players[game.turn].fives = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Fives").append(game.players[game.turn].fives);
    game.players[game.turn].scores[4][1] =  true;
    game.switchTurn();
    displayDice();
  });
  $("#6sButton").click(function(){
    game.players[game.turn].countNumber = 6;
    game.players[game.turn].findValues();
    game.players[game.turn].sixes = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Sixes").append(game.players[game.turn].sixes);
    game.players[game.turn].scores[5][1] =  true;
    game.switchTurn();
    displayDice();
  });
});
