let snake;
let way = 1;
let step = 0;
let interval;
let clear;
let change;

document.addEventListener("DOMContentLoaded", function(event) {

	window.addEventListener("resize", myResize);
	myResize();

	initCanvas();

	snake = new Snake();


	snake.start(50);


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
	point.setXY(10, 1);
	point.setColor('rgb(0, 255, 0)');
	point.setXY(11, 1);
	point.setColor('rgb(0, 0, 255)');

};

const drawSnake = () => {
	// move head
	position(snake[0]);
	
	// next step
	change = whereNext();
	way = (way + change) % 8;

	//console.log('licznik = ' + step);

	// 



	// grow
	if (step % 50 == 0) {
		snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
	}
	
};

const whereNext = () => {

	//let see = look(ctx, snake[0], 0);
	//console.log(see);

	let next = {x: 0, y: 0};
	copy(snake[0], next);

	let mem = {x: 0, y: 0};
	copy(next, mem);


	if (way & 1 == 0) {
		position(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('przeszkoda-HW  step = ' + step + '  way=' + way);
			if (Math.random() * 2 < 1) return 1;
			else return 7;
		}
		copy(mem, next);
		posR(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('w lewo  step = ' + step + '  way=' + way);
			return 7;
		}
		copy(mem, next);
		posL(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('w prawo  step = ' + step + '  way=' + way);
			return 1;
		}
		copy(mem, next);
		position(next);
		position(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('przeszkoda-HW-far  step = ' + step + '  way=' + way);
			if (Math.random() * 2 < 1) return 1;
			else return 7;
		}
	} else {
		posR(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('w lewo  step = ' + step + '  way=' + way);
			return 7;
		}
		copy(mem, next);
		posL(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('w prawo  step = ' + step + '  way=' + way);
			return 1;
		}
		copy(mem, next);
		position(next);
		if ( getPixel(next.x, next.y, ctx) == 'rgb(255, 0, 0)') {
			console.log('przeszkoda-losuje  step = ' + step + '  way=' + way);
			if (Math.random() * 2 < 1) return 1;
			else return 7;
		}
	}


	const rnd = (Math.random() * 51) | 0;
	if (rnd == 0) {console.log('W prawo  step = ' + step); return 1;}
	else if (rnd == 1) {console.log('W lewo step = ' + step); return 7;}
	return 0;
};



const setPixel = (x, y, ctx) => {
	ctx.fillRect(x << 1, y << 1, 2, 2);
};

const getPixel = (x, y, ctx) => {
	const data = ctx.getImageData(x << 1, y << 1, 1, 1);
	let s = 'rgb(';
	s += data.data[0] + ', ';
	s += data.data[1] + ', ';
	s += data.data[2] + ')';
	return s;
};

const position = (p) => {
	if (way == 0 || way == 7 || way ==1) { p.x++; }
	if (way == 4 || way == 3 || way ==5) { p.x--; }
	if (way == 2 || way == 1 || way ==3) { p.y++; }
	if (way == 6 || way == 5 || way ==7) { p.y--; }
};

const posR = (p) => {
	let w = (way + 1) % 8;
	if (w == 0 || w == 7 || w ==1) { p.x++; }
	if (w == 4 || w == 3 || w ==5) { p.x--; }
	if (w == 2 || w == 1 || w ==3) { p.y++; }
	if (w == 6 || w == 5 || w ==7) { p.y--; }
};

const posL = (p) => {
	let w = (way + 7) % 8;
	if (w == 0 || w == 7 || w ==1) { p.x++; }
	if (w == 4 || w == 3 || w ==5) { p.x--; }
	if (w == 2 || w == 1 || w ==3) { p.y++; }
	if (w == 6 || w == 5 || w ==7) { p.y--; }
};

const copy = (from,to) => {
	to.x = from.x;
	to.y = from.y;
};
