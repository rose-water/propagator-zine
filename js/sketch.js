// largely based off of this codepen: https://codepen.io/khalkeus/pen/aWQxrQ

let canvas;
let ctx;
let metaball;
let about;
let call;
let content;

init();

// -------------------------------------------------------
function init() {
	canvas        = document.getElementById('canvas');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx           = canvas.getContext('2d');

	about = document.getElementById('propagator-about');
  call = document.getElementById('contributor-call');
  content = document.getElementById('content-container');
  
	metaball = new Metaball(50, ctx, canvas.width, canvas.height);
	render();

	document.onkeydown = function(evt) {
    evt = evt || window.event;
    
    if (evt.keyCode == 27 && (about.style.display === 'block' || call.style.display === 'block')) {
        about.style.display = "none";
        call.style.display = "none";
        content.style.filter = "none";
    }
	};
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
function toggleAboutVisible(setToOpen) {
	if (setToOpen) {
		about.style.display = "block";
		content.style.filter = "blur(16px)";

	} else {
		about.style.display = "none";
		content.style.filter = "none";
	}
}

// -------------------------------------------------------
function toggleCallVisible(setToOpen) {
	if (setToOpen) {
		content.style.filter = "blur(16px)";
		call.style.display = "block";
	} else {
		content.style.filter = "none";
		call.style.display = "none";
	}
}

// -------------------------------------------------------
function render() {
	ctx.fillStyle = "#060109";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#a884a6";
	metaball.update(canvas.width, canvas.height, 14);

	// setTimeout(function() {
		requestAnimationFrame(render);
	// }, 500 / 30);

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
    
		for (let x = 0; x < width; x += increment){
			for (let y = 0; y < height; y += increment){
				let s = 0;
				
				for (let i = 0; i < this.balls.length; i++) {
					s += 1 / ((x - this.balls[i].center[0]) * (x - this.balls[i].center[0]) + 
          (y - this.balls[i].center[1])*(y - this.balls[i].center[1]));					
				} 
        
				if (s < this.threshold) {
					this.ctx.fillRect(x, y, 16, 1);
				} else {
					this.ctx.fillRect(x + Math.random(-8, 8), y + Math.random(-8, 8), 1, 8);
				}
			}
		}
	
		for (let i = 0; i < this.balls.length; i++) {
			this.balls[i].center[0] += this.balls[i].direction[0];
			this.balls[i].center[1] += this.balls[i].direction[1];
			this.checkBounds(this.balls[i]);
    }
  }
  
  // -------------------------------------------------------
  this.checkBounds = function(ball) {
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
	
	// -------------------------------------------------------

}