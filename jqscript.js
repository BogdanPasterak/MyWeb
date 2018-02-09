let snake;
let way = 1;
let step = 0;
let interval;
let clear;
let change;
let sec;
let ctxClock;
let offImg;
let onImg;
const ct = {
	date: 0,
	sec: 0,
	min: 0,
	hours: 0,
	ampm: false
};
const dec = {
	pos1: false,
	pos2: false,
	pos4: false,
	pos8: false
};

document.addEventListener("DOMContentLoaded", function(event) {

	window.addEventListener("resize", myResize);
	myResize();

	ctxClock = document.getElementById('cl').getContext('2d');
	//document.getElementById("dupa").addEventListener("load", open);
	offImg = document.getElementById("offImg");
	onImg = document.getElementById("onImg");

	//ctxClock.drawImage(offImg,0,0);

	clock();



	if (document.getElementById('container').contains(document.getElementById('game'))) {

		initCanvas();

		snake = new Snake();

		for(let i = 0; i<1000; i++){
			Point.setRandFood();
			if ( i % 2 == 0 )
				Point.setRandHurdle();
			//Snake.randFood();
		}

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

	setTimeout(clock, 1000);

	ct.sec++;
	//console.log(ct.sec);
	if (ct.sec >= 60) ct.date = 0;

	if ( ct.date == 0 ) {
		ct.date = new Date();
		ct.sec = ct.date.getSeconds();
		ct.min = ct.date.getMinutes();
		ct.hours = ct.date.getHours();
		if (ct.hours >= 12) {
			ct.ampm = true;
			ct.hours %= 12;
		}
		else { ct.ampm = false; }
		if (ct.hours == 0) {ct.hours = 12;}
		console.log(ct);
	}

	decode(ct.sec % 10);
	//if (ct.sec < 10) console.log(dec);
	setCol(4);

	decode(ct.sec / 10 | 0);
	//if (ct.sec % 10 == 0) {console.log(dec); console.log("dziesiatka")}
	setCol(3);

	decode(ct.min % 10);
	//if (ct.sec < 10) console.log(dec);
	setCol(2);

	decode(ct.min / 10 | 0);
	//if (ct.sec % 10 == 0) {console.log(dec); console.log("dziesiatka")}
	setCol(1);

	decode(ct.hours);
	//if (ct.sec < 10) console.log(dec);
	setCol(0);


	


	//console.log(ct.hours + "  " + ct.min + "  " + ct.sec );
	//clockCanvas.style.backgrountColor = rgb(time%256, time%256, time%256);
	//if ( t %256 == 0) console.log('tik  ' + time%256);

};

const decode = (number) => {
	dec.pos1 = number & 1;
	dec.pos2 = number >> 1 & 1;
	dec.pos4 = number >> 2 & 1;
	dec.pos8 = number >> 3 & 1;
};
const setCol = (nr) => {
	let x = nr * 19 + (nr & 1) * 4 + 3;
	let y = 3;
	if (!(nr & 1))
		(dec.pos8) ? ctxClock.drawImage(onImg,x,y) : ctxClock.drawImage(offImg,x,y);
	y += 18;
	(dec.pos4) ? ctxClock.drawImage(onImg,x,y) : ctxClock.drawImage(offImg,x,y);
	y += 18;
	(dec.pos2) ? ctxClock.drawImage(onImg,x,y) : ctxClock.drawImage(offImg,x,y);
	y += 18;
	(dec.pos1) ? ctxClock.drawImage(onImg,x,y) : ctxClock.drawImage(offImg,x,y);
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

/*
	
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
*/

};

