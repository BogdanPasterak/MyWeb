

// TODO: A point object and a chain of function prototypes for it
const Point = function () {
  this.x = 0;
  this.y = 0;
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
Point.prototype.set = function(x, y) {
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
Point.prototype.setColor = function(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(this.x << 1, this.y << 1, 2, 2);
}
Point.prototype.getSetColor = function(color) {
  let cell = this.get();
  let back = $(cell).css('background-color');
  $(cell).css('background-color', color);
  return back;
};

Point.prototype.toString = function() {
  return 'Point={ cell.id="' + $(this.get())[0].id + '"  x=' + this.x + '  y=' + this.y + '} ';
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






const Snake = function(ctxCanvas) {
  this.body = [new Point(), new Point(), new Point()];
  this.head = this.body[0];
  this.way = 0;
  this.speed = 0;
  this.step = 0;
  this.interval;
  this.ctx = ctxCanvas;

  // set 3 parts of body
  for (let i = 0; i < 3; i++) {
    this.body[i].setX(3 - i);
    this.body[i].setY(1);
  }
};

Snake.prototype.start = function(speed) {
  // if not set make 1/5 second
  if (speed === undefined) { speed = 200;}
  this.speed = speed;
  this.interval = setInterval(function() {
    this.draw();
  }.bind(this), speed);
  console.log(" Snake start");
};

Snake.prototype.stop = function(speed) {
  clearInterval(this.interval);
  console.log("Snake stop");
};

Snake.prototype.draw = function() {

  
  this.step++;
  //console.log(this.step);

  if (this.step > 100) this.stop();


  // erase till
  ctx.fillStyle = 'rgb(255, 255, 255)';
  setPixel(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, ctx);
  // move snake
  for(let i = this.body.length - 1; i > 0; i--) {
    this.body[i].x = this.body[i - 1].x;
    this.body[i].y = this.body[i - 1].y;
  }


  this.body[0].x++;


  //ctx.fillStyle = 'rgb(0, 0, 0)';
  //setPixel(this.body[0].x, this.body[0].y, ctx);
  
  this.head.setColor(this.ctx, 'rgb(0, 0, 0)');
  ctx.fillStyle = 'rgb(128, 128, 128)';
  for(let i = 1; i < this.body.length; i++) {
    this.body[i].setColor(this.ctx, 'rgb(128, 128, 128)');
    //setPixel(this.body[i].x, this.body[i].y, ctx);
  }
  

  


}
