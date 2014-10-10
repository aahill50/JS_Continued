Function.prototype.myBind = function (that) {
  var fn = this;
  return function () {
    fn.apply(that);
  };
};