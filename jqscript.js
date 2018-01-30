let snake;
let way = 1;
let step = 0;
let interval;
let clear;
let change;

document.addEventListener("DOMContentLoaded", function(event) {

	window.addEventListener("resize", myResize);
	myResize();


	if (document.getElementById('container').contains(document.getElementById('game'))) {

		initCanvas();

		snake = new Snake();

		for(let i = 0; i<1000; i++){
			Point.setRandFood();
			//Snake.randFood();
		}

		console.log(Snake.point.toString());


		snake.start(30);
	
	}
	//initGame();

});

const myResize = () => {

	const width = document.documentElement.clientWidth;
	//console.log(width);
	if (width > 1270) {
		const offset = ((width - 1270) / 2) + 'px';
		document.getElementsByClassName("nav_bar")[0].style = 'left: ' +  offset;
		document.getElementById("clock").style = 'right: ' + offset;
	} else {
		document.getElementsByClassName("nav_bar")[0].removeAttribute("style");
		document.getElementById("clock").removeAttribute("style");
	}

};

const hamburger = () => {
    const x = document.getElementsByClassName("nav_bar")[0];
    if (x.className === "nav_bar") {
        x.className += " responsive";
    } else {
        x.className = "nav_bar";
    }

};

const clock = () => {

};

const initCanvas = () => {

	const c = document.getElementById("canvas");

	const g = document.getElementById("game").getBoundingClientRect();

	c.width = (g.width & 0xFFFE) - 10 ;
	c.height = (g.height & 0xFFFE) - 10 ;

	const ctx = c.getContext('2d');

	let point = new Point();
	Point.setCTX(ctx);

	// static method for static variable

	ctx.beginPath();
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.lineWidth = 2;
	ctx.rect(1, 1, c.width - 2, c.height - 2);
	ctx.stroke();
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(2, 2, c.width - 4, c.height - 4);

	
	point.setXY(9, 1);
	point.setColor('rgb(255, 0, 0)');
	point.setXY(11, 4);
	point.setColor('rgb(0, 255, 0)');
	point.setXY(11, 5);
	point.setColor('rgb(0, 255, 0)');
	point.setXY(12, 6);
	point.setColor('rgb(0, 255, 0)');
	point.setXY(14, 8);
	point.setColor('rgb(0, 255, 0)');
	point.setXY(16, 10);
	point.setColor('rgb(0, 255, 0)');


};

