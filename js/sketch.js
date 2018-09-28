// largely based off of this codepen: https://codepen.io/khalkeus/pen/aWQxrQ

let canvas;
let ctx;
let metaball; 

init();

// -------------------------------------------------------
function init() {
	canvas        = document.getElementById('canvas');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx           = canvas.getContext('2d');
  
	metaball = new Metaball(50, ctx, canvas.width, canvas.height);
	render();
}

// -------------------------------------------------------
window.onresize = function() {
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
  
	metaball.width  = canvas.width;
	metaball.height = canvas.height;
}

// -------------------------------------------------------
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// -------------------------------------------------------
function render() {
	ctx.fillStyle = "#060109";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	metaball.update(canvas.width, canvas.height, 16);
	requestAnimationFrame(render);
}

// -------------------------------------------------------
function ball(x, y){
	this.center = [x, y];
	this.direction = [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5];
	this.weight = (Math.random() + .2);
}

// -------------------------------------------------------
function Metaball(size, ctx, width, height) {
	this.ctx       = ctx;
	this.balls     = [];
	this.threshold = .0005;
	this.size      = size;
  
	this.width  = width;
	this.height = height;
  
  // -------------------------------------------------------
	this.init = function(size) {
		for(let i = 0; i < size; i++) {
			this.balls.push(new ball(Math.random() * this.width, Math.random() * this.height));
		}
  }
  
	this.init(this.size);
  
  // -------------------------------------------------------
	this.update = function(width, height, increment) {
    this.ctx.fillStyle = "#a884a6";
		for (let x = 0; x < width; x += increment){
			for (let y = 0; y < height; y += increment){
				let s = 0;
				
				for (let i = 0; i < this.balls.length; i++) {
					s += 1 / ((x - this.balls[i].center[0]) * (x - this.balls[i].center[0]) + 
          (y - this.balls[i].center[1])*(y - this.balls[i].center[1]));					
				} 
        
				if (s < this.threshold) {
					this.ctx.fillRect(x, y, Math.random() * 50, 1);
				} else {
					this.ctx.fillRect(x + Math.random(-8, 8), y + Math.random(-8, 8), 1, 15);
				}
			}
		}
    
		for (let i = 0; i < this.balls.length; i++) {
			this.checkBounds(this.balls[i]);
    }
  }
  
  // -------------------------------------------------------
  this.checkBounds = function(ball) {
    ball.center[0] += ball.direction[0];
    ball.center[1] += ball.direction[1];
    
    if (ball.center[0] < 0) {
      ball.center[0] = this.width ;
    } else if (ball.center[1] > this.width) {
      ball.center[0] = 0;
    }
    
    if (ball.center[1] < 0){
      ball.center[1] = this.height;
    } else if (ball.center[1] > this.height) {
      ball.center[1] = 0;
    }
  }
}