var DI = function (dependency) {
  this.dependency = dependency;
};

DI.prototype.inject = function(func) {
  var deps = /^[^(]+\(([^)]+)/.exec(func.toString());
  
  if (!deps) return func;
  
  deps = deps[1]
    .split(/\s?,\s?/)
    .map(function (dep) {
      return this.dependency[dep];
    }.bind(this));
  
  return function() {
    return func.apply(this, deps);
  };
}
