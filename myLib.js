

// TODO: A point object and a chain of function prototypes for it
const Point = function () {
  this.x = 0;
  this.y = 0;
  Point.ctx;  // Static variable
  // Static method
  Point.setCTX = function(ctx) {
    Point.ctx = ctx;
  }
};
Point.prototype.getX = function() {
  return this.x;
};
Point.prototype.getY = function() {
  return this.y;
};
Point.prototype.setX = function(x) {
  this.x = x;
};
Point.prototype.setY = function(y) {
  this.y = y;
};
Point.prototype.setXY = function(x, y) {
  this.x = x;
  this.y = y;
};
Point.prototype.set = function(obj) {
  if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y')) {
    this.x = obj.x;
    this.y = obj.y;
  } else {
    console.log('Error!    Object:' + obj + '  does not have x and y property');
  }
};
Point.prototype.get = function() {
  return this;
};
Point.prototype.setColor = function(color) {
  Point.ctx.fillStyle = color;
  Point.ctx.fillRect(this.x << 1, this.y << 1, 2, 2);
}
Point.prototype.getColor = function() {
  const data = Point.ctx.getImageData(this.x << 1, this.y << 1, 1, 1);
  return 'rgb(' + data.data[0] + ', ' + data.data[1] + ', ' + data.data[2] + ')';
}
Point.prototype.getSetColor = function(color) {
  let cell = this.get();
  let back = $(cell).css('background-color');
  $(cell).css('background-color', color);
  return back;
};

Point.prototype.toString = function() {
  return 'Point {x: ' + this.x + ', y: ' + this.y + ', ctx: ' + Point.ctx + '} ';
};
Point.prototype.equals = function(p2) {
  return (p2 instanceof Point && this.x === p2.x && this.y === p2.y);
};
Point.prototype.copy = function(p2) {
  this.x = p2.getX();
  this.y = p2.getY();
};


// TODO: Auxiliary procedure, change of the color recording format,
//  e.g. 'rgb(255, 128, 0)' to '#ff8000'
const rgbToHex = (color) => {
  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
      r = parseInt(nums[2], 10).toString(16),
      g = parseInt(nums[3], 10).toString(16),
      b = parseInt(nums[4], 10).toString(16);
  return "#" + (r.length == 1 ? "0"+ r : r) + (g.length == 1 ? "0"+ g : g) + (b.length == 1 ? "0"+ b : b);
};






const Snake = function() {
  this.body = [new Point(), new Point(), new Point()];
  this.head = this.body[0];
  this.eye = new Point();
  this.eyeL = new Point();
  this.eyeR = new Point();
  this.way = 0;
  this.speed = 0;
  this.step = 0;
  this.interval;
  Snake.see = {
    head: 'rgb(0, 0, 0)',
    body: 'rgb(128, 128, 128)',
    hurdle: 'rgb(255, 0, 0)',
    food: 'rgb(0, 255, 0)',
    none: 'rgb(255, 255, 255)'};

  // set 3 parts of body
  for (let i = 0; i < 3; i++) {
    this.body[i].setX(3 - i);
    this.body[i].setY(1);
  }
};

Snake.prototype.start = function(speed) {
  // if not set make 1/5 second
  if (speed === undefined) { speed = 200;}
  else {
    if (this.interval != undefined){
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        this.draw();
      }.bind(this), speed);
    }
  }
  this.speed = speed;
  console.log("Snake speed is seting:" + this.speed);
  if (this.interval === undefined) {
    this.interval = setInterval(function() {
      this.draw();
    }.bind(this), speed);
    console.log("Snake start");
  } else {
    console.log("Snake already going");
  }
};

Snake.prototype.stop = function(speed) {
  clearInterval(this.interval);
  this.interval = undefined;
};

Snake.prototype.draw = function() {

  this.step++;

  if (this.step > 500) this.stop();

  // erase till
  this.body[this.body.length-1].setColor('rgb(255, 255, 255)');

  // decreases
  if (this.step % 100 == 0){
    this.body.pop();
    if (this.body.length < 1){
      this.stop();
      console.log("Snake died of hunger");
    } else {
      this.body[this.body.length-1].setColor('rgb(255, 255, 255)');
    }
  }

  // move snake
  for(let i = this.body.length - 1; i > 0; i--) {
    this.body[i].x = this.body[i - 1].x;
    this.body[i].y = this.body[i - 1].y;
  }


  this.where();


  if (this.head.getColor() != Snake.see.none) {
    console.log(this.head.getColor());
  }


  // draw
  this.head.setColor('rgb(0, 0, 0)');
  for(let i = 1; i < this.body.length; i++) {
    this.body[i].setColor('rgb(128, 128, 128)');
  }

};

Snake.prototype.where = function() {
  this.eye.copy(this.head);
  this.eyeL.copy(this.head);
  this.eyeR.copy(this.head);
  this.front(this.eye);
  this.left(this.eyeL);
  this.right(this.eyeR);

  if (this.eye.getColor() == Snake.see.hurdle) {
    console.log('zobaczył przed');
    if (this.eyeL.getColor() == Snake.see.hurdle) {
      console.log('zobaczył z lewej  way = ' + this.way);
      this.way = ++this.way & 7;
      console.log('zobaczył z lewej  way = ' + this.way);
    } else if (this.eyeR.getColor() == Snake.see.hurdle) {
      console.log('zobaczył z prawej');
      this.way = --this.way & 7;
    }


    // w prawo lub lewo
  }

  this.front(this.head);
};

Snake.prototype.front = function(point) {

  if (this.way == 0 || this.way == 7 || this.way ==1) { point.x++; }
  if (this.way == 4 || this.way == 3 || this.way ==5) { point.x--; }
  if (this.way == 2 || this.way == 1 || this.way ==3) { point.y++; }
  if (this.way == 6 || this.way == 5 || this.way ==7) { point.y--; }
};
Snake.prototype.left = function(point) {

  this.way = --this.way & 7;
  this.front(point);
  this.way = ++this.way & 7;
};
Snake.prototype.right = function(point) {

  this.way = ++this.way & 7;
  this.front(point);
  this.way = --this.way & 7;
};