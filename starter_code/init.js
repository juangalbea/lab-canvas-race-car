var game = new Game ()
// var game2 = new Game2 ()

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  // document.getElementById("start-button2").onclick = function() {
  //   startGame2();
  // };



  startGame = ()=>{
    game.initGame("myCanvas");
  }
  // startGame = ()=>{
  //   game2.initGame("myCanvas");
  // }

}

