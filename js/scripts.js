// Business Logic
function Game(numberOfPlayers, players, turn, winner) {
  this.numberOfPlayers = 0;
  this.players = [];
  this.turn = 0;
  this.winner = "";
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

Game.prototype.topTotals= function () {
  var tempTotal = 0;
  for (var i = 0; i < 6; i++) {
    if (this.players[this.turn].scores[i][1] === true) {
      tempTotal += this.players[this.turn].scores[i][0];
      this.players[this.turn].topTotal = tempTotal;
    }
  };
};

Game.prototype.gameOver = function() {
  var scoreCounter = 0;
  for (var j = 0; j < 2; j++) {
    for (var i = 0; i < 6; i++) {
      if (this.players[j].scores[i][1] === true) {
        scoreCounter++;
      }
    }
  }
  if (scoreCounter === 12) {
    this.findWinner();
  } else {
    console.log(scoreCounter);
  }
}


function Player(playerName, round, diceValues, diceIndex, countNumber, countMultiple, score) {
  this.playerName = playerName;
  this.round = 0;
  this.diceValues = [];
  this.diceIndex = [0,1,2,3,4];
  this.countNumber = 0;
  this.countMultiple = 0;
  this.scores = [[0, false], [0, false], [0, false], [0, false], [0, false], [0, false]];
  this.topTotal = 0;
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

Game.prototype.findWinner = function() {
  if (this.players[0].topTotal > this.players[1].topTotal) {
    this.winner = this.players[0].playerName;
  } else if (this.players[0].topTotal === this.players[1].topTotal) {
    this.winner = "Tie game!"
  } else {
    this.winner = this.players[1].playerName;
  }
  $("#victoryWhaleImg").show();
  $("#victoryMessage").show();
  $("#gameWinner").text(this.winner);
  $("#resetBtn").show();
}




$(document).ready(function() {
  var game = new Game();
  for (var i = 0; i < 2; i++) {
      game.createPlayers();
    }
    // var highlightCurrentPlayer = function(game) {
    //   game.players[this.turn].css("color", "red");
    //
    // }
  setTimeout(function(){$('h1').show();
    $('h1').addClass('animated pulse');}, 850);
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

    setTimeout(function(){$("#gameDisplay").fadeIn();}, 450);
    game.players[0].playerName = $("#player1Name").val();
    game.players[1].playerName = $("#player2Name").val();

    $("#player1Display").text(game.players[0].playerName);
    $("#player2Display").text(game.players[1].playerName);

  });

  $("#rollButton").click(function(){
    $(".dice-boxes").show();
    game.players[game.turn].roll();
    displayDice();
    game.players[game.turn].diceIndex = [];
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
    game.players[game.turn].scores[0][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Aces").append(game.players[game.turn].scores[0][0]);
    game.players[game.turn].scores[0][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });
  $("#2sButton").click(function(){
    game.players[game.turn].countNumber = 2;
    game.players[game.turn].findValues();
    game.players[game.turn].scores[1][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Twos").append(game.players[game.turn].scores[1][0]);
    game.players[game.turn].scores[1][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });
  $("#3sButton").click(function(){
    game.players[game.turn].countNumber = 3;
    game.players[game.turn].findValues();
    game.players[game.turn].scores[2][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Threes").append(game.players[game.turn].scores[2][0]);
    game.players[game.turn].scores[2][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });
  $("#4sButton").click(function(){
    game.players[game.turn].countNumber = 4;
    game.players[game.turn].findValues();
    game.players[game.turn].scores[3][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Fours").append(game.players[game.turn].scores[3][0]);
    game.players[game.turn].scores[3][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });
  $("#5sButton").click(function(){
    game.players[game.turn].countNumber = 5;
    game.players[game.turn].findValues();
    game.players[game.turn].scores[4][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Fives").append(game.players[game.turn].scores[4][0]);
    game.players[game.turn].scores[4][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });
  $("#6sButton").click(function(){
    game.players[game.turn].countNumber = 6;
    game.players[game.turn].findValues();
    game.players[game.turn].scores[5][0] = game.players[game.turn].turnScore()
    $("#player" + (game.turn+1) + "Sixes").append(game.players[game.turn].scores[5][0]);
    game.players[game.turn].scores[5][1] =  true;
    game.topTotals();
    $(".topTotal" + (game.turn+1)).text(game.players[game.turn].topTotal);
    game.gameOver();
    game.switchTurn();
    displayDice();
  });

});
