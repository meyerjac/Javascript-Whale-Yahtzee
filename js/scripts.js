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

Player.prototype.largeStraight = function() {
  this.diceValues.sort();
  this.diceValues.toString();
  console.log(this.diceValues.toString());
  var largeStraightArr1 = [1, 2, 3, 4, 5];
  var largeStraightArr2 = [2, 3, 4, 5, 6];
if (this.diceValues.toString() === largeStraightArr1.toString()) {
  return true
}  if (this.diceValues.toString() === largeStraightArr2.toString()) {
  return true
} else {return (false)
}
}

Player.prototype.yahtzee = function() {
  if ((this.diceValues[0] === this.diceValues[1]) && (this.diceValues[2] === this.diceValues[3]) && (this.diceValues[3] === this.diceValues[4]) && (this.diceValues[1]=== this.diceValues[4])) {
    return true
  } else  {
    return false
  }
}

Player.prototype.fullHouse = function() {
  debugger;
  this.diceValues.sort();
  if ((this.diceValues[0] === this.diceValues[1]) && (this.diceValues[2] === this.diceValues[3]) && (this.diceValues[3] === this.diceValues[4])) {
    return true
  } if ((this.diceValues[0] === this.diceValues[1]) && (this.diceValues[1] === this.diceValues[2]) && (this.diceValues[3] === this.diceValues[4])) {
    return true
  } else {
    return false
  }
}

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
  $("#largeStraightButton").show();

  for (var i = 0; i < 6; i++) {
    if (this.players[this.turn].scores[i][1] === true) {
        $("#" + (i+1) + "sButton").hide();
    }
  }
}

Game.prototype.yahtzee =  function() {
  if (this.players[this.turn].diceValues[0] === this.players[this.turn].diceValues[1] && this.players[this.turn].diceValues[0] === this.players[this.turn].diceValues[2] && this.players[this.turn].diceValues[0] === this.players[this.turn].diceValues[3] && this.players[this.turn].diceValues[0] === this.players[this.turn].diceValues[4]) {
    this.players[this.turn].topTotal+= 50;
    alert("YAHTZEE!");
    this.switchTurn();
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
    oneClick = 0;
    twoClick = 0;
    threeClick = 0;
    fourClick = 0;
    fiveClick = 0;
    sixClick = 0;
    for (var i = 1; i < 6; i++) {
      $("#die" + i).removeClass("selected");
    }
    if (game.players[game.turn].round >= 3) {
      $("#rollButton").hide();
    }
    game.yahtzee();
  });

// Begin dice click functionality;
  var oneClick = 0;
  var twoClick = 0;
  var threeClick = 0;
  var fourClick = 0;
  var fiveClick = 0;
  var sixClick = 0;

  $("#die1").click(function(){
    $("#die1").toggleClass("selected");
    oneClick++;
    if ((oneClick % 2) === 0) {
      var index = game.players[game.turn].diceIndex.indexOf(0);
      game.players[game.turn].diceIndex.splice(index, 1);
    } else {
      game.players[game.turn].diceIndex.push(0);
    }
  });

  $("#die2").click(function(){
    $("#die2").toggleClass("selected");
    twoClick++;
    if ((twoClick % 2) === 0) {
      var index = game.players[game.turn].diceIndex.indexOf(1);
      game.players[game.turn].diceIndex.splice(index, 1);
    } else {
      game.players[game.turn].diceIndex.push(1);
    }
  });

  $("#die3").click(function(){
    $("#die3").toggleClass("selected");
    threeClick++;
    if ((threeClick % 2) === 0) {
      var index = game.players[game.turn].diceIndex.indexOf(2);
      game.players[game.turn].diceIndex.splice(index, 1);
    } else {
      game.players[game.turn].diceIndex.push(2);
    }
  });

  $("#die4").click(function(){
    $("#die4").toggleClass("selected");
    fourClick++;
    if ((fourClick % 2) === 0) {
      var index = game.players[game.turn].diceIndex.indexOf(3);
      game.players[game.turn].diceIndex.splice(index, 1);
    } else {
      game.players[game.turn].diceIndex.push(3);
    }
  });

  $("#die5").click(function(){
    $("#die5").toggleClass("selected");
    fiveClick++;
    if ((fiveClick % 2) === 0) {
      var index = game.players[game.turn].diceIndex.indexOf(4);
      game.players[game.turn].diceIndex.splice(index, 1);
    } else {
      game.players[game.turn].diceIndex.push(4);
    }
  });

//Begin scorecard selectors
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

  $("#largeStraightButton").click(function(){
    game.players[game.turn].largeStraight();
      if (game.players[game.turn].largeStraight() === true) {
        $("#player" + (game.turn+1) + "LargeStraight").append(40);
        game.switchTurn();
        displayDice();
    } if (game.players[game.turn].largeStraight() === false) {
        var largeStraightPrompt = prompt("you do not have a large straight, do you wish to continue and take a zero for this turn? (yes/no)")
        if (largeStraightPrompt.toLowerCase() === "yes") {
            alert("okay you fool")
            $("#player" + (game.turn+1) + "LargeStraight").append(0);
            game.switchTurn();
            displayDice();
      }
        if (largeStraightPrompt.toLowerCase() === "no") {
            alert ("good choice, select another category")
      }
    }
  });
  $("#yahtzeeButton").click(function(){
    if (game.players[game.turn].yahtzee() === true) {
      $("#player" + (game.turn+1) + "Yahtzee").append(50);
      game.switchTurn();
      displayDice();
  } if (game.players[game.turn].yahtzee() === false) {
      var yahtzeePrompt = prompt("you do not have a Yahtzee, an average player has about a 1:1200 chance of a yathzee on any given roll...you are no differnet. do you wish to take a zero for your yahtzee turn? (yes/no)")
      if (yahtzeePrompt.toLowerCase() === "yes") {
          alert("okay you fool")
          $("#player" + (game.turn+1) + "yahtzee").append(0);
          game.switchTurn();
          displayDice();
      }
      if (yahtzeePrompt.toLowerCase() === "no") {
          alert ("oooo, being risky eh?")
      }
    }
  });

  $("#fullHouseButton").click(function(){
    if (game.players[game.turn].fullHouse() === true) {
      $("#player" + (game.turn+1) + "FullHouse").append(25);
      game.switchTurn();
      displayDice();
  } if (game.players[game.turn].fullHouse() === false) {
      var fullHousePrompt = prompt("you do not have a FullHouse, have you ever played Yathzee? C'mon now. do you want to take a 0 on fullHouse? (yes/no)")
      if (fullHousePrompt.toLowerCase() === "yes") {
          alert("okay, your loss")
          $("#player" + (game.turn+1) + "FullHouse").append(0);
          game.switchTurn();
          displayDice();
    }
      if (fullHouseprompt.toLowerCase() === "no") {
          alert ("than pick another category")
        }
    });
  });

});
