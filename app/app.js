if (Meteor.isClient) {

  var controllers = {
    add: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      console.log('adding', args);
      return _.reduce(args,
        function (a, b) {
          var res;
          a = a || 0;
          b = b || 0;
          res = '' + (parseInt(a, 10) + parseInt(b, 10));
          console.log("result from add", a, b, res);
          return res
        }, '0');
    },
    mult: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      console.log('multiplying', args);
      return _.reduce(args,
        function (a, b) {
          var res;
          a = a || 1;
          b = b || 1;
          res = '' + (parseInt(a, 10) * parseInt(b, 10));
          console.log("result from mult", res);
          return res
        }, '1');
    },
    h: function (n, s) {
      if (n==="1"||n==="2"||n==="2"||n==="2"||n==="2"||n==="2") {
        return "<h"+n+">"+s+"</h"+n+">";
      } else {
        console.error(n, "must be a number between 1 and 6");
        return s
      }
    }
  }

  function apply(res, funcStr) {
    var parsed, f, args;
    funcStr = funcStr || "add.0";
    console.log("applying", res, funcStr);
    parsed = funcStr.split('.');
    f = controllers[_.head(parsed)];
    args = _.tail(parsed);
    if (res) { args.push(res) };
    return f.apply(false, args);
  }

  function controller() {
    var funcs = _.tail(window.location.pathname.split('/'))
    return _.reduceRight(funcs, apply, false)
  }

  Template.result.thisResult = function () {
    return controller();
  }
}

if (Meteor.isServer) {

}
