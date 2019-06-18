
/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

// var canvasDomEl = document.querySelector("#canvasGame");
// var ctx = canvasDomEl.getContext("2d")

class Game {
  constructor() {
    this.intervalId = "";
    this.fps = 60;
    this.counter=0;
    this.canvas = "";
    this.ctx ="";
    this.img = new Image();
    this.img.src = "images/car.png";
    this.xCar = 205;
    this.yCar = 430;
    this.key_right = 39;
    this.key_left = 37;
    this.key_up = 38;
    this.obstacles = [];
    this.stickSize = 0;
  }

  initGame= (id)=>{
    this.canvas=document.getElementById(id);
    this.ctx= this.canvas.getContext("2d");
    this.start();
  }

  start = () => {
    this.intervalId = setInterval(() => {
      this.counter++;
      this.clear();
      this.draw();
      this.listener();
      this.colisions();
      if (this.counter % 150 == 0) {
         this.generateObstacle();
      }
    },1000/this.fps)
  }

    clear= ()=>{
    this.ctx.clearRect(0, 0, 470, 550);
  }

  stop= ()=>{
    clearInterval(this.intervalId)
  }

  draw = () => {
    this.drawBackground();
    this.drawLine();
    this.drawObstacles()
    this.drawCar();
  }

  drawBackground = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, 470, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, 30, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(440, 0, 30, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(40, 0, 10, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(420, 0, 10, 550);
    this.ctx.closePath();
  }

    drawLine = ()=>{
    this.ctx.setLineDash([50, 50]);
    this.ctx.lineDashOffset = -2*this.counter;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(230, 0);
    this.ctx.lineWidth = 10;
    this.ctx.lineTo(230, 550);
    this.ctx.stroke();
    this.ctx.closePath();
  }

    drawCar = ()=>{
    this.ctx.drawImage(this.img, this.xCar, this.yCar, 50, 100);
    this.stick();
  }

    drawObstacles = ()=>{
    this.obstacles.forEach(element => {
        element.draw(this.ctx);
      });
  }

    generateObstacle = () => {
    this.obstacles.push(
      new Obstacle(
        Math.floor(Math.random() * 200 + 100),
        Math.floor(Math.random() * 100)
      )
    );
  }

 stick = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.xCar, 400, 10, this.stickSize);
    this.ctx.closePath();
  }

  listener = ()=>{
    document.onkeydown = (e) => {
      e.preventDefault();
      console.log(e.keyCode);
      switch (e.keyCode) {
        case this.key_left:
          if (this.xCar >= 30) {
            this.xCar -= 10;
          }
          break;
        case this.key_right:
          if (this.xCar <= 390) {
            this.xCar += 10;
          }
          break;
          case this.key_up:
            this.stickSize = this.counter;
          
          break;
      }
    }
  }

  colisions = () => {
        this.obstacles.forEach(element => {
            if (
              this.xCar + 40 >= element.x &&
              element.x + element.width >= this.xCar &&
              this.yCar + 100 >= element.y &&
              element.y + 30 >= this.yCar
            ) {
              clearInterval(this.intervalId);
              this.obstacles = [];
              this.offsetCounter = 0;
            }
          }
        );
      }
}

class Obstacle{
  constructor(width, x){
    this.x = x*(410 - width)/100 + 30;
    this.y = -30;
    this.height = 30;
    this.width = width;
    this.color = "blue";
  }

  draw = (ctx)=>{
    console.log("tpm")
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y+= 2, this.width, this.height);
  }

}
