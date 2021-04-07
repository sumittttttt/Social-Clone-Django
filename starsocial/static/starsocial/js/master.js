// Particle class
(function(){
	function Shape(start) {
		this.params = {
			x: start.x,
			y: start.y,
			size: Math.floor(Math.random()*2),
			speed: Math.random()*5,
			lifetime: Math.random()*1000+100
		};
		this.tick = 0;
	}

		var p = Shape.prototype;

		p.move = function() {
			this.tick ++;
			if (this.tick >= this.params.lifetime) return;
			var sign = Math.random() > .5 ? 1 : -1;
			this.params.x += Math.random() * sign * this.params.speed;
			sign = Math.random() > .5 ? 1 : -1;
			this.params.y += Math.random() * sign * this.params.speed;
			this.draw();
		}
		p.draw = function() {
			ctx.fillRect(this.params.x, this.params.y, this.params.size, this.params.size);
		}
		p.die = function() {
			this.tick = this.params.lifetime;
		}

	window.Shape = Shape;
})();

// Main script
var canvas 	   = document.getElementById('canvas'),
	ctx        = canvas.getContext('2d'),
	shapes     = [],
	starts     = [];

function init() {
	setCanvasSize();

	for (var i = 0; i < 10; i++) {
		starts.push({x: Math.floor(Math.random()*canvas.width), y: Math.floor(Math.random()*canvas.height)});
		for (var u = 0; u < Math.floor(Math.random()*100); u++) {
			shapes[shapes.length] = new Shape(starts[starts.length-1]);
		}
	}

	ctx.globalCompositeOperation = "lighter";
	
	animate();
};

function animate(){
	shapes.forEach(shape => {
		shape.move();
	})
	requestAnimationFrame(animate);
};

function setCanvasSize() {
	canvas.width = document.documentElement.clientWidth,
    canvas.height = document.documentElement.clientHeight;                      

	canvas.setAttribute("width", canvas.width);
	canvas.setAttribute("height", canvas.height);
}

// Listeners
window.addEventListener('mousemove', 
	(event) => {
		for (var i = 0; i <= Math.floor(Math.random()*15); i++) {
			shapes[shapes.length] = new Shape({x: event.clientX, y: event.clientY});
		}
	}
);
window.addEventListener('click', 
	() => {
		ctx.clearRect(0,0,canvas.width, canvas.height)
		shapes.forEach(shape=>{
			shape.die();
		})
	}
);
window.addEventListener('resize', setCanvasSize);
window.addEventListener('load', init);