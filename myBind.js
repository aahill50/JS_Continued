Function.prototype.myBind = function (that) {
  var fn = this;
  return function () {
    return fn.apply(that);
  };
};