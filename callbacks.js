function Clock() {
  this.currentTime = new Date();
};

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  var hours   = this.currentTime.getHours(),
      minutes = this.currentTime.getMinutes(),
      seconds = this.currentTime.getSeconds();

  console.log(hours + ":" + minutes + ":" + seconds);
};

Clock.prototype.run = function () {
  this.currentTime = new Date();
  this.printTime();
  setInterval(this._tick.myBind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  this.currentTime.setTime(this.currentTime.getTime() + Clock.TICK);
  this.printTime();
};
