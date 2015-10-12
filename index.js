angular.module('coloration', [])
.constant('tinycolor', tinycolor)
.controller('colorationCtrl', ['$scope', 'tinycolor', function($scope, tinycolor) {
  $scope.color = '#2196F3';
  $scope.fluidColor = '#000';
  $scope.clean = function(color) {
    //hex characters only
    var nonHex = /[^a-f0-9]/gi;
    //remove whitespace
    var whitespace = /\s/g;
    return '#' + color.replace(whitespace,'').replace(nonHex,'');
  };
  $scope.normalize = function(color) {
    //exactly 7 characters
    return $scope.clean(color).concat('000000').slice(0,7);
  };
  $scope.calculateColor = function(event) {
    var x = event.pageX - event.currentTarget.offsetLeft;
    var y = event.pageY - event.currentTarget.offsetTop;
    var width = event.currentTarget.offsetWidth;
    var height = event.currentTarget.offsetHeight;
    //Hue <-- Width
    //Saturation 100%
    //Lightness <-- Height
    var hue = 360 * ( x / width );
    var lightness = y / height;
    return tinycolor({
      h: hue,
      s: 1,
      l: lightness
    }).toHexString();
  };
  $scope.calculateSaturation = function(event, color) {
    var y = event.pageY - event.currentTarget.offsetTop;
    var height = event.currentTarget.offsetHeight;
    //Saturation <-- Height
    var saturation = 1 - y / height;
    var hsl = tinycolor(color).toHsl();
    return tinycolor({
      h: hsl.h,
      s: saturation,
      l: hsl.l
    }).toHexString();
  };
  $scope.getSaturationGradient = function(color) {
    //Return CSS background linear-gradient string
    //where start and stop colors are the saturated
    //and desaturated versions of the specified color.
    var hsl = tinycolor(color).toHsl();
    var start = tinycolor({
      h: hsl.h,
      s: 1,
      l: hsl.l
    });
    var end = tinycolor({
      h: hsl.h,
      s: 0,
      l: hsl.l
    });
    //TODO: vendor prefixes - modernizr?
    return (
      'linear-gradient(' +
      start.toHslString() + ',' +
      end.toHslString() + ' )'
    );
  };
}]);
